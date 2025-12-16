import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const UserAvatar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  if (!user) return null;

  // Obtener iniciales del nombre y apellido
  const getInitials = () => {
    const firstName = user.nombre || "";
    const lastName = user.apellido || "";
    const firstInitial = firstName.charAt(0).toUpperCase();
    const lastInitial = lastName.charAt(0).toUpperCase();
    return `${firstInitial}${lastInitial}`;
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
    setIsOpen(false);
  };

  const handleViewProfile = () => {
    navigate("/profile");
    setIsOpen(false);
  };

  return (
    <div className="user-avatar-container" ref={dropdownRef}>
      <div className="user-avatar" onClick={() => setIsOpen(!isOpen)}>
        <span className="avatar-initials">{getInitials()}</span>
      </div>
      {isOpen && (
        <div className="dropdown-menu">
          <button className="dropdown-item" onClick={handleViewProfile}>
            Ver perfil
          </button>
          <button className="dropdown-item" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
};

export default UserAvatar;
