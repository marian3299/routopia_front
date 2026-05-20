import React from "react";

/**
 * Filtro por categorías (país / región), multiselección. Solo pensado para resultados de búsqueda.
 *
 * @param {{ id: number, name: string }[]} categories
 * @param {number[]} selectedTypes — IDs de categoría
 * @param {(categoryId: number) => void} onToggleType
 * @param {() => void} onClearFilters
 * @param {boolean} showClearButton
 * @param {number} filteredCount
 * @param {number} totalCount
 * @param {boolean} loading
 */
const CategoryFilter = ({
  categories = [],
  selectedTypes = [],
  onToggleType,
  onClearFilters,
  showClearButton = false,
  filteredCount = 0,
  totalCount = 0,
  loading = false,
  className = "",
}) => {
  return (
    <section
      className={`category-filter ${className}`.trim()}
      aria-label="Filtrar por categoría"
    >
      <div className="category-filter-row">
        <fieldset className="category-filter-fieldset">
          <legend className="category-filter-legend">Categorías</legend>
          <div className="category-filter-chips" role="group">
            {categories.map((cat) => {
              const checked = selectedTypes.includes(cat.id);
              const inputId = `category-filter-${cat.id}`;
              return (
                <label
                  key={cat.id}
                  htmlFor={inputId}
                  className="category-filter-chip"
                >
                  <input
                    id={inputId}
                    type="checkbox"
                    checked={checked}
                    onChange={() => onToggleType(cat.id)}
                  />
                  <span>{cat.name}</span>
                </label>
              );
            })}
          </div>
        </fieldset>
        {showClearButton ? (
          <button
            type="button"
            className="category-filter-clear"
            onClick={onClearFilters}
          >
            Quitar filtros
          </button>
        ) : null}
      </div>
      <p className="category-filter-summary" aria-live="polite">
        {loading ? (
          <>Actualizando resultados…</>
        ) : (
          <>
            Mostrando <strong>{filteredCount}</strong>
            {totalCount > 0 && filteredCount !== totalCount ? (
              <>
                {" "}
                de <strong>{totalCount}</strong>
              </>
            ) : null}{" "}
            producto{filteredCount === 1 ? "" : "s"} en esta lista.
          </>
        )}
      </p>
    </section>
  );
};

export default CategoryFilter;
