import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { Leaf, Loader2, Sparkles } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, login } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
          <p className="text-muted-foreground font-body">Initializing...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        {/* Hero background */}
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/assets/generated/hero-crop-field.dim_1200x600.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 to-background" />

        {/* Content */}
        <div className="relative flex-1 flex flex-col items-center justify-center px-6 py-12">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center shadow-elevated">
              <Leaf className="w-7 h-7 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-display text-foreground">
                CropGuard AI
              </h1>
              <p className="text-sm text-muted-foreground">
                Intelligent Crop Protection
              </p>
            </div>
          </div>

          {/* Card */}
          <div className="bg-card border border-border rounded-2xl p-8 shadow-elevated w-full max-w-sm text-center space-y-6">
            <div>
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-xl font-bold font-display text-foreground mb-2">
                Welcome Back
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Sign in with Internet Identity to access AI-powered crop disease
                detection and management tools.
              </p>
            </div>

            <Button
              className="w-full gap-2"
              size="lg"
              onClick={() => login()}
              data-ocid="login-button"
            >
              <Leaf className="w-4 h-4" />
              Sign in with Internet Identity
            </Button>

            <div className="space-y-2">
              <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide">
                What you get
              </p>
              {[
                "95%+ accuracy disease detection",
                "AI-powered treatment advice",
                "Emergency agricultural alerts",
                "Multilingual support",
              ].map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-2 text-xs text-muted-foreground"
                >
                  <span className="text-primary">✓</span>
                  {feature}
                </div>
              ))}
            </div>
          </div>

          <p className="mt-6 text-xs text-muted-foreground">
            © {new Date().getFullYear()} CropGuard AI. Secure and private.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
