import React from "react";
import Pagination from "./Pagination";
import SearchInput from "./SearchInput";

const TraitsList = ({
  selectedTrait,
  handleOpenForm,
  handleSearch,
  traits,
  loading,
  totalPages,
  currentPage,
  goToPage,
}) => {
  return (
    <>
      <SearchInput
        placeholder="Buscar característica"
        onSearch={handleSearch}
      />
      <div className="users-list">
        {loading ? (
          <div className="loading">Cargando...</div>
        ) : traits?.length === 0 ? (
          <div className="no-users">No se encontraron características</div>
        ) : (
          traits?.map((trait) => (
            <div
              key={trait.id}
              className={`user-item ${
                selectedTrait?.id === trait.id ? "active" : ""
              }`}
              onClick={() => handleOpenForm(trait)}
            >
              <div className="user-item-content">
                <span className="user-email">{trait.name}</span>
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

export default TraitsList;
