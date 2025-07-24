import { createSlice } from "@reduxjs/toolkit";
import reducers from "./routopiaReducers";

export const initialState = {
  destinations: [],
  fetching_destinations: false,
  destination: null,
  fetching_destination: false,
};

const routopiaSlice = createSlice({
  name: "routopia",
  initialState,
  reducers,
});

export const actions = routopiaSlice.actions;
export default routopiaSlice.reducer;
