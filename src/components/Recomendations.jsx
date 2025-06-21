import React from "react";
import useRecomendations from "../hooks/useRecomendations";
import RecomendationCard from "./RecomendationCard";

const Recomendations = () => {
  const { recomendations } = useRecomendations();
  return (
    <div className="recomendations-container">
      <h1>Recomendaciones</h1>
      <div className="recomendations">
        {recomendations.map((recomendation) => (
          <RecomendationCard
            key={recomendation.id}
            id={recomendation.id}
            name={recomendation.name}
            location={recomendation.location}
            score={recomendation.puntuacion}
            price={recomendation.precio}
            image={recomendation.imagen}
          />
        ))}
      </div>
    </div>
  );
};

export default Recomendations;
