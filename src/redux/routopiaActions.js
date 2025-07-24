import {
  getDestinationById,
  getDestinations,
} from "../services/destino.service";
import { actions } from "./routopiaSilce";

export const getDestinationsList = (query) => async (dispatch) => {
  dispatch(actions.setDestinations({ fetching_destinations: true }));
  try {
    const response = await getDestinations(query);
    dispatch(
      actions.setDestinations({
        fetching_destinations: false,
        destinations: response,
      })
    );
  } catch (error) {
    dispatch(
      actions.setDestinations({
        fetching_destinations: false,
        destinations: [],
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
