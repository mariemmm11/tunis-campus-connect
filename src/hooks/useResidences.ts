import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface Residence {
  id: string;
  nom: string;
  adresse: string;
  ville: string;
  capacite_totale: number;
  places_disponibles: number;
  prix_mensuel: number;
  equipements: string[];
  description: string;
  photos_urls: string[];
  telephone_contact: string;
  email_contact: string;
  coordonnees_gps?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const useResidences = () => {
  const [residences, setResidences] = useState<Residence[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchResidences = async () => {
    try {
      setLoading(true);
      // Temporary mock data until migration is run
      setResidences([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement des résidences');
    } finally {
      setLoading(false);
    }
  };

  // Filtrer les résidences par ville
  const filterByVille = (ville: string) => {
    if (!ville) return residences;
    return residences.filter(residence => 
      residence.ville.toLowerCase().includes(ville.toLowerCase())
    );
  };

  // Filtrer par budget maximum
  const filterByBudget = (maxBudget: number) => {
    return residences.filter(residence => residence.prix_mensuel <= maxBudget);
  };

  // Filtrer par disponibilité
  const filterByAvailability = () => {
    return residences.filter(residence => residence.places_disponibles > 0);
  };

  useEffect(() => {
    fetchResidences();
  }, []);

  return {
    residences,
    loading,
    error,
    filterByVille,
    filterByBudget,
    filterByAvailability,
    refetch: fetchResidences
  };
};