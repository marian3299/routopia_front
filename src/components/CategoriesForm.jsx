import React, { useRef } from "react";
import useCategoriesForm from "../hooks/useCategoriesForm";
import Button from "./Button";
import { MoonLoader } from "react-spinners";
import { FaTrash } from "react-icons/fa";

const CategoriesForm = ({ selectedCategory, onSaved }) => {
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
  } = useCategoriesForm({ selectedCategory, onSaved });
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="permissions-card">
      <div className="permissions-header">
        <h2>{selectedCategory?.name || "Nueva categoría"}</h2>
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
            <label htmlFor="description">
              Descripción <span className="required">*</span>
            </label>
            <textarea
              id="description"
              {...register("description", {
                required: "La descripción es requerida",
              })}
              rows={3}
              maxLength={255}
            />
            {errors.description && (
              <span className="error">{errors.description.message}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="category-image">
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
              id="category-image"
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
            <Button
              className="form-button"
              text={
                sending ? (
                  <MoonLoader color="#fff" size={16} />
                ) : selectedCategory ? (
                  "Actualizar categoría"
                ) : (
                  "Guardar categoría"
                )
              }
              type="submit"
              disabled={sending}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoriesForm;
