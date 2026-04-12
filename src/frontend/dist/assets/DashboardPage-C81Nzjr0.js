import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, M as MapPin, B as Button, u as useAuth, a as useUserProfile, b as usePredictionHistory, m as motion, L as Leaf, d as Link, S as Scan, e as MessageSquare, f as Skeleton } from "./index-DQmXo4u-.js";
import { E as EmergencyAlert } from "./EmergencyAlert-B-fcNEZ2.js";
import { E as ExternalLink } from "./external-link-DVb9Rp4s.js";
import { B as Badge } from "./badge-xsDIYR3X.js";
import { C as Card, a as CardContent } from "./card-BujutBYA.js";
import { g as getSeverityStyle, a as getSeverityLabel } from "./severity-D_igV3XX.js";
import { C as ChartColumn } from "./chart-column-C9RGKZe3.js";
import { T as TriangleAlert } from "./triangle-alert-dwAM_9jv.js";
import { S as ShieldCheck } from "./shield-check-BFEWyuxZ.js";
import { S as Sprout } from "./sprout-DXnuLk5D.js";
import { C as Clock } from "./clock-BrAIK8X3.js";
import "./phone-CCbQMNPb.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 2v2", key: "tus03m" }],
  ["path", { d: "m4.93 4.93 1.41 1.41", key: "149t6j" }],
  ["path", { d: "M20 12h2", key: "1q8mjw" }],
  ["path", { d: "m19.07 4.93-1.41 1.41", key: "1shlcs" }],
  ["path", { d: "M15.947 12.65a4 4 0 0 0-5.925-4.128", key: "dpwdj0" }],
  ["path", { d: "M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z", key: "s09mg5" }]
];
const CloudSun = createLucideIcon("cloud-sun", __iconNode);
function WeatherWidget() {
  const [weather, setWeather] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(false);
  reactExports.useEffect(() => {
    setLoading(true);
    if (!navigator.geolocation) {
      setError(true);
      setLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setWeather({
          location: "Your Location",
          lat: pos.coords.latitude,
          lon: pos.coords.longitude
        });
        setLoading(false);
      },
      () => {
        setError(true);
        setLoading(false);
      },
      { timeout: 8e3 }
    );
  }, []);
  const googleWeatherUrl = weather ? `https://www.google.com/search?q=weather+${weather.lat.toFixed(4)},${weather.lon.toFixed(4)}` : "https://www.google.com/search?q=weather+forecast+for+farmers";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card border border-border rounded-lg p-4 shadow-subtle",
      "data-ocid": "weather-widget",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CloudSun, { className: "w-4 h-4 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm font-display text-foreground", children: "Weather" }),
              weather && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3 h-3" }),
                weather.location
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_74x24dp.png",
              alt: "Google",
              className: "h-5 opacity-70"
            }
          )
        ] }),
        loading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 bg-muted rounded animate-pulse w-3/4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 bg-muted rounded animate-pulse w-1/2" })
        ] }),
        error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-3", children: "Enable location for local weather" }),
        !loading && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            className: "w-full gap-2 text-xs",
            onClick: () => window.open(googleWeatherUrl, "_blank"),
            "data-ocid": "weather-open-google",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3 h-3" }),
              "View Full Forecast on Google"
            ]
          }
        )
      ]
    }
  );
}
const SAMPLE_PREDICTIONS = [
  {
    id: "pred-1",
    imageUrl: "/assets/generated/crop-tomato-blight.dim_400x300.jpg",
    plantType: "Tomato",
    disease: {
      id: "d-1",
      name: "Late Blight",
      scientificName: "Phytophthora infestans",
      plantType: "Tomato",
      severity: "severe",
      confidence: 0.94,
      cause: "Oomycete pathogen Phytophthora infestans",
      description: "Severe fungal infection causing rapid leaf necrosis.",
      prevention: ["Avoid overhead watering", "Use resistant varieties"],
      treatment: ["Apply copper-based fungicide", "Remove infected tissue"],
      medications: []
    },
    severity: "severe",
    confidence: 0.94,
    analyzedAt: "2026-04-09T07:00:00Z",
    notes: "Emergency: Late Blight Detected"
  },
  {
    id: "pred-2",
    imageUrl: "/assets/generated/crop-rice-mildew.dim_400x300.jpg",
    plantType: "Rice",
    disease: {
      id: "d-2",
      name: "Downy Mildew",
      scientificName: "Plasmopara viticola",
      plantType: "Rice",
      severity: "mild",
      confidence: 0.88,
      cause: "Fungal pathogen in humid conditions",
      description: "Mild foliar disease causing yellowing patches.",
      prevention: ["Improve air circulation", "Reduce leaf wetness"],
      treatment: ["Mancozeb spray", "Neem oil application"],
      medications: []
    },
    severity: "mild",
    confidence: 0.88,
    analyzedAt: "2026-04-08T14:30:00Z",
    notes: "Downy Mildew — Likely Confident (88%)"
  },
  {
    id: "pred-3",
    imageUrl: "/assets/generated/crop-wheat-rust.dim_400x300.jpg",
    plantType: "Wheat",
    disease: {
      id: "d-3",
      name: "Powdery Mildew",
      scientificName: "Blumeria graminis",
      plantType: "Wheat",
      severity: "moderate",
      confidence: 0.76,
      cause: "Ascomycete fungus in dry conditions",
      description: "White powdery patches on leaf surfaces.",
      prevention: ["Crop rotation", "Adequate spacing"],
      treatment: ["Sulfur-based fungicide", "Trifloxystrobin treatment"],
      medications: []
    },
    severity: "moderate",
    confidence: 0.76,
    analyzedAt: "2026-04-07T09:15:00Z",
    notes: "Powdery Mildew — Moderate Risk"
  },
  {
    id: "pred-4",
    imageUrl: "/assets/generated/crop-maize-blight.dim_400x300.jpg",
    plantType: "Maize",
    disease: null,
    severity: "healthy",
    confidence: 0.97,
    analyzedAt: "2026-04-06T11:00:00Z",
    notes: "Healthy crop — no disease detected"
  },
  {
    id: "pred-5",
    imageUrl: "/assets/generated/crop-potato-leaf.dim_400x300.jpg",
    plantType: "Potato",
    disease: {
      id: "d-5",
      name: "Early Blight",
      scientificName: "Alternaria solani",
      plantType: "Potato",
      severity: "mild",
      confidence: 0.81,
      cause: "Alternaria solani fungus",
      description: "Dark concentric ring lesions on lower leaves.",
      prevention: ["Remove infected leaves early", "Avoid excess nitrogen"],
      treatment: ["Chlorothalonil spray", "Copper hydroxide"],
      medications: []
    },
    severity: "mild",
    confidence: 0.81,
    analyzedAt: "2026-04-05T16:45:00Z",
    notes: "Early Blight — Action Recommended"
  }
];
function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 6e4);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}
function countBySeverity(preds, sev) {
  return preds.filter((p) => p.severity === sev).length;
}
function PredictionRow({ pred, index }) {
  var _a;
  const style = getSeverityStyle(pred.severity);
  const diseaseName = ((_a = pred.disease) == null ? void 0 : _a.name) ?? (pred.severity === "healthy" ? "Healthy" : "Unknown");
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, x: -12 },
      animate: { opacity: 1, x: 0 },
      transition: { delay: index * 0.08, duration: 0.35 },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/results/$predictionId",
          params: { predictionId: pred.id },
          className: "flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/60 transition-smooth group",
          "data-ocid": "history-row",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-lg bg-muted overflow-hidden shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: pred.imageUrl,
                alt: pred.plantType,
                className: "w-full h-full object-cover group-hover:scale-110 transition-smooth",
                onError: (e) => {
                  e.currentTarget.src = "/assets/images/placeholder.svg";
                }
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm font-display text-foreground truncate", children: diseaseName }),
                pred.severity === "severe" && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-0.5 text-[10px] font-semibold text-destructive bg-destructive/10 border border-destructive/20 rounded px-1.5 py-0.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-2.5 h-2.5" }),
                  " Severe"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-0.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Sprout, { className: "w-3 h-3 text-muted-foreground shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground truncate", children: pred.plantType }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/40", children: "•" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3 text-muted-foreground shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: timeAgo(pred.analyzedAt) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "shrink-0 text-right", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  className: `${style.badge} border text-[10px] px-1.5 py-0.5 mb-1`,
                  children: getSeverityLabel(pred.severity)
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                Math.round(pred.confidence * 100),
                "%"
              ] })
            ] })
          ]
        }
      )
    }
  );
}
function QuickActionCard({
  icon: Icon,
  label,
  description,
  href,
  scrollTarget,
  variant,
  index
}) {
  const variantStyles = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    accent: "bg-accent text-accent-foreground hover:bg-accent/90",
    default: "bg-card border border-border text-foreground hover:bg-secondary/80"
  };
  const content = /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 12 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: 0.1 + index * 0.07, duration: 0.35 },
      className: `flex flex-col gap-2 p-4 rounded-xl cursor-pointer transition-smooth shadow-subtle ${variantStyles[variant]}`,
      "data-ocid": `quick-action-${label.toLowerCase().replace(/\s/g, "-")}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm font-display leading-tight", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: `text-xs mt-0.5 leading-tight ${variant === "default" ? "text-muted-foreground" : "opacity-75"}`,
              children: description
            }
          )
        ] })
      ]
    }
  );
  if (scrollTarget) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => {
          var _a;
          return (_a = document.getElementById(scrollTarget)) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
        },
        className: "block text-left w-full",
        children: content
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: href, className: "block", children: content });
}
function StatsRow({ predictions }) {
  const total = predictions.length;
  const severe = countBySeverity(predictions, "severe");
  const mild = countBySeverity(predictions, "mild") + countBySeverity(predictions, "moderate");
  const healthy = countBySeverity(predictions, "healthy");
  const stats = [
    {
      label: "Total Scans",
      value: total,
      icon: ChartColumn,
      color: "text-primary",
      bg: "bg-primary/10"
    },
    {
      label: "Severe Cases",
      value: severe,
      icon: TriangleAlert,
      color: "text-destructive",
      bg: "bg-destructive/10"
    },
    {
      label: "Mild / Moderate",
      value: mild,
      icon: ShieldCheck,
      color: "text-accent",
      bg: "bg-accent/10"
    },
    {
      label: "Healthy",
      value: healthy,
      icon: Leaf,
      color: "text-primary",
      bg: "bg-primary/10"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: stats.map(({ label, value, icon: Icon, color, bg }, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      transition: { delay: 0.15 + i * 0.06, duration: 0.3 },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "shadow-subtle border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-3 flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `w-9 h-9 rounded-lg ${bg} flex items-center justify-center shrink-0`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `w-4 h-4 ${color}` })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-xl font-bold font-display ${color}`, children: value }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground leading-tight", children: label })
        ] })
      ] }) })
    },
    label
  )) });
}
function EmptyState() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4 },
      className: "flex flex-col items-center text-center py-14 px-6 bg-card border border-border rounded-2xl shadow-subtle",
      "data-ocid": "empty-state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sprout, { className: "w-10 h-10 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold font-display text-foreground mb-2", children: "No scans yet" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-xs mb-6", children: "Upload a photo of your crop to get instant AI-powered disease detection with 95%+ accuracy." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, "data-ocid": "empty-state-cta", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/detect", className: "gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Scan, { className: "w-4 h-4" }),
          "Scan Your First Crop"
        ] }) })
      ]
    }
  );
}
function HistorySkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: ["sk-1", "sk-2", "sk-3"].map((skKey) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-12 h-12 rounded-lg shrink-0" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3.5 w-40" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-28" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-14 rounded-full shrink-0" })
  ] }, skKey)) });
}
function DashboardPage() {
  var _a;
  const { principal } = useAuth();
  const { data: profile } = useUserProfile();
  const { data: fetchedPredictions, isLoading: loadingHistory } = usePredictionHistory();
  const predictions = fetchedPredictions && fetchedPredictions.length > 0 ? fetchedPredictions : SAMPLE_PREDICTIONS;
  const displayName = (profile == null ? void 0 : profile.displayName) ?? (principal == null ? void 0 : principal.slice(0, 8)) ?? "Farmer";
  const hour = (/* @__PURE__ */ new Date()).getHours();
  const greeting = hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";
  const hasSevere = predictions.some((p) => p.severity === "severe");
  const severePred = predictions.find((p) => p.severity === "severe");
  const recent = predictions.slice(0, 5);
  const isEmpty = !loadingHistory && predictions.length === 0;
  const QUICK_ACTIONS = [
    {
      icon: Scan,
      label: "Scan Disease",
      description: "AI-powered crop analysis",
      href: "/detect",
      variant: "primary"
    },
    {
      icon: ChartColumn,
      label: "My History",
      description: "View all predictions",
      scrollTarget: "history-section",
      variant: "default"
    },
    {
      icon: MessageSquare,
      label: "Ask AgriBot",
      description: "Chat with AI assistant",
      href: "/chat",
      variant: "accent"
    },
    {
      icon: CloudSun,
      label: "Weather",
      description: "Check field conditions",
      scrollTarget: "weather-section",
      variant: "default"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 md:p-6 space-y-6 max-w-4xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -10 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4 },
        className: "bg-card border border-border rounded-2xl p-5 shadow-subtle",
        "data-ocid": "dashboard-hero",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl font-bold font-display text-foreground", children: [
                greeting,
                ", ",
                displayName,
                "!"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: [
                "Protect your crops with AI —",
                " ",
                (/* @__PURE__ */ new Date()).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric"
                })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { className: "w-6 h-6 text-primary" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/detect",
              className: "mt-4 flex items-center gap-3 bg-primary/10 hover:bg-primary/15 border border-primary/20 rounded-xl p-3 transition-smooth group",
              "data-ocid": "hero-scan-cta",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 bg-primary rounded-xl flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Scan, { className: "w-5 h-5 text-primary-foreground" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground font-display text-sm", children: "Scan Your Crop" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Initiate AI-powered analysis" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto text-primary text-lg group-hover:translate-x-0.5 transition-transform", children: "→" })
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "quick-actions", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold font-display text-muted-foreground mb-3 uppercase tracking-wide", children: "Quick Actions" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: QUICK_ACTIONS.map((action, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(QuickActionCard, { ...action, index: i }, action.label)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "stats-row", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold font-display text-muted-foreground mb-3 uppercase tracking-wide", children: "Overview" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatsRow, { predictions })
    ] }),
    hasSevere && severePred && /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmergencyAlert,
      {
        diseaseName: ((_a = severePred.disease) == null ? void 0 : _a.name) ?? "Severe Disease",
        plantType: severePred.plantType,
        predictionId: severePred.id
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "history-section", "data-ocid": "history-section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold font-display text-foreground", children: "Recent Predictions" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/detect",
            className: "text-xs text-primary hover:underline font-medium",
            "data-ocid": "history-scan-new",
            children: "Scan New →"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-2xl shadow-subtle overflow-hidden", children: loadingHistory ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(HistorySkeleton, {}) }) : isEmpty ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: recent.map((pred, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(PredictionRow, { pred, index: i }, pred.id)) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        id: "weather-section",
        className: "grid grid-cols-1 md:grid-cols-2 gap-4",
        "data-ocid": "bottom-widgets",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(WeatherWidget, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "shadow-subtle", "data-ocid": "agribot-teaser", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 flex flex-col h-full", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 bg-primary rounded-xl flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-4 h-4 text-primary-foreground" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold font-display text-foreground text-sm", children: "AgriBot Assistant" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "How can I help you today?" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-4 leading-relaxed", children: "Ask about disease treatment, prevention strategies, crop management, or medication recommendations." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                size: "sm",
                className: "w-full gap-2 mt-auto",
                asChild: true,
                "data-ocid": "agribot-open",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/chat", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-3.5 h-3.5" }),
                  "Ask AgriBot"
                ] })
              }
            )
          ] }) })
        ]
      }
    )
  ] });
}
export {
  DashboardPage as Dashboard,
  DashboardPage
};
