import React from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { clearSearch } from "../redux/routopiaActions";
import RecomendationCard from "./RecomendationCard";

const SearchResults = () => {
  const { search, destinations, fetching_destinations } = useAppSelector(
    (state) => state.routopiaStore
  );
  const dispatch = useAppDispatch();

  console.log(destinations, fetching_destinations);

  return (
    <div className="search-results-container">
      <div className="search-results-header">
        <h2>Resultados de búsqueda: {search}</h2>
        <button onClick={() => dispatch(clearSearch())}>
          Limpiar búsqueda
        </button>
      </div>
      <div className="recomendations">
        {destinations?.map((destination) => (
          <RecomendationCard
            key={destination.id}
            id={destination.id}
            name={destination.name}
            location={destination.location}
            score={destination.punctuation}
            price={destination.precio}
            image={destination.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
