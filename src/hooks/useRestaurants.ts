import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface Restaurant {
  id: string;
  nom: string;
  campus: string;
  adresse: string;
  horaires_ouverture: string;
  menu_du_jour: string[];
  prix_moyen: number;
  allergenes: string[];
  services: string[];
  telephone: string;
  description: string;
  photo_url?: string;
  notation_moyenne: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const useRestaurants = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      // Temporary mock data until migration is run
      setRestaurants([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement des restaurants');
    } finally {
      setLoading(false);
    }
  };

  // Filtrer par campus
  const filterByCampus = (campus: string) => {
    if (!campus) return restaurants;
    return restaurants.filter(restaurant => 
      restaurant.campus.toLowerCase().includes(campus.toLowerCase())
    );
  };

  // Filtrer par budget
  const filterByBudget = (maxBudget: number) => {
    return restaurants.filter(restaurant => restaurant.prix_moyen <= maxBudget);
  };

  // Filtrer par services (ex: "wifi", "terrasse", "livraison")
  const filterByServices = (service: string) => {
    return restaurants.filter(restaurant => 
      restaurant.services.some(s => s.toLowerCase().includes(service.toLowerCase()))
    );
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  return {
    restaurants,
    loading,
    error,
    filterByCampus,
    filterByBudget,
    filterByServices,
    refetch: fetchRestaurants
  };
};