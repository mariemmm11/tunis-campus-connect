import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bus, Train, Car, Bike, MapPin, Clock, CreditCard, Percent } from "lucide-react";

const StudentTransport = () => {
  const transportOptions = [
    {
      id: 1,
      type: "Transport Public",
      nom: "Bus Urbains Transtu",
      description: "Réseau de bus couvrant toute la région de Tunis",
      tarifs: [
        { type: "Ticket simple", prix: "0.5 TND", reduction: "Tarif étudiant: 0.3 TND" },
        { type: "Abonnement mensuel", prix: "15 TND", reduction: "Étudiant: 10 TND" },
        { type: "Abonnement trimestriel", prix: "40 TND", reduction: "Étudiant: 25 TND" }
      ],
      avantages: [
        "Réseau étendu",
        "Tarifs réduits pour étudiants",
        "Fréquence élevée aux heures de pointe",
        "Connexion avec le métro"
      ],
      horaires: "5h30 - 23h30",
      contact: "+216 71 123 456",
      icon: Bus,
      couleur: "bg-blue-50 border-blue-200"
    },
    {
      id: 2,
      type: "Métro Léger",
      nom: "Métro de Tunis (Transtu)",
      description: "Métro léger reliant Tunis aux principales banlieues",
      tarifs: [
        { type: "Ticket simple", prix: "0.7 TND", reduction: "Tarif étudiant: 0.4 TND" },
        { type: "Abonnement mensuel", prix: "20 TND", reduction: "Étudiant: 12 TND" },
        { type: "Carte rechargeable", prix: "Variable", reduction: "-30% pour étudiants" }
      ],
      avantages: [
        "Rapide et ponctuel",
        "Évite les embouteillages",
        "Confortable et moderne",
        "Stations près des universités"
      ],
      horaires: "5h00 - 24h00",
      contact: "+216 71 234 567",
      icon: Train,
      couleur: "bg-green-50 border-green-200"
    },
    {
      id: 3,
      type: "Covoiturage",
      nom: "Plateformes de Covoiturage",
      description: "Solutions de partage de trajets entre étudiants",
      tarifs: [
        { type: "Trajet court", prix: "2-5 TND", reduction: "Partagez les frais" },
        { type: "Trajet longue distance", prix: "10-30 TND", reduction: "Diviser par 4" },
        { type: "Abonnement mensuel", prix: "50-100 TND", reduction: "Trajets réguliers" }
      ],
      avantages: [
        "Économique",
        "Écologique", 
        "Social (rencontres)",
        "Flexible"
      ],
      horaires: "Selon disponibilité",
      contact: "Applications mobiles",
      icon: Car,
      couleur: "bg-orange-50 border-orange-200"
    },
    {
      id: 4,
      type: "Vélo",
      nom: "TunisBike & Vélos Personnels",
      description: "Système de vélos en libre-service et conseils vélo",
      tarifs: [
        { type: "30 minutes", prix: "0.5 TND", reduction: "Gratuit pour étudiants" },
        { type: "Abonnement journalier", prix: "3 TND", reduction: "Étudiant: 2 TND" },
        { type: "Abonnement annuel", prix: "50 TND", reduction: "Étudiant: 30 TND" }
      ],
      avantages: [
        "Écologique",
        "Bon pour la santé",
        "Évite les embouteillages",
        "Stationnement facile"
      ],
      horaires: "24h/24",
      contact: "App TunisBike",
      icon: Bike,
      couleur: "bg-emerald-50 border-emerald-200"
    }
  ];

  const reductionSteps = [
    {
      etape: "1. Inscription",
      description: "Présentez votre carte d'étudiant valide",
      icone: "📝"
    },
    {
      etape: "2. Justificatifs",
      description: "Certificat de scolarité + photo d'identité",
      icone: "📄"
    },
    {
      etape: "3. Demande",
      description: "Remplissez le formulaire de demande de réduction",
      icone: "✍️"
    },
    {
      etape: "4. Validation",
      description: "Récupérez votre carte/abonnement à tarif réduit",
      icone: "✅"
    }
  ];

  const conseils = [
    {
      titre: "Planifiez vos trajets",
      description: "Utilisez des apps comme Citymapper ou Google Maps pour optimiser vos déplacements",
      icone: "🗺️"
    },
    {
      titre: "Horaires de pointe",
      description: "Évitez 7h-9h et 17h-19h si possible pour plus de confort",
      icone: "⏰"
    },
    {
      titre: "Groupes d'étudiants",
      description: "Rejoignez des groupes Facebook pour organiser des covoiturages",
      icone: "👥"
    },
    {
      titre: "Vélo sécurisé",
      description: "Toujours porter un casque et utiliser les pistes cyclables",
      icone: "🚴‍♂️"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
          <Bus className="w-8 h-8 text-blue-500" />
          Transport Étudiant
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Découvrez toutes les options de transport disponibles avec des tarifs préférentiels pour étudiants.
        </p>
      </div>

      {/* Options de transport */}
      <section className="space-y-6">
        <h3 className="text-2xl font-semibold text-foreground">
          Options de Transport
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {transportOptions.map((transport) => {
            const Icon = transport.icon;
            return (
              <Card key={transport.id} className={`${transport.couleur} hover:shadow-lg transition-shadow`}>
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <div className="p-3 bg-white rounded-lg">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-foreground">{transport.nom}</h4>
                        <Badge variant="outline">{transport.type}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{transport.description}</p>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Tarifs */}
                  <div>
                    <h5 className="text-sm font-medium mb-2 flex items-center gap-2">
                      <CreditCard className="w-4 h-4" />
                      Tarifs
                    </h5>
                    <div className="space-y-2">
                      {transport.tarifs.map((tarif, index) => (
                        <div key={index} className="flex justify-between items-center text-sm bg-white rounded p-2">
                          <span>{tarif.type}</span>
                          <div className="text-right">
                            <div className="font-semibold">{tarif.prix}</div>
                            <div className="text-xs text-green-600">{tarif.reduction}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Avantages */}
                  <div>
                    <h5 className="text-sm font-medium mb-2">Avantages:</h5>
                    <div className="grid grid-cols-2 gap-1">
                      {transport.avantages.map((avantage, index) => (
                        <Badge key={index} variant="secondary" className="text-xs justify-start">
                          {avantage}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Informations pratiques */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>{transport.horaires}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>{transport.contact}</span>
                    </div>
                  </div>

                  <Button className="w-full">
                    Plus d'informations
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Comment obtenir les réductions */}
      <section className="space-y-6">
        <h3 className="text-2xl font-semibold text-foreground flex items-center gap-2">
          <Percent className="w-6 h-6 text-green-500" />
          Comment Obtenir vos Réductions Étudiantes
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {reductionSteps.map((step, index) => (
            <Card key={index} className="text-center hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="text-4xl mb-4">{step.icone}</div>
                <h4 className="font-semibold mb-2">{step.etape}</h4>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Conseils pratiques */}
      <section className="space-y-6">
        <h3 className="text-2xl font-semibold text-foreground">
          Conseils Pratiques
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {conseils.map((conseil, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{conseil.icone}</div>
                  <div>
                    <h4 className="font-semibold mb-2">{conseil.titre}</h4>
                    <p className="text-sm text-muted-foreground">{conseil.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Applications utiles */}
      <section className="space-y-6">
        <h3 className="text-2xl font-semibold text-foreground">
          Applications Recommandées
        </h3>
        
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-2">🚌</div>
                <h4 className="font-semibold">Transtu App</h4>
                <p className="text-sm text-muted-foreground">Horaires bus et métro en temps réel</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">🚗</div>
                <h4 className="font-semibold">BlaBlaCar</h4>
                <p className="text-sm text-muted-foreground">Covoiturage longue distance</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">🚴</div>
                <h4 className="font-semibold">TunisBike</h4>
                <p className="text-sm text-muted-foreground">Vélos en libre-service</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default StudentTransport;