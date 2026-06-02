import React from "react";
import { Link } from "react-router-dom";
import { FaStar, FaHeart, FaRegHeart } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const RecomendationCard = ({
  image,
  location,
  score,
  price,
  name,
  id,
  isAuthenticated,
  isFavorite,
  onToggleFavorite,
  isToggling,
}) => {
  return (
    <article className="r-card-container">
      <div className="r-card-image">
        <Link to={"/tour/" + id} className="r-card-image-link">
          <img src={image} alt={name} width={200} height={200} />
        </Link>
        {isAuthenticated && (
          <button
            type="button"
            className={`favorite-btn ${isFavorite ? "is-favorite" : ""}`}
            onClick={(event) => onToggleFavorite(id, event)}
            disabled={isToggling}
            aria-label={
              isFavorite ? "Quitar de favoritos" : "Marcar como favorito"
            }
            aria-pressed={isFavorite}
          >
            {isFavorite ? <FaHeart /> : <FaRegHeart />}
          </button>
        )}
      </div>
      <Link to={"/tour/" + id} className="r-card-info">
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
      </Link>
    </article>
  );
};

export default RecomendationCard;
