import { c as createLucideIcon, G as useSearch, H as useBookAppointment, r as reactExports, j as jsxRuntimeExports, w as Calendar, U as User, M as MapPin, L as Leaf, B as Button, d as Link } from "./index-DQmXo4u-.js";
import { B as Badge } from "./badge-xsDIYR3X.js";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-BujutBYA.js";
import { I as Input } from "./input-CXyKGE_g.js";
import { L as Label } from "./label-ClXPzMbA.js";
import { T as Textarea } from "./textarea-CuwFynA4.js";
import { P as Phone } from "./phone-CCbQMNPb.js";
import { C as Clock } from "./clock-BrAIK8X3.js";
import { C as CircleCheck } from "./circle-check-C7dpl9YC.js";
import { A as ArrowLeft } from "./arrow-left-CvxugNVW.js";
import { T as TriangleAlert } from "./triangle-alert-dwAM_9jv.js";
import { S as ShieldCheck } from "./shield-check-BFEWyuxZ.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "M10 9H8", key: "b1mrlr" }],
  ["path", { d: "M16 13H8", key: "t4e002" }],
  ["path", { d: "M16 17H8", key: "z1uh3a" }]
];
const FileText = createLucideIcon("file-text", __iconNode);
function severityLabel(sev) {
  const labels = {
    severe: "Severe",
    moderate: "Moderate",
    mild: "Mild",
    healthy: "Healthy"
  };
  return labels[sev] ?? sev;
}
function severityClass(sev) {
  if (sev === "severe")
    return "bg-destructive/10 text-destructive border-destructive/30";
  if (sev === "moderate") return "bg-accent/10 text-accent border-accent/30";
  return "bg-muted text-muted-foreground border-border";
}
function generateRef() {
  return `CG-${Date.now().toString(36).toUpperCase().slice(-6)}`;
}
function ContextBanner({
  diseaseName,
  severity
}) {
  const isSevere = severity === "severe";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `rounded-xl border p-4 flex gap-3 ${isSevere ? "bg-destructive/10 border-destructive/30" : "bg-accent/10 border-accent/30"}`,
      "data-ocid": "appt-context-banner",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `shrink-0 w-9 h-9 rounded-lg flex items-center justify-center ${isSevere ? "bg-destructive/20" : "bg-accent/20"}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              TriangleAlert,
              {
                className: `w-5 h-5 ${isSevere ? "text-destructive" : "text-accent"}`
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: `font-semibold font-display text-sm ${isSevere ? "text-destructive" : "text-accent"}`,
              children: isSevere ? "Immediate Professional Help Recommended" : "Expert Consultation Advised"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-foreground/80 mt-0.5", children: [
            diseaseName ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: diseaseName }),
              " has been detected on your crop.",
              " "
            ] }) : null,
            isSevere ? "Severe disease damage requires urgent attention. An agricultural officer can provide on-site diagnosis and treatment." : "Our agricultural experts can help assess the situation and recommend the best course of action."
          ] })
        ] })
      ]
    }
  );
}
function ReassuranceStrip() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 px-4 py-3 rounded-lg bg-primary/5 border border-primary/20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-5 h-5 text-primary shrink-0" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-foreground/80", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-primary", children: "Our agricultural officers are ready to help" }),
      " ",
      "protect your crops and guide you through treatment."
    ] })
  ] });
}
function SuccessCard({
  booking,
  bookingRef,
  onReset
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "p-4 md:p-6 max-w-lg mx-auto space-y-4",
      "data-ocid": "appt-success",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-3 pt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-9 h-9 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold font-display text-foreground", children: "Consultation Booked!" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "An agricultural officer will contact you shortly to confirm." })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-subtle border-primary/20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-display text-sm text-foreground", children: "Booking Details" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary/10 text-primary border-primary/20 font-mono text-xs", children: bookingRef })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-2.5", children: [
            [
              { icon: User, label: "Name", value: booking.farmerName },
              { icon: Phone, label: "Contact", value: booking.farmerContact },
              { icon: MapPin, label: "Location", value: booking.location },
              { icon: Leaf, label: "Crop", value: booking.cropType },
              { icon: FileText, label: "Issue", value: booking.issue },
              {
                icon: Calendar,
                label: "Date",
                value: `${booking.preferredDate}${booking.preferredTime ? ` at ${booking.preferredTime}` : ""}`
              }
            ].map(({ icon: Icon, label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4 text-muted-foreground mt-0.5 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground text-xs", children: [
                  label,
                  ": "
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: value })
              ] })
            ] }, label)),
            booking.notes && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4 text-muted-foreground mt-0.5 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "Notes: " }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: booking.notes })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "default",
              className: "w-full gap-2",
              "data-ocid": "appt-back-dashboard",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
                "Back to Dashboard"
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              onClick: onReset,
              className: "flex-1 gap-2",
              "data-ocid": "appt-book-another",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-4 h-4" }),
                "Book Another"
              ]
            }
          )
        ] })
      ]
    }
  );
}
function AppointmentPage() {
  const search = useSearch({ from: "/appointment" });
  const diseaseName = search.diseaseName ?? "";
  const severity = search.severity ?? "";
  const prefillCrop = search.cropType ?? "";
  const bookMutation = useBookAppointment();
  const [submitted, setSubmitted] = reactExports.useState(false);
  const [bookingRef, setBookingRef] = reactExports.useState("");
  const [submittedForm, setSubmittedForm] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState({
    farmerName: "",
    farmerContact: "",
    location: "",
    cropType: prefillCrop,
    issue: diseaseName ? `${diseaseName}${severity ? ` — ${severityLabel(severity)}` : ""}` : "",
    preferredDate: "",
    preferredTime: "",
    notes: ""
  });
  const [errors, setErrors] = reactExports.useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };
  const validate = () => {
    const next = {};
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
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    bookMutation.mutate(
      {
        name: form.farmerName,
        phone: form.farmerContact,
        location: form.location,
        diseaseName: form.issue || search.diseaseName || "Unknown",
        severity: search.severity || "moderate",
        preferredDatetime: `${form.preferredDate}${form.preferredTime ? `T${form.preferredTime}` : ""}`
      },
      {
        onSettled: () => {
          const ref = generateRef();
          setBookingRef(ref);
          setSubmittedForm(form);
          setSubmitted(true);
        }
      }
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
      notes: ""
    });
    setErrors({});
  };
  if (submitted && submittedForm) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      SuccessCard,
      {
        booking: submittedForm,
        bookingRef,
        onReset: handleReset
      }
    );
  }
  const isSevere = severity === "severe";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 md:p-6 max-w-2xl mx-auto space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `w-8 h-8 rounded-lg flex items-center justify-center ${isSevere ? "bg-destructive/10" : "bg-primary/10"}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Calendar,
              {
                className: `w-4 h-4 ${isSevere ? "text-destructive" : "text-primary"}`
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold font-display text-foreground", children: "Consult an Agricultural Officer" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground pl-[40px]", children: "Book a professional consultation for expert on-site crop assessment." })
    ] }),
    (diseaseName || severity) && /* @__PURE__ */ jsxRuntimeExports.jsx(ContextBanner, { diseaseName, severity }),
    severity && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-medium", children: "Detected severity:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Badge,
        {
          className: `capitalize text-xs ${severityClass(severity)}`,
          "data-ocid": "appt-severity-badge",
          children: severityLabel(severity)
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ReassuranceStrip, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-subtle", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "font-display text-base flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-4 h-4 text-primary" }),
        "Your Details"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "form",
        {
          onSubmit: handleSubmit,
          className: "space-y-4",
          noValidate: true,
          "data-ocid": "appointment-form",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Label,
                  {
                    htmlFor: "farmerName",
                    className: "flex items-center gap-1.5 text-xs font-medium",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-3.5 h-3.5 text-muted-foreground" }),
                      "Full Name ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "farmerName",
                    name: "farmerName",
                    value: form.farmerName,
                    onChange: handleChange,
                    placeholder: "James Mwangi",
                    "aria-invalid": !!errors.farmerName,
                    "data-ocid": "appt-name"
                  }
                ),
                errors.farmerName && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: errors.farmerName })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Label,
                  {
                    htmlFor: "farmerContact",
                    className: "flex items-center gap-1.5 text-xs font-medium",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3.5 h-3.5 text-muted-foreground" }),
                      "Phone Number ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "farmerContact",
                    name: "farmerContact",
                    type: "tel",
                    value: form.farmerContact,
                    onChange: handleChange,
                    placeholder: "+254 700 000 000",
                    "aria-invalid": !!errors.farmerContact,
                    "data-ocid": "appt-phone"
                  }
                ),
                errors.farmerContact && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: errors.farmerContact })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Label,
                {
                  htmlFor: "location",
                  className: "flex items-center gap-1.5 text-xs font-medium",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3.5 h-3.5 text-muted-foreground" }),
                    "Location / Farm Address",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "location",
                  name: "location",
                  value: form.location,
                  onChange: handleChange,
                  placeholder: "e.g. Nakuru, Kenya — North Plot",
                  "aria-invalid": !!errors.location,
                  "data-ocid": "appt-location"
                }
              ),
              errors.location && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: errors.location })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Label,
                  {
                    htmlFor: "cropType",
                    className: "flex items-center gap-1.5 text-xs font-medium",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { className: "w-3.5 h-3.5 text-muted-foreground" }),
                      "Crop Type ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "cropType",
                    name: "cropType",
                    value: form.cropType,
                    onChange: handleChange,
                    placeholder: "Tomato, Rice, Maize…",
                    "aria-invalid": !!errors.cropType,
                    "data-ocid": "appt-crop"
                  }
                ),
                errors.cropType && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: errors.cropType })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Label,
                  {
                    htmlFor: "issue",
                    className: "flex items-center gap-1.5 text-xs font-medium",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-3.5 h-3.5 text-muted-foreground" }),
                      "Disease Name ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "issue",
                    name: "issue",
                    value: form.issue,
                    onChange: handleChange,
                    placeholder: "e.g. Late Blight — Severe",
                    "aria-invalid": !!errors.issue,
                    "data-ocid": "appt-issue"
                  }
                ),
                errors.issue && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: errors.issue })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Label,
                  {
                    htmlFor: "preferredDate",
                    className: "flex items-center gap-1.5 text-xs font-medium",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3.5 h-3.5 text-muted-foreground" }),
                      "Preferred Date ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "preferredDate",
                    name: "preferredDate",
                    type: "date",
                    value: form.preferredDate,
                    onChange: handleChange,
                    min: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
                    "aria-invalid": !!errors.preferredDate,
                    "data-ocid": "appt-date"
                  }
                ),
                errors.preferredDate && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: errors.preferredDate })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Label,
                  {
                    htmlFor: "preferredTime",
                    className: "flex items-center gap-1.5 text-xs font-medium",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5 text-muted-foreground" }),
                      "Preferred Time ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "preferredTime",
                    name: "preferredTime",
                    type: "time",
                    value: form.preferredTime,
                    onChange: handleChange,
                    "aria-invalid": !!errors.preferredTime,
                    "data-ocid": "appt-time"
                  }
                ),
                errors.preferredTime && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: errors.preferredTime })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Label,
                {
                  htmlFor: "notes",
                  className: "flex items-center gap-1.5 text-xs font-medium text-muted-foreground",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-3.5 h-3.5" }),
                    "Additional Notes",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/60 font-normal", children: "(optional)" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  id: "notes",
                  name: "notes",
                  value: form.notes,
                  onChange: handleChange,
                  placeholder: "Describe symptoms, field size, recent weather conditions, or any other relevant details…",
                  className: "resize-none h-24",
                  "data-ocid": "appt-notes"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "submit",
                className: "w-full gap-2 h-11",
                disabled: bookMutation.isPending,
                "data-ocid": "appt-submit",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-4 h-4" }),
                  bookMutation.isPending ? "Booking Consultation…" : "Book Consultation"
                ]
              }
            )
          ]
        }
      ) })
    ] })
  ] });
}
export {
  AppointmentPage
};
