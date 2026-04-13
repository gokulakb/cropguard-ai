import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { Leaf, Loader2, Scan, Sparkles } from "lucide-react";

const FEATURES = [
  { icon: Scan, label: "95%+ accuracy disease detection" },
  { icon: Sparkles, label: "AI-powered treatment recommendations" },
  { icon: Leaf, label: "Emergency agricultural officer alerts" },
];

export function LoginPage() {
  import { useNavigate } from "@tanstack/react-router";

const { isLoading } = useAuth();
const navigate = useNavigate();

const login = () => {
  navigate({ to: "/dashboard" });
};

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-12">
      {/* Background tint */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5 pointer-events-none" />

      <div className="relative w-full max-w-sm space-y-6">
        {/* Logo */}
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-elevated">
            <Leaf className="w-8 h-8 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-display text-foreground">
              CropGuard AI
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Intelligent Crop Disease Protection
            </p>
          </div>
        </div>

        {/* Card */}
        <div className="bg-card border border-border rounded-2xl p-8 shadow-elevated space-y-6 text-center">
          <div>
            <h2 className="text-xl font-bold font-display text-foreground mb-2">
              Welcome Back
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Sign in to access AI-powered crop disease detection, treatment
              advice, and agricultural support.
            </p>
          </div>

          <Button
            className="w-full gap-2"
            size="lg"
            onClick={() => login()}
            disabled={isLoading}
            data-ocid="login-button"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Leaf className="w-4 h-4" />
            )}
            Sign in with Internet Identity
          </Button>

          {/* Feature list */}
          <div className="space-y-2.5 pt-2 border-t border-border">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
              What you get
            </p>
            {FEATURES.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-3 text-xs text-muted-foreground"
              >
                <span className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                  <Icon className="w-3 h-3 text-primary" />
                </span>
                {label}
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          © {new Date().getFullYear()} CropGuard AI. Secure &amp; private.
        </p>
      </div>
    </div>
  );
}
