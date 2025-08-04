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
    <>
      {/* Hero Section Premium */}
      <section className="relative bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0 bg-gradient-subtle opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_70%)]" />
        <div className="relative container mx-auto px-4 py-24">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-cal font-bold text-white mb-8 animate-fade-in">
              Événements Étudiants
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-12 animate-fade-in font-medium leading-relaxed">
              Découvrez les salons, journées portes ouvertes et conférences en Tunisie
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-white/80">
              <span className="bg-white/10 backdrop-blur-lg px-6 py-3 rounded-2xl border border-white/20 hover:bg-white/20 transition-smooth animate-float">
                🎪 Salons étudiants
              </span>
              <span className="bg-white/10 backdrop-blur-lg px-6 py-3 rounded-2xl border border-white/20 hover:bg-white/20 transition-smooth animate-float" style={{animationDelay: '1s'}}>
                🚪 Journées portes ouvertes
              </span>
              <span className="bg-white/10 backdrop-blur-lg px-6 py-3 rounded-2xl border border-white/20 hover:bg-white/20 transition-smooth animate-float" style={{animationDelay: '2s'}}>
                🎤 Conférences
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
                value="salon" 
                className="data-[state=active]:bg-gradient-primary data-[state=active]:text-white data-[state=active]:shadow-elegant transition-spring rounded-xl px-8 py-4 font-medium"
              >
                Salons
              </TabsTrigger>
              <TabsTrigger 
                value="jpo" 
                className="data-[state=active]:bg-gradient-primary data-[state=active]:text-white data-[state=active]:shadow-elegant transition-spring rounded-xl px-8 py-4 font-medium"
              >
                Journées Portes Ouvertes
              </TabsTrigger>
              <TabsTrigger 
                value="conference" 
                className="data-[state=active]:bg-gradient-primary data-[state=active]:text-white data-[state=active]:shadow-elegant transition-spring rounded-xl px-8 py-4 font-medium"
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
    </>
  );
};

export default Events;