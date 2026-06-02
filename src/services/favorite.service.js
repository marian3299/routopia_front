import api from "./api";
import { URLS } from "./urls";

export const getFavoriteIds = async () => {
  try {
    const response = await api.get(URLS.GET_FAVORITES);
    return response.data;
  } catch (error) {
    console.error("Error fetching favorites:", error);
    throw error;
  }
};

export const getFavoriteDestinations = async ({ page = 0, size = 10 } = {}) => {
  try {
    const response = await api.get(URLS.GET_FAVORITE_DESTINATIONS, {
      params: { page, size },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching favorite destinations:", error);
    throw error;
  }
};

export const toggleFavorite = async (destinoId) => {
  try {
    const response = await api.post(URLS.TOGGLE_FAVORITE(destinoId));
    return response.data;
  } catch (error) {
    console.error("Error toggling favorite:", error);
    throw error;
  }
};
