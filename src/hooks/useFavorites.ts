import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { toast } from "sonner";

export interface Favorite {
  id: string;
  user_id: string;
  item_type: string;
  item_id: string;
  created_at: string;
}

export const useFavorites = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchFavorites();
    } else {
      setFavorites([]);
    }
  }, [user]);

  const fetchFavorites = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("favorites")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setFavorites(data || []);
    } catch (err) {
      console.error("Error fetching favorites:", err);
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = async (itemType: string, itemId: string) => {
    if (!user) {
      toast.error("Veuillez vous connecter pour ajouter aux favoris");
      return false;
    }

    try {
      const { error } = await supabase
        .from("favorites")
        .insert({
          user_id: user.id,
          item_type: itemType,
          item_id: itemId,
        });

      if (error) throw error;

      await fetchFavorites();
      toast.success("Ajouté aux favoris !");
      return true;
    } catch (err) {
      toast.error("Erreur lors de l'ajout aux favoris");
      return false;
    }
  };

  const removeFromFavorites = async (itemType: string, itemId: string) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from("favorites")
        .delete()
        .eq("user_id", user.id)
        .eq("item_type", itemType)
        .eq("item_id", itemId);

      if (error) throw error;

      await fetchFavorites();
      toast.success("Retiré des favoris");
      return true;
    } catch (err) {
      toast.error("Erreur lors de la suppression");
      return false;
    }
  };

  const isFavorite = (itemType: string, itemId: string) => {
    return favorites.some(
      fav => fav.item_type === itemType && fav.item_id === itemId
    );
  };

  const toggleFavorite = async (itemType: string, itemId: string) => {
    if (isFavorite(itemType, itemId)) {
      return await removeFromFavorites(itemType, itemId);
    } else {
      return await addToFavorites(itemType, itemId);
    }
  };

  return {
    favorites,
    loading,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorite,
    refetch: fetchFavorites,
  };
};