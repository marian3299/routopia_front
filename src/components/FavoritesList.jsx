import React from "react";
import useFavoriteDestinations from "../hooks/useFavoriteDestinations";
import useFavorites from "../hooks/useFavorites";
import RecomendationCard from "./RecomendationCard";
import Pagination from "./Pagination";

const FavoritesList = () => {
  const {
    destinations,
    fetching,
    totalPages,
    currentPage,
    goToPage,
    totalElements,
  } = useFavoriteDestinations(10);

  const {
    isAuthenticated,
    isFavorite,
    handleToggleFavorite,
    togglingId,
  } = useFavorites();

  return (
    <div className="recomendations-container">
      <h1>Mis favoritos</h1>
      {!fetching && totalElements === 0 ? (
        <p className="favorites-empty-msg">
          Aún no tienes destinos favoritos. Explora recomendaciones y marca los
          que te interesen con el corazón.
        </p>
      ) : (
        <>
          <div className="recomendations">
            {fetching ? (
              <p className="recomendations-loading-msg">Cargando...</p>
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

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={goToPage}
            loading={fetching}
            previousLabel="← Anterior"
            nextLabel="Siguiente →"
          />
        </>
      )}
    </div>
  );
};

export default FavoritesList;
