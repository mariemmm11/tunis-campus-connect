import { Button } from "@/components/ui/button";
import { ArrowRight, Search } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary via-accent to-secondary py-20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-accent/90 to-secondary/90"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-white/10 rounded-full blur-xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Votre avenir commence ici
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
            Découvrez votre voie, explorez les métiers, trouvez votre formation et 
            lancez-vous dans la vie étudiante en Tunisie
          </p>
          
          {/* Search bar */}
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 mb-8 max-w-2xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Rechercher un métier, une formation, un stage..."
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <Button size="lg" className="px-8">
                <Search className="w-5 h-5 mr-2" />
                Rechercher
              </Button>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="px-8">
              Tester mon orientation
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="px-8 bg-white/10 border-white/30 text-white hover:bg-white/20">
              Découvrir les métiers
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;