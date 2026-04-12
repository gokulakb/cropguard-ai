import { j as jsxRuntimeExports, T as TrendingUp } from "./index-DQmXo4u-.js";
import { B as Badge } from "./badge-xsDIYR3X.js";
import { E as ExternalLink } from "./external-link-DVb9Rp4s.js";
import { S as Search } from "./search-CCmCE1ON.js";
const MARKET_CROPS = [
  {
    name: "Rice",
    emoji: "🌾",
    category: "Cereal",
    links: [
      {
        label: "AgMarkNet Prices",
        url: "https://agmarknet.gov.in/SearchCmmMkt.aspx?Commodity=Rice",
        source: "agmarknet.gov.in"
      },
      {
        label: "Business Insider Markets",
        url: "https://markets.businessinsider.com/commodities/rice-price",
        source: "markets.businessinsider.com"
      },
      {
        label: "Trading Economics",
        url: "https://tradingeconomics.com/commodity/rice",
        source: "tradingeconomics.com"
      },
      {
        label: "Commodity Prices",
        url: "https://www.commodityprices.com/grains/rice-price/",
        source: "commodityprices.com"
      }
    ]
  },
  {
    name: "Wheat",
    emoji: "🌿",
    category: "Cereal",
    links: [
      {
        label: "AgMarkNet Prices",
        url: "https://agmarknet.gov.in/SearchCmmMkt.aspx?Commodity=Wheat",
        source: "agmarknet.gov.in"
      },
      {
        label: "Business Insider Markets",
        url: "https://markets.businessinsider.com/commodities/wheat-price",
        source: "markets.businessinsider.com"
      },
      {
        label: "Trading Economics",
        url: "https://tradingeconomics.com/commodity/wheat",
        source: "tradingeconomics.com"
      },
      {
        label: "Commodity Prices",
        url: "https://www.commodityprices.com/grains/wheat-price/",
        source: "commodityprices.com"
      }
    ]
  },
  {
    name: "Maize",
    emoji: "🌽",
    category: "Cereal",
    links: [
      {
        label: "AgMarkNet Prices",
        url: "https://agmarknet.gov.in/SearchCmmMkt.aspx?Commodity=Maize",
        source: "agmarknet.gov.in"
      },
      {
        label: "Business Insider Markets",
        url: "https://markets.businessinsider.com/commodities/corn-price",
        source: "markets.businessinsider.com"
      },
      {
        label: "Trading Economics",
        url: "https://tradingeconomics.com/commodity/corn",
        source: "tradingeconomics.com"
      },
      {
        label: "Commodity Prices",
        url: "https://www.commodityprices.com/grains/corn-price/",
        source: "commodityprices.com"
      }
    ]
  },
  {
    name: "Tomato",
    emoji: "🍅",
    category: "Vegetable",
    links: [
      {
        label: "AgMarkNet Prices",
        url: "https://agmarknet.gov.in/SearchCmmMkt.aspx?Commodity=Tomato",
        source: "agmarknet.gov.in"
      },
      {
        label: "Business Insider Markets",
        url: "https://markets.businessinsider.com/commodities",
        source: "markets.businessinsider.com"
      },
      {
        label: "Trading Economics",
        url: "https://tradingeconomics.com/commodity/tomatoes",
        source: "tradingeconomics.com"
      },
      {
        label: "Commodity Prices",
        url: "https://www.commodityprices.com/",
        source: "commodityprices.com"
      }
    ]
  },
  {
    name: "Potato",
    emoji: "🥔",
    category: "Vegetable",
    links: [
      {
        label: "AgMarkNet Prices",
        url: "https://agmarknet.gov.in/SearchCmmMkt.aspx?Commodity=Potato",
        source: "agmarknet.gov.in"
      },
      {
        label: "Business Insider Markets",
        url: "https://markets.businessinsider.com/commodities",
        source: "markets.businessinsider.com"
      },
      {
        label: "Trading Economics",
        url: "https://tradingeconomics.com/commodity/potatoes",
        source: "tradingeconomics.com"
      },
      {
        label: "Commodity Prices",
        url: "https://www.commodityprices.com/",
        source: "commodityprices.com"
      }
    ]
  },
  {
    name: "Cotton",
    emoji: "🌸",
    category: "Cash Crop",
    links: [
      {
        label: "AgMarkNet Prices",
        url: "https://agmarknet.gov.in/SearchCmmMkt.aspx?Commodity=Cotton",
        source: "agmarknet.gov.in"
      },
      {
        label: "Business Insider Markets",
        url: "https://markets.businessinsider.com/commodities/cotton-price",
        source: "markets.businessinsider.com"
      },
      {
        label: "Trading Economics",
        url: "https://tradingeconomics.com/commodity/cotton",
        source: "tradingeconomics.com"
      },
      {
        label: "Commodity Prices",
        url: "https://www.commodityprices.com/textiles/cotton-price/",
        source: "commodityprices.com"
      }
    ]
  },
  {
    name: "Sugarcane",
    emoji: "🎋",
    category: "Cash Crop",
    links: [
      {
        label: "AgMarkNet Prices",
        url: "https://agmarknet.gov.in/SearchCmmMkt.aspx?Commodity=Sugarcane",
        source: "agmarknet.gov.in"
      },
      {
        label: "Business Insider Markets",
        url: "https://markets.businessinsider.com/commodities/sugar-price",
        source: "markets.businessinsider.com"
      },
      {
        label: "Trading Economics",
        url: "https://tradingeconomics.com/commodity/sugar",
        source: "tradingeconomics.com"
      },
      {
        label: "Commodity Prices",
        url: "https://www.commodityprices.com/sugar/sugar-price/",
        source: "commodityprices.com"
      }
    ]
  },
  {
    name: "Soybean",
    emoji: "🫘",
    category: "Pulse",
    links: [
      {
        label: "AgMarkNet Prices",
        url: "https://agmarknet.gov.in/SearchCmmMkt.aspx?Commodity=Soyabean",
        source: "agmarknet.gov.in"
      },
      {
        label: "Business Insider Markets",
        url: "https://markets.businessinsider.com/commodities/soybeans-price",
        source: "markets.businessinsider.com"
      },
      {
        label: "Trading Economics",
        url: "https://tradingeconomics.com/commodity/soybeans",
        source: "tradingeconomics.com"
      },
      {
        label: "Commodity Prices",
        url: "https://www.commodityprices.com/oilseeds/soybean-price/",
        source: "commodityprices.com"
      }
    ]
  },
  {
    name: "Onion",
    emoji: "🧅",
    category: "Vegetable",
    links: [
      {
        label: "AgMarkNet Prices",
        url: "https://agmarknet.gov.in/SearchCmmMkt.aspx?Commodity=Onion",
        source: "agmarknet.gov.in"
      },
      {
        label: "Business Insider Markets",
        url: "https://markets.businessinsider.com/commodities",
        source: "markets.businessinsider.com"
      },
      {
        label: "Trading Economics",
        url: "https://tradingeconomics.com/commodity/onions",
        source: "tradingeconomics.com"
      },
      {
        label: "Commodity Prices",
        url: "https://www.commodityprices.com/",
        source: "commodityprices.com"
      }
    ]
  },
  {
    name: "Chili",
    emoji: "🌶️",
    category: "Spice",
    links: [
      {
        label: "AgMarkNet Prices",
        url: "https://agmarknet.gov.in/SearchCmmMkt.aspx?Commodity=Chilli",
        source: "agmarknet.gov.in"
      },
      {
        label: "Business Insider Markets",
        url: "https://markets.businessinsider.com/commodities",
        source: "markets.businessinsider.com"
      },
      {
        label: "Trading Economics",
        url: "https://tradingeconomics.com/commodity/chilli-pepper",
        source: "tradingeconomics.com"
      },
      {
        label: "Commodity Prices",
        url: "https://www.commodityprices.com/",
        source: "commodityprices.com"
      }
    ]
  }
];
const CATEGORY_COLORS = {
  Cereal: "badge-info",
  Vegetable: "badge-success",
  "Cash Crop": "badge-warning",
  Pulse: "badge-social",
  Spice: "badge-warning"
};
function MarketPricesPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-4 py-8 space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-label text-muted-foreground mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Agricultural Tools" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-display-md font-display", children: "Market Price Tracker" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-base max-w-2xl", children: "Access real-time crop market prices from trusted sources. Each card links directly to live price data — data is sourced from external markets and updated continuously." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-data flex items-start gap-3 bg-info/5 border-info/25", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-5 h-5 text-info shrink-0 mt-0.5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm", children: "Live Market Data" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-0.5", children: "All links open real-time price pages from third-party agricultural market platforms. Prices reflect current or recent market data and vary by region and quality grade." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5",
        "data-ocid": "market-crop-grid",
        children: MARKET_CROPS.map((crop) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "card-data space-y-4 hover:shadow-elevated",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl", children: crop.emoji }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-base", children: crop.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      className: `${CATEGORY_COLORS[crop.category] ?? "badge-info"} text-[10px] mt-0.5`,
                      children: crop.category
                    }
                  )
                ] })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: crop.links.map((link) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "a",
                {
                  href: link.url,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "flex items-center justify-between px-3 py-2 rounded-md bg-muted hover:bg-primary/5 hover:border-primary/20 border border-transparent transition-smooth text-sm group",
                  "data-ocid": `market-link-${crop.name.toLowerCase()}-${link.source.split(".")[0]}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground group-hover:text-primary transition-smooth truncate min-w-0", children: link.label }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3.5 h-3.5 text-muted-foreground group-hover:text-primary shrink-0 ml-2 transition-smooth" })
                  ]
                },
                link.source
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "a",
                {
                  href: `https://www.google.com/search?q=live+${encodeURIComponent(crop.name)}+crop+price+today`,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "flex items-center gap-2 text-xs text-primary hover:text-primary/80 transition-smooth pt-1 border-t border-border",
                  "data-ocid": `market-google-${crop.name.toLowerCase()}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-3.5 h-3.5" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      "Search live ",
                      crop.name,
                      " prices on Google"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3 h-3 ml-auto" })
                  ]
                }
              )
            ]
          },
          crop.name
        ))
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center pb-4", children: "CropGuard AI does not endorse any specific market platform. All prices are sourced from independent third-party services and may vary by region, variety, and time of access." })
  ] });
}
export {
  MarketPricesPage
};
