import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Brain, Target, Lightbulb } from "lucide-react";

const QuickTests = () => {
  const tests = [
    {
      title: "Test d'orientation métiers",
      description: "Découvrez les métiers qui vous correspondent",
      duration: "15 min",
      color: "bg-primary",
      icon: Target
    },
    {
      title: "Test de personnalité",
      description: "Explorez votre profil et vos motivations",
      duration: "10 min",
      color: "bg-secondary",
      icon: Brain
    },
    {
      title: "Test d'intérêts",
      description: "Identifiez vos centres d'intérêt dominants",
      duration: "12 min",
      color: "bg-accent",
      icon: Lightbulb
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Vous avez un projet d'orientation ?
            </h2>
            <p className="text-xl text-muted-foreground">
              Où vous situez-vous dans votre projet de formation ?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {tests.map((test, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 ${test.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <test.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{test.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{test.description}</p>
                  <p className="text-xs text-primary font-medium">{test.duration}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Card className="bg-gradient-to-r from-primary to-accent p-8 text-white">
              <CardContent className="p-0">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Target className="w-6 h-6" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4">
                  Vous avez un projet d'orientation ?
                </h3>
                <p className="mb-6 opacity-90">
                  Découvrez votre métier idéal grâce à notre test d'orientation gratuit !
                </p>
                <Button variant="secondary" size="lg" className="bg-white text-primary hover:bg-white/90">
                  Faire le test gratuit
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickTests;