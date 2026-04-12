import { c as createLucideIcon, ac as useForumPosts, r as reactExports, j as jsxRuntimeExports, m as motion, e as MessageSquare, f as Skeleton, A as AnimatePresence, u as useAuth, ad as useCreateForumPost, B as Button, ae as useForumLeaderboard, af as Trophy, W as ChevronDown, ag as useLikePost, d as Link, ah as formatDistanceToNow } from "./index-DQmXo4u-.js";
import { B as Badge } from "./badge-xsDIYR3X.js";
import { D as Dialog, f as DialogTrigger, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-D7rsyBmK.js";
import { I as Input } from "./input-CXyKGE_g.js";
import { L as Label } from "./label-ClXPzMbA.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-Dg50Yx0j.js";
import { T as Textarea } from "./textarea-CuwFynA4.js";
import { P as Plus } from "./plus--m541XKc.js";
import { P as PenLine } from "./pen-line-DADOO_Ru.js";
import { C as ChevronUp } from "./chevron-up-D3BYUhf-.js";
import { H as Heart } from "./heart-DI-N4FAF.js";
import { T as Tag } from "./tag-B25GUu1n.js";
import "./index-DPaJbrbs.js";
import "./index-BYJyCJKl.js";
import "./index-B7d6HZwL.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["line", { x1: "21", x2: "14", y1: "4", y2: "4", key: "obuewd" }],
  ["line", { x1: "10", x2: "3", y1: "4", y2: "4", key: "1q6298" }],
  ["line", { x1: "21", x2: "12", y1: "12", y2: "12", key: "1iu8h1" }],
  ["line", { x1: "8", x2: "3", y1: "12", y2: "12", key: "ntss68" }],
  ["line", { x1: "21", x2: "16", y1: "20", y2: "20", key: "14d8ph" }],
  ["line", { x1: "12", x2: "3", y1: "20", y2: "20", key: "m0wm8r" }],
  ["line", { x1: "14", x2: "14", y1: "2", y2: "6", key: "14e1ph" }],
  ["line", { x1: "8", x2: "8", y1: "10", y2: "14", key: "1i6ji0" }],
  ["line", { x1: "16", x2: "16", y1: "18", y2: "22", key: "1lctlv" }]
];
const SlidersHorizontal = createLucideIcon("sliders-horizontal", __iconNode);
const SAMPLE_POSTS = [
  {
    id: "p1",
    userId: "u1",
    authorName: "Chukwudi Nnamdi",
    title: "How do I treat late blight on my tomato plants?",
    body: "I noticed brown spots spreading rapidly on my tomato leaves after the rain. Is this late blight and what's the best treatment?",
    cropType: "Tomato",
    tags: ["blight", "fungicide", "treatment"],
    likesCount: 12,
    createdAt: new Date(Date.now() - 2 * 864e5).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 864e5).toISOString()
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
    createdAt: new Date(Date.now() - 5 * 864e5).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 864e5).toISOString()
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
    createdAt: new Date(Date.now() - 7 * 864e5).toISOString(),
    updatedAt: new Date(Date.now() - 7 * 864e5).toISOString()
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
    createdAt: new Date(Date.now() - 10 * 864e5).toISOString(),
    updatedAt: new Date(Date.now() - 10 * 864e5).toISOString()
  }
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
  "Other"
];
const RANK_STYLES = [
  "bg-amber-400/20 text-amber-600 border-amber-400/40",
  "bg-zinc-300/20 text-zinc-500 border-zinc-300/40",
  "bg-orange-400/20 text-orange-600 border-orange-400/40"
];
function ForumLeaderboard() {
  var _a, _b;
  const [expanded, setExpanded] = reactExports.useState(false);
  const { data: entries = [], isLoading } = useForumLeaderboard();
  const SAMPLE_LEADERBOARD = [
    {
      userId: "u1",
      displayName: "Chukwudi Nnamdi",
      postCount: 34,
      totalLikes: 189,
      score: 257
    },
    {
      userId: "u2",
      displayName: "Amina Yusuf",
      postCount: 28,
      totalLikes: 142,
      score: 198
    },
    {
      userId: "u3",
      displayName: "Priya Sharma",
      postCount: 22,
      totalLikes: 110,
      score: 154
    },
    {
      userId: "u4",
      displayName: "Emmanuel Adeola",
      postCount: 18,
      totalLikes: 95,
      score: 131
    },
    {
      userId: "u5",
      displayName: "Fatima Diallo",
      postCount: 15,
      totalLikes: 76,
      score: 106
    },
    {
      userId: "u6",
      displayName: "Kwame Asante",
      postCount: 12,
      totalLikes: 61,
      score: 85
    },
    {
      userId: "u7",
      displayName: "Lena Morozova",
      postCount: 10,
      totalLikes: 54,
      score: 74
    },
    {
      userId: "u8",
      displayName: "Raj Patel",
      postCount: 9,
      totalLikes: 48,
      score: 66
    },
    {
      userId: "u9",
      displayName: "Sofia Hernandez",
      postCount: 7,
      totalLikes: 39,
      score: 53
    },
    {
      userId: "u10",
      displayName: "Yaw Darko",
      postCount: 6,
      totalLikes: 31,
      score: 43
    }
  ];
  const displayEntries = entries.length > 0 ? entries : SAMPLE_LEADERBOARD;
  const topThree = displayEntries.slice(0, 3);
  const rest = displayEntries.slice(3, 10);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "max-w-4xl mx-auto px-4 pt-6 pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl overflow-hidden shadow-subtle", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => setExpanded((v) => !v),
        className: "w-full flex items-center justify-between px-5 py-3.5 hover:bg-muted/30 transition-colors",
        "data-ocid": "leaderboard-toggle",
        "aria-expanded": expanded,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-5 h-5 text-amber-500" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground text-sm", children: "Top Contributors" }),
            topThree.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground hidden sm:inline", children: [
              "— ",
              ((_a = topThree[0]) == null ? void 0 : _a.displayName) || "Anonymous",
              " leads with",
              " ",
              ((_b = topThree[0]) == null ? void 0 : _b.score) ?? 0,
              " pts"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs hidden sm:inline", children: expanded ? "Collapse" : "Expand" }),
            expanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4" })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { initial: false, children: expanded && /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { height: 0, opacity: 0 },
        animate: { height: "auto", opacity: 1 },
        exit: { height: 0, opacity: 0 },
        transition: { duration: 0.25, ease: "easeInOut" },
        className: "overflow-hidden",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border px-5 py-4", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-2", children: [1, 2, 3].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 rounded-lg" }, k)) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4", children: topThree.map((entry, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: `flex flex-col items-center gap-1.5 rounded-lg border px-4 py-3 ${RANK_STYLES[i] ?? "bg-muted/30 text-foreground border-border"}`,
              "data-ocid": "leaderboard-top-entry",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xl font-bold leading-none", children: [
                  "#",
                  i + 1
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-sm text-center line-clamp-1", children: entry.displayName || "Anonymous" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-xs opacity-80", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    entry.postCount,
                    " posts"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-0.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-3 h-3" }),
                    entry.totalLikes
                  ] })
                ] })
              ]
            },
            entry.userId
          )) }),
          rest.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border rounded-lg border border-border overflow-hidden", children: rest.map((entry, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-3 px-4 py-2.5 bg-background hover:bg-muted/30 transition-colors",
              "data-ocid": "leaderboard-entry",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "w-6 text-center text-xs font-bold text-muted-foreground", children: [
                  "#",
                  i + 4
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 text-sm font-medium text-foreground truncate", children: entry.displayName || "Anonymous" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                  entry.postCount,
                  " posts"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground flex items-center gap-0.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-3 h-3" }),
                  entry.totalLikes
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "text-xs ml-1", children: [
                  entry.score,
                  " pts"
                ] })
              ]
            },
            entry.userId
          )) })
        ] }) })
      },
      "leaderboard-body"
    ) })
  ] }) });
}
function PostCard({ post, index }) {
  const likePost = useLikePost();
  const [optimisticLikes, setOptimisticLikes] = reactExports.useState(post.likesCount);
  const [liked, setLiked] = reactExports.useState(false);
  const handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!liked) {
      setLiked(true);
      setOptimisticLikes((n) => n + 1);
      likePost.mutate(post.id);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 16 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.35, delay: index * 0.06 },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/forum/$postId",
          params: { postId: post.id },
          className: "block",
          "data-ocid": "forum-post-link",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-social hover:shadow-elevated cursor-pointer", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground leading-snug hover:text-primary transition-colors line-clamp-2", children: post.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "flex-shrink-0 text-xs", children: post.cropType })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground line-clamp-2 mb-3", children: post.body }),
            post.tags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5 mb-3", children: post.tags.slice(0, 3).map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
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
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground/70", children: post.authorName }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatDistanceToNow(new Date(post.createdAt), {
                  addSuffix: true
                }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: handleLike,
                    className: `flex items-center gap-1 transition-smooth ${liked ? "text-destructive" : "text-muted-foreground hover:text-destructive"}`,
                    "data-ocid": "forum-post-like",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Heart,
                        {
                          className: `w-3.5 h-3.5 ${liked ? "fill-current" : ""}`
                        }
                      ),
                      optimisticLikes
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-3.5 h-3.5" }),
                  "replies"
                ] })
              ] })
            ] })
          ] })
        }
      )
    }
  );
}
function AskQuestionDialog() {
  useAuth();
  const createPost = useCreateForumPost();
  const [open, setOpen] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState({
    authorName: "",
    title: "",
    body: "",
    cropType: "",
    tagsStr: ""
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.body.trim()) return;
    await createPost.mutateAsync({
      authorName: form.authorName || "Anonymous Farmer",
      title: form.title,
      body: form.body,
      cropType: form.cropType || "Other",
      tags: form.tagsStr.split(",").map((t) => t.trim()).filter(Boolean)
    });
    setOpen(false);
    setForm({ authorName: "", title: "", body: "", cropType: "", tagsStr: "" });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "gap-2", "data-ocid": "forum-ask-question-btn", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
      "Ask a Question"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(PenLine, { className: "w-5 h-5 text-primary" }),
        "Ask the Community"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4 mt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "author-name", children: "Your Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "author-name",
              placeholder: "e.g. Chukwudi Nnamdi",
              value: form.authorName,
              onChange: (e) => setForm((f) => ({ ...f, authorName: e.target.value })),
              "data-ocid": "forum-create-author"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "post-title", children: "Question Title *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "post-title",
              placeholder: "e.g. How do I treat leaf blight on cassava?",
              value: form.title,
              onChange: (e) => setForm((f) => ({ ...f, title: e.target.value })),
              required: true,
              "data-ocid": "forum-create-title"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "post-body", children: "Details *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "post-body",
              placeholder: "Describe your problem with as much detail as possible…",
              rows: 4,
              value: form.body,
              onChange: (e) => setForm((f) => ({ ...f, body: e.target.value })),
              required: true,
              "data-ocid": "forum-create-body"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "crop-type-select", children: "Crop Type" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: form.cropType,
                onValueChange: (v) => setForm((f) => ({ ...f, cropType: v })),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SelectTrigger,
                    {
                      id: "crop-type-select",
                      "data-ocid": "forum-create-crop",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select crop…" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: CROP_TYPES.filter((c) => c !== "All Crops").map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c, children: c }, c)) })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "post-tags", children: "Tags (comma-separated)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "post-tags",
                placeholder: "blight, fungicide, …",
                value: form.tagsStr,
                onChange: (e) => setForm((f) => ({ ...f, tagsStr: e.target.value })),
                "data-ocid": "forum-create-tags"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              onClick: () => setOpen(false),
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "submit",
              disabled: createPost.isPending,
              "data-ocid": "forum-create-submit",
              children: createPost.isPending ? "Posting…" : "Post Question"
            }
          )
        ] })
      ] })
    ] })
  ] });
}
function ForumPage() {
  const { data: posts, isLoading } = useForumPosts();
  const [cropFilter, setCropFilter] = reactExports.useState("All Crops");
  const displayPosts = posts && posts.length > 0 ? posts : SAMPLE_POSTS;
  const filtered = cropFilter === "All Crops" ? displayPosts : displayPosts.filter((p) => p.cropType === cropFilter);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-card border-b border-border py-10 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: -16 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.4 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-social/10 text-social text-sm font-semibold mb-2 border border-social/20", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-4 h-4" }),
              "Farmer Forum"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-display-md text-foreground", children: "Community Q&A" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Ask questions, share knowledge, and learn from fellow farmers." })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AskQuestionDialog, {})
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background border-b border-border px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto flex items-center gap-3 overflow-x-auto scrollbar-none", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { className: "w-4 h-4 text-muted-foreground flex-shrink-0" }),
      CROP_TYPES.map((crop) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setCropFilter(crop),
          className: `flex-shrink-0 px-3 py-1 rounded-full text-xs font-semibold border transition-smooth ${cropFilter === crop ? "bg-primary text-primary-foreground border-primary" : "bg-muted text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"}`,
          "data-ocid": "forum-crop-filter",
          children: crop
        },
        crop
      ))
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ForumLeaderboard, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-8 px-4 bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-4xl mx-auto", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: ["sk1", "sk2", "sk3"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-36 rounded-lg" }, k)) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        className: "text-center py-16",
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        "data-ocid": "forum-empty-state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-5xl mb-4", children: "🌱" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-lg font-semibold text-foreground mb-2", children: [
            "No posts for ",
            cropFilter,
            " yet"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm", children: [
            "Be the first to ask a question about ",
            cropFilter,
            "!"
          ] })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: filtered.map((post, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(PostCard, { post, index: i }, post.id)) }) }) }) })
  ] });
}
export {
  ForumPage
};
