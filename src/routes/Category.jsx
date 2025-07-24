import React from "react";
import RecomendationCard from "../components/RecomendationCard";
import useCategory from "../hooks/useCategory";

const Category = () => {
  const { destinations, fetching_destinations, getCategoryName } =
    useCategory();
  return (
    <div className="main-container">
      <div className="category-container">
        <div className="title-container">
          <h1>{getCategoryName()}</h1>
        </div>

        <div className="recomendations category-recomendations">
          {fetching_destinations ? (
            <p>Cargando...</p>
          ) : (
            destinations?.map((destination) => (
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
    </div>
  );
};

export default Category;
