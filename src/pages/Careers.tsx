import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Stethoscope, 
  Code, 
  Briefcase, 
  Palette, 
  Calculator,
  Wrench,
  BookOpen,
  Globe
} from "lucide-react";

const Careers = () => {
  const sectors = [
    {
      name: "Santé",
      icon: Stethoscope,
      color: "bg-red-500",
      jobs: ["Médecin", "Infirmier", "Pharmacien", "Dentiste"],
      count: "120+ métiers"
    },
    {
      name: "Informatique",
      icon: Code,
      color: "bg-blue-500",
      jobs: ["Développeur", "Data Scientist", "Cybersécurité", "IA"],
      count: "95+ métiers"
    },
    {
      name: "Commerce",
      icon: Briefcase,
      color: "bg-green-500",
      jobs: ["Marketing", "Vente", "Import-Export", "E-commerce"],
      count: "85+ métiers"
    },
    {
      name: "Arts & Design",
      icon: Palette,
      color: "bg-purple-500",
      jobs: ["Designer", "Architecte", "Artiste", "Photographe"],
      count: "70+ métiers"
    },
    {
      name: "Finance",
      icon: Calculator,
      color: "bg-yellow-500",
      jobs: ["Banquier", "Comptable", "Analyste", "Auditeur"],
      count: "65+ métiers"
    },
    {
      name: "Ingénierie",
      icon: Wrench,
      color: "bg-gray-500",
      jobs: ["Génie Civil", "Mécanique", "Électrique", "Industriel"],
      count: "80+ métiers"
    },
    {
      name: "Éducation",
      icon: BookOpen,
      color: "bg-indigo-500",
      jobs: ["Professeur", "Formateur", "Conseiller", "Directeur"],
      count: "50+ métiers"
    },
    {
      name: "Communication",
      icon: Globe,
      color: "bg-pink-500",
      jobs: ["Journaliste", "Relations Publiques", "Digital", "Média"],
      count: "45+ métiers"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Métiers & Formations
            </h1>
            <p className="text-xl mb-8">
              Explorez plus de 600 métiers classés par secteur et découvrez les formations qui y mènent
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Rechercher un métier ou un secteur..."
                className="w-full px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sectors Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Découvrez les métiers par secteur
            </h2>
            <p className="text-lg text-muted-foreground">
              Chaque secteur regroupe les métiers ayant des points communs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sectors.map((sector, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                <CardContent className="p-6">
                  <div className={`w-16 h-16 ${sector.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <sector.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-foreground mb-2">{sector.name}</h3>
                  <p className="text-sm text-primary font-medium mb-3">{sector.count}</p>
                  
                  <div className="space-y-1 mb-4">
                    {sector.jobs.map((job, jobIndex) => (
                      <p key={jobIndex} className="text-sm text-muted-foreground">
                        • {job}
                      </p>
                    ))}
                  </div>
                  
                  <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    Explorer ce secteur
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Pas sûr de votre choix ?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Faites notre test d'orientation gratuit pour découvrir les métiers qui vous correspondent
            </p>
            <Button size="lg" className="px-8">
              Faire le test d'orientation
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Careers;