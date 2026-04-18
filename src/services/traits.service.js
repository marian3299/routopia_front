import api from "./api";
import { URLS } from "./urls";

export const getTraits = async () => {
  const response = await api.get(URLS.GET_TRAITS);
  return response.data;
};

export const getTraitById = async (id) => {
  const response = await api.get(URLS.GET_TRAIT_BY_ID(id));
  return response.data;
};

export const createTrait = async (formData) => {
  try {
    const response = await api.post(URLS.CREATE_TRAIT, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating trait:", error);
    throw error;
  }
};

export const updateTrait = async (id, formData) => {
  try {
    const response = await api.put(URLS.UPDATE_TRAIT(id), formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating trait:", error);
    throw error;
  }
};

export const deleteTrait = async (id) => {
  const response = await api.delete(URLS.DELETE_TRAIT(id));
  return response.data;
};
