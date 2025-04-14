import { useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFavoritesByUser } from "../../productsDetails/services/productsApi";
import { User } from "firebase/auth";

export const useFavorites = (currentUser: User | null) => {
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFavorites = useCallback(async () => {
    if (!currentUser) return;
    setLoading(true);
    setError(null);
    try {
      const favoritesFromFirebase = await getFavoritesByUser(currentUser.uid);
      await AsyncStorage.setItem("favorites", JSON.stringify(favoritesFromFirebase));
      setFavorites(favoritesFromFirebase);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error fetching favorites");
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  return {
    favorites,
    loading,
    error,
    fetchFavorites,
  };
};
