import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OfferList } from "@/components/offers/OfferList";
import { FilterBar } from "@/components/offers/FilterBar";
import { OfferDetailModal } from "@/components/offers/OfferDetailModal";

export interface OfferFilters {
  location: string;
  sector: string;
  contractType: string;
  priceRange: [number, number];
  housingType: string;
  furnished?: boolean;
}

const Offers = () => {
  const [activeTab, setActiveTab] = useState("stage");
  const [filters, setFilters] = useState<OfferFilters>({
    location: "",
    sector: "",
    contractType: "",
    priceRange: [0, 2000],
    housingType: "",
    furnished: undefined,
  });
  const [selectedOfferId, setSelectedOfferId] = useState<string | null>(null);

  const handleFilterChange = (newFilters: Partial<OfferFilters>) => {
    setFilters({ ...filters, ...newFilters });
  };

  return (
    <>
      {/* Hero Section Premium */}
      <section className="relative bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0 bg-gradient-subtle opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_70%)]" />
        <div className="relative container mx-auto px-4 py-24">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-cal font-bold text-white mb-8 animate-fade-in">
              Offres Étudiantes
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-12 animate-fade-in font-medium leading-relaxed">
              Découvrez les meilleures opportunités de stages, jobs et logements en Tunisie
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-white/80">
              <span className="bg-white/10 backdrop-blur-lg px-6 py-3 rounded-2xl border border-white/20 hover:bg-white/20 transition-smooth animate-float">
                🎯 Stages qualifiants
              </span>
              <span className="bg-white/10 backdrop-blur-lg px-6 py-3 rounded-2xl border border-white/20 hover:bg-white/20 transition-smooth animate-float" style={{animationDelay: '1s'}}>
                💼 Jobs étudiants
              </span>
              <span className="bg-white/10 backdrop-blur-lg px-6 py-3 rounded-2xl border border-white/20 hover:bg-white/20 transition-smooth animate-float" style={{animationDelay: '2s'}}>
                🏠 Logements abordables
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Navigation Premium */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-16">
            <TabsList className="bg-card/60 backdrop-blur-xl shadow-premium p-2 rounded-2xl border border-border/50">
              <TabsTrigger 
                value="stage" 
                className="data-[state=active]:bg-gradient-primary data-[state=active]:text-white data-[state=active]:shadow-elegant transition-spring rounded-xl px-8 py-4 font-medium"
              >
                Stages
              </TabsTrigger>
              <TabsTrigger 
                value="job" 
                className="data-[state=active]:bg-gradient-primary data-[state=active]:text-white data-[state=active]:shadow-elegant transition-spring rounded-xl px-8 py-4 font-medium"
              >
                Jobs Étudiants
              </TabsTrigger>
              <TabsTrigger 
                value="logement" 
                className="data-[state=active]:bg-gradient-primary data-[state=active]:text-white data-[state=active]:shadow-elegant transition-spring rounded-xl px-8 py-4 font-medium"
              >
                Logements
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Filter Bar */}
          <FilterBar 
            activeTab={activeTab as "stage" | "job" | "logement"}
            filters={filters}
            onFilterChange={handleFilterChange}
          />

          {/* Content for each tab */}
          <TabsContent value="stage">
            <OfferList 
              type="stage" 
              filters={filters}
              onOfferSelect={setSelectedOfferId}
            />
          </TabsContent>

          <TabsContent value="job">
            <OfferList 
              type="job" 
              filters={filters}
              onOfferSelect={setSelectedOfferId}
            />
          </TabsContent>

          <TabsContent value="logement">
            <OfferList 
              type="logement" 
              filters={filters}
              onOfferSelect={setSelectedOfferId}
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Modal for offer details */}
      <OfferDetailModal 
        offerId={selectedOfferId}
        isOpen={!!selectedOfferId}
        onClose={() => setSelectedOfferId(null)}
      />
    </>
  );
};

export default Offers;