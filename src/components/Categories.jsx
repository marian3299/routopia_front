import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import useCategories from "../hooks/useCategories";
import { Link } from "react-router-dom";

const ITEMS_PER_PAGE = 10;

const Categories = () => {
  const [page, setPage] = useState(0);
  const { categories, loading, totalPages, totalElements } = useCategories({
    page,
    pageSize: ITEMS_PER_PAGE,
  });

  const showArrows = totalElements > ITEMS_PER_PAGE;

  const goPrev = () => setPage((p) => Math.max(0, p - 1));
  const goNext = () => setPage((p) => Math.min(totalPages - 1, p + 1));

  return (
    <div className="categories-container">
      <h1>Destinos populares</h1>
      <p>Explora los mejores lugares para visitar.</p>

      {loading ? (
        <p className="categories-status">Cargando categorías...</p>
      ) : categories.length === 0 ? (
        <p className="categories-status">No hay categorías disponibles.</p>
      ) : (
        <div
          className={`categories-carousel${showArrows ? " categories-carousel--with-arrows" : ""}`}
        >
          {showArrows && (
            <button
              type="button"
              className="categories-carousel__arrow categories-carousel__arrow--left"
              onClick={goPrev}
              disabled={page === 0 || loading}
              aria-label="Categorías anteriores"
            >
              <FaChevronLeft />
            </button>
          )}

          <div className="categories categories-carousel__track">
            {categories.map((category) => (
              <Link to={`/category/${category.id}`} key={category.id}>
                <div
                  className="category-card"
                  style={{
                    backgroundImage: category.imageUrl
                      ? `url(${category.imageUrl})`
                      : undefined,
                  }}
                >
                  <h3>{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>

          {showArrows && (
            <button
              type="button"
              className="categories-carousel__arrow categories-carousel__arrow--right"
              onClick={goNext}
              disabled={page >= totalPages - 1 || loading}
              aria-label="Siguientes categorías"
            >
              <FaChevronRight />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Categories;