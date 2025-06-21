//Destinos
import axios from "axios";
import { URLS } from "./urls";

export const getDestinations = async () => {
  try {
    const response = await axios.get(URLS.GET_DESTINATIONS);
    return response.data;
  } catch (error) {
    console.error("Error fetching destinations:", error);
    // Es una buena práctica relanzar el error o devolver un valor
    // que indique que la operación falló, para que el componente
    // que llama a esta función pueda manejarlo.
    throw error;
  }
};
