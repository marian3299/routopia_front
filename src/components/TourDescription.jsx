import React from "react";
import { FaClock } from "react-icons/fa";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";

const TourDescription = () => {
  return (
    <div className="tour-description-card">
      <h2>
        Desde $1000 <span>por persona</span>
      </h2>

      <div className="tour-reservation">
        <h3>Seleccionar fecha y personas</h3>
        <input></input>
        <input></input>
        <button className="primary">Reservar</button>
      </div>

      <p className="icon-text">
        <FaClock className="icon" /> 3 horas (aprox.)
      </p>
      <div className="tour-languages">
        <p className="icon-text">
          <IoChatbubbleEllipses className="icon" /> Idiomas
        </p>
        <ul>
          <li>Español</li>
          <li>Inglés</li>
        </ul>
      </div>
      <p className="icon-text">
        <FaLocationDot className="icon" /> Av. Gustave Eiffel, 75007 Paris,
        Francia
      </p>
    </div>
  );
};

export default TourDescription;
