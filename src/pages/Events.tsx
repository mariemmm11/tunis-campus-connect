import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EventList } from "@/components/events/EventList";
import { EventFilterBar } from "@/components/events/EventFilterBar";
import { EventDetailModal } from "@/components/events/EventDetailModal";

export interface EventFilters {
  location: string;
  dateRange: [Date | null, Date | null];
  organizer: string;
}

const Events = () => {
  const [activeTab, setActiveTab] = useState("salon");
  const [filters, setFilters] = useState<EventFilters>({
    location: "",
    dateRange: [null, null],
    organizer: "",
  });
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const handleFilterChange = (newFilters: Partial<EventFilters>) => {
    setFilters({ ...filters, ...newFilters });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary-glow to-secondary overflow-hidden">
        <div className="absolute inset-0 bg-gradient-subtle opacity-40" />
        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
              Événements Étudiants
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 animate-fade-in">
              Découvrez les salons, journées portes ouvertes et conférences en Tunisie
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-white/80">
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                🎪 Salons étudiants
              </span>
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                🚪 Journées portes ouvertes
              </span>
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                🎤 Conférences
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
                value="salon" 
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all duration-300 rounded-lg px-6 py-3"
              >
                Salons
              </TabsTrigger>
              <TabsTrigger 
                value="jpo" 
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all duration-300 rounded-lg px-6 py-3"
              >
                Journées Portes Ouvertes
              </TabsTrigger>
              <TabsTrigger 
                value="conference" 
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all duration-300 rounded-lg px-6 py-3"
              >
                Conférences
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Filter Bar */}
          <EventFilterBar 
            activeTab={activeTab as "salon" | "jpo" | "conference"}
            filters={filters}
            onFilterChange={handleFilterChange}
          />

          {/* Content for each tab */}
          <TabsContent value="salon">
            <EventList 
              type="salon" 
              filters={filters}
              onEventSelect={setSelectedEventId}
            />
          </TabsContent>

          <TabsContent value="jpo">
            <EventList 
              type="jpo" 
              filters={filters}
              onEventSelect={setSelectedEventId}
            />
          </TabsContent>

          <TabsContent value="conference">
            <EventList 
              type="conference" 
              filters={filters}
              onEventSelect={setSelectedEventId}
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Modal for event details */}
      <EventDetailModal 
        eventId={selectedEventId}
        isOpen={!!selectedEventId}
        onClose={() => setSelectedEventId(null)}
      />
    </div>
  );
};

export default Events;