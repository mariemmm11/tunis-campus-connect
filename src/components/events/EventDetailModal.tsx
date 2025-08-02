import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  MapPin, 
  Building2, 
  Calendar, 
  Clock, 
  Heart, 
  UserPlus, 
  ExternalLink,
  X 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

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

interface EventDetailModalProps {
  eventId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export const EventDetailModal = ({ eventId, isOpen, onClose }: EventDetailModalProps) => {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (eventId && isOpen) {
      fetchEvent();
      checkFavoriteStatus();
    }
  }, [eventId, isOpen]);

  const fetchEvent = async () => {
    if (!eventId) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("id", eventId)
        .single();

      if (error) throw error;
      setEvent(data);
    } catch (error) {
      console.error("Error fetching event:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les détails de l'événement",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const checkFavoriteStatus = async () => {
    if (!eventId) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("favorites")
        .select("id")
        .eq("user_id", user.id)
        .eq("item_id", eventId)
        .eq("item_type", "event")
        .single();

      setIsFavorite(!!data);
    } catch (error) {
      // Not found is expected if not in favorites
    }
  };

  const toggleFavorite = async () => {
    if (!event) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Connexion requise",
          description: "Veuillez vous connecter pour gérer vos favoris",
          variant: "destructive",
        });
        return;
      }

      if (isFavorite) {
        const { error } = await supabase
          .from("favorites")
          .delete()
          .eq("user_id", user.id)
          .eq("item_id", event.id);

        if (error) throw error;
        setIsFavorite(false);
        toast({
          title: "Supprimé des favoris",
          description: "L'événement a été retiré de vos favoris",
        });
      } else {
        const { error } = await supabase
          .from("favorites")
          .insert({ user_id: user.id, item_id: event.id, item_type: "event" });

        if (error) throw error;
        setIsFavorite(true);
        toast({
          title: "Ajouté aux favoris",
          description: "L'événement a été ajouté à vos favoris",
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

  const handleRegister = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast({
        title: "Connexion requise",
        description: "Veuillez vous connecter pour vous inscrire",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Inscription",
      description: "Fonctionnalité en développement",
    });
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "salon":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "jpo":
        return "bg-teal-100 text-teal-800 border-teal-200";
      case "conference":
        return "bg-indigo-100 text-indigo-800 border-indigo-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "salon":
        return "Salon";
      case "jpo":
        return "Journée Portes Ouvertes";
      case "conference":
        return "Conférence";
      default:
        return type;
    }
  };

  const formatEventDate = () => {
    if (!event) return "";
    
    const startDate = new Date(event.date_start);
    const endDate = event.date_end ? new Date(event.date_end) : null;

    if (endDate && startDate.toDateString() !== endDate.toDateString()) {
      return `Du ${format(startDate, "dd MMMM yyyy", { locale: fr })} au ${format(endDate, "dd MMMM yyyy", { locale: fr })}`;
    }
    
    return format(startDate, "dd MMMM yyyy", { locale: fr });
  };

  const isEventPast = () => {
    if (!event) return false;
    const eventDate = event.date_end ? new Date(event.date_end) : new Date(event.date_start);
    return eventDate < new Date();
  };

  if (loading) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              <Skeleton className="h-6 w-3/4" />
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-20 w-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-4 w-1/4" />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (!event) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <Badge className={cn("text-xs font-medium", getTypeColor(event.type))}>
                {getTypeLabel(event.type)}
              </Badge>
              {isEventPast() && (
                <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600">
                  Événement passé
                </Badge>
              )}
            </div>
            <DialogTitle className="text-xl font-bold pr-8">
              {event.title}
            </DialogTitle>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="flex-shrink-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="space-y-6">
          {/* Event details */}
          <div className="space-y-3">
            <div className="flex items-center text-primary font-medium">
              <Calendar className="h-5 w-5 mr-3 flex-shrink-0" />
              <span>{formatEventDate()}</span>
            </div>

            {event.location && (
              <div className="flex items-center text-muted-foreground">
                <MapPin className="h-5 w-5 mr-3 flex-shrink-0" />
                <span>{event.location}</span>
              </div>
            )}

            {event.organizer && (
              <div className="flex items-center text-muted-foreground">
                <Building2 className="h-5 w-5 mr-3 flex-shrink-0" />
                <span>{event.organizer}</span>
              </div>
            )}

            {event.date_end && (
              <div className="flex items-center text-muted-foreground">
                <Clock className="h-5 w-5 mr-3 flex-shrink-0" />
                <span>
                  {format(new Date(event.date_start), "HH:mm", { locale: fr })} - {format(new Date(event.date_end), "HH:mm", { locale: fr })}
                </span>
              </div>
            )}
          </div>

          {/* Description */}
          {event.description && (
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {event.description}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
            <Button 
              className="flex-1" 
              onClick={handleRegister}
              disabled={isEventPast()}
            >
              <UserPlus className="h-4 w-4 mr-2" />
              {isEventPast() ? "Événement terminé" : "S'inscrire à l'événement"}
            </Button>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={toggleFavorite}
                title={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
              >
                <Heart 
                  className={cn(
                    "h-4 w-4",
                    isFavorite ? "fill-red-500 text-red-500" : "text-muted-foreground"
                  )} 
                />
              </Button>

              {event.website_url && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => window.open(event.website_url, '_blank')}
                  title="Site web officiel"
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};