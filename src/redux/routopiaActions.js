import {
  getDestinationById,
  getDestinations,
} from "../services/destino.service";
import { actions } from "./routopiaSilce";

// Acciones para el estado de búsqueda
export const setSearch = (search) => (dispatch) => {
  dispatch(actions.setSearch({ search }));
  dispatch(actions.setInputSearch({ inputSearch: search }));
};

export const setHasSearch = (hasSearch) => (dispatch) => {
  dispatch(actions.setHasSearch({ hasSearch }));
};

export const clearSearch = () => (dispatch) => {
  dispatch(actions.setSearch({ search: "" }));
  dispatch(actions.setInputSearch({ inputSearch: "" }));
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
      const destinations = response.content || response;
      const totalElements =
        response.totalElements ||
        (Array.isArray(response) ? response.length : 0);
      const totalPages =
        response.totalPages || Math.ceil(totalElements / size) || 0;

      dispatch(
        actions.setDestinations({
          fetching_destinations: false,
          destinations: destinations || [],
          totalElements: totalElements,
          totalPages: totalPages,
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
