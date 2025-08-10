import {
  getDestinationById,
  getDestinations,
} from "../services/destino.service";
import { actions } from "./routopiaSilce";

// Acciones para el estado de búsqueda
export const setSearch = (search) => (dispatch) => {
  dispatch(actions.setSearch({ search }));
};

export const setHasSearch = (hasSearch) => (dispatch) => {
  dispatch(actions.setHasSearch({ hasSearch }));
};

export const clearSearch = () => (dispatch) => {
  dispatch(actions.setSearch({ search: "" }));
  dispatch(actions.setHasSearch({ hasSearch: false }));
};

export const getDestinationsList =
  (query, page = 0, size = 10) =>
  async (dispatch) => {
    dispatch(actions.setDestinations({ fetching_destinations: true }));
    try {
      // Agregar parámetros de paginación al query
      const paginationParams = {
        ...query,
        page,
        size,
      };

      const response = await getDestinations(paginationParams);
      dispatch(
        actions.setDestinations({
          fetching_destinations: false,
          destinations: response.content || response, // Soporta tanto paginación como lista simple
          totalElements: response.totalElements || response.length,
          totalPages: response.totalPages || Math.ceil(response.length / size),
          currentPage: page,
          pageSize: size,
        })
      );
    } catch (error) {
      dispatch(
        actions.setDestinations({
          fetching_destinations: false,
          destinations: [],
          totalElements: 0,
          totalPages: 0,
          currentPage: page,
          pageSize: size,
        })
      );
      console.error(error);
    }
  };

export const getDestinationDetail = (id) => async (dispatch) => {
  dispatch(actions.setDestination({ fetching_destination: true }));
  try {
    const response = await getDestinationById(id);
    dispatch(
      actions.setDestination({
        fetching_destination: false,
        destination: response,
      })
    );
  } catch (error) {
    dispatch(
      actions.setDestination({
        fetching_destination: false,
        destination: null,
      })
    );
    console.error(error);
  }
};
