import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

export interface StudentClub {
  id: string;
  nom: string;
  description: string;
  campus: string;
  type: string;
  logo_url?: string;
  president: string;
  email_contact: string;
  nombre_membres: number;
  date_creation: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ClubMembership {
  id: string;
  club_id: string;
  user_id: string;
  date_adhesion: string;
  is_active: boolean;
}

export const useStudentClubs = () => {
  const [clubs, setClubs] = useState<StudentClub[]>([]);
  const [userMemberships, setUserMemberships] = useState<ClubMembership[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  // Récupérer tous les clubs actifs
  const fetchClubs = async () => {
    try {
      // Temporary mock data until migration is run
      setClubs([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement des clubs');
    }
  };

  // Récupérer les adhésions de l'utilisateur connecté
  const fetchUserMemberships = async () => {
    if (!user) return;

    try {
      // Temporary mock data until migration is run
      setUserMemberships([]);
    } catch (err) {
      console.error('Erreur lors du chargement des adhésions:', err);
    }
  };

  // Rejoindre un club
  const joinClub = async (clubId: string) => {
    if (!user) {
      toast.error('Vous devez être connecté pour rejoindre un club');
      return false;
    }

    toast.info('Migration de base de données requise pour cette fonctionnalité');
    return false;
  };

  // Quitter un club
  const leaveClub = async (clubId: string) => {
    if (!user) return false;
    
    toast.info('Migration de base de données requise pour cette fonctionnalité');
    return false;
  };

  // Vérifier si l'utilisateur est membre d'un club
  const isMemberOfClub = (clubId: string) => {
    return userMemberships.some(
      membership => membership.club_id === clubId && membership.is_active
    );
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchClubs(), fetchUserMemberships()]);
      setLoading(false);
    };

    loadData();
  }, [user]);

  return {
    clubs,
    userMemberships,
    loading,
    error,
    joinClub,
    leaveClub,
    isMemberOfClub,
    refetch: () => Promise.all([fetchClubs(), fetchUserMemberships()])
  };
};