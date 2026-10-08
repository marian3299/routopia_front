import api from "./api";
import { URLS } from "./urls";

export const getWhatsappSettings = async () => {
  try {
    const response = await api.get(URLS.GET_WHATSAPP_SETTINGS);
    return response.data;
  } catch (error) {
    console.error("Error fetching whatsapp settings:", error);
    throw error;
  }
};

export const updateWhatsappSettings = async (whatsappNumber, whatsappMessage) => {
  try {
    const response = await api.put(URLS.UPDATE_WHATSAPP_SETTINGS, {
      whatsappNumber,
      whatsappMessage,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating whatsapp settings:", error);
    throw error;
  }
};
