import { c as createLucideIcon, r as reactExports, a6 as useEstimateYield, j as jsxRuntimeExports, B as Button, f as Skeleton } from "./index-DQmXo4u-.js";
import { I as Input } from "./input-CXyKGE_g.js";
import { L as Label } from "./label-ClXPzMbA.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-Dg50Yx0j.js";
import { P as Plus } from "./plus--m541XKc.js";
import { S as Sprout } from "./sprout-DXnuLk5D.js";
import { R as ResponsiveContainer, X as XAxis, Y as YAxis, T as Tooltip, B as Bar, n as Cell } from "./generateCategoricalChart-D5P75oCP.js";
import { B as BarChart, C as CartesianGrid } from "./BarChart-Bma7fmDX.js";
import "./index-B7d6HZwL.js";
import "./index-BYJyCJKl.js";
import "./index-DPaJbrbs.js";
import "./chevron-up-D3BYUhf-.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["line", { x1: "18", x2: "18", y1: "20", y2: "10", key: "1xfpm4" }],
  ["line", { x1: "12", x2: "12", y1: "20", y2: "4", key: "be30l9" }],
  ["line", { x1: "6", x2: "6", y1: "20", y2: "14", key: "1r4le6" }]
];
const ChartNoAxesColumn = createLucideIcon("chart-no-axes-column", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [["path", { d: "M5 12h14", key: "1ays0h" }]];
const Minus = createLucideIcon("minus", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
];
const RotateCcw = createLucideIcon("rotate-ccw", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z", key: "7g6ntu" }],
  ["path", { d: "m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z", key: "ijws7r" }],
  ["path", { d: "M7 21h10", key: "1b0cd5" }],
  ["path", { d: "M12 3v18", key: "108xh3" }],
  ["path", { d: "M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2", key: "3gwbw2" }]
];
const Scale = createLucideIcon("scale", __iconNode);
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
const HEALTH_OPTIONS = [
  {
    value: "Healthy",
    label: "Healthy",
    color: "text-success",
    dot: "bg-success"
  },
  {
    value: "Mild Disease",
    label: "Mild Disease",
    color: "text-warning",
    dot: "bg-warning"
  },
  {
    value: "Moderate Disease",
    label: "Moderate Disease",
    color: "text-social",
    dot: "bg-social"
  },
  {
    value: "Severe Disease",
    label: "Severe Disease",
    color: "text-destructive",
    dot: "bg-destructive"
  }
];
const HEALTHY_YIELDS = {
  Rice: 5e3,
  Wheat: 4e3,
  Maize: 6e3,
  Tomato: 25e3,
  Potato: 2e4,
  Cotton: 1500,
  Sugarcane: 7e4,
  Soybean: 2500
};
function YieldEstimatorPage() {
  const [cropType, setCropType] = reactExports.useState("");
  const [area, setArea] = reactExports.useState(1);
  const [healthStatus, setHealthStatus] = reactExports.useState("");
  const [result, setResult] = reactExports.useState(null);
  const estimateYield = useEstimateYield();
  const handleSubmit = async () => {
    if (!cropType || !healthStatus || area <= 0) return;
    try {
      const res = await estimateYield.mutateAsync({
        cropType,
        areaHectares: area,
        healthStatus
      });
      setResult(res);
    } catch {
    }
  };
  const handleReset = () => {
    setCropType("");
    setArea(1);
    setHealthStatus("");
    setResult(null);
    estimateYield.reset();
  };
  const healthyPotential = result ? (HEALTHY_YIELDS[result.cropType] ?? 5e3) * result.areaHectares : 0;
  const chartData = result ? [
    {
      name: "Your Estimate",
      value: result.estimatedYieldKg,
      fill: "oklch(var(--primary))"
    },
    {
      name: "Healthy Potential",
      value: healthyPotential,
      fill: "#16a34a"
    }
  ] : [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 py-8 space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-label text-muted-foreground mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Scale, { className: "w-4 h-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Agricultural Tools" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-display-md font-display", children: "Yield Estimator" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-base max-w-xl", children: "Estimate your expected crop yield based on crop type, farm area, and current plant health conditions." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-data space-y-6", "data-ocid": "yield-estimator-form", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-label text-muted-foreground", children: "Crop Type" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { onValueChange: setCropType, value: cropType, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "yield-crop-selector", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select crop..." }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: CROPS.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c, children: c }, c)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-label text-muted-foreground", children: "Farm Area (Hectares)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              size: "icon",
              className: "shrink-0",
              onClick: () => setArea(
                (v) => Math.max(0.1, Number.parseFloat((v - 0.5).toFixed(1)))
              ),
              "data-ocid": "yield-area-decrement",
              "aria-label": "Decrease area",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "w-4 h-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "number",
              min: 0.1,
              step: 0.1,
              value: area,
              onChange: (e) => setArea(Math.max(0.1, Number.parseFloat(e.target.value) || 0.1)),
              className: "text-center font-semibold text-lg w-28",
              "data-ocid": "yield-area-input"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              size: "icon",
              className: "shrink-0",
              onClick: () => setArea((v) => Number.parseFloat((v + 0.5).toFixed(1))),
              "data-ocid": "yield-area-increment",
              "aria-label": "Increase area",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm", children: "hectares" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-label text-muted-foreground", children: "Plant Health Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { onValueChange: setHealthStatus, value: healthStatus, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "yield-health-selector", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select health status..." }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: HEALTH_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: opt.value, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `w-2 h-2 rounded-full ${opt.dot}` }),
            opt.label
          ] }) }, opt.value)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: handleSubmit,
            disabled: !cropType || !healthStatus || area <= 0 || estimateYield.isPending,
            className: "flex-1",
            "data-ocid": "yield-estimate-submit",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Sprout, { className: "w-4 h-4 mr-2" }),
              estimateYield.isPending ? "Estimating…" : "Estimate Yield"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: handleReset,
            "data-ocid": "yield-reset-btn",
            "aria-label": "Reset form",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-4 h-4" })
          }
        )
      ] }),
      estimateYield.isError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive", children: "Failed to estimate yield. Please try again." })
    ] }),
    estimateYield.isPending && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-36 w-full rounded-lg" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48 w-full rounded-lg" })
    ] }),
    result && !estimateYield.isPending && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", "data-ocid": "yield-results", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-data text-center space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-label text-muted-foreground", children: "Estimated Yield" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-4xl font-display font-extrabold text-primary", children: result.estimatedYieldKg.toLocaleString() }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "kilograms" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-data text-center space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-label text-muted-foreground", children: "In Tonnes" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-4xl font-display font-extrabold text-accent", children: (result.estimatedYieldKg / 1e3).toFixed(2) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "metric tonnes" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-data", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display font-semibold text-base mb-4 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChartNoAxesColumn, { className: "w-4 h-4 text-primary" }),
          "Yield Comparison vs Healthy Potential"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 220, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          BarChart,
          {
            data: chartData,
            margin: { top: 10, right: 10, left: 0, bottom: 0 },
            barSize: 56,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                CartesianGrid,
                {
                  strokeDasharray: "3 3",
                  stroke: "oklch(0.88 0.008 155)"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                XAxis,
                {
                  dataKey: "name",
                  tick: { fontSize: 12, fill: "oklch(0.5 0.012 155)" },
                  axisLine: false,
                  tickLine: false
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                YAxis,
                {
                  tick: { fontSize: 11, fill: "oklch(0.5 0.012 155)" },
                  axisLine: false,
                  tickLine: false,
                  tickFormatter: (v) => v >= 1e3 ? `${(v / 1e3).toFixed(0)}k` : String(v)
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Tooltip,
                {
                  formatter: (value) => [
                    `${value.toLocaleString()} kg`,
                    "Yield"
                  ],
                  contentStyle: {
                    background: "oklch(0.99 0.004 155)",
                    border: "1px solid oklch(0.88 0.008 155)",
                    borderRadius: "8px",
                    fontSize: "13px"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "value", radius: [6, 6, 0, 0], children: chartData.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: entry.fill }, entry.name)) })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 mt-2 justify-center text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3 h-3 rounded bg-primary inline-block" }),
            "Your estimate"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3 h-3 rounded bg-success inline-block" }),
            "Healthy crop potential"
          ] })
        ] })
      ] }),
      result.notes && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-data flex gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sprout, { className: "w-5 h-5 text-success shrink-0 mt-0.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: result.notes })
      ] })
    ] })
  ] });
}
export {
  YieldEstimatorPage
};
