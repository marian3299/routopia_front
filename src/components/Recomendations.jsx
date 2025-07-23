import React from "react";
import useRecomendations from "../hooks/useRecomendations";
import RecomendationCard from "./RecomendationCard";

const Recomendations = () => {
  const { recomendations, fetching_recomendations } = useRecomendations();
  return (
    <div className="recomendations-container">
      <h1>Recomendaciones</h1>
      <div className="recomendations">
        {fetching_recomendations ? (
          <p>Cargando...</p>
        ) : (
          recomendations.map((recomendation) => (
            <RecomendationCard
              key={recomendation.id}
              id={recomendation.id}
              name={recomendation.name}
              location={recomendation.location}
              score={recomendation.punctuation}
              price={recomendation.precio}
              image={recomendation.imageUrl}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Recomendations;
