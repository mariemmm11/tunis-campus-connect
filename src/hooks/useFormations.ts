import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface Formation {
  id: string;
  title: string;
  description: string | null;
  duration: string | null;
  cost: number | null;
  location: string | null;
  university: string | null;
  sector_id: string | null;
  level: string;
  prerequisites: string[] | null;
  career_prospects: string[] | null;
  created_at: string;
  updated_at: string;
  sectors?: {
    name: string;
    color: string;
  };
}

export const useFormations = (sectorId?: string, level?: 'bac' | 'licence' | 'master' | 'doctorat' | 'formation_pro') => {
  const [formations, setFormations] = useState<Formation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFormations();
  }, [sectorId, level]);

  const fetchFormations = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from("formations")
        .select(`
          *,
          sectors (name, color)
        `)
        .order("title");

      if (sectorId) {
        query = query.eq("sector_id", sectorId);
      }

      if (level) {
        query = query.eq("level", level);
      }

      const { data, error } = await query;

      if (error) throw error;
      setFormations(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  return { formations, loading, error, refetch: fetchFormations };
};