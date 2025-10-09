import React from "react";
import Button from "./Button";
import NavbarStyles from "../styles/Navbar.module.css";
import { FaLocationDot } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  return (
    <nav>
      <div className={NavbarStyles.logoContainer} onClick={() => navigate("/")}>
        <FaLocationDot className={NavbarStyles.icon} />
        <p>Rutopia</p>
      </div>
      <div className={NavbarStyles.buttonContainer}>
        <Button text="Agregar destino" onClick={() => navigate("/new-tour")} />
        {user && user.role == "ADMIN" && (
          <Button text="Lista de destinos" onClick={() => navigate("/admin")} />
        )}
        {!user && (
          <>
            <Button text="Iniciar sesión" onClick={() => navigate("/login")} />
            <Button
              type="primary"
              text="Crear cuenta"
              onClick={() => navigate("/register")}
            />
          </>
        )}
        {user && (
          <Button
            type="primary"
            text="Cerrar sesión"
            onClick={() => logout()}
          />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
