import React from "react";
import useCategories from "../hooks/useCategories";
import { Link } from "react-router-dom";

const Categories = () => {
  const { categories, loading } = useCategories();

  return (
    <div className="categories-container">
      <h1>Destinos populares</h1>
      <p>Explora los mejores lugares para visitar.</p>
      <div className="categories">
        {loading ? (
          <p>Cargando categorías...</p>
        ) : categories.length === 0 ? (
          <p>No hay categorías disponibles.</p>
        ) : (
          categories.map((category) => (
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
          ))
        )}
      </div>
    </div>
  );
};

export default Categories;