import { useCallback, useEffect, useState } from "react";
import { useFavorites } from "../context/FavoritesContext";
import { getFavoriteDestinations } from "../services/favorite.service";
import usePagination from "./usePagination";

const useFavoriteDestinations = (pageSize = 10) => {
  const { favoritesVersion } = useFavorites();
  const [destinations, setDestinations] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const fetchPage = useCallback(
    async (_query, page, size) => {
      setFetching(true);
      try {
        const data = await getFavoriteDestinations({ page, size });
        setDestinations(data.content || []);
        setTotalPages(data.totalPages || 0);
        setTotalElements(data.totalElements || 0);
      } catch (error) {
        console.error("Error fetching favorite destinations:", error);
        setDestinations([]);
        setTotalPages(0);
        setTotalElements(0);
      } finally {
        setFetching(false);
      }
    },
    [],
  );

  const { currentPage, goToPage, refresh } = usePagination(
    fetchPage,
    0,
    pageSize,
  );

  useEffect(() => {
    goToPage(0);
  }, []);

  useEffect(() => {
    if (favoritesVersion === 0) return;
    refresh();
  }, [favoritesVersion, refresh]);

  return {
    destinations,
    fetching,
    totalPages,
    totalElements,
    currentPage,
    goToPage,
  };
};

export default useFavoriteDestinations;
