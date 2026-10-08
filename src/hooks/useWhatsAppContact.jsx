import { useCallback } from "react";
import { useNotification } from "../context/useNotificationProvider";
import { getWhatsappSettings } from "../services/settings.service";

// Solo dígitos, sin "+" ni espacios (formato que espera wa.me).
const isValidWhatsAppNumber = (number) => /^\d{8,15}$/.test(number);

const useWhatsAppContact = () => {
  const { notify } = useNotification();

  const openWhatsApp = useCallback(
    async (message) => {
      let whatsappNumber;
      let whatsappMessage;
      try {
        const data = await getWhatsappSettings();
        whatsappNumber = data.whatsappNumber;
        whatsappMessage = message || data.whatsappMessage;
      } catch (error) {
        console.error("Error fetching whatsapp settings:", error);
        notify({
          message:
            "No pudimos obtener los datos de contacto. Intenta más tarde.",
          type: "error",
        });
        return;
      }

      if (!isValidWhatsAppNumber(whatsappNumber)) {
        notify({
          message:
            "No pudimos abrir WhatsApp: el número de contacto no está configurado correctamente.",
          type: "error",
        });
        return;
      }

      if (!navigator.onLine) {
        notify({
          message:
            "No hay conexión a internet. Verificá tu conexión e intentá nuevamente.",
          type: "error",
        });
        return;
      }

      const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage || "")}`;
      const whatsappWindow = window.open(url, "_blank", "noopener,noreferrer");

      if (!whatsappWindow) {
        notify({
          message:
            "No pudimos abrir WhatsApp. Revisá que tu navegador no esté bloqueando ventanas emergentes.",
          type: "error",
        });
        return;
      }

      notify({
        message: "Te redirigimos a WhatsApp para continuar la conversación.",
        type: "success",
      });
    },
    [notify],
  );

  return { openWhatsApp };
};

export default useWhatsAppContact;
