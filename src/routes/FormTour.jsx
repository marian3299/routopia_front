import React from "react";
import Button from "../components/Button";
import useFormTour from "../hooks/useFormTour";
import { MoonLoader } from "react-spinners";
import Select from "react-select";
import { Controller } from "react-hook-form";

const FormTour = () => {
  const {
    register,
    handleSubmit,
    errors,
    onSubmit,
    sending,
    languages,
    control,
    watch,
  } = useFormTour();

  // Observar el campo de imagen para mostrar vista previa
  const imageFile = watch("image");

  const customSelectStyles = {
    control: (provided, state) => ({
      ...provided,
      border: state.isFocused ? "2px solid #eb4d4b" : "2px solid #d1d1d1",
      backgroundColor: "#f5f5f5",
      color: "#1a1a1a",
      padding: "2px 0",
      borderRadius: "8px",
      boxShadow: state.isFocused ? "0 0 5px rgba(0,0,0,0.2)" : "none",
      minHeight: "40px",
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "#f1d6bd",
      color: "#1a1a1a",
      borderRadius: "6px",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "#1a1a1a",
      fontWeight: 500,
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: "#eb4d4b",
      ":hover": {
        backgroundColor: "#eb4d4b",
        color: "white",
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#888",
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 10,
    }),
  };

  return (
    <div className="main-container">
      <div className="form-tour-container">
        <h1>Agregar destino</h1>
        <form
          className="form-sections-container"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Información general */}
          <h2>Información general</h2>
          <div className="form-section">
            <div className="form-group">
              <label htmlFor="name">
                Nombre <span className="required">*</span>
              </label>
              <input
                type="text"
                id="name"
                placeholder="Nombre del destino"
                {...register("name", { required: "El nombre es requerido" })}
              />
              {errors.name && (
                <span className="error">{errors.name.message}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="price">
                Precio <span className="required">*</span>
              </label>
              <input
                type="number"
                id="price"
                placeholder="Precio del destino"
                {...register("price", {
                  required: "El precio es requerido",
                  min: { value: 0, message: "El precio debe ser mayor a 0" },
                })}
              />
              {errors.price && (
                <span className="error">{errors.price.message}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="duration">
                Tiempo de duración (aproximado){" "}
                <span className="required">*</span>
              </label>
              <input
                type="number"
                id="duration"
                placeholder="Tiempo de duración (horas)"
                {...register("duration", {
                  required: "La duración es requerida",
                  min: { value: 1, message: "La duración debe ser mayor a 0" },
                })}
              />
              {errors.duration && (
                <span className="error">{errors.duration.message}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="description">
                Descripción <span className="required">*</span>
              </label>
              <textarea
                id="description"
                placeholder="Descripción del destino"
                {...register("description", {
                  required: "La descripción es requerida",
                })}
              />
              {errors.description && (
                <span className="error">{errors.description.message}</span>
              )}
            </div>
          </div>

          {/* Ubicación e idioma */}
          <h2>Ubicación e idioma</h2>
          <div className="form-section">
            <div className="form-group">
              <label htmlFor="languages">
                Idiomas <span className="required">*</span>
              </label>
              <Controller
                name="languages"
                control={control}
                rules={{ required: "El idioma es requerido" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    inputId="languages"
                    options={languages}
                    isMulti
                    isSearchable={false}
                    closeMenuOnSelect={false}
                    placeholder="Seleccione los idiomas"
                    styles={customSelectStyles}
                    onChange={(selected) => field.onChange(selected)}
                    value={languages.filter((option) =>
                      field.value?.some((val) => val.value === option.value)
                    )}
                  />
                )}
              />
              {errors.languages && (
                <span className="error">{errors.languages.message}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="location">
                Dirección <span className="required">*</span>
              </label>
              <input
                type="text"
                id="location"
                placeholder="Dirección del destino"
                {...register("location", {
                  required: "La dirección es requerida",
                })}
              />
              {errors.location && (
                <span className="error">{errors.location.message}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="city">
                Ciudad <span className="required">*</span>
              </label>
              <input
                type="text"
                id="city"
                placeholder="Ciudad del destino"
                {...register("city", { required: "La ciudad es requerida" })}
              />
              {errors.city && (
                <span className="error">{errors.city.message}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="category">
                Categoría <span className="required">*</span>
              </label>
              <select
                id="category"
                {...register("category", {
                  required: "La categoría es requerida",
                })}
              >
                <option value="FRANCE">Francia</option>
                <option value="JAPAN">Japon</option>
                <option value="MEXICO">México</option>
                <option value="GREECE">Grecia</option>
                <option value="THAILAND">Tailandia</option>
              </select>
              {errors.category && (
                <span className="error">{errors.category.message}</span>
              )}
            </div>
          </div>

          {/* Multimedia y calificación */}
          <h2>Multimedia y calificación</h2>
          <div className="form-section">
            <div className="form-group">
              <label htmlFor="image">
                Imagen principal <span className="required">*</span>
              </label>
              <input
                type="file"
                id="image"
                accept="image/*"
                {...register("image", {
                  required: "La imagen principal es requerida",
                  validate: {
                    fileSize: (files) => {
                      if (files && files[0]) {
                        const fileSize = files[0].size / 1024 / 1024; // Convertir a MB
                        return (
                          fileSize <= 5 || "La imagen debe ser menor a 5MB"
                        );
                      }
                      return true;
                    },
                    fileType: (files) => {
                      if (files && files[0]) {
                        const validTypes = [
                          "image/jpeg",
                          "image/jpg",
                          "image/png",
                          "image/webp",
                        ];
                        return (
                          validTypes.includes(files[0].type) ||
                          "Solo se permiten archivos JPG, PNG o WEBP"
                        );
                      }
                      return true;
                    },
                  },
                })}
              />
              {errors.image && (
                <span className="error">{errors.image.message}</span>
              )}
              {imageFile && imageFile[0] && (
                <div className="image-preview">
                  <img
                    src={URL.createObjectURL(imageFile[0])}
                    alt="Vista previa"
                    style={{
                      maxWidth: "200px",
                      maxHeight: "200px",
                      marginTop: "10px",
                      borderRadius: "8px",
                      objectFit: "cover",
                    }}
                  />
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#666",
                      marginTop: "5px",
                    }}
                  >
                    {imageFile[0].name} (
                    {(imageFile[0].size / 1024 / 1024).toFixed(2)} MB)
                  </p>
                </div>
              )}
            </div>
            {/* Imágenes adicionales */}
            <div className="form-group">
              <label htmlFor="image_list">
                Imágenes para galería <span className="required">*</span>
              </label>
              <input
                type="file"
                id="image_list"
                accept="image/*"
                multiple
                {...register("image_list", {
                  required: "Las imágenes de galería son requeridas",
                  validate: {
                    minImages: (files) => {
                      if (!files || files.length < 3) {
                        return "Debes seleccionar al menos 3 imágenes para la galería";
                      }
                      return true;
                    },
                  },
                })}
              />
              {errors.image_list && (
                <span className="error">{errors.image_list.message}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="score">
                Puntuación <span className="required">*</span>
              </label>
              <input
                type="number"
                id="score"
                placeholder="Puntuación del destino"
                min="0"
                max="5"
                step="0.1"
                {...register("score", {
                  required: "La puntuación es requerida",
                  min: {
                    value: 0,
                    message: "La puntuación debe ser mayor a 0",
                  },
                  max: {
                    value: 5,
                    message: "La puntuación debe ser menor o igual a 5",
                  },
                })}
              />
              {errors.score && (
                <span className="error">{errors.score.message}</span>
              )}
            </div>
          </div>

          <Button
            className="form-button"
            text={
              sending ? (
                <MoonLoader color="#fff" size={16} />
              ) : (
                "Guardar destino"
              )
            }
            type="submit"
            disabled={sending}
          />
        </form>
      </div>
    </div>
  );
};

export default FormTour;
