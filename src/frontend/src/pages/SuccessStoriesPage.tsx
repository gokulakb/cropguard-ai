import { ExternalBlob } from "@/backend";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
  useCreateSuccessStory,
  useLikeSuccessStory,
  useSuccessStories,
} from "@/hooks/use-backend";
import type { SuccessStory } from "@/types";
import { formatDistanceToNow } from "date-fns";
import {
  ArrowRight,
  Heart,
  ImagePlus,
  PenLine,
  Plus,
  Sprout,
  Star,
  User,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";

// ─── Sample data ──────────────────────────────────────────────────────────────

const SAMPLE_STORIES: SuccessStory[] = [
  {
    id: "s1",
    userId: "u1",
    authorName: "Mary Johnson",
    cropType: "Corn",
    diseaseName: "Northern Corn Leaf Blight",
    beforeDescription:
      "Large tan-colored lesions started appearing on the lower leaves, spreading rapidly upward. I thought I was going to lose the entire plot before harvest.",
    afterDescription:
      "After CropGuard AI identified it as Northern Corn Leaf Blight with 91% confidence, I applied mancozeb fungicide and removed the worst-affected leaves. Within 3 weeks the spread stopped and I saved 80% of the yield.",
    treatmentUsed:
      "Mancozeb 75 WP foliar spray (2g/L) every 7 days for 3 applications + infected leaf removal",
    likesCount: 18,
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
  },
  {
    id: "s2",
    userId: "u2",
    authorName: "Chukwudi Nnamdi",
    cropType: "Tomato",
    diseaseName: "Tomato Early Blight",
    beforeDescription:
      "Dark brown spots with target-ring patterns on older leaves, yellowing spreading fast. I was losing 5 plants a day before I scanned with CropGuard.",
    afterDescription:
      "The AI detected early blight immediately. I switched to drip irrigation, applied chlorothalonil and removed all infected tissue. The remaining 200 plants fully recovered.",
    treatmentUsed:
      "Chlorothalonil 500 SC spray + drip irrigation switch + crop rotation next season",
    likesCount: 11,
    createdAt: new Date(Date.now() - 7 * 86400000).toISOString(),
  },
  {
    id: "s3",
    userId: "u3",
    authorName: "Priya Sharma",
    cropType: "Rice",
    diseaseName: "Rice Blast",
    beforeDescription:
      "Diamond-shaped lesions with grey centers were spreading across my paddy field. I was told by a neighbor it was just water stress, but it kept getting worse.",
    afterDescription:
      "CropGuard AI correctly identified rice blast and recommended tricyclazole. Applied it at the tillering stage and the disease was fully controlled. Yield was near-normal.",
    treatmentUsed:
      "Tricyclazole 75 WP (0.6g/L), applied twice 10 days apart at tillering stage",
    likesCount: 24,
    createdAt: new Date(Date.now() - 14 * 86400000).toISOString(),
  },
];

const CROP_TYPES = [
  "Tomato",
  "Rice",
  "Maize",
  "Corn",
  "Cassava",
  "Wheat",
  "Soybean",
  "Yam",
  "Pepper",
  "Other",
];

// ─── Story Card ───────────────────────────────────────────────────────────────

function StoryCard({
  story,
  index,
}: {
  story: SuccessStory;
  index: number;
}) {
  const likeStory = useLikeSuccessStory();
  const [optimisticLikes, setOptimisticLikes] = useState(story.likesCount);
  const [liked, setLiked] = useState(false);
  const [heartAnim, setHeartAnim] = useState(false);

  const handleLike = () => {
    if (!liked) {
      setLiked(true);
      setOptimisticLikes((n) => n + 1);
      setHeartAnim(true);
      setTimeout(() => setHeartAnim(false), 600);
      likeStory.mutate(story.id);
    }
  };

  return (
    <motion.div
      className="card-social hover:shadow-elevated"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      data-ocid="success-story-card"
    >
      {/* Photo (if present) */}
      {story.photoUrl && (
        <div className="rounded-t-xl overflow-hidden -mx-[1px] -mt-[1px] mb-3">
          <img
            src={story.photoUrl}
            alt={`${story.diseaseName} recovery — ${story.authorName}`}
            className="w-full object-cover"
            style={{ maxHeight: 200 }}
          />
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 rounded-full bg-social/10 flex items-center justify-center flex-shrink-0">
            <User className="w-4 h-4 text-social" />
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-sm text-foreground truncate">
              {story.authorName}
            </p>
            <p className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(story.createdAt), {
                addSuffix: true,
              })}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <span className="badge-social">{story.cropType}</span>
        </div>
      </div>

      {/* Disease name */}
      <div className="flex items-center gap-2 mb-3">
        <Star className="w-4 h-4 text-accent flex-shrink-0" />
        <span className="font-semibold text-foreground text-sm">
          Recovered from: {story.diseaseName}
        </span>
      </div>

      {/* Before / After */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
        <div className="rounded-md bg-destructive/5 border border-destructive/15 p-3">
          <p className="text-xs font-semibold text-destructive mb-1 uppercase tracking-wide">
            Before
          </p>
          <p className="text-sm text-foreground/80 leading-relaxed line-clamp-3">
            {story.beforeDescription}
          </p>
        </div>
        <div className="rounded-md bg-success/5 border border-success/15 p-3">
          <p className="text-xs font-semibold text-success mb-1 uppercase tracking-wide">
            After
          </p>
          <p className="text-sm text-foreground/80 leading-relaxed line-clamp-3">
            {story.afterDescription}
          </p>
        </div>
      </div>

      {/* Treatment */}
      <div className="flex items-start gap-2 mb-3 p-2.5 rounded-md bg-muted/60">
        <Sprout className="w-3.5 h-3.5 text-success flex-shrink-0 mt-0.5" />
        <p className="text-xs text-foreground/75 leading-relaxed">
          <span className="font-semibold text-foreground/90">Treatment: </span>
          {story.treatmentUsed}
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-border">
        <button
          type="button"
          onClick={handleLike}
          className={`flex items-center gap-1.5 text-sm transition-smooth select-none ${
            liked
              ? "text-destructive font-semibold"
              : "text-muted-foreground hover:text-destructive"
          }`}
          data-ocid="story-like-btn"
        >
          <motion.span
            animate={heartAnim ? { scale: [1, 1.5, 1] } : { scale: 1 }}
            transition={{ duration: 0.4 }}
            className="flex items-center"
          >
            <Heart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
          </motion.span>
          {optimisticLikes}
        </button>
        <span className="text-xs text-muted-foreground">
          Helped by CropGuard AI
        </span>
      </div>
    </motion.div>
  );
}

// ─── Share Story Dialog ───────────────────────────────────────────────────────

function ShareStoryDialog() {
  const createStory = useCreateSuccessStory();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    authorName: "",
    cropType: "",
    diseaseName: "",
    before: "",
    after: "",
    treatment: "",
  });
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const clearPhoto = () => {
    setPhotoFile(null);
    setPhotoPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.cropType || !form.diseaseName || !form.before || !form.after)
      return;

    setUploading(true);
    let photoUrl: string | undefined;

    try {
      if (photoFile) {
        const bytes = new Uint8Array(await photoFile.arrayBuffer());
        const blob = ExternalBlob.fromBytes(bytes);
        photoUrl = blob.getDirectURL();
      }

      await createStory.mutateAsync({
        authorName: form.authorName || "Anonymous Farmer",
        cropType: form.cropType,
        diseaseName: form.diseaseName,
        beforeDescription: form.before,
        afterDescription: form.after,
        treatmentUsed: form.treatment,
        photoUrl,
      });

      setOpen(false);
      setForm({
        authorName: "",
        cropType: "",
        diseaseName: "",
        before: "",
        after: "",
        treatment: "",
      });
      clearPhoto();
    } finally {
      setUploading(false);
    }
  };

  const isPending = uploading || createStory.isPending;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2" data-ocid="share-story-btn">
          <Plus className="w-4 h-4" />
          Share Your Story
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <PenLine className="w-5 h-5 text-primary" />
            Share Your Recovery Story
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-1">
            <Label htmlFor="story-author">Your Name</Label>
            <Input
              id="story-author"
              placeholder="e.g. Mary Johnson"
              value={form.authorName}
              onChange={(e) =>
                setForm((f) => ({ ...f, authorName: e.target.value }))
              }
              data-ocid="story-create-author"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="story-crop-select">Crop Type *</Label>
              <Select
                value={form.cropType}
                onValueChange={(v) => setForm((f) => ({ ...f, cropType: v }))}
                required
              >
                <SelectTrigger
                  id="story-crop-select"
                  data-ocid="story-create-crop"
                >
                  <SelectValue placeholder="Select crop…" />
                </SelectTrigger>
                <SelectContent>
                  {CROP_TYPES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label htmlFor="disease-name">Disease Name *</Label>
              <Input
                id="disease-name"
                placeholder="e.g. Late Blight"
                value={form.diseaseName}
                onChange={(e) =>
                  setForm((f) => ({ ...f, diseaseName: e.target.value }))
                }
                required
                data-ocid="story-create-disease"
              />
            </div>
          </div>

          {/* Photo Upload */}
          <div className="space-y-1">
            <Label className="flex items-center gap-1.5">
              <ImagePlus className="w-3.5 h-3.5" />
              Photo (optional)
            </Label>
            {photoPreview ? (
              <div className="relative rounded-lg overflow-hidden border border-border">
                <img
                  src={photoPreview}
                  alt="Story preview"
                  className="w-full object-cover"
                  style={{ maxHeight: 160 }}
                />
                <button
                  type="button"
                  onClick={clearPhoto}
                  aria-label="Remove photo"
                  className="absolute top-2 right-2 w-7 h-7 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-smooth"
                  data-ocid="story-photo-remove"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <label
                className="flex items-center justify-center gap-2 w-full h-20 rounded-lg border-2 border-dashed border-border hover:border-primary/50 hover:bg-primary/3 bg-muted/30 cursor-pointer transition-smooth text-sm text-muted-foreground"
                data-ocid="story-photo-dropzone"
              >
                <ImagePlus className="w-4 h-4" />
                Add a before/after photo
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="sr-only"
                  onChange={handlePhotoChange}
                  data-ocid="story-photo-input"
                />
              </label>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="story-before">Before — What happened? *</Label>
            <Textarea
              id="story-before"
              placeholder="Describe the symptoms and how bad it was before treatment…"
              rows={3}
              value={form.before}
              onChange={(e) =>
                setForm((f) => ({ ...f, before: e.target.value }))
              }
              required
              data-ocid="story-create-before"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="story-after">After — How did it recover? *</Label>
            <Textarea
              id="story-after"
              placeholder="Describe how the crop recovered and what you saved…"
              rows={3}
              value={form.after}
              onChange={(e) =>
                setForm((f) => ({ ...f, after: e.target.value }))
              }
              required
              data-ocid="story-create-after"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="story-treatment">Treatment Used</Label>
            <Textarea
              id="story-treatment"
              placeholder="e.g. Mancozeb 75 WP spray, 2g/L, every 7 days for 3 applications"
              rows={2}
              value={form.treatment}
              onChange={(e) =>
                setForm((f) => ({ ...f, treatment: e.target.value }))
              }
              data-ocid="story-create-treatment"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              data-ocid="story-create-submit"
            >
              {isPending ? "Sharing…" : "Share Story"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export function SuccessStoriesPage() {
  const { data: stories, isLoading } = useSuccessStories();

  const displayStories =
    stories && stories.length > 0 ? stories : SAMPLE_STORIES;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-card border-b border-border py-10 px-4">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-social/10 text-social text-sm font-semibold mb-2 border border-social/20">
              <Star className="w-4 h-4" />
              Success Stories
            </div>
            <h1 className="text-display-md text-foreground">
              Farmers Who Saved Their Crops
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Real stories from farmers who identified diseases early and
              recovered successfully.
            </p>
          </motion.div>
          <ShareStoryDialog />
        </div>
      </section>

      {/* Feed */}
      <section className="py-10 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          {isLoading ? (
            <div className="space-y-4">
              {["ss1", "ss2"].map((k) => (
                <Skeleton key={k} className="h-64 rounded-lg" />
              ))}
            </div>
          ) : displayStories.length === 0 ? (
            <motion.div
              className="text-center py-20 card-social"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              data-ocid="success-stories-empty-state"
            >
              <div className="text-5xl mb-4">🌱</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No stories yet
              </h3>
              <p className="text-muted-foreground text-sm max-w-xs mx-auto mb-5">
                Be the first farmer to share your crop recovery journey and
                inspire others in the community.
              </p>
              <div className="flex items-center justify-center gap-2 text-primary text-sm font-semibold">
                <span>Share your story above</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </motion.div>
          ) : (
            <AnimatePresence>
              <div className="space-y-5">
                {displayStories.map((story, i) => (
                  <StoryCard key={story.id} story={story} index={i} />
                ))}
              </div>
            </AnimatePresence>
          )}
        </div>
      </section>
    </div>
  );
}
