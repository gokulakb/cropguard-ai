import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useFertilizerGuide } from "@/hooks/use-backend";
import { ChevronDown, ChevronUp, FlaskConical, Info, Leaf } from "lucide-react";
import { useState } from "react";

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

const GROWTH_STAGES = ["Seedling", "Vegetative", "Flowering"];

function parseNPK(ratio: string): { n: string; p: string; k: string } {
  const parts = ratio.split(/[-:]/).map((s) => s.trim());
  return { n: parts[0] ?? "—", p: parts[1] ?? "—", k: parts[2] ?? "—" };
}

function parseSoilPh(range: string): { min: number; max: number } {
  const match = range.match(/([\d.]+)[^0-9.]+([\d.]+)/);
  if (match)
    return {
      min: Number.parseFloat(match[1]),
      max: Number.parseFloat(match[2]),
    };
  return { min: 5.5, max: 7.5 };
}

export function FertilizerGuidePage() {
  const [cropType, setCropType] = useState("");
  const [growthStage, setGrowthStage] = useState("");
  const [npkOpen, setNpkOpen] = useState(false);

  const { data: guide, isLoading } = useFertilizerGuide(cropType, growthStage);

  const npk = guide ? parseNPK(guide.npkRatio) : null;
  const ph = guide ? parseSoilPh(guide.soilPhRange) : null;
  const phPercent = ph ? ((ph.min - 4) / (10 - 4)) * 100 : 0;
  const phWidth = ph ? ((ph.max - ph.min) / (10 - 4)) * 100 : 0;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-label text-muted-foreground mb-2">
          <FlaskConical className="w-4 h-4" />
          <span>Agricultural Tools</span>
        </div>
        <h1 className="text-display-md font-display">
          Fertilizer & Soil Guide
        </h1>
        <p className="text-muted-foreground text-base max-w-xl">
          Get NPK recommendations and soil health tips tailored to your crop and
          growth stage.
        </p>
      </div>

      {/* Selectors */}
      <div className="card-data">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-label text-muted-foreground block mb-2">
              Crop Type
            </p>
            <Select onValueChange={setCropType} value={cropType}>
              <SelectTrigger data-ocid="fertilizer-crop-selector">
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
          <div>
            <p className="text-label text-muted-foreground block mb-2">
              Growth Stage
            </p>
            <Select onValueChange={setGrowthStage} value={growthStage}>
              <SelectTrigger data-ocid="fertilizer-stage-selector">
                <SelectValue placeholder="Select stage..." />
              </SelectTrigger>
              <SelectContent>
                {GROWTH_STAGES.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Loading */}
      {isLoading && cropType && growthStage && (
        <div className="space-y-4">
          <Skeleton className="h-40 w-full rounded-lg" />
          <Skeleton className="h-24 w-full rounded-lg" />
        </div>
      )}

      {/* Prompt to select */}
      {(!cropType || !growthStage) && (
        <div
          className="card-data flex flex-col items-center justify-center py-14 text-center"
          data-ocid="fertilizer-empty-state"
        >
          <span className="text-5xl mb-4">🌿</span>
          <h3 className="font-semibold text-lg mb-1">Select Crop & Stage</h3>
          <p className="text-muted-foreground text-sm max-w-xs">
            Choose a crop type and growth stage above to get personalized
            fertilizer recommendations.
          </p>
        </div>
      )}

      {/* No data */}
      {cropType && growthStage && !isLoading && guide === null && (
        <div
          className="card-data flex flex-col items-center justify-center py-14 text-center"
          data-ocid="fertilizer-not-found"
        >
          <span className="text-5xl mb-4">🔍</span>
          <h3 className="font-semibold text-lg mb-1">No Data Available</h3>
          <p className="text-muted-foreground text-sm">
            No guide found for <strong>{cropType}</strong> at{" "}
            <strong>{growthStage}</strong> stage.
          </p>
        </div>
      )}

      {/* Results */}
      {guide && npk && ph && !isLoading && (
        <div className="space-y-5" data-ocid="fertilizer-results">
          {/* NPK Ratio */}
          <div className="card-data space-y-4">
            <h2 className="font-display font-semibold text-base">
              NPK Fertilizer Ratio
            </h2>
            <div className="grid grid-cols-3 gap-3">
              {/* Nitrogen */}
              <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-success/10 border border-success/30">
                <span className="text-2xl font-display font-extrabold text-success">
                  {npk.n}
                </span>
                <span className="text-label text-success/80">Nitrogen (N)</span>
                <span className="text-[11px] text-muted-foreground text-center">
                  Leaf growth
                </span>
              </div>
              {/* Phosphorus */}
              <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-info/10 border border-info/30">
                <span className="text-2xl font-display font-extrabold text-info">
                  {npk.p}
                </span>
                <span className="text-label text-info/80">Phosphorus (P)</span>
                <span className="text-[11px] text-muted-foreground text-center">
                  Root strength
                </span>
              </div>
              {/* Potassium */}
              <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-warning/10 border border-warning/30">
                <span className="text-2xl font-display font-extrabold text-warning">
                  {npk.k}
                </span>
                <span className="text-label text-warning/80">
                  Potassium (K)
                </span>
                <span className="text-[11px] text-muted-foreground text-center">
                  Disease resist.
                </span>
              </div>
            </div>
          </div>

          {/* Soil pH Range */}
          <div className="card-data space-y-3">
            <h2 className="font-display font-semibold text-base">
              Soil pH Range
            </h2>
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
              <span>Acidic (4.0)</span>
              <span className="font-semibold text-foreground">
                {guide.soilPhRange}
              </span>
              <span>Alkaline (10.0)</span>
            </div>
            <div className="relative h-3 rounded-full bg-muted overflow-hidden">
              {/* Full gradient bar */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "linear-gradient(to right, oklch(0.6 0.15 25), oklch(0.7 0.12 85), oklch(0.6 0.18 155), oklch(0.5 0.15 260))",
                }}
              />
              {/* Optimal range highlight */}
              <div
                className="absolute inset-y-0 rounded-full ring-2 ring-foreground/30"
                style={{
                  left: `${phPercent}%`,
                  width: `${phWidth}%`,
                  background: "oklch(0.6 0.18 155 / 0.5)",
                }}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Optimal range highlighted. Outside this range, nutrient uptake
              decreases significantly.
            </p>
          </div>

          {/* Application Timing + Organic Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="card-data space-y-2">
              <h3 className="font-semibold text-sm">Application Timing</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {guide.applicationTiming}
              </p>
            </div>
            <div className="card-data space-y-3">
              <h3 className="font-semibold text-sm flex items-center gap-1.5">
                <Leaf className="w-3.5 h-3.5 text-success" />
                Organic Alternatives
              </h3>
              <div className="flex flex-wrap gap-2">
                {guide.organicOptions.length > 0 ? (
                  guide.organicOptions.map((opt) => (
                    <Badge
                      key={opt}
                      variant="outline"
                      className="badge-success text-xs"
                    >
                      {opt}
                    </Badge>
                  ))
                ) : (
                  <span className="text-muted-foreground text-sm">
                    No organic alternatives listed.
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Notes */}
          {guide.notes && (
            <div className="card-data flex gap-3">
              <Info className="w-5 h-5 text-info shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                {guide.notes}
              </p>
            </div>
          )}
        </div>
      )}

      {/* What is NPK? Expandable */}
      <div className="card-data">
        <button
          type="button"
          className="w-full flex items-center justify-between text-left transition-smooth"
          onClick={() => setNpkOpen(!npkOpen)}
          data-ocid="npk-info-toggle"
          aria-expanded={npkOpen}
        >
          <span className="font-semibold text-sm flex items-center gap-2">
            <FlaskConical className="w-4 h-4 text-primary" />
            What is NPK?
          </span>
          {npkOpen ? (
            <ChevronUp className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          )}
        </button>
        {npkOpen && (
          <div className="mt-4 space-y-3 text-sm text-muted-foreground leading-relaxed border-t border-border pt-4">
            <p>
              <strong className="text-success">N — Nitrogen</strong> is
              essential for vegetative growth, leaf and stem development, and
              overall plant vigor. A nitrogen-rich fertilizer promotes lush
              green foliage.
            </p>
            <p>
              <strong className="text-info">P — Phosphorus</strong> is critical
              for root development, energy transfer, and flowering. It helps
              plants establish strong root systems and improves resistance to
              stress.
            </p>
            <p>
              <strong className="text-warning">K — Potassium</strong>{" "}
              strengthens cell walls, improves disease resistance, enhances
              water regulation, and boosts fruit/grain quality and shelf life.
            </p>
            <p>
              The NPK ratio is expressed as three numbers (e.g., 20-10-10),
              representing the percentage by weight of each nutrient in the
              fertilizer. Higher numbers mean a more concentrated nutrient.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
