import React from "react";
import { FaStar } from "react-icons/fa";

const StarRating = ({
  value = 0,
  onChange,
  onHoverChange,
  interactive = false,
  size = "md",
}) => {
  const displayValue = value;
  const sizeClass = size === "lg" ? "star-rating--lg" : "star-rating--md";

  return (
    <div
      className={`star-rating ${sizeClass} ${interactive ? "star-rating--interactive" : ""}`}
      role={interactive ? "radiogroup" : "img"}
      aria-label={`${displayValue} de 5 estrellas`}
    >
      {[1, 2, 3, 4, 5].map((star) => {
        const active = star <= displayValue;
        if (!interactive) {
          return (
            <FaStar
              key={star}
              className={`star-icon ${active ? "is-active" : ""}`}
              aria-hidden
            />
          );
        }

        return (
          <button
            key={star}
            type="button"
            className={`star-btn ${active ? "is-active" : ""}`}
            onClick={() => onChange?.(star)}
            onMouseEnter={() => onHoverChange?.(star)}
            onMouseLeave={() => onHoverChange?.(0)}
            aria-label={`${star} estrella${star > 1 ? "s" : ""}`}
            aria-checked={star === value}
            role="radio"
          >
            <FaStar />
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
