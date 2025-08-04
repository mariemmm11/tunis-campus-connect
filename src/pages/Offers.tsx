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
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary-glow to-secondary overflow-hidden">
        <div className="absolute inset-0 bg-gradient-subtle opacity-40" />
        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
              Offres Étudiantes
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 animate-fade-in">
              Découvrez les meilleures opportunités de stages, jobs et logements en Tunisie
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-white/80">
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                🎯 Stages qualifiants
              </span>
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                💼 Jobs étudiants
              </span>
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                🏠 Logements abordables
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Section Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-12">
            <TabsList className="bg-card shadow-elegant p-1 rounded-xl">
              <TabsTrigger 
                value="stage" 
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all duration-300 rounded-lg px-6 py-3"
              >
                Stages
              </TabsTrigger>
              <TabsTrigger 
                value="job" 
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all duration-300 rounded-lg px-6 py-3"
              >
                Jobs Étudiants
              </TabsTrigger>
              <TabsTrigger 
                value="logement" 
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all duration-300 rounded-lg px-6 py-3"
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