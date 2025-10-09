import React from "react";
import ReactPaginate from "react-paginate";

/**
 * Componente de paginación reutilizable
 * @param {Object} props - Propiedades del componente
 * @param {number} props.currentPage - Página actual (índice basado en 0)
 * @param {number} props.totalPages - Total de páginas
 * @param {Function} props.onPageChange - Función que se ejecuta al cambiar de página
 * @param {boolean} props.loading - Estado de carga
 * @param {number} props.marginPagesDisplayed - Páginas a mostrar en los extremos
 * @param {number} props.pageRangeDisplayed - Páginas a mostrar en el centro
 * @param {string} props.previousLabel - Texto del botón anterior
 * @param {string} props.nextLabel - Texto del botón siguiente
 * @param {string} props.breakLabel - Texto para indicar páginas omitidas
 * @param {string} props.containerClassName - Clase CSS del contenedor
 */
const Pagination = ({
  currentPage = 0,
  totalPages = 1,
  onPageChange,
  loading = false,
  marginPagesDisplayed = 2,
  pageRangeDisplayed = 5,
  previousLabel = "← Anterior",
  nextLabel = "Siguiente →",
  breakLabel = "...",
  containerClassName = "pagination-container",
}) => {
  // Validar que totalPages sea un número entero válido mayor a 1
  const validTotalPages = Math.ceil(totalPages) || 0;

  if (validTotalPages <= 1 || loading || !validTotalPages) {
    return null;
  }

  const handlePageChange = ({ selected }) => {
    if (onPageChange && typeof onPageChange === "function") {
      onPageChange(selected);
    }
  };

  return (
    <div className={containerClassName}>
      <ReactPaginate
        pageCount={validTotalPages}
        onPageChange={handlePageChange}
        forcePage={currentPage}
        containerClassName="pagination"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        activeClassName="active"
        disabledClassName="disabled"
        previousLabel={previousLabel}
        nextLabel={nextLabel}
        breakLabel={breakLabel}
        breakClassName="page-item"
        breakLinkClassName="page-link"
        marginPagesDisplayed={marginPagesDisplayed}
        pageRangeDisplayed={pageRangeDisplayed}
      />
    </div>
  );
};

export default Pagination;
