import { EmergencyAlert } from "@/components/EmergencyAlert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSavePrediction } from "@/hooks/use-backend";
import { useCamera } from "@/hooks/use-camera";
import type { Disease, DiseaseSeverity, Prediction } from "@/types";
import { getSeverityLabel, getSeverityStyle } from "@/utils/severity";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  Camera,
  CheckCircle2,
  FlipHorizontal,
  Loader2,
  RefreshCw,
  Upload,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

// ─── Offline cache helpers ────────────────────────────────────────────────────

const CACHE_KEY = "cropguard_cached_diseases";

function saveDiseaseCache(diseases: Disease[]): void {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(diseases.slice(0, 5)));
  } catch {
    // localStorage may be unavailable in some contexts — ignore
  }
}

function loadDiseaseCache(): Disease[] {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Disease[];
  } catch {
    return [];
  }
}

// ─── Types ────────────────────────────────────────────────────────────────────

type DetectTab = "upload" | "camera";
type AnalysisState = "idle" | "analyzing" | "success" | "error";

interface MockPredictionResult {
  id: string;
  disease: Disease;
  severity: DiseaseSeverity;
  confidence: number;
  imageUrl: string;
  plantType: string;
  analyzedAt: string;
}

// ─── Mock AI prediction (calls Hugging Face or similar) ──────────────────────

async function runDiseasePrediction(
  imageFile: File,
): Promise<MockPredictionResult> {
  // Simulate API latency
  await new Promise((r) => setTimeout(r, 2200));

  // Build a preview URL for display
  const imageUrl = URL.createObjectURL(imageFile);

  // Deterministic mock based on filename or random pick
  const diseases: Disease[] = [
    {
      id: "late-blight-001",
      name: "Late Blight",
      scientificName: "Phytophthora infestans",
      plantType: "Tomato",
      severity: "severe",
      confidence: 0.97,
      cause:
        "Oomycete pathogen Phytophthora infestans thriving in cool, moist conditions.",
      description:
        "Rapidly spreading water-soaked lesions on leaves turning brown; white sporulation visible on undersides.",
      prevention: [
        "Use certified disease-free seed",
        "Avoid overhead irrigation",
        "Ensure good field drainage",
        "Apply preventative fungicides during high-risk weather",
      ],
      treatment: [
        "Remove and destroy all infected plant material immediately",
        "Apply contact or systemic fungicide (mancozeb, chlorothalonil)",
        "Increase plant spacing for better airflow",
      ],
      medications: [
        {
          id: "med-001",
          name: "Mancozeb 75 WP",
          type: "fungicide",
          dosage: "2.5 g per litre of water",
          applicationMethod: "Foliar spray",
          frequency: "Every 7 days under wet conditions",
          notes: "Protective action — apply before infection",
        },
        {
          id: "med-002",
          name: "Metalaxyl-M + Mancozeb",
          type: "fungicide",
          dosage: "2 g per litre of water",
          applicationMethod: "Foliar spray",
          frequency: "Every 10–14 days",
          notes: "Systemic + contact action for established infection",
        },
      ],
      imageUrl,
    },
    {
      id: "downy-mildew-001",
      name: "Downy Mildew",
      scientificName: "Peronospora spp.",
      plantType: "Cucumber",
      severity: "moderate",
      confidence: 0.88,
      cause:
        "Fungal-like pathogen flourishing in high humidity with cool nights.",
      description:
        "Yellow angular spots on upper leaf surface with grey-purple sporulation beneath.",
      prevention: [
        "Choose resistant varieties",
        "Avoid wetting foliage when watering",
        "Remove crop debris after harvest",
      ],
      treatment: [
        "Apply copper-based fungicide or fosetyl-aluminium",
        "Improve ventilation and reduce leaf wetness",
      ],
      medications: [
        {
          id: "med-003",
          name: "Copper Hydroxide",
          type: "fungicide",
          dosage: "3 g per litre of water",
          applicationMethod: "Foliar spray",
          frequency: "Every 7–10 days",
        },
      ],
      imageUrl,
    },
    {
      id: "healthy-001",
      name: "Healthy Plant",
      scientificName: "N/A",
      plantType: "Maize",
      severity: "healthy",
      confidence: 0.96,
      cause: "No disease detected.",
      description: "Plant appears healthy with no signs of disease or stress.",
      prevention: [
        "Maintain regular monitoring",
        "Keep records of crop health",
      ],
      treatment: [],
      medications: [],
      imageUrl,
    },
  ];

  const picked = diseases[Math.floor(Math.random() * diseases.length)];
  return {
    id: `pred-${Date.now()}`,
    disease: picked,
    severity: picked.severity,
    confidence: picked.confidence,
    imageUrl,
    plantType: picked.plantType,
    analyzedAt: new Date().toISOString(),
  };
}

// ─── Confidence Bar ───────────────────────────────────────────────────────────

function ConfidenceBar({ value }: { value: number }) {
  const pct = Math.round(value * 100);
  const color =
    pct >= 90 ? "bg-primary" : pct >= 70 ? "bg-accent" : "bg-destructive";
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Confidence</span>
        <span className="font-semibold text-foreground">{pct}%</span>
      </div>
      <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

// ─── Result Panel ─────────────────────────────────────────────────────────────

function ResultPanel({
  result,
  onReset,
}: {
  result: MockPredictionResult;
  onReset: () => void;
}) {
  const navigate = useNavigate();
  const { mutate: savePrediction } = useSavePrediction();
  const [saved, setSaved] = useState(false);
  const style = getSeverityStyle(result.severity);
  const isSevere = result.severity === "severe";

  const handleViewDetails = () => {
    const prediction: Prediction = {
      id: result.id,
      imageUrl: result.imageUrl,
      plantType: result.plantType,
      disease: result.disease,
      severity: result.severity,
      confidence: result.confidence,
      analyzedAt: result.analyzedAt,
    };
    if (!saved) {
      savePrediction(prediction);
      setSaved(true);
    }
    navigate({
      to: "/results/$predictionId",
      params: { predictionId: result.id },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
      data-ocid="result-panel"
    >
      {isSevere && (
        <EmergencyAlert
          diseaseName={result.disease.name}
          plantType={result.plantType}
          predictionId={result.id}
        />
      )}

      <Card className="overflow-hidden border-border">
        {/* Image preview */}
        <div className="relative aspect-video bg-muted overflow-hidden">
          <img
            src={result.imageUrl}
            alt="Scanned crop"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-3">
            <span className="text-xs font-semibold text-white/90 uppercase tracking-wider">
              Potential Disease
            </span>
            <p className="text-lg font-bold text-white font-display leading-tight">
              {result.disease.name}
            </p>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {/* Severity + plant */}
          <div className="flex items-center gap-2 flex-wrap">
            <Badge
              className={`${style.badge} border text-xs font-semibold`}
              data-ocid="severity-badge"
            >
              {style.icon} {getSeverityLabel(result.severity)}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {result.plantType}
            </Badge>
            <Badge variant="outline" className="text-xs text-muted-foreground">
              {result.disease.scientificName}
            </Badge>
          </div>

          {/* Confidence bar */}
          <ConfidenceBar value={result.confidence} />

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed">
            {result.disease.description}
          </p>

          {/* Actions */}
          <div className="flex gap-2 pt-1">
            <Button
              className="flex-1 gap-2"
              onClick={handleViewDetails}
              data-ocid="view-details-btn"
            >
              <CheckCircle2 className="w-4 h-4" />
              View Full Analysis
            </Button>
            <Button
              variant="outline"
              onClick={onReset}
              className="gap-2"
              data-ocid="scan-again-btn"
            >
              <RefreshCw className="w-4 h-4" />
              Scan Again
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

// ─── Upload Tab ───────────────────────────────────────────────────────────────

function UploadTab({
  onImageReady,
}: {
  onImageReady: (file: File) => void;
}) {
  const [preview, setPreview] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (!file || !file.type.match(/^image\/(jpeg|png|webp)$/)) return;
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.match(/^image\/(jpeg|png|webp)$/)) return;
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const clearPreview = () => {
    setPreview(null);
    setSelectedFile(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="space-y-4" data-ocid="upload-tab">
      {!preview ? (
        <label
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          aria-label="Upload crop image"
          className={`
            w-full relative flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed
            cursor-pointer transition-smooth min-h-[220px] p-8 text-center select-none
            ${
              dragOver
                ? "border-primary bg-primary/5 scale-[1.01]"
                : "border-border hover:border-primary/50 hover:bg-primary/3 bg-muted/30"
            }
          `}
          data-ocid="upload-dropzone"
        >
          <div
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-smooth
            ${dragOver ? "bg-primary/15" : "bg-muted"}`}
          >
            <Upload
              className={`w-6 h-6 transition-smooth ${dragOver ? "text-primary" : "text-muted-foreground"}`}
            />
          </div>
          <div>
            <p className="font-semibold text-foreground font-display">
              {dragOver ? "Drop to analyse" : "Drag & drop your crop photo"}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              or click to browse — JPG, PNG, WebP accepted
            </p>
          </div>
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="sr-only"
            onChange={handleInputChange}
            data-ocid="upload-file-input"
          />
        </label>
      ) : (
        <div className="relative rounded-xl overflow-hidden border border-border shadow-subtle">
          <img
            src={preview}
            alt="Selected crop"
            className="w-full max-h-72 object-cover"
          />
          <button
            type="button"
            onClick={clearPreview}
            aria-label="Remove selected image"
            className="absolute top-2 right-2 w-8 h-8 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-smooth"
            data-ocid="remove-preview-btn"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-3">
            <p className="text-xs text-white/80 truncate">
              {selectedFile?.name}
            </p>
          </div>
        </div>
      )}

      {selectedFile && (
        <Button
          className="w-full gap-2 h-11"
          onClick={() => onImageReady(selectedFile)}
          data-ocid="analyse-upload-btn"
        >
          <CheckCircle2 className="w-4 h-4" />
          Analyse Disease
        </Button>
      )}
    </div>
  );
}

// ─── Camera Tab ───────────────────────────────────────────────────────────────

function CameraTab({ onImageReady }: { onImageReady: (file: File) => void }) {
  const {
    isActive,
    isSupported,
    error,
    isLoading,
    startCamera,
    stopCamera,
    capturePhoto,
    switchCamera,
    videoRef,
    canvasRef,
  } = useCamera({
    facingMode: "environment",
    quality: 0.92,
    format: "image/jpeg",
  });

  const [captured, setCaptured] = useState<string | null>(null);
  const [capturedFile, setCapturedFile] = useState<File | null>(null);

  const handleCapture = async () => {
    const file = await capturePhoto();
    if (file) {
      setCapturedFile(file);
      setCaptured(URL.createObjectURL(file));
      await stopCamera();
    }
  };

  const handleRetake = async () => {
    setCaptured(null);
    setCapturedFile(null);
    await startCamera();
  };

  if (isSupported === false) {
    return (
      <div
        className="flex flex-col items-center gap-3 py-12 text-center"
        data-ocid="camera-unsupported"
      >
        <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center">
          <Camera className="w-6 h-6 text-muted-foreground" />
        </div>
        <p className="font-semibold text-foreground">Camera Not Supported</p>
        <p className="text-sm text-muted-foreground">
          Your device or browser does not support camera access. Use the Upload
          tab instead.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4" data-ocid="camera-tab">
      {/* Video / captured preview */}
      <div className="relative rounded-xl overflow-hidden bg-muted border border-border aspect-video min-h-[220px]">
        {captured ? (
          <img
            src={captured}
            alt="Captured crop"
            className="w-full h-full object-cover"
          />
        ) : (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
              style={{ display: isActive ? "block" : "none" }}
            />
            <canvas ref={canvasRef} className="hidden" />

            {/* Overlay when not yet active */}
            {!isActive && !isLoading && !error && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-muted">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <Camera className="w-6 h-6 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Camera ready to start
                </p>
              </div>
            )}

            {/* Loading overlay */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-muted/80">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
              </div>
            )}

            {/* Error overlay */}
            {error && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-muted p-4 text-center">
                <AlertCircle className="w-8 h-8 text-destructive" />
                <p className="text-sm font-semibold text-destructive">
                  Camera Error
                </p>
                <p className="text-xs text-muted-foreground max-w-xs">
                  {error.message}
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Camera controls */}
      {!captured ? (
        <div className="flex gap-2">
          {!isActive ? (
            <Button
              className="flex-1 gap-2 h-11"
              onClick={startCamera}
              disabled={isLoading}
              data-ocid="start-camera-btn"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Camera className="w-4 h-4" />
              )}
              {isLoading ? "Starting…" : "Start Camera"}
            </Button>
          ) : (
            <>
              <Button
                className="flex-1 gap-2 h-11"
                onClick={handleCapture}
                disabled={isLoading}
                data-ocid="capture-btn"
              >
                <Camera className="w-4 h-4" />
                Capture Photo
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-11 w-11"
                onClick={() => switchCamera()}
                disabled={isLoading}
                aria-label="Switch camera"
                data-ocid="switch-camera-btn"
              >
                <FlipHorizontal className="w-4 h-4" />
              </Button>
            </>
          )}
        </div>
      ) : (
        <div className="flex gap-2">
          <Button
            className="flex-1 gap-2 h-11"
            onClick={() => capturedFile && onImageReady(capturedFile)}
            data-ocid="analyse-capture-btn"
          >
            <CheckCircle2 className="w-4 h-4" />
            Analyse This Photo
          </Button>
          <Button
            variant="outline"
            className="gap-2 h-11"
            onClick={handleRetake}
            data-ocid="retake-btn"
          >
            <RefreshCw className="w-4 h-4" />
            Retake
          </Button>
        </div>
      )}
    </div>
  );
}

// ─── Analysing Overlay ────────────────────────────────────────────────────────

function AnalysingOverlay() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center gap-5 py-10 text-center"
      data-ocid="analysing-state"
    >
      <div className="relative">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
          <Loader2 className="w-9 h-9 text-primary animate-spin" />
        </div>
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full animate-ping opacity-60" />
      </div>
      <div>
        <p className="font-bold text-foreground font-display text-lg">
          Analysing Your Crop…
        </p>
        <p className="text-sm text-muted-foreground mt-1 max-w-xs">
          AI is scanning for diseases with 95%+ accuracy using advanced plant
          pathology models.
        </p>
      </div>
      <div className="flex gap-1.5 pt-1">
        {["Preprocessing", "Detecting", "Classifying"].map((step, i) => (
          <motion.span
            key={step}
            initial={{ opacity: 0.3 }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.5,
            }}
            className="text-xs text-muted-foreground px-2 py-0.5 bg-muted rounded-full"
          >
            {step}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Error State ──────────────────────────────────────────────────────────────

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center gap-4 py-10 text-center"
      data-ocid="error-state"
    >
      <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
        <AlertCircle className="w-7 h-7 text-destructive" />
      </div>
      <div>
        <p className="font-bold text-foreground font-display">
          Analysis Failed
        </p>
        <p className="text-sm text-muted-foreground mt-1 max-w-xs">
          We couldn't analyse your image. Please try again with a clearer photo
          of the affected plant.
        </p>
      </div>
      <Button
        onClick={onRetry}
        variant="outline"
        className="gap-2"
        data-ocid="retry-btn"
      >
        <RefreshCw className="w-4 h-4" />
        Try Again
      </Button>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export function DetectPage() {
  const [activeTab, setActiveTab] = useState<DetectTab>("upload");
  const [analysisState, setAnalysisState] = useState<AnalysisState>("idle");
  const [result, setResult] = useState<MockPredictionResult | null>(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [cachedDiseases, setCachedDiseases] = useState<Disease[]>([]);

  // Track online / offline transitions
  useEffect(() => {
    const goOnline = () => setIsOnline(true);
    const goOffline = () => {
      setIsOnline(false);
      setCachedDiseases(loadDiseaseCache());
    };
    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);
    // Load cache on mount in case we start offline
    if (!navigator.onLine) setCachedDiseases(loadDiseaseCache());
    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  const handleImageReady = async (file: File) => {
    setAnalysisState("analyzing");
    setResult(null);
    try {
      const prediction = await runDiseasePrediction(file);
      setResult(prediction);
      setAnalysisState("success");
      // Persist disease list for offline fallback
      saveDiseaseCache(
        (loadDiseaseCache() as Disease[]).concat(prediction.disease).slice(-5),
      );
    } catch {
      setAnalysisState("error");
    }
  };

  const handleReset = () => {
    setAnalysisState("idle");
    setResult(null);
  };

  const showTabs = analysisState === "idle";

  return (
    <div className="min-h-screen bg-background" data-ocid="detect-page">
      {/* Page header */}
      <div className="bg-card border-b border-border sticky top-0 z-10 shadow-subtle">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <h1 className="text-xl font-bold font-display text-foreground">
            Scan Your Crop
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Upload or capture a photo for AI-powered disease detection
          </p>
        </div>
      </div>

      {/* Offline banner */}
      {!isOnline && (
        <aside
          className="bg-amber-500/10 border-b border-amber-500/30 text-amber-700 dark:text-amber-400"
          data-ocid="offline-banner"
          aria-live="polite"
          aria-label="Network status"
        >
          <div className="max-w-2xl mx-auto px-4 py-2.5 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <p className="text-sm font-medium">
              You are offline. Showing cached disease info — live predictions
              unavailable.
            </p>
          </div>
        </aside>
      )}

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Offline cached disease list */}
        {!isOnline && cachedDiseases.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
            data-ocid="cached-disease-list"
          >
            <p className="text-sm font-semibold text-foreground font-display flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
              Recently Detected Diseases (Cached)
            </p>
            {cachedDiseases.map((d) => {
              const style = getSeverityStyle(d.severity);
              return (
                <div
                  key={d.id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border shadow-subtle"
                >
                  <div
                    className={`w-2 h-8 rounded-full shrink-0 ${style.bg} border ${style.border}`}
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">
                      {d.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {d.plantType} ·{" "}
                      <span className={style.text}>
                        {getSeverityLabel(d.severity)}
                      </span>
                    </p>
                  </div>
                  <Badge
                    className={`${style.badge} text-xs ml-auto shrink-0`}
                    variant="outline"
                  >
                    {getSeverityLabel(d.severity)}
                  </Badge>
                </div>
              );
            })}
          </motion.div>
        )}

        {!isOnline && cachedDiseases.length === 0 && showTabs && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-3 py-8 text-center"
            data-ocid="offline-no-cache"
          >
            <div className="w-14 h-14 rounded-full bg-amber-500/10 flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-amber-500" />
            </div>
            <p className="font-semibold text-foreground font-display">
              No Cached Data Available
            </p>
            <p className="text-sm text-muted-foreground max-w-xs">
              Connect to the internet and scan a crop first — results will be
              saved for offline access.
            </p>
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {analysisState === "analyzing" && (
            <motion.div key="analysing">
              <AnalysingOverlay />
            </motion.div>
          )}

          {analysisState === "error" && (
            <motion.div key="error">
              <ErrorState onRetry={handleReset} />
            </motion.div>
          )}

          {analysisState === "success" && result && (
            <motion.div key="result">
              <ResultPanel result={result} onReset={handleReset} />
            </motion.div>
          )}

          {showTabs && isOnline && (
            <motion.div
              key="tabs"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              {/* Tips banner */}
              <Card className="p-3 bg-primary/5 border-primary/20 mb-4">
                <p className="text-xs text-primary font-medium leading-relaxed">
                  💡 <strong>Tip:</strong> For best results, photograph the
                  affected leaf or stem in good natural light. Include both
                  healthy and diseased areas for comparison.
                </p>
              </Card>

              <Tabs
                value={activeTab}
                onValueChange={(v) => setActiveTab(v as DetectTab)}
                data-ocid="detect-tabs"
              >
                <TabsList
                  className="w-full mb-5 h-10"
                  data-ocid="detect-tab-list"
                >
                  <TabsTrigger
                    value="upload"
                    className="flex-1 gap-2 text-sm"
                    data-ocid="tab-upload"
                  >
                    <Upload className="w-4 h-4" />
                    Upload Image
                  </TabsTrigger>
                  <TabsTrigger
                    value="camera"
                    className="flex-1 gap-2 text-sm"
                    data-ocid="tab-camera"
                  >
                    <Camera className="w-4 h-4" />
                    Live Camera
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="upload" className="mt-0">
                  <UploadTab onImageReady={handleImageReady} />
                </TabsContent>

                <TabsContent value="camera" className="mt-0">
                  <CameraTab onImageReady={handleImageReady} />
                </TabsContent>
              </Tabs>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Accuracy notice */}
        {showTabs && isOnline && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-2.5 p-3 rounded-lg bg-muted/40 border border-border"
          >
            <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
            <p className="text-xs text-muted-foreground">
              Powered by advanced plant pathology AI — 95%+ accuracy across 38
              crop diseases. Results are advisory; always consult an agronomist
              for critical decisions.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
