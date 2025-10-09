import React from "react";

const ModalConfirm = ({ title, message, onConfirm, onCancel }) => {
  const handleOverlayClick = (e) => {
    // Solo cerrar si se hace clic en el overlay, no en el contenido del modal
    if (e.target.className === "modal-overlay") {
      onCancel();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-confirm">
        <h2>{title}</h2>
        <p>{message}</p>
        <div className="modal-buttons">
          <button onClick={onConfirm}>Confirmar</button>
          <button onClick={onCancel}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirm;
