import React, { useEffect, useRef, useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaWhatsapp,
  FaLink,
  FaCheck,
  FaTimes,
} from "react-icons/fa";

const NETWORKS = [
  { id: "facebook", label: "Facebook", Icon: FaFacebookF },
  { id: "twitter", label: "Twitter / X", Icon: FaTwitter },
  { id: "instagram", label: "Instagram", Icon: FaInstagram },
  { id: "whatsapp", label: "WhatsApp", Icon: FaWhatsapp },
];

const ShareProductModal = ({
  isOpen,
  onClose,
  productName,
  imageUrl,
  briefDescription,
  productUrl,
  selectedNetwork,
  onSelectNetwork,
  customMessage,
  onMessageChange,
  onShare,
}) => {
  const [copied, setCopied] = useState(false);
  const copiedTimeoutRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      setCopied(false);
      if (copiedTimeoutRef.current) {
        clearTimeout(copiedTimeoutRef.current);
        copiedTimeoutRef.current = null;
      }
    }
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (copiedTimeoutRef.current) {
        clearTimeout(copiedTimeoutRef.current);
      }
    };
  }, []);

  if (!isOpen) return null;

  const handleOverlayClick = (event) => {
    if (event.target.classList.contains("share-modal-overlay")) {
      onClose();
    }
  };

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(productUrl);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = productUrl;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }

      setCopied(true);
      if (copiedTimeoutRef.current) {
        clearTimeout(copiedTimeoutRef.current);
      }
      copiedTimeoutRef.current = setTimeout(() => {
        setCopied(false);
        copiedTimeoutRef.current = null;
      }, 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="share-modal-overlay" onClick={handleOverlayClick}>
      <div
        className="share-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="share-modal-title"
      >
        <div className="share-modal-header">
          <h2 id="share-modal-title">Compartir producto</h2>
          <button
            type="button"
            className="share-modal-close"
            onClick={onClose}
            aria-label="Cerrar"
          >
            <FaTimes />
          </button>
        </div>

        <div className="share-modal-preview">
          {imageUrl ? (
            <img src={imageUrl} alt={productName || "Producto"} />
          ) : (
            <div className="share-modal-image-fallback" aria-hidden />
          )}
          <div className="share-modal-preview-info">
            <h3>{productName}</h3>
            <p>{briefDescription}</p>
            <div className="share-modal-link-row">
              <input type="text" value={productUrl} readOnly />
              <button
                type="button"
                className={`share-copy-btn ${copied ? "is-copied" : ""}`}
                onClick={handleCopyLink}
                title={copied ? "Enlace copiado" : "Copiar enlace"}
                aria-label={copied ? "Enlace copiado" : "Copiar enlace"}
              >
                {copied ? <FaCheck /> : <FaLink />}
              </button>
              {copied && (
                <span className="share-copied-toast" role="status">
                  ¡Copiado!
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="share-modal-networks">
          <p className="share-modal-label">Elige una red social</p>
          <div className="share-network-list" role="radiogroup">
            {NETWORKS.map(({ id, label, Icon }) => (
              <button
                key={id}
                type="button"
                className={`share-network-btn ${selectedNetwork === id ? "active" : ""}`}
                onClick={() => onSelectNetwork(id)}
                aria-pressed={selectedNetwork === id}
              >
                <Icon />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="share-modal-message">
          <label htmlFor="share-custom-message">Mensaje personalizado</label>
          <textarea
            id="share-custom-message"
            rows={3}
            value={customMessage}
            onChange={(event) => onMessageChange(event.target.value)}
            placeholder="Escribe un mensaje para acompañar tu recomendación"
          />
          {selectedNetwork === "facebook" && (
            <p className="share-modal-hint">
              Facebook no permite prellenar el texto. Al continuar, copiamos tu
              mensaje para que lo pegues en la publicación. La vista previa
              (imagen/título) usa Open Graph del backend.
            </p>
          )}
          {selectedNetwork === "whatsapp" && (
            <p className="share-modal-hint">
              Se abrirá WhatsApp con tu mensaje y el enlace del producto.
            </p>
          )}
          {selectedNetwork === "instagram" && (
            <p className="share-modal-hint">
              Instagram no tiene compartir desde web. Al continuar, solo
              copiamos el mensaje y el enlace para que los pegues vos.
            </p>
          )}
          {selectedNetwork === "twitter" && (
            <p className="share-modal-hint">
              Se abrirá Twitter/X con el texto y el enlace listos para publicar.
            </p>
          )}
        </div>

        <div className="share-modal-actions">
          <button type="button" className="share-cancel-btn" onClick={onClose}>
            Cancelar
          </button>
          <button type="button" className="primary share-confirm-btn" onClick={onShare}>
            Compartir
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareProductModal;
