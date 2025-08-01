import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { OfferCard } from "./OfferCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";
import { OfferFilters } from "@/pages/Offers";

interface Offer {
  id: string;
  title: string;
  type: "stage" | "job" | "logement";
  location: string;
  description: string;
  company_name?: string;
  contract_type?: string;
  duration?: string;
  salary_range?: string;
  rent_price?: number;
  housing_type?: string;
  surface_area?: number;
  furnished?: boolean;
  deadline?: string;
  created_at: string;
  sectors?: { name: string };
}

interface OfferListProps {
  type: "stage" | "job" | "logement";
  filters: OfferFilters;
  onOfferSelect: (offerId: string) => void;
}

const ITEMS_PER_PAGE = 12;

export const OfferList = ({ type, filters, onOfferSelect }: OfferListProps) => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    fetchOffers();
  }, [type, filters, currentPage]);

  const fetchOffers = async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from("offers")
        .select(`
          *,
          sectors:sector_id(name)
        `, { count: "exact" })
        .eq("type", type)
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      // Apply filters
      if (filters.location) {
        query = query.ilike("location", `%${filters.location}%`);
      }

      if (filters.sector && type !== "logement") {
        query = query.eq("sector_id", filters.sector);
      }

      if (filters.contractType && type === "job") {
        query = query.eq("contract_type", filters.contractType as any);
      }

      if (filters.housingType && type === "logement") {
        query = query.eq("housing_type", filters.housingType as any);
      }

      if (type === "logement" && filters.priceRange) {
        query = query
          .gte("rent_price", filters.priceRange[0])
          .lte("rent_price", filters.priceRange[1]);
      }

      if (filters.furnished !== undefined && type === "logement") {
        query = query.eq("furnished", filters.furnished);
      }

      // Pagination
      const from = (currentPage - 1) * ITEMS_PER_PAGE;
      const to = from + ITEMS_PER_PAGE - 1;
      query = query.range(from, to);

      const { data, error: fetchError, count } = await query;

      if (fetchError) {
        throw fetchError;
      }

      setOffers(data || []);
      setTotalCount(count || 0);
    } catch (err) {
      console.error("Error fetching offers:", err);
      setError("Erreur lors du chargement des offres");
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
        <Button onClick={fetchOffers} variant="outline">
          Réessayer
        </Button>
      </div>
    );
  }

  if (offers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="text-6xl mb-4">
          {type === "stage" ? "🎓" : type === "job" ? "💼" : "🏠"}
        </div>
        <h3 className="text-lg font-semibold mb-2">Aucune offre trouvée</h3>
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
          {totalCount} {type === "stage" ? "stage" : type === "job" ? "job" : "logement"}{totalCount > 1 ? "s" : ""} trouvé{totalCount > 1 ? "s" : ""}
        </p>
        <div className="text-sm text-muted-foreground">
          Page {currentPage} sur {totalPages}
        </div>
      </div>

      {/* Offers grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers.map((offer) => (
          <OfferCard
            key={offer.id}
            offer={offer}
            onClick={() => onOfferSelect(offer.id)}
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