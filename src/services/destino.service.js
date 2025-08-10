//Destinos
import axios from "axios";
import { URLS } from "./urls";

export const getDestinations = async (query = {}) => {
  try {
    // Convertir el objeto query a parámetros de URL
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

    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching destinations:", error);
    // Es una buena práctica relanzar el error o devolver un valor
    // que indique que la operación falló, para que el componente
    // que llama a esta función pueda manejarlo.
    throw error;
  }
};

export const getDestinationById = async (id) => {
  try {
    const response = await axios.get(URLS.GET_DESTINATION_BY_ID(id));
    return response.data;
  } catch (error) {
    console.error("Error fetching destination:", error);
    throw error;
  }
};

export const createDestination = async (formData) => {
  try {
    const response = await axios.post(URLS.CREATE_DESTINATION, formData, {
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
