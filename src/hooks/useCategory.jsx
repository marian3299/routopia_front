import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { getDestinationsList } from "../redux/routopiaActions";
import { useParams } from "react-router-dom";
import usePagination from "./usePagination";

const useCategory = (pageSize = 10) => {
  const { destinations, fetching_destinations } = useAppSelector(
    (state) => state.routopiaStore
  );
  const dispatch = useAppDispatch();
  const { type } = useParams();

  const pagination = usePagination(
    (query, page, size) => {
      return dispatch(getDestinationsList(query, page, size));
    },
    0,
    pageSize,
    type ? { category: type } : {}
  );

  useEffect(() => {
    pagination.goToPage(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (type) {
      pagination.updateQuery({ category: type });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
