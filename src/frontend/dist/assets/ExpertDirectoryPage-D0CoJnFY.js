import { c as createLucideIcon, r as reactExports, aa as useExpertContacts, j as jsxRuntimeExports, m as motion, _ as Users, f as Skeleton, B as Button, ab as UserCheck, M as MapPin } from "./index-DQmXo4u-.js";
import { I as Input } from "./input-CXyKGE_g.js";
import { S as Search } from "./search-CCmCE1ON.js";
import { I as Info } from "./info-tiYQ34ap.js";
import { P as Phone } from "./phone-CCbQMNPb.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7", key: "132q7q" }],
  ["rect", { x: "2", y: "4", width: "20", height: "16", rx: "2", key: "izxlao" }]
];
const Mail = createLucideIcon("mail", __iconNode);
const SAMPLE_EXPERTS = [
  {
    id: "e1",
    name: "Dr. Amara Nwosu",
    region: "North",
    district: "Kaduna",
    specialization: "Plant Pathology & Cereal Crops",
    phone: "+234 802 111 0001",
    email: "a.nwosu@agriext.gov.ng",
    available: true
  },
  {
    id: "e2",
    name: "Mrs. Grace Osei",
    region: "South",
    district: "Abia",
    specialization: "Vegetable & Root Crop Diseases",
    phone: "+234 803 222 0002",
    email: "g.osei@agriext.gov.ng",
    available: true
  },
  {
    id: "e3",
    name: "Mr. Kofi Mensah",
    region: "East",
    district: "Enugu",
    specialization: "Soil Health & Fertilization",
    phone: "+234 804 333 0003",
    email: "k.mensah@agriext.gov.ng",
    available: false
  },
  {
    id: "e4",
    name: "Dr. Fatima Bello",
    region: "West",
    district: "Oyo",
    specialization: "Pest Management & Integrated Control",
    phone: "+234 805 444 0004",
    email: "f.bello@agriext.gov.ng",
    available: true
  },
  {
    id: "e5",
    name: "Mr. Samuel Eze",
    region: "Central",
    district: "Niger",
    specialization: "Irrigation & Water Management",
    phone: "+234 806 555 0005",
    email: "s.eze@agriext.gov.ng",
    available: false
  },
  {
    id: "e6",
    name: "Mrs. Blessing Adeyemi",
    region: "South",
    district: "Lagos",
    specialization: "Post-Harvest & Storage",
    phone: "+234 807 666 0006",
    email: "b.adeyemi@agriext.gov.ng",
    available: true
  }
];
function ExpertCard({
  expert,
  index
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      className: "card-data flex flex-col gap-3 hover:shadow-elevated",
      initial: { opacity: 0, y: 16 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.35, delay: index * 0.05 },
      "data-ocid": "expert-card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: "w-5 h-5 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground truncate", children: expert.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: expert.specialization })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: expert.available ? "badge-success flex-shrink-0" : "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-muted text-muted-foreground border border-border flex-shrink-0",
              children: expert.available ? "Available" : "Unavailable"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3.5 h-3.5 flex-shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            expert.district,
            " · ",
            expert.region,
            " Region"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5 mt-auto pt-2 border-t border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: `tel:${expert.phone}`,
              className: "flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors",
              "data-ocid": "expert-phone-link",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3.5 h-3.5" }),
                expert.phone
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: `mailto:${expert.email}`,
              className: "flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors truncate",
              "data-ocid": "expert-email-link",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-3.5 h-3.5 flex-shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: expert.email })
              ]
            }
          )
        ] })
      ]
    }
  );
}
function ExpertDirectoryPage() {
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const { data: experts, isLoading } = useExpertContacts(searchQuery);
  const displayExperts = experts && experts.length > 0 ? experts : SAMPLE_EXPERTS.filter(
    (e) => !searchQuery || e.region.toLowerCase().includes(searchQuery.toLowerCase()) || e.district.toLowerCase().includes(searchQuery.toLowerCase()) || e.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-card border-b border-border py-10 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-4xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.45 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-3 border border-primary/20", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4" }),
            "Expert Directory"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-display-md text-foreground mb-2", children: "Agricultural Extension Officers" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6 max-w-xl", children: "Find accredited agricultural officers in your region for professional advice on crop disease, pest management, and soil health." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                className: "pl-9",
                placeholder: "Search by region or name…",
                value: searchQuery,
                onChange: (e) => setSearchQuery(e.target.value),
                "data-ocid": "expert-search-input"
              }
            )
          ] })
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-10 px-4 bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-5xl mx-auto", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: ["s1", "s2", "s3", "s4", "s5", "s6"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48 rounded-lg" }, k)) }) : displayExperts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        className: "text-center py-20",
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        "data-ocid": "expert-empty-state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-5xl mb-4", children: "🔍" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-lg font-semibold text-foreground mb-2", children: [
            'No experts found in "',
            searchQuery,
            '"'
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm max-w-xs mx-auto", children: "Try a different region name or browse all experts by clearing your search." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              className: "mt-4",
              onClick: () => setSearchQuery(""),
              children: "Clear search"
            }
          )
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: displayExperts.map((expert, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ExpertCard, { expert, index: i }, expert.id)) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-8 px-4 bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-3xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-data flex items-start gap-3 border-info/20 bg-info/5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "w-5 h-5 text-info flex-shrink-0 mt-0.5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground mb-1", children: "Know an agricultural expert not listed here?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Help your community grow — contact your regional agricultural extension office to nominate an officer for inclusion in this directory. Together, we make expert support more accessible." })
      ] })
    ] }) }) })
  ] });
}
export {
  ExpertDirectoryPage
};
