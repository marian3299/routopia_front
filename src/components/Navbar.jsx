import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";
import UserAvatar from "./UserAvatar";
import NavbarStyles from "../styles/Navbar.module.css";
import { FaLocationDot } from "react-icons/fa6";
import { FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { usePermissions } from "../hooks/usePermissions";
import { PERMISSIONS } from "../constants/permissions";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { hasPermission } = usePermissions();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Cerrar el menú al hacer click afuera (mismo patrón que UserAvatar).
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  const go = (path) => {
    setMenuOpen(false);
    navigate(path);
  };

  return (
    <nav>
      <div className={NavbarStyles.logoContainer} onClick={() => go("/")}>
        <FaLocationDot className={NavbarStyles.icon} />
        <p>Rutopia</p>
      </div>

      <div className={NavbarStyles.navControls} ref={menuRef}>
        {user && (
          <button
            type="button"
            className={NavbarStyles.hamburger}
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        )}

        <div
          className={`${NavbarStyles.buttonContainer} ${
            menuOpen ? NavbarStyles.open : ""
          }`}
        >
          {user && (
            <>
              {user.role !== "ADMIN" && (
                <>
                  <Button
                    text="Mis favoritos"
                    onClick={() => go("/favorites")}
                  />
                  <Button
                    text="Mis reservas"
                    onClick={() => go("/my-bookings")}
                  />
                </>
              )}
              {hasPermission(PERMISSIONS.DESTINOS.CREATE) && (
                <Button
                  text="Agregar destino"
                  onClick={() => go("/new-tour")}
                />
              )}
              {hasPermission(PERMISSIONS.DESTINOS.VIEW) && (
                <Button
                  text="Lista de destinos"
                  onClick={() => go("/admin")}
                />
              )}
              {hasPermission(PERMISSIONS.USERS.VIEW) && (
                <Button
                  text="Lista de usuarios"
                  onClick={() => go("/users")}
                />
              )}
              {hasPermission(PERMISSIONS.TRAITS.VIEW) && (
                <Button
                  text="Lista de características"
                  onClick={() => go("/traits")}
                />
              )}
              {hasPermission(PERMISSIONS.CHARACTERISTICS.VIEW) && (
                <Button
                  text="Agregar categoría"
                  onClick={() => go("/categories")}
                />
              )}
              {user.role === "ADMIN" && (
                <Button
                  text="Configuración"
                  onClick={() => go("/admin/settings")}
                />
              )}
            </>
          )}
        </div>

        {!user && (
          <div className={NavbarStyles.authButtons}>
            <Button text="Iniciar sesión" onClick={() => go("/login")} />
            <Button
              type="primary"
              text="Crear cuenta"
              onClick={() => go("/register")}
            />
          </div>
        )}

        {user && <UserAvatar />}
      </div>
    </nav>
  );
};

export default Navbar;
