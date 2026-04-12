import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
  useAddReminder,
  useCompleteReminder,
  useReminders,
} from "@/hooks/use-backend";
import type { TreatmentReminder } from "@/types";
import {
  Bell,
  BellRing,
  CalendarCheck,
  CheckCircle2,
  Clock,
  Plus,
  TriangleAlert,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

// ─── Helpers ───────────────────────────────────────────────────────────────────

function formatReminderDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function isOverdue(iso: string) {
  return new Date(iso).getTime() < Date.now();
}

function isSoon(iso: string) {
  const diff = new Date(iso).getTime() - Date.now();
  return diff > 0 && diff < 3 * 24 * 60 * 60 * 1000; // within 3 days
}

// ─── Reminder Card ─────────────────────────────────────────────────────────────

function ReminderCard({
  reminder,
  index,
  onComplete,
  isCompleting,
}: {
  reminder: TreatmentReminder;
  index: number;
  onComplete?: () => void;
  isCompleting?: boolean;
}) {
  const overdue = !reminder.completed && isOverdue(reminder.reminderDate);
  const soon = !reminder.completed && !overdue && isSoon(reminder.reminderDate);

  const borderCls = overdue
    ? "border-destructive/40 bg-destructive/5"
    : soon
      ? "border-accent/40 bg-accent/5"
      : "border-border";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className={`card-data ${borderCls} flex gap-4 items-start`}
      data-ocid={`reminder-card-${reminder.id}`}
    >
      {/* Icon */}
      <div
        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
          reminder.completed
            ? "bg-primary/10"
            : overdue
              ? "bg-destructive/10"
              : soon
                ? "bg-accent/10"
                : "bg-muted"
        }`}
      >
        {reminder.completed ? (
          <CheckCircle2 className="w-5 h-5 text-primary" />
        ) : overdue ? (
          <TriangleAlert className="w-5 h-5 text-destructive" />
        ) : (
          <Bell className="w-5 h-5 text-muted-foreground" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 flex-wrap">
          <h3 className="font-semibold font-display text-foreground text-sm leading-tight">
            {reminder.diseaseName}
          </h3>
          <div className="flex gap-1.5 shrink-0">
            {overdue && (
              <Badge className="bg-destructive/10 text-destructive border border-destructive/20 text-[10px]">
                Overdue
              </Badge>
            )}
            {soon && !overdue && (
              <Badge className="bg-accent/10 text-accent border border-accent/20 text-[10px]">
                Due Soon
              </Badge>
            )}
            {reminder.completed && (
              <Badge className="bg-primary/10 text-primary border border-primary/20 text-[10px]">
                Completed
              </Badge>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1.5 mt-1">
          <Clock className="w-3 h-3 text-muted-foreground" />
          <span
            className={`text-xs ${overdue ? "text-destructive font-medium" : "text-muted-foreground"}`}
          >
            {formatReminderDate(reminder.reminderDate)}
          </span>
        </div>

        {reminder.note && (
          <p className="text-xs text-muted-foreground mt-2 leading-relaxed bg-muted/50 rounded-md px-2.5 py-1.5">
            {reminder.note}
          </p>
        )}

        {!reminder.completed && onComplete && (
          <div className="mt-3">
            <Button
              size="sm"
              variant="outline"
              onClick={onComplete}
              disabled={isCompleting}
              className="h-7 text-xs gap-1.5"
              data-ocid={`mark-complete-${reminder.id}`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              {isCompleting ? "Marking…" : "Mark Complete"}
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Add Reminder Dialog ────────────────────────────────────────────────────────

function AddReminderDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const addReminder = useAddReminder();
  const [diseaseName, setDiseaseName] = useState("");
  const [predictionId, setPredictionId] = useState("");
  const [reminderDate, setReminderDate] = useState("");
  const [note, setNote] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!diseaseName.trim() || !reminderDate) return;

    const dateMs = new Date(reminderDate).getTime();
    addReminder.mutate(
      {
        predictionId: predictionId.trim() || "",
        diseaseName: diseaseName.trim(),
        reminderDate: BigInt(dateMs) * 1_000_000n,
        note: note.trim(),
      },
      {
        onSuccess: () => {
          toast.success("Reminder added successfully");
          setDiseaseName("");
          setPredictionId("");
          setReminderDate("");
          setNote("");
          onClose();
        },
        onError: () => toast.error("Failed to add reminder"),
      },
    );
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-md" data-ocid="add-reminder-dialog">
        <DialogHeader>
          <DialogTitle className="font-display flex items-center gap-2">
            <BellRing className="w-5 h-5 text-primary" />
            Add Treatment Reminder
          </DialogTitle>
          <DialogDescription>
            Set a reminder to follow up on a crop treatment or re-apply
            medication.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label htmlFor="disease-name" className="text-sm">
              Disease Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="disease-name"
              placeholder="e.g. Late Blight, Powdery Mildew"
              value={diseaseName}
              onChange={(e) => setDiseaseName(e.target.value)}
              required
              data-ocid="reminder-disease-input"
            />
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="prediction-id"
              className="text-sm text-muted-foreground"
            >
              Prediction ID{" "}
              <span className="text-muted-foreground/70 font-normal">
                (optional)
              </span>
            </Label>
            <Input
              id="prediction-id"
              placeholder="Paste scan ID to link to a prediction"
              value={predictionId}
              onChange={(e) => setPredictionId(e.target.value)}
              data-ocid="reminder-prediction-input"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="reminder-date" className="text-sm">
              Reminder Date <span className="text-destructive">*</span>
            </Label>
            <Input
              id="reminder-date"
              type="datetime-local"
              value={reminderDate}
              onChange={(e) => setReminderDate(e.target.value)}
              required
              data-ocid="reminder-date-input"
            />
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="reminder-note"
              className="text-sm text-muted-foreground"
            >
              Note{" "}
              <span className="text-muted-foreground/70 font-normal">
                (optional)
              </span>
            </Label>
            <Textarea
              id="reminder-note"
              placeholder="e.g. Re-apply copper fungicide, check all lower leaves…"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              className="resize-none text-sm"
              data-ocid="reminder-note-input"
            />
          </div>

          <DialogFooter className="gap-2 pt-1">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              data-ocid="reminder-cancel"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={
                addReminder.isPending || !diseaseName.trim() || !reminderDate
              }
              data-ocid="reminder-submit"
              className="gap-2"
            >
              <Bell className="w-4 h-4" />
              {addReminder.isPending ? "Adding…" : "Add Reminder"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ─── Skeleton ──────────────────────────────────────────────────────────────────

function RemindersSkeleton() {
  return (
    <div className="space-y-3">
      {["a", "b", "c"].map((k) => (
        <div key={k} className="card-data flex gap-4">
          <Skeleton className="w-9 h-9 rounded-xl shrink-0" />
          <div className="flex-1 space-y-2 py-1">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-48" />
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export function RemindersPage() {
  const { data: reminders, isLoading } = useReminders();
  const { mutate: completeReminder, variables: completingId } =
    useCompleteReminder();
  const [dialogOpen, setDialogOpen] = useState(false);

  const upcoming = (reminders ?? []).filter((r) => !r.completed);
  const completed = (reminders ?? []).filter((r) => r.completed);

  function handleComplete(reminderId: string) {
    completeReminder(reminderId, {
      onSuccess: () => toast.success("Reminder marked as complete"),
      onError: () => toast.error("Failed to complete reminder"),
    });
  }

  const isEmpty = !isLoading && (reminders ?? []).length === 0;

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-3xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="flex items-start justify-between gap-4 flex-wrap"
      >
        <div>
          <h1 className="text-2xl font-bold font-display text-foreground flex items-center gap-2">
            <Bell className="w-6 h-6 text-primary" />
            Treatment Reminders
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Stay on top of crop treatment schedules and re-application dates.
          </p>
        </div>
        <Button
          onClick={() => setDialogOpen(true)}
          className="gap-2 shrink-0"
          data-ocid="add-reminder-btn"
        >
          <Plus className="w-4 h-4" />
          Add Reminder
        </Button>
      </motion.div>

      {/* Summary pills */}
      {!isLoading && (reminders ?? []).length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-3"
        >
          <div className="flex items-center gap-2 card-data py-2 px-3">
            <BellRing className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-foreground">
              {upcoming.length} upcoming
            </span>
          </div>
          <div className="flex items-center gap-2 card-data py-2 px-3">
            <CalendarCheck className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">
              {completed.length} completed
            </span>
          </div>
          {upcoming.filter((r) => isOverdue(r.reminderDate)).length > 0 && (
            <div className="flex items-center gap-2 card-data py-2 px-3 border-destructive/30 bg-destructive/5">
              <TriangleAlert className="w-4 h-4 text-destructive" />
              <span className="text-sm font-medium text-destructive">
                {upcoming.filter((r) => isOverdue(r.reminderDate)).length}{" "}
                overdue
              </span>
            </div>
          )}
        </motion.div>
      )}

      {/* Loading state */}
      {isLoading && <RemindersSkeleton />}

      {/* Empty state */}
      {isEmpty && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center text-center py-16 px-6 card-data"
          data-ocid="reminders-empty-state"
        >
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Bell className="w-8 h-8 text-primary" />
          </div>
          <h3 className="font-bold font-display text-foreground mb-2">
            No reminders yet
          </h3>
          <p className="text-sm text-muted-foreground max-w-xs mb-5">
            Add treatment reminders to stay on schedule with fungicide
            applications, re-treatments, and follow-up checks.
          </p>
          <Button
            onClick={() => setDialogOpen(true)}
            className="gap-2"
            data-ocid="empty-add-reminder-cta"
          >
            <Plus className="w-4 h-4" />
            Add Your First Reminder
          </Button>
        </motion.div>
      )}

      {/* Upcoming section */}
      {!isLoading && upcoming.length > 0 && (
        <section data-ocid="upcoming-reminders">
          <h2 className="font-semibold font-display text-foreground mb-3 flex items-center gap-2">
            <BellRing className="w-4 h-4 text-accent" />
            Upcoming
            <Badge className="bg-accent/10 text-accent border border-accent/20 text-[10px]">
              {upcoming.length}
            </Badge>
          </h2>
          <div className="space-y-3">
            {upcoming
              .slice()
              .sort(
                (a, b) =>
                  new Date(a.reminderDate).getTime() -
                  new Date(b.reminderDate).getTime(),
              )
              .map((r, i) => (
                <ReminderCard
                  key={r.id}
                  reminder={r}
                  index={i}
                  onComplete={() => handleComplete(r.id)}
                  isCompleting={completingId === r.id}
                />
              ))}
          </div>
        </section>
      )}

      {/* Completed section */}
      {!isLoading && completed.length > 0 && (
        <section data-ocid="completed-reminders">
          <h2 className="font-semibold font-display text-foreground mb-3 flex items-center gap-2 text-muted-foreground">
            <CalendarCheck className="w-4 h-4" />
            Completed
            <Badge className="bg-muted text-muted-foreground border border-border text-[10px]">
              {completed.length}
            </Badge>
          </h2>
          <div className="space-y-3 opacity-70">
            {completed
              .slice()
              .sort(
                (a, b) =>
                  new Date(b.reminderDate).getTime() -
                  new Date(a.reminderDate).getTime(),
              )
              .map((r, i) => (
                <ReminderCard key={r.id} reminder={r} index={i} />
              ))}
          </div>
        </section>
      )}

      {/* Dialog */}
      <AddReminderDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
    </div>
  );
}
