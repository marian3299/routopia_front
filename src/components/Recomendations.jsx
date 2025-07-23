import React from "react";
import useRecomendations from "../hooks/useRecomendations";
import RecomendationCard from "./RecomendationCard";

const Recomendations = () => {
  const { destinations, fetching_destinations } = useRecomendations();
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
    </div>
  );
};

export default Recomendations;
