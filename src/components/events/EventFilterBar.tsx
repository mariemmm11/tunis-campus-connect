import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, MapPin, Building2, RotateCcw } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { EventFilters } from "@/pages/Events";

interface EventFilterBarProps {
  activeTab: "salon" | "jpo" | "conference";
  filters: EventFilters;
  onFilterChange: (filters: Partial<EventFilters>) => void;
}

export const EventFilterBar = ({ activeTab, filters, onFilterChange }: EventFilterBarProps) => {
  const resetFilters = () => {
    onFilterChange({
      location: "",
      dateRange: [null, null],
      organizer: "",
    });
  };

  const hasActiveFilters = filters.location || filters.dateRange[0] || filters.dateRange[1] || filters.organizer;

  return (
    <div className="bg-card border rounded-lg p-6 mb-8 space-y-4">
      <div className="flex flex-wrap gap-4">
        {/* Location Filter */}
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Ville (ex: Tunis, Sfax...)"
              value={filters.location}
              onChange={(e) => onFilterChange({ location: e.target.value })}
              className="pl-10"
            />
          </div>
        </div>

        {/* Date Range Filter */}
        <div className="flex-1 min-w-[200px]">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !filters.dateRange[0] && !filters.dateRange[1] && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {filters.dateRange[0] && filters.dateRange[1] ? (
                  `${format(filters.dateRange[0], "dd MMM", { locale: fr })} - ${format(filters.dateRange[1], "dd MMM yyyy", { locale: fr })}`
                ) : filters.dateRange[0] ? (
                  format(filters.dateRange[0], "dd MMM yyyy", { locale: fr })
                ) : (
                  "Période"
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={filters.dateRange[0] || new Date()}
                selected={{
                  from: filters.dateRange[0] || undefined,
                  to: filters.dateRange[1] || undefined,
                }}
                onSelect={(range) => {
                  onFilterChange({
                    dateRange: [range?.from || null, range?.to || null]
                  });
                }}
                numberOfMonths={2}
                locale={fr}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Organizer Filter */}
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Organisateur"
              value={filters.organizer}
              onChange={(e) => onFilterChange({ organizer: e.target.value })}
              className="pl-10"
            />
          </div>
        </div>

        {/* Reset Button */}
        {hasActiveFilters && (
          <Button 
            variant="outline" 
            onClick={resetFilters}
            className="px-3"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Filter Info */}
      <div className="text-sm text-muted-foreground">
        {activeTab === "salon" && "Filtrez les salons d'orientation et de l'emploi"}
        {activeTab === "jpo" && "Trouvez les journées portes ouvertes des universités"}
        {activeTab === "conference" && "Découvrez les conférences et ateliers"}
      </div>
    </div>
  );
};