import React from "react";
import Button from "./Button";
import UserAvatar from "./UserAvatar";
import NavbarStyles from "../styles/Navbar.module.css";
import { FaLocationDot } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <nav>
      <div className={NavbarStyles.logoContainer} onClick={() => navigate("/")}>
        <FaLocationDot className={NavbarStyles.icon} />
        <p>Rutopia</p>
      </div>
      <div className={NavbarStyles.buttonContainer}>
        {user && (
          <>
            <Button
              text="Agregar destino"
              onClick={() => navigate("/new-tour")}
            />
            {user.role === "ADMIN" && (
              <Button
                text="Lista de destinos"
                onClick={() => navigate("/admin")}
              />
            )}
          </>
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
        {user && <UserAvatar />}
      </div>
    </nav>
  );
};

export default Navbar;
