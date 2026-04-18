import React, { useState } from "react";

const useTraits = () => {
  const [selectedTrait, setSelectedTrait] = useState(null);
  const [openForm, setOpenForm] = useState(false);

  const handleOpenForm = (trait) => {
    setOpenForm(true);
    setSelectedTrait(trait);
  };

  const onDeleteTrait = () => {
    setSelectedTrait(null);
    setOpenForm(false);
  };

  return {
    selectedTrait,
    openForm,
    handleOpenForm,
    onDeleteTrait,
  };
};

export default useTraits;
