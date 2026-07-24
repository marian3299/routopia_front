import React, { useRef } from "react";
import useTraitsForm from "../hooks/useTraitsForm";
import { FaTrash } from "react-icons/fa";
import Button from "./Button";
import { MoonLoader } from "react-spinners";

const TraitsForm = ({ selectedTrait, onDeleteTrait, onSaved }) => {
  const {
    register,
    imageRegister,
    onSubmit,
    handleSubmit,
    errors,
    imagePreview,
    isDragging,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleInputChange,
    handleRemoveImage,
    sending,
    handleDeleteTrait,
    deleting,
  } = useTraitsForm({ selectedTrait, onDeleteTrait, onSaved });

  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="permissions-card">
      <div className="permissions-header">
        <h2>{selectedTrait?.name || "Nueva característica"}</h2>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="name">
              Nombre <span className="required">*</span>
            </label>
            <input
              type="text"
              id="name"
              {...register("name", { required: "El nombre es requerido" })}
            />
            {errors.name && (
              <span className="error">{errors.name.message}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="trait-image">
              Imagen <span className="required">*</span>
            </label>
            {!imagePreview ? (
              <div
                onClick={handleClick}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`image-upload-area ${isDragging ? "dragging" : ""}`}
              >
                <p className="image-upload-text">
                  Arrastre o de click para agregar imagen
                </p>
              </div>
            ) : (
              <div className="image-preview-container">
                <img
                  src={imagePreview}
                  alt="Vista previa"
                  className="image-preview"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="image-remove-button"
                  aria-label="Eliminar imagen"
                >
                  <FaTrash size={14} />
                </button>
              </div>
            )}
            <input
              type="file"
              id="trait-image"
              accept="image/*"
              {...imageRegister}
              ref={(e) => {
                fileInputRef.current = e;
                imageRegister.ref(e);
              }}
              onChange={(e) => {
                imageRegister.onChange(e);
                handleInputChange(e);
              }}
              style={{ display: "none" }}
            />
            {errors.image && (
              <span className="error">{errors.image.message}</span>
            )}
          </div>
          <div className="form-button-container">
            {selectedTrait && (
              <span
                className={`btn-tooltip-wrapper ${
                  !selectedTrait.deletable ? "btn-tooltip-wrapper--disabled" : ""
                }`}
              >
                <Button
                  className="form-button secondary"
                  text={
                    deleting ? (
                      <MoonLoader color="#1a1a1a" size={16} />
                    ) : (
                      "Eliminar característica"
                    )
                  }
                  onClick={handleDeleteTrait}
                  type="button"
                  disabled={deleting || sending || !selectedTrait.deletable}
                  aria-describedby={
                    !selectedTrait.deletable ? "trait-delete-tooltip" : undefined
                  }
                />
                {!selectedTrait.deletable && (
                  <span
                    id="trait-delete-tooltip"
                    className="btn-tooltip"
                    role="tooltip"
                  >
                    No se puede eliminar: está asignada a uno o más destinos.
                    Quitala de esos destinos primero.
                  </span>
                )}
              </span>
            )}
            <Button
              className="form-button"
              text={
                sending ? (
                  <MoonLoader color="#fff" size={16} />
                ) : selectedTrait ? (
                  "Actualizar característica"
                ) : (
                  "Guardar característica"
                )
              }
              type="submit"
              disabled={sending || deleting}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default TraitsForm;
