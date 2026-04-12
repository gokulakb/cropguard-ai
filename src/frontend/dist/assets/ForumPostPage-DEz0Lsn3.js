import { c as createLucideIcon, k as useParams, ak as useForumPost, al as useReplies, ag as useLikePost, am as useReplyToPost, r as reactExports, j as jsxRuntimeExports, d as Link, f as Skeleton, B as Button, m as motion, U as User, ah as formatDistanceToNow, e as MessageSquare, A as AnimatePresence } from "./index-DQmXo4u-.js";
import { I as Input } from "./input-CXyKGE_g.js";
import { L as Label } from "./label-ClXPzMbA.js";
import { T as Textarea } from "./textarea-CuwFynA4.js";
import { A as ArrowLeft } from "./arrow-left-CvxugNVW.js";
import { T as Tag } from "./tag-B25GUu1n.js";
import { H as Heart } from "./heart-DI-N4FAF.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z",
      key: "117uat"
    }
  ],
  ["path", { d: "M6 12h16", key: "s4cdu5" }]
];
const SendHorizontal = createLucideIcon("send-horizontal", __iconNode);
const SAMPLE_REPLIES = [
  {
    id: "r1",
    postId: "p1",
    userId: "u5",
    authorName: "Grace Obi",
    body: "Yes, that sounds like late blight. Apply copper-based fungicide immediately and remove infected leaves. Make sure you destroy the removed material — don't compost it!",
    likesCount: 4,
    createdAt: new Date(Date.now() - 1 * 864e5).toISOString()
  },
  {
    id: "r2",
    postId: "p1",
    userId: "u6",
    authorName: "Dr. Kofi Mensah",
    body: "I'd also recommend spacing your plants better for airflow, and avoid overhead irrigation. Drip irrigation greatly reduces the spread of late blight.",
    likesCount: 2,
    createdAt: new Date(Date.now() - 12 * 36e5).toISOString()
  }
];
function ReplyCard({ reply, index }) {
  const likePost = useLikePost();
  const [optimisticLikes, setOptimisticLikes] = reactExports.useState(reply.likesCount);
  const [liked, setLiked] = reactExports.useState(false);
  const handleLike = () => {
    if (!liked) {
      setLiked(true);
      setOptimisticLikes((n) => n + 1);
      likePost.mutate(reply.postId);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      className: "card-social",
      initial: { opacity: 0, x: -12 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.3, delay: index * 0.05 },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-social/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-4 h-4 text-social" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-sm text-foreground", children: reply.authorName }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: formatDistanceToNow(new Date(reply.createdAt), {
              addSuffix: true
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/85 leading-relaxed", children: reply.body }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: handleLike,
              className: `mt-2 flex items-center gap-1 text-xs transition-smooth ${liked ? "text-destructive" : "text-muted-foreground hover:text-destructive"}`,
              "data-ocid": "reply-like-btn",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: `w-3 h-3 ${liked ? "fill-current" : ""}` }),
                optimisticLikes
              ]
            }
          )
        ] })
      ] })
    }
  );
}
function ForumPostPage() {
  const { postId } = useParams({ from: "/forum/$postId" });
  const { data: post, isLoading: postLoading } = useForumPost(postId);
  const { data: replies, isLoading: repliesLoading } = useReplies(postId);
  const likePost = useLikePost();
  const replyToPost = useReplyToPost();
  const [liked, setLiked] = reactExports.useState(false);
  const [optimisticLikes, setOptimisticLikes] = reactExports.useState(null);
  const [replyAuthor, setReplyAuthor] = reactExports.useState("");
  const [replyBody, setReplyBody] = reactExports.useState("");
  const displayPost = post;
  const displayReplies = replies && replies.length > 0 ? replies : SAMPLE_REPLIES;
  const currentLikes = optimisticLikes ?? (displayPost == null ? void 0 : displayPost.likesCount) ?? 0;
  const handleLikePost = () => {
    if (!liked && displayPost) {
      setLiked(true);
      setOptimisticLikes((displayPost.likesCount ?? 0) + 1);
      likePost.mutate(postId);
    }
  };
  const handleReply = async (e) => {
    e.preventDefault();
    if (!replyBody.trim()) return;
    await replyToPost.mutateAsync({
      postId,
      authorName: replyAuthor.trim() || "Anonymous Farmer",
      body: replyBody
    });
    setReplyBody("");
    setReplyAuthor("");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-3xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to: "/forum",
        className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
          "Back to Forum"
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 py-8 space-y-6", children: [
      postLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-3/4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-1/3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-32 w-full rounded-lg" })
      ] }) : !displayPost ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-16", "data-ocid": "forum-post-not-found", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl mb-3", children: "🌾" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold text-foreground mb-1", children: "Post not found" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "This post may have been removed or the link is incorrect." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/forum", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "mt-4", children: "Browse Forum" }) })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: "card-social",
          initial: { opacity: 0, y: -12 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.4 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-foreground leading-snug", children: displayPost.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "badge-social flex-shrink-0 whitespace-nowrap", children: displayPost.cropType })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-4 text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-3.5 h-3.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground/70", children: displayPost.authorName })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatDistanceToNow(new Date(displayPost.createdAt), {
                addSuffix: true
              }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/85 leading-relaxed mb-4", children: displayPost.body }),
            displayPost.tags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5 mb-4", children: displayPost.tags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: "inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-2.5 h-2.5" }),
                  tag
                ]
              },
              tag
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 pt-3 border-t border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: handleLikePost,
                  className: `flex items-center gap-1.5 text-sm transition-smooth ${liked ? "text-destructive font-semibold" : "text-muted-foreground hover:text-destructive"}`,
                  "data-ocid": "forum-post-like-btn",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: `w-4 h-4 ${liked ? "fill-current" : ""}` }),
                    currentLikes,
                    " ",
                    currentLikes === 1 ? "like" : "likes"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 text-sm text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-4 h-4" }),
                displayReplies.length,
                " ",
                displayReplies.length === 1 ? "reply" : "replies"
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-base font-semibold text-foreground mb-3 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-4 h-4 text-social" }),
          "Replies"
        ] }),
        repliesLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: ["sr1", "sr2"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 rounded-lg" }, k)) }) : displayReplies.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "text-center py-10 card-social",
            "data-ocid": "forum-replies-empty",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl mb-2", children: "💬" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "No replies yet — be the first to help!" })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: displayReplies.map((reply, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ReplyCard, { reply, index: i }, reply.id)) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-data border-primary/20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold text-foreground mb-3 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SendHorizontal, { className: "w-4 h-4 text-primary" }),
          "Add Your Reply"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleReply, className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "reply-author", children: "Your Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "reply-author",
                placeholder: "e.g. Amina Yusuf",
                value: replyAuthor,
                onChange: (e) => setReplyAuthor(e.target.value),
                "data-ocid": "reply-author-input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "reply-body", children: "Your Reply *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                id: "reply-body",
                placeholder: "Share your knowledge or ask a follow-up question…",
                rows: 4,
                value: replyBody,
                onChange: (e) => setReplyBody(e.target.value),
                required: true,
                "data-ocid": "reply-body-input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "submit",
              disabled: replyToPost.isPending || !replyBody.trim(),
              className: "gap-2",
              "data-ocid": "reply-submit-btn",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SendHorizontal, { className: "w-4 h-4" }),
                replyToPost.isPending ? "Posting…" : "Post Reply"
              ]
            }
          ) })
        ] })
      ] })
    ] })
  ] });
}
export {
  ForumPostPage
};
