import { useCallback, useEffect, useState } from "react";
import { getCategories } from "../services/category.service";

const PAGE_SIZE = 10;

/**
 * @param {Object} options
 * @param {number} [options.page=0] - Página actual (0-based), solo si paginate es true
 * @param {number} [options.pageSize=10] - Tamaño de página
 * @param {boolean} [options.paginate=true] - Si false, trae todo el catálogo (p. ej. filtros de búsqueda)
 */
const useCategories = ({ page = 0, pageSize = PAGE_SIZE, paginate = true } = {}) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const res = paginate
        ? await getCategories({ page, size: pageSize })
        : await getCategories({ paginate: false });

      setCategories(res.content ?? []);
      setTotalPages(res.totalPages ?? 0);
      setTotalElements(res.totalElements ?? 0);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setCategories([]);
      setTotalPages(0);
      setTotalElements(0);
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, paginate]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return {
    categories,
    loading,
    totalPages,
    totalElements,
    refetch: fetchCategories,
  };
};

export default useCategories;
