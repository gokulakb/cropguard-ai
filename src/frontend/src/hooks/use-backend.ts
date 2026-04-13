import { createActor } from "@/backend";
import type {
  Appointment as BackendAppointment,
  ChatMessage as BackendChatMessage,
  CropCalendarEntry as BackendCropCalendarEntry,
  DiseaseSeverityEntry as BackendDiseaseSeverityEntry,
  ExpertContact as BackendExpertContact,
  FertilizerGuide as BackendFertilizerGuide,
  ForumPost as BackendForumPost,
  ForumReply as BackendForumReply,
  SuccessStory as BackendSuccessStory,
  TreatmentReminder as BackendTreatmentReminder,
  UserProfile as BackendUserProfile,
  YieldEstimation as BackendYieldEstimation,
  PredictionRecord,
  SeverityLevel,
} from "@/backend";
import { AppointmentStatus, ChatRole } from "@/backend";
import type {
  AlertSetting,
  Appointment,
  ChatMessage,
  CropCalendarEntry,
  DiseaseSeverityEntry,
  ExpertContact,
  FertilizerGuide,
  ForumLeaderboardEntry,
  ForumPost,
  ForumReply,
  Notification,
  Prediction,
  SuccessStory,
  TreatmentReminder,
  UserProfile,
  YieldEstimation,
} from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// ─── Mappers ──────────────────────────────────────────────────────────────────

function mapSeverity(level: SeverityLevel): "mild" | "moderate" | "severe" {
  return level as "mild" | "moderate" | "severe";
}

function mapPredictionRecord(r: PredictionRecord): Prediction {
  return {
    id: r.id.toString(),
    imageUrl: r.imageBlob.getDirectURL(),
    plantType: "",
    disease: null,
    severity: mapSeverity(r.severityLevel),
    confidence: r.confidenceScore,
    analyzedAt: new Date(Number(r.timestamp / 1_000_000n)).toISOString(),
  };
}

function mapAppointment(a: BackendAppointment): Appointment {
  const statusMap: Record<AppointmentStatus, Appointment["status"]> = {
    [AppointmentStatus.pending]: "pending",
    [AppointmentStatus.confirmed]: "confirmed",
    [AppointmentStatus.cancelled]: "cancelled",
  };
  return {
    id: a.id.toString(),
    farmerName: a.name,
    farmerContact: a.phone,
    location: a.location,
    cropType: "",
    issue: a.diseaseName,
    preferredDate: a.preferredDatetime,
    status: statusMap[a.status] ?? "pending",
    createdAt: new Date(Number(a.createdAt / 1_000_000n)).toISOString(),
  };
}

function mapChatMessage(m: BackendChatMessage): ChatMessage {
  return {
    id: m.id.toString(),
    role: m.role === ChatRole.user ? "user" : "assistant",
    content: m.message,
    timestamp: new Date(Number(m.timestamp / 1_000_000n)).toISOString(),
  };
}

function mapUserProfile(p: BackendUserProfile): UserProfile {
  return {
    principal: p.userId.toText(),
    displayName: p.name,
    primaryCrops: [],
    preferredLanguage: "en",
    createdAt: new Date(Number(p.createdAt / 1_000_000n)).toISOString(),
  };
}

function mapReminder(r: BackendTreatmentReminder): TreatmentReminder {
  return {
    id: r.id,
    userId: r.userId.toText(),
    predictionId: r.predictionId,
    diseaseName: r.diseaseName,
    reminderDate: new Date(Number(r.reminderDate / 1_000_000n)).toISOString(),
    note: r.note,
    completed: r.completed,
    createdAt: new Date(Number(r.createdAt / 1_000_000n)).toISOString(),
  };
}

function mapForumPost(p: BackendForumPost): ForumPost {
  return {
    id: p.id,
    userId: p.userId.toText(),
    authorName: p.authorName,
    title: p.title,
    body: p.body,
    cropType: p.cropType,
    tags: p.tags,
    likesCount: Number(p.likesCount),
    createdAt: new Date(Number(p.createdAt / 1_000_000n)).toISOString(),
    updatedAt: new Date(Number(p.updatedAt / 1_000_000n)).toISOString(),
  };
}

function mapForumReply(r: BackendForumReply): ForumReply {
  return {
    id: r.id,
    postId: r.postId,
    userId: r.userId.toText(),
    authorName: r.authorName,
    body: r.body,
    likesCount: Number(r.likesCount),
    createdAt: new Date(Number(r.createdAt / 1_000_000n)).toISOString(),
  };
}

function mapSuccessStory(s: BackendSuccessStory): SuccessStory {
  return {
    id: s.id,
    userId: s.userId.toText(),
    authorName: s.authorName,
    cropType: s.cropType,
    diseaseName: s.diseaseName,
    beforeDescription: s.beforeDescription,
    afterDescription: s.afterDescription,
    treatmentUsed: s.treatmentUsed,
    likesCount: Number(s.likesCount),
    createdAt: new Date(Number(s.createdAt / 1_000_000n)).toISOString(),
    photoUrl: s.photoUrl ?? undefined,
  };
}

function mapDiseaseSeverityEntry(
  e: BackendDiseaseSeverityEntry,
): DiseaseSeverityEntry {
  return {
    diseaseName: e.diseaseName,
    count: Number(e.count),
  };
}

function mapCropCalendar(c: BackendCropCalendarEntry): CropCalendarEntry {
  return {
    cropType: c.cropType,
    region: c.region,
    sowingMonths: c.sowingMonths.map(Number),
    harvestMonths: c.harvestMonths.map(Number),
    growthDuration: Number(c.growthDuration),
    notes: c.notes,
  };
}

function mapYieldEstimation(y: BackendYieldEstimation): YieldEstimation {
  return {
    cropType: y.cropType,
    areaHectares: y.areaHectares,
    healthStatus: y.healthStatus,
    estimatedYieldKg: y.estimatedYieldKg,
    notes: y.notes,
  };
}

function mapExpertContact(e: BackendExpertContact): ExpertContact {
  return {
    id: e.id,
    name: e.name,
    region: e.region,
    district: e.district,
    phone: e.phone,
    email: e.email,
    specialization: e.specialization,
    available: e.available,
  };
}

function mapFertilizerGuide(f: BackendFertilizerGuide): FertilizerGuide {
  return {
    cropType: f.cropType,
    growthStage: f.growthStage,
    npkRatio: f.npkRatio,
    organicOptions: f.organicOptions,
    applicationTiming: f.applicationTiming,
    soilPhRange: f.soilPhRange,
    notes: f.notes,
  };
}

// ─── Prediction History ───────────────────────────────────────────────────────

export function usePredictionHistory() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Prediction[]>({
    queryKey: ["predictions"],
    queryFn: async () => {
      if (!actor) return [];
      const result = await actor.getPredictionHistory();
      return result.map(mapPredictionRecord);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSavePrediction() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (_prediction: Prediction) => {
      if (!actor) throw new Error("Actor not ready");
      return Promise.resolve(null);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["predictions"] }),
  });
}

export function usePredictDisease() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      imageBase64,
      plantType,
      imageBlob,
    }: {
      imageBase64: string;
      plantType: string;
      imageBlob: import("@/backend").ExternalBlob;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.predictDiseaseFromImage(
        imageBase64,
        plantType,
        imageBlob,
      );
      return mapPredictionRecord(result);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["predictions"] }),
  });
}

// ─── Disease Records ──────────────────────────────────────────────────────────

export function useDiseaseRecords() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["diseaseRecords"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listDiseaseRecords();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useDiseaseRecord(name: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["diseaseRecord", name],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getDiseaseRecord(name);
    },
    enabled: !!actor && !isFetching && !!name,
  });
}

// ─── Appointments ─────────────────────────────────────────────────────────────

export function useAppointments() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Appointment[]>({
    queryKey: ["appointments"],
    queryFn: async () => {
      if (!actor) return [];
      const result = await actor.getAppointments();
      return result.map(mapAppointment);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useBookAppointment() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: {
      name: string;
      phone: string;
      location: string;
      diseaseName: string;
      severity: SeverityLevel;
      preferredDatetime: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.bookAppointment(input);
      return mapAppointment(result);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["appointments"] }),
  });
}

// ─── Chat ─────────────────────────────────────────────────────────────────────

export function useChatHistory() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<ChatMessage[]>({
    queryKey: ["chatHistory"],
    queryFn: async () => {
      if (!actor) return [];
      const result = await actor.getChatHistory();
      return result.map(mapChatMessage);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSendChatMessage() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (message: string) => {
      const res = await fetch("https://cropguard-ai-1.onrender.com/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();

      // keep compatibility with existing UI
      return data.reply || data.response || data.message || "No response";
    },

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["chatHistory"] });
    },
  });
}

export function useSaveChatMessage() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      message,
      role,
    }: { message: string; role: ChatRole }) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.saveChatMessage(message, role);
      return mapChatMessage(result);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["chatHistory"] }),
  });
}

export function useClearChatHistory() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Actor not ready");
      return actor.clearChatHistory();
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["chatHistory"] }),
  });
}

// ─── User Profile ─────────────────────────────────────────────────────────────

export function useUserProfile() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<UserProfile | null>({
    queryKey: ["userProfile"],
    queryFn: async () => {
      if (!actor) return null;
      const result = await actor.getCallerUserProfile();
      return result ? mapUserProfile(result) : null;
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSaveUserProfile() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (name: string) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.saveCallerUserProfile(name);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["userProfile"] }),
  });
}

// ─── Treatment Reminders ──────────────────────────────────────────────────────

export function useReminders() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<TreatmentReminder[]>({
    queryKey: ["reminders"],
    queryFn: async () => {
      if (!actor) return [];
      const result = await actor.getReminders();
      return result.map(mapReminder);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddReminder() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: {
      predictionId: string;
      diseaseName: string;
      reminderDate: bigint;
      note: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.addReminder(
        input.predictionId,
        input.diseaseName,
        input.reminderDate,
        input.note,
      );
      return mapReminder(result);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["reminders"] }),
  });
}

export function useCompleteReminder() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (reminderId: string) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.completeReminder(reminderId);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["reminders"] }),
  });
}

// ─── Forum ────────────────────────────────────────────────────────────────────

export function useForumPosts(offset = 0, limit = 20) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<ForumPost[]>({
    queryKey: ["forumPosts", offset, limit],
    queryFn: async () => {
      if (!actor) return [];
      const result = await actor.getForumPosts(BigInt(offset), BigInt(limit));
      return result.map(mapForumPost);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useForumPost(postId: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<ForumPost | null>({
    queryKey: ["forumPost", postId],
    queryFn: async () => {
      if (!actor) return null;
      const result = await actor.getForumPost(postId);
      return result ? mapForumPost(result) : null;
    },
    enabled: !!actor && !isFetching && !!postId,
  });
}

export function useCreateForumPost() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: {
      authorName: string;
      title: string;
      body: string;
      cropType: string;
      tags: string[];
    }) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.createForumPost(
        input.authorName,
        input.title,
        input.body,
        input.cropType,
        input.tags,
      );
      return mapForumPost(result);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["forumPosts"] }),
  });
}

export function useLikePost() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (postId: string) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.likePost(postId);
    },
    onSuccess: (_data, postId) => {
      qc.invalidateQueries({ queryKey: ["forumPosts"] });
      qc.invalidateQueries({ queryKey: ["forumPost", postId] });
    },
  });
}

export function useReplies(postId: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<ForumReply[]>({
    queryKey: ["replies", postId],
    queryFn: async () => {
      if (!actor) return [];
      const result = await actor.getReplies(postId);
      return result.map(mapForumReply);
    },
    enabled: !!actor && !isFetching && !!postId,
  });
}

export function useReplyToPost() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: {
      postId: string;
      authorName: string;
      body: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.replyToPost(
        input.postId,
        input.authorName,
        input.body,
      );
      return mapForumReply(result);
    },
    onSuccess: (_data, input) =>
      qc.invalidateQueries({ queryKey: ["replies", input.postId] }),
  });
}

// ─── Success Stories ──────────────────────────────────────────────────────────

export function useSuccessStories() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<SuccessStory[]>({
    queryKey: ["successStories"],
    queryFn: async () => {
      if (!actor) return [];
      const result = await actor.getSuccessStories();
      return result.map(mapSuccessStory);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateSuccessStory() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: {
      authorName: string;
      cropType: string;
      diseaseName: string;
      beforeDescription: string;
      afterDescription: string;
      treatmentUsed: string;
      photoUrl?: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.createSuccessStory(
        input.authorName,
        input.cropType,
        input.diseaseName,
        input.beforeDescription,
        input.afterDescription,
        input.treatmentUsed,
        input.photoUrl ?? null,
      );
      return mapSuccessStory(result);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["successStories"] }),
  });
}

export function useLikeSuccessStory() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (storyId: string) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.likeSuccessStory(storyId);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["successStories"] }),
  });
}

// ─── Disease Severity Map ─────────────────────────────────────────────────────

export function useDiseaseSeverityMap() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<DiseaseSeverityEntry[]>({
    queryKey: ["diseaseSeverityMap"],
    queryFn: async () => {
      if (!actor) return [];
      const result = await actor.getDiseaseSeverityMap();
      return result.map(mapDiseaseSeverityEntry);
    },
    enabled: !!actor && !isFetching,
  });
}

// ─── Crop Calendar ────────────────────────────────────────────────────────────

export function useCropCalendar(cropType: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<CropCalendarEntry | null>({
    queryKey: ["cropCalendar", cropType],
    queryFn: async () => {
      if (!actor) return null;
      const result = await actor.getCropCalendar(cropType);
      return result ? mapCropCalendar(result) : null;
    },
    enabled: !!actor && !isFetching && !!cropType,
  });
}

// ─── Yield Estimator ──────────────────────────────────────────────────────────

export function useEstimateYield() {
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (input: {
      cropType: string;
      areaHectares: number;
      healthStatus: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.estimateYield(
        input.cropType,
        input.areaHectares,
        input.healthStatus,
      );
      return mapYieldEstimation(result);
    },
  });
}

// ─── Expert Contacts ──────────────────────────────────────────────────────────

export function useExpertContacts(region: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<ExpertContact[]>({
    queryKey: ["expertContacts", region],
    queryFn: async () => {
      if (!actor) return [];
      const result = await actor.getExpertContacts(region);
      return result.map(mapExpertContact);
    },
    enabled: !!actor && !isFetching,
  });
}

// ─── Fertilizer Guide ─────────────────────────────────────────────────────────

export function useFertilizerGuide(cropType: string, growthStage: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<FertilizerGuide | null>({
    queryKey: ["fertilizerGuide", cropType, growthStage],
    queryFn: async () => {
      if (!actor) return null;
      const result = await actor.getFertilizerGuide(cropType, growthStage);
      return result ? mapFertilizerGuide(result) : null;
    },
    enabled: !!actor && !isFetching && !!cropType && !!growthStage,
  });
}

// ─── Forum Leaderboard ────────────────────────────────────────────────────────

function mapLeaderboardEntry(
  e: import("@/backend").ForumLeaderboardEntry,
): ForumLeaderboardEntry {
  return {
    userId: e.userId.toText(),
    displayName: e.displayName,
    postCount: Number(e.postCount),
    totalLikes: Number(e.totalLikes),
    score: Number(e.score),
  };
}

export function useForumLeaderboard() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<ForumLeaderboardEntry[]>({
    queryKey: ["forumLeaderboard"],
    queryFn: async () => {
      if (!actor) return [];
      const result = await actor.getForumLeaderboard();
      return result.map(mapLeaderboardEntry);
    },
    enabled: !!actor && !isFetching,
  });
}

// ─── Notifications ────────────────────────────────────────────────────────────

function mapNotification(n: import("@/backend").AppNotification): Notification {
  return {
    notifId: n.notifId,
    notifType: n.notifType,
    message: n.message,
    timestamp: Number(n.timestamp / 1_000_000n),
    isRead: n.isRead,
  };
}

export function useNotifications() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Notification[]>({
    queryKey: ["notifications"],
    queryFn: async () => {
      if (!actor) return [];
      const result = await actor.getNotifications();
      return result.map(mapNotification);
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 30_000,
  });
}

export function useMarkNotificationRead() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (notifId: string) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.markNotificationRead(notifId);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["notifications"] }),
  });
}

// ─── Alert Settings ───────────────────────────────────────────────────────────

export function useAlertSettings() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<AlertSetting[]>({
    queryKey: ["alertSettings"],
    queryFn: async () => {
      if (!actor) return [];
      const result = await actor.getCallerAlertSettings();
      return result.map(([region, enabled]) => ({ region, enabled }));
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSaveAlertSettings() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (settings: AlertSetting[]) => {
      if (!actor) throw new Error("Actor not ready");
      const alerts: Array<[string, boolean]> = settings.map((s) => [
        s.region,
        s.enabled,
      ]);
      await actor.saveCallerAlertSettings(alerts);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["alertSettings"] }),
  });
}
