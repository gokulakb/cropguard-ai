import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useCropCalendar } from "@/hooks/use-backend";
import { BookOpen, CalendarDays, Clock, MapPin, Sprout } from "lucide-react";
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
  "Dec",
];

const CROP_ICONS: Record<string, string> = {
  Rice: "🌾",
  Wheat: "🌿",
  Maize: "🌽",
  Tomato: "🍅",
  Potato: "🥔",
  Cotton: "🌸",
  Sugarcane: "🎋",
  Soybean: "🫘",
};

export function CropCalendarPage() {
  const [selectedCrop, setSelectedCrop] = useState<string>("");
  const { data: calendar, isLoading } = useCropCalendar(selectedCrop);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-label text-muted-foreground mb-2">
          <CalendarDays className="w-4 h-4" />
          <span>Agricultural Tools</span>
        </div>
        <h1 className="text-display-md font-display">Crop Calendar</h1>
        <p className="text-muted-foreground text-base max-w-xl">
          Seasonal planting and care schedule for major crops. Select a crop to
          view the optimal sowing and harvest months.
        </p>
      </div>

      {/* Crop Selector */}
      <div className="card-data">
        <p className="text-label text-muted-foreground block mb-3">
          Select Crop Type
        </p>
        <Select onValueChange={setSelectedCrop} value={selectedCrop}>
          <SelectTrigger
            className="w-full md:w-72"
            data-ocid="crop-calendar-selector"
          >
            <SelectValue placeholder="Choose a crop..." />
          </SelectTrigger>
          <SelectContent>
            {CROPS.map((crop) => (
              <SelectItem key={crop} value={crop}>
                <span className="mr-2">{CROP_ICONS[crop]}</span>
                {crop}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Loading state */}
      {isLoading && selectedCrop && (
        <div className="space-y-4">
          <Skeleton className="h-48 w-full rounded-lg" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Skeleton className="h-28 rounded-lg" />
            <Skeleton className="h-28 rounded-lg" />
            <Skeleton className="h-28 rounded-lg" />
          </div>
        </div>
      )}

      {/* Empty state — no crop selected */}
      {!selectedCrop && (
        <div
          className="card-data flex flex-col items-center justify-center py-16 text-center"
          data-ocid="calendar-empty-state"
        >
          <span className="text-5xl mb-4">🌱</span>
          <h3 className="font-semibold text-lg mb-1">Select a Crop to Begin</h3>
          <p className="text-muted-foreground text-sm max-w-xs">
            Choose a crop from the dropdown above to see its seasonal planting
            calendar and growing schedule.
          </p>
        </div>
      )}

      {/* Not found state */}
      {selectedCrop && !isLoading && calendar === null && (
        <div
          className="card-data flex flex-col items-center justify-center py-16 text-center"
          data-ocid="calendar-not-found"
        >
          <span className="text-5xl mb-4">🔍</span>
          <h3 className="font-semibold text-lg mb-1">No Data Found</h3>
          <p className="text-muted-foreground text-sm">
            Calendar data for <strong>{selectedCrop}</strong> is not available
            yet.
          </p>
        </div>
      )}

      {/* Calendar data */}
      {calendar && !isLoading && (
        <div className="space-y-6" data-ocid="calendar-results">
          {/* Legend */}
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded bg-success/70 inline-block" />
              <span className="text-muted-foreground">Sowing Month</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded bg-warning/70 inline-block" />
              <span className="text-muted-foreground">Harvest Month</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded bg-muted inline-block" />
              <span className="text-muted-foreground">Off Season</span>
            </div>
          </div>

          {/* 12-Month Grid */}
          <div className="card-data">
            <h2 className="font-display font-semibold text-lg mb-4 flex items-center gap-2">
              {CROP_ICONS[selectedCrop]}
              <span>{selectedCrop} — Annual Calendar</span>
            </h2>
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-12 gap-2">
              {MONTHS.map((month, i) => {
                const monthNum = i + 1;
                const isSowing = calendar.sowingMonths.includes(monthNum);
                const isHarvest = calendar.harvestMonths.includes(monthNum);
                return (
                  <div
                    key={month}
                    className={`
                      rounded-md p-2 text-center text-xs font-semibold border transition-smooth
                      ${isSowing ? "bg-success/20 border-success/40 text-success" : ""}
                      ${isHarvest ? "bg-warning/20 border-warning/40 text-warning" : ""}
                      ${!isSowing && !isHarvest ? "bg-muted border-border text-muted-foreground" : ""}
                    `}
                  >
                    <div className="font-bold">{month}</div>
                    {isSowing && <div className="text-[10px] mt-0.5">Sow</div>}
                    {isHarvest && (
                      <div className="text-[10px] mt-0.5">Harvest</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="card-data space-y-2">
              <div className="flex items-center gap-2 text-label text-muted-foreground">
                <Clock className="w-3.5 h-3.5" />
                Growth Duration
              </div>
              <div className="text-3xl font-display font-bold text-primary">
                {calendar.growthDuration}
              </div>
              <div className="text-sm text-muted-foreground">
                days to maturity
              </div>
            </div>

            <div className="card-data space-y-2">
              <div className="flex items-center gap-2 text-label text-muted-foreground">
                <MapPin className="w-3.5 h-3.5" />
                Growing Region
              </div>
              <Badge className="badge-info mt-1">
                {calendar.region || "General"}
              </Badge>
              <div className="text-sm text-muted-foreground">
                Recommended climate zone
              </div>
            </div>

            <div className="card-data space-y-2">
              <div className="flex items-center gap-2 text-label text-muted-foreground">
                <Sprout className="w-3.5 h-3.5" />
                Sowing Months
              </div>
              <div className="flex flex-wrap gap-1 mt-1">
                {calendar.sowingMonths.map((m) => (
                  <Badge
                    key={m}
                    variant="outline"
                    className="text-success border-success/40 bg-success/10 text-xs"
                  >
                    {MONTHS[m - 1]}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Notes */}
          {calendar.notes && (
            <div className="card-data flex gap-3">
              <BookOpen className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-sm mb-1">
                  Agronomist Notes
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {calendar.notes}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
