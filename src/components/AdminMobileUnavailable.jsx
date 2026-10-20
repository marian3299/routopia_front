import React from "react";
import { Link } from "react-router-dom";
import { FaDesktop } from "react-icons/fa6";

const AdminMobileUnavailable = () => (
  <div className="main-container">
    <div className="admin-mobile-unavailable">
      <FaDesktop className="admin-mobile-unavailable-icon" />
      <h1>Panel no disponible en este dispositivo</h1>
      <p>
        El panel de administración de Routopia está pensado para pantallas
        grandes. Ingresá desde una computadora para gestionar destinos,
        usuarios, características y configuración.
      </p>
      <Link to="/">
        <button type="button" className="primary">
          Volver al inicio
        </button>
      </Link>
    </div>
  </div>
);

export default AdminMobileUnavailable;
