import React from "react";
import { FaLocationDot } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="f-logo-container">
          <FaLocationDot className="icon f-icon" />
          <p>Rutopia</p>
        </div>
        <p className="footer-text">
          © {new Date().getFullYear()} Rutopia. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
