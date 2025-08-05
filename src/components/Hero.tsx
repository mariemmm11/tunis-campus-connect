import { Button } from "@/components/ui/button";
import { ArrowRight, Search } from "lucide-react";
import { HeroGeometric } from "@/components/ui/shape-landing-hero";

const Hero = () => {
  return (
    <HeroGeometric
      badge="TunisCampus"
      title1="Votre avenir commence"
      title2="ici"
      subtitle="Découvrez votre voie, explorez les métiers, trouvez votre formation et lancez-vous dans la vie étudiante en Tunisie"
    >
      {/* Search bar */}
      <div className="bg-card/95 backdrop-blur-sm rounded-xl p-4 mb-8 max-w-2xl mx-auto border border-border/50 shadow-elegant">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Rechercher un métier, une formation, un stage..."
              className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
            />
          </div>
          <Button size="lg" className="px-8 shadow-glow transition-all duration-300 hover:scale-105">
            <Search className="w-5 h-5 mr-2" />
            Rechercher
          </Button>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button size="lg" variant="secondary" className="px-8 shadow-elegant transition-all duration-300 hover:scale-105">
          Tester mon orientation
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
        <Button size="lg" variant="outline" className="px-8 transition-all duration-300 hover:scale-105">
          Découvrir les métiers
        </Button>
      </div>
    </HeroGeometric>
  );
};

export default Hero;