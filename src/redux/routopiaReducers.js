const commonAction = (state, action) => {
  return {
    ...state,
    ...action.payload,
  };
};

const cases = {
  SET_RECOMENDATIONS: "setRecomendations",
  SET_FETCHING_RECOMENDATIONS: "setFetchingRecomendations",
};

const reducers = {
  [cases.SET_RECOMENDATIONS]: commonAction,
  [cases.SET_FETCHING_RECOMENDATIONS]: commonAction,
};

export default reducers;
