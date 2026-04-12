export type DiseaseSeverity = "mild" | "moderate" | "severe" | "healthy";

export interface Disease {
  id: string;
  name: string;
  scientificName: string;
  plantType: string;
  severity: DiseaseSeverity;
  confidence: number;
  cause: string;
  description: string;
  prevention: string[];
  treatment: string[];
  medications: Medication[];
  imageUrl?: string;
}

export interface Medication {
  id: string;
  name: string;
  type: "fungicide" | "pesticide" | "organic" | "fertilizer" | "other";
  dosage: string;
  applicationMethod: string;
  frequency: string;
  notes?: string;
}

export interface Prediction {
  id: string;
  imageUrl: string;
  plantType: string;
  disease: Disease | null;
  severity: DiseaseSeverity;
  confidence: number;
  analyzedAt: string;
  location?: string;
  notes?: string;
}

export interface Appointment {
  id: string;
  farmerName: string;
  farmerContact: string;
  location: string;
  cropType: string;
  issue: string;
  preferredDate: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  officerName?: string;
  officerContact?: string;
  notes?: string;
  createdAt: string;
  predictionId?: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  predictionContext?: Partial<Prediction>;
}

export interface UserProfile {
  principal: string;
  displayName: string;
  farmName?: string;
  location?: string;
  primaryCrops: string[];
  phone?: string;
  avatarUrl?: string;
  createdAt: string;
  preferredLanguage: string;
}

export interface WeatherData {
  location: string;
  lat: number;
  lon: number;
}

// ─── Community & Agronomic Types ──────────────────────────────────────────────

export interface TreatmentReminder {
  id: string;
  userId: string;
  predictionId: string;
  diseaseName: string;
  reminderDate: string;
  note: string;
  completed: boolean;
  createdAt: string;
}

export interface ForumPost {
  id: string;
  userId: string;
  authorName: string;
  title: string;
  body: string;
  cropType: string;
  tags: string[];
  likesCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ForumReply {
  id: string;
  postId: string;
  userId: string;
  authorName: string;
  body: string;
  likesCount: number;
  createdAt: string;
}

export interface SuccessStory {
  id: string;
  userId: string;
  authorName: string;
  cropType: string;
  diseaseName: string;
  beforeDescription: string;
  afterDescription: string;
  treatmentUsed: string;
  likesCount: number;
  createdAt: string;
  photoUrl?: string;
}

export interface AlertSetting {
  region: string;
  enabled: boolean;
}

export interface DiseaseSeverityEntry {
  diseaseName: string;
  count: number;
}

export interface CropCalendarEntry {
  cropType: string;
  region: string;
  sowingMonths: number[];
  harvestMonths: number[];
  growthDuration: number;
  notes: string;
}

export interface YieldEstimation {
  cropType: string;
  areaHectares: number;
  healthStatus: string;
  estimatedYieldKg: number;
  notes: string;
}

export interface ExpertContact {
  id: string;
  name: string;
  region: string;
  district: string;
  phone: string;
  email: string;
  specialization: string;
  available: boolean;
}

export interface FertilizerGuide {
  cropType: string;
  growthStage: string;
  npkRatio: string;
  organicOptions: string[];
  applicationTiming: string;
  soilPhRange: string;
  notes: string;
}

// ─── Forum Leaderboard ────────────────────────────────────────────────────────

export interface ForumLeaderboardEntry {
  userId: string;
  displayName: string;
  postCount: number;
  totalLikes: number;
  score: number;
}

// ─── Notifications ────────────────────────────────────────────────────────────

export interface Notification {
  notifId: string;
  notifType: string;
  message: string;
  timestamp: number;
  isRead: boolean;
}

// ─── Disease Trends Chart ─────────────────────────────────────────────────────

/** One data point for the disease trends line chart (one per month). */
export interface DiseaseTrendDataPoint {
  /** Month label, e.g. "Nov 2025" */
  month: string;
  /** ISO year-month key, e.g. "2025-11" (used for sorting) */
  monthKey: string;
  /** Disease name → occurrence count for that month */
  [diseaseName: string]: string | number;
}
