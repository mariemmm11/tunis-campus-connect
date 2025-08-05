import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
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
import { SectorCard } from "@/components/careers/SectorCard";
import { useSectors } from "@/hooks/useSectors";
import { useState } from "react";

const Careers = () => {
  const { sectors, loading } = useSectors();
  const [searchTerm, setSearchTerm] = useState("");

  // Mapping des icônes pour chaque secteur
  const sectorIcons: Record<string, any> = {
    "Santé": Stethoscope,
    "Informatique": Code,
    "Commerce": Briefcase,
    "Arts & Design": Palette,
    "Finance": Calculator,
    "Ingénierie": Wrench,
    "Éducation": BookOpen,
    "Communication": Globe,
  };

  // Données métiers par secteur (en attendant les vraies données)
  const sectorJobs: Record<string, string[]> = {
    "Santé": ["Médecin", "Infirmier", "Pharmacien", "Dentiste"],
    "Informatique": ["Développeur", "Data Scientist", "Cybersécurité", "IA"],
    "Commerce": ["Marketing", "Vente", "Import-Export", "E-commerce"],
    "Arts & Design": ["Designer", "Architecte", "Artiste", "Photographe"],
    "Finance": ["Banquier", "Comptable", "Analyste", "Auditeur"],
    "Ingénierie": ["Génie Civil", "Mécanique", "Électrique", "Industriel"],
    "Éducation": ["Professeur", "Formateur", "Conseiller", "Directeur"],
    "Communication": ["Journaliste", "Relations Publiques", "Digital", "Média"],
  };

  const filteredSectors = sectors.filter(sector =>
    sector.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative py-20 overflow-hidden bg-gradient-hero"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(120,119,198,0.3),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,119,198,0.2),transparent_50%)]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold font-cal text-foreground mb-6">
              Métiers & Formations
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Explorez plus de 600 métiers classés par secteur et découvrez les formations qui y mènent
            </p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative max-w-2xl mx-auto"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <input
                  type="text"
                  placeholder="Rechercher un métier ou un secteur..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-card/80 backdrop-blur-sm border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground placeholder:text-muted-foreground shadow-card transition-all duration-300"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Sectors Grid */}
      <section className="py-20 relative -mt-10 z-10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-foreground mb-4 font-cal">
              Découvrez les métiers par secteur
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Chaque secteur regroupe les métiers ayant des points communs. Explorez-les pour découvrir votre voie.
            </p>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-card rounded-2xl p-6 shadow-card">
                    <div className="w-16 h-16 bg-muted rounded-2xl mb-4"></div>
                    <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-muted rounded w-1/2 mb-4"></div>
                    <div className="space-y-2">
                      <div className="h-3 bg-muted rounded"></div>
                      <div className="h-3 bg-muted rounded w-5/6"></div>
                      <div className="h-3 bg-muted rounded w-4/5"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredSectors.map((sector, index) => (
                <SectorCard
                  key={sector.id}
                  id={sector.id}
                  name={sector.name}
                  description={sector.description || undefined}
                  color={sector.color}
                  icon={sectorIcons[sector.name] || Briefcase}
                  jobCount={`${Math.floor(Math.random() * 100) + 50}+ métiers`}
                  popularJobs={sectorJobs[sector.name] || ["Métier 1", "Métier 2", "Métier 3"]}
                  index={index}
                />
              ))}
            </div>
          )}

          {!loading && filteredSectors.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-lg text-muted-foreground">
                Aucun secteur trouvé pour "{searchTerm}"
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="py-20 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-card" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-foreground mb-6 font-cal">
              Pas sûr de votre choix ?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
              Faites notre test d'orientation gratuit pour découvrir les métiers qui vous correspondent le mieux.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button size="lg" className="px-8 py-4 text-lg shadow-elegant">
                Faire le test d'orientation
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Careers;