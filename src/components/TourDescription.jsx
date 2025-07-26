import React from "react";
import { FaClock } from "react-icons/fa";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";

const TourDescription = ({ destination }) => {
  const getLanguage = (language) => {
    switch (language) {
      case "SPANISH":
        return "Español";
      case "ENGLISH":
        return "Inglés";
      case "FRENCH":
        return "Francés";
      default:
        return language;
    }
  };
  return (
    <div className="tour-description-card">
      <h2>
        Desde ${destination?.precio} <span>por persona</span>
      </h2>

      <div className="tour-reservation">
        <h3>Seleccionar fecha y personas</h3>
        <input></input>
        <input></input>
        <button className="primary">Reservar</button>
      </div>

      <p className="icon-text">
        <FaClock className="icon" /> {destination?.duration_time} horas (aprox.)
      </p>
      <div className="tour-languages">
        <p className="icon-text">
          <IoChatbubbleEllipses className="icon" /> Idiomas
        </p>
        <ul>
          {destination?.languages.map((language) => (
            <li key={language}>{getLanguage(language)}</li>
          ))}
        </ul>
      </div>
      <p className="icon-text">
        <FaLocationDot className="icon" /> {destination?.address},{" "}
        {destination?.city}
      </p>
    </div>
  );
};

export default TourDescription;
