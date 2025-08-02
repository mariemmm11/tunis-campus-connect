import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Building2, 
  Calendar, 
  Clock,
  Heart, 
  UserPlus,
  ExternalLink
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

interface EventCardProps {
  event: Event;
  onClick: () => void;
}

export const EventCard = ({ event, onClick }: EventCardProps) => {
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
          .eq("item_id", event.id);

        if (error) throw error;
        
        setIsFavorite(false);
        toast({
          title: "Supprimé des favoris",
          description: "L'événement a été retiré de vos favoris",
        });
      } else {
        // Add to favorites
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
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast({
        title: "Connexion requise",
        description: "Veuillez vous connecter pour vous inscrire",
        variant: "destructive",
      });
      return;
    }

    // For now, just show a toast. In a real app, this would handle registration
    toast({
      title: "Inscription",
      description: "Fonctionnalité en développement",
    });
  };

  const handleWebsiteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (event.website_url) {
      window.open(event.website_url, '_blank');
    }
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
        return "JPO";
      case "conference":
        return "Conférence";
      default:
        return type;
    }
  };

  const formatEventDate = () => {
    const startDate = new Date(event.date_start);
    const endDate = event.date_end ? new Date(event.date_end) : null;

    if (endDate && startDate.toDateString() !== endDate.toDateString()) {
      return `${format(startDate, "dd MMM", { locale: fr })} - ${format(endDate, "dd MMM yyyy", { locale: fr })}`;
    }
    
    return format(startDate, "dd MMM yyyy", { locale: fr });
  };

  const isEventPast = () => {
    const eventDate = event.date_end ? new Date(event.date_end) : new Date(event.date_start);
    return eventDate < new Date();
  };

  return (
    <Card 
      className={cn(
        "cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02] group",
        isEventPast() && "opacity-75"
      )}
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <Badge className={cn("text-xs font-medium", getTypeColor(event.type))}>
            {getTypeLabel(event.type)}
          </Badge>
          <div className="flex gap-1">
            {event.website_url && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleWebsiteClick}
                className="h-8 w-8 p-0 hover:bg-blue-50"
                title="Site web"
              >
                <ExternalLink className="h-4 w-4 text-blue-600" />
              </Button>
            )}
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
        </div>

        <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
          {event.title}
        </h3>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-primary font-medium">
            <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>{formatEventDate()}</span>
          </div>

          {event.location && (
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
              <span className="truncate">{event.location}</span>
            </div>
          )}

          {event.organizer && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Building2 className="h-4 w-4 mr-2 flex-shrink-0" />
              <span className="truncate">{event.organizer}</span>
            </div>
          )}

          {event.date_end && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
              <span>
                {format(new Date(event.date_start), "HH:mm", { locale: fr })} - {format(new Date(event.date_end), "HH:mm", { locale: fr })}
              </span>
            </div>
          )}
        </div>

        {event.description && (
          <p className="text-sm text-muted-foreground line-clamp-3">
            {event.description}
          </p>
        )}

        {isEventPast() && (
          <div className="mt-3">
            <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600">
              Événement passé
            </Badge>
          </div>
        )}
      </CardContent>

      <CardFooter className="px-6 pb-6 pt-0">
        <Button 
          className="w-full" 
          onClick={handleRegister}
          disabled={isEventPast()}
        >
          <UserPlus className="h-4 w-4 mr-2" />
          {isEventPast() ? "Événement terminé" : "S'inscrire"}
        </Button>
      </CardFooter>
    </Card>
  );
};