import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface Testimonial {
  id: string;
  nom_etudiant: string;
  universite: string;
  specialite: string;
  contenu: string;
  note: number;
  photo_url?: string;
  date_publication: string;
  is_approved: boolean;
  created_at: string;
  updated_at: string;
}

export const useTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('is_approved', true)
        .order('date_publication', { ascending: false })
        .limit(10);

      if (error) throw error;
      setTestimonials(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement des témoignages');
    } finally {
      setLoading(false);
    }
  };

  // Filtrer par université
  const filterByUniversity = (university: string) => {
    if (!university) return testimonials;
    return testimonials.filter(testimonial => 
      testimonial.universite.toLowerCase().includes(university.toLowerCase())
    );
  };

  // Filtrer par spécialité
  const filterBySpecialty = (specialty: string) => {
    if (!specialty) return testimonials;
    return testimonials.filter(testimonial => 
      testimonial.specialite.toLowerCase().includes(specialty.toLowerCase())
    );
  };

  // Obtenir les témoignages les mieux notés
  const getTopRatedTestimonials = (limit = 5) => {
    return testimonials
      .sort((a, b) => b.note - a.note)
      .slice(0, limit);
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  return {
    testimonials,
    loading,
    error,
    filterByUniversity,
    filterBySpecialty,
    getTopRatedTestimonials,
    refetch: fetchTestimonials
  };
};