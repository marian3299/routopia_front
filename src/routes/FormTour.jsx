import React from "react";
import Button from "../components/Button";
import useFormTour from "../hooks/useFormTour";

const FormTour = () => {
  const { formData, handleChange, handleSubmit } = useFormTour();
  return (
    <div className="main-container">
      <div className="form-tour-container">
        <h1>Agregar destino</h1>
        <form className="form-sections-container" onSubmit={handleSubmit}>
          {/* Información general */}
          <h2>Información general</h2>
          <div className="form-section">
            <div className="form-group">
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Nombre del destino"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="price">Precio</label>
              <input
                type="number"
                id="price"
                name="price"
                placeholder="Precio del destino"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="duration">Tiempo de duración (aproximado)</label>
              <input
                type="number"
                id="duration"
                name="duration"
                placeholder="Tiempo de duración (horas)"
                value={formData.duration}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Descripción</label>
              <textarea
                id="description"
                name="description"
                placeholder="Descripción del destino"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Ubicación e idioma */}
          <h2>Ubicación e idioma</h2>
          <div className="form-section">
            <div className="form-group">
              <label htmlFor="language">Idiomas</label>
              <select
                id="language"
                name="language"
                placeholder="Seleccione un idioma"
                value={formData.language}
                onChange={handleChange}
                required
              >
                <option value="SPANISH">Español</option>
                <option value="ENGLISH">Inglés</option>
                <option value="FRENCH">Francés</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="location">Dirección</label>
              <input
                type="text"
                id="location"
                name="location"
                placeholder="Dirección del destino"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="city">Ciudad</label>
              <input
                type="text"
                id="city"
                name="city"
                placeholder="Ciudad del destino"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="category">Categoría</label>
              <select
                id="category"
                name="category"
                placeholder="Seleccione una categoría"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="FRANCE">Francia</option>
                <option value="JAPAN">Japon</option>
                <option value="CHIAPAS">Chiapas</option>
                <option value="GREECE">Grecia</option>
                <option value="THAILAND">Tailandia</option>
              </select>
            </div>
          </div>

          {/* Multimedia y calificación */}
          <h2>Multimedia y calificación</h2>
          <div className="form-section">
            <div className="form-group">
              <label htmlFor="image">Imagen</label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="score">Puntuación</label>
              <input
                type="number"
                id="score"
                name="score"
                placeholder="Puntuación del destino"
                value={formData.score}
                onChange={handleChange}
                min="0"
                max="5"
                step="0.1"
                required
              />
            </div>
          </div>
          <Button
            className="form-button"
            text="Guardar destino"
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};

export default FormTour;
