import { EmergencyAlert } from "@/components/EmergencyAlert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSavePrediction } from "@/hooks/use-backend";
import type { Disease, DiseaseSeverity, Medication, Prediction } from "@/types";
import { getMedicationSearchUrl } from "@/utils/medication";
import { getSeverityLabel, getSeverityStyle } from "@/utils/severity";
import { useNavigate, useParams } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowLeft,
  BookmarkCheck,
  CheckCircle,
  ChevronRight,
  ExternalLink,
  FlaskConical,
  Leaf,
  Save,
  Share2,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// ─── Static disease records (used when backend record not found) ──────────────

const DISEASE_RECORDS: Record<string, Disease> = {
  "late-blight": {
    id: "late-blight",
    name: "Late Blight",
    scientificName: "Phytophthora infestans",
    plantType: "Tomato",
    severity: "severe",
    confidence: 0.94,
    cause:
      "Caused by the oomycete pathogen Phytophthora infestans. It spreads rapidly in cool, humid conditions with temperatures between 10–25 °C and thrives when leaf wetness persists for extended periods.",
    description:
      "Late blight is one of the most devastating diseases of tomato and potato crops worldwide. Dark, water-soaked lesions appear on leaves, stems, and fruit, quickly expanding into brown necrotic areas with white sporulation visible under humid conditions.",
    prevention: [
      "Use certified disease-free seeds and resistant varieties (e.g., Mountain Magic, Defiant)",
      "Ensure 60–90 cm spacing between plants for good air circulation",
      "Avoid overhead irrigation — use drip lines at soil level",
      "Apply preventive copper-based fungicide before rainy seasons",
      "Remove volunteer plants and crop debris after harvest",
      "Rotate crops — avoid planting solanaceous crops in the same plot for 2–3 years",
    ],
    treatment: [
      "Remove and destroy all visibly infected plant material immediately — do not compost",
      "Apply a systemic fungicide (Metalaxyl + Mancozeb) every 7 days under severe conditions",
      "Switch to copper oxychloride for organic fields; repeat after each rainfall",
      "Ensure adequate drainage to reduce soil moisture around roots",
      "Monitor all surrounding plants daily and isolate any new infections",
      "Report severe outbreaks to local agricultural extension officer for guidance",
    ],
    medications: [
      {
        id: "m1",
        name: "Mancozeb 75% WP",
        type: "fungicide",
        dosage: "2.5 g per litre of water",
        applicationMethod: "Foliar spray — cover upper and lower leaf surfaces",
        frequency: "Every 7–10 days, or after rain",
        notes:
          "Apply early morning or late evening. Pre-harvest interval: 7 days.",
      },
      {
        id: "m2",
        name: "Metalaxyl-M + Mancozeb",
        type: "fungicide",
        dosage: "2 g per litre of water",
        applicationMethod: "Foliar spray with high-volume sprayer",
        frequency: "Every 10–14 days, alternating with contact fungicides",
        notes:
          "Systemic protection. Rotate chemistry to prevent resistance build-up.",
      },
      {
        id: "m3",
        name: "Copper Oxychloride 50% WP",
        type: "organic",
        dosage: "3 g per litre of water",
        applicationMethod: "Foliar spray — thorough coverage required",
        frequency: "Every 10–14 days; repeat within 24 h of heavy rain",
        notes:
          "Approved for organic production. Avoid application in high heat.",
      },
    ],
    imageUrl: "/assets/generated/late-blight-tomato.jpg",
  },
  "powdery-mildew": {
    id: "powdery-mildew",
    name: "Powdery Mildew",
    scientificName: "Erysiphe cichoracearum",
    plantType: "Cucumber",
    severity: "moderate",
    confidence: 0.88,
    cause:
      "Caused by the fungus Erysiphe cichoracearum (and related species). Unlike most fungal diseases, it thrives in warm, dry conditions with high humidity at night, spreading through airborne conidia.",
    description:
      "Powdery mildew produces white powdery fungal growth on leaf surfaces. Affected leaves yellow and curl, reducing photosynthesis and fruit quality. Severe infections can defoliate plants.",
    prevention: [
      "Select resistant cucumber varieties where available",
      "Maintain adequate plant spacing to improve air movement",
      "Avoid excess nitrogen fertilisation, which promotes succulent tissue",
      "Apply preventive sulfur-based fungicides during susceptible growth stages",
      "Remove heavily infected foliage early in the season",
    ],
    treatment: [
      "Apply sulfur-based or potassium bicarbonate fungicides at first sign of infection",
      "Use horticultural oil sprays to disrupt fungal growth on leaves",
      "Remove heavily infected leaves and destroy to reduce inoculum",
      "Improve ventilation in greenhouse or tunnels",
      "Follow a 7–10 day spray programme until infection is controlled",
    ],
    medications: [
      {
        id: "m4",
        name: "Wettable Sulfur 80% WP",
        type: "organic",
        dosage: "3 g per litre of water",
        applicationMethod: "Foliar spray — ensure thorough leaf coverage",
        frequency: "Every 7–10 days when conditions favour disease",
        notes:
          "Do not apply when temperatures exceed 35 °C — risk of phytotoxicity.",
      },
      {
        id: "m5",
        name: "Myclobutanil 40% SC",
        type: "fungicide",
        dosage: "0.5 mL per litre of water",
        applicationMethod: "Foliar spray with knapsack or boom sprayer",
        frequency: "Every 14 days, maximum 4 applications per season",
        notes:
          "Systemic fungicide; effective on early and established infections.",
      },
    ],
    imageUrl: "/assets/generated/powdery-mildew-cucumber.jpg",
  },
  "rice-blast": {
    id: "rice-blast",
    name: "Rice Blast",
    scientificName: "Magnaporthe oryzae",
    plantType: "Rice",
    severity: "severe",
    confidence: 0.91,
    cause:
      "Caused by the ascomycete fungus Magnaporthe oryzae. Spreads via wind-dispersed conidia. High humidity (>90%), cool nights (15–26 °C), and nitrogen-rich soils accelerate infection.",
    description:
      "Rice blast is the most destructive fungal disease of rice worldwide. It causes diamond-shaped lesions with grey centres on leaves; neck blast kills the panicle, causing total grain loss in severe cases.",
    prevention: [
      "Plant blast-resistant varieties certified for your region",
      "Avoid excessive nitrogen application — split doses and use slow-release forms",
      "Maintain proper water management — avoid water stress during tillering",
      "Apply silica fertilisers to strengthen cell walls",
      "Monitor fields early morning for dew-covered lesions",
    ],
    treatment: [
      "Apply tricyclazole or isoprothiolane fungicide at first sign of leaf blast",
      "Treat panicle blast with carbendazim at boot stage if infection risk is high",
      "Drain fields temporarily to reduce humidity at canopy level",
      "Harvest promptly to limit further crop loss from neck blast",
    ],
    medications: [
      {
        id: "m6",
        name: "Tricyclazole 75% WP",
        type: "fungicide",
        dosage: "0.6 g per litre of water",
        applicationMethod: "Foliar spray — two applications recommended",
        frequency: "At tillering and again at panicle initiation",
        notes:
          "Most effective protectant for panicle blast. Pre-harvest: 30 days.",
      },
      {
        id: "m7",
        name: "Isoprothiolane 40% EC",
        type: "fungicide",
        dosage: "1.5 mL per litre of water",
        applicationMethod: "Foliar or granular soil application",
        frequency: "Every 14–21 days during high-risk periods",
        notes: "Also controls brown planthopper as secondary benefit.",
      },
    ],
    imageUrl: "/assets/generated/rice-blast-paddy.jpg",
  },
};

// ─── Prediction lookup (sample data for demo) ─────────────────────────────────

function getPredictionById(id: string): Prediction | null {
  const diseaseMap: Record<string, string> = {
    "demo-1": "late-blight",
    "demo-2": "powdery-mildew",
    "demo-3": "rice-blast",
  };
  const key = diseaseMap[id] ?? Object.keys(DISEASE_RECORDS)[0];
  const disease = DISEASE_RECORDS[key];
  if (!disease) return null;
  return {
    id,
    imageUrl: disease.imageUrl ?? "/assets/images/placeholder.svg",
    plantType: disease.plantType,
    disease,
    severity: disease.severity,
    confidence: disease.confidence,
    analyzedAt: new Date().toISOString(),
  };
}

// ─── Medication Card ──────────────────────────────────────────────────────────

function MedicationCard({ med }: { med: Medication }) {
  const typeColors: Record<Medication["type"], string> = {
    fungicide: "bg-primary/10 text-primary border-primary/20",
    pesticide: "bg-accent/10 text-accent border-accent/20",
    organic: "bg-primary/15 text-primary border-primary/30",
    fertilizer: "bg-secondary text-secondary-foreground border-border",
    other: "bg-muted text-muted-foreground border-border",
  };

  return (
    <div
      className="rounded-xl border border-border bg-card p-4 space-y-3 hover:shadow-subtle transition-smooth"
      data-ocid={`medication-card-${med.id}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-semibold text-foreground font-display text-sm leading-tight">
            {med.name}
          </p>
          <Badge
            variant="outline"
            className={`text-xs capitalize mt-1.5 ${typeColors[med.type]}`}
          >
            <FlaskConical className="w-3 h-3 mr-1" />
            {med.type}
          </Badge>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="shrink-0 gap-1.5 text-xs font-medium border-primary/30 text-primary hover:bg-primary/5"
          onClick={() =>
            window.open(getMedicationSearchUrl(med.name), "_blank")
          }
          data-ocid={`medication-search-${med.id}`}
          aria-label={`Search Google for ${med.name}`}
        >
          <ExternalLink className="w-3 h-3" />
          Search on Google
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
        <div className="bg-muted/60 rounded-lg p-2.5">
          <p className="text-muted-foreground mb-0.5">Dosage</p>
          <p className="font-medium text-foreground">{med.dosage}</p>
        </div>
        <div className="bg-muted/60 rounded-lg p-2.5">
          <p className="text-muted-foreground mb-0.5">Method</p>
          <p className="font-medium text-foreground">{med.applicationMethod}</p>
        </div>
        <div className="bg-muted/60 rounded-lg p-2.5">
          <p className="text-muted-foreground mb-0.5">Frequency</p>
          <p className="font-medium text-foreground">{med.frequency}</p>
        </div>
      </div>
      {med.notes && (
        <p className="text-xs text-muted-foreground italic border-t border-border pt-2">
          {med.notes}
        </p>
      )}
    </div>
  );
}

// ─── Severity Badge ───────────────────────────────────────────────────────────

function SeverityBadge({ severity }: { severity: DiseaseSeverity }) {
  const style = getSeverityStyle(severity);
  const label = getSeverityLabel(severity);
  const isSevere = severity === "severe";
  const isModerate = severity === "moderate";

  return (
    <Badge className={`${style.badge} gap-1.5 text-sm px-3 py-1 font-semibold`}>
      {isSevere && <AlertTriangle className="w-3.5 h-3.5" />}
      {isModerate && <span className="text-xs">▲</span>}
      {!isSevere && !isModerate && <span className="text-xs">●</span>}
      {label}
    </Badge>
  );
}

// ─── Confidence Indicator ─────────────────────────────────────────────────────

function ConfidenceRing({ value }: { value: number }) {
  const pct = Math.round(value * 100);
  const high = pct >= 85;
  const mid = pct >= 65;
  const colorClass = high
    ? "text-primary"
    : mid
      ? "text-accent"
      : "text-muted-foreground";

  return (
    <div className="text-center">
      <div
        className={`text-3xl font-bold font-display tabular-nums ${colorClass}`}
      >
        {pct}%
      </div>
      <p className="text-xs text-muted-foreground mt-0.5">AI Confidence</p>
    </div>
  );
}

// ─── Fallback Page (no disease record) ───────────────────────────────────────

function FallbackResult({
  predictionId,
  onBack,
}: {
  predictionId: string;
  onBack: () => void;
}) {
  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto space-y-4">
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        data-ocid="results-back"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Detection
      </button>
      <Card className="shadow-subtle">
        <CardContent className="py-12 text-center space-y-4">
          <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto">
            <Leaf className="w-8 h-8 text-muted-foreground" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-display text-foreground">
              Analysis Not Found
            </h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-sm mx-auto">
              No disease record was found for prediction #{predictionId}. The
              scan may still be processing or the data was not saved.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 justify-center pt-2">
            <Button
              onClick={onBack}
              className="gap-2"
              data-ocid="fallback-rescan"
            >
              <ArrowLeft className="w-4 h-4" />
              Scan Again
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Main Results Page ────────────────────────────────────────────────────────

export function Results() {
  const { predictionId } = useParams({ from: "/results/$predictionId" });
  const navigate = useNavigate();
  const savePrediction = useSavePrediction();
  const [saved, setSaved] = useState(false);
  const [emergencyDismissed, setEmergencyDismissed] = useState(false);

  const prediction = getPredictionById(predictionId);

  const handleBack = () => navigate({ to: "/detect" });

  if (!prediction || !prediction.disease) {
    return <FallbackResult predictionId={predictionId} onBack={handleBack} />;
  }

  const disease = prediction.disease;
  const severityStyle = getSeverityStyle(disease.severity);
  const isSevere = disease.severity === "severe";

  const handleSave = async () => {
    if (saved) return;
    try {
      await savePrediction.mutateAsync(prediction);
      setSaved(true);
      toast.success("Analysis saved to your history");
    } catch {
      toast.error("Failed to save — please try again");
    }
  };

  const handleWhatsAppShare = () => {
    const firstTreatment = disease.treatment[0] ?? "Follow agronomist advice";
    const appUrl = window.location.origin;
    const text = `CropGuard AI detected: ${disease.name} (${disease.severity} severity) on ${prediction.plantType}. Treatment: ${firstTreatment}. Scan your crops at ${appUrl}`;
    window.open(
      `https://wa.me/?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto space-y-5">
      {/* ── Top nav ── */}
      <div className="flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={handleBack}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          data-ocid="results-back"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Detection
        </button>
        <div className="flex items-center gap-2">
          {/* WhatsApp Share */}
          <Button
            variant="outline"
            size="sm"
            className="gap-2 text-xs border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366]/10 hover:border-[#25D366]"
            onClick={handleWhatsAppShare}
            data-ocid="results-whatsapp-share"
            aria-label="Share results via WhatsApp"
          >
            <Share2 className="w-3.5 h-3.5" />
            WhatsApp
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-2 text-xs"
            onClick={handleSave}
            disabled={saved || savePrediction.isPending}
            data-ocid="results-save"
          >
            {saved ? (
              <BookmarkCheck className="w-3.5 h-3.5 text-primary" />
            ) : (
              <Save className="w-3.5 h-3.5" />
            )}
            {saved ? "Saved" : "Save to History"}
          </Button>
        </div>
      </div>

      {/* ── Emergency Alert (severe only) ── */}
      {isSevere && !emergencyDismissed && (
        <EmergencyAlert
          diseaseName={disease.name}
          plantType={disease.plantType}
          predictionId={predictionId}
          onDismiss={() => setEmergencyDismissed(true)}
        />
      )}

      {/* ── Hero card: image + disease identity ── */}
      <Card className="shadow-elevated overflow-hidden">
        {prediction.imageUrl && (
          <div className="relative h-52 bg-muted overflow-hidden">
            <img
              src={prediction.imageUrl}
              alt={`${disease.plantType} showing ${disease.name}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "/assets/images/placeholder.svg";
              }}
            />
            {/* Severity ribbon */}
            <div
              className={`absolute top-3 left-3 flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold backdrop-blur-sm border ${severityStyle.badge}`}
            >
              {isSevere && <AlertTriangle className="w-3.5 h-3.5" />}
              {disease.severity === "moderate" && <span>▲</span>}
              {disease.severity === "mild" && <span>●</span>}
              {disease.severity === "healthy" && (
                <CheckCircle className="w-3.5 h-3.5" />
              )}
              {getSeverityLabel(disease.severity)}
            </div>
          </div>
        )}

        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-label text-muted-foreground mb-1">
                Potential Disease
              </p>
              <h1 className="text-2xl font-bold font-display text-foreground leading-tight">
                {disease.name}
              </h1>
              <p className="text-sm text-muted-foreground italic mt-0.5">
                {disease.scientificName}
              </p>
              <div className="flex items-center gap-2 mt-2.5">
                <Leaf className="w-4 h-4 text-primary shrink-0" />
                <span className="text-sm font-medium text-foreground">
                  {disease.plantType}
                </span>
                <SeverityBadge severity={disease.severity} />
              </div>
            </div>
            <ConfidenceRing value={disease.confidence} />
          </div>

          <p className="text-sm text-muted-foreground mt-3 leading-relaxed border-t border-border pt-3">
            {disease.description}
          </p>
        </CardContent>
      </Card>

      {/* ── Disease Analysis tabs ── */}
      <Card className="shadow-subtle">
        <CardHeader className="pb-2">
          <CardTitle className="font-display text-base">
            Disease Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="cause" className="w-full">
            <TabsList className="w-full grid grid-cols-3 mb-4">
              <TabsTrigger value="cause" data-ocid="tab-cause">
                Cause
              </TabsTrigger>
              <TabsTrigger value="prevention" data-ocid="tab-prevention">
                Prevention
              </TabsTrigger>
              <TabsTrigger value="treatment" data-ocid="tab-treatment">
                Treatment
              </TabsTrigger>
            </TabsList>

            {/* Cause tab */}
            <TabsContent value="cause" className="mt-0">
              <div
                className={`rounded-xl p-4 ${severityStyle.bg} border ${severityStyle.border}`}
              >
                <p className="text-sm text-foreground leading-relaxed">
                  {disease.cause}
                </p>
              </div>
            </TabsContent>

            {/* Prevention tab */}
            <TabsContent value="prevention" className="mt-0">
              <ul className="space-y-2.5" data-ocid="prevention-list">
                {disease.prevention.map((item) => (
                  <li
                    key={item.slice(0, 40)}
                    className="flex items-start gap-3 text-sm"
                  >
                    <span className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center shrink-0 text-primary text-xs font-bold mt-0.5">
                      <ShieldCheck className="w-3 h-3" />
                    </span>
                    <span className="text-muted-foreground leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </TabsContent>

            {/* Treatment tab */}
            <TabsContent value="treatment" className="mt-0">
              <ul className="space-y-2.5" data-ocid="treatment-list">
                {disease.treatment.map((step, i) => (
                  <li
                    key={step.slice(0, 40)}
                    className="flex items-start gap-3 text-sm"
                  >
                    <span className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center shrink-0 text-primary text-[10px] font-bold mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-muted-foreground leading-relaxed">
                      {step}
                    </span>
                  </li>
                ))}
              </ul>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* ── Medication Recommendations ── */}
      <Card className="shadow-subtle">
        <CardHeader className="pb-3">
          <CardTitle className="font-display text-base flex items-center gap-2">
            <FlaskConical className="w-4 h-4 text-primary" />
            Medication Recommendations
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            Links open Google search — no prices, ratings, or company promotion.
          </p>
        </CardHeader>
        <CardContent className="space-y-3" data-ocid="medication-list">
          {disease.medications.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No specific medications identified for this condition.
            </p>
          ) : (
            disease.medications.map((med, idx) => (
              <div key={med.id}>
                {idx > 0 && <Separator className="my-3" />}
                <MedicationCard med={med} />
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* ── Officer consultation CTA (always visible, prominent for severe) ── */}
      {!isSevere && (
        <Card
          className={`shadow-subtle border ${severityStyle.border} ${severityStyle.bg}`}
        >
          <CardContent className="p-4 flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground font-display">
                Need expert advice?
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Book a consultation with a local agricultural officer for
                personalised guidance.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="shrink-0 gap-1.5"
              onClick={() =>
                navigate({
                  to: "/appointment",
                  search: {
                    predictionId,
                    diseaseName: disease.name,
                    severity: disease.severity,
                    cropType: prediction.plantType,
                  },
                })
              }
              data-ocid="results-book-consultation"
            >
              Book
              <ChevronRight className="w-3.5 h-3.5" />
            </Button>
          </CardContent>
        </Card>
      )}

      {/* ── Bottom spacer ── */}
      <div className="h-2" />
    </div>
  );
}
