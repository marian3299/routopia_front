import React from "react";
import useRecomendations from "../hooks/useRecomendations";
import useCategories from "../hooks/useCategories";
import RecomendationCard from "./RecomendationCard";
import Pagination from "./Pagination";
import CategoryFilter from "./CategoryFilter";
import { useAppDispatch } from "../redux/store";
import { clearSearch } from "../redux/routopiaActions";

const buildSearchQuery = (q, categoryTypes) => {
  const query = {};
  const trimmed = q?.trim();
  if (trimmed) query.q = trimmed;
  if (categoryTypes?.length > 0) query.category = categoryTypes;
  return query;
};

const SearchResults = ({ searchQuery }) => {
  const [selectedCategoryTypes, setSelectedCategoryTypes] = React.useState([]);
  const [totalSinFiltroCategoria, setTotalSinFiltroCategoria] =
    React.useState(null);

  const {
    destinations,
    fetching_destinations,
    totalElements,
    totalPages,
    currentPage,
    goToPage,
    updateQuery,
  } = useRecomendations(buildSearchQuery(searchQuery, []), 10);

  const { categories } = useCategories();
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    setTotalSinFiltroCategoria(null);
  }, [searchQuery]);

  React.useEffect(() => {
    if (!searchQuery?.trim()) return;
    updateQuery(buildSearchQuery(searchQuery, selectedCategoryTypes));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, selectedCategoryTypes]);

  React.useEffect(() => {
    if (
      !fetching_destinations &&
      selectedCategoryTypes.length === 0 &&
      searchQuery?.trim()
    ) {
      setTotalSinFiltroCategoria(totalElements);
    }
  }, [
    fetching_destinations,
    selectedCategoryTypes.length,
    totalElements,
    searchQuery,
  ]);

  const handleClearSearch = () => {
    dispatch(clearSearch());
  };

  const toggleCategoryType = (catType) => {
    setSelectedCategoryTypes((prev) =>
      prev.includes(catType)
        ? prev.filter((t) => t !== catType)
        : [...prev, catType]
    );
  };

  const clearCategoryFilters = () => setSelectedCategoryTypes([]);

  const isInitialLoad = fetching_destinations && destinations.length === 0;
  const isRefreshing = fetching_destinations && destinations.length > 0;

  const filteredCount = totalElements ?? 0;
  const totalLista =
    selectedCategoryTypes.length > 0
      ? totalSinFiltroCategoria ?? filteredCount
      : filteredCount;

  return (
    <div className="search-results-container">
      <div className="search-results-header">
        <h2>Resultados de búsqueda para: &quot;{searchQuery}&quot;</h2>
        <button type="button" onClick={handleClearSearch}>
          Limpiar búsqueda
        </button>
      </div>

      <CategoryFilter
        categories={categories}
        selectedTypes={selectedCategoryTypes}
        onToggleType={toggleCategoryType}
        onClearFilters={clearCategoryFilters}
        showClearButton={selectedCategoryTypes.length > 0}
        filteredCount={filteredCount}
        totalCount={totalLista}
        loading={fetching_destinations}
        className="search-results-filter"
      />

      <div
        className={`recomendations${isRefreshing ? " recomendations--refreshing" : ""}`}
        aria-busy={fetching_destinations || undefined}
      >
        {isInitialLoad ? (
          <p className="recomendations-loading-msg">Cargando...</p>
        ) : destinations.length === 0 ? (
          <p>No se encontraron destinos para tu búsqueda.</p>
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

export default SearchResults;
