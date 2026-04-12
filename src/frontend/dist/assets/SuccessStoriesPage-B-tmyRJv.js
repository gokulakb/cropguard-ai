import { c as createLucideIcon, an as useSuccessStories, j as jsxRuntimeExports, m as motion, ao as Star, f as Skeleton, A as AnimatePresence, ap as useCreateSuccessStory, r as reactExports, B as Button, X, aq as useLikeSuccessStory, U as User, ah as formatDistanceToNow, ar as ExternalBlob } from "./index-DQmXo4u-.js";
import { D as Dialog, f as DialogTrigger, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-D7rsyBmK.js";
import { I as Input } from "./input-CXyKGE_g.js";
import { L as Label } from "./label-ClXPzMbA.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-Dg50Yx0j.js";
import { T as Textarea } from "./textarea-CuwFynA4.js";
import { P as Plus } from "./plus--m541XKc.js";
import { P as PenLine } from "./pen-line-DADOO_Ru.js";
import { S as Sprout } from "./sprout-DXnuLk5D.js";
import { H as Heart } from "./heart-DI-N4FAF.js";
import "./index-DPaJbrbs.js";
import "./index-BYJyCJKl.js";
import "./index-B7d6HZwL.js";
import "./chevron-up-D3BYUhf-.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 5h6", key: "1vod17" }],
  ["path", { d: "M19 2v6", key: "4bpg5p" }],
  ["path", { d: "M21 11.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5", key: "1ue2ih" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }]
];
const ImagePlus = createLucideIcon("image-plus", __iconNode);
const SAMPLE_STORIES = [
  {
    id: "s1",
    userId: "u1",
    authorName: "Mary Johnson",
    cropType: "Corn",
    diseaseName: "Northern Corn Leaf Blight",
    beforeDescription: "Large tan-colored lesions started appearing on the lower leaves, spreading rapidly upward. I thought I was going to lose the entire plot before harvest.",
    afterDescription: "After CropGuard AI identified it as Northern Corn Leaf Blight with 91% confidence, I applied mancozeb fungicide and removed the worst-affected leaves. Within 3 weeks the spread stopped and I saved 80% of the yield.",
    treatmentUsed: "Mancozeb 75 WP foliar spray (2g/L) every 7 days for 3 applications + infected leaf removal",
    likesCount: 18,
    createdAt: new Date(Date.now() - 3 * 864e5).toISOString()
  },
  {
    id: "s2",
    userId: "u2",
    authorName: "Chukwudi Nnamdi",
    cropType: "Tomato",
    diseaseName: "Tomato Early Blight",
    beforeDescription: "Dark brown spots with target-ring patterns on older leaves, yellowing spreading fast. I was losing 5 plants a day before I scanned with CropGuard.",
    afterDescription: "The AI detected early blight immediately. I switched to drip irrigation, applied chlorothalonil and removed all infected tissue. The remaining 200 plants fully recovered.",
    treatmentUsed: "Chlorothalonil 500 SC spray + drip irrigation switch + crop rotation next season",
    likesCount: 11,
    createdAt: new Date(Date.now() - 7 * 864e5).toISOString()
  },
  {
    id: "s3",
    userId: "u3",
    authorName: "Priya Sharma",
    cropType: "Rice",
    diseaseName: "Rice Blast",
    beforeDescription: "Diamond-shaped lesions with grey centers were spreading across my paddy field. I was told by a neighbor it was just water stress, but it kept getting worse.",
    afterDescription: "CropGuard AI correctly identified rice blast and recommended tricyclazole. Applied it at the tillering stage and the disease was fully controlled. Yield was near-normal.",
    treatmentUsed: "Tricyclazole 75 WP (0.6g/L), applied twice 10 days apart at tillering stage",
    likesCount: 24,
    createdAt: new Date(Date.now() - 14 * 864e5).toISOString()
  }
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
  "Other"
];
function StoryCard({
  story,
  index
}) {
  const likeStory = useLikeSuccessStory();
  const [optimisticLikes, setOptimisticLikes] = reactExports.useState(story.likesCount);
  const [liked, setLiked] = reactExports.useState(false);
  const [heartAnim, setHeartAnim] = reactExports.useState(false);
  const handleLike = () => {
    if (!liked) {
      setLiked(true);
      setOptimisticLikes((n) => n + 1);
      setHeartAnim(true);
      setTimeout(() => setHeartAnim(false), 600);
      likeStory.mutate(story.id);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      className: "card-social hover:shadow-elevated",
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.4, delay: index * 0.07 },
      "data-ocid": "success-story-card",
      children: [
        story.photoUrl && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-t-xl overflow-hidden -mx-[1px] -mt-[1px] mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: story.photoUrl,
            alt: `${story.diseaseName} recovery — ${story.authorName}`,
            className: "w-full object-cover",
            style: { maxHeight: 200 }
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-full bg-social/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-4 h-4 text-social" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground truncate", children: story.authorName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: formatDistanceToNow(new Date(story.createdAt), {
                addSuffix: true
              }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1.5 flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "badge-social", children: story.cropType }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-4 h-4 text-accent flex-shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground text-sm", children: [
            "Recovered from: ",
            story.diseaseName
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md bg-destructive/5 border border-destructive/15 p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-destructive mb-1 uppercase tracking-wide", children: "Before" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/80 leading-relaxed line-clamp-3", children: story.beforeDescription })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md bg-success/5 border border-success/15 p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-success mb-1 uppercase tracking-wide", children: "After" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/80 leading-relaxed line-clamp-3", children: story.afterDescription })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 mb-3 p-2.5 rounded-md bg-muted/60", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sprout, { className: "w-3.5 h-3.5 text-success flex-shrink-0 mt-0.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-foreground/75 leading-relaxed", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground/90", children: "Treatment: " }),
            story.treatmentUsed
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-2 border-t border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: handleLike,
              className: `flex items-center gap-1.5 text-sm transition-smooth select-none ${liked ? "text-destructive font-semibold" : "text-muted-foreground hover:text-destructive"}`,
              "data-ocid": "story-like-btn",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.span,
                  {
                    animate: heartAnim ? { scale: [1, 1.5, 1] } : { scale: 1 },
                    transition: { duration: 0.4 },
                    className: "flex items-center",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: `w-4 h-4 ${liked ? "fill-current" : ""}` })
                  }
                ),
                optimisticLikes
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Helped by CropGuard AI" })
        ] })
      ]
    }
  );
}
function ShareStoryDialog() {
  const createStory = useCreateSuccessStory();
  const [open, setOpen] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState({
    authorName: "",
    cropType: "",
    diseaseName: "",
    before: "",
    after: "",
    treatment: ""
  });
  const [photoFile, setPhotoFile] = reactExports.useState(null);
  const [photoPreview, setPhotoPreview] = reactExports.useState(null);
  const [uploading, setUploading] = reactExports.useState(false);
  const fileInputRef = reactExports.useRef(null);
  const handlePhotoChange = (e) => {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!file) return;
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };
  const clearPhoto = () => {
    setPhotoFile(null);
    setPhotoPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.cropType || !form.diseaseName || !form.before || !form.after)
      return;
    setUploading(true);
    let photoUrl;
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
        photoUrl
      });
      setOpen(false);
      setForm({
        authorName: "",
        cropType: "",
        diseaseName: "",
        before: "",
        after: "",
        treatment: ""
      });
      clearPhoto();
    } finally {
      setUploading(false);
    }
  };
  const isPending = uploading || createStory.isPending;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "gap-2", "data-ocid": "share-story-btn", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
      "Share Your Story"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-lg max-h-[90vh] overflow-y-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(PenLine, { className: "w-5 h-5 text-primary" }),
        "Share Your Recovery Story"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4 mt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "story-author", children: "Your Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "story-author",
              placeholder: "e.g. Mary Johnson",
              value: form.authorName,
              onChange: (e) => setForm((f) => ({ ...f, authorName: e.target.value })),
              "data-ocid": "story-create-author"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "story-crop-select", children: "Crop Type *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: form.cropType,
                onValueChange: (v) => setForm((f) => ({ ...f, cropType: v })),
                required: true,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SelectTrigger,
                    {
                      id: "story-crop-select",
                      "data-ocid": "story-create-crop",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select crop…" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: CROP_TYPES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c, children: c }, c)) })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "disease-name", children: "Disease Name *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "disease-name",
                placeholder: "e.g. Late Blight",
                value: form.diseaseName,
                onChange: (e) => setForm((f) => ({ ...f, diseaseName: e.target.value })),
                required: true,
                "data-ocid": "story-create-disease"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ImagePlus, { className: "w-3.5 h-3.5" }),
            "Photo (optional)"
          ] }),
          photoPreview ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-lg overflow-hidden border border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: photoPreview,
                alt: "Story preview",
                className: "w-full object-cover",
                style: { maxHeight: 160 }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: clearPhoto,
                "aria-label": "Remove photo",
                className: "absolute top-2 right-2 w-7 h-7 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-smooth",
                "data-ocid": "story-photo-remove",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" })
              }
            )
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "label",
            {
              className: "flex items-center justify-center gap-2 w-full h-20 rounded-lg border-2 border-dashed border-border hover:border-primary/50 hover:bg-primary/3 bg-muted/30 cursor-pointer transition-smooth text-sm text-muted-foreground",
              "data-ocid": "story-photo-dropzone",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ImagePlus, { className: "w-4 h-4" }),
                "Add a before/after photo",
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    ref: fileInputRef,
                    type: "file",
                    accept: "image/jpeg,image/png,image/webp",
                    className: "sr-only",
                    onChange: handlePhotoChange,
                    "data-ocid": "story-photo-input"
                  }
                )
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "story-before", children: "Before — What happened? *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "story-before",
              placeholder: "Describe the symptoms and how bad it was before treatment…",
              rows: 3,
              value: form.before,
              onChange: (e) => setForm((f) => ({ ...f, before: e.target.value })),
              required: true,
              "data-ocid": "story-create-before"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "story-after", children: "After — How did it recover? *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "story-after",
              placeholder: "Describe how the crop recovered and what you saved…",
              rows: 3,
              value: form.after,
              onChange: (e) => setForm((f) => ({ ...f, after: e.target.value })),
              required: true,
              "data-ocid": "story-create-after"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "story-treatment", children: "Treatment Used" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "story-treatment",
              placeholder: "e.g. Mancozeb 75 WP spray, 2g/L, every 7 days for 3 applications",
              rows: 2,
              value: form.treatment,
              onChange: (e) => setForm((f) => ({ ...f, treatment: e.target.value })),
              "data-ocid": "story-create-treatment"
            }
          )
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
              disabled: isPending,
              "data-ocid": "story-create-submit",
              children: isPending ? "Sharing…" : "Share Story"
            }
          )
        ] })
      ] })
    ] })
  ] });
}
function SuccessStoriesPage() {
  const { data: stories, isLoading } = useSuccessStories();
  const displayStories = stories && stories.length > 0 ? stories : SAMPLE_STORIES;
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
              /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-4 h-4" }),
              "Success Stories"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-display-md text-foreground", children: "Farmers Who Saved Their Crops" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Real stories from farmers who identified diseases early and recovered successfully." })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ShareStoryDialog, {})
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-10 px-4 bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-4xl mx-auto", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: ["ss1", "ss2"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-64 rounded-lg" }, k)) }) : displayStories.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        className: "text-center py-20 card-social",
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        "data-ocid": "success-stories-empty-state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-5xl mb-4", children: "🌱" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-foreground mb-2", children: "No stories yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm max-w-xs mx-auto mb-5", children: "Be the first farmer to share your crop recovery journey and inspire others in the community." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 text-primary text-sm font-semibold", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Share your story above" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
          ] })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-5", children: displayStories.map((story, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(StoryCard, { story, index: i }, story.id)) }) }) }) })
  ] });
}
export {
  SuccessStoriesPage
};
