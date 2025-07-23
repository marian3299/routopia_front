import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { getDestinationsList } from "../redux/routopiaActions";

const useRecomendations = () => {
  const { destinations, fetching_destinations } = useAppSelector(
    (state) => state.routopiaStore
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getDestinationsList());
  }, []);

  return { destinations, fetching_destinations };
};

export default useRecomendations;
