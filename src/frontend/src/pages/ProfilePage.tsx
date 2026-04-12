import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/use-auth";
import {
  useAlertSettings,
  useAppointments,
  usePredictionHistory,
  useSaveAlertSettings,
  useSaveUserProfile,
  useUserProfile,
} from "@/hooks/use-backend";
import type {
  AlertSetting,
  Appointment,
  DiseaseSeverity,
  Prediction,
} from "@/types";
import { getSeverityLabel, getSeverityStyle } from "@/utils/severity";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Activity,
  AlertTriangle,
  Bell,
  Calendar,
  ChevronRight,
  Clock,
  Edit2,
  Leaf,
  LogOut,
  MapPin,
  Phone,
  Save,
  ShieldCheck,
  TrendingUp,
  User,
  Wheat,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// ─── Sample fallback data ──────────────────────────────────────────────────────

const SAMPLE_PREDICTIONS: Prediction[] = [
  {
    id: "pred-1",
    imageUrl: "/assets/generated/hero-crop-field.dim_1200x600.jpg",
    plantType: "Tomato",
    disease: null,
    severity: "severe",
    confidence: 0.94,
    analyzedAt: "2026-04-09T07:00:00Z",
    notes: "Emergency: Late Blight Detected",
  },
  {
    id: "pred-2",
    imageUrl: "/assets/generated/hero-crop-field.dim_1200x600.jpg",
    plantType: "Rice",
    disease: null,
    severity: "mild",
    confidence: 0.88,
    analyzedAt: "2026-04-08T14:30:00Z",
    notes: "Downy Mildew — Likely Confident",
  },
  {
    id: "pred-3",
    imageUrl: "/assets/generated/hero-crop-field.dim_1200x600.jpg",
    plantType: "Wheat",
    disease: null,
    severity: "moderate",
    confidence: 0.76,
    analyzedAt: "2026-04-07T09:00:00Z",
    notes: "Powdery Mildew — Action Required",
  },
  {
    id: "pred-4",
    imageUrl: "/assets/generated/hero-crop-field.dim_1200x600.jpg",
    plantType: "Maize",
    disease: null,
    severity: "healthy",
    confidence: 0.97,
    analyzedAt: "2026-04-06T11:00:00Z",
    notes: "No Disease — Healthy",
  },
];

const SAMPLE_APPOINTMENTS: Appointment[] = [
  {
    id: "apt-1",
    farmerName: "James Mwangi",
    farmerContact: "+254 700 000 001",
    location: "Nakuru North Plot",
    cropType: "Tomato",
    issue: "Late Blight — Severe",
    preferredDate: "2026-04-14",
    status: "confirmed",
    officerName: "Dr. Alice Kamau",
    createdAt: "2026-04-09T08:00:00Z",
    predictionId: "pred-1",
  },
  {
    id: "apt-2",
    farmerName: "James Mwangi",
    farmerContact: "+254 700 000 001",
    location: "South Field",
    cropType: "Rice",
    issue: "Downy Mildew",
    preferredDate: "2026-04-16",
    status: "pending",
    createdAt: "2026-04-08T09:00:00Z",
    predictionId: "pred-2",
  },
];

const CROP_OPTIONS = [
  "Tomato",
  "Rice",
  "Wheat",
  "Maize",
  "Potato",
  "Cassava",
  "Cotton",
  "Soybean",
];

// ─── Helper components ────────────────────────────────────────────────────────

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  accent,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  sub?: string;
  accent?: string;
}) {
  return (
    <Card className="shadow-subtle">
      <CardContent className="p-4 flex flex-col gap-1">
        <div
          className={`w-8 h-8 rounded-lg flex items-center justify-center mb-1 ${accent ?? "bg-primary/10"}`}
        >
          <Icon
            className={`w-4 h-4 ${accent ? "text-foreground" : "text-primary"}`}
          />
        </div>
        <p className="text-2xl font-bold font-display text-foreground leading-none">
          {value}
        </p>
        <p className="text-xs text-muted-foreground">{label}</p>
        {sub && <p className="text-[11px] text-primary font-medium">{sub}</p>}
      </CardContent>
    </Card>
  );
}

function PredictionRow({ pred }: { pred: Prediction }) {
  const style = getSeverityStyle(pred.severity);
  const label = getSeverityLabel(pred.severity);
  const diseaseName =
    pred.notes?.split("—")[0]?.replace("Emergency:", "").trim() ??
    pred.disease?.name ??
    "Unknown";
  const date = new Date(pred.analyzedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Link
      to="/results/$predictionId"
      params={{ predictionId: pred.id }}
      className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/40 transition-smooth group"
      data-ocid="profile-history-row"
    >
      {/* Thumbnail */}
      <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-muted">
        <img
          src={pred.imageUrl}
          alt={pred.plantType}
          className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
        />
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="font-semibold text-sm text-foreground font-display truncate">
            {diseaseName}
          </p>
          <Badge className={`${style.badge} text-[10px] px-1.5 py-0 shrink-0`}>
            {label}
          </Badge>
        </div>
        <div className="flex items-center gap-2 mt-0.5 text-xs text-muted-foreground">
          <Leaf className="w-3 h-3 shrink-0" />
          <span>{pred.plantType}</span>
          <span>·</span>
          <Clock className="w-3 h-3 shrink-0" />
          <span>{date}</span>
        </div>
      </div>

      {/* Confidence + arrow */}
      <div className="text-right shrink-0">
        <p className="text-sm font-bold font-display text-foreground">
          {Math.round(pred.confidence * 100)}%
        </p>
        <p className="text-[10px] text-muted-foreground">confidence</p>
      </div>
      <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-smooth ml-1 shrink-0" />
    </Link>
  );
}

function AppointmentRow({ apt }: { apt: Appointment }) {
  const statusConfig: Record<
    Appointment["status"],
    { label: string; cls: string }
  > = {
    pending: {
      label: "Pending",
      cls: "bg-accent/10 text-accent border-accent/20",
    },
    confirmed: {
      label: "Confirmed",
      cls: "bg-primary/10 text-primary border-primary/20",
    },
    completed: {
      label: "Completed",
      cls: "bg-muted text-muted-foreground border-border",
    },
    cancelled: {
      label: "Cancelled",
      cls: "bg-destructive/10 text-destructive border-destructive/20",
    },
  };
  const sc = statusConfig[apt.status];
  const date = new Date(apt.preferredDate).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  return (
    <div
      className="flex items-start gap-3 p-3 rounded-xl hover:bg-muted/40 transition-smooth"
      data-ocid="profile-appointment-row"
    >
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
        <Calendar className="w-4 h-4 text-primary" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="font-semibold text-sm text-foreground font-display">
            {apt.cropType} — {apt.issue}
          </p>
          <Badge className={`${sc.cls} text-[10px] px-1.5 py-0`}>
            {sc.label}
          </Badge>
        </div>
        <div className="flex items-center gap-2 mt-0.5 text-xs text-muted-foreground flex-wrap">
          <Clock className="w-3 h-3 shrink-0" />
          <span>{date}</span>
          {apt.officerName && (
            <>
              <span>·</span>
              <ShieldCheck className="w-3 h-3 shrink-0" />
              <span>{apt.officerName}</span>
            </>
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-0.5">
          <MapPin className="w-3 h-3 inline mr-0.5" />
          {apt.location}
        </p>
      </div>
    </div>
  );
}

// ─── Regional Alerts ──────────────────────────────────────────────────────────

const REGIONS = [
  "North",
  "South",
  "East",
  "West",
  "Central",
  "Northeast",
  "Northwest",
  "Southeast",
  "Southwest",
];

function RegionalAlerts() {
  const { data: savedSettings, isLoading } = useAlertSettings();
  const saveMutation = useSaveAlertSettings();

  const [settings, setSettings] = useState<AlertSetting[]>(() =>
    REGIONS.map((region) => ({ region, enabled: false })),
  );

  // Sync once when server data arrives
  useEffect(() => {
    if (!savedSettings) return;
    const serverMap = new Map(savedSettings.map((s) => [s.region, s.enabled]));
    setSettings(
      REGIONS.map((region) => ({
        region,
        enabled: serverMap.get(region) ?? false,
      })),
    );
  }, [savedSettings]);

  const handleToggle = (region: string) => {
    const next = settings.map((s) =>
      s.region === region ? { ...s, enabled: !s.enabled } : s,
    );
    setSettings(next);
    saveMutation.mutate(next, {
      onSuccess: () => toast.success("Alert settings saved"),
      onError: () => toast.error("Failed to save alert settings"),
    });
  };

  return (
    <div data-ocid="profile-alert-settings">
      <h2 className="font-semibold font-display text-foreground mb-3 flex items-center gap-2">
        <Bell className="w-4 h-4 text-primary" />
        Regional Disease Alerts
      </h2>
      <Card className="shadow-subtle">
        <CardContent className="p-4">
          <p className="text-xs text-muted-foreground mb-4">
            Get notified when a disease outbreak is reported in your region.
            Toggle on the regions you farm in or monitor.
          </p>
          {isLoading ? (
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-9 rounded-lg" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {settings.map((s) => (
                <button
                  key={s.region}
                  type="button"
                  onClick={() => handleToggle(s.region)}
                  disabled={saveMutation.isPending}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg border text-sm font-medium transition-smooth ${
                    s.enabled
                      ? "bg-primary/10 border-primary/30 text-primary"
                      : "bg-muted/40 border-border text-muted-foreground hover:border-primary/30 hover:text-foreground"
                  }`}
                  data-ocid={`alert-toggle-${s.region.toLowerCase()}`}
                >
                  <span>{s.region}</span>
                  <span
                    className={`w-8 h-4 rounded-full relative transition-smooth flex-shrink-0 ${
                      s.enabled ? "bg-primary" : "bg-border"
                    }`}
                    aria-hidden="true"
                  >
                    <span
                      className={`absolute top-0.5 w-3 h-3 rounded-full bg-white shadow transition-transform ${
                        s.enabled ? "translate-x-4" : "translate-x-0.5"
                      }`}
                    />
                  </span>
                </button>
              ))}
            </div>
          )}
          {saveMutation.isPending && (
            <p className="text-xs text-muted-foreground mt-3 text-center animate-pulse">
              Saving…
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export function ProfilePage() {
  const { principal, logout } = useAuth();
  const navigate = useNavigate();
  const { data: profile, isLoading: profileLoading } = useUserProfile();
  const { data: predictionsRaw, isLoading: predLoading } =
    usePredictionHistory();
  const { data: appointmentsRaw, isLoading: aptLoading } = useAppointments();
  const saveMutation = useSaveUserProfile();

  const predictions =
    predictionsRaw && predictionsRaw.length > 0
      ? predictionsRaw
      : SAMPLE_PREDICTIONS;
  const appointments =
    appointmentsRaw && appointmentsRaw.length > 0
      ? appointmentsRaw
      : SAMPLE_APPOINTMENTS;

  const [editMode, setEditMode] = useState(false);
  const [showAllHistory, setShowAllHistory] = useState(false);

  const [form, setForm] = useState({
    displayName: profile?.displayName ?? "James Mwangi",
    farmName: profile?.farmName ?? "Sunrise Farm",
    location: profile?.location ?? "Nakuru, Kenya",
    phone: profile?.phone ?? "+254 700 000 000",
    primaryCrops: profile?.primaryCrops ?? ["Tomato", "Wheat"],
  });

  const toggleCrop = (crop: string) => {
    setForm((prev) => ({
      ...prev,
      primaryCrops: prev.primaryCrops.includes(crop)
        ? prev.primaryCrops.filter((c) => c !== crop)
        : [...prev.primaryCrops, crop],
    }));
  };

  const handleSave = () => {
    saveMutation.mutate(form.displayName, {
      onSuccess: () => {
        toast.success("Profile saved successfully");
        setEditMode(false);
      },
      onError: () => toast.error("Failed to save profile"),
    });
  };

  const handleLogout = () => {
    logout();
    navigate({ to: "/" });
  };

  const initials = (form.displayName || principal || "U")
    .split(" ")
    .map((w: string) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  // ─── Stats computation ───────────────────────────────────────────────────
  const totalPredictions = predictions.length;
  const severityCount = predictions.reduce<Record<DiseaseSeverity, number>>(
    (acc, p) => {
      acc[p.severity] = (acc[p.severity] ?? 0) + 1;
      return acc;
    },
    { healthy: 0, mild: 0, moderate: 0, severe: 0 },
  );
  const diseaseNames = predictions
    .map(
      (p) =>
        p.notes?.split("—")[0]?.replace("Emergency:", "").trim() ??
        p.disease?.name,
    )
    .filter((n): n is string => !!n && n !== "No Disease");
  const mostCommonDisease =
    diseaseNames.length > 0
      ? (Object.entries(
          diseaseNames.reduce<Record<string, number>>((acc, n) => {
            acc[n] = (acc[n] ?? 0) + 1;
            return acc;
          }, {}),
        ).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "None")
      : "None";

  const visiblePredictions = showAllHistory
    ? predictions
    : predictions.slice(0, 4);

  if (profileLoading) {
    return (
      <div className="p-4 md:p-6 max-w-2xl mx-auto space-y-4">
        <Skeleton className="h-24 rounded-2xl" />
        <Skeleton className="h-40 rounded-2xl" />
        <Skeleton className="h-64 rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto space-y-6 pb-10">
      {/* ── Profile Header ─────────────────────────────────────────────────── */}
      <div
        className="bg-card border border-border rounded-2xl p-5 shadow-subtle relative overflow-hidden"
        data-ocid="profile-header"
      >
        {/* Decorative gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />

        <div className="relative flex items-start gap-4">
          <Avatar className="w-16 h-16 ring-2 ring-primary/20 ring-offset-2 shrink-0">
            <AvatarFallback className="bg-primary/15 text-primary text-xl font-bold font-display">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0 flex-1">
            {editMode ? (
              <div className="space-y-2">
                <Input
                  value={form.displayName}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, displayName: e.target.value }))
                  }
                  placeholder="Your name"
                  className="font-display font-semibold h-8 text-sm"
                  data-ocid="profile-name-edit"
                />
                <Input
                  value={form.farmName}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, farmName: e.target.value }))
                  }
                  placeholder="Farm name"
                  className="h-7 text-xs"
                  data-ocid="profile-farm-edit"
                />
              </div>
            ) : (
              <>
                <h1 className="text-xl font-bold font-display text-foreground">
                  {form.displayName || "Your Profile"}
                </h1>
                {form.farmName && (
                  <p className="text-sm text-muted-foreground">
                    {form.farmName}
                  </p>
                )}
              </>
            )}
            {principal && (
              <p className="text-[11px] text-muted-foreground font-mono truncate mt-1">
                ID: {principal.slice(0, 24)}…
              </p>
            )}
          </div>

          <Button
            size="sm"
            variant="outline"
            className="shrink-0 gap-1.5 text-xs"
            onClick={() => (editMode ? setEditMode(false) : setEditMode(true))}
            data-ocid="profile-edit-toggle"
          >
            {editMode ? (
              <X className="w-3.5 h-3.5" />
            ) : (
              <Edit2 className="w-3.5 h-3.5" />
            )}
            {editMode ? "Cancel" : "Edit"}
          </Button>
        </div>

        {/* Crops row */}
        {form.primaryCrops.length > 0 && !editMode && (
          <div className="relative flex flex-wrap gap-1.5 mt-3">
            {form.primaryCrops.map((crop) => (
              <Badge
                key={crop}
                variant="outline"
                className="text-[10px] px-2 py-0 border-primary/20 text-primary bg-primary/5"
              >
                <Leaf className="w-2.5 h-2.5 mr-1" />
                {crop}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* ── Edit Form (expanded when editMode) ────────────────────────────── */}
      {editMode && (
        <Card className="shadow-subtle" data-ocid="profile-edit-form">
          <CardHeader className="pb-3">
            <CardTitle className="font-display text-sm flex items-center gap-2">
              <User className="w-4 h-4 text-primary" />
              Edit Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label
                  htmlFor="location"
                  className="text-xs flex items-center gap-1.5"
                >
                  <MapPin className="w-3.5 h-3.5" /> Location
                </Label>
                <Input
                  id="location"
                  value={form.location}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, location: e.target.value }))
                  }
                  placeholder="Nakuru, Kenya"
                  data-ocid="profile-location"
                />
              </div>
              <div className="space-y-1.5">
                <Label
                  htmlFor="phone"
                  className="text-xs flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" /> Phone
                </Label>
                <Input
                  id="phone"
                  value={form.phone}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, phone: e.target.value }))
                  }
                  placeholder="+254 700 000 000"
                  data-ocid="profile-phone"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs flex items-center gap-1.5">
                <Wheat className="w-3.5 h-3.5" /> Primary Crops
              </Label>
              <div className="flex flex-wrap gap-2">
                {CROP_OPTIONS.map((crop) => (
                  <Badge
                    key={crop}
                    variant={
                      form.primaryCrops.includes(crop) ? "default" : "outline"
                    }
                    className="cursor-pointer transition-smooth text-xs"
                    onClick={() => toggleCrop(crop)}
                    data-ocid={`profile-crop-${crop.toLowerCase()}`}
                  >
                    {crop}
                  </Badge>
                ))}
              </div>
            </div>

            <Button
              onClick={handleSave}
              className="w-full gap-2"
              disabled={saveMutation.isPending}
              data-ocid="profile-save"
            >
              <Save className="w-4 h-4" />
              {saveMutation.isPending ? "Saving…" : "Save Profile"}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* ── Stats Summary ──────────────────────────────────────────────────── */}
      <div data-ocid="profile-stats">
        <h2 className="font-semibold font-display text-foreground mb-3 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-primary" />
          Summary
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatCard
            icon={Activity}
            label="Total Scans"
            value={totalPredictions}
            sub="All time"
          />
          <StatCard
            icon={AlertTriangle}
            label="Severe Alerts"
            value={severityCount.severe}
            sub={severityCount.severe > 0 ? "Needs attention" : "All clear"}
            accent={severityCount.severe > 0 ? "bg-destructive/10" : undefined}
          />
          <StatCard
            icon={Leaf}
            label="Healthy Scans"
            value={severityCount.healthy}
            sub="No disease"
          />
          <StatCard
            icon={TrendingUp}
            label="Most Common"
            value={
              mostCommonDisease.length > 10
                ? `${mostCommonDisease.slice(0, 10)}…`
                : mostCommonDisease
            }
            sub="Disease"
          />
        </div>

        {/* Severity breakdown bar */}
        <Card className="mt-3 shadow-subtle">
          <CardContent className="p-4">
            <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
              Severity Breakdown
            </p>
            <div className="space-y-2">
              {(
                [
                  {
                    key: "healthy" as const,
                    label: "Healthy",
                    color: "bg-primary",
                  },
                  {
                    key: "mild" as const,
                    label: "Mild",
                    color: "bg-primary/60",
                  },
                  {
                    key: "moderate" as const,
                    label: "Moderate",
                    color: "bg-accent",
                  },
                  {
                    key: "severe" as const,
                    label: "Severe",
                    color: "bg-destructive",
                  },
                ] as Array<{
                  key: DiseaseSeverity;
                  label: string;
                  color: string;
                }>
              ).map(({ key, label, color }) => {
                const count = severityCount[key];
                const pct =
                  totalPredictions > 0
                    ? Math.round((count / totalPredictions) * 100)
                    : 0;
                return (
                  <div key={key} className="flex items-center gap-2">
                    <span className="w-16 text-xs text-muted-foreground shrink-0">
                      {label}
                    </span>
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${color} transition-all duration-500`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-foreground w-8 text-right">
                      {count}
                    </span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      <Separator />

      {/* ── Prediction History ─────────────────────────────────────────────── */}
      <div data-ocid="profile-history">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold font-display text-foreground flex items-center gap-2">
            <Activity className="w-4 h-4 text-primary" />
            Prediction History
            <Badge variant="outline" className="text-[10px] px-1.5 py-0 ml-1">
              {totalPredictions}
            </Badge>
          </h2>
          <Link
            to="/detect"
            className="text-xs text-primary hover:underline transition-smooth"
            data-ocid="profile-new-scan"
          >
            + New Scan
          </Link>
        </div>

        <Card className="shadow-subtle">
          <CardContent className="p-2">
            {predLoading ? (
              <div className="space-y-2 p-2">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-14 rounded-xl" />
                ))}
              </div>
            ) : predictions.length === 0 ? (
              <div
                className="text-center py-10 text-muted-foreground"
                data-ocid="profile-history-empty"
              >
                <Activity className="w-8 h-8 mx-auto mb-2 opacity-30" />
                <p className="text-sm font-medium">No scans yet</p>
                <p className="text-xs mt-1">
                  Scan your first crop to see history here
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  className="mt-3 gap-1.5"
                  asChild
                >
                  <Link to="/detect">Start Scanning</Link>
                </Button>
              </div>
            ) : (
              <div className="divide-y divide-border/50">
                {visiblePredictions.map((pred) => (
                  <PredictionRow key={pred.id} pred={pred} />
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {predictions.length > 4 && (
          <button
            type="button"
            className="w-full mt-2 text-xs text-primary hover:underline py-1.5 transition-smooth"
            onClick={() => setShowAllHistory((p) => !p)}
            data-ocid="profile-history-toggle"
          >
            {showAllHistory
              ? "Show less"
              : `View all ${predictions.length} scans →`}
          </button>
        )}
      </div>

      <Separator />

      {/* ── Appointments ──────────────────────────────────────────────────── */}
      <div data-ocid="profile-appointments">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold font-display text-foreground flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" />
            Appointments
            <Badge variant="outline" className="text-[10px] px-1.5 py-0 ml-1">
              {appointments.length}
            </Badge>
          </h2>
          <Link
            to="/appointment"
            search={{
              predictionId: undefined,
              diseaseName: undefined,
              severity: undefined,
              cropType: undefined,
            }}
            className="text-xs text-primary hover:underline transition-smooth"
            data-ocid="profile-new-appointment"
          >
            + Book New
          </Link>
        </div>

        <Card className="shadow-subtle">
          <CardContent className="p-2">
            {aptLoading ? (
              <div className="space-y-2 p-2">
                <Skeleton className="h-16 rounded-xl" />
                <Skeleton className="h-16 rounded-xl" />
              </div>
            ) : appointments.length === 0 ? (
              <div
                className="text-center py-8 text-muted-foreground"
                data-ocid="profile-appointments-empty"
              >
                <Calendar className="w-8 h-8 mx-auto mb-2 opacity-30" />
                <p className="text-sm font-medium">No appointments</p>
                <p className="text-xs mt-1">
                  Book a consultation with an agricultural officer
                </p>
              </div>
            ) : (
              <div className="divide-y divide-border/50">
                {appointments.map((apt) => (
                  <AppointmentRow key={apt.id} apt={apt} />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Separator />

      {/* ── Regional Disease Alerts ────────────────────────────────────────── */}
      <RegionalAlerts />

      <Separator />

      {/* ── Logout ────────────────────────────────────────────────────────── */}
      <div className="pt-2">
        <Button
          variant="outline"
          className="w-full gap-2 border-destructive/30 text-destructive hover:bg-destructive/10 hover:border-destructive/50 transition-smooth"
          onClick={handleLogout}
          data-ocid="profile-logout"
        >
          <LogOut className="w-4 h-4" />
          Log Out
        </Button>
        <p className="text-center text-[11px] text-muted-foreground mt-3">
          Your data is securely stored on the Internet Computer.
        </p>
      </div>
    </div>
  );
}
