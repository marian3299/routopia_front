import React from "react";
import useCategoriesList from "../hooks/useCategoriesList";

const CategoriesList = ({ selectedCategory, handleOpenForm }) => {
  const { searchTerm, setSearchTerm, filteredCategories, loading } =
    useCategoriesList();
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
        ) : filteredCategories.length === 0 ? (
          <div className="no-users">No se encontraron categorías</div>
        ) : (
          filteredCategories.map((category) => (
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
    </>
  );
};

export default CategoriesList;
