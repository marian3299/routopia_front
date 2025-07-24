const commonAction = (state, action) => {
  return {
    ...state,
    ...action.payload,
  };
};

const cases = {
  SET_DESTINATIONS: "setDestinations",
  SET_FETCHING_DESTINATIONS: "setFetchingDestinations",
  SET_DESTINATION: "setDestination",
  SET_FETCHING_DESTINATION: "setFetchingDestination",
};

const reducers = {
  [cases.SET_DESTINATIONS]: commonAction,
  [cases.SET_FETCHING_DESTINATIONS]: commonAction,
  [cases.SET_DESTINATION]: commonAction,
  [cases.SET_FETCHING_DESTINATION]: commonAction,
};

export default reducers;
