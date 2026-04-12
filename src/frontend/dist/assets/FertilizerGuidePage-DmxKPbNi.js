import { r as reactExports, a5 as useFertilizerGuide, j as jsxRuntimeExports, F as FlaskConical, f as Skeleton, L as Leaf, W as ChevronDown } from "./index-DQmXo4u-.js";
import { B as Badge } from "./badge-xsDIYR3X.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-Dg50Yx0j.js";
import { I as Info } from "./info-tiYQ34ap.js";
import { C as ChevronUp } from "./chevron-up-D3BYUhf-.js";
import "./index-B7d6HZwL.js";
import "./index-BYJyCJKl.js";
import "./index-DPaJbrbs.js";
const CROPS = [
  "Rice",
  "Wheat",
  "Maize",
  "Tomato",
  "Potato",
  "Cotton",
  "Sugarcane",
  "Soybean"
];
const GROWTH_STAGES = ["Seedling", "Vegetative", "Flowering"];
function parseNPK(ratio) {
  const parts = ratio.split(/[-:]/).map((s) => s.trim());
  return { n: parts[0] ?? "—", p: parts[1] ?? "—", k: parts[2] ?? "—" };
}
function parseSoilPh(range) {
  const match = range.match(/([\d.]+)[^0-9.]+([\d.]+)/);
  if (match)
    return {
      min: Number.parseFloat(match[1]),
      max: Number.parseFloat(match[2])
    };
  return { min: 5.5, max: 7.5 };
}
function FertilizerGuidePage() {
  const [cropType, setCropType] = reactExports.useState("");
  const [growthStage, setGrowthStage] = reactExports.useState("");
  const [npkOpen, setNpkOpen] = reactExports.useState(false);
  const { data: guide, isLoading } = useFertilizerGuide(cropType, growthStage);
  const npk = guide ? parseNPK(guide.npkRatio) : null;
  const ph = guide ? parseSoilPh(guide.soilPhRange) : null;
  const phPercent = ph ? (ph.min - 4) / (10 - 4) * 100 : 0;
  const phWidth = ph ? (ph.max - ph.min) / (10 - 4) * 100 : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 py-8 space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-label text-muted-foreground mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FlaskConical, { className: "w-4 h-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Agricultural Tools" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-display-md font-display", children: "Fertilizer & Soil Guide" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-base max-w-xl", children: "Get NPK recommendations and soil health tips tailored to your crop and growth stage." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-data", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-label text-muted-foreground block mb-2", children: "Crop Type" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { onValueChange: setCropType, value: cropType, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "fertilizer-crop-selector", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select crop..." }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: CROPS.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c, children: c }, c)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-label text-muted-foreground block mb-2", children: "Growth Stage" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { onValueChange: setGrowthStage, value: growthStage, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "fertilizer-stage-selector", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select stage..." }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: GROWTH_STAGES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, children: s }, s)) })
        ] })
      ] })
    ] }) }),
    isLoading && cropType && growthStage && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-40 w-full rounded-lg" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 w-full rounded-lg" })
    ] }),
    (!cropType || !growthStage) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "card-data flex flex-col items-center justify-center py-14 text-center",
        "data-ocid": "fertilizer-empty-state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-5xl mb-4", children: "🌿" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-lg mb-1", children: "Select Crop & Stage" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm max-w-xs", children: "Choose a crop type and growth stage above to get personalized fertilizer recommendations." })
        ]
      }
    ),
    cropType && growthStage && !isLoading && guide === null && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "card-data flex flex-col items-center justify-center py-14 text-center",
        "data-ocid": "fertilizer-not-found",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-5xl mb-4", children: "🔍" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-lg mb-1", children: "No Data Available" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm", children: [
            "No guide found for ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: cropType }),
            " at",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: growthStage }),
            " stage."
          ] })
        ]
      }
    ),
    guide && npk && ph && !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", "data-ocid": "fertilizer-results", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-data space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-base", children: "NPK Fertilizer Ratio" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2 p-4 rounded-lg bg-success/10 border border-success/30", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-display font-extrabold text-success", children: npk.n }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-label text-success/80", children: "Nitrogen (N)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-muted-foreground text-center", children: "Leaf growth" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2 p-4 rounded-lg bg-info/10 border border-info/30", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-display font-extrabold text-info", children: npk.p }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-label text-info/80", children: "Phosphorus (P)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-muted-foreground text-center", children: "Root strength" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2 p-4 rounded-lg bg-warning/10 border border-warning/30", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-display font-extrabold text-warning", children: npk.k }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-label text-warning/80", children: "Potassium (K)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-muted-foreground text-center", children: "Disease resist." })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-data space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-base", children: "Soil pH Range" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs text-muted-foreground mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Acidic (4.0)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: guide.soilPhRange }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Alkaline (10.0)" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-3 rounded-full bg-muted overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 rounded-full",
              style: {
                background: "linear-gradient(to right, oklch(0.6 0.15 25), oklch(0.7 0.12 85), oklch(0.6 0.18 155), oklch(0.5 0.15 260))"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-y-0 rounded-full ring-2 ring-foreground/30",
              style: {
                left: `${phPercent}%`,
                width: `${phWidth}%`,
                background: "oklch(0.6 0.18 155 / 0.5)"
              }
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Optimal range highlighted. Outside this range, nutrient uptake decreases significantly." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-data space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm", children: "Application Timing" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: guide.applicationTiming })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-data space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold text-sm flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { className: "w-3.5 h-3.5 text-success" }),
            "Organic Alternatives"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: guide.organicOptions.length > 0 ? guide.organicOptions.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "outline",
              className: "badge-success text-xs",
              children: opt
            },
            opt
          )) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm", children: "No organic alternatives listed." }) })
        ] })
      ] }),
      guide.notes && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-data flex gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "w-5 h-5 text-info shrink-0 mt-0.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: guide.notes })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-data", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          className: "w-full flex items-center justify-between text-left transition-smooth",
          onClick: () => setNpkOpen(!npkOpen),
          "data-ocid": "npk-info-toggle",
          "aria-expanded": npkOpen,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-sm flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FlaskConical, { className: "w-4 h-4 text-primary" }),
              "What is NPK?"
            ] }),
            npkOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-4 h-4 text-muted-foreground" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4 text-muted-foreground" })
          ]
        }
      ),
      npkOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 space-y-3 text-sm text-muted-foreground leading-relaxed border-t border-border pt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-success", children: "N — Nitrogen" }),
          " is essential for vegetative growth, leaf and stem development, and overall plant vigor. A nitrogen-rich fertilizer promotes lush green foliage."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-info", children: "P — Phosphorus" }),
          " is critical for root development, energy transfer, and flowering. It helps plants establish strong root systems and improves resistance to stress."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-warning", children: "K — Potassium" }),
          " ",
          "strengthens cell walls, improves disease resistance, enhances water regulation, and boosts fruit/grain quality and shelf life."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "The NPK ratio is expressed as three numbers (e.g., 20-10-10), representing the percentage by weight of each nutrient in the fertilizer. Higher numbers mean a more concentrated nutrient." })
      ] })
    ] })
  ] });
}
export {
  FertilizerGuidePage
};
