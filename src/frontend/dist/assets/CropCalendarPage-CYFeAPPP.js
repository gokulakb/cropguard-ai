import { c as createLucideIcon, r as reactExports, a3 as useCropCalendar, j as jsxRuntimeExports, f as Skeleton, M as MapPin, a4 as BookOpen } from "./index-DQmXo4u-.js";
import { B as Badge } from "./badge-xsDIYR3X.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-Dg50Yx0j.js";
import { C as Clock } from "./clock-BrAIK8X3.js";
import { S as Sprout } from "./sprout-DXnuLk5D.js";
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
const __iconNode = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }],
  ["path", { d: "M8 14h.01", key: "6423bh" }],
  ["path", { d: "M12 14h.01", key: "1etili" }],
  ["path", { d: "M16 14h.01", key: "1gbofw" }],
  ["path", { d: "M8 18h.01", key: "lrp35t" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }],
  ["path", { d: "M16 18h.01", key: "kzsmim" }]
];
const CalendarDays = createLucideIcon("calendar-days", __iconNode);
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
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
const CROP_ICONS = {
  Rice: "🌾",
  Wheat: "🌿",
  Maize: "🌽",
  Tomato: "🍅",
  Potato: "🥔",
  Cotton: "🌸",
  Sugarcane: "🎋",
  Soybean: "🫘"
};
function CropCalendarPage() {
  const [selectedCrop, setSelectedCrop] = reactExports.useState("");
  const { data: calendar, isLoading } = useCropCalendar(selectedCrop);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 py-8 space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-label text-muted-foreground mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "w-4 h-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Agricultural Tools" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-display-md font-display", children: "Crop Calendar" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-base max-w-xl", children: "Seasonal planting and care schedule for major crops. Select a crop to view the optimal sowing and harvest months." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-data", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-label text-muted-foreground block mb-3", children: "Select Crop Type" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { onValueChange: setSelectedCrop, value: selectedCrop, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SelectTrigger,
          {
            className: "w-full md:w-72",
            "data-ocid": "crop-calendar-selector",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Choose a crop..." })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: CROPS.map((crop) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: crop, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mr-2", children: CROP_ICONS[crop] }),
          crop
        ] }, crop)) })
      ] })
    ] }),
    isLoading && selectedCrop && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48 w-full rounded-lg" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-28 rounded-lg" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-28 rounded-lg" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-28 rounded-lg" })
      ] })
    ] }),
    !selectedCrop && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "card-data flex flex-col items-center justify-center py-16 text-center",
        "data-ocid": "calendar-empty-state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-5xl mb-4", children: "🌱" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-lg mb-1", children: "Select a Crop to Begin" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm max-w-xs", children: "Choose a crop from the dropdown above to see its seasonal planting calendar and growing schedule." })
        ]
      }
    ),
    selectedCrop && !isLoading && calendar === null && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "card-data flex flex-col items-center justify-center py-16 text-center",
        "data-ocid": "calendar-not-found",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-5xl mb-4", children: "🔍" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-lg mb-1", children: "No Data Found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm", children: [
            "Calendar data for ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: selectedCrop }),
            " is not available yet."
          ] })
        ]
      }
    ),
    calendar && !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "calendar-results", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-4 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 rounded bg-success/70 inline-block" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Sowing Month" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 rounded bg-warning/70 inline-block" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Harvest Month" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 rounded bg-muted inline-block" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Off Season" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-data", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-semibold text-lg mb-4 flex items-center gap-2", children: [
          CROP_ICONS[selectedCrop],
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            selectedCrop,
            " — Annual Calendar"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 sm:grid-cols-6 md:grid-cols-12 gap-2", children: MONTHS.map((month, i) => {
          const monthNum = i + 1;
          const isSowing = calendar.sowingMonths.includes(monthNum);
          const isHarvest = calendar.harvestMonths.includes(monthNum);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: `
                      rounded-md p-2 text-center text-xs font-semibold border transition-smooth
                      ${isSowing ? "bg-success/20 border-success/40 text-success" : ""}
                      ${isHarvest ? "bg-warning/20 border-warning/40 text-warning" : ""}
                      ${!isSowing && !isHarvest ? "bg-muted border-border text-muted-foreground" : ""}
                    `,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold", children: month }),
                isSowing && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] mt-0.5", children: "Sow" }),
                isHarvest && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] mt-0.5", children: "Harvest" })
              ]
            },
            month
          );
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-data space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-label text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5" }),
            "Growth Duration"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-display font-bold text-primary", children: calendar.growthDuration }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "days to maturity" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-data space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-label text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3.5 h-3.5" }),
            "Growing Region"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "badge-info mt-1", children: calendar.region || "General" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "Recommended climate zone" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-data space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-label text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sprout, { className: "w-3.5 h-3.5" }),
            "Sowing Months"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1 mt-1", children: calendar.sowingMonths.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "outline",
              className: "text-success border-success/40 bg-success/10 text-xs",
              children: MONTHS[m - 1]
            },
            m
          )) })
        ] })
      ] }),
      calendar.notes && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-data flex gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-5 h-5 text-primary shrink-0 mt-0.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-sm mb-1", children: "Agronomist Notes" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: calendar.notes })
        ] })
      ] })
    ] })
  ] });
}
export {
  CropCalendarPage
};
