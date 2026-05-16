import React from "react";
import Pagination from "./Pagination";

const CategoriesList = ({
  selectedCategory,
  handleOpenForm,
  searchTerm,
  setSearchTerm,
  categories,
  loading,
  totalPages,
  currentPage,
  goToPage,
}) => {
  return (
    <>
      <div className="users-search-container">
        <input
          type="text"
          placeholder="Buscar categoría"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="users-search-input"
        />
      </div>
      <div className="users-list">
        {loading ? (
          <div className="loading">Cargando...</div>
        ) : categories.length === 0 ? (
          <div className="no-users">No se encontraron categorías</div>
        ) : (
          categories.map((category) => (
            <div
              key={category.id}
              className={`user-item ${
                selectedCategory?.id === category.id ? "active" : ""
              }`}
              onClick={() => handleOpenForm(category)}
            >
              <div className="user-item-content">
                <span className="user-email">{category.name}</span>
              </div>
            </div>
          ))
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={goToPage}
        loading={loading}
        previousLabel="← Anterior"
        nextLabel="Siguiente →"
      />
    </>
  );
};

export default CategoriesList;