import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import useWhatsAppContact from "../hooks/useWhatsAppContact";

const WhatsAppFloatButton = () => {
  const { user } = useAuth();
  const { openWhatsApp } = useWhatsAppContact();

  // El botón es para que clientes consulten al proveedor; no tiene sentido en la vista de administración.
  if (user?.role === "ADMIN") {
    return null;
  }

  return (
    <button
      type="button"
      className="whatsapp-float-button"
      onClick={() => openWhatsApp()}
      aria-label="Consultar por WhatsApp"
      title="Consultar por WhatsApp. Te redirigimos a WhatsApp; Routopia no accede al contenido de tus mensajes."
    >
      <FaWhatsapp />
    </button>
  );
};

export default WhatsAppFloatButton;
