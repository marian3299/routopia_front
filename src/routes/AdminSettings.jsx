import React, { useEffect, useState } from "react";
import useAdminSettings from "../hooks/useAdminSettings";

const AdminSettings = () => {
  const {
    whatsappNumber,
    whatsappMessage,
    loading,
    saving,
    saveWhatsappSettings,
  } = useAdminSettings();
  const [numberInput, setNumberInput] = useState("");
  const [messageInput, setMessageInput] = useState("");

  useEffect(() => {
    setNumberInput(whatsappNumber);
    setMessageInput(whatsappMessage);
  }, [whatsappNumber, whatsappMessage]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await saveWhatsappSettings(numberInput.trim(), messageInput.trim());
  };

  return (
    <div className="admin-container">
      <h1>Configuración</h1>

      <form className="admin-settings-form" onSubmit={handleSubmit}>
        <label htmlFor="whatsapp-number">
          Número de WhatsApp de contacto
        </label>
        <p className="admin-settings-help">
          Formato internacional, solo dígitos, sin &quot;+&quot; ni espacios
          (código de país + número). Ej: 5491112345678.
        </p>
        <input
          id="whatsapp-number"
          type="text"
          placeholder="5491112345678"
          value={loading ? "" : numberInput}
          disabled={loading || saving}
          onChange={(e) => setNumberInput(e.target.value.replace(/\D/g, ""))}
        />

        <label htmlFor="whatsapp-message">Mensaje por defecto</label>
        <p className="admin-settings-help">
          Se precarga en el chat cuando alguien consulta por el botón de
          WhatsApp.
        </p>
        <textarea
          id="whatsapp-message"
          rows={3}
          placeholder="Hola! Tengo una consulta sobre un producto de Routopia."
          value={loading ? "" : messageInput}
          disabled={loading || saving}
          onChange={(e) => setMessageInput(e.target.value)}
        />

        <button className="primary" type="submit" disabled={loading || saving}>
          {saving ? "Guardando..." : "Guardar"}
        </button>
      </form>
    </div>
  );
};

export default AdminSettings;
