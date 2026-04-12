import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  Camera,
  Eye,
  Focus,
  Hand,
  Lightbulb,
  RefreshCw,
  Scan,
  Scissors,
  Sun,
} from "lucide-react";
import { motion } from "motion/react";

interface TipCard {
  icon: React.ReactNode;
  emoji: string;
  title: string;
  description: string;
}

const TIPS: TipCard[] = [
  {
    icon: <Sun className="w-8 h-8" />,
    emoji: "☀️",
    title: "Good Lighting",
    description:
      "Use natural daylight whenever possible. Step outdoors or near a window — shadows and artificial light can distort leaf colors and hide symptom details that matter for diagnosis.",
  },
  {
    icon: <Focus className="w-8 h-8" />,
    emoji: "🔍",
    title: "Close-Up Shot",
    description:
      "Fill at least 70% of the frame with the affected leaf or area. Move closer rather than zooming in digitally — digital zoom reduces image quality and makes it harder for AI to detect fine patterns.",
  },
  {
    icon: <RefreshCw className="w-8 h-8" />,
    emoji: "📐",
    title: "Multiple Angles",
    description:
      "Take 2–3 photos from different angles — top view, side view, and under the leaf. Many diseases show distinct symptoms on the underside of leaves that are easy to miss from above.",
  },
  {
    icon: <Camera className="w-8 h-8" />,
    emoji: "🧹",
    title: "Clean Lens",
    description:
      "Wipe your camera lens with a soft cloth before shooting. Smudges, dust, or moisture on the lens create blur and distortion that significantly reduces detection accuracy.",
  },
  {
    icon: <Hand className="w-8 h-8" />,
    emoji: "🤚",
    title: "Steady Hand",
    description:
      "Hold your device completely still or rest it on a stable surface. Motion blur is one of the top reasons for incorrect disease identification — take a deep breath before pressing the shutter.",
  },
  {
    icon: <Scissors className="w-8 h-8" />,
    emoji: "🍃",
    title: "Isolated Leaf",
    description:
      "Gently separate the diseased leaf from surrounding foliage and place it against a plain background (white paper or bare soil). A cluttered background confuses the AI model.",
  },
  {
    icon: <Eye className="w-8 h-8" />,
    emoji: "👁️",
    title: "Show Symptoms Clearly",
    description:
      "Include both healthy green tissue and the diseased spots in the same frame. This contrast helps the model accurately identify the boundary and severity of the infection.",
  },
  {
    icon: <Lightbulb className="w-8 h-8" />,
    emoji: "🚫⚡",
    title: "Avoid Flash",
    description:
      "Turn off your camera flash before shooting. Flash creates harsh reflections and glare that wash out the natural colors and texture of diseased tissue, hiding key diagnostic features.",
  },
];

export function PhotoTipsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-card border-b border-border py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4 border border-primary/20">
              <Camera className="w-4 h-4" />
              Photo Guide
            </div>
            <h1 className="text-display-md text-foreground mb-4">
              Get the Best Disease Detection Results
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A high-quality photo means a more accurate diagnosis. Follow these
              8 tips to capture clear, detailed images that our AI can analyze
              with confidence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tips Grid */}
      <section className="py-12 px-4 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TIPS.map((tip, i) => (
              <motion.div
                key={tip.title}
                className="card-data flex flex-col gap-3 hover:shadow-elevated"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
              >
                <div className="text-4xl">{tip.emoji}</div>
                <div className="flex items-center gap-2">
                  <div className="text-primary">{tip.icon}</div>
                  <h3 className="font-semibold text-foreground text-sm leading-snug">
                    {tip.title}
                  </h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                  {tip.description}
                </p>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-primary/60 inline-block" />
                  <span className="text-xs text-muted-foreground font-medium">
                    Tip {i + 1} of {TIPS.length}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-12 px-4 bg-background">
        <div className="max-w-2xl mx-auto">
          <motion.div
            className="card-data text-center py-10 px-8 border-primary/20"
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-5xl mb-4">📸</div>
            <h2 className="text-display-md text-foreground mb-3">
              Ready to scan?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
              You're now equipped to capture the perfect shot. Upload or
              photograph your crop for an instant AI-powered diagnosis.
            </p>
            <Link to="/detect">
              <Button
                size="lg"
                className="gap-2"
                data-ocid="photo-tips-scan-cta"
              >
                <Scan className="w-5 h-5" />
                Scan Your Crop
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
