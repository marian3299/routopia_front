import React from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const RecomendationCard = ({ image, location, score, price, name, id }) => {
  return (
    <Link to={"/tour/" + id} className="r-card-container">
      <div className="r-card-image">
        <img src={image} alt={location} width={200} height={200} />
      </div>
      <div className="r-card-info">
        <div className="header">
          <h2>{name}</h2>
          <p className="score icon-text">
            <FaStar className="icon" /> {score}
          </p>
        </div>

        <p className="icon-text location">
          <FaLocationDot className="icon" />
          {location}
        </p>
        <p className="price">
          <span>a partir de </span>${price}
        </p>
      </div>
    </Link>
  );
};

export default RecomendationCard;
