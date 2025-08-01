import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Building2, 
  Clock, 
  Euro, 
  Heart, 
  Send,
  Home,
  Ruler,
  Calendar
} from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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

interface OfferCardProps {
  offer: Offer;
  onClick: () => void;
}

export const OfferCard = ({ offer, onClick }: OfferCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Connexion requise",
          description: "Veuillez vous connecter pour ajouter des favoris",
          variant: "destructive",
        });
        return;
      }

      if (isFavorite) {
        // Remove from favorites
        const { error } = await supabase
          .from("favorites")
          .delete()
          .eq("user_id", user.id)
          .eq("item_id", offer.id);

        if (error) throw error;
        
        setIsFavorite(false);
        toast({
          title: "Supprimé des favoris",
          description: "L'offre a été retirée de vos favoris",
        });
      } else {
        // Add to favorites
        const { error } = await supabase
          .from("favorites")
          .insert({ user_id: user.id, item_id: offer.id, item_type: "offer" });

        if (error) throw error;
        
        setIsFavorite(true);
        toast({
          title: "Ajouté aux favoris",
          description: "L'offre a été ajoutée à vos favoris",
        });
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
      toast({
        title: "Erreur",
        description: "Impossible de modifier les favoris",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleApply = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast({
        title: "Connexion requise",
        description: "Veuillez vous connecter pour postuler",
        variant: "destructive",
      });
      return;
    }

    // For now, just show a toast. In a real app, this would open an application form
    toast({
      title: "Candidature",
      description: "Fonctionnalité en développement",
    });
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "stage":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "job":
        return "bg-green-100 text-green-800 border-green-200";
      case "logement":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "stage":
        return "Stage";
      case "job":
        return "Job";
      case "logement":
        return "Logement";
      default:
        return type;
    }
  };

  return (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02] group"
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <Badge className={cn("text-xs font-medium", getTypeColor(offer.type))}>
            {getTypeLabel(offer.type)}
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleFavorite}
            disabled={isLoading}
            className="h-8 w-8 p-0 hover:bg-red-50"
          >
            <Heart 
              className={cn(
                "h-4 w-4 transition-colors",
                isFavorite ? "fill-red-500 text-red-500" : "text-gray-400 hover:text-red-500"
              )} 
            />
          </Button>
        </div>

        <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
          {offer.title}
        </h3>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="truncate">{offer.location}</span>
          </div>

          {offer.company_name && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Building2 className="h-4 w-4 mr-2 flex-shrink-0" />
              <span className="truncate">{offer.company_name}</span>
            </div>
          )}

          {offer.duration && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
              <span>{offer.duration}</span>
            </div>
          )}

          {offer.type === "logement" && (
            <>
              {offer.housing_type && (
                <div className="flex items-center text-sm text-muted-foreground">
                  <Home className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="capitalize">{offer.housing_type}</span>
                  {offer.furnished && <span className="ml-1">• Meublé</span>}
                </div>
              )}
              {offer.surface_area && (
                <div className="flex items-center text-sm text-muted-foreground">
                  <Ruler className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span>{offer.surface_area} m²</span>
                </div>
              )}
            </>
          )}

          {(offer.salary_range || offer.rent_price) && (
            <div className="flex items-center text-sm font-medium text-primary">
              <Euro className="h-4 w-4 mr-2 flex-shrink-0" />
              <span>
                {offer.type === "logement" 
                  ? `${offer.rent_price} DT/mois`
                  : offer.salary_range
                }
              </span>
            </div>
          )}

          {offer.deadline && (
            <div className="flex items-center text-sm text-orange-600">
              <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
              <span>Jusqu'au {new Date(offer.deadline).toLocaleDateString('fr-FR')}</span>
            </div>
          )}
        </div>

        <p className="text-sm text-muted-foreground line-clamp-3">
          {offer.description}
        </p>

        {offer.sectors?.name && (
          <div className="mt-3">
            <Badge variant="secondary" className="text-xs">
              {offer.sectors.name}
            </Badge>
          </div>
        )}
      </CardContent>

      <CardFooter className="px-6 pb-6 pt-0">
        {offer.type === "logement" ? (
          <Button className="w-full" onClick={handleApply}>
            <Send className="h-4 w-4 mr-2" />
            Contacter
          </Button>
        ) : (
          <Button className="w-full" onClick={handleApply}>
            <Send className="h-4 w-4 mr-2" />
            Postuler
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};