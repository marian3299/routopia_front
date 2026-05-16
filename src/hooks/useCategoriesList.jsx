import { useCallback, useEffect, useRef, useState } from "react";
import { useNotification } from "../context/useNotificationProvider";
import { getCategories } from "../services/category.service";
import usePagination from "./usePagination";

const PAGE_SIZE = 10;

const useCategoriesList = (pageSize = PAGE_SIZE) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const isFirstSearch = useRef(true);

  const { notify } = useNotification();

  const fetchCategories = useCallback(
    async (query, page, size) => {
      setLoading(true);
      try {
        const res = await getCategories({
          page,
          size,
          q: query?.q,
        });
        setCategories(res.content ?? []);
        setTotalPages(res.totalPages ?? 0);
      } catch (err) {
        console.error("Error fetching categories:", err);
        notify({ message: "Error al cargar categorías", type: "error" });
        setCategories([]);
        setTotalPages(0);
      } finally {
        setLoading(false);
      }
    },
    [notify],
  );

  const pagination = usePagination(fetchCategories, 0, pageSize, {});

  useEffect(() => {
    pagination.goToPage(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isFirstSearch.current) {
      isFirstSearch.current = false;
      return;
    }

    const timer = setTimeout(() => {
      const q = searchTerm.trim();
      pagination.updateQuery(q ? { q } : {});
    }, 300);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  return {
    categories,
    searchTerm,
    setSearchTerm,
    loading,
    totalPages,
    currentPage: pagination.currentPage,
    goToPage: pagination.goToPage,
    refresh: pagination.refresh,
    goToFirstPage: pagination.goToFirstPage,
  };
};

export default useCategoriesList;
