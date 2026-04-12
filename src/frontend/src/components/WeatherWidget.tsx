import { Button } from "@/components/ui/button";
import type { WeatherData } from "@/types";
import { CloudSun, ExternalLink, MapPin } from "lucide-react";
import { useEffect, useState } from "react";

export function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (!navigator.geolocation) {
      setError(true);
      setLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setWeather({
          location: "Your Location",
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
        setLoading(false);
      },
      () => {
        setError(true);
        setLoading(false);
      },
      { timeout: 8000 },
    );
  }, []);

  const googleWeatherUrl = weather
    ? `https://www.google.com/search?q=weather+${weather.lat.toFixed(4)},${weather.lon.toFixed(4)}`
    : "https://www.google.com/search?q=weather+forecast+for+farmers";

  return (
    <div
      className="bg-card border border-border rounded-lg p-4 shadow-subtle"
      data-ocid="weather-widget"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
            <CloudSun className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="font-semibold text-sm font-display text-foreground">
              Weather
            </p>
            {weather && (
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {weather.location}
              </p>
            )}
          </div>
        </div>
        <img
          src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_74x24dp.png"
          alt="Google"
          className="h-5 opacity-70"
        />
      </div>

      {loading && (
        <div className="space-y-2">
          <div className="h-3 bg-muted rounded animate-pulse w-3/4" />
          <div className="h-3 bg-muted rounded animate-pulse w-1/2" />
        </div>
      )}

      {error && (
        <p className="text-xs text-muted-foreground mb-3">
          Enable location for local weather
        </p>
      )}

      {!loading && (
        <Button
          variant="outline"
          size="sm"
          className="w-full gap-2 text-xs"
          onClick={() => window.open(googleWeatherUrl, "_blank")}
          data-ocid="weather-open-google"
        >
          <ExternalLink className="w-3 h-3" />
          View Full Forecast on Google
        </Button>
      )}
    </div>
  );
}
