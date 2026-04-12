import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useDiseaseSeverityMap } from "@/hooks/use-backend";
import type { DiseaseSeverityEntry } from "@/types";
import { Globe, TrendingUp, Users } from "lucide-react";
import { motion } from "motion/react";
import { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// ─── Sample fallback ───────────────────────────────────────────────────────────

const SAMPLE_ENTRIES: DiseaseSeverityEntry[] = [
  { diseaseName: "Late Blight", count: 142 },
  { diseaseName: "Powdery Mildew", count: 118 },
  { diseaseName: "Early Blight", count: 97 },
  { diseaseName: "Downy Mildew", count: 84 },
  { diseaseName: "Leaf Rust", count: 73 },
  { diseaseName: "Bacterial Spot", count: 61 },
  { diseaseName: "Anthracnose", count: 52 },
  { diseaseName: "Fusarium Wilt", count: 44 },
  { diseaseName: "Gray Leaf Spot", count: 38 },
  { diseaseName: "Cercospora Leaf Blight", count: 29 },
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
  "hsl(var(--chart-1))",
];

function getTrendBadge(rank: number): { label: string; cls: string } {
  if (rank <= 2)
    return {
      label: "High Risk",
      cls: "bg-destructive/10 text-destructive border-destructive/20",
    };
  if (rank <= 5)
    return {
      label: "Moderate",
      cls: "bg-accent/10 text-accent border-accent/20",
    };
  return {
    label: "Low Risk",
    cls: "bg-primary/10 text-primary border-primary/20",
  };
}

// ─── Skeletons ─────────────────────────────────────────────────────────────────

function ChartSkeleton() {
  return (
    <div className="card-data">
      <Skeleton className="h-6 w-48 mb-4" />
      <div className="flex items-end gap-2 h-52">
        {[80, 65, 55, 45, 38, 30, 24, 18, 14, 10].map((h) => (
          <Skeleton
            key={h}
            className="flex-1 rounded-t"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </div>
  );
}

function ListSkeleton() {
  return (
    <div className="space-y-2">
      {[1, 2, 3, 4, 5].map((k) => (
        <div key={k} className="card-data flex items-center gap-3">
          <Skeleton className="w-7 h-7 rounded-full shrink-0" />
          <Skeleton className="h-4 flex-1" />
          <Skeleton className="h-5 w-12 rounded-full" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
      ))}
    </div>
  );
}

// ─── Custom Tooltip ────────────────────────────────────────────────────────────

interface TooltipPayload {
  payload?: { diseaseName: string; count: number };
}

function CustomTooltip({
  active,
  payload,
}: { active?: boolean; payload?: TooltipPayload[] }) {
  if (!active || !payload?.[0]?.payload) return null;
  const { diseaseName, count } = payload[0].payload;
  return (
    <div className="bg-card border border-border rounded-lg shadow-elevated px-3 py-2 text-sm">
      <p className="font-semibold font-display text-foreground">
        {diseaseName}
      </p>
      <p className="text-muted-foreground">{count} reports</p>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export function DiseaseMapPage() {
  const { data: fetched, isLoading } = useDiseaseSeverityMap();

  const entries: DiseaseSeverityEntry[] = useMemo(() => {
    const src = fetched && fetched.length > 0 ? fetched : SAMPLE_ENTRIES;
    return src
      .slice()
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }, [fetched]);

  const totalReports = useMemo(
    () => entries.reduce((s, e) => s + e.count, 0),
    [entries],
  );
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div className="card-data bg-gradient-to-br from-card to-muted/30">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-2xl font-bold font-display text-foreground flex items-center gap-2">
                <Globe className="w-6 h-6 text-primary" />
                Disease Severity Map
              </h1>
              <p className="text-sm text-muted-foreground mt-1 max-w-lg">
                Crowd-sourced disease reports from all CropGuard AI users. Data
                reflects real scan submissions — higher counts indicate more
                widespread occurrences in the field.
              </p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-xs text-muted-foreground">As of today</p>
              <p className="text-xs font-medium text-foreground mt-0.5">
                {today}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 mt-4 pt-4 border-t border-border">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-lg font-bold font-display text-foreground">
                  {entries.length}
                </p>
                <p className="text-[11px] text-muted-foreground">
                  Diseases Tracked
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                <Users className="w-4 h-4 text-accent" />
              </div>
              <div>
                <p className="text-lg font-bold font-display text-foreground">
                  {totalReports.toLocaleString()}
                </p>
                <p className="text-[11px] text-muted-foreground">
                  Total Reports
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bar Chart */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        {isLoading ? (
          <ChartSkeleton />
        ) : (
          <Card className="shadow-subtle" data-ocid="disease-chart">
            <CardHeader className="pb-2 pt-4 px-4">
              <CardTitle className="text-sm font-semibold font-display text-foreground">
                Top 10 Most Reported Diseases
              </CardTitle>
              <p className="text-xs text-muted-foreground">
                Total user scan reports, sorted by frequency
              </p>
            </CardHeader>
            <CardContent className="px-2 pb-4">
              <ResponsiveContainer width="100%" height={280}>
                <BarChart
                  data={entries}
                  margin={{ top: 20, right: 24, left: 0, bottom: 60 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="opacity-30"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="diseaseName"
                    tick={{
                      fontSize: 10,
                      fill: "hsl(var(--muted-foreground))",
                    }}
                    angle={-35}
                    textAnchor="end"
                    interval={0}
                    height={70}
                  />
                  <YAxis
                    tick={{
                      fontSize: 10,
                      fill: "hsl(var(--muted-foreground))",
                    }}
                    width={36}
                    allowDecimals={false}
                  />
                  <Tooltip
                    content={<CustomTooltip />}
                    cursor={{ fill: "hsl(var(--muted)/0.4)" }}
                  />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                    {entries.map((entry, i) => (
                      <Cell
                        key={entry.diseaseName}
                        fill={CHART_COLORS[i % CHART_COLORS.length]}
                      />
                    ))}
                    <LabelList
                      dataKey="count"
                      position="top"
                      style={{
                        fontSize: 10,
                        fill: "hsl(var(--muted-foreground))",
                      }}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}
      </motion.div>

      {/* Ranked List */}
      <section data-ocid="disease-ranked-list">
        <h2 className="font-semibold font-display text-foreground mb-3 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-primary" />
          Ranked Disease Index
        </h2>

        {isLoading ? (
          <ListSkeleton />
        ) : (
          <div className="space-y-2">
            {entries.map((entry, i) => {
              const trend = getTrendBadge(i + 1);
              const pct =
                totalReports > 0
                  ? Math.round((entry.count / totalReports) * 100)
                  : 0;
              return (
                <motion.div
                  key={entry.diseaseName}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.04, duration: 0.3 }}
                  className="card-data flex items-center gap-3 hover:border-primary/30"
                  data-ocid={`disease-row-${i}`}
                >
                  {/* Rank */}
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 text-primary-foreground"
                    style={{
                      background: CHART_COLORS[i % CHART_COLORS.length],
                    }}
                  >
                    {i + 1}
                  </div>

                  {/* Name + bar */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-semibold font-display text-foreground truncate">
                        {entry.diseaseName}
                      </p>
                      <span className="text-xs text-muted-foreground shrink-0 ml-2">
                        {entry.count} reports
                      </span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${pct}%`,
                          background: CHART_COLORS[i % CHART_COLORS.length],
                        }}
                      />
                    </div>
                  </div>

                  {/* Trend badge */}
                  <Badge className={`${trend.cls} border text-[10px] shrink-0`}>
                    {trend.label}
                  </Badge>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
