//Destinos
import axios from "axios";
import { URLS } from "./urls";

export const getDestinations = async (query = "") => {
  try {
    const response = await axios.get(
      `${URLS.GET_DESTINATIONS}${query ? `${query}` : ""}`
    );
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
