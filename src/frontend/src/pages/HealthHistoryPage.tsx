import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { usePredictionHistory } from "@/hooks/use-backend";
import type {
  DiseaseSeverity,
  DiseaseTrendDataPoint,
  Prediction,
} from "@/types";
import { getSeverityLabel, getSeverityStyle } from "@/utils/severity";
import { Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  BarChart3,
  Calendar,
  ChevronDown,
  ChevronUp,
  Clock,
  Filter,
  Leaf,
  Scan,
  Sprout,
  TrendingUp,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// ─── Constants ─────────────────────────────────────────────────────────────────

const TRENDS_SESSION_KEY = "healthHistory.trendsOpen";
const TOP_DISEASE_COUNT = 5;
const MIN_MONTHS_FOR_TRENDS = 2;

/** Distinct colors for the top-5 disease lines */
const DISEASE_COLORS = [
  "hsl(var(--chart-1, 142 76% 36%))",
  "hsl(var(--chart-2, 217 91% 60%))",
  "hsl(var(--chart-3, 32 95% 50%))",
  "hsl(var(--chart-4, 280 68% 60%))",
  "hsl(var(--chart-5, 0 84% 60%))",
] as const;

// ─── Sample fallback ───────────────────────────────────────────────────────────

const SAMPLE: Prediction[] = [
  {
    id: "h1",
    imageUrl: "/assets/generated/crop-tomato-blight.dim_400x300.jpg",
    plantType: "Tomato",
    disease: {
      id: "d1",
      name: "Late Blight",
      scientificName: "Phytophthora infestans",
      plantType: "Tomato",
      severity: "severe",
      confidence: 0.94,
      cause: "Oomycete pathogen",
      description: "Severe infection",
      prevention: [],
      treatment: [],
      medications: [],
    },
    severity: "severe",
    confidence: 0.94,
    analyzedAt: "2026-04-09T07:00:00Z",
  },
  {
    id: "h2",
    imageUrl: "/assets/generated/crop-rice-mildew.dim_400x300.jpg",
    plantType: "Rice",
    disease: {
      id: "d2",
      name: "Downy Mildew",
      scientificName: "Plasmopara viticola",
      plantType: "Rice",
      severity: "mild",
      confidence: 0.88,
      cause: "Fungal pathogen",
      description: "Mild foliar disease",
      prevention: [],
      treatment: [],
      medications: [],
    },
    severity: "mild",
    confidence: 0.88,
    analyzedAt: "2026-04-08T14:30:00Z",
  },
  {
    id: "h3",
    imageUrl: "/assets/generated/crop-wheat-rust.dim_400x300.jpg",
    plantType: "Wheat",
    disease: {
      id: "d3",
      name: "Powdery Mildew",
      scientificName: "Blumeria graminis",
      plantType: "Wheat",
      severity: "moderate",
      confidence: 0.76,
      cause: "Ascomycete fungus",
      description: "White powdery patches",
      prevention: [],
      treatment: [],
      medications: [],
    },
    severity: "moderate",
    confidence: 0.76,
    analyzedAt: "2026-04-07T09:15:00Z",
  },
  {
    id: "h4",
    imageUrl: "/assets/generated/crop-maize-blight.dim_400x300.jpg",
    plantType: "Maize",
    disease: null,
    severity: "healthy",
    confidence: 0.97,
    analyzedAt: "2026-04-06T11:00:00Z",
  },
  {
    id: "h5",
    imageUrl: "/assets/generated/crop-potato-leaf.dim_400x300.jpg",
    plantType: "Potato",
    disease: {
      id: "d5",
      name: "Early Blight",
      scientificName: "Alternaria solani",
      plantType: "Potato",
      severity: "mild",
      confidence: 0.81,
      cause: "Alternaria solani",
      description: "Dark ring lesions on leaves",
      prevention: [],
      treatment: [],
      medications: [],
    },
    severity: "mild",
    confidence: 0.81,
    analyzedAt: "2026-04-05T16:45:00Z",
  },
  {
    id: "h6",
    imageUrl: "/assets/generated/crop-tomato-blight.dim_400x300.jpg",
    plantType: "Tomato",
    disease: {
      id: "d6",
      name: "Late Blight",
      scientificName: "Phytophthora infestans",
      plantType: "Tomato",
      severity: "severe",
      confidence: 0.91,
      cause: "Oomycete pathogen",
      description: "Rapid necrosis",
      prevention: [],
      treatment: [],
      medications: [],
    },
    severity: "severe",
    confidence: 0.91,
    analyzedAt: "2026-04-03T08:20:00Z",
  },
];

const SEVERITIES: DiseaseSeverity[] = ["healthy", "mild", "moderate", "severe"];
const ALL_PLANTS = "All Plants";

// ─── Helpers ───────────────────────────────────────────────────────────────────

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

function mostCommonDisease(preds: Prediction[]): string {
  const counts: Record<string, number> = {};
  for (const p of preds) {
    const name =
      p.disease?.name ?? (p.severity === "healthy" ? "Healthy" : "Unknown");
    counts[name] = (counts[name] ?? 0) + 1;
  }
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "N/A";
}

/** Format a "YYYY-MM" key into a readable month label, e.g. "Nov 2025" */
function monthKeyToLabel(key: string): string {
  const [year, month] = key.split("-");
  return new Date(Number(year), Number(month) - 1, 1).toLocaleDateString(
    "en-US",
    { month: "short", year: "numeric" },
  );
}

/**
 * Compute the last 12 months of disease trend data from a list of predictions.
 * Returns { chartData, topDiseases, hasEnoughData }.
 */
function computeTrendData(predictions: Prediction[]): {
  chartData: DiseaseTrendDataPoint[];
  topDiseases: string[];
  hasEnoughData: boolean;
} {
  // Build a map: monthKey → diseaseName → count
  const monthMap: Record<string, Record<string, number>> = {};

  for (const p of predictions) {
    if (p.severity === "healthy" || !p.disease) continue;
    const d = new Date(p.analyzedAt);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    if (!monthMap[key]) monthMap[key] = {};
    const name = p.disease.name;
    monthMap[key][name] = (monthMap[key][name] ?? 0) + 1;
  }

  // Determine the last 12 months relative to today
  const now = new Date();
  const last12: string[] = [];
  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    last12.push(
      `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`,
    );
  }

  // Count how many of the last 12 months have at least one data point
  const monthsWithData = last12.filter(
    (k) => monthMap[k] && Object.keys(monthMap[k]).length > 0,
  ).length;
  const hasEnoughData = monthsWithData >= MIN_MONTHS_FOR_TRENDS;

  // Determine top-5 diseases across all data
  const totalByDisease: Record<string, number> = {};
  for (const counts of Object.values(monthMap)) {
    for (const [name, cnt] of Object.entries(counts)) {
      totalByDisease[name] = (totalByDisease[name] ?? 0) + cnt;
    }
  }
  const topDiseases = Object.entries(totalByDisease)
    .sort((a, b) => b[1] - a[1])
    .slice(0, TOP_DISEASE_COUNT)
    .map(([name]) => name);

  // Build chart data points for the last 12 months
  const chartData: DiseaseTrendDataPoint[] = last12.map((key) => {
    const point: DiseaseTrendDataPoint = {
      month: monthKeyToLabel(key),
      monthKey: key,
    };
    for (const disease of topDiseases) {
      point[disease] = monthMap[key]?.[disease] ?? 0;
    }
    return point;
  });

  return { chartData, topDiseases, hasEnoughData };
}

// ─── Disease Trends Chart ──────────────────────────────────────────────────────

function DiseaseTrendsChart({ predictions }: { predictions: Prediction[] }) {
  const { chartData, topDiseases, hasEnoughData } = useMemo(
    () => computeTrendData(predictions),
    [predictions],
  );

  if (!hasEnoughData) {
    return (
      <div
        className="flex flex-col items-center justify-center py-10 px-4 text-center"
        data-ocid="trends-placeholder"
      >
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
          <TrendingUp className="w-6 h-6 text-primary" />
        </div>
        <p className="text-sm text-muted-foreground max-w-xs">
          Keep scanning your crops — trends will appear here once you have{" "}
          <span className="font-medium text-foreground">2 or more months</span>{" "}
          of scan history.
        </p>
      </div>
    );
  }

  return (
    <div data-ocid="trends-chart">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
        >
          <XAxis
            dataKey="month"
            tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            allowDecimals={false}
            tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              fontSize: "12px",
              color: "var(--foreground)",
            }}
            formatter={(value: number, name: string) => [value, name]}
            labelStyle={{ fontWeight: 600, marginBottom: 4 }}
          />
          <Legend
            wrapperStyle={{ fontSize: "12px", paddingTop: "12px" }}
            iconType="circle"
            iconSize={8}
          />
          {topDiseases.map((disease, i) => (
            <Line
              key={disease}
              type="monotone"
              dataKey={disease}
              stroke={DISEASE_COLORS[i % DISEASE_COLORS.length]}
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// ─── Collapsible Trends Section ────────────────────────────────────────────────

function DiseaseTrendsSection({ predictions }: { predictions: Prediction[] }) {
  const [isOpen, setIsOpen] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(TRENDS_SESSION_KEY) === "true";
    } catch {
      return false;
    }
  });

  // Use a ref to avoid stale closure in the effect
  const isOpenRef = useRef(isOpen);
  isOpenRef.current = isOpen;

  const toggle = useCallback(() => {
    setIsOpen((prev) => {
      const next = !prev;
      try {
        sessionStorage.setItem(TRENDS_SESSION_KEY, String(next));
      } catch {
        // sessionStorage unavailable — ignore
      }
      return next;
    });
  }, []);

  // Sync to sessionStorage whenever isOpen changes
  useEffect(() => {
    try {
      sessionStorage.setItem(TRENDS_SESSION_KEY, String(isOpen));
    } catch {
      // ignore
    }
  }, [isOpen]);

  // Responsive chart height: 200px on mobile, 280px on desktop
  const [chartHeight, setChartHeight] = useState(280);
  useEffect(() => {
    const update = () => setChartHeight(window.innerWidth < 640 ? 200 : 280);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <Card className="shadow-subtle overflow-hidden" data-ocid="trends-section">
      {/* Header / toggle */}
      <CardHeader className="pb-3 pt-4 px-4">
        <div className="flex items-center justify-between gap-3">
          <CardTitle className="text-sm font-semibold font-display flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            Disease Trends
            <span className="text-xs font-normal text-muted-foreground hidden sm:inline">
              — last 12 months
            </span>
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggle}
            aria-expanded={isOpen}
            aria-controls="trends-content"
            className="h-7 px-2 text-xs text-muted-foreground gap-1"
            data-ocid="trends-toggle"
          >
            {isOpen ? (
              <>
                <ChevronUp className="w-3.5 h-3.5" />
                Collapse
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5" />
                Expand
              </>
            )}
          </Button>
        </div>
      </CardHeader>

      {/* Animated body */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id="trends-content"
            key="trends-body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <CardContent className="px-4 pb-5">
              <div style={{ height: chartHeight }}>
                <DiseaseTrendsChart predictions={predictions} />
              </div>
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}

// ─── Prediction Card ───────────────────────────────────────────────────────────

function PredictionCard({ pred, index }: { pred: Prediction; index: number }) {
  const style = getSeverityStyle(pred.severity);
  const name =
    pred.disease?.name ?? (pred.severity === "healthy" ? "Healthy" : "Unknown");

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      <Link
        to="/results/$predictionId"
        params={{ predictionId: pred.id }}
        className="card-data flex gap-4 hover:border-primary/30 hover:shadow-elevated group"
        data-ocid="history-card"
      >
        <div className="w-16 h-16 rounded-lg bg-muted overflow-hidden shrink-0">
          <img
            src={pred.imageUrl}
            alt={pred.plantType}
            className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                "/assets/images/placeholder.svg";
            }}
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 flex-wrap">
            <div>
              <h3 className="font-semibold font-display text-foreground text-sm leading-tight">
                {name}
              </h3>
              <div className="flex items-center gap-1.5 mt-1">
                <Sprout className="w-3 h-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {pred.plantType}
                </span>
              </div>
            </div>
            <Badge className={`${style.badge} border text-[11px] shrink-0`}>
              {getSeverityLabel(pred.severity)}
            </Badge>
          </div>

          <div className="flex items-center gap-3 mt-2 flex-wrap">
            <div className="flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                {Math.round(pred.confidence * 100)}% confidence
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                {timeAgo(pred.analyzedAt)}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                {formatDate(pred.analyzedAt)}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function HistorySkeleton() {
  return (
    <div className="space-y-3">
      {["a", "b", "c", "d"].map((k) => (
        <div key={k} className="card-data flex gap-4">
          <Skeleton className="w-16 h-16 rounded-lg shrink-0" />
          <div className="flex-1 space-y-2 py-1">
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-48" />
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export function HealthHistoryPage() {
  const { data: fetched, isLoading } = usePredictionHistory();
  const all = useMemo(
    () =>
      (fetched && fetched.length > 0 ? fetched : SAMPLE)
        .slice()
        .sort(
          (a, b) =>
            new Date(b.analyzedAt).getTime() - new Date(a.analyzedAt).getTime(),
        ),
    [fetched],
  );

  const plantOptions = useMemo(
    () => [ALL_PLANTS, ...Array.from(new Set(all.map((p) => p.plantType)))],
    [all],
  );

  const [plantFilter, setPlantFilter] = useState(ALL_PLANTS);
  const [severityFilter, setSeverityFilter] = useState<DiseaseSeverity | null>(
    null,
  );
  const [search, setSearch] = useState("");

  const filtered = useMemo(
    () =>
      all.filter((p) => {
        if (plantFilter !== ALL_PLANTS && p.plantType !== plantFilter)
          return false;
        if (severityFilter && p.severity !== severityFilter) return false;
        if (search) {
          const q = search.toLowerCase();
          return (
            p.plantType.toLowerCase().includes(q) ||
            (p.disease?.name ?? "").toLowerCase().includes(q)
          );
        }
        return true;
      }),
    [all, plantFilter, severityFilter, search],
  );

  const commonDisease = useMemo(() => mostCommonDisease(all), [all]);

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-bold font-display text-foreground flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-primary" />
              Crop Health History
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Your complete scan timeline — {all.length} scan
              {all.length !== 1 ? "s" : ""} total.
              {all.length > 0 && (
                <span className="text-primary font-medium">
                  {" "}
                  Most common: {commonDisease}.
                </span>
              )}
            </p>
          </div>
          <Button asChild size="sm" data-ocid="history-scan-btn">
            <Link to="/detect" className="gap-2">
              <Scan className="w-4 h-4" />
              New Scan
            </Link>
          </Button>
        </div>
      </motion.div>

      {/* ── Disease Trends (collapsible, above history list) ── */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.05 }}
      >
        <DiseaseTrendsSection predictions={all} />
      </motion.div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {(["healthy", "mild", "moderate", "severe"] as DiseaseSeverity[]).map(
          (sev, i) => {
            const style = getSeverityStyle(sev);
            const count = all.filter((p) => p.severity === sev).length;
            return (
              <motion.button
                key={sev}
                type="button"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                onClick={() =>
                  setSeverityFilter(severityFilter === sev ? null : sev)
                }
                className={`card-data text-left cursor-pointer ${severityFilter === sev ? "ring-2 ring-primary" : ""}`}
                data-ocid={`stat-${sev}`}
              >
                <p className={`text-xl font-bold font-display ${style.text}`}>
                  {count}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {getSeverityLabel(sev)}
                </p>
              </motion.button>
            );
          },
        )}
      </div>

      {/* Filter bar */}
      <Card className="shadow-subtle" data-ocid="filter-bar">
        <CardHeader className="pb-3 pt-4 px-4">
          <CardTitle className="text-sm font-semibold font-display flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            Filter Scans
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4 space-y-3">
          <Input
            placeholder="Search by plant or disease name…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="text-sm"
            data-ocid="history-search"
          />
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs text-muted-foreground shrink-0">
              Plant:
            </span>
            {plantOptions.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPlantFilter(p)}
                className={`text-xs px-2.5 py-1 rounded-full border transition-smooth ${
                  plantFilter === p
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-muted text-muted-foreground border-border hover:border-primary/40"
                }`}
                data-ocid={`plant-filter-${p.toLowerCase().replace(/\s/g, "-")}`}
              >
                {p}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs text-muted-foreground shrink-0">
              Severity:
            </span>
            {SEVERITIES.map((sev) => {
              const style = getSeverityStyle(sev);
              return (
                <button
                  key={sev}
                  type="button"
                  onClick={() =>
                    setSeverityFilter(severityFilter === sev ? null : sev)
                  }
                  className={`text-xs px-2.5 py-1 rounded-full border transition-smooth ${
                    severityFilter === sev
                      ? `${style.badge} border`
                      : "bg-muted text-muted-foreground border-border hover:border-primary/40"
                  }`}
                  data-ocid={`severity-filter-${sev}`}
                >
                  {getSeverityLabel(sev)}
                </button>
              );
            })}
            {(severityFilter || search || plantFilter !== ALL_PLANTS) && (
              <button
                type="button"
                onClick={() => {
                  setSeverityFilter(null);
                  setSearch("");
                  setPlantFilter(ALL_PLANTS);
                }}
                className="text-xs px-2.5 py-1 rounded-full border border-destructive/30 text-destructive bg-destructive/5 hover:bg-destructive/10 transition-smooth"
                data-ocid="filter-reset"
              >
                Reset filters
              </button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Timeline */}
      <section data-ocid="history-timeline">
        <p className="text-xs text-muted-foreground mb-3 font-medium">
          Showing {filtered.length} of {all.length} scan
          {all.length !== 1 ? "s" : ""} — newest first
        </p>

        {isLoading ? (
          <HistorySkeleton />
        ) : filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center text-center py-16 px-6 card-data"
            data-ocid="history-empty-state"
          >
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Leaf className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-bold font-display text-foreground mb-2">
              No scans found
            </h3>
            <p className="text-sm text-muted-foreground max-w-xs mb-5">
              {all.length === 0
                ? "Upload a photo of your crop to get started with AI-powered disease detection."
                : "No scans match your current filters. Try adjusting them."}
            </p>
            <Button asChild size="sm" data-ocid="empty-history-cta">
              <Link to="/detect" className="gap-2">
                <Scan className="w-4 h-4" />
                Scan Your First Crop
              </Link>
            </Button>
          </motion.div>
        ) : (
          <div className="space-y-3">
            {filtered.map((pred, i) => (
              <PredictionCard key={pred.id} pred={pred} index={i} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
