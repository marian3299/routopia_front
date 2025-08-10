import { useState, useCallback, useRef } from "react";

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
  initialQuery = {}
) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [query, setQuery] = useState(initialQuery);
  const isInitialized = useRef(false);

  /**
   * Función para cambiar de página
   * @param {number} newPage - Nueva página (índice basado en 0)
   */
  const goToPage = useCallback(
    async (newPage) => {
      if (newPage === currentPage && isInitialized.current) return;

      setCurrentPage(newPage);
      await fetchFunction(query, newPage, pageSize);

      if (!isInitialized.current) {
        isInitialized.current = true;
      }
    },
    [fetchFunction, query, pageSize, currentPage]
  );

  /**
   * Función para ir a la página anterior
   */
  const goToPreviousPage = useCallback(async () => {
    if (currentPage > 0) {
      await goToPage(currentPage - 1);
    }
  }, [currentPage, goToPage]);

  /**
   * Función para ir a la página siguiente
   */
  const goToNextPage = useCallback(async () => {
    await goToPage(currentPage + 1);
  }, [currentPage, goToPage]);

  /**
   * Función para actualizar la query y resetear a la primera página
   * @param {Object} newQuery - Nueva query de búsqueda
   */
  const updateQuery = useCallback(
    async (newQuery) => {
      if (JSON.stringify(newQuery) === JSON.stringify(query)) {
        return;
      }

      setQuery(newQuery);
      setCurrentPage(0);

      if (isInitialized.current) {
        await fetchFunction(newQuery, 0, pageSize);
      } else {
        isInitialized.current = true;
      }
    },
    [fetchFunction, pageSize, query]
  );

  /**
   * Función para resetear la paginación
   */
  const resetPagination = useCallback(async () => {
    setCurrentPage(0);
    setQuery(initialQuery);
    isInitialized.current = false;
    await fetchFunction(initialQuery, 0, pageSize);
  }, [fetchFunction, initialQuery, pageSize]);

  return {
    // Estado
    currentPage,
    pageSize,
    query,

    // Funciones
    goToPage,
    goToPreviousPage,
    goToNextPage,
    updateQuery,
    resetPagination,

    // Helpers
    isFirstPage: currentPage === 0,
    hasNextPage: true,
  };
};

export default usePagination;
