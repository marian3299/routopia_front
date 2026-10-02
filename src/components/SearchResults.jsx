import React from "react";
import useRecomendations from "../hooks/useRecomendations";
import useCategories from "../hooks/useCategories";
import RecomendationCard from "./RecomendationCard";
import Pagination from "./Pagination";
import CategoryFilter from "./CategoryFilter";
import { useAppDispatch } from "../redux/store";
import { clearSearch } from "../redux/routopiaActions";

const formatDateParam = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

const formatDateLabel = (date) => date.toLocaleDateString("es-AR");

const buildSearchQuery = (q, categoryTypes, date) => {
  const query = {};
  const trimmed = q?.trim();
  if (trimmed) query.q = trimmed;
  if (categoryTypes?.length > 0) query.category = categoryTypes;
  if (date) query.date = formatDateParam(date);
  return query;
};

const SearchResults = ({ searchQuery, searchDate }) => {
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
  } = useRecomendations(buildSearchQuery(searchQuery, [], searchDate), 10);

  const { categories } = useCategories({ paginate: false });
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    setTotalSinFiltroCategoria(null);
  }, [searchQuery, searchDate]);

  React.useEffect(() => {
    if (!searchQuery?.trim() && !searchDate) return;
    updateQuery(
      buildSearchQuery(searchQuery, selectedCategoryTypes, searchDate),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, searchDate, selectedCategoryTypes]);

  React.useEffect(() => {
    if (
      !fetching_destinations &&
      selectedCategoryTypes.length === 0 &&
      (searchQuery?.trim() || searchDate)
    ) {
      setTotalSinFiltroCategoria(totalElements);
    }
  }, [
    fetching_destinations,
    selectedCategoryTypes.length,
    totalElements,
    searchQuery,
    searchDate,
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
        <h2>
          Resultados de búsqueda
          {searchQuery?.trim() ? <> para: &quot;{searchQuery}&quot;</> : null}
          {searchDate ? (
            <>
              {" "}
              {searchQuery?.trim() ? "y " : "para "}fecha:{" "}
              {formatDateLabel(searchDate)}
            </>
          ) : null}
        </h2>
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
              reviewCount={destination.reviewCount ?? 0}
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
