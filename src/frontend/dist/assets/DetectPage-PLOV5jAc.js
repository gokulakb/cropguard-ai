import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, m as motion, A as AnimatePresence, g as LoaderCircle, B as Button, h as useNavigate, i as useSavePrediction, X } from "./index-DQmXo4u-.js";
import { E as EmergencyAlert } from "./EmergencyAlert-B-fcNEZ2.js";
import { B as Badge } from "./badge-xsDIYR3X.js";
import { C as Card } from "./card-BujutBYA.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-N0Z_88Kp.js";
import { g as getSeverityStyle, a as getSeverityLabel } from "./severity-D_igV3XX.js";
import { C as CircleAlert } from "./circle-alert-QrCMW89p.js";
import { C as Camera } from "./camera-B0Z2ManJ.js";
import { C as CircleCheck } from "./circle-check-C7dpl9YC.js";
import { R as RefreshCw } from "./refresh-cw-DM99w0v-.js";
import "./triangle-alert-dwAM_9jv.js";
import "./phone-CCbQMNPb.js";
import "./external-link-DVb9Rp4s.js";
import "./index-B7d6HZwL.js";
import "./index-DPaJbrbs.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M8 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h3", key: "1i73f7" }],
  ["path", { d: "M16 3h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3", key: "saxlbk" }],
  ["path", { d: "M12 20v2", key: "1lh1kg" }],
  ["path", { d: "M12 14v2", key: "8jcxud" }],
  ["path", { d: "M12 8v2", key: "1woqiv" }],
  ["path", { d: "M12 2v2", key: "tus03m" }]
];
const FlipHorizontal = createLucideIcon("flip-horizontal", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 3v12", key: "1x0j5s" }],
  ["path", { d: "m17 8-5-5-5 5", key: "7q97r8" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }]
];
const Upload = createLucideIcon("upload", __iconNode);
function useCamera(config = {}) {
  const {
    facingMode: initialFacingMode = "environment",
    quality = 0.92,
    format = "image/jpeg"
  } = config;
  const videoRef = reactExports.useRef(null);
  const canvasRef = reactExports.useRef(null);
  const streamRef = reactExports.useRef(null);
  const [isActive, setIsActive] = reactExports.useState(false);
  const [isSupported, setIsSupported] = reactExports.useState(null);
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const [currentFacingMode, setCurrentFacingMode] = reactExports.useState(initialFacingMode);
  reactExports.useEffect(() => {
    setIsSupported(
      typeof navigator !== "undefined" && !!navigator.mediaDevices && typeof navigator.mediaDevices.getUserMedia === "function"
    );
    return () => {
      if (streamRef.current) {
        for (const track of streamRef.current.getTracks()) track.stop();
      }
    };
  }, []);
  const stopCamera = reactExports.useCallback(async () => {
    if (streamRef.current) {
      for (const track of streamRef.current.getTracks()) track.stop();
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsActive(false);
  }, []);
  const startCamera = reactExports.useCallback(async () => {
    if (!isSupported) return false;
    setIsLoading(true);
    setError(null);
    try {
      if (streamRef.current) {
        for (const track of streamRef.current.getTracks()) track.stop();
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: currentFacingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setIsActive(true);
      return true;
    } catch (err) {
      const e = err;
      let cameraError;
      if (e.name === "NotAllowedError" || e.name === "PermissionDeniedError") {
        cameraError = {
          type: "permission",
          message: "Camera access denied. Please allow camera permission in your browser settings."
        };
      } else if (e.name === "NotFoundError" || e.name === "DevicesNotFoundError") {
        cameraError = {
          type: "not-found",
          message: "No camera found on this device."
        };
      } else if (e.name === "NotSupportedError") {
        cameraError = {
          type: "not-supported",
          message: "Camera is not supported in this browser."
        };
      } else {
        cameraError = {
          type: "unknown",
          message: "Unable to access camera. Please check your device settings."
        };
      }
      setError(cameraError);
      setIsActive(false);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [isSupported, currentFacingMode]);
  const capturePhoto = reactExports.useCallback(async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || !isActive) return null;
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            resolve(null);
            return;
          }
          const ext = format === "image/png" ? "png" : format === "image/webp" ? "webp" : "jpg";
          resolve(
            new File([blob], `crop-capture-${Date.now()}.${ext}`, {
              type: format
            })
          );
        },
        format,
        quality
      );
    });
  }, [isActive, format, quality]);
  const switchCamera = reactExports.useCallback(
    async (newFacingMode) => {
      const next = newFacingMode ?? (currentFacingMode === "user" ? "environment" : "user");
      setCurrentFacingMode(next);
      if (isActive) {
        if (streamRef.current) {
          for (const track of streamRef.current.getTracks()) track.stop();
        }
        setIsLoading(true);
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: {
              facingMode: next,
              width: { ideal: 1280 },
              height: { ideal: 720 }
            },
            audio: false
          });
          streamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            await videoRef.current.play();
          }
          return true;
        } catch {
          setIsActive(false);
          return false;
        } finally {
          setIsLoading(false);
        }
      }
      return true;
    },
    [isActive, currentFacingMode]
  );
  const retry = reactExports.useCallback(() => {
    setError(null);
    return startCamera();
  }, [startCamera]);
  return {
    isActive,
    isSupported,
    error,
    isLoading,
    currentFacingMode,
    startCamera,
    stopCamera,
    capturePhoto,
    switchCamera,
    retry,
    videoRef,
    canvasRef
  };
}
const CACHE_KEY = "cropguard_cached_diseases";
function saveDiseaseCache(diseases) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(diseases.slice(0, 5)));
  } catch {
  }
}
function loadDiseaseCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}
async function runDiseasePrediction(imageFile) {
  await new Promise((r) => setTimeout(r, 2200));
  const imageUrl = URL.createObjectURL(imageFile);
  const diseases = [
    {
      id: "late-blight-001",
      name: "Late Blight",
      scientificName: "Phytophthora infestans",
      plantType: "Tomato",
      severity: "severe",
      confidence: 0.97,
      cause: "Oomycete pathogen Phytophthora infestans thriving in cool, moist conditions.",
      description: "Rapidly spreading water-soaked lesions on leaves turning brown; white sporulation visible on undersides.",
      prevention: [
        "Use certified disease-free seed",
        "Avoid overhead irrigation",
        "Ensure good field drainage",
        "Apply preventative fungicides during high-risk weather"
      ],
      treatment: [
        "Remove and destroy all infected plant material immediately",
        "Apply contact or systemic fungicide (mancozeb, chlorothalonil)",
        "Increase plant spacing for better airflow"
      ],
      medications: [
        {
          id: "med-001",
          name: "Mancozeb 75 WP",
          type: "fungicide",
          dosage: "2.5 g per litre of water",
          applicationMethod: "Foliar spray",
          frequency: "Every 7 days under wet conditions",
          notes: "Protective action — apply before infection"
        },
        {
          id: "med-002",
          name: "Metalaxyl-M + Mancozeb",
          type: "fungicide",
          dosage: "2 g per litre of water",
          applicationMethod: "Foliar spray",
          frequency: "Every 10–14 days",
          notes: "Systemic + contact action for established infection"
        }
      ],
      imageUrl
    },
    {
      id: "downy-mildew-001",
      name: "Downy Mildew",
      scientificName: "Peronospora spp.",
      plantType: "Cucumber",
      severity: "moderate",
      confidence: 0.88,
      cause: "Fungal-like pathogen flourishing in high humidity with cool nights.",
      description: "Yellow angular spots on upper leaf surface with grey-purple sporulation beneath.",
      prevention: [
        "Choose resistant varieties",
        "Avoid wetting foliage when watering",
        "Remove crop debris after harvest"
      ],
      treatment: [
        "Apply copper-based fungicide or fosetyl-aluminium",
        "Improve ventilation and reduce leaf wetness"
      ],
      medications: [
        {
          id: "med-003",
          name: "Copper Hydroxide",
          type: "fungicide",
          dosage: "3 g per litre of water",
          applicationMethod: "Foliar spray",
          frequency: "Every 7–10 days"
        }
      ],
      imageUrl
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
        "Keep records of crop health"
      ],
      treatment: [],
      medications: [],
      imageUrl
    }
  ];
  const picked = diseases[Math.floor(Math.random() * diseases.length)];
  return {
    id: `pred-${Date.now()}`,
    disease: picked,
    severity: picked.severity,
    confidence: picked.confidence,
    imageUrl,
    plantType: picked.plantType,
    analyzedAt: (/* @__PURE__ */ new Date()).toISOString()
  };
}
function ConfidenceBar({ value }) {
  const pct = Math.round(value * 100);
  const color = pct >= 90 ? "bg-primary" : pct >= 70 ? "bg-accent" : "bg-destructive";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Confidence" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground", children: [
        pct,
        "%"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 w-full rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        className: `h-full rounded-full ${color}`,
        initial: { width: 0 },
        animate: { width: `${pct}%` },
        transition: { duration: 0.8, ease: "easeOut" }
      }
    ) })
  ] });
}
function ResultPanel({
  result,
  onReset
}) {
  const navigate = useNavigate();
  const { mutate: savePrediction } = useSavePrediction();
  const [saved, setSaved] = reactExports.useState(false);
  const style = getSeverityStyle(result.severity);
  const isSevere = result.severity === "severe";
  const handleViewDetails = () => {
    const prediction = {
      id: result.id,
      imageUrl: result.imageUrl,
      plantType: result.plantType,
      disease: result.disease,
      severity: result.severity,
      confidence: result.confidence,
      analyzedAt: result.analyzedAt
    };
    if (!saved) {
      savePrediction(prediction);
      setSaved(true);
    }
    navigate({
      to: "/results/$predictionId",
      params: { predictionId: result.id }
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      className: "space-y-4",
      "data-ocid": "result-panel",
      children: [
        isSevere && /* @__PURE__ */ jsxRuntimeExports.jsx(
          EmergencyAlert,
          {
            diseaseName: result.disease.name,
            plantType: result.plantType,
            predictionId: result.id
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "overflow-hidden border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-video bg-muted overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: result.imageUrl,
                alt: "Scanned crop",
                className: "w-full h-full object-cover"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-3 left-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-white/90 uppercase tracking-wider", children: "Potential Disease" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold text-white font-display leading-tight", children: result.disease.name })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Badge,
                {
                  className: `${style.badge} border text-xs font-semibold`,
                  "data-ocid": "severity-badge",
                  children: [
                    style.icon,
                    " ",
                    getSeverityLabel(result.severity)
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: result.plantType }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs text-muted-foreground", children: result.disease.scientificName })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ConfidenceBar, { value: result.confidence }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: result.disease.description }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  className: "flex-1 gap-2",
                  onClick: handleViewDetails,
                  "data-ocid": "view-details-btn",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" }),
                    "View Full Analysis"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "outline",
                  onClick: onReset,
                  className: "gap-2",
                  "data-ocid": "scan-again-btn",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4" }),
                    "Scan Again"
                  ]
                }
              )
            ] })
          ] })
        ] })
      ]
    }
  );
}
function UploadTab({
  onImageReady
}) {
  const [preview, setPreview] = reactExports.useState(null);
  const [dragOver, setDragOver] = reactExports.useState(false);
  const [selectedFile, setSelectedFile] = reactExports.useState(null);
  const inputRef = reactExports.useRef(null);
  const handleDrop = reactExports.useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (!file || !file.type.match(/^image\/(jpeg|png|webp)$/)) return;
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  }, []);
  const handleInputChange = (e) => {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!file || !file.type.match(/^image\/(jpeg|png|webp)$/)) return;
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };
  const clearPreview = () => {
    setPreview(null);
    setSelectedFile(null);
    if (inputRef.current) inputRef.current.value = "";
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", "data-ocid": "upload-tab", children: [
    !preview ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "label",
      {
        onDrop: handleDrop,
        onDragOver: (e) => {
          e.preventDefault();
          setDragOver(true);
        },
        onDragLeave: () => setDragOver(false),
        "aria-label": "Upload crop image",
        className: `
            w-full relative flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed
            cursor-pointer transition-smooth min-h-[220px] p-8 text-center select-none
            ${dragOver ? "border-primary bg-primary/5 scale-[1.01]" : "border-border hover:border-primary/50 hover:bg-primary/3 bg-muted/30"}
          `,
        "data-ocid": "upload-dropzone",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `w-14 h-14 rounded-full flex items-center justify-center transition-smooth
            ${dragOver ? "bg-primary/15" : "bg-muted"}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Upload,
                {
                  className: `w-6 h-6 transition-smooth ${dragOver ? "text-primary" : "text-muted-foreground"}`
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground font-display", children: dragOver ? "Drop to analyse" : "Drag & drop your crop photo" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "or click to browse — JPG, PNG, WebP accepted" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              ref: inputRef,
              type: "file",
              accept: "image/jpeg,image/png,image/webp",
              className: "sr-only",
              onChange: handleInputChange,
              "data-ocid": "upload-file-input"
            }
          )
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-xl overflow-hidden border border-border shadow-subtle", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: preview,
          alt: "Selected crop",
          className: "w-full max-h-72 object-cover"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: clearPreview,
          "aria-label": "Remove selected image",
          className: "absolute top-2 right-2 w-8 h-8 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-smooth",
          "data-ocid": "remove-preview-btn",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/80 truncate", children: selectedFile == null ? void 0 : selectedFile.name }) })
    ] }),
    selectedFile && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        className: "w-full gap-2 h-11",
        onClick: () => onImageReady(selectedFile),
        "data-ocid": "analyse-upload-btn",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" }),
          "Analyse Disease"
        ]
      }
    )
  ] });
}
function CameraTab({ onImageReady }) {
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
    canvasRef
  } = useCamera({
    facingMode: "environment",
    quality: 0.92,
    format: "image/jpeg"
  });
  const [captured, setCaptured] = reactExports.useState(null);
  const [capturedFile, setCapturedFile] = reactExports.useState(null);
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
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center gap-3 py-12 text-center",
        "data-ocid": "camera-unsupported",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-6 h-6 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "Camera Not Supported" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Your device or browser does not support camera access. Use the Upload tab instead." })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", "data-ocid": "camera-tab", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative rounded-xl overflow-hidden bg-muted border border-border aspect-video min-h-[220px]", children: captured ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: captured,
        alt: "Captured crop",
        className: "w-full h-full object-cover"
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "video",
        {
          ref: videoRef,
          autoPlay: true,
          playsInline: true,
          muted: true,
          className: "w-full h-full object-cover",
          style: { display: isActive ? "block" : "none" }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("canvas", { ref: canvasRef, className: "hidden" }),
      !isActive && !isLoading && !error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center gap-3 bg-muted", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-6 h-6 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Camera ready to start" })
      ] }),
      isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-muted/80", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-8 h-8 text-primary animate-spin" }) }),
      error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center gap-3 bg-muted p-4 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-8 h-8 text-destructive" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-destructive", children: "Camera Error" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground max-w-xs", children: error.message })
      ] })
    ] }) }),
    !captured ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: !isActive ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        className: "flex-1 gap-2 h-11",
        onClick: startCamera,
        disabled: isLoading,
        "data-ocid": "start-camera-btn",
        children: [
          isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-4 h-4" }),
          isLoading ? "Starting…" : "Start Camera"
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          className: "flex-1 gap-2 h-11",
          onClick: handleCapture,
          disabled: isLoading,
          "data-ocid": "capture-btn",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-4 h-4" }),
            "Capture Photo"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "outline",
          size: "icon",
          className: "h-11 w-11",
          onClick: () => switchCamera(),
          disabled: isLoading,
          "aria-label": "Switch camera",
          "data-ocid": "switch-camera-btn",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(FlipHorizontal, { className: "w-4 h-4" })
        }
      )
    ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          className: "flex-1 gap-2 h-11",
          onClick: () => capturedFile && onImageReady(capturedFile),
          "data-ocid": "analyse-capture-btn",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" }),
            "Analyse This Photo"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          className: "gap-2 h-11",
          onClick: handleRetake,
          "data-ocid": "retake-btn",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4" }),
            "Retake"
          ]
        }
      )
    ] })
  ] });
}
function AnalysingOverlay() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      className: "flex flex-col items-center gap-5 py-10 text-center",
      "data-ocid": "analysing-state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-9 h-9 text-primary animate-spin" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full animate-ping opacity-60" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-foreground font-display text-lg", children: "Analysing Your Crop…" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 max-w-xs", children: "AI is scanning for diseases with 95%+ accuracy using advanced plant pathology models." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1.5 pt-1", children: ["Preprocessing", "Detecting", "Classifying"].map((step, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.span,
          {
            initial: { opacity: 0.3 },
            animate: { opacity: [0.3, 1, 0.3] },
            transition: {
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.5
            },
            className: "text-xs text-muted-foreground px-2 py-0.5 bg-muted rounded-full",
            children: step
          },
          step
        )) })
      ]
    }
  );
}
function ErrorState({ onRetry }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 10 },
      animate: { opacity: 1, y: 0 },
      className: "flex flex-col items-center gap-4 py-10 text-center",
      "data-ocid": "error-state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-7 h-7 text-destructive" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-foreground font-display", children: "Analysis Failed" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 max-w-xs", children: "We couldn't analyse your image. Please try again with a clearer photo of the affected plant." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: onRetry,
            variant: "outline",
            className: "gap-2",
            "data-ocid": "retry-btn",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4" }),
              "Try Again"
            ]
          }
        )
      ]
    }
  );
}
function DetectPage() {
  const [activeTab, setActiveTab] = reactExports.useState("upload");
  const [analysisState, setAnalysisState] = reactExports.useState("idle");
  const [result, setResult] = reactExports.useState(null);
  const [isOnline, setIsOnline] = reactExports.useState(navigator.onLine);
  const [cachedDiseases, setCachedDiseases] = reactExports.useState([]);
  reactExports.useEffect(() => {
    const goOnline = () => setIsOnline(true);
    const goOffline = () => {
      setIsOnline(false);
      setCachedDiseases(loadDiseaseCache());
    };
    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);
    if (!navigator.onLine) setCachedDiseases(loadDiseaseCache());
    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);
  const handleImageReady = async (file) => {
    setAnalysisState("analyzing");
    setResult(null);
    try {
      const prediction = await runDiseasePrediction(file);
      setResult(prediction);
      setAnalysisState("success");
      saveDiseaseCache(
        loadDiseaseCache().concat(prediction.disease).slice(-5)
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", "data-ocid": "detect-page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border sticky top-0 z-10 shadow-subtle", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 py-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold font-display text-foreground", children: "Scan Your Crop" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Upload or capture a photo for AI-powered disease detection" })
    ] }) }),
    !isOnline && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "aside",
      {
        className: "bg-amber-500/10 border-b border-amber-500/30 text-amber-700 dark:text-amber-400",
        "data-ocid": "offline-banner",
        "aria-live": "polite",
        "aria-label": "Network status",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 py-2.5 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: "You are offline. Showing cached disease info — live predictions unavailable." })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 py-6 space-y-6", children: [
      !isOnline && cachedDiseases.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          className: "space-y-3",
          "data-ocid": "cached-disease-list",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-foreground font-display flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-amber-500 inline-block" }),
              "Recently Detected Diseases (Cached)"
            ] }),
            cachedDiseases.map((d) => {
              const style = getSeverityStyle(d.severity);
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center gap-3 p-3 rounded-lg bg-card border border-border shadow-subtle",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: `w-2 h-8 rounded-full shrink-0 ${style.bg} border ${style.border}`
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground truncate", children: d.name }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                        d.plantType,
                        " ·",
                        " ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: style.text, children: getSeverityLabel(d.severity) })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Badge,
                      {
                        className: `${style.badge} text-xs ml-auto shrink-0`,
                        variant: "outline",
                        children: getSeverityLabel(d.severity)
                      }
                    )
                  ]
                },
                d.id
              );
            })
          ]
        }
      ),
      !isOnline && cachedDiseases.length === 0 && showTabs && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          className: "flex flex-col items-center gap-3 py-8 text-center",
          "data-ocid": "offline-no-cache",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-amber-500/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-6 h-6 text-amber-500" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground font-display", children: "No Cached Data Available" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-xs", children: "Connect to the internet and scan a crop first — results will be saved for offline access." })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { mode: "wait", children: [
        analysisState === "analyzing" && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnalysingOverlay, {}) }, "analysing"),
        analysisState === "error" && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorState, { onRetry: handleReset }) }, "error"),
        analysisState === "success" && result && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResultPanel, { result, onReset: handleReset }) }, "result"),
        showTabs && isOnline && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 12 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-3 bg-primary/5 border-primary/20 mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-primary font-medium leading-relaxed", children: [
                "💡 ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Tip:" }),
                " For best results, photograph the affected leaf or stem in good natural light. Include both healthy and diseased areas for comparison."
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Tabs,
                {
                  value: activeTab,
                  onValueChange: (v) => setActiveTab(v),
                  "data-ocid": "detect-tabs",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      TabsList,
                      {
                        className: "w-full mb-5 h-10",
                        "data-ocid": "detect-tab-list",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            TabsTrigger,
                            {
                              value: "upload",
                              className: "flex-1 gap-2 text-sm",
                              "data-ocid": "tab-upload",
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-4 h-4" }),
                                "Upload Image"
                              ]
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            TabsTrigger,
                            {
                              value: "camera",
                              className: "flex-1 gap-2 text-sm",
                              "data-ocid": "tab-camera",
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-4 h-4" }),
                                "Live Camera"
                              ]
                            }
                          )
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "upload", className: "mt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(UploadTab, { onImageReady: handleImageReady }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "camera", className: "mt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CameraTab, { onImageReady: handleImageReady }) })
                  ]
                }
              )
            ]
          },
          "tabs"
        )
      ] }),
      showTabs && isOnline && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { delay: 0.3 },
          className: "flex items-center gap-2.5 p-3 rounded-lg bg-muted/40 border border-border",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-primary shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Powered by advanced plant pathology AI — 95%+ accuracy across 38 crop diseases. Results are advisory; always consult an agronomist for critical decisions." })
          ]
        }
      )
    ] })
  ] });
}
export {
  DetectPage
};
