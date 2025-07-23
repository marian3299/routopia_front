import React from "react";
import useRecomendations from "../hooks/useRecomendations";
import RecomendationCard from "../components/RecomendationCard";

const Category = () => {
  const { destinations } = useRecomendations();
  return (
    <div className="main-container">
      <div className="category-container">
        <div className="title-container">
          <h1>Paris</h1>
        </div>

        <div className="recomendations category-recomendations">
          {destinations.map((destination) => (
            <RecomendationCard
              key={destination.id}
              id={destination.id}
              name={destination.name}
              location={destination.location}
              score={destination.score}
              price={destination.price}
              image={destination.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
