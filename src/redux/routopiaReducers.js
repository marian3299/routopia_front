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
  SET_SEARCH: "setSearch",
  SET_HAS_SEARCH: "setHasSearch",
};

const reducers = {
  [cases.SET_DESTINATIONS]: commonAction,
  [cases.SET_FETCHING_DESTINATIONS]: commonAction,
  [cases.SET_DESTINATION]: commonAction,
  [cases.SET_FETCHING_DESTINATION]: commonAction,
  [cases.SET_SEARCH]: commonAction,
  [cases.SET_HAS_SEARCH]: commonAction,
};

export default reducers;
