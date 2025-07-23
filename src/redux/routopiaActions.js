import { getDestinations } from "../services/destino.service";
import { actions } from "./routopiaSilce";

export const getDestinationsList = (query) => async (dispatch) => {
  dispatch(actions.setRecomendations({ fetching_recomendations: true }));
  try {
    const response = await getDestinations(query);
    dispatch(
      actions.setRecomendations({
        fetching_recomendations: false,
        recomendations: response,
      })
    );
  } catch (error) {
    dispatch(
      actions.setRecomendations({
        fetching_recomendations: false,
        recomendations: [],
      })
    );
    console.error(error);
  }
};
