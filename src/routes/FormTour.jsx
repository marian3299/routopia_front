import React from "react";
import Button from "../components/Button";
import useFormTour from "../hooks/useFormTour";
import { MoonLoader } from "react-spinners";

const FormTour = () => {
  const { register, handleSubmit, errors, onSubmit, sending } = useFormTour();

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
              <label htmlFor="language">
                Idiomas <span className="required">*</span>
              </label>
              <select
                id="language"
                {...register("language", {
                  required: "El idioma es requerido",
                })}
              >
                <option value="SPANISH">Español</option>
                <option value="ENGLISH">Inglés</option>
                <option value="FRENCH">Francés</option>
              </select>
              {errors.language && (
                <span className="error">{errors.language.message}</span>
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
                <option value="CHIAPAS">Chiapas</option>
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
              <label htmlFor="image">Imagen</label>
              <input type="file" id="image" {...register("image")} />
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
