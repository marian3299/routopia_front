import { useCallback, useEffect, useState } from "react";
import { useNotification } from "../context/useNotificationProvider";
import {
  getWhatsappSettings,
  updateWhatsappSettings,
} from "../services/settings.service";

const useAdminSettings = () => {
  const { notify } = useNotification();
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [whatsappMessage, setWhatsappMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let active = true;
    getWhatsappSettings()
      .then((data) => {
        if (active) {
          setWhatsappNumber(data.whatsappNumber || "");
          setWhatsappMessage(data.whatsappMessage || "");
        }
      })
      .catch((error) => {
        console.error("Error fetching whatsapp settings:", error);
        if (active) {
          notify({
            message: "No se pudo cargar la configuración actual.",
            type: "error",
          });
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saveWhatsappSettings = useCallback(
    async (number, message) => {
      setSaving(true);
      try {
        const data = await updateWhatsappSettings(number, message);
        setWhatsappNumber(data.whatsappNumber);
        setWhatsappMessage(data.whatsappMessage);
        notify({
          message: "Configuración de WhatsApp actualizada correctamente.",
          type: "success",
        });
        return true;
      } catch (error) {
        notify({
          message:
            error.response?.data?.message ||
            "No se pudo actualizar la configuración. Verificá los datos.",
          type: "error",
        });
        return false;
      } finally {
        setSaving(false);
      }
    },
    [notify],
  );

  return {
    whatsappNumber,
    whatsappMessage,
    loading,
    saving,
    saveWhatsappSettings,
  };
};

export default useAdminSettings;
