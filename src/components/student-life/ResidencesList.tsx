import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useResidences } from "@/hooks/useResidences";
import { MapPin, Phone, Mail, Users, Euro, Wifi, Car, Utensils, Tv } from "lucide-react";

const ResidencesList = () => {
  const { residences, loading, error, filterByVille, filterByBudget } = useResidences();
  const [searchVille, setSearchVille] = useState("");
  const [maxBudget, setMaxBudget] = useState<number>(1000);

  // Filtrer les résidences
  const filteredResidences = residences
    .filter(residence => 
      !searchVille || residence.ville.toLowerCase().includes(searchVille.toLowerCase())
    )
    .filter(residence => residence.prix_mensuel <= maxBudget);

  // Icônes pour les équipements
  const getEquipmentIcon = (equipment: string) => {
    const icons: { [key: string]: any } = {
      'wifi': Wifi,
      'parking': Car,
      'restaurant': Utensils,
      'tv': Tv,
      'cuisine': Utensils
    };
    
    const IconComponent = icons[equipment.toLowerCase()] || Users;
    return <IconComponent className="w-4 h-4" />;
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
              <Skeleton className="h-48 w-full rounded-t-lg" />
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
          Résidences Universitaires
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Trouvez le logement étudiant parfait pour votre séjour universitaire.
        </p>
      </div>

      {/* Filtres */}
      <div className="flex flex-col md:flex-row gap-4">
        <Input
          placeholder="Rechercher par ville..."
          value={searchVille}
          onChange={(e) => setSearchVille(e.target.value)}
          className="flex-1"
        />
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Budget max:</label>
          <Input
            type="number"
            value={maxBudget}
            onChange={(e) => setMaxBudget(Number(e.target.value))}
            className="w-32"
            min="0"
            max="2000"
          />
          <span className="text-sm text-muted-foreground">TND</span>
        </div>
      </div>

      {/* Liste des résidences */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResidences.map((residence) => (
          <Card key={residence.id} className="hover:shadow-lg transition-shadow overflow-hidden">
            {/* Photo de la résidence */}
            {residence.photos_urls.length > 0 && (
              <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <img 
                  src={residence.photos_urls[0]} 
                  alt={residence.nom}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            )}
            
            <CardHeader>
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground text-lg">{residence.nom}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{residence.ville}</span>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {residence.description}
              </p>

              {/* Informations clés */}
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span>{residence.places_disponibles}/{residence.capacite_totale} places</span>
                </div>
                <div className="flex items-center gap-2">
                  <Euro className="w-4 h-4 text-muted-foreground" />
                  <span>{residence.prix_mensuel} TND/mois</span>
                </div>
              </div>

              {/* Équipements */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Équipements:</h4>
                <div className="flex flex-wrap gap-1">
                  {residence.equipements.slice(0, 4).map((equipment, index) => (
                    <Badge key={index} variant="outline" className="text-xs flex items-center gap-1">
                      {getEquipmentIcon(equipment)}
                      {equipment}
                    </Badge>
                  ))}
                  {residence.equipements.length > 4 && (
                    <Badge variant="secondary" className="text-xs">
                      +{residence.equipements.length - 4}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Contact */}
              <div className="space-y-1 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Phone className="w-3 h-3" />
                  <span>{residence.telephone_contact}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3 h-3" />
                  <span>{residence.email_contact}</span>
                </div>
              </div>

              <div className="pt-2">
                <Button 
                  className="w-full" 
                  disabled={residence.places_disponibles === 0}
                >
                  {residence.places_disponibles === 0 ? "Complet" : "Contacter"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredResidences.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            Aucune résidence ne correspond à vos critères de recherche.
          </p>
        </div>
      )}
    </div>
  );
};

export default ResidencesList;