import React from "react";
import Button from "../components/Button";
const FormTour = () => {
  return (
    <div className="main-container">
      <div className="form-tour-container">
        <h1>Agregar destino</h1>
        <form className="form-sections-container">
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
              />
            </div>
            <div className="form-group">
              <label htmlFor="price">Precio</label>
              <input
                type="number"
                id="price"
                name="price"
                placeholder="Precio del destino"
              />
            </div>
            <div className="form-group">
              <label htmlFor="duration">Tiempo de duración (aproximado)</label>
              <input
                type="number"
                id="duration"
                name="duration"
                placeholder="Tiempo de duración (horas)"
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Descripción</label>
              <textarea
                id="description"
                name="description"
                placeholder="Descripción del destino"
              />
            </div>
          </div>

          {/* Ubicación e idioma */}
          <h2>Ubicación e idioma</h2>
          <div className="form-section">
            <div className="form-group">
              <label htmlFor="languages">Idiomas</label>
              <select
                id="languages"
                name="languages"
                placeholder="Seleccione un idioma"
              >
                <option value="es">Español</option>
                <option value="en">Inglés</option>
                <option value="fr">Francés</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="location">Dirección</label>
              <input
                type="text"
                id="location"
                name="location"
                placeholder="Dirección del destino"
              />
            </div>
            <div className="form-group">
              <label htmlFor="category">Categoría</label>
              <select
                id="category"
                name="category"
                placeholder="Seleccione una categoría"
              >
                <option value="paris">Paris</option>
                <option value="japon">Japon</option>
                <option value="chiapas">Chiapas</option>
                <option value="grecia">Grecia</option>
                <option value="tailandia">Tailandia</option>
              </select>
            </div>
          </div>

          {/* Multimedia y calificación */}
          <h2>Multimedia y calificación</h2>
          <div className="form-section">
            <div className="form-group">
              <label htmlFor="image">Imagen</label>
              <input type="file" id="image" name="image" />
            </div>
            <div className="form-group">
              <label htmlFor="score">Puntuación</label>
              <input
                type="number"
                id="score"
                name="score"
                placeholder="Puntuación del destino"
              />
            </div>
          </div>
        </form>
        <Button className="form-button" text="Guardar destino" />
      </div>
    </div>
  );
};

export default FormTour;
