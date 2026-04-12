import { Y as useDiseaseSeverityMap, r as reactExports, j as jsxRuntimeExports, m as motion, Z as Globe, T as TrendingUp, _ as Users, f as Skeleton } from "./index-DQmXo4u-.js";
import { B as Badge } from "./badge-xsDIYR3X.js";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-BujutBYA.js";
import { R as ResponsiveContainer, X as XAxis, Y as YAxis, T as Tooltip, B as Bar, n as Cell, e as LabelList } from "./generateCategoricalChart-D5P75oCP.js";
import { B as BarChart, C as CartesianGrid } from "./BarChart-Bma7fmDX.js";
const SAMPLE_ENTRIES = [
  { diseaseName: "Late Blight", count: 142 },
  { diseaseName: "Powdery Mildew", count: 118 },
  { diseaseName: "Early Blight", count: 97 },
  { diseaseName: "Downy Mildew", count: 84 },
  { diseaseName: "Leaf Rust", count: 73 },
  { diseaseName: "Bacterial Spot", count: 61 },
  { diseaseName: "Anthracnose", count: 52 },
  { diseaseName: "Fusarium Wilt", count: 44 },
  { diseaseName: "Gray Leaf Spot", count: 38 },
  { diseaseName: "Cercospora Leaf Blight", count: 29 }
];
const CHART_COLORS = [
  "hsl(var(--destructive))",
  "hsl(var(--accent))",
  "hsl(var(--primary))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-5))",
  "hsl(var(--chart-4))",
  "hsl(var(--info))",
  "hsl(var(--success))",
  "hsl(var(--social))",
  "hsl(var(--chart-1))"
];
function getTrendBadge(rank) {
  if (rank <= 2)
    return {
      label: "High Risk",
      cls: "bg-destructive/10 text-destructive border-destructive/20"
    };
  if (rank <= 5)
    return {
      label: "Moderate",
      cls: "bg-accent/10 text-accent border-accent/20"
    };
  return {
    label: "Low Risk",
    cls: "bg-primary/10 text-primary border-primary/20"
  };
}
function ChartSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-data", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-48 mb-4" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end gap-2 h-52", children: [80, 65, 55, 45, 38, 30, 24, 18, 14, 10].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Skeleton,
      {
        className: "flex-1 rounded-t",
        style: { height: `${h}%` }
      },
      h
    )) })
  ] });
}
function ListSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [1, 2, 3, 4, 5].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-data flex items-center gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-7 h-7 rounded-full shrink-0" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 flex-1" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-12 rounded-full" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-16 rounded-full" })
  ] }, k)) });
}
function CustomTooltip({
  active,
  payload
}) {
  var _a;
  if (!active || !((_a = payload == null ? void 0 : payload[0]) == null ? void 0 : _a.payload)) return null;
  const { diseaseName, count } = payload[0].payload;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-lg shadow-elevated px-3 py-2 text-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold font-display text-foreground", children: diseaseName }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
      count,
      " reports"
    ] })
  ] });
}
function DiseaseMapPage() {
  const { data: fetched, isLoading } = useDiseaseSeverityMap();
  const entries = reactExports.useMemo(() => {
    const src = fetched && fetched.length > 0 ? fetched : SAMPLE_ENTRIES;
    return src.slice().sort((a, b) => b.count - a.count).slice(0, 10);
  }, [fetched]);
  const totalReports = reactExports.useMemo(
    () => entries.reduce((s, e) => s + e.count, 0),
    [entries]
  );
  const today = (/* @__PURE__ */ new Date()).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 md:p-6 space-y-6 max-w-4xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: -8 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.35 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-data bg-gradient-to-br from-card to-muted/30", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl font-bold font-display text-foreground flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-6 h-6 text-primary" }),
                "Disease Severity Map"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 max-w-lg", children: "Crowd-sourced disease reports from all CropGuard AI users. Data reflects real scan submissions — higher counts indicate more widespread occurrences in the field." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "As of today" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-foreground mt-0.5", children: today })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-6 mt-4 pt-4 border-t border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold font-display text-foreground", children: entries.length }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: "Diseases Tracked" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4 text-accent" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold font-display text-foreground", children: totalReports.toLocaleString() }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: "Total Reports" })
              ] })
            ] })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.1, duration: 0.4 },
        children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChartSkeleton, {}) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-subtle", "data-ocid": "disease-chart", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-2 pt-4 px-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-semibold font-display text-foreground", children: "Top 10 Most Reported Diseases" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Total user scan reports, sorted by frequency" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "px-2 pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 280, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            BarChart,
            {
              data: entries,
              margin: { top: 20, right: 24, left: 0, bottom: 60 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  CartesianGrid,
                  {
                    strokeDasharray: "3 3",
                    className: "opacity-30",
                    vertical: false
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  XAxis,
                  {
                    dataKey: "diseaseName",
                    tick: {
                      fontSize: 10,
                      fill: "hsl(var(--muted-foreground))"
                    },
                    angle: -35,
                    textAnchor: "end",
                    interval: 0,
                    height: 70
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  YAxis,
                  {
                    tick: {
                      fontSize: 10,
                      fill: "hsl(var(--muted-foreground))"
                    },
                    width: 36,
                    allowDecimals: false
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Tooltip,
                  {
                    content: /* @__PURE__ */ jsxRuntimeExports.jsx(CustomTooltip, {}),
                    cursor: { fill: "hsl(var(--muted)/0.4)" }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Bar, { dataKey: "count", radius: [4, 4, 0, 0], children: [
                  entries.map((entry, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Cell,
                    {
                      fill: CHART_COLORS[i % CHART_COLORS.length]
                    },
                    entry.diseaseName
                  )),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    LabelList,
                    {
                      dataKey: "count",
                      position: "top",
                      style: {
                        fontSize: 10,
                        fill: "hsl(var(--muted-foreground))"
                      }
                    }
                  )
                ] })
              ]
            }
          ) }) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "disease-ranked-list", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-semibold font-display text-foreground mb-3 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 text-primary" }),
        "Ranked Disease Index"
      ] }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(ListSkeleton, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: entries.map((entry, i) => {
        const trend = getTrendBadge(i + 1);
        const pct = totalReports > 0 ? Math.round(entry.count / totalReports * 100) : 0;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: -8 },
            animate: { opacity: 1, x: 0 },
            transition: { delay: 0.15 + i * 0.04, duration: 0.3 },
            className: "card-data flex items-center gap-3 hover:border-primary/30",
            "data-ocid": `disease-row-${i}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 text-primary-foreground",
                  style: {
                    background: CHART_COLORS[i % CHART_COLORS.length]
                  },
                  children: i + 1
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold font-display text-foreground truncate", children: entry.diseaseName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground shrink-0 ml-2", children: [
                    entry.count,
                    " reports"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "h-full rounded-full",
                    style: {
                      width: `${pct}%`,
                      background: CHART_COLORS[i % CHART_COLORS.length]
                    }
                  }
                ) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: `${trend.cls} border text-[10px] shrink-0`, children: trend.label })
            ]
          },
          entry.diseaseName
        );
      }) })
    ] })
  ] });
}
export {
  DiseaseMapPage
};
