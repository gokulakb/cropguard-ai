import { h as useNavigate, j as jsxRuntimeExports, B as Button, w as Calendar } from "./index-DQmXo4u-.js";
import { T as TriangleAlert } from "./triangle-alert-dwAM_9jv.js";
import { P as Phone } from "./phone-CCbQMNPb.js";
import { E as ExternalLink } from "./external-link-DVb9Rp4s.js";
function getMedicationSearchUrl(medicationName) {
  const query = encodeURIComponent(
    `${medicationName} agricultural fungicide crop treatment`
  );
  return `https://www.google.com/search?q=${query}`;
}
function getAgriculturalOfficerUrl(location) {
  const query = encodeURIComponent(
    location ? `agricultural extension officer ${location} contact` : "agricultural extension officer contact"
  );
  return `https://www.google.com/search?q=${query}`;
}
function EmergencyAlert({
  diseaseName,
  plantType,
  location,
  predictionId,
  onDismiss
}) {
  const navigate = useNavigate();
  const handleBookAppointment = () => {
    navigate({
      to: "/appointment",
      search: {
        predictionId,
        diseaseName,
        severity: "severe",
        cropType: plantType
      }
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-destructive/10 border border-destructive/40 rounded-xl p-4 shadow-elevated",
      role: "alert",
      "data-ocid": "emergency-alert",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 bg-destructive/15 rounded-full flex items-center justify-center shrink-0 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-5 h-5 text-destructive" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 flex-wrap", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-label text-destructive", children: "Severe Alert" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-bold text-foreground font-display mt-0.5 text-base leading-tight", children: [
              "Emergency: ",
              diseaseName,
              " Detected"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: [
              "Severe ",
              plantType,
              " infection requires immediate attention. Contact an agricultural officer for expert guidance."
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-2 pl-[52px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "destructive",
              size: "sm",
              className: "gap-2 flex-1",
              onClick: handleBookAppointment,
              "data-ocid": "emergency-book-appointment",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-4 h-4" }),
                "Book Officer Consultation"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              className: "gap-2 border-destructive/30 text-destructive hover:bg-destructive/5 flex-1",
              onClick: () => window.open(getAgriculturalOfficerUrl(location), "_blank"),
              "data-ocid": "emergency-find-officer",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4" }),
                "Find Local Officer",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3 h-3" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 p-3 bg-destructive/5 rounded-lg border border-destructive/15", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-destructive mb-1.5", children: "Immediate steps:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "text-xs text-muted-foreground space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive mt-0.5", children: "•" }),
              "Isolate affected plants immediately to prevent spread"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive mt-0.5", children: "•" }),
              "Avoid watering overhead; apply fungicide as emergency measure"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive mt-0.5", children: "•" }),
              "Document all affected areas and contact agricultural officer"
            ] })
          ] })
        ] }),
        onDismiss && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: onDismiss,
            className: "mt-2 text-xs text-muted-foreground hover:text-foreground transition-colors w-full text-center",
            "data-ocid": "emergency-dismiss",
            children: "Dismiss alert"
          }
        )
      ]
    }
  );
}
export {
  EmergencyAlert as E,
  getMedicationSearchUrl as g
};
