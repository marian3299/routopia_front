import { useCallback, useEffect, useRef, useState } from "react";
import { useNotification } from "../context/useNotificationProvider";
import { getCategories } from "../services/category.service";
import usePagination from "./usePagination";

const PAGE_SIZE = 10;

const useCategoriesList = (pageSize = PAGE_SIZE) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const requestIdRef = useRef(0);

  const { notify } = useNotification();

  const fetchCategories = useCallback(
    async (query, page, size) => {
      const requestId = ++requestIdRef.current;
      setLoading(true);
      try {
        const res = await getCategories({
          page,
          size,
          q: query?.q,
        });
        if (requestId !== requestIdRef.current) return;

        setCategories(res.content ?? []);
        setTotalPages(res.totalPages ?? 0);
      } catch (err) {
        if (requestId !== requestIdRef.current) return;
        console.error("Error fetching categories:", err);
        notify({ message: "Error al cargar categorías", type: "error" });
        setCategories([]);
        setTotalPages(0);
      } finally {
        if (requestId === requestIdRef.current) {
          setLoading(false);
        }
      }
    },
    [notify],
  );

  const pagination = usePagination(fetchCategories, 0, pageSize, {});

  useEffect(() => {
    pagination.goToPage(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateQueryRef = useRef(pagination.updateQuery);
  updateQueryRef.current = pagination.updateQuery;

  const handleSearch = useCallback((term) => {
    updateQueryRef.current(term ? { q: term } : {});
  }, []);

  return {
    categories,
    loading,
    totalPages,
    currentPage: pagination.currentPage,
    goToPage: pagination.goToPage,
    refresh: pagination.refresh,
    goToFirstPage: pagination.goToFirstPage,
    handleSearch,
  };
};

export default useCategoriesList;
