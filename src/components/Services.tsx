import ServiceCard from "./ServiceCard";
import { 
  GraduationCap, 
  ClipboardCheck, 
  Briefcase, 
  Home, 
  Calendar, 
  Users 
} from "lucide-react";

const Services = () => {
  const services = [
    {
      title: "Métiers & Formations",
      description: "Explorez les métiers par secteur et découvrez les formations qui vous correspondent.",
      icon: GraduationCap,
      color: "primary" as const,
      href: "/careers"
    },
    {
      title: "Tests d'orientation",
      description: "Réalisez des tests personnalisés pour découvrir vos aptitudes et centres d'intérêt.",
      icon: ClipboardCheck,
      color: "secondary" as const,
      href: "/tests"
    },
    {
      title: "Offres d'emploi",
      description: "Trouvez des stages, jobs étudiants et opportunités près de chez vous.",
      icon: Briefcase,
      color: "accent" as const,
      href: "/offers"
    },
    {
      title: "Logement étudiant",
      description: "Découvrez les résidences universitaires et options de logement disponibles.",
      icon: Home,
      color: "success" as const,
      href: "/housing"
    },
    {
      title: "Journées Portes Ouvertes",
      description: "Consultez le calendrier des JPO des universités et écoles tunisiennes.",
      icon: Calendar,
      color: "primary" as const,
      href: "/open-days"
    },
    {
      title: "Salons étudiants",
      description: "Ne manquez aucun salon étudiant et événement d'orientation en Tunisie.",
      icon: Users,
      color: "secondary" as const,
      href: "/events"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Nos outils pour réussir
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            L'Étudiant vous aide à tous les bons choix pour réussir votre orientation, 
            vos études et votre entrée dans la vie professionnelle
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
              color={service.color}
              href={service.href}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;