import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Phone, MapPin, Clock, Stethoscope, Brain, Dumbbell, Apple } from "lucide-react";

const HealthWellness = () => {
  const healthServices = [
    {
      id: 1,
      nom: "Centre de Santé Universitaire - Campus Tunis",
      type: "Centre médical",
      specialites: ["Médecine générale", "Gynécologie", "Dermatologie", "Psychologie"],
      adresse: "Campus universitaire Tunis, Avenue de la République",
      telephone: "+216 71 123 456",
      horaires: "Lun-Ven: 8h-17h, Sam: 8h-12h",
      services: ["Consultation gratuite", "Urgences", "Vaccinations", "Analyses"],
      icon: Stethoscope,
      couleur: "bg-blue-50 border-blue-200"
    },
    {
      id: 2,
      nom: "Service de Soutien Psychologique",
      type: "Santé mentale",
      specialites: ["Psychologie clinique", "Thérapie de groupe", "Gestion du stress"],
      adresse: "Bâtiment des services étudiants",
      telephone: "+216 71 654 321",
      horaires: "Lun-Jeu: 9h-16h, Ven: 9h-14h",
      services: ["Consultation individuelle", "Groupes de parole", "Ateliers bien-être"],
      icon: Brain,
      couleur: "bg-purple-50 border-purple-200"
    },
    {
      id: 3,
      nom: "Complexe Sportif Universitaire",
      type: "Sport et fitness",
      specialites: ["Fitness", "Sports collectifs", "Natation", "Arts martiaux"],
      adresse: "Avenue du Sport, Campus Nord",
      telephone: "+216 71 789 012",
      horaires: "Lun-Sam: 6h-22h, Dim: 8h-20h",
      services: ["Abonnement étudiant", "Cours collectifs", "Coach personnel"],
      icon: Dumbbell,
      couleur: "bg-green-50 border-green-200"
    }
  ];

  const wellnessTips = [
    {
      titre: "Alimentation équilibrée",
      description: "Découvrez nos conseils pour bien manger avec un budget étudiant",
      icon: Apple,
      conseils: [
        "Privilégiez les fruits et légumes de saison",
        "Cuisinez en groupe pour économiser",
        "Hydratez-vous régulièrement (1.5L d'eau/jour)",
        "Évitez les repas trop gras ou sucrés"
      ]
    },
    {
      titre: "Gestion du stress",
      description: "Techniques simples pour gérer le stress des examens",
      icon: Brain,
      conseils: [
        "Planifiez vos révisions à l'avance",
        "Prenez des pauses régulières (technique Pomodoro)",
        "Pratiquez la respiration profonde",
        "Maintenez un rythme de sommeil régulier"
      ]
    },
    {
      titre: "Activité physique",
      description: "Restez en forme pendant vos études",
      icon: Dumbbell,
      conseils: [
        "30 minutes d'activité par jour minimum",
        "Préférez les escaliers aux ascenseurs",
        "Rejoignez un club sportif universitaire",
        "Faites du vélo pour vos déplacements"
      ]
    }
  ];

  const urgencyContacts = [
    { nom: "SAMU", numero: "190", description: "Urgences médicales" },
    { nom: "Police Secours", numero: "197", description: "Urgences sécuritaires" },
    { nom: "Pompiers", numero: "198", description: "Incendies et secours" },
    { nom: "SOS Amitié Tunisie", numero: "+216 71 780 000", description: "Soutien psychologique 24h/24" }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
          <Heart className="w-8 h-8 text-red-500" />
          Santé & Bien-être
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Prenez soin de votre santé physique et mentale pendant vos études.
        </p>
      </div>

      {/* Services de santé */}
      <section className="space-y-6">
        <h3 className="text-2xl font-semibold text-foreground">
          Services de Santé Disponibles
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {healthServices.map((service) => {
            const Icon = service.icon;
            return (
              <Card key={service.id} className={`${service.couleur} hover:shadow-lg transition-shadow`}>
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-white rounded-lg">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{service.nom}</h4>
                      <Badge variant="outline" className="mt-1">
                        {service.type}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Spécialités */}
                  <div>
                    <h5 className="text-sm font-medium mb-2">Spécialités:</h5>
                    <div className="flex flex-wrap gap-1">
                      {service.specialites.map((specialite, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {specialite}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Informations pratiques */}
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                      <span>{service.adresse}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span>{service.telephone}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground mt-0.5" />
                      <span>{service.horaires}</span>
                    </div>
                  </div>

                  {/* Services proposés */}
                  <div>
                    <h5 className="text-sm font-medium mb-2">Services:</h5>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {service.services.map((serv, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                          {serv}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button className="w-full mt-4">
                    Prendre rendez-vous
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Conseils bien-être */}
      <section className="space-y-6">
        <h3 className="text-2xl font-semibold text-foreground">
          Conseils Bien-être
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {wellnessTips.map((tip, index) => {
            const Icon = tip.icon;
            return (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{tip.titre}</h4>
                      <p className="text-sm text-muted-foreground">{tip.description}</p>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-2">
                    {tip.conseils.map((conseil, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2" />
                        <span>{conseil}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Contacts d'urgence */}
      <section className="space-y-6">
        <h3 className="text-2xl font-semibold text-foreground">
          Contacts d'Urgence
        </h3>
        
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {urgencyContacts.map((contact, index) => (
                <div key={index} className="text-center">
                  <div className="bg-red-500 text-white rounded-lg p-4 mb-2">
                    <h4 className="font-bold text-lg">{contact.nom}</h4>
                    <p className="text-2xl font-bold">{contact.numero}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{contact.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Ressources utiles */}
      <section className="space-y-6">
        <h3 className="text-2xl font-semibold text-foreground">
          Ressources Utiles
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-6">
              <h4 className="font-semibold mb-2">Applications recommandées</h4>
              <ul className="space-y-2 text-sm">
                <li>• <strong>Headspace:</strong> Méditation et relaxation</li>
                <li>• <strong>MyFitnessPal:</strong> Suivi nutrition</li>
                <li>• <strong>Sleep Cycle:</strong> Améliorer le sommeil</li>
                <li>• <strong>Forest:</strong> Concentration et productivité</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h4 className="font-semibold mb-2">Sites web utiles</h4>
              <ul className="space-y-2 text-sm">
                <li>• <strong>Ministère de la Santé:</strong> Infos officielles</li>
                <li>• <strong>WHO Tunisie:</strong> Recommandations internationales</li>
                <li>• <strong>Psycom:</strong> Ressources santé mentale</li>
                <li>• <strong>Manger Bouger:</strong> Conseils nutrition</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default HealthWellness;