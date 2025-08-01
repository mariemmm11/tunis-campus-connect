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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Offres Étudiantes</h1>
          <p className="text-lg opacity-90">
            Découvrez les meilleures opportunités de stages, jobs et logements en Tunisie
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger 
              value="stage" 
              className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
            >
              Stages
            </TabsTrigger>
            <TabsTrigger 
              value="job" 
              className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
            >
              Jobs Étudiants
            </TabsTrigger>
            <TabsTrigger 
              value="logement" 
              className="data-[state=active]:bg-purple-500 data-[state=active]:text-white"
            >
              Logements
            </TabsTrigger>
          </TabsList>

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
    </div>
  );
};

export default Offers;