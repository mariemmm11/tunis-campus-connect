import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Search, Filter, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { OfferFilters } from "@/pages/Offers";

interface FilterBarProps {
  activeTab: "stage" | "job" | "logement";
  filters: OfferFilters;
  onFilterChange: (filters: Partial<OfferFilters>) => void;
}

const cities = [
  "Tunis", "Sfax", "Sousse", "Kairouan", "Bizerte", "Monastir",
  "Mahdia", "Ariana", "Nabeul", "Zaghouan", "Beja", "Jendouba",
  "Le Kef", "Siliana", "Sidi Bouzid", "Kasserine", "Gafsa",
  "Tozeur", "Gabes", "Medenine", "Tataouine"
];

const contractTypes = {
  stage: ["stage"],
  job: ["cdi", "cdd", "temps_partiel", "temps_plein", "freelance"],
  logement: []
};

const housingTypes = ["studio", "chambre", "appartement", "colocation", "residence"];

export const FilterBar = ({ activeTab, filters, onFilterChange }: FilterBarProps) => {
  const [sectors, setSectors] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  useEffect(() => {
    const fetchSectors = async () => {
      const { data } = await supabase
        .from("sectors")
        .select("id, name")
        .order("name");
      
      if (data) {
        setSectors(data);
      }
    };

    fetchSectors();
  }, []);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    // Implement search logic here
  };

  const clearFilters = () => {
    onFilterChange({
      location: "",
      sector: "",
      contractType: "",
      priceRange: [0, 2000],
      housingType: "",
      furnished: undefined,
    });
    setSearchTerm("");
  };

  return (
    <div className="bg-card rounded-lg border p-6 mb-8 space-y-4">
      {/* Search bar */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder={`Rechercher des ${activeTab === "logement" ? "logements" : activeTab === "stage" ? "stages" : "jobs"}...`}
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button
          variant="outline"
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          className="flex items-center gap-2"
        >
          <Filter className="h-4 w-4" />
          Filtres {showAdvancedFilters ? "moins" : "plus"}
        </Button>
        <Button variant="ghost" onClick={clearFilters} className="flex items-center gap-2">
          <X className="h-4 w-4" />
          Réinitialiser
        </Button>
      </div>

      {showAdvancedFilters && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t">
          {/* Location filter */}
          <div className="space-y-2">
            <Label>Ville</Label>
            <Select value={filters.location} onValueChange={(value) => onFilterChange({ location: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Toutes les villes" />
              </SelectTrigger>
              <SelectContent className="bg-background border shadow-lg z-50">
                <SelectItem value="">Toutes les villes</SelectItem>
                {cities.map((city) => (
                  <SelectItem key={city} value={city}>{city}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Sector filter (for stages and jobs) */}
          {activeTab !== "logement" && (
            <div className="space-y-2">
              <Label>Secteur</Label>
              <Select value={filters.sector} onValueChange={(value) => onFilterChange({ sector: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Tous les secteurs" />
                </SelectTrigger>
                <SelectContent className="bg-background border shadow-lg z-50">
                  <SelectItem value="">Tous les secteurs</SelectItem>
                  {sectors.map((sector) => (
                    <SelectItem key={sector.id} value={sector.id}>{sector.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Contract type filter (for jobs) */}
          {activeTab === "job" && (
            <div className="space-y-2">
              <Label>Type de contrat</Label>
              <Select value={filters.contractType} onValueChange={(value) => onFilterChange({ contractType: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Tous les contrats" />
                </SelectTrigger>
                <SelectContent className="bg-background border shadow-lg z-50">
                  <SelectItem value="">Tous les contrats</SelectItem>
                  {contractTypes.job.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type === "cdi" ? "CDI" : 
                       type === "cdd" ? "CDD" : 
                       type === "temps_partiel" ? "Temps partiel" : 
                       type === "temps_plein" ? "Temps plein" : 
                       type === "freelance" ? "Freelance" : type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Housing type filter */}
          {activeTab === "logement" && (
            <div className="space-y-2">
              <Label>Type de logement</Label>
              <Select value={filters.housingType} onValueChange={(value) => onFilterChange({ housingType: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Tous les types" />
                </SelectTrigger>
                <SelectContent className="bg-background border shadow-lg z-50">
                  <SelectItem value="">Tous les types</SelectItem>
                  {housingTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type === "studio" ? "Studio" :
                       type === "chambre" ? "Chambre" :
                       type === "appartement" ? "Appartement" :
                       type === "colocation" ? "Colocation" :
                       type === "residence" ? "Résidence" : type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Price/Salary range */}
          <div className="space-y-2">
            <Label>
              {activeTab === "logement" ? "Loyer (DT/mois)" : "Salaire (DT/mois)"}
            </Label>
            <div className="px-2">
              <Slider
                value={filters.priceRange}
                onValueChange={(value) => onFilterChange({ priceRange: value as [number, number] })}
                max={activeTab === "logement" ? 1000 : 3000}
                min={0}
                step={50}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-1">
                <span>{filters.priceRange[0]} DT</span>
                <span>{filters.priceRange[1]} DT</span>
              </div>
            </div>
          </div>

          {/* Furnished filter (for housing) */}
          {activeTab === "logement" && (
            <div className="space-y-2">
              <Label>Meublé</Label>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={filters.furnished === true}
                  onCheckedChange={(checked) => onFilterChange({ furnished: checked ? true : undefined })}
                />
                <Label className="text-sm">Uniquement meublé</Label>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};