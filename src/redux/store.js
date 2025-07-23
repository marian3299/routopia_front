import { configureStore } from "@reduxjs/toolkit";
import routopiaReducer from "./routopiaSilce";
import { useDispatch, useSelector } from "react-redux";

const store = configureStore({
  reducer: {
    routopiaStore: routopiaReducer,
  },
});

export const useAppDispatch = useDispatch;
export const useAppSelector = useSelector;

export default store;
