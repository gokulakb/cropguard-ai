import { Badge } from "@/components/ui/badge";
import { ExternalLink, Search, TrendingUp } from "lucide-react";

interface MarketLink {
  label: string;
  url: string;
  source: string;
}

interface CropMarket {
  name: string;
  emoji: string;
  category: string;
  links: MarketLink[];
}

const MARKET_CROPS: CropMarket[] = [
  {
    name: "Rice",
    emoji: "🌾",
    category: "Cereal",
    links: [
      {
        label: "AgMarkNet Prices",
        url: "https://agmarknet.gov.in/SearchCmmMkt.aspx?Commodity=Rice",
        source: "agmarknet.gov.in",
      },
      {
        label: "Business Insider Markets",
        url: "https://markets.businessinsider.com/commodities/rice-price",
        source: "markets.businessinsider.com",
      },
      {
        label: "Trading Economics",
        url: "https://tradingeconomics.com/commodity/rice",
        source: "tradingeconomics.com",
      },
      {
        label: "Commodity Prices",
        url: "https://www.commodityprices.com/grains/rice-price/",
        source: "commodityprices.com",
      },
    ],
  },
  {
    name: "Wheat",
    emoji: "🌿",
    category: "Cereal",
    links: [
      {
        label: "AgMarkNet Prices",
        url: "https://agmarknet.gov.in/SearchCmmMkt.aspx?Commodity=Wheat",
        source: "agmarknet.gov.in",
      },
      {
        label: "Business Insider Markets",
        url: "https://markets.businessinsider.com/commodities/wheat-price",
        source: "markets.businessinsider.com",
      },
      {
        label: "Trading Economics",
        url: "https://tradingeconomics.com/commodity/wheat",
        source: "tradingeconomics.com",
      },
      {
        label: "Commodity Prices",
        url: "https://www.commodityprices.com/grains/wheat-price/",
        source: "commodityprices.com",
      },
    ],
  },
  {
    name: "Maize",
    emoji: "🌽",
    category: "Cereal",
    links: [
      {
        label: "AgMarkNet Prices",
        url: "https://agmarknet.gov.in/SearchCmmMkt.aspx?Commodity=Maize",
        source: "agmarknet.gov.in",
      },
      {
        label: "Business Insider Markets",
        url: "https://markets.businessinsider.com/commodities/corn-price",
        source: "markets.businessinsider.com",
      },
      {
        label: "Trading Economics",
        url: "https://tradingeconomics.com/commodity/corn",
        source: "tradingeconomics.com",
      },
      {
        label: "Commodity Prices",
        url: "https://www.commodityprices.com/grains/corn-price/",
        source: "commodityprices.com",
      },
    ],
  },
  {
    name: "Tomato",
    emoji: "🍅",
    category: "Vegetable",
    links: [
      {
        label: "AgMarkNet Prices",
        url: "https://agmarknet.gov.in/SearchCmmMkt.aspx?Commodity=Tomato",
        source: "agmarknet.gov.in",
      },
      {
        label: "Business Insider Markets",
        url: "https://markets.businessinsider.com/commodities",
        source: "markets.businessinsider.com",
      },
      {
        label: "Trading Economics",
        url: "https://tradingeconomics.com/commodity/tomatoes",
        source: "tradingeconomics.com",
      },
      {
        label: "Commodity Prices",
        url: "https://www.commodityprices.com/",
        source: "commodityprices.com",
      },
    ],
  },
  {
    name: "Potato",
    emoji: "🥔",
    category: "Vegetable",
    links: [
      {
        label: "AgMarkNet Prices",
        url: "https://agmarknet.gov.in/SearchCmmMkt.aspx?Commodity=Potato",
        source: "agmarknet.gov.in",
      },
      {
        label: "Business Insider Markets",
        url: "https://markets.businessinsider.com/commodities",
        source: "markets.businessinsider.com",
      },
      {
        label: "Trading Economics",
        url: "https://tradingeconomics.com/commodity/potatoes",
        source: "tradingeconomics.com",
      },
      {
        label: "Commodity Prices",
        url: "https://www.commodityprices.com/",
        source: "commodityprices.com",
      },
    ],
  },
  {
    name: "Cotton",
    emoji: "🌸",
    category: "Cash Crop",
    links: [
      {
        label: "AgMarkNet Prices",
        url: "https://agmarknet.gov.in/SearchCmmMkt.aspx?Commodity=Cotton",
        source: "agmarknet.gov.in",
      },
      {
        label: "Business Insider Markets",
        url: "https://markets.businessinsider.com/commodities/cotton-price",
        source: "markets.businessinsider.com",
      },
      {
        label: "Trading Economics",
        url: "https://tradingeconomics.com/commodity/cotton",
        source: "tradingeconomics.com",
      },
      {
        label: "Commodity Prices",
        url: "https://www.commodityprices.com/textiles/cotton-price/",
        source: "commodityprices.com",
      },
    ],
  },
  {
    name: "Sugarcane",
    emoji: "🎋",
    category: "Cash Crop",
    links: [
      {
        label: "AgMarkNet Prices",
        url: "https://agmarknet.gov.in/SearchCmmMkt.aspx?Commodity=Sugarcane",
        source: "agmarknet.gov.in",
      },
      {
        label: "Business Insider Markets",
        url: "https://markets.businessinsider.com/commodities/sugar-price",
        source: "markets.businessinsider.com",
      },
      {
        label: "Trading Economics",
        url: "https://tradingeconomics.com/commodity/sugar",
        source: "tradingeconomics.com",
      },
      {
        label: "Commodity Prices",
        url: "https://www.commodityprices.com/sugar/sugar-price/",
        source: "commodityprices.com",
      },
    ],
  },
  {
    name: "Soybean",
    emoji: "🫘",
    category: "Pulse",
    links: [
      {
        label: "AgMarkNet Prices",
        url: "https://agmarknet.gov.in/SearchCmmMkt.aspx?Commodity=Soyabean",
        source: "agmarknet.gov.in",
      },
      {
        label: "Business Insider Markets",
        url: "https://markets.businessinsider.com/commodities/soybeans-price",
        source: "markets.businessinsider.com",
      },
      {
        label: "Trading Economics",
        url: "https://tradingeconomics.com/commodity/soybeans",
        source: "tradingeconomics.com",
      },
      {
        label: "Commodity Prices",
        url: "https://www.commodityprices.com/oilseeds/soybean-price/",
        source: "commodityprices.com",
      },
    ],
  },
  {
    name: "Onion",
    emoji: "🧅",
    category: "Vegetable",
    links: [
      {
        label: "AgMarkNet Prices",
        url: "https://agmarknet.gov.in/SearchCmmMkt.aspx?Commodity=Onion",
        source: "agmarknet.gov.in",
      },
      {
        label: "Business Insider Markets",
        url: "https://markets.businessinsider.com/commodities",
        source: "markets.businessinsider.com",
      },
      {
        label: "Trading Economics",
        url: "https://tradingeconomics.com/commodity/onions",
        source: "tradingeconomics.com",
      },
      {
        label: "Commodity Prices",
        url: "https://www.commodityprices.com/",
        source: "commodityprices.com",
      },
    ],
  },
  {
    name: "Chili",
    emoji: "🌶️",
    category: "Spice",
    links: [
      {
        label: "AgMarkNet Prices",
        url: "https://agmarknet.gov.in/SearchCmmMkt.aspx?Commodity=Chilli",
        source: "agmarknet.gov.in",
      },
      {
        label: "Business Insider Markets",
        url: "https://markets.businessinsider.com/commodities",
        source: "markets.businessinsider.com",
      },
      {
        label: "Trading Economics",
        url: "https://tradingeconomics.com/commodity/chilli-pepper",
        source: "tradingeconomics.com",
      },
      {
        label: "Commodity Prices",
        url: "https://www.commodityprices.com/",
        source: "commodityprices.com",
      },
    ],
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  Cereal: "badge-info",
  Vegetable: "badge-success",
  "Cash Crop": "badge-warning",
  Pulse: "badge-social",
  Spice: "badge-warning",
};

export function MarketPricesPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-label text-muted-foreground mb-2">
          <TrendingUp className="w-4 h-4" />
          <span>Agricultural Tools</span>
        </div>
        <h1 className="text-display-md font-display">Market Price Tracker</h1>
        <p className="text-muted-foreground text-base max-w-2xl">
          Access real-time crop market prices from trusted sources. Each card
          links directly to live price data — data is sourced from external
          markets and updated continuously.
        </p>
      </div>

      {/* Info Banner */}
      <div className="card-data flex items-start gap-3 bg-info/5 border-info/25">
        <TrendingUp className="w-5 h-5 text-info shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-sm">Live Market Data</p>
          <p className="text-muted-foreground text-sm mt-0.5">
            All links open real-time price pages from third-party agricultural
            market platforms. Prices reflect current or recent market data and
            vary by region and quality grade.
          </p>
        </div>
      </div>

      {/* Crop Grid */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        data-ocid="market-crop-grid"
      >
        {MARKET_CROPS.map((crop) => (
          <div
            key={crop.name}
            className="card-data space-y-4 hover:shadow-elevated"
          >
            {/* Card Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{crop.emoji}</span>
                <div>
                  <h3 className="font-display font-semibold text-base">
                    {crop.name}
                  </h3>
                  <Badge
                    className={`${CATEGORY_COLORS[crop.category] ?? "badge-info"} text-[10px] mt-0.5`}
                  >
                    {crop.category}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Market Links */}
            <div className="space-y-2">
              {crop.links.map((link) => (
                <a
                  key={link.source}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-3 py-2 rounded-md bg-muted hover:bg-primary/5 hover:border-primary/20 border border-transparent transition-smooth text-sm group"
                  data-ocid={`market-link-${crop.name.toLowerCase()}-${link.source.split(".")[0]}`}
                >
                  <span className="text-foreground group-hover:text-primary transition-smooth truncate min-w-0">
                    {link.label}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary shrink-0 ml-2 transition-smooth" />
                </a>
              ))}
            </div>

            {/* Google Search Link */}
            <a
              href={`https://www.google.com/search?q=live+${encodeURIComponent(crop.name)}+crop+price+today`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs text-primary hover:text-primary/80 transition-smooth pt-1 border-t border-border"
              data-ocid={`market-google-${crop.name.toLowerCase()}`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search live {crop.name} prices on Google</span>
              <ExternalLink className="w-3 h-3 ml-auto" />
            </a>
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-muted-foreground text-center pb-4">
        CropGuard AI does not endorse any specific market platform. All prices
        are sourced from independent third-party services and may vary by
        region, variety, and time of access.
      </p>
    </div>
  );
}
