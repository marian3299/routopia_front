import { createSlice } from "@reduxjs/toolkit";
import reducers from "./routopiaReducers";

export const initialState = {
  destinations: [],
  fetching_destinations: false,
  destination: null,
  fetching_destination: false,
  search: "",
  hasSearch: false,
  totalElements: 0,
  totalPages: 0,
  currentPage: 0,
  pageSize: 10,
};

const routopiaSlice = createSlice({
  name: "routopia",
  initialState,
  reducers,
});

export const actions = routopiaSlice.actions;
export default routopiaSlice.reducer;
