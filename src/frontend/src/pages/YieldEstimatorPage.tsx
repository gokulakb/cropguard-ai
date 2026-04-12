import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useEstimateYield } from "@/hooks/use-backend";
import type { YieldEstimation } from "@/types";
import { BarChart2, Minus, Plus, RotateCcw, Scale, Sprout } from "lucide-react";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const CROPS = [
  "Rice",
  "Wheat",
  "Maize",
  "Tomato",
  "Potato",
  "Cotton",
  "Sugarcane",
  "Soybean",
];

const HEALTH_OPTIONS = [
  {
    value: "Healthy",
    label: "Healthy",
    color: "text-success",
    dot: "bg-success",
  },
  {
    value: "Mild Disease",
    label: "Mild Disease",
    color: "text-warning",
    dot: "bg-warning",
  },
  {
    value: "Moderate Disease",
    label: "Moderate Disease",
    color: "text-social",
    dot: "bg-social",
  },
  {
    value: "Severe Disease",
    label: "Severe Disease",
    color: "text-destructive",
    dot: "bg-destructive",
  },
];

// Approximate healthy baseline yields (kg/ha) for comparison bar
const HEALTHY_YIELDS: Record<string, number> = {
  Rice: 5000,
  Wheat: 4000,
  Maize: 6000,
  Tomato: 25000,
  Potato: 20000,
  Cotton: 1500,
  Sugarcane: 70000,
  Soybean: 2500,
};

export function YieldEstimatorPage() {
  const [cropType, setCropType] = useState("");
  const [area, setArea] = useState(1);
  const [healthStatus, setHealthStatus] = useState("");
  const [result, setResult] = useState<YieldEstimation | null>(null);

  const estimateYield = useEstimateYield();

  const handleSubmit = async () => {
    if (!cropType || !healthStatus || area <= 0) return;
    try {
      const res = await estimateYield.mutateAsync({
        cropType,
        areaHectares: area,
        healthStatus,
      });
      setResult(res);
    } catch {
      // mutation error handled below
    }
  };

  const handleReset = () => {
    setCropType("");
    setArea(1);
    setHealthStatus("");
    setResult(null);
    estimateYield.reset();
  };

  const healthyPotential = result
    ? (HEALTHY_YIELDS[result.cropType] ?? 5000) * result.areaHectares
    : 0;

  const chartData = result
    ? [
        {
          name: "Your Estimate",
          value: result.estimatedYieldKg,
          fill: "oklch(var(--primary))",
        },
        {
          name: "Healthy Potential",
          value: healthyPotential,
          fill: "#16a34a",
        },
      ]
    : [];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-label text-muted-foreground mb-2">
          <Scale className="w-4 h-4" />
          <span>Agricultural Tools</span>
        </div>
        <h1 className="text-display-md font-display">Yield Estimator</h1>
        <p className="text-muted-foreground text-base max-w-xl">
          Estimate your expected crop yield based on crop type, farm area, and
          current plant health conditions.
        </p>
      </div>

      {/* Form */}
      <div className="card-data space-y-6" data-ocid="yield-estimator-form">
        {/* Crop Type */}
        <div className="space-y-2">
          <Label className="text-label text-muted-foreground">Crop Type</Label>
          <Select onValueChange={setCropType} value={cropType}>
            <SelectTrigger data-ocid="yield-crop-selector">
              <SelectValue placeholder="Select crop..." />
            </SelectTrigger>
            <SelectContent>
              {CROPS.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Area in Hectares */}
        <div className="space-y-2">
          <Label className="text-label text-muted-foreground">
            Farm Area (Hectares)
          </Label>
          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="shrink-0"
              onClick={() =>
                setArea((v) =>
                  Math.max(0.1, Number.parseFloat((v - 0.5).toFixed(1))),
                )
              }
              data-ocid="yield-area-decrement"
              aria-label="Decrease area"
            >
              <Minus className="w-4 h-4" />
            </Button>
            <Input
              type="number"
              min={0.1}
              step={0.1}
              value={area}
              onChange={(e) =>
                setArea(Math.max(0.1, Number.parseFloat(e.target.value) || 0.1))
              }
              className="text-center font-semibold text-lg w-28"
              data-ocid="yield-area-input"
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="shrink-0"
              onClick={() =>
                setArea((v) => Number.parseFloat((v + 0.5).toFixed(1)))
              }
              data-ocid="yield-area-increment"
              aria-label="Increase area"
            >
              <Plus className="w-4 h-4" />
            </Button>
            <span className="text-muted-foreground text-sm">hectares</span>
          </div>
        </div>

        {/* Health Status */}
        <div className="space-y-2">
          <Label className="text-label text-muted-foreground">
            Plant Health Status
          </Label>
          <Select onValueChange={setHealthStatus} value={healthStatus}>
            <SelectTrigger data-ocid="yield-health-selector">
              <SelectValue placeholder="Select health status..." />
            </SelectTrigger>
            <SelectContent>
              {HEALTH_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${opt.dot}`} />
                    {opt.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            onClick={handleSubmit}
            disabled={
              !cropType || !healthStatus || area <= 0 || estimateYield.isPending
            }
            className="flex-1"
            data-ocid="yield-estimate-submit"
          >
            <Sprout className="w-4 h-4 mr-2" />
            {estimateYield.isPending ? "Estimating…" : "Estimate Yield"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleReset}
            data-ocid="yield-reset-btn"
            aria-label="Reset form"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>

        {estimateYield.isError && (
          <p className="text-sm text-destructive">
            Failed to estimate yield. Please try again.
          </p>
        )}
      </div>

      {/* Loading skeleton */}
      {estimateYield.isPending && (
        <div className="space-y-4">
          <Skeleton className="h-36 w-full rounded-lg" />
          <Skeleton className="h-48 w-full rounded-lg" />
        </div>
      )}

      {/* Results */}
      {result && !estimateYield.isPending && (
        <div className="space-y-5" data-ocid="yield-results">
          {/* Big Numbers */}
          <div className="grid grid-cols-2 gap-4">
            <div className="card-data text-center space-y-1">
              <p className="text-label text-muted-foreground">
                Estimated Yield
              </p>
              <p className="text-4xl font-display font-extrabold text-primary">
                {result.estimatedYieldKg.toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground">kilograms</p>
            </div>
            <div className="card-data text-center space-y-1">
              <p className="text-label text-muted-foreground">In Tonnes</p>
              <p className="text-4xl font-display font-extrabold text-accent">
                {(result.estimatedYieldKg / 1000).toFixed(2)}
              </p>
              <p className="text-sm text-muted-foreground">metric tonnes</p>
            </div>
          </div>

          {/* Comparison Bar Chart */}
          <div className="card-data">
            <h3 className="font-display font-semibold text-base mb-4 flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-primary" />
              Yield Comparison vs Healthy Potential
            </h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart
                data={chartData}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                barSize={56}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="oklch(0.88 0.008 155)"
                />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12, fill: "oklch(0.5 0.012 155)" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "oklch(0.5 0.012 155)" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v: number) =>
                    v >= 1000 ? `${(v / 1000).toFixed(0)}k` : String(v)
                  }
                />
                <Tooltip
                  formatter={(value: number) => [
                    `${value.toLocaleString()} kg`,
                    "Yield",
                  ]}
                  contentStyle={{
                    background: "oklch(0.99 0.004 155)",
                    border: "1px solid oklch(0.88 0.008 155)",
                    borderRadius: "8px",
                    fontSize: "13px",
                  }}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {chartData.map((entry) => (
                    <Cell key={entry.name} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="flex gap-4 mt-2 justify-center text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-primary inline-block" />
                Your estimate
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-success inline-block" />
                Healthy crop potential
              </span>
            </div>
          </div>

          {/* Notes */}
          {result.notes && (
            <div className="card-data flex gap-3">
              <Sprout className="w-5 h-5 text-success shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                {result.notes}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
