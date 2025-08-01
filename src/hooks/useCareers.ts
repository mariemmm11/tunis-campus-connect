import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface Career {
  id: string;
  title: string;
  description: string | null;
  sector_id: string | null;
  required_education: string | null;
  salary_range: string | null;
  skills: string[] | null;
  prospects: string | null;
  created_at: string;
  updated_at: string;
  sectors?: {
    name: string;
    color: string;
  };
}

export const useCareers = (sectorId?: string) => {
  const [careers, setCareers] = useState<Career[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCareers();
  }, [sectorId]);

  const fetchCareers = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from("careers")
        .select(`
          *,
          sectors (name, color)
        `)
        .order("title");

      if (sectorId) {
        query = query.eq("sector_id", sectorId);
      }

      const { data, error } = await query;

      if (error) throw error;
      setCareers(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  return { careers, loading, error, refetch: fetchCareers };
};