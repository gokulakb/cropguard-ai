import { c as createLucideIcon, $ as useReminders, a0 as useCompleteReminder, r as reactExports, j as jsxRuntimeExports, m as motion, Q as Bell, B as Button, f as Skeleton, a1 as useAddReminder } from "./index-DQmXo4u-.js";
import { B as Badge } from "./badge-xsDIYR3X.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription, e as DialogFooter } from "./dialog-D7rsyBmK.js";
import { I as Input } from "./input-CXyKGE_g.js";
import { L as Label } from "./label-ClXPzMbA.js";
import { T as Textarea } from "./textarea-CuwFynA4.js";
import { u as ue } from "./index-DPXagENf.js";
import { P as Plus } from "./plus--m541XKc.js";
import { T as TriangleAlert } from "./triangle-alert-dwAM_9jv.js";
import { C as CircleCheck } from "./circle-check-C7dpl9YC.js";
import { C as Clock } from "./clock-BrAIK8X3.js";
import "./index-DPaJbrbs.js";
import "./index-BYJyCJKl.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M10.268 21a2 2 0 0 0 3.464 0", key: "vwvbt9" }],
  ["path", { d: "M22 8c0-2.3-.8-4.3-2-6", key: "5bb3ad" }],
  [
    "path",
    {
      d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",
      key: "11g9vi"
    }
  ],
  ["path", { d: "M4 2C2.8 3.7 2 5.7 2 8", key: "tap9e0" }]
];
const BellRing = createLucideIcon("bell-ring", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }],
  ["path", { d: "m9 16 2 2 4-4", key: "19s6y9" }]
];
const CalendarCheck = createLucideIcon("calendar-check", __iconNode);
function formatReminderDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}
function isOverdue(iso) {
  return new Date(iso).getTime() < Date.now();
}
function isSoon(iso) {
  const diff = new Date(iso).getTime() - Date.now();
  return diff > 0 && diff < 3 * 24 * 60 * 60 * 1e3;
}
function ReminderCard({
  reminder,
  index,
  onComplete,
  isCompleting
}) {
  const overdue = !reminder.completed && isOverdue(reminder.reminderDate);
  const soon = !reminder.completed && !overdue && isSoon(reminder.reminderDate);
  const borderCls = overdue ? "border-destructive/40 bg-destructive/5" : soon ? "border-accent/40 bg-accent/5" : "border-border";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 8 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: index * 0.05, duration: 0.3 },
      className: `card-data ${borderCls} flex gap-4 items-start`,
      "data-ocid": `reminder-card-${reminder.id}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${reminder.completed ? "bg-primary/10" : overdue ? "bg-destructive/10" : soon ? "bg-accent/10" : "bg-muted"}`,
            children: reminder.completed ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-5 h-5 text-primary" }) : overdue ? /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-5 h-5 text-destructive" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-5 h-5 text-muted-foreground" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold font-display text-foreground text-sm leading-tight", children: reminder.diseaseName }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1.5 shrink-0", children: [
              overdue && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-destructive/10 text-destructive border border-destructive/20 text-[10px]", children: "Overdue" }),
              soon && !overdue && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-accent/10 text-accent border border-accent/20 text-[10px]", children: "Due Soon" }),
              reminder.completed && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary/10 text-primary border border-primary/20 text-[10px]", children: "Completed" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `text-xs ${overdue ? "text-destructive font-medium" : "text-muted-foreground"}`,
                children: formatReminderDate(reminder.reminderDate)
              }
            )
          ] }),
          reminder.note && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-2 leading-relaxed bg-muted/50 rounded-md px-2.5 py-1.5", children: reminder.note }),
          !reminder.completed && onComplete && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              variant: "outline",
              onClick: onComplete,
              disabled: isCompleting,
              className: "h-7 text-xs gap-1.5",
              "data-ocid": `mark-complete-${reminder.id}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5" }),
                isCompleting ? "Marking…" : "Mark Complete"
              ]
            }
          ) })
        ] })
      ]
    }
  );
}
function AddReminderDialog({
  open,
  onClose
}) {
  const addReminder = useAddReminder();
  const [diseaseName, setDiseaseName] = reactExports.useState("");
  const [predictionId, setPredictionId] = reactExports.useState("");
  const [reminderDate, setReminderDate] = reactExports.useState("");
  const [note, setNote] = reactExports.useState("");
  function handleSubmit(e) {
    e.preventDefault();
    if (!diseaseName.trim() || !reminderDate) return;
    const dateMs = new Date(reminderDate).getTime();
    addReminder.mutate(
      {
        predictionId: predictionId.trim() || "",
        diseaseName: diseaseName.trim(),
        reminderDate: BigInt(dateMs) * 1000000n,
        note: note.trim()
      },
      {
        onSuccess: () => {
          ue.success("Reminder added successfully");
          setDiseaseName("");
          setPredictionId("");
          setReminderDate("");
          setNote("");
          onClose();
        },
        onError: () => ue.error("Failed to add reminder")
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (v) => !v && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-md", "data-ocid": "add-reminder-dialog", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "font-display flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(BellRing, { className: "w-5 h-5 text-primary" }),
        "Add Treatment Reminder"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Set a reminder to follow up on a crop treatment or re-apply medication." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4 py-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "disease-name", className: "text-sm", children: [
          "Disease Name ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "disease-name",
            placeholder: "e.g. Late Blight, Powdery Mildew",
            value: diseaseName,
            onChange: (e) => setDiseaseName(e.target.value),
            required: true,
            "data-ocid": "reminder-disease-input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Label,
          {
            htmlFor: "prediction-id",
            className: "text-sm text-muted-foreground",
            children: [
              "Prediction ID",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/70 font-normal", children: "(optional)" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "prediction-id",
            placeholder: "Paste scan ID to link to a prediction",
            value: predictionId,
            onChange: (e) => setPredictionId(e.target.value),
            "data-ocid": "reminder-prediction-input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "reminder-date", className: "text-sm", children: [
          "Reminder Date ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "reminder-date",
            type: "datetime-local",
            value: reminderDate,
            onChange: (e) => setReminderDate(e.target.value),
            required: true,
            "data-ocid": "reminder-date-input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Label,
          {
            htmlFor: "reminder-note",
            className: "text-sm text-muted-foreground",
            children: [
              "Note",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/70 font-normal", children: "(optional)" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            id: "reminder-note",
            placeholder: "e.g. Re-apply copper fungicide, check all lower leaves…",
            value: note,
            onChange: (e) => setNote(e.target.value),
            rows: 3,
            className: "resize-none text-sm",
            "data-ocid": "reminder-note-input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2 pt-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: onClose,
            "data-ocid": "reminder-cancel",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "submit",
            disabled: addReminder.isPending || !diseaseName.trim() || !reminderDate,
            "data-ocid": "reminder-submit",
            className: "gap-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-4 h-4" }),
              addReminder.isPending ? "Adding…" : "Add Reminder"
            ]
          }
        )
      ] })
    ] })
  ] }) });
}
function RemindersSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: ["a", "b", "c"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-data flex gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-9 h-9 rounded-xl shrink-0" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2 py-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-32" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-24" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-48" })
    ] })
  ] }, k)) });
}
function RemindersPage() {
  const { data: reminders, isLoading } = useReminders();
  const { mutate: completeReminder, variables: completingId } = useCompleteReminder();
  const [dialogOpen, setDialogOpen] = reactExports.useState(false);
  const upcoming = (reminders ?? []).filter((r) => !r.completed);
  const completed = (reminders ?? []).filter((r) => r.completed);
  function handleComplete(reminderId) {
    completeReminder(reminderId, {
      onSuccess: () => ue.success("Reminder marked as complete"),
      onError: () => ue.error("Failed to complete reminder")
    });
  }
  const isEmpty = !isLoading && (reminders ?? []).length === 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 md:p-6 space-y-6 max-w-3xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -8 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.35 },
        className: "flex items-start justify-between gap-4 flex-wrap",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl font-bold font-display text-foreground flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-6 h-6 text-primary" }),
              "Treatment Reminders"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Stay on top of crop treatment schedules and re-application dates." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: () => setDialogOpen(true),
              className: "gap-2 shrink-0",
              "data-ocid": "add-reminder-btn",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
                "Add Reminder"
              ]
            }
          )
        ]
      }
    ),
    !isLoading && (reminders ?? []).length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { delay: 0.1 },
        className: "flex flex-wrap gap-3",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 card-data py-2 px-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(BellRing, { className: "w-4 h-4 text-accent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-medium text-foreground", children: [
              upcoming.length,
              " upcoming"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 card-data py-2 px-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarCheck, { className: "w-4 h-4 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-medium text-foreground", children: [
              completed.length,
              " completed"
            ] })
          ] }),
          upcoming.filter((r) => isOverdue(r.reminderDate)).length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 card-data py-2 px-3 border-destructive/30 bg-destructive/5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4 text-destructive" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-medium text-destructive", children: [
              upcoming.filter((r) => isOverdue(r.reminderDate)).length,
              " ",
              "overdue"
            ] })
          ] })
        ]
      }
    ),
    isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(RemindersSkeleton, {}),
    isEmpty && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        className: "flex flex-col items-center text-center py-16 px-6 card-data",
        "data-ocid": "reminders-empty-state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-8 h-8 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold font-display text-foreground mb-2", children: "No reminders yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-xs mb-5", children: "Add treatment reminders to stay on schedule with fungicide applications, re-treatments, and follow-up checks." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: () => setDialogOpen(true),
              className: "gap-2",
              "data-ocid": "empty-add-reminder-cta",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
                "Add Your First Reminder"
              ]
            }
          )
        ]
      }
    ),
    !isLoading && upcoming.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "upcoming-reminders", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-semibold font-display text-foreground mb-3 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(BellRing, { className: "w-4 h-4 text-accent" }),
        "Upcoming",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-accent/10 text-accent border border-accent/20 text-[10px]", children: upcoming.length })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: upcoming.slice().sort(
        (a, b) => new Date(a.reminderDate).getTime() - new Date(b.reminderDate).getTime()
      ).map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        ReminderCard,
        {
          reminder: r,
          index: i,
          onComplete: () => handleComplete(r.id),
          isCompleting: completingId === r.id
        },
        r.id
      )) })
    ] }),
    !isLoading && completed.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "completed-reminders", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-semibold font-display text-foreground mb-3 flex items-center gap-2 text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarCheck, { className: "w-4 h-4" }),
        "Completed",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-muted text-muted-foreground border border-border text-[10px]", children: completed.length })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 opacity-70", children: completed.slice().sort(
        (a, b) => new Date(b.reminderDate).getTime() - new Date(a.reminderDate).getTime()
      ).map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ReminderCard, { reminder: r, index: i }, r.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AddReminderDialog,
      {
        open: dialogOpen,
        onClose: () => setDialogOpen(false)
      }
    )
  ] });
}
export {
  RemindersPage
};
