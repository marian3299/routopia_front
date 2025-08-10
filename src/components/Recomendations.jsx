import React from "react";
import useRecomendations from "../hooks/useRecomendations";
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
              price={destination.precio}
              image={destination.imageUrl}
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
