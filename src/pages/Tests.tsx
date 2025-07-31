import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Target, 
  Brain, 
  Lightbulb, 
  Users, 
  Clock,
  Star,
  CheckCircle
} from "lucide-react";

const Tests = () => {
  const tests = [
    {
      title: "Test d'orientation métiers",
      description: "Découvrez les métiers qui correspondent à votre profil et vos centres d'intérêt",
      duration: "15 minutes",
      questions: "60 questions",
      icon: Target,
      color: "bg-primary",
      features: ["Profil de personnalité", "Métiers compatibles", "Formations conseillées"],
      popular: true
    },
    {
      title: "Test de personnalité",
      description: "Explorez votre profil psychologique et vos traits de caractère dominants",
      duration: "10 minutes", 
      questions: "45 questions",
      icon: Brain,
      color: "bg-secondary",
      features: ["Analyse de personnalité", "Points forts/faibles", "Conseils de développement"]
    },
    {
      title: "Test d'intérêts professionnels",
      description: "Identifiez vos centres d'intérêt et secteurs d'activité préférés",
      duration: "12 minutes",
      questions: "50 questions", 
      icon: Lightbulb,
      color: "bg-accent",
      features: ["Centres d'intérêt", "Secteurs recommandés", "Environnements de travail"]
    },
    {
      title: "Test de compétences",
      description: "Évaluez vos aptitudes et compétences dans différents domaines",
      duration: "20 minutes",
      questions: "75 questions",
      icon: CheckCircle,
      color: "bg-success",
      features: ["Compétences techniques", "Soft skills", "Potentiel d'évolution"]
    }
  ];

  const benefits = [
    "Tests scientifiquement validés",
    "Résultats personnalisés et détaillés", 
    "Conseils d'orientation personnalisés",
    "Métiers et formations recommandés",
    "Gratuit et sans inscription"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-accent py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Tests d'orientation
            </h1>
            <p className="text-xl mb-8">
              Découvrez votre voie grâce à nos tests d'orientation gratuits et personnalisés
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {benefits.map((benefit, index) => (
                <Badge key={index} variant="secondary" className="bg-white/20 text-white border-white/30">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  {benefit}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tests Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Choisissez votre test d'orientation
            </h2>
            <p className="text-lg text-muted-foreground">
              Chaque test vous apporte des informations complémentaires pour votre orientation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {tests.map((test, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative">
                {test.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-3 py-1">
                      <Star className="w-3 h-3 mr-1" />
                      Le plus populaire
                    </Badge>
                  </div>
                )}
                
                <CardContent className="p-8">
                  <div className={`w-20 h-20 ${test.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <test.icon className="w-10 h-10 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-foreground mb-3">{test.title}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{test.description}</p>
                  
                  <div className="flex items-center gap-4 mb-6 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {test.duration}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {test.questions}
                    </div>
                  </div>

                  <div className="space-y-2 mb-8">
                    <p className="font-medium text-foreground">Ce que vous obtiendrez :</p>
                    {test.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 mr-2 text-success" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  
                  <Button className="w-full" size="lg">
                    Commencer le test
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Comment ça marche ?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h3 className="font-bold text-foreground mb-2">Répondez aux questions</h3>
                <p className="text-muted-foreground">Questions personnalisées selon votre profil</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h3 className="font-bold text-foreground mb-2">Obtenez vos résultats</h3>
                <p className="text-muted-foreground">Analyse détaillée de votre profil</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h3 className="font-bold text-foreground mb-2">Explorez vos options</h3>
                <p className="text-muted-foreground">Métiers et formations recommandés</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Tests;