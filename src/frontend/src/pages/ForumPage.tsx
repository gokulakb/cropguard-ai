import { Badge } from "@/components/ui/badge";
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
import { useAuth } from "@/hooks/use-auth";
import {
  useCreateForumPost,
  useForumLeaderboard,
  useForumPosts,
  useLikePost,
} from "@/hooks/use-backend";
import type { ForumPost } from "@/types";
import { Link } from "@tanstack/react-router";
import { formatDistanceToNow } from "date-fns";
import {
  ChevronDown,
  ChevronUp,
  Heart,
  MessageSquare,
  PenLine,
  Plus,
  SlidersHorizontal,
  Tag,
  Trophy,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

// ─── Sample data ──────────────────────────────────────────────────────────────

const SAMPLE_POSTS: ForumPost[] = [
  {
    id: "p1",
    userId: "u1",
    authorName: "Chukwudi Nnamdi",
    title: "How do I treat late blight on my tomato plants?",
    body: "I noticed brown spots spreading rapidly on my tomato leaves after the rain. Is this late blight and what's the best treatment?",
    cropType: "Tomato",
    tags: ["blight", "fungicide", "treatment"],
    likesCount: 12,
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 86400000).toISOString(),
  },
  {
    id: "p2",
    userId: "u2",
    authorName: "Amina Yusuf",
    title: "Pest control strategies for rice paddies",
    body: "My rice field is being attacked by stem borers this season. Looking for integrated pest management strategies that won't harm beneficial insects.",
    cropType: "Rice",
    tags: ["pest", "IPM", "stem-borer"],
    likesCount: 8,
    createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 86400000).toISOString(),
  },
  {
    id: "p3",
    userId: "u3",
    authorName: "Emmanuel Adeola",
    title: "Yellow leaves on maize — nitrogen deficiency or disease?",
    body: "My maize plants are turning yellow from the bottom leaves upward. The local extension officer said it could be nitrogen deficiency. Any soil test suggestions?",
    cropType: "Maize",
    tags: ["nitrogen", "yellowing", "soil"],
    likesCount: 5,
    createdAt: new Date(Date.now() - 7 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 7 * 86400000).toISOString(),
  },
  {
    id: "p4",
    userId: "u4",
    authorName: "Priya Sharma",
    title: "Cassava mosaic virus — prevention before planting",
    body: "Planning to plant cassava next month. How do I select virus-free cuttings and protect against cassava mosaic disease?",
    cropType: "Cassava",
    tags: ["mosaic-virus", "prevention", "cuttings"],
    likesCount: 14,
    createdAt: new Date(Date.now() - 10 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 10 * 86400000).toISOString(),
  },
];

const CROP_TYPES = [
  "All Crops",
  "Tomato",
  "Rice",
  "Maize",
  "Cassava",
  "Wheat",
  "Soybean",
  "Yam",
  "Pepper",
  "Other",
];

// ─── Rank badge colors ────────────────────────────────────────────────────────

const RANK_STYLES = [
  "bg-amber-400/20 text-amber-600 border-amber-400/40",
  "bg-zinc-300/20 text-zinc-500 border-zinc-300/40",
  "bg-orange-400/20 text-orange-600 border-orange-400/40",
];

function ForumLeaderboard() {
  const [expanded, setExpanded] = useState(false);
  const { data: entries = [], isLoading } = useForumLeaderboard();

  const SAMPLE_LEADERBOARD = [
    {
      userId: "u1",
      displayName: "Chukwudi Nnamdi",
      postCount: 34,
      totalLikes: 189,
      score: 257,
    },
    {
      userId: "u2",
      displayName: "Amina Yusuf",
      postCount: 28,
      totalLikes: 142,
      score: 198,
    },
    {
      userId: "u3",
      displayName: "Priya Sharma",
      postCount: 22,
      totalLikes: 110,
      score: 154,
    },
    {
      userId: "u4",
      displayName: "Emmanuel Adeola",
      postCount: 18,
      totalLikes: 95,
      score: 131,
    },
    {
      userId: "u5",
      displayName: "Fatima Diallo",
      postCount: 15,
      totalLikes: 76,
      score: 106,
    },
    {
      userId: "u6",
      displayName: "Kwame Asante",
      postCount: 12,
      totalLikes: 61,
      score: 85,
    },
    {
      userId: "u7",
      displayName: "Lena Morozova",
      postCount: 10,
      totalLikes: 54,
      score: 74,
    },
    {
      userId: "u8",
      displayName: "Raj Patel",
      postCount: 9,
      totalLikes: 48,
      score: 66,
    },
    {
      userId: "u9",
      displayName: "Sofia Hernandez",
      postCount: 7,
      totalLikes: 39,
      score: 53,
    },
    {
      userId: "u10",
      displayName: "Yaw Darko",
      postCount: 6,
      totalLikes: 31,
      score: 43,
    },
  ];

  const displayEntries = entries.length > 0 ? entries : SAMPLE_LEADERBOARD;
  const topThree = displayEntries.slice(0, 3);
  const rest = displayEntries.slice(3, 10);

  return (
    <section className="max-w-4xl mx-auto px-4 pt-6 pb-2">
      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-subtle">
        {/* Header — always visible */}
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-muted/30 transition-colors"
          data-ocid="leaderboard-toggle"
          aria-expanded={expanded}
        >
          <div className="flex items-center gap-2.5">
            <Trophy className="w-5 h-5 text-amber-500" />
            <span className="font-semibold text-foreground text-sm">
              Top Contributors
            </span>
            {topThree.length > 0 && (
              <span className="text-xs text-muted-foreground hidden sm:inline">
                — {topThree[0]?.displayName || "Anonymous"} leads with{" "}
                {topThree[0]?.score ?? 0} pts
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <span className="text-xs hidden sm:inline">
              {expanded ? "Collapse" : "Expand"}
            </span>
            {expanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </div>
        </button>

        {/* Expandable content */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key="leaderboard-body"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="border-t border-border px-5 py-4">
                {isLoading ? (
                  <div className="grid gap-2">
                    {[1, 2, 3].map((k) => (
                      <Skeleton key={k} className="h-9 rounded-lg" />
                    ))}
                  </div>
                ) : (
                  <>
                    {/* Top 3 — highlighted */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                      {topThree.map((entry, i) => (
                        <div
                          key={entry.userId}
                          className={`flex flex-col items-center gap-1.5 rounded-lg border px-4 py-3 ${RANK_STYLES[i] ?? "bg-muted/30 text-foreground border-border"}`}
                          data-ocid="leaderboard-top-entry"
                        >
                          <span className="text-xl font-bold leading-none">
                            #{i + 1}
                          </span>
                          <span className="font-semibold text-sm text-center line-clamp-1">
                            {entry.displayName || "Anonymous"}
                          </span>
                          <div className="flex items-center gap-3 text-xs opacity-80">
                            <span>{entry.postCount} posts</span>
                            <span className="flex items-center gap-0.5">
                              <Heart className="w-3 h-3" />
                              {entry.totalLikes}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Ranks 4–10 — compact rows */}
                    {rest.length > 0 && (
                      <div className="divide-y divide-border rounded-lg border border-border overflow-hidden">
                        {rest.map((entry, i) => (
                          <div
                            key={entry.userId}
                            className="flex items-center gap-3 px-4 py-2.5 bg-background hover:bg-muted/30 transition-colors"
                            data-ocid="leaderboard-entry"
                          >
                            <span className="w-6 text-center text-xs font-bold text-muted-foreground">
                              #{i + 4}
                            </span>
                            <span className="flex-1 text-sm font-medium text-foreground truncate">
                              {entry.displayName || "Anonymous"}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {entry.postCount} posts
                            </span>
                            <span className="text-xs text-muted-foreground flex items-center gap-0.5">
                              <Heart className="w-3 h-3" />
                              {entry.totalLikes}
                            </span>
                            <Badge variant="secondary" className="text-xs ml-1">
                              {entry.score} pts
                            </Badge>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// ─── Post Card ─────────────────────────────────────────────────────────────────

function PostCard({ post, index }: { post: ForumPost; index: number }) {
  const likePost = useLikePost();
  const [optimisticLikes, setOptimisticLikes] = useState(post.likesCount);
  const [liked, setLiked] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!liked) {
      setLiked(true);
      setOptimisticLikes((n) => n + 1);
      likePost.mutate(post.id);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
    >
      <Link
        to="/forum/$postId"
        params={{ postId: post.id }}
        className="block"
        data-ocid="forum-post-link"
      >
        <div className="card-social hover:shadow-elevated cursor-pointer">
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3 className="font-semibold text-foreground leading-snug hover:text-primary transition-colors line-clamp-2">
              {post.title}
            </h3>
            <Badge variant="outline" className="flex-shrink-0 text-xs">
              {post.cropType}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {post.body}
          </p>
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs"
                >
                  <Tag className="w-2.5 h-2.5" />
                  {tag}
                </span>
              ))}
            </div>
          )}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-3">
              <span className="font-medium text-foreground/70">
                {post.authorName}
              </span>
              <span>
                {formatDistanceToNow(new Date(post.createdAt), {
                  addSuffix: true,
                })}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleLike}
                className={`flex items-center gap-1 transition-smooth ${liked ? "text-destructive" : "text-muted-foreground hover:text-destructive"}`}
                data-ocid="forum-post-like"
              >
                <Heart
                  className={`w-3.5 h-3.5 ${liked ? "fill-current" : ""}`}
                />
                {optimisticLikes}
              </button>
              <span className="flex items-center gap-1">
                <MessageSquare className="w-3.5 h-3.5" />
                replies
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function AskQuestionDialog() {
  useAuth();
  const createPost = useCreateForumPost();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    authorName: "",
    title: "",
    body: "",
    cropType: "",
    tagsStr: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.body.trim()) return;
    await createPost.mutateAsync({
      authorName: form.authorName || "Anonymous Farmer",
      title: form.title,
      body: form.body,
      cropType: form.cropType || "Other",
      tags: form.tagsStr
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    });
    setOpen(false);
    setForm({ authorName: "", title: "", body: "", cropType: "", tagsStr: "" });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2" data-ocid="forum-ask-question-btn">
          <Plus className="w-4 h-4" />
          Ask a Question
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <PenLine className="w-5 h-5 text-primary" />
            Ask the Community
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-1">
            <Label htmlFor="author-name">Your Name</Label>
            <Input
              id="author-name"
              placeholder="e.g. Chukwudi Nnamdi"
              value={form.authorName}
              onChange={(e) =>
                setForm((f) => ({ ...f, authorName: e.target.value }))
              }
              data-ocid="forum-create-author"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="post-title">Question Title *</Label>
            <Input
              id="post-title"
              placeholder="e.g. How do I treat leaf blight on cassava?"
              value={form.title}
              onChange={(e) =>
                setForm((f) => ({ ...f, title: e.target.value }))
              }
              required
              data-ocid="forum-create-title"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="post-body">Details *</Label>
            <Textarea
              id="post-body"
              placeholder="Describe your problem with as much detail as possible…"
              rows={4}
              value={form.body}
              onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
              required
              data-ocid="forum-create-body"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="crop-type-select">Crop Type</Label>
              <Select
                value={form.cropType}
                onValueChange={(v) => setForm((f) => ({ ...f, cropType: v }))}
              >
                <SelectTrigger
                  id="crop-type-select"
                  data-ocid="forum-create-crop"
                >
                  <SelectValue placeholder="Select crop…" />
                </SelectTrigger>
                <SelectContent>
                  {CROP_TYPES.filter((c) => c !== "All Crops").map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label htmlFor="post-tags">Tags (comma-separated)</Label>
              <Input
                id="post-tags"
                placeholder="blight, fungicide, …"
                value={form.tagsStr}
                onChange={(e) =>
                  setForm((f) => ({ ...f, tagsStr: e.target.value }))
                }
                data-ocid="forum-create-tags"
              />
            </div>
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
              disabled={createPost.isPending}
              data-ocid="forum-create-submit"
            >
              {createPost.isPending ? "Posting…" : "Post Question"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function ForumPage() {
  const { data: posts, isLoading } = useForumPosts();
  const [cropFilter, setCropFilter] = useState("All Crops");

  const displayPosts: ForumPost[] =
    posts && posts.length > 0 ? posts : SAMPLE_POSTS;
  const filtered =
    cropFilter === "All Crops"
      ? displayPosts
      : displayPosts.filter((p) => p.cropType === cropFilter);

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
              <MessageSquare className="w-4 h-4" />
              Farmer Forum
            </div>
            <h1 className="text-display-md text-foreground">
              Community Q&amp;A
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Ask questions, share knowledge, and learn from fellow farmers.
            </p>
          </motion.div>
          <AskQuestionDialog />
        </div>
      </section>

      {/* Filter bar */}
      <section className="bg-background border-b border-border px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center gap-3 overflow-x-auto scrollbar-none">
          <SlidersHorizontal className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          {CROP_TYPES.map((crop) => (
            <button
              key={crop}
              type="button"
              onClick={() => setCropFilter(crop)}
              className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-semibold border transition-smooth ${
                cropFilter === crop
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-muted text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
              }`}
              data-ocid="forum-crop-filter"
            >
              {crop}
            </button>
          ))}
        </div>
      </section>

      {/* Leaderboard */}
      <ForumLeaderboard />

      {/* Posts list */}
      <section className="py-8 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          {isLoading ? (
            <div className="space-y-4">
              {["sk1", "sk2", "sk3"].map((k) => (
                <Skeleton key={k} className="h-36 rounded-lg" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              data-ocid="forum-empty-state"
            >
              <div className="text-5xl mb-4">🌱</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No posts for {cropFilter} yet
              </h3>
              <p className="text-muted-foreground text-sm">
                Be the first to ask a question about {cropFilter}!
              </p>
            </motion.div>
          ) : (
            <AnimatePresence>
              <div className="space-y-3">
                {filtered.map((post, i) => (
                  <PostCard key={post.id} post={post} index={i} />
                ))}
              </div>
            </AnimatePresence>
          )}
        </div>
      </section>
    </div>
  );
}
