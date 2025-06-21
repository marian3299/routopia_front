import React from "react";
import Button from "./Button";
import NavbarStyles from "../styles/Navbar.module.css";
import { FaLocationDot } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav>
      <div className={NavbarStyles.logoContainer} onClick={() => navigate("/")}>
        <FaLocationDot className={NavbarStyles.icon} />
        <p>Rutopia</p>
      </div>
      <div className={NavbarStyles.buttonContainer}>
        <Button text="Agregar destino" onClick={() => navigate("/new-tour")} />
        <Button text="Iniciar sesión" />
        <Button type="primary" text="Crear cuenta" />
      </div>
    </nav>
  );
};

export default Navbar;
