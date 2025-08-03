import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useRestaurants } from "@/hooks/useRestaurants";
import { MapPin, Phone, Clock, Star, AlertTriangle, Wifi, CreditCard } from "lucide-react";

const RestaurantsList = () => {
  const { restaurants, loading, error } = useRestaurants();
  const [searchCampus, setSearchCampus] = useState("");
  const [maxBudget, setMaxBudget] = useState<number>(50);

  // Filtrer les restaurants
  const filteredRestaurants = restaurants
    .filter(restaurant => 
      !searchCampus || restaurant.campus.toLowerCase().includes(searchCampus.toLowerCase())
    )
    .filter(restaurant => restaurant.prix_moyen <= maxBudget);

  // Campus uniques
  const campusList = [...new Set(restaurants.map(restaurant => restaurant.campus))];

  // Icônes pour les services
  const getServiceIcon = (service: string) => {
    const icons: { [key: string]: any } = {
      'wifi': Wifi,
      'carte': CreditCard,
      'livraison': Phone,
      'terrasse': MapPin
    };
    
    const IconComponent = icons[service.toLowerCase()] || MapPin;
    return <IconComponent className="w-4 h-4" />;
  };

  // Rendu des étoiles
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating 
            ? 'fill-yellow-400 text-yellow-400' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}>
              <Skeleton className="h-40 w-full rounded-t-lg" />
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-16 w-full mb-4" />
                <Skeleton className="h-10 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-destructive mb-4">{error}</p>
        <Button onClick={() => window.location.reload()}>
          Réessayer
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-4">
          Restaurants Universitaires
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Découvrez les meilleurs endroits pour se restaurer sur votre campus.
        </p>
      </div>

      {/* Filtres */}
      <div className="flex flex-col md:flex-row gap-4">
        <select
          value={searchCampus}
          onChange={(e) => setSearchCampus(e.target.value)}
          className="px-3 py-2 border border-input bg-background rounded-md flex-1"
        >
          <option value="">Tous les campus</option>
          {campusList.map(campus => (
            <option key={campus} value={campus}>{campus}</option>
          ))}
        </select>
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Budget max:</label>
          <Input
            type="number"
            value={maxBudget}
            onChange={(e) => setMaxBudget(Number(e.target.value))}
            className="w-32"
            min="0"
            max="100"
          />
          <span className="text-sm text-muted-foreground">TND</span>
        </div>
      </div>

      {/* Liste des restaurants */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRestaurants.map((restaurant) => (
          <Card key={restaurant.id} className="hover:shadow-lg transition-shadow overflow-hidden">
            {/* Photo du restaurant */}
            <div className="h-40 bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center">
              {restaurant.photo_url ? (
                <img 
                  src={restaurant.photo_url} 
                  alt={restaurant.nom}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-4xl">🍽️</div>
              )}
            </div>
            
            <CardHeader>
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold text-foreground text-lg">{restaurant.nom}</h3>
                  <div className="flex items-center gap-1">
                    {renderStars(Math.round(restaurant.notation_moyenne))}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{restaurant.campus}</span>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {restaurant.description}
              </p>

              {/* Menu du jour */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Menu du jour:</h4>
                <div className="space-y-1">
                  {restaurant.menu_du_jour.slice(0, 3).map((plat, index) => (
                    <Badge key={index} variant="outline" className="mr-1 mb-1 text-xs">
                      {plat}
                    </Badge>
                  ))}
                  {restaurant.menu_du_jour.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{restaurant.menu_du_jour.length - 3} plats
                    </Badge>
                  )}
                </div>
              </div>

              {/* Informations pratiques */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span>{restaurant.horaires_ouverture}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg">💰</span>
                  <span>~{restaurant.prix_moyen} TND/repas</span>
                </div>
              </div>

              {/* Allergènes */}
              {restaurant.allergenes.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-orange-500" />
                    <span className="text-sm font-medium">Allergènes:</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {restaurant.allergenes.map((allergene, index) => (
                      <Badge key={index} variant="destructive" className="text-xs">
                        {allergene}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Services */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Services:</h4>
                <div className="flex flex-wrap gap-1">
                  {restaurant.services.map((service, index) => (
                    <Badge key={index} variant="secondary" className="text-xs flex items-center gap-1">
                      {getServiceIcon(service)}
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Phone className="w-3 h-3" />
                <span>{restaurant.telephone}</span>
              </div>

              <div className="pt-2">
                <Button className="w-full">
                  Voir les détails
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredRestaurants.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            Aucun restaurant ne correspond à vos critères de recherche.
          </p>
        </div>
      )}
    </div>
  );
};

export default RestaurantsList;