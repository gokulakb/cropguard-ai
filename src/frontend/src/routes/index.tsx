import { LoginPage } from "@/pages/LoginPage";
import { Layout } from "@/components/Layout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import {
  Outlet,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";

import { Skeleton } from "@/components/ui/skeleton";
// ─── Lazy page imports ─────────────────────────────────────────────────────────
import { Suspense, lazy } from "react";

const Dashboard = lazy(() =>
  import("@/pages/DashboardPage").then((m) => ({ default: m.DashboardPage })),
);
const Detect = lazy(() =>
  import("@/pages/DetectPage").then((m) => ({ default: m.DetectPage })),
);
const Results = lazy(() =>
  import("@/pages/Results").then((m) => ({ default: m.Results })),
);
const Chat = lazy(() =>
  import("@/pages/ChatPage").then((m) => ({ default: m.ChatPage })),
);
const Appointment = lazy(() =>
  import("@/pages/AppointmentPage").then((m) => ({
    default: m.AppointmentPage,
  })),
);
const Profile = lazy(() =>
  import("@/pages/Profile").then((m) => ({ default: m.Profile })),
);

// ─── New feature pages ────────────────────────────────────────────────────────
const HealthHistory = lazy(() =>
  import("@/pages/HealthHistoryPage").then((m) => ({
    default: m.HealthHistoryPage,
  })),
);
const DiseaseMap = lazy(() =>
  import("@/pages/DiseaseMapPage").then((m) => ({ default: m.DiseaseMapPage })),
);
const Reminders = lazy(() =>
  import("@/pages/RemindersPage").then((m) => ({ default: m.RemindersPage })),
);
const CropCalendar = lazy(() =>
  import("@/pages/CropCalendarPage").then((m) => ({
    default: m.CropCalendarPage,
  })),
);
const FertilizerGuide = lazy(() =>
  import("@/pages/FertilizerGuidePage").then((m) => ({
    default: m.FertilizerGuidePage,
  })),
);
const MarketPrices = lazy(() =>
  import("@/pages/MarketPricesPage").then((m) => ({
    default: m.MarketPricesPage,
  })),
);
const YieldEstimator = lazy(() =>
  import("@/pages/YieldEstimatorPage").then((m) => ({
    default: m.YieldEstimatorPage,
  })),
);
const PhotoTips = lazy(() =>
  import("@/pages/PhotoTipsPage").then((m) => ({ default: m.PhotoTipsPage })),
);
const ExpertDirectory = lazy(() =>
  import("@/pages/ExpertDirectoryPage").then((m) => ({
    default: m.ExpertDirectoryPage,
  })),
);
const Forum = lazy(() =>
  import("@/pages/ForumPage").then((m) => ({ default: m.ForumPage })),
);
const ForumPost = lazy(() =>
  import("@/pages/ForumPostPage").then((m) => ({ default: m.ForumPostPage })),
);
const SuccessStories = lazy(() =>
  import("@/pages/SuccessStoriesPage").then((m) => ({
    default: m.SuccessStoriesPage,
  })),
);

function PageLoader() {
  return (
    <div className="p-6 space-y-4">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <Skeleton className="h-40 rounded-xl" />
        <Skeleton className="h-40 rounded-xl" />
      </div>
    </div>
  );
}

function AppShell() {
  return (
    <ProtectedRoute>
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </Layout>
    </ProtectedRoute>
  );
}

// ─── Routes ───────────────────────────────────────────────────────────────────

const rootRoute = createRootRoute({ component: AppShell });

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: LoginPage,
});

const detectRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/detect",
  component: Detect,
});

const resultsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/results/$predictionId",
  component: Results,
});

const chatRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/chat",
  component: Chat,
});

const appointmentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/appointment",
  component: Appointment,
  validateSearch: (search: Record<string, unknown>) => ({
    predictionId:
      typeof search.predictionId === "string" ? search.predictionId : undefined,
    diseaseName:
      typeof search.diseaseName === "string" ? search.diseaseName : undefined,
    severity: typeof search.severity === "string" ? search.severity : undefined,
    cropType: typeof search.cropType === "string" ? search.cropType : undefined,
  }),
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: Profile,
});

// ─── New feature routes ───────────────────────────────────────────────────────

const historyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/history",
  component: HealthHistory,
});

const diseaseMapRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/disease-map",
  component: DiseaseMap,
});

const remindersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/reminders",
  component: Reminders,
});

const calendarRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/calendar",
  component: CropCalendar,
});

const fertilizerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/fertilizer",
  component: FertilizerGuide,
});

const marketPricesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/market-prices",
  component: MarketPrices,
});

const yieldEstimatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/yield-estimator",
  component: YieldEstimator,
});

const photoTipsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/photo-tips",
  component: PhotoTips,
});

const expertDirectoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/expert-directory",
  component: ExpertDirectory,
});

const forumRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/forum",
  component: Forum,
});

const forumPostRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/forum/$postId",
  component: ForumPost,
});

const successStoriesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/success-stories",
  component: SuccessStories,
});

const routeTree = rootRoute.addChildren([
  dashboardRoute,
  detectRoute,
  resultsRoute,
  chatRoute,
  appointmentRoute,
  profileRoute,
  historyRoute,
  diseaseMapRoute,
  remindersRoute,
  calendarRoute,
  fertilizerRoute,
  marketPricesRoute,
  yieldEstimatorRoute,
  photoTipsRoute,
  expertDirectoryRoute,
  forumRoute,
  forumPostRoute,
  successStoriesRoute,
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
