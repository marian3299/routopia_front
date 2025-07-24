import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { getDestinationsList } from "../redux/routopiaActions";
import { useParams } from "react-router-dom";

const useCategory = () => {
  const { destinations, fetching_destinations } = useAppSelector(
    (state) => state.routopiaStore
  );
  const dispatch = useAppDispatch();

  const { type } = useParams();

  useEffect(() => {
    dispatch(getDestinationsList(`?category=${type}`));
  }, [type]);

  const getCategoryName = () => {
    switch (type) {
      case "FRANCE":
        return "Francia";
      case "JAPAN":
        return "Japon";
      case "MEXICO":
        return "México";
      case "GREECE":
        return "Grecia";
      case "THAILAND":
        return "Tailandia";
      default:
        return "Destino";
    }
  };
  return { destinations, fetching_destinations, getCategoryName };
};

export default useCategory;
