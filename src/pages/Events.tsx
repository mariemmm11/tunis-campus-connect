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
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Événements Étudiants</h1>
          <p className="text-lg opacity-90">
            Découvrez les salons, journées portes ouvertes et conférences en Tunisie
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger 
              value="salon" 
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
            >
              Salons
            </TabsTrigger>
            <TabsTrigger 
              value="jpo" 
              className="data-[state=active]:bg-teal-500 data-[state=active]:text-white"
            >
              Journées Portes Ouvertes
            </TabsTrigger>
            <TabsTrigger 
              value="conference" 
              className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white"
            >
              Conférences
            </TabsTrigger>
          </TabsList>

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