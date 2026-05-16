import { useState, useCallback, useRef, useEffect } from "react";

/**
 * Hook personalizado para manejar paginación
 * @param {Function} fetchFunction - Función que hace la petición al backend
 * @param {number} initialPage - Página inicial (por defecto 0)
 * @param {number} pageSize - Tamaño de página (por defecto 10)
 * @param {Object} initialQuery - Query inicial para las búsquedas
 * @returns {Object} Objeto con estado y funciones de paginación
 */
const usePagination = (
  fetchFunction,
  initialPage = 0,
  pageSize = 10,
  initialQuery = {},
) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [query, setQuery] = useState(initialQuery);
  const queryRef = useRef(initialQuery);
  const isInitialized = useRef(false);

  useEffect(() => {
    queryRef.current = query;
  }, [query]);

  const goToPage = useCallback(
    async (newPage) => {
      if (newPage === currentPage && isInitialized.current) return;

      setCurrentPage(newPage);
      await fetchFunction(queryRef.current, newPage, pageSize);

      if (!isInitialized.current) {
        isInitialized.current = true;
      }
    },
    [fetchFunction, pageSize, currentPage],
  );

  const goToPreviousPage = useCallback(async () => {
    if (currentPage > 0) {
      await goToPage(currentPage - 1);
    }
  }, [currentPage, goToPage]);

  const goToNextPage = useCallback(async () => {
    await goToPage(currentPage + 1);
  }, [currentPage, goToPage]);

  const updateQuery = useCallback(
    async (newQuery) => {
      if (JSON.stringify(newQuery) === JSON.stringify(queryRef.current)) {
        return;
      }

      queryRef.current = newQuery;
      setQuery(newQuery);
      setCurrentPage(0);

      if (isInitialized.current) {
        await fetchFunction(newQuery, 0, pageSize);
      } else {
        isInitialized.current = true;
        await fetchFunction(newQuery, 0, pageSize);
      }
    },
    [fetchFunction, pageSize],
  );

  const resetPagination = useCallback(async () => {
    setCurrentPage(0);
    queryRef.current = initialQuery;
    setQuery(initialQuery);
    isInitialized.current = false;
    await fetchFunction(initialQuery, 0, pageSize);
    isInitialized.current = true;
  }, [fetchFunction, initialQuery, pageSize]);

  const refresh = useCallback(async () => {
    await fetchFunction(queryRef.current, currentPage, pageSize);
  }, [fetchFunction, currentPage, pageSize]);

  const goToFirstPage = useCallback(async () => {
    setCurrentPage(0);
    await fetchFunction(queryRef.current, 0, pageSize);
  }, [fetchFunction, pageSize]);

  return {
    currentPage,
    pageSize,
    query,
    goToPage,
    goToPreviousPage,
    goToNextPage,
    updateQuery,
    resetPagination,
    refresh,
    goToFirstPage,
    isFirstPage: currentPage === 0,
    hasNextPage: true,
  };
};

export default usePagination;
