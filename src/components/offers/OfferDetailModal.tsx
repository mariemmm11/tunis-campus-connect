import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  MapPin, 
  Building2, 
  Clock, 
  Euro, 
  Heart, 
  Send,
  Home,
  Ruler,
  Calendar,
  Mail,
  Phone,
  User,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface OfferDetailModalProps {
  offerId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

interface OfferDetail {
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
  requirements?: string;
  contact_email?: string;
  contact_phone?: string;
  deadline?: string;
  created_at: string;
  sectors?: { name: string };
}

export const OfferDetailModal = ({ offerId, isOpen, onClose }: OfferDetailModalProps) => {
  const [offer, setOffer] = useState<OfferDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen && offerId) {
      fetchOfferDetails();
    }
  }, [isOpen, offerId]);

  const fetchOfferDetails = async () => {
    if (!offerId) return;

    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from("offers")
        .select(`
          *,
          sectors:sector_id(name)
        `)
        .eq("id", offerId)
        .single();

      if (fetchError) {
        throw fetchError;
      }

      setOffer(data);

      // Check if it's already in favorites
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: favoriteData } = await supabase
          .from("favorites")
          .select("id")
          .eq("user_id", user.id)
          .eq("item_id", offerId)
          .single();
        
        setIsFavorite(!!favoriteData);
      }
    } catch (err) {
      console.error("Error fetching offer details:", err);
      setError("Erreur lors du chargement des détails de l'offre");
    } finally {
      setLoading(false);
    }
  };

  const handleFavorite = async () => {
    if (!offer) return;

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
    }
  };

  const handleApply = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast({
        title: "Connexion requise",
        description: "Veuillez vous connecter pour postuler",
        variant: "destructive",
      });
      return;
    }

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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-8 w-1/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-32 w-full" />
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <AlertCircle className="h-12 w-12 text-destructive mb-4" />
            <h3 className="text-lg font-semibold mb-2">Erreur de chargement</h3>
            <p className="text-muted-foreground">{error}</p>
          </div>
        ) : offer ? (
          <>
            <DialogHeader>
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <DialogTitle className="text-2xl font-bold">{offer.title}</DialogTitle>
                  <div className="flex items-center gap-2">
                    <Badge className={cn("text-sm", getTypeColor(offer.type))}>
                      {getTypeLabel(offer.type)}
                    </Badge>
                    {offer.sectors?.name && (
                      <Badge variant="secondary">{offer.sectors.name}</Badge>
                    )}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleFavorite}
                  className="h-10 w-10 p-0"
                >
                  <Heart 
                    className={cn(
                      "h-5 w-5 transition-colors",
                      isFavorite ? "fill-red-500 text-red-500" : "text-gray-400 hover:text-red-500"
                    )} 
                  />
                </Button>
              </div>
            </DialogHeader>

            <div className="space-y-6">
              {/* Key Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="h-5 w-5 mr-3" />
                    <span>{offer.location}</span>
                  </div>

                  {offer.company_name && (
                    <div className="flex items-center text-muted-foreground">
                      <Building2 className="h-5 w-5 mr-3" />
                      <span>{offer.company_name}</span>
                    </div>
                  )}

                  {offer.duration && (
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="h-5 w-5 mr-3" />
                      <span>{offer.duration}</span>
                    </div>
                  )}

                  {offer.type === "logement" && offer.housing_type && (
                    <div className="flex items-center text-muted-foreground">
                      <Home className="h-5 w-5 mr-3" />
                      <span className="capitalize">
                        {offer.housing_type}
                        {offer.furnished ? " • Meublé" : " • Non meublé"}
                      </span>
                    </div>
                  )}

                  {offer.surface_area && (
                    <div className="flex items-center text-muted-foreground">
                      <Ruler className="h-5 w-5 mr-3" />
                      <span>{offer.surface_area} m²</span>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  {(offer.salary_range || offer.rent_price) && (
                    <div className="flex items-center text-primary font-medium">
                      <Euro className="h-5 w-5 mr-3" />
                      <span>
                        {offer.type === "logement" 
                          ? `${offer.rent_price} DT/mois`
                          : offer.salary_range
                        }
                      </span>
                    </div>
                  )}

                  {offer.deadline && (
                    <div className="flex items-center text-orange-600">
                      <Calendar className="h-5 w-5 mr-3" />
                      <span>Limite : {new Date(offer.deadline).toLocaleDateString('fr-FR')}</span>
                    </div>
                  )}

                  {offer.contact_email && (
                    <div className="flex items-center text-muted-foreground">
                      <Mail className="h-5 w-5 mr-3" />
                      <a 
                        href={`mailto:${offer.contact_email}`}
                        className="hover:text-primary transition-colors"
                      >
                        {offer.contact_email}
                      </a>
                    </div>
                  )}

                  {offer.contact_phone && (
                    <div className="flex items-center text-muted-foreground">
                      <Phone className="h-5 w-5 mr-3" />
                      <a 
                        href={`tel:${offer.contact_phone}`}
                        className="hover:text-primary transition-colors"
                      >
                        {offer.contact_phone}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Description</h3>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {offer.description}
                </p>
              </div>

              {/* Requirements */}
              {offer.requirements && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Exigences</h3>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    {offer.requirements}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t">
                <Button onClick={handleApply} className="flex-1">
                  <Send className="h-4 w-4 mr-2" />
                  {offer.type === "logement" ? "Contacter" : "Postuler"}
                </Button>
                <Button variant="outline" onClick={handleFavorite}>
                  <Heart className={cn(
                    "h-4 w-4 mr-2",
                    isFavorite && "fill-current text-red-500"
                  )} />
                  {isFavorite ? "Favoris" : "Ajouter"}
                </Button>
              </div>
            </div>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
};