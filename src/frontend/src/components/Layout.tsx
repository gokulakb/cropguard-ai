import { GoogleTranslate } from "@/components/GoogleTranslate";
import { NotificationBell } from "@/components/NotificationBell";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/use-auth";
import { useUserProfile } from "@/hooks/use-backend";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "@tanstack/react-router";
import {
  Bell,
  BookOpen,
  Calendar,
  ChevronDown,
  ChevronRight,
  FlaskConical,
  LayoutDashboard,
  Leaf,
  LogOut,
  MapPin,
  MessageSquare,
  Scan,
  ShoppingCart,
  Star,
  TrendingUp,
  Trophy,
  User,
  UserCheck,
  Users,
} from "lucide-react";
import { useState } from "react";

// ─── Nav structure ─────────────────────────────────────────────────────────────

interface NavItem {
  to: string;
  label: string;
  icon: React.ElementType;
  ocid: string;
}

interface NavGroup {
  label: string;
  icon: React.ElementType;
  items: NavItem[];
}

const MOBILE_NAV: NavItem[] = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, ocid: "nav-dashboard" },
  { to: "/detect", label: "Scan", icon: Scan, ocid: "nav-detect" },
  { to: "/forum", label: "Forum", icon: Users, ocid: "nav-forum" },
  {
    to: "/success-stories",
    label: "Stories",
    icon: Trophy,
    ocid: "nav-stories",
  },
  { to: "/chat", label: "AgriBot", icon: MessageSquare, ocid: "nav-chat" },
];

const SIDEBAR_GROUPS: NavGroup[] = [
  {
    label: "Detection",
    icon: Scan,
    items: [
      { to: "/detect", label: "Scan Crop", icon: Scan, ocid: "nav-detect" },
      {
        to: "/history",
        label: "Health History",
        icon: BookOpen,
        ocid: "nav-history",
      },
      {
        to: "/disease-map",
        label: "Disease Map",
        icon: MapPin,
        ocid: "nav-disease-map",
      },
      {
        to: "/reminders",
        label: "Reminders",
        icon: Bell,
        ocid: "nav-reminders",
      },
    ],
  },
  {
    label: "Tools",
    icon: FlaskConical,
    items: [
      {
        to: "/calendar",
        label: "Crop Calendar",
        icon: Calendar,
        ocid: "nav-calendar",
      },
      {
        to: "/fertilizer",
        label: "Fertilizer Guide",
        icon: FlaskConical,
        ocid: "nav-fertilizer",
      },
      {
        to: "/market-prices",
        label: "Market Prices",
        icon: ShoppingCart,
        ocid: "nav-market",
      },
      {
        to: "/yield-estimator",
        label: "Yield Estimator",
        icon: TrendingUp,
        ocid: "nav-yield",
      },
      {
        to: "/photo-tips",
        label: "Photo Tips",
        icon: Star,
        ocid: "nav-photo-tips",
      },
    ],
  },
  {
    label: "Community",
    icon: Users,
    items: [
      { to: "/forum", label: "Farmer Forum", icon: Users, ocid: "nav-forum" },
      {
        to: "/success-stories",
        label: "Success Stories",
        icon: Trophy,
        ocid: "nav-stories",
      },
      {
        to: "/expert-directory",
        label: "Expert Directory",
        icon: UserCheck,
        ocid: "nav-experts",
      },
    ],
  },
  {
    label: "Support",
    icon: MessageSquare,
    items: [
      {
        to: "/chat",
        label: "AgriBot Chat",
        icon: MessageSquare,
        ocid: "nav-chat",
      },
      {
        to: "/appointment",
        label: "Appointments",
        icon: Calendar,
        ocid: "nav-appointment",
      },
    ],
  },
];

const HEADER_NAV: NavItem[] = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, ocid: "nav-dashboard" },
  { to: "/detect", label: "Detect", icon: Scan, ocid: "nav-detect-header" },
  {
    to: "/disease-map",
    label: "Analytics",
    icon: MapPin,
    ocid: "nav-map-header",
  },
  {
    to: "/market-prices",
    label: "Market",
    icon: ShoppingCart,
    ocid: "nav-market-header",
  },
  {
    to: "/forum",
    label: "Community",
    icon: Users,
    ocid: "nav-community-header",
  },
];

// ─── Nav components ────────────────────────────────────────────────────────────

function MobileNavItem({ to, label, icon: Icon, ocid }: NavItem) {
  const location = useLocation();
  const isActive =
    location.pathname === to ||
    (to !== "/" && location.pathname.startsWith(to));

  return (
    <Link
      to={to}
      className={cn(
        "flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-smooth min-w-0",
        isActive ? "text-primary" : "text-muted-foreground",
      )}
      data-ocid={ocid}
    >
      <Icon className={cn("w-5 h-5", isActive && "text-primary")} />
      <span className="text-[10px] font-medium truncate">{label}</span>
    </Link>
  );
}

function SidebarNavItem({ to, label, icon: Icon, ocid }: NavItem) {
  const location = useLocation();
  const isActive =
    location.pathname === to ||
    (to !== "/" && location.pathname.startsWith(to));

  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-smooth",
        isActive
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:bg-secondary hover:text-foreground",
      )}
      data-ocid={ocid}
    >
      <Icon className="w-4 h-4 shrink-0" />
      <span className="truncate">{label}</span>
    </Link>
  );
}

function SidebarGroup({ label, items }: NavGroup) {
  const location = useLocation();
  const hasActive = items.some(
    (item) =>
      location.pathname === item.to ||
      (item.to !== "/" && location.pathname.startsWith(item.to)),
  );
  const [open, setOpen] = useState(true);

  return (
    <div className="mb-1">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "w-full flex items-center justify-between px-3 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-colors",
          hasActive
            ? "text-primary"
            : "text-muted-foreground hover:text-foreground",
        )}
      >
        <span>{label}</span>
        {open ? (
          <ChevronDown className="w-3 h-3" />
        ) : (
          <ChevronRight className="w-3 h-3" />
        )}
      </button>
      {open && (
        <div className="mt-0.5 space-y-0.5">
          {items.map((item) => (
            <SidebarNavItem key={item.to} {...item} />
          ))}
        </div>
      )}
    </div>
  );
}

function HeaderNavItem({ to, label, icon: Icon, ocid }: NavItem) {
  const location = useLocation();
  const isActive =
    location.pathname === to ||
    (to !== "/" && location.pathname.startsWith(to));

  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-smooth",
        isActive
          ? "text-primary bg-primary/10"
          : "text-muted-foreground hover:text-foreground hover:bg-secondary",
      )}
      data-ocid={ocid}
    >
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </Link>
  );
}

// ─── Layout ───────────────────────────────────────────────────────────────────

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { principal, logout } = useAuth();
  const { data: profile } = useUserProfile();

  const displayName = profile?.displayName ?? principal?.slice(0, 8) ?? "User";
  const initials = displayName.slice(0, 2).toUpperCase();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* ── Top Header ── */}
      <header className="bg-card border-b border-border shadow-subtle sticky top-0 z-40">
        <div className="max-w-screen-xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
          {/* Brand */}
          <Link
            to="/"
            className="flex items-center gap-2.5 shrink-0"
            data-ocid="nav-brand"
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Leaf className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-base font-display text-foreground hidden sm:block">
              CropGuard AI
            </span>
          </Link>

          {/* Top-level header nav — xl+ only */}
          <nav className="hidden xl:flex items-center gap-0.5 flex-1 max-w-2xl mx-auto">
            {HEADER_NAV.map((item) => (
              <HeaderNavItem key={item.to} {...item} />
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <GoogleTranslate />

            <NotificationBell />

            <Link to="/profile" data-ocid="nav-avatar">
              <Avatar className="w-8 h-8 cursor-pointer">
                <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => logout()}
              className="text-muted-foreground hover:text-destructive"
              data-ocid="nav-logout"
              aria-label="Log out"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* ── Main layout ── */}
      <div className="flex flex-1 min-h-0 max-w-screen-xl mx-auto w-full">
        {/* Desktop sidebar */}
        <aside className="hidden lg:flex flex-col w-60 shrink-0 border-r border-border bg-card py-4 px-3 gap-1 overflow-y-auto">
          <SidebarNavItem
            to="/"
            label="Dashboard"
            icon={LayoutDashboard}
            ocid="nav-dashboard-sidebar"
          />
          <Separator className="my-2" />

          {SIDEBAR_GROUPS.map((group) => (
            <SidebarGroup key={group.label} {...group} />
          ))}

          <div className="flex-1" />
          <Separator className="my-2" />

          <Link
            to="/profile"
            className="px-3 py-2 flex items-center gap-3 rounded-lg hover:bg-secondary transition-smooth"
            data-ocid="nav-profile-sidebar"
          >
            <Avatar className="w-7 h-7">
              <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-foreground truncate">
                {displayName}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {profile?.farmName ?? "My Farm"}
              </p>
            </div>
            <User className="w-4 h-4 text-muted-foreground shrink-0" />
          </Link>
        </aside>

        {/* Page content */}
        <main className="flex-1 min-w-0 bg-background overflow-auto pb-20 lg:pb-0">
          {children}
        </main>
      </div>

      {/* ── Mobile bottom nav ── */}
      <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-40 flex items-center justify-around px-2 py-1 safe-area-pb"
        data-ocid="nav-mobile-bottom"
      >
        {MOBILE_NAV.map((item) => (
          <MobileNavItem key={item.to} {...item} />
        ))}
      </nav>

      {/* ── Footer (desktop only) ── */}
      <footer className="hidden lg:block bg-muted/40 border-t border-border py-3 px-4">
        <p className="text-xs text-muted-foreground text-center">
          © {new Date().getFullYear()}. Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}

export type { NavItem };
