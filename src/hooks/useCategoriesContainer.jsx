import React, { useState } from "react";

const useCategoriesContainer = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [openForm, setOpenForm] = useState(false);

  const handleOpenForm = (category) => {
    setOpenForm(true);
    setSelectedCategory(category);
  };

  const onDeleteCategory = () => {
    setSelectedCategory(null);
    setOpenForm(false);
  };

  return {
    selectedCategory,
    openForm,
    handleOpenForm,
    onDeleteCategory,
  };
};

export default useCategoriesContainer;
