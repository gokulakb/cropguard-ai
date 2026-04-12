import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
  useForumPost,
  useLikePost,
  useReplies,
  useReplyToPost,
} from "@/hooks/use-backend";
import type { ForumReply } from "@/types";
import { Link, useParams } from "@tanstack/react-router";
import { formatDistanceToNow } from "date-fns";
import {
  ArrowLeft,
  Heart,
  MessageSquare,
  SendHorizonal,
  Tag,
  User,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

// ─── Sample reply data ────────────────────────────────────────────────────────

const SAMPLE_REPLIES: ForumReply[] = [
  {
    id: "r1",
    postId: "p1",
    userId: "u5",
    authorName: "Grace Obi",
    body: "Yes, that sounds like late blight. Apply copper-based fungicide immediately and remove infected leaves. Make sure you destroy the removed material — don't compost it!",
    likesCount: 4,
    createdAt: new Date(Date.now() - 1 * 86400000).toISOString(),
  },
  {
    id: "r2",
    postId: "p1",
    userId: "u6",
    authorName: "Dr. Kofi Mensah",
    body: "I'd also recommend spacing your plants better for airflow, and avoid overhead irrigation. Drip irrigation greatly reduces the spread of late blight.",
    likesCount: 2,
    createdAt: new Date(Date.now() - 12 * 3600000).toISOString(),
  },
];

function ReplyCard({ reply, index }: { reply: ForumReply; index: number }) {
  const likePost = useLikePost();
  const [optimisticLikes, setOptimisticLikes] = useState(reply.likesCount);
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    if (!liked) {
      setLiked(true);
      setOptimisticLikes((n) => n + 1);
      likePost.mutate(reply.postId);
    }
  };

  return (
    <motion.div
      className="card-social"
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-social/10 flex items-center justify-center flex-shrink-0">
          <User className="w-4 h-4 text-social" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="font-semibold text-sm text-foreground">
              {reply.authorName}
            </span>
            <span className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(reply.createdAt), {
                addSuffix: true,
              })}
            </span>
          </div>
          <p className="text-sm text-foreground/85 leading-relaxed">
            {reply.body}
          </p>
          <button
            type="button"
            onClick={handleLike}
            className={`mt-2 flex items-center gap-1 text-xs transition-smooth ${
              liked
                ? "text-destructive"
                : "text-muted-foreground hover:text-destructive"
            }`}
            data-ocid="reply-like-btn"
          >
            <Heart className={`w-3 h-3 ${liked ? "fill-current" : ""}`} />
            {optimisticLikes}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export function ForumPostPage() {
  const { postId } = useParams({ from: "/forum/$postId" });
  const { data: post, isLoading: postLoading } = useForumPost(postId);
  const { data: replies, isLoading: repliesLoading } = useReplies(postId);
  const likePost = useLikePost();
  const replyToPost = useReplyToPost();

  const [liked, setLiked] = useState(false);
  const [optimisticLikes, setOptimisticLikes] = useState<number | null>(null);
  const [replyAuthor, setReplyAuthor] = useState("");
  const [replyBody, setReplyBody] = useState("");

  const displayPost = post;
  const displayReplies =
    replies && replies.length > 0 ? replies : SAMPLE_REPLIES;

  const currentLikes = optimisticLikes ?? displayPost?.likesCount ?? 0;

  const handleLikePost = () => {
    if (!liked && displayPost) {
      setLiked(true);
      setOptimisticLikes((displayPost.likesCount ?? 0) + 1);
      likePost.mutate(postId);
    }
  };

  const handleReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyBody.trim()) return;
    await replyToPost.mutateAsync({
      postId,
      authorName: replyAuthor.trim() || "Anonymous Farmer",
      body: replyBody,
    });
    setReplyBody("");
    setReplyAuthor("");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Back nav */}
      <div className="bg-card border-b border-border px-4 py-3">
        <div className="max-w-3xl mx-auto">
          <Link
            to="/forum"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Forum
          </Link>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        {/* Post */}
        {postLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-32 w-full rounded-lg" />
          </div>
        ) : !displayPost ? (
          <div className="text-center py-16" data-ocid="forum-post-not-found">
            <div className="text-4xl mb-3">🌾</div>
            <h2 className="text-lg font-semibold text-foreground mb-1">
              Post not found
            </h2>
            <p className="text-muted-foreground text-sm">
              This post may have been removed or the link is incorrect.
            </p>
            <Link to="/forum">
              <Button variant="outline" className="mt-4">
                Browse Forum
              </Button>
            </Link>
          </div>
        ) : (
          <motion.div
            className="card-social"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <h1 className="text-xl font-bold text-foreground leading-snug">
                {displayPost.title}
              </h1>
              <span className="badge-social flex-shrink-0 whitespace-nowrap">
                {displayPost.cropType}
              </span>
            </div>

            <div className="flex items-center gap-3 mb-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                <span className="font-medium text-foreground/70">
                  {displayPost.authorName}
                </span>
              </div>
              <span>
                {formatDistanceToNow(new Date(displayPost.createdAt), {
                  addSuffix: true,
                })}
              </span>
            </div>

            <p className="text-foreground/85 leading-relaxed mb-4">
              {displayPost.body}
            </p>

            {displayPost.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {displayPost.tags.map((tag) => (
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

            <div className="flex items-center gap-4 pt-3 border-t border-border">
              <button
                type="button"
                onClick={handleLikePost}
                className={`flex items-center gap-1.5 text-sm transition-smooth ${
                  liked
                    ? "text-destructive font-semibold"
                    : "text-muted-foreground hover:text-destructive"
                }`}
                data-ocid="forum-post-like-btn"
              >
                <Heart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
                {currentLikes} {currentLikes === 1 ? "like" : "likes"}
              </button>
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <MessageSquare className="w-4 h-4" />
                {displayReplies.length}{" "}
                {displayReplies.length === 1 ? "reply" : "replies"}
              </span>
            </div>
          </motion.div>
        )}

        {/* Replies */}
        <div>
          <h2 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-social" />
            Replies
          </h2>
          {repliesLoading ? (
            <div className="space-y-3">
              {["sr1", "sr2"].map((k) => (
                <Skeleton key={k} className="h-24 rounded-lg" />
              ))}
            </div>
          ) : displayReplies.length === 0 ? (
            <div
              className="text-center py-10 card-social"
              data-ocid="forum-replies-empty"
            >
              <div className="text-3xl mb-2">💬</div>
              <p className="text-muted-foreground text-sm">
                No replies yet — be the first to help!
              </p>
            </div>
          ) : (
            <AnimatePresence>
              <div className="space-y-3">
                {displayReplies.map((reply, i) => (
                  <ReplyCard key={reply.id} reply={reply} index={i} />
                ))}
              </div>
            </AnimatePresence>
          )}
        </div>

        {/* Add reply */}
        <div className="card-data border-primary/20">
          <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <SendHorizonal className="w-4 h-4 text-primary" />
            Add Your Reply
          </h3>
          <form onSubmit={handleReply} className="space-y-3">
            <div className="space-y-1">
              <Label htmlFor="reply-author">Your Name</Label>
              <Input
                id="reply-author"
                placeholder="e.g. Amina Yusuf"
                value={replyAuthor}
                onChange={(e) => setReplyAuthor(e.target.value)}
                data-ocid="reply-author-input"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="reply-body">Your Reply *</Label>
              <Textarea
                id="reply-body"
                placeholder="Share your knowledge or ask a follow-up question…"
                rows={4}
                value={replyBody}
                onChange={(e) => setReplyBody(e.target.value)}
                required
                data-ocid="reply-body-input"
              />
            </div>
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={replyToPost.isPending || !replyBody.trim()}
                className="gap-2"
                data-ocid="reply-submit-btn"
              >
                <SendHorizonal className="w-4 h-4" />
                {replyToPost.isPending ? "Posting…" : "Post Reply"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
