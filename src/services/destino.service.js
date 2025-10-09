//Destinos
import api from "./api";
import { URLS } from "./urls";

export const getDestinations = async (query = {}) => {
  try {
    let queryString = "";
    if (query && Object.keys(query).length > 0) {
      const params = new URLSearchParams();
      Object.entries(query).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          params.append(key, value);
        }
      });
      queryString = params.toString();
    }

    const url = queryString
      ? `${URLS.GET_DESTINATIONS}?${queryString}`
      : URLS.GET_DESTINATIONS;

    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching destinations:", error);
    throw error;
  }
};

export const getDestinationById = async (id) => {
  try {
    const response = await api.get(URLS.GET_DESTINATION_BY_ID(id));
    return response.data;
  } catch (error) {
    console.error("Error fetching destination:", error);
    throw error;
  }
};

export const createDestination = async (formData) => {
  try {
    const response = await api.post(URLS.CREATE_DESTINATION, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating destination:", error);
    throw error;
  }
};

export const deleteDestination = async (id) => {
  try {
    const response = await api.delete(URLS.DELETE_DESTINATION(id));
    return response.data;
  } catch (error) {
    console.error("Error deleting destination:", error);
    throw error;
  }
};
