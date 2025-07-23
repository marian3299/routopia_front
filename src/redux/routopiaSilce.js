import { createSlice } from "@reduxjs/toolkit";
import reducers from "./routopiaReducers";

export const initialState = {
  destinations: [],
  fetching_destinations: false,
};

const routopiaSlice = createSlice({
  name: "routopia",
  initialState,
  reducers,
});

export const actions = routopiaSlice.actions;
export default routopiaSlice.reducer;
