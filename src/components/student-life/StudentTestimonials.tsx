import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useTestimonials } from "@/hooks/useTestimonials";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const StudentTestimonials = () => {
  const { testimonials, loading, error } = useTestimonials();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Navigation du carrousel
  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Rendu des étoiles
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating 
            ? 'fill-yellow-400 text-yellow-400' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <Skeleton className="h-8 w-64 mx-auto mb-4" />
          <Skeleton className="h-4 w-96 mx-auto" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Skeleton className="w-12 h-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                </div>
                <Skeleton className="h-20 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-destructive mb-4">{error}</p>
        <Button onClick={() => window.location.reload()}>
          Réessayer
        </Button>
      </div>
    );
  }

  if (testimonials.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">
          Aucun témoignage disponible pour le moment.
        </p>
      </div>
    );
  }

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-4">
          Témoignages d'Étudiants
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Découvrez les expériences authentiques de nos étudiants.
        </p>
      </div>

      {/* Carrousel principal */}
      <div className="relative">
        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-8">
            <div className="flex items-start gap-6">
              {/* Avatar et infos étudiant */}
              <div className="flex-shrink-0">
                <Avatar className="w-16 h-16 mb-4">
                  <AvatarImage src={currentTestimonial.photo_url} alt={currentTestimonial.nom_etudiant} />
                  <AvatarFallback>
                    {currentTestimonial.nom_etudiant.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h3 className="font-semibold text-foreground">
                    {currentTestimonial.nom_etudiant}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {currentTestimonial.specialite}
                  </p>
                  <Badge variant="outline" className="mt-1 text-xs">
                    {currentTestimonial.universite}
                  </Badge>
                </div>
              </div>

              {/* Contenu du témoignage */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-4">
                  <Quote className="w-6 h-6 text-primary" />
                  <div className="flex items-center gap-1">
                    {renderStars(currentTestimonial.note)}
                  </div>
                </div>
                
                <blockquote className="text-lg leading-relaxed text-foreground italic">
                  "{currentTestimonial.contenu}"
                </blockquote>
                
                <div className="mt-4 text-sm text-muted-foreground">
                  Publié le {new Date(currentTestimonial.date_publication).toLocaleDateString('fr-FR')}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation du carrousel */}
        {testimonials.length > 1 && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 transform -translate-y-1/2"
              onClick={prevTestimonial}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 transform -translate-y-1/2"
              onClick={nextTestimonial}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </>
        )}
      </div>

      {/* Indicateurs de pagination */}
      {testimonials.length > 1 && (
        <div className="flex justify-center gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex 
                  ? 'bg-primary' 
                  : 'bg-muted-foreground/30'
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      )}

      {/* Grille des témoignages récents */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-center">
          Autres témoignages récents
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.slice(1, 7).map((testimonial) => (
            <Card key={testimonial.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={testimonial.photo_url} alt={testimonial.nom_etudiant} />
                    <AvatarFallback>
                      {testimonial.nom_etudiant.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium text-sm">{testimonial.nom_etudiant}</h4>
                    <p className="text-xs text-muted-foreground">{testimonial.specialite}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {renderStars(testimonial.note)}
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground line-clamp-3">
                  "{testimonial.contenu}"
                </p>
                
                <Badge variant="outline" className="mt-3 text-xs">
                  {testimonial.universite}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentTestimonials;