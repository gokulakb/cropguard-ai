import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAppointments, useBookAppointment } from "@/hooks/use-backend";
import type { Appointment } from "@/types";
import {
  Calendar,
  CheckCircle,
  FileText,
  MapPin,
  Phone,
  User,
  Wheat,
} from "lucide-react";
import { useState } from "react";

function AppointmentCard({ appt }: { appt: Appointment }) {
  const statusColor: Record<Appointment["status"], string> = {
    pending: "bg-accent/10 text-accent border-accent/20",
    confirmed: "bg-primary/10 text-primary border-primary/20",
    completed: "bg-muted text-muted-foreground border-border",
    cancelled: "bg-destructive/10 text-destructive border-destructive/20",
  };
  return (
    <Card className="shadow-subtle" data-ocid="appointment-card">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <p className="font-semibold font-display text-foreground text-sm">
              {appt.cropType} — {appt.issue}
            </p>
            <p className="text-xs text-muted-foreground">{appt.location}</p>
          </div>
          <Badge className={`${statusColor[appt.status]} capitalize shrink-0`}>
            {appt.status}
          </Badge>
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {appt.preferredDate}
          </span>
          {appt.officerName && (
            <span className="flex items-center gap-1">
              <User className="w-3 h-3" />
              {appt.officerName}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

const SAMPLE_APPOINTMENTS: Appointment[] = [
  {
    id: "apt-1",
    farmerName: "James Mwangi",
    farmerContact: "+254 722 000 001",
    location: "Nakuru, Kenya",
    cropType: "Tomato",
    issue: "Late Blight — Severe",
    preferredDate: "2026-04-15",
    status: "confirmed",
    officerName: "Dr. Agnes Wahu",
    createdAt: "2026-04-09T08:00:00Z",
  },
];

export function AppointmentPage() {
  const { data: appointments = SAMPLE_APPOINTMENTS } = useAppointments();
  const bookMutation = useBookAppointment();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    farmerName: "",
    farmerContact: "",
    location: "",
    cropType: "",
    issue: "",
    preferredDate: "",
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    bookMutation.mutate(
      {
        name: form.farmerName,
        phone: form.farmerContact,
        location: form.location,
        diseaseName: form.issue || form.cropType,
        severity: "moderate" as import("@/backend").SeverityLevel,
        preferredDatetime: form.preferredDate,
      },
      { onSettled: () => setSubmitted(true) },
    );
  };

  if (submitted) {
    return (
      <div
        className="p-6 max-w-lg mx-auto text-center"
        data-ocid="appointment-success"
      >
        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-xl font-bold font-display text-foreground mb-2">
          Appointment Requested
        </h2>
        <p className="text-muted-foreground text-sm mb-6">
          An agricultural officer will contact you shortly to confirm your
          appointment.
        </p>
        <Button onClick={() => setSubmitted(false)} data-ocid="appointment-new">
          Book Another
        </Button>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Calendar className="w-5 h-5 text-primary" />
          <h1 className="text-2xl font-bold font-display text-foreground">
            Book Consultation
          </h1>
        </div>
        <p className="text-sm text-muted-foreground">
          Schedule a visit from an agricultural officer for expert on-site
          advice.
        </p>
      </div>

      {/* Existing appointments */}
      {appointments.length > 0 && (
        <div className="space-y-3">
          <h2 className="font-semibold font-display text-foreground text-sm">
            Your Appointments
          </h2>
          {appointments.map((appt) => (
            <AppointmentCard key={appt.id} appt={appt} />
          ))}
        </div>
      )}

      {/* Booking form */}
      <Card className="shadow-subtle">
        <CardHeader className="pb-3">
          <CardTitle className="font-display text-base">
            New Appointment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
            data-ocid="appointment-form"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label
                  htmlFor="farmerName"
                  className="flex items-center gap-1.5 text-xs"
                >
                  <User className="w-3.5 h-3.5" /> Full Name
                </Label>
                <Input
                  id="farmerName"
                  name="farmerName"
                  value={form.farmerName}
                  onChange={handleChange}
                  placeholder="James Mwangi"
                  required
                  data-ocid="appt-name"
                />
              </div>
              <div className="space-y-1.5">
                <Label
                  htmlFor="farmerContact"
                  className="flex items-center gap-1.5 text-xs"
                >
                  <Phone className="w-3.5 h-3.5" /> Phone Number
                </Label>
                <Input
                  id="farmerContact"
                  name="farmerContact"
                  value={form.farmerContact}
                  onChange={handleChange}
                  placeholder="+254 700 000 000"
                  required
                  data-ocid="appt-phone"
                />
              </div>
              <div className="space-y-1.5">
                <Label
                  htmlFor="location"
                  className="flex items-center gap-1.5 text-xs"
                >
                  <MapPin className="w-3.5 h-3.5" /> Farm Location
                </Label>
                <Input
                  id="location"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="Nakuru, Kenya"
                  required
                  data-ocid="appt-location"
                />
              </div>
              <div className="space-y-1.5">
                <Label
                  htmlFor="cropType"
                  className="flex items-center gap-1.5 text-xs"
                >
                  <Wheat className="w-3.5 h-3.5" /> Crop Type
                </Label>
                <Input
                  id="cropType"
                  name="cropType"
                  value={form.cropType}
                  onChange={handleChange}
                  placeholder="Tomato, Rice, Maize..."
                  required
                  data-ocid="appt-crop"
                />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label
                  htmlFor="issue"
                  className="flex items-center gap-1.5 text-xs"
                >
                  <FileText className="w-3.5 h-3.5" /> Issue / Disease
                </Label>
                <Input
                  id="issue"
                  name="issue"
                  value={form.issue}
                  onChange={handleChange}
                  placeholder="Describe the issue or disease detected"
                  required
                  data-ocid="appt-issue"
                />
              </div>
              <div className="space-y-1.5">
                <Label
                  htmlFor="preferredDate"
                  className="flex items-center gap-1.5 text-xs"
                >
                  <Calendar className="w-3.5 h-3.5" /> Preferred Date
                </Label>
                <Input
                  id="preferredDate"
                  name="preferredDate"
                  type="date"
                  value={form.preferredDate}
                  onChange={handleChange}
                  required
                  data-ocid="appt-date"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">
                  Notes (optional)
                </Label>
                <Textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  placeholder="Any additional context..."
                  className="resize-none h-10"
                  data-ocid="appt-notes"
                />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full gap-2"
              disabled={bookMutation.isPending}
              data-ocid="appt-submit"
            >
              <Calendar className="w-4 h-4" />
              {bookMutation.isPending ? "Booking..." : "Request Appointment"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
