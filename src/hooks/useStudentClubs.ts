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
      const { data, error } = await supabase
        .from('student_clubs')
        .select('*')
        .eq('is_active', true)
        .order('nom');

      if (error) throw error;
      setClubs(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement des clubs');
    }
  };

  // Récupérer les adhésions de l'utilisateur connecté
  const fetchUserMemberships = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('club_memberships')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_active', true);

      if (error) throw error;
      setUserMemberships(data || []);
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

    // Vérifier si l'utilisateur est déjà membre
    const isAlreadyMember = userMemberships.some(
      membership => membership.club_id === clubId && membership.is_active
    );

    if (isAlreadyMember) {
      toast.info('Vous êtes déjà membre de ce club');
      return false;
    }

    try {
      const { error } = await supabase
        .from('club_memberships')
        .insert({
          club_id: clubId,
          user_id: user.id,
          date_adhesion: new Date().toISOString(),
          is_active: true
        });

      if (error) throw error;

      // Mettre à jour le nombre de membres du club
      await supabase.rpc('increment_club_members', { club_id: clubId });

      // Recharger les adhésions
      await fetchUserMemberships();
      await fetchClubs();

      toast.success('Vous avez rejoint le club avec succès !');
      return true;
    } catch (err) {
      toast.error('Erreur lors de l\'adhésion au club');
      console.error(err);
      return false;
    }
  };

  // Quitter un club
  const leaveClub = async (clubId: string) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('club_memberships')
        .update({ is_active: false })
        .eq('club_id', clubId)
        .eq('user_id', user.id);

      if (error) throw error;

      // Décrémenter le nombre de membres du club
      await supabase.rpc('decrement_club_members', { club_id: clubId });

      // Recharger les données
      await fetchUserMemberships();
      await fetchClubs();

      toast.success('Vous avez quitté le club');
      return true;
    } catch (err) {
      toast.error('Erreur lors de la sortie du club');
      console.error(err);
      return false;
    }
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