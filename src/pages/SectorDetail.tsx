import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Briefcase, GraduationCap, MapPin, Calendar, Star } from "lucide-react";
import { useSectors } from "@/hooks/useSectors";
import { useCareers } from "@/hooks/useCareers";
import { useFormations } from "@/hooks/useFormations";
import { useTestimonials } from "@/hooks/useTestimonials";

const SectorDetail = () => {
  const { sectorId } = useParams();
  const navigate = useNavigate();
  const { sectors, loading: sectorsLoading } = useSectors();
  const { careers, loading: careersLoading } = useCareers(sectorId);
  const { formations, loading: formationsLoading } = useFormations(sectorId);
  const { testimonials, loading: testimonialsLoading } = useTestimonials();

  const sector = sectors.find(s => s.id === sectorId);

  if (sectorsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!sector) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Secteur non trouvé</h1>
          <Button onClick={() => navigate('/careers')}>
            Retour aux secteurs
          </Button>
        </div>
      </div>
    );
  }

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: i * 0.1,
        ease: "easeOut" as const,
      },
    }),
  };

  const sectorTestimonials = testimonials.filter(t => 
    t.specialite.toLowerCase().includes(sector.name.toLowerCase())
  ).slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative py-20 overflow-hidden"
        style={{ backgroundColor: sector.color + '15' }}
      >
        <div className="absolute inset-0 bg-gradient-hero opacity-20" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <Button 
              variant="ghost" 
              onClick={() => navigate('/careers')}
              className="mb-6 text-foreground/70 hover:text-foreground"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour aux secteurs
            </Button>
          </motion.div>

          <motion.div
            custom={1}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl"
          >
            <h1 className="text-5xl md:text-6xl font-bold font-cal text-foreground mb-6">
              Secteur {sector.name}
            </h1>
            {sector.description && (
              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                {sector.description}
              </p>
            )}
          </motion.div>
        </div>
      </motion.section>

      {/* Content Tabs */}
      <motion.section
        custom={2}
        variants={fadeUpVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 -mt-10 relative z-20"
      >
        <Tabs defaultValue="careers" className="space-y-8">
          <TabsList className="bg-card/80 backdrop-blur-sm border shadow-card p-1 h-auto">
            <TabsTrigger value="careers" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Briefcase className="mr-2 h-4 w-4" />
              Métiers populaires
            </TabsTrigger>
            <TabsTrigger value="formations" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <GraduationCap className="mr-2 h-4 w-4" />
              Formations
            </TabsTrigger>
            <TabsTrigger value="testimonials" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Star className="mr-2 h-4 w-4" />
              Témoignages
            </TabsTrigger>
          </TabsList>

          {/* Careers Tab */}
          <TabsContent value="careers" className="space-y-6">
            {careersLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-6">
                      <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-muted rounded w-1/2 mb-4"></div>
                      <div className="space-y-2">
                        <div className="h-3 bg-muted rounded"></div>
                        <div className="h-3 bg-muted rounded w-5/6"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {careers.map((career, index) => (
                  <motion.div
                    key={career.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="h-full hover:shadow-elegant transition-all duration-300 bg-gradient-card border-0">
                      <CardHeader>
                        <CardTitle className="text-lg font-cal">{career.title}</CardTitle>
                        {career.salary_range && (
                          <Badge variant="secondary" className="w-fit">
                            {career.salary_range}
                          </Badge>
                        )}
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                          {career.description}
                        </p>
                        {career.required_education && (
                          <div className="flex items-center text-sm text-muted-foreground">
                            <GraduationCap className="mr-2 h-4 w-4" />
                            {career.required_education}
                          </div>
                        )}
                        {career.skills && career.skills.length > 0 && (
                          <div className="mt-4 flex flex-wrap gap-1">
                            {career.skills.slice(0, 3).map((skill, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Formations Tab */}
          <TabsContent value="formations" className="space-y-6">
            {formationsLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(4)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-6">
                      <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-muted rounded w-1/2 mb-4"></div>
                      <div className="space-y-2">
                        <div className="h-3 bg-muted rounded"></div>
                        <div className="h-3 bg-muted rounded w-5/6"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {formations.map((formation, index) => (
                  <motion.div
                    key={formation.id}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-elegant transition-all duration-300 bg-gradient-card border-0">
                      <CardHeader>
                        <CardTitle className="text-lg font-cal">{formation.title}</CardTitle>
                        <div className="flex gap-2 flex-wrap">
                          <Badge variant="outline">
                            {formation.level}
                          </Badge>
                          {formation.duration && (
                            <Badge variant="secondary">
                              <Calendar className="mr-1 h-3 w-3" />
                              {formation.duration}
                            </Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                          {formation.description}
                        </p>
                        {formation.university && (
                          <div className="flex items-center text-sm text-muted-foreground mb-2">
                            <GraduationCap className="mr-2 h-4 w-4" />
                            {formation.university}
                          </div>
                        )}
                        {formation.location && (
                          <div className="flex items-center text-sm text-muted-foreground">
                            <MapPin className="mr-2 h-4 w-4" />
                            {formation.location}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Testimonials Tab */}
          <TabsContent value="testimonials" className="space-y-6">
            {testimonialsLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-6">
                      <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-muted rounded w-1/2 mb-4"></div>
                      <div className="space-y-2">
                        <div className="h-3 bg-muted rounded"></div>
                        <div className="h-3 bg-muted rounded w-5/6"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : sectorTestimonials.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sectorTestimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <Card className="hover:shadow-elegant transition-all duration-300 bg-gradient-card border-0">
                      <CardContent className="p-6">
                        <div className="flex items-center mb-4">
                          <div className="flex text-yellow-400">
                            {[...Array(testimonial.note)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-current" />
                            ))}
                          </div>
                        </div>
                        <p className="text-muted-foreground mb-4 italic leading-relaxed">
                          "{testimonial.contenu}"
                        </p>
                        <div>
                          <p className="font-semibold text-foreground">
                            {testimonial.nom_etudiant}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {testimonial.specialite} - {testimonial.universite}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <Card className="bg-gradient-card border-0">
                <CardContent className="p-12 text-center">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Aucun témoignage disponible
                  </h3>
                  <p className="text-muted-foreground">
                    Les témoignages d'étudiants pour ce secteur seront bientôt disponibles.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </motion.section>
    </div>
  );
};

export default SectorDetail;