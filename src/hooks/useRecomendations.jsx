import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { getDestinationsList } from "../redux/routopiaActions";
import usePagination from "./usePagination";

const useRecomendations = (initialQuery = {}, pageSize = 10) => {
  const { destinations, fetching_destinations, totalElements, totalPages } =
    useAppSelector((state) => state.routopiaStore);

  const dispatch = useAppDispatch();

  const pagination = usePagination(
    (query, page, size) => {
      return dispatch(getDestinationsList(query, page, size));
    },
    0,
    pageSize,
    initialQuery
  );

  useEffect(() => {
    pagination.goToPage(0);
  }, []);

  return {
    destinations,
    fetching_destinations,
    totalElements,
    totalPages,
    currentPage: pagination.currentPage,
    pageSize: pagination.pageSize,
    ...pagination,
  };
};

export default useRecomendations;
