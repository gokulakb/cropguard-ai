import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMarkNotificationRead, useNotifications } from "@/hooks/use-backend";
import type { Notification } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { Bell, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

// ─── Notif type label map ─────────────────────────────────────────────────────

const TYPE_LABELS: Record<string, { label: string; color: string }> = {
  disease_alert: { label: "Disease Alert", color: "text-destructive" },
  reminder: { label: "Reminder", color: "text-amber-500" },
  forum_reply: { label: "Forum Reply", color: "text-primary" },
  appointment: { label: "Appointment", color: "text-blue-500" },
  system: { label: "System", color: "text-muted-foreground" },
};

function getTypeInfo(notifType: string) {
  return (
    TYPE_LABELS[notifType] ?? {
      label: notifType,
      color: "text-muted-foreground",
    }
  );
}

// ─── Single notification row ──────────────────────────────────────────────────

function NotifRow({
  notif,
  onDismiss,
}: {
  notif: Notification;
  onDismiss: (id: string) => void;
}) {
  const typeInfo = getTypeInfo(notif.notifType);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 8 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 8 }}
      transition={{ duration: 0.2 }}
      className={`group flex items-start gap-3 px-4 py-3 border-b border-border last:border-0 hover:bg-muted/40 transition-colors ${
        notif.isRead ? "opacity-60" : ""
      }`}
      data-ocid="notification-row"
    >
      {/* Unread dot */}
      <div className="mt-1.5 shrink-0">
        {!notif.isRead ? (
          <span className="block w-2 h-2 rounded-full bg-primary" />
        ) : (
          <span className="block w-2 h-2 rounded-full bg-transparent" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-sm text-foreground leading-snug">{notif.message}</p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className={`text-xs font-semibold ${typeInfo.color}`}>
            {typeInfo.label}
          </span>
          <span className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(notif.timestamp), {
              addSuffix: true,
            })}
          </span>
        </div>
      </div>

      {/* Dismiss */}
      <button
        type="button"
        onClick={() => onDismiss(notif.notifId)}
        className="shrink-0 p-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground"
        aria-label="Dismiss notification"
        data-ocid="notification-dismiss"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </motion.div>
  );
}

// ─── NotificationBell ─────────────────────────────────────────────────────────

export function NotificationBell() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { data: notifications = [] } = useNotifications();
  const markRead = useMarkNotificationRead();

  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const displayNotifs = notifications.slice(0, 15);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function handleMouseDown(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  function handleDismiss(notifId: string) {
    markRead.mutate(notifId);
  }

  function handleMarkAllRead() {
    for (const n of notifications.filter((n) => !n.isRead)) {
      markRead.mutate(n.notifId);
    }
  }

  return (
    <div ref={containerRef} className="relative" data-ocid="notification-bell">
      <Button
        variant="ghost"
        size="icon"
        className="relative"
        aria-label={`Notifications${unreadCount > 0 ? ` — ${unreadCount} unread` : ""}`}
        onClick={() => setOpen((v) => !v)}
        data-ocid="notification-bell-trigger"
      >
        <Bell className="w-5 h-5 text-muted-foreground" />
        <AnimatePresence>
          {unreadCount > 0 && (
            <motion.span
              key="badge"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 28 }}
              className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-0.5 flex items-center justify-center rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold leading-none"
            >
              {unreadCount > 99 ? "99+" : unreadCount}
            </motion.span>
          )}
        </AnimatePresence>
      </Button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-card border border-border rounded-xl shadow-elevated z-50 overflow-hidden"
            data-ocid="notification-panel"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
              <span className="font-semibold text-sm text-foreground">
                Notifications
              </span>
              {unreadCount > 0 && (
                <button
                  type="button"
                  onClick={handleMarkAllRead}
                  className="text-xs text-primary hover:underline transition-colors"
                  data-ocid="notification-mark-all-read"
                >
                  Mark all read
                </button>
              )}
            </div>

            {/* List */}
            {displayNotifs.length === 0 ? (
              <div
                className="py-10 text-center"
                data-ocid="notification-empty-state"
              >
                <Bell className="w-8 h-8 text-muted-foreground/40 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  You're all caught up!
                </p>
              </div>
            ) : (
              <ScrollArea className="max-h-[360px]">
                <AnimatePresence initial={false}>
                  {displayNotifs.map((n) => (
                    <NotifRow
                      key={n.notifId}
                      notif={n}
                      onDismiss={handleDismiss}
                    />
                  ))}
                </AnimatePresence>
              </ScrollArea>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
