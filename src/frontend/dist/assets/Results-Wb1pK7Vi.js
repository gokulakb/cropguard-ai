import { c as createLucideIcon, k as useParams, h as useNavigate, i as useSavePrediction, r as reactExports, j as jsxRuntimeExports, B as Button, L as Leaf, F as FlaskConical, l as Separator, C as ChevronRight } from "./index-DQmXo4u-.js";
import { E as EmergencyAlert, g as getMedicationSearchUrl } from "./EmergencyAlert-B-fcNEZ2.js";
import { B as Badge } from "./badge-xsDIYR3X.js";
import { C as Card, a as CardContent, b as CardHeader, c as CardTitle } from "./card-BujutBYA.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-N0Z_88Kp.js";
import { g as getSeverityStyle, a as getSeverityLabel } from "./severity-D_igV3XX.js";
import { u as ue } from "./index-DPXagENf.js";
import { A as ArrowLeft } from "./arrow-left-CvxugNVW.js";
import { S as Save } from "./save-BAIaWDW6.js";
import { T as TriangleAlert } from "./triangle-alert-dwAM_9jv.js";
import { S as ShieldCheck } from "./shield-check-BFEWyuxZ.js";
import { E as ExternalLink } from "./external-link-DVb9Rp4s.js";
import "./phone-CCbQMNPb.js";
import "./index-B7d6HZwL.js";
import "./index-DPaJbrbs.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z", key: "169p4p" }],
  ["path", { d: "m9 10 2 2 4-4", key: "1gnqz4" }]
];
const BookmarkCheck = createLucideIcon("bookmark-check", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
];
const CircleCheckBig = createLucideIcon("circle-check-big", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "18", cy: "5", r: "3", key: "gq8acd" }],
  ["circle", { cx: "6", cy: "12", r: "3", key: "w7nqdw" }],
  ["circle", { cx: "18", cy: "19", r: "3", key: "1xt0gg" }],
  ["line", { x1: "8.59", x2: "15.42", y1: "13.51", y2: "17.49", key: "47mynk" }],
  ["line", { x1: "15.41", x2: "8.59", y1: "6.51", y2: "10.49", key: "1n3mei" }]
];
const Share2 = createLucideIcon("share-2", __iconNode);
const DISEASE_RECORDS = {
  "late-blight": {
    id: "late-blight",
    name: "Late Blight",
    scientificName: "Phytophthora infestans",
    plantType: "Tomato",
    severity: "severe",
    confidence: 0.94,
    cause: "Caused by the oomycete pathogen Phytophthora infestans. It spreads rapidly in cool, humid conditions with temperatures between 10–25 °C and thrives when leaf wetness persists for extended periods.",
    description: "Late blight is one of the most devastating diseases of tomato and potato crops worldwide. Dark, water-soaked lesions appear on leaves, stems, and fruit, quickly expanding into brown necrotic areas with white sporulation visible under humid conditions.",
    prevention: [
      "Use certified disease-free seeds and resistant varieties (e.g., Mountain Magic, Defiant)",
      "Ensure 60–90 cm spacing between plants for good air circulation",
      "Avoid overhead irrigation — use drip lines at soil level",
      "Apply preventive copper-based fungicide before rainy seasons",
      "Remove volunteer plants and crop debris after harvest",
      "Rotate crops — avoid planting solanaceous crops in the same plot for 2–3 years"
    ],
    treatment: [
      "Remove and destroy all visibly infected plant material immediately — do not compost",
      "Apply a systemic fungicide (Metalaxyl + Mancozeb) every 7 days under severe conditions",
      "Switch to copper oxychloride for organic fields; repeat after each rainfall",
      "Ensure adequate drainage to reduce soil moisture around roots",
      "Monitor all surrounding plants daily and isolate any new infections",
      "Report severe outbreaks to local agricultural extension officer for guidance"
    ],
    medications: [
      {
        id: "m1",
        name: "Mancozeb 75% WP",
        type: "fungicide",
        dosage: "2.5 g per litre of water",
        applicationMethod: "Foliar spray — cover upper and lower leaf surfaces",
        frequency: "Every 7–10 days, or after rain",
        notes: "Apply early morning or late evening. Pre-harvest interval: 7 days."
      },
      {
        id: "m2",
        name: "Metalaxyl-M + Mancozeb",
        type: "fungicide",
        dosage: "2 g per litre of water",
        applicationMethod: "Foliar spray with high-volume sprayer",
        frequency: "Every 10–14 days, alternating with contact fungicides",
        notes: "Systemic protection. Rotate chemistry to prevent resistance build-up."
      },
      {
        id: "m3",
        name: "Copper Oxychloride 50% WP",
        type: "organic",
        dosage: "3 g per litre of water",
        applicationMethod: "Foliar spray — thorough coverage required",
        frequency: "Every 10–14 days; repeat within 24 h of heavy rain",
        notes: "Approved for organic production. Avoid application in high heat."
      }
    ],
    imageUrl: "/assets/generated/late-blight-tomato.jpg"
  },
  "powdery-mildew": {
    id: "powdery-mildew",
    name: "Powdery Mildew",
    scientificName: "Erysiphe cichoracearum",
    plantType: "Cucumber",
    severity: "moderate",
    confidence: 0.88,
    cause: "Caused by the fungus Erysiphe cichoracearum (and related species). Unlike most fungal diseases, it thrives in warm, dry conditions with high humidity at night, spreading through airborne conidia.",
    description: "Powdery mildew produces white powdery fungal growth on leaf surfaces. Affected leaves yellow and curl, reducing photosynthesis and fruit quality. Severe infections can defoliate plants.",
    prevention: [
      "Select resistant cucumber varieties where available",
      "Maintain adequate plant spacing to improve air movement",
      "Avoid excess nitrogen fertilisation, which promotes succulent tissue",
      "Apply preventive sulfur-based fungicides during susceptible growth stages",
      "Remove heavily infected foliage early in the season"
    ],
    treatment: [
      "Apply sulfur-based or potassium bicarbonate fungicides at first sign of infection",
      "Use horticultural oil sprays to disrupt fungal growth on leaves",
      "Remove heavily infected leaves and destroy to reduce inoculum",
      "Improve ventilation in greenhouse or tunnels",
      "Follow a 7–10 day spray programme until infection is controlled"
    ],
    medications: [
      {
        id: "m4",
        name: "Wettable Sulfur 80% WP",
        type: "organic",
        dosage: "3 g per litre of water",
        applicationMethod: "Foliar spray — ensure thorough leaf coverage",
        frequency: "Every 7–10 days when conditions favour disease",
        notes: "Do not apply when temperatures exceed 35 °C — risk of phytotoxicity."
      },
      {
        id: "m5",
        name: "Myclobutanil 40% SC",
        type: "fungicide",
        dosage: "0.5 mL per litre of water",
        applicationMethod: "Foliar spray with knapsack or boom sprayer",
        frequency: "Every 14 days, maximum 4 applications per season",
        notes: "Systemic fungicide; effective on early and established infections."
      }
    ],
    imageUrl: "/assets/generated/powdery-mildew-cucumber.jpg"
  },
  "rice-blast": {
    id: "rice-blast",
    name: "Rice Blast",
    scientificName: "Magnaporthe oryzae",
    plantType: "Rice",
    severity: "severe",
    confidence: 0.91,
    cause: "Caused by the ascomycete fungus Magnaporthe oryzae. Spreads via wind-dispersed conidia. High humidity (>90%), cool nights (15–26 °C), and nitrogen-rich soils accelerate infection.",
    description: "Rice blast is the most destructive fungal disease of rice worldwide. It causes diamond-shaped lesions with grey centres on leaves; neck blast kills the panicle, causing total grain loss in severe cases.",
    prevention: [
      "Plant blast-resistant varieties certified for your region",
      "Avoid excessive nitrogen application — split doses and use slow-release forms",
      "Maintain proper water management — avoid water stress during tillering",
      "Apply silica fertilisers to strengthen cell walls",
      "Monitor fields early morning for dew-covered lesions"
    ],
    treatment: [
      "Apply tricyclazole or isoprothiolane fungicide at first sign of leaf blast",
      "Treat panicle blast with carbendazim at boot stage if infection risk is high",
      "Drain fields temporarily to reduce humidity at canopy level",
      "Harvest promptly to limit further crop loss from neck blast"
    ],
    medications: [
      {
        id: "m6",
        name: "Tricyclazole 75% WP",
        type: "fungicide",
        dosage: "0.6 g per litre of water",
        applicationMethod: "Foliar spray — two applications recommended",
        frequency: "At tillering and again at panicle initiation",
        notes: "Most effective protectant for panicle blast. Pre-harvest: 30 days."
      },
      {
        id: "m7",
        name: "Isoprothiolane 40% EC",
        type: "fungicide",
        dosage: "1.5 mL per litre of water",
        applicationMethod: "Foliar or granular soil application",
        frequency: "Every 14–21 days during high-risk periods",
        notes: "Also controls brown planthopper as secondary benefit."
      }
    ],
    imageUrl: "/assets/generated/rice-blast-paddy.jpg"
  }
};
function getPredictionById(id) {
  const diseaseMap = {
    "demo-1": "late-blight",
    "demo-2": "powdery-mildew",
    "demo-3": "rice-blast"
  };
  const key = diseaseMap[id] ?? Object.keys(DISEASE_RECORDS)[0];
  const disease = DISEASE_RECORDS[key];
  if (!disease) return null;
  return {
    id,
    imageUrl: disease.imageUrl ?? "/assets/images/placeholder.svg",
    plantType: disease.plantType,
    disease,
    severity: disease.severity,
    confidence: disease.confidence,
    analyzedAt: (/* @__PURE__ */ new Date()).toISOString()
  };
}
function MedicationCard({ med }) {
  const typeColors = {
    fungicide: "bg-primary/10 text-primary border-primary/20",
    pesticide: "bg-accent/10 text-accent border-accent/20",
    organic: "bg-primary/15 text-primary border-primary/30",
    fertilizer: "bg-secondary text-secondary-foreground border-border",
    other: "bg-muted text-muted-foreground border-border"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-xl border border-border bg-card p-4 space-y-3 hover:shadow-subtle transition-smooth",
      "data-ocid": `medication-card-${med.id}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground font-display text-sm leading-tight", children: med.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Badge,
              {
                variant: "outline",
                className: `text-xs capitalize mt-1.5 ${typeColors[med.type]}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FlaskConical, { className: "w-3 h-3 mr-1" }),
                  med.type
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              className: "shrink-0 gap-1.5 text-xs font-medium border-primary/30 text-primary hover:bg-primary/5",
              onClick: () => window.open(getMedicationSearchUrl(med.name), "_blank"),
              "data-ocid": `medication-search-${med.id}`,
              "aria-label": `Search Google for ${med.name}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3 h-3" }),
                "Search on Google"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/60 rounded-lg p-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-0.5", children: "Dosage" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: med.dosage })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/60 rounded-lg p-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-0.5", children: "Method" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: med.applicationMethod })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/60 rounded-lg p-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-0.5", children: "Frequency" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: med.frequency })
          ] })
        ] }),
        med.notes && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground italic border-t border-border pt-2", children: med.notes })
      ]
    }
  );
}
function SeverityBadge({ severity }) {
  const style = getSeverityStyle(severity);
  const label = getSeverityLabel(severity);
  const isSevere = severity === "severe";
  const isModerate = severity === "moderate";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: `${style.badge} gap-1.5 text-sm px-3 py-1 font-semibold`, children: [
    isSevere && /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-3.5 h-3.5" }),
    isModerate && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: "▲" }),
    !isSevere && !isModerate && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: "●" }),
    label
  ] });
}
function ConfidenceRing({ value }) {
  const pct = Math.round(value * 100);
  const high = pct >= 85;
  const mid = pct >= 65;
  const colorClass = high ? "text-primary" : mid ? "text-accent" : "text-muted-foreground";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: `text-3xl font-bold font-display tabular-nums ${colorClass}`,
        children: [
          pct,
          "%"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "AI Confidence" })
  ] });
}
function FallbackResult({
  predictionId,
  onBack
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 md:p-6 max-w-2xl mx-auto space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: onBack,
        className: "flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors",
        "data-ocid": "results-back",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
          "Back to Detection"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "shadow-subtle", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "py-12 text-center space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { className: "w-8 h-8 text-muted-foreground" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold font-display text-foreground", children: "Analysis Not Found" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-2 max-w-sm mx-auto", children: [
          "No disease record was found for prediction #",
          predictionId,
          ". The scan may still be processing or the data was not saved."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col sm:flex-row gap-2 justify-center pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: onBack,
          className: "gap-2",
          "data-ocid": "fallback-rescan",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
            "Scan Again"
          ]
        }
      ) })
    ] }) })
  ] });
}
function Results() {
  const { predictionId } = useParams({ from: "/results/$predictionId" });
  const navigate = useNavigate();
  const savePrediction = useSavePrediction();
  const [saved, setSaved] = reactExports.useState(false);
  const [emergencyDismissed, setEmergencyDismissed] = reactExports.useState(false);
  const prediction = getPredictionById(predictionId);
  const handleBack = () => navigate({ to: "/detect" });
  if (!prediction || !prediction.disease) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(FallbackResult, { predictionId, onBack: handleBack });
  }
  const disease = prediction.disease;
  const severityStyle = getSeverityStyle(disease.severity);
  const isSevere = disease.severity === "severe";
  const handleSave = async () => {
    if (saved) return;
    try {
      await savePrediction.mutateAsync(prediction);
      setSaved(true);
      ue.success("Analysis saved to your history");
    } catch {
      ue.error("Failed to save — please try again");
    }
  };
  const handleWhatsAppShare = () => {
    const firstTreatment = disease.treatment[0] ?? "Follow agronomist advice";
    const appUrl = window.location.origin;
    const text = `CropGuard AI detected: ${disease.name} (${disease.severity} severity) on ${prediction.plantType}. Treatment: ${firstTreatment}. Scan your crops at ${appUrl}`;
    window.open(
      `https://wa.me/?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 md:p-6 max-w-2xl mx-auto space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: handleBack,
          className: "flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors",
          "data-ocid": "results-back",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
            "Back to Detection"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            className: "gap-2 text-xs border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366]/10 hover:border-[#25D366]",
            onClick: handleWhatsAppShare,
            "data-ocid": "results-whatsapp-share",
            "aria-label": "Share results via WhatsApp",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "w-3.5 h-3.5" }),
              "WhatsApp"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            className: "gap-2 text-xs",
            onClick: handleSave,
            disabled: saved || savePrediction.isPending,
            "data-ocid": "results-save",
            children: [
              saved ? /* @__PURE__ */ jsxRuntimeExports.jsx(BookmarkCheck, { className: "w-3.5 h-3.5 text-primary" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-3.5 h-3.5" }),
              saved ? "Saved" : "Save to History"
            ]
          }
        )
      ] })
    ] }),
    isSevere && !emergencyDismissed && /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmergencyAlert,
      {
        diseaseName: disease.name,
        plantType: disease.plantType,
        predictionId,
        onDismiss: () => setEmergencyDismissed(true)
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-elevated overflow-hidden", children: [
      prediction.imageUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-52 bg-muted overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: prediction.imageUrl,
            alt: `${disease.plantType} showing ${disease.name}`,
            className: "w-full h-full object-cover",
            onError: (e) => {
              e.target.src = "/assets/images/placeholder.svg";
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `absolute top-3 left-3 flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold backdrop-blur-sm border ${severityStyle.badge}`,
            children: [
              isSevere && /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-3.5 h-3.5" }),
              disease.severity === "moderate" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "▲" }),
              disease.severity === "mild" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "●" }),
              disease.severity === "healthy" && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3.5 h-3.5" }),
              getSeverityLabel(disease.severity)
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-label text-muted-foreground mb-1", children: "Potential Disease" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold font-display text-foreground leading-tight", children: disease.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground italic mt-0.5", children: disease.scientificName }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-2.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { className: "w-4 h-4 text-primary shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: disease.plantType }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SeverityBadge, { severity: disease.severity })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ConfidenceRing, { value: disease.confidence })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-3 leading-relaxed border-t border-border pt-3", children: disease.description })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-subtle", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-display text-base", children: "Disease Analysis" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "cause", className: "w-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "w-full grid grid-cols-3 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "cause", "data-ocid": "tab-cause", children: "Cause" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "prevention", "data-ocid": "tab-prevention", children: "Prevention" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "treatment", "data-ocid": "tab-treatment", children: "Treatment" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "cause", className: "mt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `rounded-xl p-4 ${severityStyle.bg} border ${severityStyle.border}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground leading-relaxed", children: disease.cause })
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "prevention", className: "mt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2.5", "data-ocid": "prevention-list", children: disease.prevention.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "li",
          {
            className: "flex items-start gap-3 text-sm",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center shrink-0 text-primary text-xs font-bold mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-3 h-3" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground leading-relaxed", children: item })
            ]
          },
          item.slice(0, 40)
        )) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "treatment", className: "mt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2.5", "data-ocid": "treatment-list", children: disease.treatment.map((step, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "li",
          {
            className: "flex items-start gap-3 text-sm",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center shrink-0 text-primary text-[10px] font-bold mt-0.5", children: i + 1 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground leading-relaxed", children: step })
            ]
          },
          step.slice(0, 40)
        )) }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-subtle", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "font-display text-base flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FlaskConical, { className: "w-4 h-4 text-primary" }),
          "Medication Recommendations"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Links open Google search — no prices, ratings, or company promotion." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-3", "data-ocid": "medication-list", children: disease.medications.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground text-center py-4", children: "No specific medications identified for this condition." }) : disease.medications.map((med, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        idx > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(MedicationCard, { med })
      ] }, med.id)) })
    ] }),
    !isSevere && /* @__PURE__ */ jsxRuntimeExports.jsx(
      Card,
      {
        className: `shadow-subtle border ${severityStyle.border} ${severityStyle.bg}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 flex items-center justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground font-display", children: "Need expert advice?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Book a consultation with a local agricultural officer for personalised guidance." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              className: "shrink-0 gap-1.5",
              onClick: () => navigate({
                to: "/appointment",
                search: {
                  predictionId,
                  diseaseName: disease.name,
                  severity: disease.severity,
                  cropType: prediction.plantType
                }
              }),
              "data-ocid": "results-book-consultation",
              children: [
                "Book",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3.5 h-3.5" })
              ]
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2" })
  ] });
}
export {
  Results
};
