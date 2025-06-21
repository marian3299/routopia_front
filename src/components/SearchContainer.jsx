import React from "react";

const SearchContainer = () => {
  return (
    <div className="search-container">
      <h1>Busca tu nueva aventura</h1>
      <div className="input-container">
        <input type="text" placeholder="Buscar tour" />
        <button>Buscar</button>
      </div>
    </div>
  );
};

export default SearchContainer;
