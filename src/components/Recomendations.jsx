import React from "react";
import useRecomendations from "../hooks/useRecomendations";
import useFavorites from "../hooks/useFavorites";
import RecomendationCard from "./RecomendationCard";
import Pagination from "./Pagination";

const Recomendations = () => {
  const {
    destinations,
    fetching_destinations,
    totalPages,
    currentPage,
    goToPage,
  } = useRecomendations({}, 10);

  const {
    isAuthenticated,
    isFavorite,
    handleToggleFavorite,
    togglingId,
  } = useFavorites();

  return (
    <div className="recomendations-container">
      <h1>Recomendaciones</h1>
      <div className="recomendations">
        {fetching_destinations ? (
          <p>Cargando...</p>
        ) : (
          destinations.map((destination) => (
            <RecomendationCard
              key={destination.id}
              id={destination.id}
              name={destination.name}
              location={destination.location}
              score={destination.punctuation}
              reviewCount={destination.reviewCount ?? 0}
              price={destination.precio}
              image={destination.imageUrl}
              isAuthenticated={isAuthenticated}
              isFavorite={isFavorite(destination.id)}
              onToggleFavorite={handleToggleFavorite}
              isToggling={togglingId === destination.id}
            />
          ))
        )}
      </div>

      {/* Paginación reutilizable */}
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

export default Recomendations;
