import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useExpertContacts } from "@/hooks/use-backend";
import type { ExpertContact } from "@/types";
import {
  Info,
  Mail,
  MapPin,
  Phone,
  Search,
  UserCheck,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

// ─── Fallback sample data ─────────────────────────────────────────────────────

const SAMPLE_EXPERTS: ExpertContact[] = [
  {
    id: "e1",
    name: "Dr. Amara Nwosu",
    region: "North",
    district: "Kaduna",
    specialization: "Plant Pathology & Cereal Crops",
    phone: "+234 802 111 0001",
    email: "a.nwosu@agriext.gov.ng",
    available: true,
  },
  {
    id: "e2",
    name: "Mrs. Grace Osei",
    region: "South",
    district: "Abia",
    specialization: "Vegetable & Root Crop Diseases",
    phone: "+234 803 222 0002",
    email: "g.osei@agriext.gov.ng",
    available: true,
  },
  {
    id: "e3",
    name: "Mr. Kofi Mensah",
    region: "East",
    district: "Enugu",
    specialization: "Soil Health & Fertilization",
    phone: "+234 804 333 0003",
    email: "k.mensah@agriext.gov.ng",
    available: false,
  },
  {
    id: "e4",
    name: "Dr. Fatima Bello",
    region: "West",
    district: "Oyo",
    specialization: "Pest Management & Integrated Control",
    phone: "+234 805 444 0004",
    email: "f.bello@agriext.gov.ng",
    available: true,
  },
  {
    id: "e5",
    name: "Mr. Samuel Eze",
    region: "Central",
    district: "Niger",
    specialization: "Irrigation & Water Management",
    phone: "+234 806 555 0005",
    email: "s.eze@agriext.gov.ng",
    available: false,
  },
  {
    id: "e6",
    name: "Mrs. Blessing Adeyemi",
    region: "South",
    district: "Lagos",
    specialization: "Post-Harvest & Storage",
    phone: "+234 807 666 0006",
    email: "b.adeyemi@agriext.gov.ng",
    available: true,
  },
];

function ExpertCard({
  expert,
  index,
}: { expert: ExpertContact; index: number }) {
  return (
    <motion.div
      className="card-data flex flex-col gap-3 hover:shadow-elevated"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      data-ocid="expert-card"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <UserCheck className="w-5 h-5 text-primary" />
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-foreground truncate">
              {expert.name}
            </h3>
            <p className="text-xs text-muted-foreground truncate">
              {expert.specialization}
            </p>
          </div>
        </div>
        <span
          className={
            expert.available
              ? "badge-success flex-shrink-0"
              : "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-muted text-muted-foreground border border-border flex-shrink-0"
          }
        >
          {expert.available ? "Available" : "Unavailable"}
        </span>
      </div>

      {/* Location */}
      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
        <span>
          {expert.district} · {expert.region} Region
        </span>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-1.5 mt-auto pt-2 border-t border-border">
        <a
          href={`tel:${expert.phone}`}
          className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
          data-ocid="expert-phone-link"
        >
          <Phone className="w-3.5 h-3.5" />
          {expert.phone}
        </a>
        <a
          href={`mailto:${expert.email}`}
          className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors truncate"
          data-ocid="expert-email-link"
        >
          <Mail className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="truncate">{expert.email}</span>
        </a>
      </div>
    </motion.div>
  );
}

export function ExpertDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: experts, isLoading } = useExpertContacts(searchQuery);

  const displayExperts: ExpertContact[] =
    experts && experts.length > 0
      ? experts
      : SAMPLE_EXPERTS.filter(
          (e) =>
            !searchQuery ||
            e.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
            e.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
            e.name.toLowerCase().includes(searchQuery.toLowerCase()),
        );

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-card border-b border-border py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-3 border border-primary/20">
              <Users className="w-4 h-4" />
              Expert Directory
            </div>
            <h1 className="text-display-md text-foreground mb-2">
              Agricultural Extension Officers
            </h1>
            <p className="text-muted-foreground mb-6 max-w-xl">
              Find accredited agricultural officers in your region for
              professional advice on crop disease, pest management, and soil
              health.
            </p>
            {/* Search */}
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                className="pl-9"
                placeholder="Search by region or name…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-ocid="expert-search-input"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-10 px-4 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {["s1", "s2", "s3", "s4", "s5", "s6"].map((k) => (
                <Skeleton key={k} className="h-48 rounded-lg" />
              ))}
            </div>
          ) : displayExperts.length === 0 ? (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              data-ocid="expert-empty-state"
            >
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No experts found in "{searchQuery}"
              </h3>
              <p className="text-muted-foreground text-sm max-w-xs mx-auto">
                Try a different region name or browse all experts by clearing
                your search.
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => setSearchQuery("")}
              >
                Clear search
              </Button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {displayExperts.map((expert, i) => (
                <ExpertCard key={expert.id} expert={expert} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Suggest note */}
      <section className="py-8 px-4 bg-background">
        <div className="max-w-3xl mx-auto">
          <div className="card-data flex items-start gap-3 border-info/20 bg-info/5">
            <Info className="w-5 h-5 text-info flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-foreground mb-1">
                Know an agricultural expert not listed here?
              </p>
              <p className="text-sm text-muted-foreground">
                Help your community grow — contact your regional agricultural
                extension office to nominate an officer for inclusion in this
                directory. Together, we make expert support more accessible.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
