import React from "react";
import useCategories from "../hooks/useCategories";
import { Link } from "react-router-dom";

const Categories = () => {
  const { categories } = useCategories();
  return (
    <div className="categories-container">
      <h1>Destinos populares</h1>
      <p>Explora los mejores lugares para visitar.</p>
      <div className="categories">
        {categories.map((category) => (
          <Link to={`/category/${category.type}`} key={category.id}>
            <div
              className="category-card"
              style={{ backgroundImage: `url(${category.image})` }}
            >
              <h3>{category.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
