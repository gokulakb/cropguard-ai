const SEVERITY_STYLES = {
  healthy: {
    badge: "bg-primary/10 text-primary border-primary/20",
    text: "text-primary",
    bg: "bg-primary/5",
    border: "border-primary/30",
    icon: "✓",
    label: "Healthy"
  },
  mild: {
    badge: "bg-primary/10 text-primary border-primary/20",
    text: "text-primary",
    bg: "bg-primary/5",
    border: "border-primary/30",
    icon: "●",
    label: "Mild"
  },
  moderate: {
    badge: "bg-accent/10 text-accent border-accent/20",
    text: "text-accent",
    bg: "bg-accent/5",
    border: "border-accent/30",
    icon: "▲",
    label: "Moderate"
  },
  severe: {
    badge: "bg-destructive/10 text-destructive border-destructive/20",
    text: "text-destructive",
    bg: "bg-destructive/5",
    border: "border-destructive/30",
    icon: "!",
    label: "Severe"
  }
};
function getSeverityStyle(severity) {
  return SEVERITY_STYLES[severity] ?? SEVERITY_STYLES.mild;
}
function getSeverityLabel(severity) {
  var _a;
  return ((_a = SEVERITY_STYLES[severity]) == null ? void 0 : _a.label) ?? "Unknown";
}
export {
  getSeverityLabel as a,
  getSeverityStyle as g
};
