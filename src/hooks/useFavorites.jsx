import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNotification } from "../context/useNotificationProvider";
import { getFavoriteIds, toggleFavorite } from "../services/favorite.service";

const useFavorites = () => {
  const { user } = useAuth();
  const { notify } = useNotification();
  const [favoriteIds, setFavoriteIds] = useState(new Set());
  const [loadingFavorites, setLoadingFavorites] = useState(false);
  const [togglingId, setTogglingId] = useState(null);

  const fetchFavorites = useCallback(async () => {
    if (!user) {
      setFavoriteIds(new Set());
      return;
    }

    setLoadingFavorites(true);
    try {
      const ids = await getFavoriteIds();
      setFavoriteIds(new Set(ids));
    } catch (error) {
      console.error("Error loading favorites:", error);
    } finally {
      setLoadingFavorites(false);
    }
  }, [user]);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const handleToggleFavorite = async (destinoId, event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!user) {
      notify({
        message: "Inicia sesión para marcar favoritos.",
        type: "error",
      });
      return;
    }

    const wasFavorite = favoriteIds.has(destinoId);
    setFavoriteIds((prev) => {
      const next = new Set(prev);
      if (wasFavorite) {
        next.delete(destinoId);
      } else {
        next.add(destinoId);
      }
      return next;
    });

    setTogglingId(destinoId);
    try {
      const result = await toggleFavorite(destinoId);
      setFavoriteIds((prev) => {
        const next = new Set(prev);
        if (result.favorite) {
          next.add(destinoId);
        } else {
          next.delete(destinoId);
        }
        return next;
      });
    } catch (error) {
      console.error("Error toggling favorite:", error);
      setFavoriteIds((prev) => {
        const next = new Set(prev);
        if (wasFavorite) {
          next.add(destinoId);
        } else {
          next.delete(destinoId);
        }
        return next;
      });
      notify({
        message: "No se pudo actualizar el favorito. Intenta nuevamente.",
        type: "error",
      });
    } finally {
      setTogglingId(null);
    }
  };

  const isFavorite = (destinoId) => favoriteIds.has(destinoId);

  return {
    isAuthenticated: !!user,
    isFavorite,
    handleToggleFavorite,
    loadingFavorites,
    togglingId,
  };
};

export default useFavorites;
