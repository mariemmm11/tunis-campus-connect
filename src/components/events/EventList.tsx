import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { EventCard } from "./EventCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";
import { EventFilters } from "@/pages/Events";

interface Event {
  id: string;
  title: string;
  type: "salon" | "jpo" | "conference" | "atelier";
  location?: string;
  description?: string;
  organizer?: string;
  date_start: string;
  date_end?: string;
  website_url?: string;
  created_at: string;
}

interface EventListProps {
  type: "salon" | "jpo" | "conference";
  filters: EventFilters;
  onEventSelect: (eventId: string) => void;
}

const ITEMS_PER_PAGE = 12;

export const EventList = ({ type, filters, onEventSelect }: EventListProps) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    fetchEvents();
  }, [type, filters, currentPage]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from("events")
        .select("*", { count: "exact" })
        .eq("type", type)
        .order("date_start", { ascending: true });

      // Apply filters
      if (filters.location) {
        query = query.ilike("location", `%${filters.location}%`);
      }

      if (filters.organizer) {
        query = query.ilike("organizer", `%${filters.organizer}%`);
      }

      if (filters.dateRange[0]) {
        query = query.gte("date_start", filters.dateRange[0].toISOString());
      }

      if (filters.dateRange[1]) {
        const endDate = new Date(filters.dateRange[1]);
        endDate.setHours(23, 59, 59, 999);
        query = query.lte("date_start", endDate.toISOString());
      }

      // Pagination
      const from = (currentPage - 1) * ITEMS_PER_PAGE;
      const to = from + ITEMS_PER_PAGE - 1;
      query = query.range(from, to);

      const { data, error: fetchError, count } = await query;

      if (fetchError) {
        throw fetchError;
      }

      setEvents(data || []);
      setTotalCount(count || 0);
    } catch (err) {
      console.error("Error fetching events:", err);
      setError("Erreur lors du chargement des événements");
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-48 w-full rounded-lg" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <AlertCircle className="h-12 w-12 text-destructive mb-4" />
        <h3 className="text-lg font-semibold mb-2">Erreur de chargement</h3>
        <p className="text-muted-foreground mb-4">{error}</p>
        <Button onClick={fetchEvents} variant="outline">
          Réessayer
        </Button>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="text-6xl mb-4">
          {type === "salon" ? "🎪" : type === "jpo" ? "🏫" : "🎤"}
        </div>
        <h3 className="text-lg font-semibold mb-2">Aucun événement trouvé</h3>
        <p className="text-muted-foreground">
          Essayez de modifier vos filtres de recherche
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Results count */}
      <div className="flex justify-between items-center">
        <p className="text-muted-foreground">
          {totalCount} événement{totalCount > 1 ? "s" : ""} trouvé{totalCount > 1 ? "s" : ""}
        </p>
        <div className="text-sm text-muted-foreground">
          Page {currentPage} sur {totalPages}
        </div>
      </div>

      {/* Events grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onClick={() => onEventSelect(event.id)}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <Button
            variant="outline"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Précédent
          </Button>
          
          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={page === currentPage ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(page)}
                className="min-w-[40px]"
              >
                {page}
              </Button>
            ))}
          </div>

          <Button
            variant="outline"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Suivant
          </Button>
        </div>
      )}
    </div>
  );
};