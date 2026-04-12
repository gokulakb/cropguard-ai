import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useBookAppointment } from "@/hooks/use-backend";
import type { DiseaseSeverity } from "@/types";
import { Link, useSearch } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  Leaf,
  MapPin,
  Phone,
  ShieldCheck,
  User,
} from "lucide-react";
import { useState } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────

interface FormState {
  farmerName: string;
  farmerContact: string;
  location: string;
  cropType: string;
  issue: string;
  preferredDate: string;
  preferredTime: string;
  notes: string;
}

interface SearchParams {
  predictionId?: string;
  diseaseName?: string;
  severity?: string;
  cropType?: string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function severityLabel(sev: string): string {
  const labels: Record<string, string> = {
    severe: "Severe",
    moderate: "Moderate",
    mild: "Mild",
    healthy: "Healthy",
  };
  return labels[sev] ?? sev;
}

function severityClass(sev: string): string {
  if (sev === "severe")
    return "bg-destructive/10 text-destructive border-destructive/30";
  if (sev === "moderate") return "bg-accent/10 text-accent border-accent/30";
  return "bg-muted text-muted-foreground border-border";
}

function generateRef(): string {
  return `CG-${Date.now().toString(36).toUpperCase().slice(-6)}`;
}

// ── Sub-components ────────────────────────────────────────────────────────────

function ContextBanner({
  diseaseName,
  severity,
}: {
  diseaseName?: string;
  severity?: string;
}) {
  const isSevere = severity === "severe";
  return (
    <div
      className={`rounded-xl border p-4 flex gap-3 ${
        isSevere
          ? "bg-destructive/10 border-destructive/30"
          : "bg-accent/10 border-accent/30"
      }`}
      data-ocid="appt-context-banner"
    >
      <div
        className={`shrink-0 w-9 h-9 rounded-lg flex items-center justify-center ${
          isSevere ? "bg-destructive/20" : "bg-accent/20"
        }`}
      >
        <AlertTriangle
          className={`w-5 h-5 ${isSevere ? "text-destructive" : "text-accent"}`}
        />
      </div>
      <div className="min-w-0">
        <p
          className={`font-semibold font-display text-sm ${
            isSevere ? "text-destructive" : "text-accent"
          }`}
        >
          {isSevere
            ? "Immediate Professional Help Recommended"
            : "Expert Consultation Advised"}
        </p>
        <p className="text-sm text-foreground/80 mt-0.5">
          {diseaseName ? (
            <>
              <strong>{diseaseName}</strong> has been detected on your crop.{" "}
            </>
          ) : null}
          {isSevere
            ? "Severe disease damage requires urgent attention. An agricultural officer can provide on-site diagnosis and treatment."
            : "Our agricultural experts can help assess the situation and recommend the best course of action."}
        </p>
      </div>
    </div>
  );
}

function ReassuranceStrip() {
  return (
    <div className="flex items-center gap-2.5 px-4 py-3 rounded-lg bg-primary/5 border border-primary/20">
      <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
      <p className="text-sm text-foreground/80">
        <span className="font-semibold text-primary">
          Our agricultural officers are ready to help
        </span>{" "}
        protect your crops and guide you through treatment.
      </p>
    </div>
  );
}

function SuccessCard({
  booking,
  bookingRef,
  onReset,
}: {
  booking: FormState;
  bookingRef: string;
  onReset: () => void;
}) {
  return (
    <div
      className="p-4 md:p-6 max-w-lg mx-auto space-y-4"
      data-ocid="appt-success"
    >
      {/* Icon */}
      <div className="text-center space-y-3 pt-4">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-9 h-9 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-bold font-display text-foreground">
            Consultation Booked!
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            An agricultural officer will contact you shortly to confirm.
          </p>
        </div>
      </div>

      {/* Booking card */}
      <Card className="shadow-subtle border-primary/20">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="font-display text-sm text-foreground">
              Booking Details
            </CardTitle>
            <Badge className="bg-primary/10 text-primary border-primary/20 font-mono text-xs">
              {bookingRef}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-2.5">
          {[
            { icon: User, label: "Name", value: booking.farmerName },
            { icon: Phone, label: "Contact", value: booking.farmerContact },
            { icon: MapPin, label: "Location", value: booking.location },
            { icon: Leaf, label: "Crop", value: booking.cropType },
            { icon: FileText, label: "Issue", value: booking.issue },
            {
              icon: Calendar,
              label: "Date",
              value: `${booking.preferredDate}${booking.preferredTime ? ` at ${booking.preferredTime}` : ""}`,
            },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-start gap-2 text-sm">
              <Icon className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
              <div className="min-w-0">
                <span className="text-muted-foreground text-xs">{label}: </span>
                <span className="text-foreground font-medium">{value}</span>
              </div>
            </div>
          ))}
          {booking.notes && (
            <div className="flex items-start gap-2 text-sm">
              <FileText className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
              <div className="min-w-0">
                <span className="text-muted-foreground text-xs">Notes: </span>
                <span className="text-foreground">{booking.notes}</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Link to="/" className="flex-1">
          <Button
            variant="default"
            className="w-full gap-2"
            data-ocid="appt-back-dashboard"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
        </Link>
        <Button
          variant="outline"
          onClick={onReset}
          className="flex-1 gap-2"
          data-ocid="appt-book-another"
        >
          <Calendar className="w-4 h-4" />
          Book Another
        </Button>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export function AppointmentPage() {
  const search = useSearch({ from: "/appointment" }) as SearchParams;
  const diseaseName = search.diseaseName ?? "";
  const severity = (search.severity ?? "") as DiseaseSeverity | "";
  const prefillCrop = search.cropType ?? "";

  const bookMutation = useBookAppointment();
  const [submitted, setSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState("");
  const [submittedForm, setSubmittedForm] = useState<FormState | null>(null);

  const [form, setForm] = useState<FormState>({
    farmerName: "",
    farmerContact: "",
    location: "",
    cropType: prefillCrop,
    issue: diseaseName
      ? `${diseaseName}${severity ? ` — ${severityLabel(severity)}` : ""}`
      : "",
    preferredDate: "",
    preferredTime: "",
    notes: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.farmerName.trim()) next.farmerName = "Full name is required";
    if (!form.farmerContact.trim())
      next.farmerContact = "Phone number is required";
    if (!form.location.trim()) next.location = "Farm location is required";
    if (!form.cropType.trim()) next.cropType = "Crop type is required";
    if (!form.issue.trim())
      next.issue = "Disease or issue description is required";
    if (!form.preferredDate) next.preferredDate = "Preferred date is required";
    if (!form.preferredTime) next.preferredTime = "Preferred time is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    bookMutation.mutate(
      {
        name: form.farmerName,
        phone: form.farmerContact,
        location: form.location,
        diseaseName: form.issue || search.diseaseName || "Unknown",
        severity: ((search.severity as import("@/backend").SeverityLevel) ||
          "moderate") as import("@/backend").SeverityLevel,
        preferredDatetime: `${form.preferredDate}${form.preferredTime ? `T${form.preferredTime}` : ""}`,
      },
      {
        onSettled: () => {
          const ref = generateRef();
          setBookingRef(ref);
          setSubmittedForm(form);
          setSubmitted(true);
        },
      },
    );
  };

  const handleReset = () => {
    setSubmitted(false);
    setSubmittedForm(null);
    setBookingRef("");
    setForm({
      farmerName: "",
      farmerContact: "",
      location: "",
      cropType: "",
      issue: "",
      preferredDate: "",
      preferredTime: "",
      notes: "",
    });
    setErrors({});
  };

  if (submitted && submittedForm) {
    return (
      <SuccessCard
        booking={submittedForm}
        bookingRef={bookingRef}
        onReset={handleReset}
      />
    );
  }

  const isSevere = severity === "severe";

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto space-y-5">
      {/* Page header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              isSevere ? "bg-destructive/10" : "bg-primary/10"
            }`}
          >
            <Calendar
              className={`w-4 h-4 ${isSevere ? "text-destructive" : "text-primary"}`}
            />
          </div>
          <h1 className="text-2xl font-bold font-display text-foreground">
            Consult an Agricultural Officer
          </h1>
        </div>
        <p className="text-sm text-muted-foreground pl-[40px]">
          Book a professional consultation for expert on-site crop assessment.
        </p>
      </div>

      {/* Context banner — shown when coming from disease detection */}
      {(diseaseName || severity) && (
        <ContextBanner diseaseName={diseaseName} severity={severity} />
      )}

      {/* Severity badge — display only */}
      {severity && (
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground font-medium">
            Detected severity:
          </span>
          <Badge
            className={`capitalize text-xs ${severityClass(severity)}`}
            data-ocid="appt-severity-badge"
          >
            {severityLabel(severity)}
          </Badge>
        </div>
      )}

      {/* Reassurance */}
      <ReassuranceStrip />

      {/* Booking form */}
      <Card className="shadow-subtle">
        <CardHeader className="pb-3">
          <CardTitle className="font-display text-base flex items-center gap-2">
            <User className="w-4 h-4 text-primary" />
            Your Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
            noValidate
            data-ocid="appointment-form"
          >
            {/* Row 1 — Name + Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label
                  htmlFor="farmerName"
                  className="flex items-center gap-1.5 text-xs font-medium"
                >
                  <User className="w-3.5 h-3.5 text-muted-foreground" />
                  Full Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="farmerName"
                  name="farmerName"
                  value={form.farmerName}
                  onChange={handleChange}
                  placeholder="James Mwangi"
                  aria-invalid={!!errors.farmerName}
                  data-ocid="appt-name"
                />
                {errors.farmerName && (
                  <p className="text-xs text-destructive">
                    {errors.farmerName}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="farmerContact"
                  className="flex items-center gap-1.5 text-xs font-medium"
                >
                  <Phone className="w-3.5 h-3.5 text-muted-foreground" />
                  Phone Number <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="farmerContact"
                  name="farmerContact"
                  type="tel"
                  value={form.farmerContact}
                  onChange={handleChange}
                  placeholder="+254 700 000 000"
                  aria-invalid={!!errors.farmerContact}
                  data-ocid="appt-phone"
                />
                {errors.farmerContact && (
                  <p className="text-xs text-destructive">
                    {errors.farmerContact}
                  </p>
                )}
              </div>
            </div>

            {/* Row 2 — Location */}
            <div className="space-y-1.5">
              <Label
                htmlFor="location"
                className="flex items-center gap-1.5 text-xs font-medium"
              >
                <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                Location / Farm Address{" "}
                <span className="text-destructive">*</span>
              </Label>
              <Input
                id="location"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="e.g. Nakuru, Kenya — North Plot"
                aria-invalid={!!errors.location}
                data-ocid="appt-location"
              />
              {errors.location && (
                <p className="text-xs text-destructive">{errors.location}</p>
              )}
            </div>

            {/* Row 3 — Crop type + Disease */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label
                  htmlFor="cropType"
                  className="flex items-center gap-1.5 text-xs font-medium"
                >
                  <Leaf className="w-3.5 h-3.5 text-muted-foreground" />
                  Crop Type <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="cropType"
                  name="cropType"
                  value={form.cropType}
                  onChange={handleChange}
                  placeholder="Tomato, Rice, Maize…"
                  aria-invalid={!!errors.cropType}
                  data-ocid="appt-crop"
                />
                {errors.cropType && (
                  <p className="text-xs text-destructive">{errors.cropType}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="issue"
                  className="flex items-center gap-1.5 text-xs font-medium"
                >
                  <FileText className="w-3.5 h-3.5 text-muted-foreground" />
                  Disease Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="issue"
                  name="issue"
                  value={form.issue}
                  onChange={handleChange}
                  placeholder="e.g. Late Blight — Severe"
                  aria-invalid={!!errors.issue}
                  data-ocid="appt-issue"
                />
                {errors.issue && (
                  <p className="text-xs text-destructive">{errors.issue}</p>
                )}
              </div>
            </div>

            {/* Row 4 — Date + Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label
                  htmlFor="preferredDate"
                  className="flex items-center gap-1.5 text-xs font-medium"
                >
                  <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                  Preferred Date <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="preferredDate"
                  name="preferredDate"
                  type="date"
                  value={form.preferredDate}
                  onChange={handleChange}
                  min={new Date().toISOString().split("T")[0]}
                  aria-invalid={!!errors.preferredDate}
                  data-ocid="appt-date"
                />
                {errors.preferredDate && (
                  <p className="text-xs text-destructive">
                    {errors.preferredDate}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="preferredTime"
                  className="flex items-center gap-1.5 text-xs font-medium"
                >
                  <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                  Preferred Time <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="preferredTime"
                  name="preferredTime"
                  type="time"
                  value={form.preferredTime}
                  onChange={handleChange}
                  aria-invalid={!!errors.preferredTime}
                  data-ocid="appt-time"
                />
                {errors.preferredTime && (
                  <p className="text-xs text-destructive">
                    {errors.preferredTime}
                  </p>
                )}
              </div>
            </div>

            {/* Row 5 — Notes */}
            <div className="space-y-1.5">
              <Label
                htmlFor="notes"
                className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground"
              >
                <FileText className="w-3.5 h-3.5" />
                Additional Notes{" "}
                <span className="text-muted-foreground/60 font-normal">
                  (optional)
                </span>
              </Label>
              <Textarea
                id="notes"
                name="notes"
                value={form.notes}
                onChange={handleChange}
                placeholder="Describe symptoms, field size, recent weather conditions, or any other relevant details…"
                className="resize-none h-24"
                data-ocid="appt-notes"
              />
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full gap-2 h-11"
              disabled={bookMutation.isPending}
              data-ocid="appt-submit"
            >
              <Calendar className="w-4 h-4" />
              {bookMutation.isPending
                ? "Booking Consultation…"
                : "Book Consultation"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
