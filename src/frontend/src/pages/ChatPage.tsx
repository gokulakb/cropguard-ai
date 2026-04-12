import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChatHistory, useSendChatMessage } from "@/hooks/use-backend";
import { cn } from "@/lib/utils";
import type { ChatMessage } from "@/types";
import {
  AlertCircle,
  Bot,
  Leaf,
  Mic,
  MicOff,
  RefreshCw,
  Send,
  Trash2,
  User,
  Volume2,
  VolumeX,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";

// ─── Types ────────────────────────────────────────────────────────────────────

interface LocalMessage extends ChatMessage {
  error?: boolean;
  originalText?: string;
}

// ─── Web Speech API types ─────────────────────────────────────────────────────

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}
interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}
interface SpeechRecognitionInstance extends EventTarget {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  start(): void;
  stop(): void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
}
declare global {
  interface Window {
    SpeechRecognition?: new () => SpeechRecognitionInstance;
    webkitSpeechRecognition?: new () => SpeechRecognitionInstance;
  }
}

// ─── Constants ────────────────────────────────────────────────────────────────

const INITIAL_MESSAGE: LocalMessage = {
  id: "init-0",
  role: "assistant",
  content:
    "Hello! I'm AgriBot, your AI agricultural assistant powered by advanced AI. I can help you identify crop diseases, recommend treatments, explain prevention strategies, and answer any farming questions. How can I help you today?",
  timestamp: new Date().toISOString(),
};

const SUGGESTED_PROMPTS = [
  "What is causing yellow leaves?",
  "Best treatment for blight?",
  "Preventive measures for rust?",
  "How to treat powdery mildew?",
  "Signs of nitrogen deficiency?",
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getSpeechRecognition(): (new () => SpeechRecognitionInstance) | null {
  return window.SpeechRecognition ?? window.webkitSpeechRecognition ?? null;
}

// ─── Typing indicator ─────────────────────────────────────────────────────────

function TypingDots() {
  return (
    <div className="flex gap-3" data-ocid="chat-typing-indicator">
      <Avatar className="w-8 h-8 shrink-0 mt-0.5">
        <AvatarFallback className="bg-primary/10 text-primary">
          <Leaf className="w-4 h-4" />
        </AvatarFallback>
      </Avatar>
      <div className="bg-card border border-border rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
        <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce [animation-delay:-0.3s]" />
        <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce [animation-delay:-0.15s]" />
        <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" />
      </div>
    </div>
  );
}

// ─── Message bubble ───────────────────────────────────────────────────────────

function MessageBubble({
  msg,
  onRetry,
}: {
  msg: LocalMessage;
  onRetry: (text: string) => void;
}) {
  const isUser = msg.role === "user";
  return (
    <div
      className={cn(
        "flex gap-3 group",
        isUser ? "flex-row-reverse" : "flex-row",
      )}
      data-ocid={`chat-message-${msg.role}`}
    >
      <Avatar className="w-8 h-8 shrink-0 mt-0.5">
        <AvatarFallback
          className={cn(
            "text-xs font-bold",
            isUser
              ? "bg-secondary text-secondary-foreground"
              : "bg-primary/10 text-primary",
          )}
        >
          {isUser ? <User className="w-4 h-4" /> : <Leaf className="w-4 h-4" />}
        </AvatarFallback>
      </Avatar>

      <div
        className={cn("max-w-[78%] flex flex-col gap-1", isUser && "items-end")}
      >
        <div
          className={cn(
            "rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
            isUser
              ? "bg-primary text-primary-foreground rounded-tr-sm"
              : msg.error
                ? "bg-destructive/10 border border-destructive/30 text-foreground rounded-tl-sm"
                : "bg-card border border-border text-foreground rounded-tl-sm",
          )}
        >
          {msg.error ? (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-destructive">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{msg.content}</span>
              </div>
              {msg.originalText && (
                <Button
                  size="sm"
                  variant="outline"
                  className="self-start h-7 text-xs border-destructive/30 text-destructive hover:bg-destructive/10"
                  onClick={() => onRetry(msg.originalText!)}
                  data-ocid="chat-retry"
                >
                  <RefreshCw className="w-3 h-3 mr-1" />
                  Retry
                </Button>
              )}
            </div>
          ) : (
            msg.content
          )}
        </div>
        <span className="text-[10px] text-muted-foreground px-1">
          {formatTime(msg.timestamp)}
        </span>
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export function ChatPage() {
  const { data: history, isLoading: historyLoading } = useChatHistory();
  const sendMutation = useSendChatMessage();

  const [localMessages, setLocalMessages] = useState<LocalMessage[]>([
    INITIAL_MESSAGE,
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported] = useState(() => getSpeechRecognition() !== null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);

  // Merge backend history on load
  useEffect(() => {
    if (history && history.length > 0) {
      const mapped: LocalMessage[] = history.map((m) => ({ ...m }));
      setLocalMessages([INITIAL_MESSAGE, ...mapped]);
    }
  }, [history]);

  useLayoutEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  });

  // ── TTS ──────────────────────────────────────────────────────────────────────
  const speak = useCallback(
    (text: string) => {
      if (!ttsEnabled || !window.speechSynthesis) return;
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      utter.rate = 0.95;
      utter.pitch = 1;
      window.speechSynthesis.speak(utter);
    },
    [ttsEnabled],
  );

  // ── Send message ─────────────────────────────────────────────────────────────
  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isTyping) return;

      const userMsg: LocalMessage = {
        id: `user-${Date.now()}`,
        role: "user",
        content: trimmed,
        timestamp: new Date().toISOString(),
      };
      setLocalMessages((prev) => [...prev, userMsg]);
      setInput("");
      setIsTyping(true);

      try {
        const result = await sendMutation.mutateAsync(trimmed);
        const reply =
          typeof result === "string"
            ? result
            : ((result as { content?: string })?.content ??
              "I'm sorry, I couldn't process that request right now. Please try again.");

        const botMsg: LocalMessage = {
          id: `bot-${Date.now()}`,
          role: "assistant",
          content: reply,
          timestamp: new Date().toISOString(),
        };
        setLocalMessages((prev) => [...prev, botMsg]);
        speak(reply);
      } catch {
        const errMsg: LocalMessage = {
          id: `err-${Date.now()}`,
          role: "assistant",
          content:
            "Failed to reach AgriBot. Please check your connection and try again.",
          timestamp: new Date().toISOString(),
          error: true,
          originalText: trimmed,
        };
        setLocalMessages((prev) => [...prev, errMsg]);
        toast.error("AgriBot is unavailable right now.");
      } finally {
        setIsTyping(false);
        inputRef.current?.focus();
      }
    },
    [isTyping, sendMutation, speak],
  );

  // ── Voice input ───────────────────────────────────────────────────────────────
  const toggleMic = useCallback(() => {
    const SR = getSpeechRecognition();
    if (!SR) return;

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const recognition = new SR();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0]?.[0]?.transcript ?? "";
      if (transcript) {
        setInput(transcript);
        // auto-send after a short delay so user sees it
        setTimeout(() => sendMessage(transcript), 200);
      }
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.warn("Speech recognition error:", event.error);
      setIsListening(false);
      if (event.error !== "aborted") {
        toast.error("Voice input failed. Please try again.");
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
    window.speechSynthesis?.cancel();
  }, [isListening, sendMessage]);

  // ── Clear chat ────────────────────────────────────────────────────────────────
  const confirmClear = () => {
    setLocalMessages([INITIAL_MESSAGE]);
    setShowClearConfirm(false);
    toast.success("Chat cleared.");
  };

  // ── Loading skeleton ──────────────────────────────────────────────────────────
  if (historyLoading) {
    return (
      <div className="flex flex-col h-[calc(100vh-3.5rem)] lg:h-[calc(100vh-3.5rem-2.5rem)] items-center justify-center gap-3">
        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center animate-pulse">
          <Bot className="w-5 h-5 text-primary" />
        </div>
        <p className="text-sm text-muted-foreground">Loading AgriBot…</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)] lg:h-[calc(100vh-3.5rem-2.5rem)]">
      {/* ── Header ── */}
      <div className="bg-card border-b border-border px-4 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-elevated">
              <Bot className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-card rounded-full" />
          </div>
          <div>
            <p className="font-semibold font-display text-foreground text-sm">
              AgriBot Assistant
            </p>
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-primary font-medium">Online</span>
              {isListening && (
                <Badge
                  variant="outline"
                  className="text-[10px] h-4 px-1.5 border-destructive/40 text-destructive animate-pulse"
                  data-ocid="chat-listening-badge"
                >
                  <Mic className="w-2.5 h-2.5 mr-1" />
                  Listening…
                </Badge>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {/* TTS toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTtsEnabled((v) => !v)}
            className={cn(
              "w-8 h-8 text-muted-foreground",
              ttsEnabled && "text-primary",
            )}
            aria-label={
              ttsEnabled ? "Disable voice responses" : "Enable voice responses"
            }
            data-ocid="chat-tts-toggle"
          >
            {ttsEnabled ? (
              <Volume2 className="w-4 h-4" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </Button>

          {/* Clear chat */}
          {showClearConfirm ? (
            <div className="flex items-center gap-1 bg-destructive/10 border border-destructive/30 rounded-lg px-2 py-1">
              <span className="text-xs text-destructive font-medium">
                Clear?
              </span>
              <Button
                size="sm"
                variant="ghost"
                className="h-5 px-2 text-[10px] text-destructive hover:bg-destructive/10"
                onClick={confirmClear}
                data-ocid="chat-clear-confirm"
              >
                Yes
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="h-5 px-2 text-[10px] text-muted-foreground"
                onClick={() => setShowClearConfirm(false)}
                data-ocid="chat-clear-cancel"
              >
                No
              </Button>
            </div>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 text-muted-foreground hover:text-destructive"
              onClick={() => setShowClearConfirm(true)}
              aria-label="Clear chat"
              data-ocid="chat-clear"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {/* ── Message list ── */}
      <ScrollArea className="flex-1 min-h-0">
        <div className="px-4 py-4 space-y-4">
          {localMessages.map((msg) => (
            <MessageBubble key={msg.id} msg={msg} onRetry={sendMessage} />
          ))}
          {isTyping && <TypingDots />}
          <div ref={bottomRef} />
        </div>
      </ScrollArea>

      {/* ── Suggested prompts ── */}
      <div
        className="px-4 py-2 flex gap-2 overflow-x-auto shrink-0"
        style={{ scrollbarWidth: "none" }}
      >
        {SUGGESTED_PROMPTS.map((prompt) => (
          <button
            key={prompt}
            type="button"
            onClick={() => sendMessage(prompt)}
            disabled={isTyping}
            className="shrink-0 text-xs bg-secondary hover:bg-primary/10 hover:text-primary disabled:opacity-50 text-muted-foreground px-3 py-1.5 rounded-full transition-smooth whitespace-nowrap border border-border cursor-pointer"
            data-ocid="chat-suggested-prompt"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* ── Input bar ── */}
      <div className="bg-card border-t border-border px-4 py-3 flex gap-2 items-center shrink-0">
        {/* Microphone */}
        {speechSupported ? (
          <Button
            size="icon"
            variant={isListening ? "destructive" : "outline"}
            onClick={toggleMic}
            className={cn(
              "shrink-0 w-10 h-10 transition-smooth",
              isListening && "animate-pulse",
            )}
            aria-label={isListening ? "Stop listening" : "Start voice input"}
            data-ocid="chat-mic-btn"
          >
            {isListening ? (
              <MicOff className="w-4 h-4" />
            ) : (
              <Mic className="w-4 h-4" />
            )}
          </Button>
        ) : (
          <Button
            size="icon"
            variant="outline"
            disabled
            title="Voice input not supported in this browser"
            className="shrink-0 w-10 h-10 opacity-40"
          >
            <Mic className="w-4 h-4" />
          </Button>
        )}

        {/* Text input */}
        <div className="relative flex-1">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage(input);
              }
            }}
            placeholder={
              isListening
                ? "Listening… speak now"
                : "Ask about crop diseases, treatments…"
            }
            className={cn(
              "w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-smooth",
              isListening && "border-destructive/40 ring-1 ring-destructive/30",
            )}
            disabled={isListening}
            aria-label="Chat input"
            data-ocid="chat-input"
          />
        </div>

        {/* Send */}
        <Button
          size="icon"
          onClick={() => sendMessage(input)}
          disabled={!input.trim() || isTyping || isListening}
          className="shrink-0 w-10 h-10"
          aria-label="Send message"
          data-ocid="chat-send-btn"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
