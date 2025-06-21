import React from "react";

const Button = ({ text, type, onClick, className }) => {
  return (
    <button
      className={`${type === "primary" ? "primary" : ""} ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
