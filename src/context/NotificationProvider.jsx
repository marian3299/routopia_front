import React, { createContext, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { motion as Motion } from "motion/react";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const notify = ({ message, type = "info", duration = 3000 }) => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, type }]);

    // Borrar automáticamente después de "duration"
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, duration);
  };

  const remove = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      {/* Renderizamos las notificaciones */}
      <div className="notification-container">
        <AnimatePresence>
          {notifications.map(({ id, message, type }) => (
            <Motion.div
              key={id}
              initial={{ opacity: 0, translateY: -20 }}
              animate={{ opacity: 1, translateY: 0 }}
              exit={{ opacity: 0, translateY: -20 }}
              className={`notification ${type}`}
            >
              <span>{message}</span>
              <button className="close-btn" onClick={() => remove(id)}>
                ×
              </button>
            </Motion.div>
          ))}
        </AnimatePresence>
      </div>
    </NotificationContext.Provider>
  );
};

export { NotificationContext };
