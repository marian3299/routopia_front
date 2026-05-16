import React from "react";
import useCategoriesContainer from "../hooks/useCategoriesContainer";
import useCategoriesList from "../hooks/useCategoriesList";
import CategoriesList from "../components/CategoriesList";
import CategoriesForm from "../components/CategoriesForm";
import Button from "../components/Button";

const Categories = () => {
  const { selectedCategory, handleOpenForm, openForm } =
    useCategoriesContainer();
  const categoriesList = useCategoriesList();

  return (
    <div className="users-container">
      <div className="users-list-container">
        <div className="users-list-header">
          <div className="users-list-header-content">
            <h2>Lista de categorías</h2>
            <Button
              text="Crear categoría"
              onClick={() => handleOpenForm(null)}
            />
          </div>
        </div>
        <CategoriesList
          selectedCategory={selectedCategory}
          handleOpenForm={handleOpenForm}
          {...categoriesList}
        />
      </div>

      <div className="users-permissions-container">
        {openForm ? (
          <CategoriesForm
            selectedCategory={selectedCategory}
            onSaved={categoriesList.goToFirstPage}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Categories;
