const commonAction = (state, action) => {
  return {
    ...state,
    ...action.payload,
  };
};

const cases = {
  SET_DESTINATIONS: "setDestinations",
  SET_FETCHING_DESTINATIONS: "setFetchingDestinations",
};

const reducers = {
  [cases.SET_DESTINATIONS]: commonAction,
  [cases.SET_FETCHING_DESTINATIONS]: commonAction,
};

export default reducers;
