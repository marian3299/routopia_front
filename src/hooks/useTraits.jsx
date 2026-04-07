import React, { useState } from "react";

const useTraits = () => {
  const [selectedTrait, setSelectedTrait] = useState(null);
  const [openForm, setOpenForm] = useState(false);

  const handleOpenForm = (trait) => {
    setOpenForm(true);
    setSelectedTrait(trait);
  };

  return {
    selectedTrait,
    openForm,
    handleOpenForm,
  };
};

export default useTraits;
