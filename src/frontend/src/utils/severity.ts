import type { DiseaseSeverity } from "@/types";

export interface SeverityStyle {
  badge: string;
  text: string;
  bg: string;
  border: string;
  icon: string;
  label: string;
}

const SEVERITY_STYLES: Record<DiseaseSeverity, SeverityStyle> = {
  healthy: {
    badge: "bg-primary/10 text-primary border-primary/20",
    text: "text-primary",
    bg: "bg-primary/5",
    border: "border-primary/30",
    icon: "✓",
    label: "Healthy",
  },
  mild: {
    badge: "bg-primary/10 text-primary border-primary/20",
    text: "text-primary",
    bg: "bg-primary/5",
    border: "border-primary/30",
    icon: "●",
    label: "Mild",
  },
  moderate: {
    badge: "bg-accent/10 text-accent border-accent/20",
    text: "text-accent",
    bg: "bg-accent/5",
    border: "border-accent/30",
    icon: "▲",
    label: "Moderate",
  },
  severe: {
    badge: "bg-destructive/10 text-destructive border-destructive/20",
    text: "text-destructive",
    bg: "bg-destructive/5",
    border: "border-destructive/30",
    icon: "!",
    label: "Severe",
  },
};

export function getSeverityStyle(severity: DiseaseSeverity): SeverityStyle {
  return SEVERITY_STYLES[severity] ?? SEVERITY_STYLES.mild;
}

export function getSeverityColor(severity: DiseaseSeverity): string {
  return SEVERITY_STYLES[severity]?.badge ?? SEVERITY_STYLES.mild.badge;
}

export function getSeverityLabel(severity: DiseaseSeverity): string {
  return SEVERITY_STYLES[severity]?.label ?? "Unknown";
}

export function confidenceToSeverity(confidence: number): DiseaseSeverity {
  if (confidence >= 0.9) return "severe";
  if (confidence >= 0.7) return "moderate";
  if (confidence >= 0.4) return "mild";
  return "healthy";
}
