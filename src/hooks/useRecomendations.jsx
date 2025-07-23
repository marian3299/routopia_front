import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { getDestinationsList } from "../redux/routopiaActions";

const useRecomendations = () => {
  const { recomendations, fetching_recomendations } = useAppSelector(
    (state) => state.routopiaStore
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getDestinationsList());
  }, []);

  return { recomendations, fetching_recomendations };
};

export default useRecomendations;
