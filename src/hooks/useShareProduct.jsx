import { useMemo, useState } from "react";
import { useNotification } from "../context/useNotificationProvider";

const MAX_DESCRIPTION_LENGTH = 160;
const API_ORIGIN = "http://localhost:8080";

const truncateText = (text = "", maxLength = MAX_DESCRIPTION_LENGTH) => {
  const clean = text.trim();
  if (clean.length <= maxLength) return clean;
  return `${clean.slice(0, maxLength - 1).trim()}…`;
};

const copyToClipboard = async (text) => {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "absolute";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
};

/**
 * Cada red social tiene su propia share-intent URL.
 * - Facebook: solo URL (ya no acepta quote/texto prellenado).
 * - Twitter: texto + URL.
 * - WhatsApp: mensaje + URL en un solo parámetro text.
 * - Instagram: no existe intent web → se maneja aparte (copiar/pegar).
 */
function buildShareUrl(network, { productUrl, message }) {
  const encodedUrl = encodeURIComponent(productUrl);
  const encodedMsg = encodeURIComponent(message);

  switch (network) {
    case "facebook":
      return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    case "twitter":
      return `https://twitter.com/intent/tweet?text=${encodedMsg}&url=${encodedUrl}`;
    case "whatsapp":
      return `https://wa.me/?text=${encodedMsg}%20${encodedUrl}`;
    case "instagram":
      return null;
    default:
      return null;
  }
}

const useShareProduct = (destination) => {
  const { notify } = useNotification();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState("facebook");
  const [customMessage, setCustomMessage] = useState("");

  // URL que ve el usuario y a la que redirige el backend
  const productUrl = useMemo(() => {
    if (typeof window === "undefined" || !destination?.id) return "";
    return `${window.location.origin}/tour/${destination.id}`;
  }, [destination?.id]);

  // URL con Open Graph (backend) para que Facebook/Twitter armen la vista previa
  const shareUrl = useMemo(() => {
    if (!destination?.id) return "";
    return `${API_ORIGIN}/share/destino/${destination.id}`;
  }, [destination?.id]);

  const briefDescription = useMemo(
    () => truncateText(destination?.description || ""),
    [destination?.description],
  );

  const defaultMessage = useMemo(() => {
    if (!destination?.name) return "";
    return `¡Mira este destino en Routopia: ${destination.name}!`;
  }, [destination?.name]);

  const openShareModal = () => {
    setCustomMessage(defaultMessage);
    setSelectedNetwork("facebook");
    setIsOpen(true);
  };

  const closeShareModal = () => {
    setIsOpen(false);
  };

  const getMessageForShare = () => {
    const message = (customMessage || defaultMessage).trim();
    if (!briefDescription) return message;
    return `${message}\n\n${briefDescription}`;
  };

  const shareToNetwork = async () => {
    if (!destination?.id || !shareUrl) return;

    const message = getMessageForShare();
    const clipboardText = `${message}\n\n${productUrl}`;

    try {
      if (selectedNetwork === "instagram") {
        await copyToClipboard(clipboardText);
        notify({
          message:
            "Mensaje copiado. Pegalo en tu historia o publicación de Instagram.",
          type: "success",
        });
        closeShareModal();
        return;
      }

      if (selectedNetwork === "facebook") {
        // Facebook no precarga texto: copiamos para que el usuario pegue
        await copyToClipboard(clipboardText);
        const url = buildShareUrl("facebook", {
          productUrl: shareUrl,
          message,
        });
        window.open(url, "_blank", "noopener,noreferrer");
        notify({
          message:
            "Facebook no permite prellenar el texto. Copiamos tu mensaje: pégalo en la publicación (Ctrl/Cmd + V).",
          type: "success",
        });
        closeShareModal();
        return;
      }

      const url = buildShareUrl(selectedNetwork, {
        productUrl: shareUrl,
        message,
      });

      if (url) {
        window.open(url, "_blank", "noopener,noreferrer");
        closeShareModal();
      }
    } catch {
      notify({
        message:
          "No se pudo preparar el contenido para compartir. Intenta nuevamente.",
        type: "error",
      });
    }
  };

  return {
    isOpen,
    openShareModal,
    closeShareModal,
    selectedNetwork,
    setSelectedNetwork,
    customMessage,
    setCustomMessage,
    // En el modal mostramos la URL del producto (frontend)
    productUrl,
    briefDescription,
    shareToNetwork,
    imageUrl: destination?.imageUrl,
    productName: destination?.name,
  };
};

export default useShareProduct;
