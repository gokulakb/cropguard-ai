import { Button } from "@/components/ui/button";
import { getAgriculturalOfficerUrl } from "@/utils/medication";
import { useNavigate } from "@tanstack/react-router";
import { AlertTriangle, Calendar, ExternalLink, Phone } from "lucide-react";

interface EmergencyAlertProps {
  diseaseName: string;
  plantType: string;
  location?: string;
  predictionId?: string;
  onDismiss?: () => void;
}

export function EmergencyAlert({
  diseaseName,
  plantType,
  location,
  predictionId,
  onDismiss,
}: EmergencyAlertProps) {
  const navigate = useNavigate();

  const handleBookAppointment = () => {
    navigate({
      to: "/appointment",
      search: {
        predictionId: predictionId,
        diseaseName: diseaseName,
        severity: "severe",
        cropType: plantType,
      },
    });
  };

  return (
    <div
      className="bg-destructive/10 border border-destructive/40 rounded-xl p-4 shadow-elevated"
      role="alert"
      data-ocid="emergency-alert"
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 bg-destructive/15 rounded-full flex items-center justify-center shrink-0 mt-0.5">
          <AlertTriangle className="w-5 h-5 text-destructive" />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-label text-destructive">Severe Alert</span>
          </div>
          <h3 className="font-bold text-foreground font-display mt-0.5 text-base leading-tight">
            Emergency: {diseaseName} Detected
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Severe {plantType} infection requires immediate attention. Contact
            an agricultural officer for expert guidance.
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-2 pl-[52px]">
        <Button
          variant="destructive"
          size="sm"
          className="gap-2 flex-1"
          onClick={handleBookAppointment}
          data-ocid="emergency-book-appointment"
        >
          <Calendar className="w-4 h-4" />
          Book Officer Consultation
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 border-destructive/30 text-destructive hover:bg-destructive/5 flex-1"
          onClick={() =>
            window.open(getAgriculturalOfficerUrl(location), "_blank")
          }
          data-ocid="emergency-find-officer"
        >
          <Phone className="w-4 h-4" />
          Find Local Officer
          <ExternalLink className="w-3 h-3" />
        </Button>
      </div>

      {/* Immediate steps */}
      <div className="mt-3 p-3 bg-destructive/5 rounded-lg border border-destructive/15">
        <p className="text-xs font-semibold text-destructive mb-1.5">
          Immediate steps:
        </p>
        <ul className="text-xs text-muted-foreground space-y-1">
          <li className="flex items-start gap-1.5">
            <span className="text-destructive mt-0.5">•</span>
            Isolate affected plants immediately to prevent spread
          </li>
          <li className="flex items-start gap-1.5">
            <span className="text-destructive mt-0.5">•</span>
            Avoid watering overhead; apply fungicide as emergency measure
          </li>
          <li className="flex items-start gap-1.5">
            <span className="text-destructive mt-0.5">•</span>
            Document all affected areas and contact agricultural officer
          </li>
        </ul>
      </div>

      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="mt-2 text-xs text-muted-foreground hover:text-foreground transition-colors w-full text-center"
          data-ocid="emergency-dismiss"
        >
          Dismiss alert
        </button>
      )}
    </div>
  );
}
