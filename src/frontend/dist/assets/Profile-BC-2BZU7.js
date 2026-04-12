import { c as createLucideIcon, u as useAuth, h as useNavigate, a as useUserProfile, b as usePredictionHistory, I as useAppointments, J as useSaveUserProfile, r as reactExports, j as jsxRuntimeExports, f as Skeleton, D as Avatar, E as AvatarFallback, B as Button, X, L as Leaf, U as User, M as MapPin, T as TrendingUp, l as Separator, d as Link, w as Calendar, K as LogOut, C as ChevronRight, N as useAlertSettings, O as useSaveAlertSettings, Q as Bell } from "./index-DQmXo4u-.js";
import { B as Badge } from "./badge-xsDIYR3X.js";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-BujutBYA.js";
import { I as Input } from "./input-CXyKGE_g.js";
import { L as Label } from "./label-ClXPzMbA.js";
import { g as getSeverityStyle, a as getSeverityLabel } from "./severity-D_igV3XX.js";
import { u as ue } from "./index-DPXagENf.js";
import { P as Phone } from "./phone-CCbQMNPb.js";
import { S as Save } from "./save-BAIaWDW6.js";
import { T as TriangleAlert } from "./triangle-alert-dwAM_9jv.js";
import { C as Clock } from "./clock-BrAIK8X3.js";
import { S as ShieldCheck } from "./shield-check-BFEWyuxZ.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
      key: "169zse"
    }
  ]
];
const Activity = createLucideIcon("activity", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ]
];
const Pen = createLucideIcon("pen", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M2 22 16 8", key: "60hf96" }],
  [
    "path",
    {
      d: "M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z",
      key: "1rdhi6"
    }
  ],
  [
    "path",
    {
      d: "M7.47 8.53 9 7l1.53 1.53a3.5 3.5 0 0 1 0 4.94L9 15l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z",
      key: "1sdzmb"
    }
  ],
  [
    "path",
    {
      d: "M11.47 4.53 13 3l1.53 1.53a3.5 3.5 0 0 1 0 4.94L13 11l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z",
      key: "eoatbi"
    }
  ],
  ["path", { d: "M20 2h2v2a4 4 0 0 1-4 4h-2V6a4 4 0 0 1 4-4Z", key: "19rau1" }],
  [
    "path",
    {
      d: "M11.47 17.47 13 19l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L5 19l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z",
      key: "tc8ph9"
    }
  ],
  [
    "path",
    {
      d: "M15.47 13.47 17 15l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L9 15l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z",
      key: "2m8kc5"
    }
  ],
  [
    "path",
    {
      d: "M19.47 9.47 21 11l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L13 11l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z",
      key: "vex3ng"
    }
  ]
];
const Wheat = createLucideIcon("wheat", __iconNode);
const SAMPLE_PREDICTIONS = [
  {
    id: "pred-1",
    imageUrl: "/assets/generated/hero-crop-field.dim_1200x600.jpg",
    plantType: "Tomato",
    disease: null,
    severity: "severe",
    confidence: 0.94,
    analyzedAt: "2026-04-09T07:00:00Z",
    notes: "Emergency: Late Blight Detected"
  },
  {
    id: "pred-2",
    imageUrl: "/assets/generated/hero-crop-field.dim_1200x600.jpg",
    plantType: "Rice",
    disease: null,
    severity: "mild",
    confidence: 0.88,
    analyzedAt: "2026-04-08T14:30:00Z",
    notes: "Downy Mildew — Likely Confident"
  },
  {
    id: "pred-3",
    imageUrl: "/assets/generated/hero-crop-field.dim_1200x600.jpg",
    plantType: "Wheat",
    disease: null,
    severity: "moderate",
    confidence: 0.76,
    analyzedAt: "2026-04-07T09:00:00Z",
    notes: "Powdery Mildew — Action Required"
  },
  {
    id: "pred-4",
    imageUrl: "/assets/generated/hero-crop-field.dim_1200x600.jpg",
    plantType: "Maize",
    disease: null,
    severity: "healthy",
    confidence: 0.97,
    analyzedAt: "2026-04-06T11:00:00Z",
    notes: "No Disease — Healthy"
  }
];
const SAMPLE_APPOINTMENTS = [
  {
    id: "apt-1",
    farmerName: "James Mwangi",
    farmerContact: "+254 700 000 001",
    location: "Nakuru North Plot",
    cropType: "Tomato",
    issue: "Late Blight — Severe",
    preferredDate: "2026-04-14",
    status: "confirmed",
    officerName: "Dr. Alice Kamau",
    createdAt: "2026-04-09T08:00:00Z",
    predictionId: "pred-1"
  },
  {
    id: "apt-2",
    farmerName: "James Mwangi",
    farmerContact: "+254 700 000 001",
    location: "South Field",
    cropType: "Rice",
    issue: "Downy Mildew",
    preferredDate: "2026-04-16",
    status: "pending",
    createdAt: "2026-04-08T09:00:00Z",
    predictionId: "pred-2"
  }
];
const CROP_OPTIONS = [
  "Tomato",
  "Rice",
  "Wheat",
  "Maize",
  "Potato",
  "Cassava",
  "Cotton",
  "Soybean"
];
function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  accent
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "shadow-subtle", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 flex flex-col gap-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `w-8 h-8 rounded-lg flex items-center justify-center mb-1 ${accent ?? "bg-primary/10"}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Icon,
          {
            className: `w-4 h-4 ${accent ? "text-foreground" : "text-primary"}`
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold font-display text-foreground leading-none", children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: label }),
    sub && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-primary font-medium", children: sub })
  ] }) });
}
function PredictionRow({ pred }) {
  var _a, _b, _c;
  const style = getSeverityStyle(pred.severity);
  const label = getSeverityLabel(pred.severity);
  const diseaseName = ((_b = (_a = pred.notes) == null ? void 0 : _a.split("—")[0]) == null ? void 0 : _b.replace("Emergency:", "").trim()) ?? ((_c = pred.disease) == null ? void 0 : _c.name) ?? "Unknown";
  const date = new Date(pred.analyzedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Link,
    {
      to: "/results/$predictionId",
      params: { predictionId: pred.id },
      className: "flex items-center gap-3 p-3 rounded-xl hover:bg-muted/40 transition-smooth group",
      "data-ocid": "profile-history-row",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: pred.imageUrl,
            alt: pred.plantType,
            className: "w-full h-full object-cover group-hover:scale-105 transition-smooth"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground font-display truncate", children: diseaseName }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: `${style.badge} text-[10px] px-1.5 py-0 shrink-0`, children: label })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-0.5 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { className: "w-3 h-3 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: pred.plantType }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: date })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-bold font-display text-foreground", children: [
            Math.round(pred.confidence * 100),
            "%"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "confidence" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 text-muted-foreground group-hover:text-primary transition-smooth ml-1 shrink-0" })
      ]
    }
  );
}
function AppointmentRow({ apt }) {
  const statusConfig = {
    pending: {
      label: "Pending",
      cls: "bg-accent/10 text-accent border-accent/20"
    },
    confirmed: {
      label: "Confirmed",
      cls: "bg-primary/10 text-primary border-primary/20"
    },
    completed: {
      label: "Completed",
      cls: "bg-muted text-muted-foreground border-border"
    },
    cancelled: {
      label: "Cancelled",
      cls: "bg-destructive/10 text-destructive border-destructive/20"
    }
  };
  const sc = statusConfig[apt.status];
  const date = new Date(apt.preferredDate).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric"
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex items-start gap-3 p-3 rounded-xl hover:bg-muted/40 transition-smooth",
      "data-ocid": "profile-appointment-row",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-4 h-4 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold text-sm text-foreground font-display", children: [
              apt.cropType,
              " — ",
              apt.issue
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: `${sc.cls} text-[10px] px-1.5 py-0`, children: sc.label })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-0.5 text-xs text-muted-foreground flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: date }),
            apt.officerName && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-3 h-3 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: apt.officerName })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3 h-3 inline mr-0.5" }),
            apt.location
          ] })
        ] })
      ]
    }
  );
}
const REGIONS = [
  "North",
  "South",
  "East",
  "West",
  "Central",
  "Northeast",
  "Northwest",
  "Southeast",
  "Southwest"
];
function RegionalAlerts() {
  const { data: savedSettings, isLoading } = useAlertSettings();
  const saveMutation = useSaveAlertSettings();
  const [settings, setSettings] = reactExports.useState(
    () => REGIONS.map((region) => ({ region, enabled: false }))
  );
  reactExports.useEffect(() => {
    if (!savedSettings) return;
    const serverMap = new Map(savedSettings.map((s) => [s.region, s.enabled]));
    setSettings(
      REGIONS.map((region) => ({
        region,
        enabled: serverMap.get(region) ?? false
      }))
    );
  }, [savedSettings]);
  const handleToggle = (region) => {
    const next = settings.map(
      (s) => s.region === region ? { ...s, enabled: !s.enabled } : s
    );
    setSettings(next);
    saveMutation.mutate(next, {
      onSuccess: () => ue.success("Alert settings saved"),
      onError: () => ue.error("Failed to save alert settings")
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "profile-alert-settings", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-semibold font-display text-foreground mb-3 flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-4 h-4 text-primary" }),
      "Regional Disease Alerts"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "shadow-subtle", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-4", children: "Get notified when a disease outbreak is reported in your region. Toggle on the regions you farm in or monitor." }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 rounded-lg" }, i)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-2", children: settings.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => handleToggle(s.region),
          disabled: saveMutation.isPending,
          className: `flex items-center justify-between px-3 py-2.5 rounded-lg border text-sm font-medium transition-smooth ${s.enabled ? "bg-primary/10 border-primary/30 text-primary" : "bg-muted/40 border-border text-muted-foreground hover:border-primary/30 hover:text-foreground"}`,
          "data-ocid": `alert-toggle-${s.region.toLowerCase()}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: s.region }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `w-8 h-4 rounded-full relative transition-smooth flex-shrink-0 ${s.enabled ? "bg-primary" : "bg-border"}`,
                "aria-hidden": "true",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `absolute top-0.5 w-3 h-3 rounded-full bg-white shadow transition-transform ${s.enabled ? "translate-x-4" : "translate-x-0.5"}`
                  }
                )
              }
            )
          ]
        },
        s.region
      )) }),
      saveMutation.isPending && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-3 text-center animate-pulse", children: "Saving…" })
    ] }) })
  ] });
}
function ProfilePage() {
  var _a;
  const { principal, logout } = useAuth();
  const navigate = useNavigate();
  const { data: profile, isLoading: profileLoading } = useUserProfile();
  const { data: predictionsRaw, isLoading: predLoading } = usePredictionHistory();
  const { data: appointmentsRaw, isLoading: aptLoading } = useAppointments();
  const saveMutation = useSaveUserProfile();
  const predictions = predictionsRaw && predictionsRaw.length > 0 ? predictionsRaw : SAMPLE_PREDICTIONS;
  const appointments = appointmentsRaw && appointmentsRaw.length > 0 ? appointmentsRaw : SAMPLE_APPOINTMENTS;
  const [editMode, setEditMode] = reactExports.useState(false);
  const [showAllHistory, setShowAllHistory] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState({
    displayName: (profile == null ? void 0 : profile.displayName) ?? "James Mwangi",
    farmName: (profile == null ? void 0 : profile.farmName) ?? "Sunrise Farm",
    location: (profile == null ? void 0 : profile.location) ?? "Nakuru, Kenya",
    phone: (profile == null ? void 0 : profile.phone) ?? "+254 700 000 000",
    primaryCrops: (profile == null ? void 0 : profile.primaryCrops) ?? ["Tomato", "Wheat"]
  });
  const toggleCrop = (crop) => {
    setForm((prev) => ({
      ...prev,
      primaryCrops: prev.primaryCrops.includes(crop) ? prev.primaryCrops.filter((c) => c !== crop) : [...prev.primaryCrops, crop]
    }));
  };
  const handleSave = () => {
    saveMutation.mutate(form.displayName, {
      onSuccess: () => {
        ue.success("Profile saved successfully");
        setEditMode(false);
      },
      onError: () => ue.error("Failed to save profile")
    });
  };
  const handleLogout = () => {
    logout();
    navigate({ to: "/" });
  };
  const initials = (form.displayName || principal || "U").split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  const totalPredictions = predictions.length;
  const severityCount = predictions.reduce(
    (acc, p) => {
      acc[p.severity] = (acc[p.severity] ?? 0) + 1;
      return acc;
    },
    { healthy: 0, mild: 0, moderate: 0, severe: 0 }
  );
  const diseaseNames = predictions.map(
    (p) => {
      var _a2, _b, _c;
      return ((_b = (_a2 = p.notes) == null ? void 0 : _a2.split("—")[0]) == null ? void 0 : _b.replace("Emergency:", "").trim()) ?? ((_c = p.disease) == null ? void 0 : _c.name);
    }
  ).filter((n) => !!n && n !== "No Disease");
  const mostCommonDisease = diseaseNames.length > 0 ? ((_a = Object.entries(
    diseaseNames.reduce((acc, n) => {
      acc[n] = (acc[n] ?? 0) + 1;
      return acc;
    }, {})
  ).sort((a, b) => b[1] - a[1])[0]) == null ? void 0 : _a[0]) ?? "None" : "None";
  const visiblePredictions = showAllHistory ? predictions : predictions.slice(0, 4);
  if (profileLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 md:p-6 max-w-2xl mx-auto space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 rounded-2xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-40 rounded-2xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-64 rounded-2xl" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 md:p-6 max-w-2xl mx-auto space-y-6 pb-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card border border-border rounded-2xl p-5 shadow-subtle relative overflow-hidden",
        "data-ocid": "profile-header",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-start gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { className: "w-16 h-16 ring-2 ring-primary/20 ring-offset-2 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-primary/15 text-primary text-xl font-bold font-display", children: initials }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
              editMode ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    value: form.displayName,
                    onChange: (e) => setForm((p) => ({ ...p, displayName: e.target.value })),
                    placeholder: "Your name",
                    className: "font-display font-semibold h-8 text-sm",
                    "data-ocid": "profile-name-edit"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    value: form.farmName,
                    onChange: (e) => setForm((p) => ({ ...p, farmName: e.target.value })),
                    placeholder: "Farm name",
                    className: "h-7 text-xs",
                    "data-ocid": "profile-farm-edit"
                  }
                )
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold font-display text-foreground", children: form.displayName || "Your Profile" }),
                form.farmName && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: form.farmName })
              ] }),
              principal && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground font-mono truncate mt-1", children: [
                "ID: ",
                principal.slice(0, 24),
                "…"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "outline",
                className: "shrink-0 gap-1.5 text-xs",
                onClick: () => editMode ? setEditMode(false) : setEditMode(true),
                "data-ocid": "profile-edit-toggle",
                children: [
                  editMode ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "w-3.5 h-3.5" }),
                  editMode ? "Cancel" : "Edit"
                ]
              }
            )
          ] }),
          form.primaryCrops.length > 0 && !editMode && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative flex flex-wrap gap-1.5 mt-3", children: form.primaryCrops.map((crop) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Badge,
            {
              variant: "outline",
              className: "text-[10px] px-2 py-0 border-primary/20 text-primary bg-primary/5",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { className: "w-2.5 h-2.5 mr-1" }),
                crop
              ]
            },
            crop
          )) })
        ]
      }
    ),
    editMode && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-subtle", "data-ocid": "profile-edit-form", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "font-display text-sm flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-4 h-4 text-primary" }),
        "Edit Profile"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Label,
              {
                htmlFor: "location",
                className: "text-xs flex items-center gap-1.5",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3.5 h-3.5" }),
                  " Location"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "location",
                value: form.location,
                onChange: (e) => setForm((p) => ({ ...p, location: e.target.value })),
                placeholder: "Nakuru, Kenya",
                "data-ocid": "profile-location"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Label,
              {
                htmlFor: "phone",
                className: "text-xs flex items-center gap-1.5",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3.5 h-3.5" }),
                  " Phone"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "phone",
                value: form.phone,
                onChange: (e) => setForm((p) => ({ ...p, phone: e.target.value })),
                placeholder: "+254 700 000 000",
                "data-ocid": "profile-phone"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-xs flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Wheat, { className: "w-3.5 h-3.5" }),
            " Primary Crops"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: CROP_OPTIONS.map((crop) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: form.primaryCrops.includes(crop) ? "default" : "outline",
              className: "cursor-pointer transition-smooth text-xs",
              onClick: () => toggleCrop(crop),
              "data-ocid": `profile-crop-${crop.toLowerCase()}`,
              children: crop
            },
            crop
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: handleSave,
            className: "w-full gap-2",
            disabled: saveMutation.isPending,
            "data-ocid": "profile-save",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-4 h-4" }),
              saveMutation.isPending ? "Saving…" : "Save Profile"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "profile-stats", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-semibold font-display text-foreground mb-3 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 text-primary" }),
        "Summary"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            icon: Activity,
            label: "Total Scans",
            value: totalPredictions,
            sub: "All time"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            icon: TriangleAlert,
            label: "Severe Alerts",
            value: severityCount.severe,
            sub: severityCount.severe > 0 ? "Needs attention" : "All clear",
            accent: severityCount.severe > 0 ? "bg-destructive/10" : void 0
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            icon: Leaf,
            label: "Healthy Scans",
            value: severityCount.healthy,
            sub: "No disease"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            icon: TrendingUp,
            label: "Most Common",
            value: mostCommonDisease.length > 10 ? `${mostCommonDisease.slice(0, 10)}…` : mostCommonDisease,
            sub: "Disease"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "mt-3 shadow-subtle", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide", children: "Severity Breakdown" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [
          {
            key: "healthy",
            label: "Healthy",
            color: "bg-primary"
          },
          {
            key: "mild",
            label: "Mild",
            color: "bg-primary/60"
          },
          {
            key: "moderate",
            label: "Moderate",
            color: "bg-accent"
          },
          {
            key: "severe",
            label: "Severe",
            color: "bg-destructive"
          }
        ].map(({ key, label, color }) => {
          const count = severityCount[key];
          const pct = totalPredictions > 0 ? Math.round(count / totalPredictions * 100) : 0;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-16 text-xs text-muted-foreground shrink-0", children: label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-2 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `h-full rounded-full ${color} transition-all duration-500`,
                style: { width: `${pct}%` }
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-foreground w-8 text-right", children: count })
          ] }, key);
        }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "profile-history", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-semibold font-display text-foreground flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-4 h-4 text-primary" }),
          "Prediction History",
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-[10px] px-1.5 py-0 ml-1", children: totalPredictions })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/detect",
            className: "text-xs text-primary hover:underline transition-smooth",
            "data-ocid": "profile-new-scan",
            children: "+ New Scan"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "shadow-subtle", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-2", children: predLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 p-2", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 rounded-xl" }, i)) }) : predictions.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "text-center py-10 text-muted-foreground",
          "data-ocid": "profile-history-empty",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-8 h-8 mx-auto mb-2 opacity-30" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: "No scans yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mt-1", children: "Scan your first crop to see history here" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                variant: "outline",
                className: "mt-3 gap-1.5",
                asChild: true,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/detect", children: "Start Scanning" })
              }
            )
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border/50", children: visiblePredictions.map((pred) => /* @__PURE__ */ jsxRuntimeExports.jsx(PredictionRow, { pred }, pred.id)) }) }) }),
      predictions.length > 4 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          className: "w-full mt-2 text-xs text-primary hover:underline py-1.5 transition-smooth",
          onClick: () => setShowAllHistory((p) => !p),
          "data-ocid": "profile-history-toggle",
          children: showAllHistory ? "Show less" : `View all ${predictions.length} scans →`
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "profile-appointments", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-semibold font-display text-foreground flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-4 h-4 text-primary" }),
          "Appointments",
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-[10px] px-1.5 py-0 ml-1", children: appointments.length })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/appointment",
            search: {
              predictionId: void 0,
              diseaseName: void 0,
              severity: void 0,
              cropType: void 0
            },
            className: "text-xs text-primary hover:underline transition-smooth",
            "data-ocid": "profile-new-appointment",
            children: "+ Book New"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "shadow-subtle", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-2", children: aptLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 p-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 rounded-xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 rounded-xl" })
      ] }) : appointments.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "text-center py-8 text-muted-foreground",
          "data-ocid": "profile-appointments-empty",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-8 h-8 mx-auto mb-2 opacity-30" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: "No appointments" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mt-1", children: "Book a consultation with an agricultural officer" })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border/50", children: appointments.map((apt) => /* @__PURE__ */ jsxRuntimeExports.jsx(AppointmentRow, { apt }, apt.id)) }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(RegionalAlerts, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          className: "w-full gap-2 border-destructive/30 text-destructive hover:bg-destructive/10 hover:border-destructive/50 transition-smooth",
          onClick: handleLogout,
          "data-ocid": "profile-logout",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-4 h-4" }),
            "Log Out"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-[11px] text-muted-foreground mt-3", children: "Your data is securely stored on the Internet Computer." })
    ] })
  ] });
}
export {
  ProfilePage as Profile
};
