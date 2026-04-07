import React from "react";
import useTraitsList from "../hooks/useTraitsList";

const TraitsList = ({ selectedTrait, setSelectedTrait }) => {
  const { searchTerm, setSearchTerm, filteredTraits, loading } =
    useTraitsList();
  return (
    <>
      <div className="users-search-container">
        <input
          type="text"
          placeholder="Buscar característica"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="users-search-input"
        />
      </div>
      <div className="users-list">
        {loading ? (
          <div className="loading">Cargando...</div>
        ) : filteredTraits.length === 0 ? (
          <div className="no-users">No se encontraron características</div>
        ) : (
          filteredTraits.map((trait) => (
            <div
              key={trait.id}
              className={`user-item ${
                selectedTrait?.id === trait.id ? "active" : ""
              }`}
              onClick={() => setSelectedTrait(trait)}
            >
              <div className="user-item-content">
                <span className="user-email">{trait.name}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default TraitsList;
