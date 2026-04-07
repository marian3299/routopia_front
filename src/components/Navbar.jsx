import React from "react";
import Button from "./Button";
import UserAvatar from "./UserAvatar";
import NavbarStyles from "../styles/Navbar.module.css";
import { FaLocationDot } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { usePermissions } from "../hooks/usePermissions";
import { PERMISSIONS } from "../constants/permissions";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { hasPermission } = usePermissions();

  return (
    <nav>
      <div className={NavbarStyles.logoContainer} onClick={() => navigate("/")}>
        <FaLocationDot className={NavbarStyles.icon} />
        <p>Rutopia</p>
      </div>
      <div className={NavbarStyles.buttonContainer}>
        {user && (
          <>
            {hasPermission(PERMISSIONS.DESTINOS.CREATE) && (
              <Button
                text="Agregar destino"
                onClick={() => navigate("/new-tour")}
              />
            )}
            {hasPermission(PERMISSIONS.DESTINOS.VIEW) && (
              <Button
                text="Lista de destinos"
                onClick={() => navigate("/admin")}
              />
            )}
            {hasPermission(PERMISSIONS.USERS.VIEW) && (
              <Button
                text="Lista de usuarios"
                onClick={() => navigate("/users")}
              />
            )}
            {hasPermission(PERMISSIONS.TRAITS.VIEW) && (
              <Button
                text="Lista de características"
                onClick={() => navigate("/traits")}
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
