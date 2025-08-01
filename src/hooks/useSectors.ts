import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface Sector {
  id: string;
  name: string;
  description: string | null;
  color: string;
  icon: string | null;
  created_at: string;
  updated_at: string;
}

export const useSectors = () => {
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSectors();
  }, []);

  const fetchSectors = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("sectors")
        .select("*")
        .order("name");

      if (error) throw error;
      setSectors(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  return { sectors, loading, error, refetch: fetchSectors };
};