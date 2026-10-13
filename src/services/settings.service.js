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

export const getAdminSettings = async () => {
  try {
    const response = await api.get(URLS.GET_ADMIN_SETTINGS);
    return response.data;
  } catch (error) {
    console.error("Error fetching admin settings:", error);
    throw error;
  }
};

export const updateEmailSettings = async (smtpEmail, smtpAppPassword) => {
  try {
    const response = await api.put(URLS.UPDATE_EMAIL_SETTINGS, {
      smtpEmail,
      smtpAppPassword,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating email settings:", error);
    throw error;
  }
};
