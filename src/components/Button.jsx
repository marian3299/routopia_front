import React from "react";

const Button = ({ text, type, onClick, className, disabled, ...rest }) => {
  const isPrimaryStyle = type === "primary";
  const nativeType =
    type === "submit" || type === "button" || type === "reset"
      ? type
      : "button";

  return (
    <button
      type={nativeType}
      className={`${isPrimaryStyle ? "primary" : ""} ${className || ""}`}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {text}
    </button>
  );
};

export default Button;
