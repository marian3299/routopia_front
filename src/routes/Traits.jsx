import React from "react";
import useTraits from "../hooks/useTraits";
import TraitsList from "../components/TraitsList";
import TraitsForm from "../components/TraitsForm";
import Button from "../components/Button";

const Traits = () => {
  const { selectedTrait, handleOpenForm, openForm, onDeleteTrait } =
    useTraits();
  return (
    <div className="users-container">
      <div className="users-list-container">
        <div className="users-list-header">
          <div className="users-list-header-content">
            <h2>Lista de características</h2>
            <Button
              text="Crear característica"
              onClick={() => handleOpenForm(null)}
            />
          </div>
        </div>
        <TraitsList
          selectedTrait={selectedTrait}
          handleOpenForm={handleOpenForm}
        />
      </div>

      <div className="users-permissions-container">
        {openForm ? (
          <TraitsForm
            selectedTrait={selectedTrait}
            onDeleteTrait={onDeleteTrait}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Traits;
