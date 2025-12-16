import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../index.css";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
    return null;
  }

  // Obtener iniciales del nombre y apellido
  const getInitials = () => {
    const firstName = user.nombre || "";
    const lastName = user.apellido || "";
    const firstInitial = firstName.charAt(0).toUpperCase();
    const lastInitial = lastName.charAt(0).toUpperCase();
    return `${firstInitial}${lastInitial}`;
  };

  // Obtener nombre completo
  const getFullName = () => {
    return `${user.nombre || ""} ${user.apellido || ""}`.trim();
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <main className="main-container">
      <div className="profile-container">
        <div className="profile-content">
          <div className="profile-avatar-large">
            <span className="avatar-initials-large">{getInitials()}</span>
          </div>
          <h2 className="profile-name">{getFullName()}</h2>
          <p className="profile-email">{user.email}</p>
          <button className="profile-logout-button" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </div>
    </main>
  );
};

export default Profile;
