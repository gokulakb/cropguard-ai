import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export type Timestamp = bigint;
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface FertilizerGuide {
    npkRatio: string;
    growthStage: string;
    applicationTiming: string;
    notes: string;
    organicOptions: Array<string>;
    cropType: string;
    soilPhRange: string;
}
export interface CropCalendarEntry {
    region: string;
    harvestMonths: Array<bigint>;
    growthDuration: bigint;
    sowingMonths: Array<bigint>;
    notes: string;
    cropType: string;
}
export interface ForumLeaderboardEntry {
    postCount: bigint;
    displayName: string;
    userId: UserId;
    score: bigint;
    totalLikes: bigint;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export interface AppNotification {
    notifType: string;
    notifId: string;
    isRead: boolean;
    message: string;
    timestamp: Timestamp;
}
export interface DiseaseSeverityEntry {
    count: bigint;
    diseaseName: string;
}
export interface ChatMessage {
    id: bigint;
    userId: UserId;
    role: ChatRole;
    message: string;
    timestamp: Timestamp;
}
export interface PredictionRecord {
    id: bigint;
    imageBlob: ExternalBlob;
    severityLevel: SeverityLevel;
    userId: UserId;
    confidenceScore: number;
    diseaseName: string;
    timestamp: Timestamp;
}
export interface SuccessStory {
    id: string;
    afterDescription: string;
    userId: UserId;
    createdAt: Timestamp;
    authorName: string;
    photoUrl?: string;
    diseaseName: string;
    cropType: string;
    beforeDescription: string;
    likesCount: bigint;
    treatmentUsed: string;
}
export interface AppointmentInput {
    name: string;
    preferredDatetime: string;
    diseaseName: string;
    severity: SeverityLevel;
    phone: string;
    location: string;
}
export interface TreatmentReminder {
    id: string;
    predictionId: string;
    userId: UserId;
    note: string;
    createdAt: Timestamp;
    completed: boolean;
    reminderDate: Timestamp;
    diseaseName: string;
}
export interface ForumReply {
    id: string;
    body: string;
    userId: UserId;
    createdAt: Timestamp;
    authorName: string;
    likesCount: bigint;
    postId: string;
}
export interface YieldEstimation {
    areaHectares: number;
    healthStatus: string;
    notes: string;
    cropType: string;
    estimatedYieldKg: number;
}
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface ForumPost {
    id: string;
    title: string;
    body: string;
    userId: UserId;
    createdAt: Timestamp;
    tags: Array<string>;
    authorName: string;
    updatedAt: Timestamp;
    cropType: string;
    likesCount: bigint;
}
export type UserId = Principal;
export interface ExpertContact {
    id: string;
    region: string;
    name: string;
    email: string;
    district: string;
    available: boolean;
    specialization: string;
    phone: string;
}
export interface PredictionInput {
    imageBlob: ExternalBlob;
    plantType: string;
}
export interface DiseaseRecord {
    id: bigint;
    plantType: string;
    severityLevel: SeverityLevel;
    cause: string;
    name: string;
    preventionSteps: Array<string>;
    medicationNames: Array<string>;
    treatmentSteps: Array<string>;
}
export interface Appointment {
    id: bigint;
    status: AppointmentStatus;
    userId: UserId;
    name: string;
    createdAt: Timestamp;
    preferredDatetime: string;
    diseaseName: string;
    severity: SeverityLevel;
    phone: string;
    location: string;
}
export interface UserProfile {
    regionAlerts: Array<[string, boolean]>;
    userId: UserId;
    name: string;
    createdAt: Timestamp;
}
export enum AppointmentStatus {
    cancelled = "cancelled",
    pending = "pending",
    confirmed = "confirmed"
}
export enum ChatRole {
    user = "user",
    assistant = "assistant"
}
export enum SeverityLevel {
    mild = "mild",
    severe = "severe",
    moderate = "moderate"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addExpertContact(name: string, region: string, district: string, phone: string, email: string, specialization: string, available: boolean): Promise<ExpertContact>;
    addReminder(predictionId: string, diseaseName: string, reminderDate: Timestamp, note: string): Promise<TreatmentReminder>;
    admin_setHuggingFaceKey(key: string): Promise<void>;
    admin_setOpenAiKey(key: string): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    bookAppointment(input: AppointmentInput): Promise<Appointment>;
    clearChatHistory(): Promise<void>;
    completeReminder(reminderId: string): Promise<boolean>;
    createForumPost(authorName: string, title: string, body: string, cropType: string, tags: Array<string>): Promise<ForumPost>;
    createSuccessStory(authorName: string, cropType: string, diseaseName: string, beforeDescription: string, afterDescription: string, treatmentUsed: string, photoUrl: string | null): Promise<SuccessStory>;
    estimateYield(cropType: string, areaHectares: number, healthStatus: string): Promise<YieldEstimation>;
    getAppointments(): Promise<Array<Appointment>>;
    getCallerAlertSettings(): Promise<Array<[string, boolean]>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getChatHistory(): Promise<Array<ChatMessage>>;
    getCropCalendar(cropType: string): Promise<CropCalendarEntry | null>;
    getDiseaseRecord(name: string): Promise<DiseaseRecord | null>;
    getDiseaseSeverityMap(): Promise<Array<DiseaseSeverityEntry>>;
    getExpertContacts(region: string): Promise<Array<ExpertContact>>;
    getFertilizerGuide(cropType: string, growthStage: string): Promise<FertilizerGuide | null>;
    getForumLeaderboard(): Promise<Array<ForumLeaderboardEntry>>;
    getForumPost(postId: string): Promise<ForumPost | null>;
    getForumPosts(offset: bigint, limit: bigint): Promise<Array<ForumPost>>;
    getNotifications(): Promise<Array<AppNotification>>;
    getPredictionHistory(): Promise<Array<PredictionRecord>>;
    getReminders(): Promise<Array<TreatmentReminder>>;
    getReplies(postId: string): Promise<Array<ForumReply>>;
    getSuccessStories(): Promise<Array<SuccessStory>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    likePost(postId: string): Promise<boolean>;
    likeSuccessStory(storyId: string): Promise<boolean>;
    listDiseaseRecords(): Promise<Array<DiseaseRecord>>;
    markNotificationRead(notifId: string): Promise<void>;
    predictDiseaseFromImage(imageBase64: string, plantType: string, imageBlob: ExternalBlob): Promise<PredictionRecord>;
    replyToPost(postId: string, authorName: string, body: string): Promise<ForumReply>;
    saveCallerAlertSettings(alerts: Array<[string, boolean]>): Promise<void>;
    saveCallerUserProfile(name: string): Promise<void>;
    saveChatMessage(message: string, role: ChatRole): Promise<ChatMessage>;
    savePrediction(input: PredictionInput, diseaseName: string, confidenceScore: number, severityLevel: SeverityLevel): Promise<PredictionRecord>;
    sendChatMessage(userMessage: string): Promise<string>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    updateAppointmentStatus(id: bigint, status: AppointmentStatus): Promise<boolean>;
}
