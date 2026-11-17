import React from "react";
import useRandomRecommendations from "../hooks/useRandomRecommendations";
import useFavorites from "../hooks/useFavorites";
import RecomendationCard from "./RecomendationCard";

const Recomendations = () => {
  const { destinations, fetching } = useRandomRecommendations(10);

  const { isAuthenticated, isFavorite, handleToggleFavorite, togglingId } =
    useFavorites();

  return (
    <div className="recomendations-container">
      <h1>Recomendaciones</h1>
      <div className="recomendations recomendations--featured">
        {fetching ? (
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
    </div>
  );
};

export default Recomendations;
