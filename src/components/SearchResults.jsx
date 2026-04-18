import React from "react";
import useRecomendations from "../hooks/useRecomendations";
import RecomendationCard from "./RecomendationCard";
import Pagination from "./Pagination";
import { useAppDispatch } from "../redux/store";
import { clearSearch } from "../redux/routopiaActions";

const SearchResults = ({ searchQuery }) => {
  const {
    destinations,
    fetching_destinations,
    totalPages,
    currentPage,
    goToPage,
    updateQuery,
  } = useRecomendations({ q: searchQuery }, 10);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (searchQuery && searchQuery.trim()) {
      updateQuery({ q: searchQuery });
    }
  }, [searchQuery]);

  const handleClearSearch = () => {
    dispatch(clearSearch());
  };

  return (
    <div className="search-results-container">
      <div className="search-results-header">
        <h2>Resultados de búsqueda para: "{searchQuery}"</h2>
        <button onClick={handleClearSearch}>Limpiar búsqueda</button>
      </div>

      <div className="recomendations">
        {fetching_destinations ? (
          <p>Cargando...</p>
        ) : destinations.length === 0 ? (
          <p>No se encontraron destinos para tu búsqueda.</p>
        ) : (
          destinations.map((destination) => (
            <RecomendationCard
              key={destination.id}
              id={destination.id}
              name={destination.name}
              location={destination.location}
              score={destination.punctuation}
              price={destination.precio}
              image={destination.imageUrl}
            />
          ))
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={goToPage}
        loading={fetching_destinations}
        previousLabel="← Anterior"
        nextLabel="Siguiente →"
      />
    </div>
  );
};

export default SearchResults;
