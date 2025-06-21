import React from "react";
import useRecomendations from "../hooks/useRecomendations";
import RecomendationCard from "../components/RecomendationCard";

const Category = () => {
  const { recomendations } = useRecomendations();
  return (
    <div className="main-container">
      <div className="category-container">
        <div className="title-container">
          <h1>Paris</h1>
        </div>

        <div className="recomendations category-recomendations">
          {recomendations.map((recomendation) => (
            <RecomendationCard
              key={recomendation.id}
              id={recomendation.id}
              name={recomendation.name}
              location={recomendation.location}
              score={recomendation.score}
              price={recomendation.price}
              image={recomendation.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
