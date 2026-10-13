import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAdminSettings from "../hooks/useAdminSettings";

const AdminSettings = () => {
  const {
    whatsappNumber,
    whatsappMessage,
    smtpEmail,
    smtpConfigured,
    loading,
    saving,
    saveWhatsappSettings,
    saveEmailSettings,
  } = useAdminSettings();

  const [numberInput, setNumberInput] = useState("");
  const [messageInput, setMessageInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [appPasswordInput, setAppPasswordInput] = useState("");
  const [showAppPassword, setShowAppPassword] = useState(false);

  useEffect(() => {
    setNumberInput(whatsappNumber);
    setMessageInput(whatsappMessage);
  }, [whatsappNumber, whatsappMessage]);

  useEffect(() => {
    setEmailInput(smtpEmail);
  }, [smtpEmail]);

  const handleWhatsappSubmit = async (event) => {
    event.preventDefault();
    await saveWhatsappSettings(numberInput.trim(), messageInput.trim());
  };

  const handleEmailSubmit = async (event) => {
    event.preventDefault();
    const saved = await saveEmailSettings(
      emailInput.trim(),
      appPasswordInput.trim(),
    );
    if (saved) setAppPasswordInput("");
  };

  return (
    <div className="admin-container">
      <h1>Configuración</h1>

      <section className="admin-settings-section">
        <h2>WhatsApp</h2>
        <form className="admin-settings-form" onSubmit={handleWhatsappSubmit}>
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
            onChange={(e) =>
              setNumberInput(e.target.value.replace(/\D/g, ""))
            }
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

          <button
            className="primary"
            type="submit"
            disabled={loading || saving}
          >
            {saving ? "Guardando..." : "Guardar"}
          </button>
        </form>
      </section>

      <section className="admin-settings-section">
        <h2>
          Email de confirmación{" "}
          {smtpConfigured && (
            <span className="admin-settings-badge">Configurado</span>
          )}
        </h2>
        <form className="admin-settings-form" onSubmit={handleEmailSubmit}>
          <label htmlFor="smtp-email">Cuenta de Gmail</label>
          <p className="admin-settings-help">
            Se usa como remitente de los emails de confirmación de reserva.
          </p>
          <input
            id="smtp-email"
            type="email"
            placeholder="tucuenta@gmail.com"
            value={loading ? "" : emailInput}
            disabled={loading || saving}
            onChange={(e) => setEmailInput(e.target.value)}
          />

          <label htmlFor="smtp-app-password">Contraseña de aplicación</label>
          <p className="admin-settings-help">
            No es tu contraseña normal de Gmail. Generala en tu cuenta de
            Google: Seguridad → Verificación en dos pasos → Contraseñas de
            aplicaciones. {smtpConfigured && "Dejar en blanco para mantener la actual."}
          </p>
          <div className="admin-settings-password-field">
            <input
              id="smtp-app-password"
              type={showAppPassword ? "text" : "password"}
              placeholder={smtpConfigured ? "••••••••••••••••" : "xxxx xxxx xxxx xxxx"}
              value={appPasswordInput}
              disabled={loading || saving}
              onChange={(e) => setAppPasswordInput(e.target.value)}
            />
            <button
              type="button"
              className="admin-settings-password-toggle"
              onClick={() => setShowAppPassword((prev) => !prev)}
              disabled={loading || saving}
              aria-label={
                showAppPassword ? "Ocultar contraseña" : "Mostrar contraseña"
              }
              tabIndex={-1}
            >
              {showAppPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button
            className="primary"
            type="submit"
            disabled={loading || saving}
          >
            {saving ? "Guardando..." : "Guardar"}
          </button>
        </form>
      </section>
    </div>
  );
};

export default AdminSettings;
