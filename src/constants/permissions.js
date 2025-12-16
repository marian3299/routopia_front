// Sistema de permisos granular por sección y acción
export const PERMISSIONS = {
  DESTINOS: {
    VIEW: "destinos:view",
    CREATE: "destinos:create",
    EDIT: "destinos:edit",
    DELETE: "destinos:delete",
  },
  USERS: {
    VIEW: "users:view",
    MANAGE: "users:manage", // Otorgar/quitar permisos
  },
  // Para futuras secciones:
  // RESERVATIONS: { VIEW: "reservations:view", ... },
  // REPORTS: { VIEW: "reports:view", ... },
};

// Helper para obtener todos los permisos de una sección
export const getSectionPermissions = (section) => {
  return Object.values(PERMISSIONS[section] || {});
};

// Helper para verificar si un permiso pertenece a una sección
export const isPermissionOfSection = (permission, section) => {
  return Object.values(PERMISSIONS[section] || {}).includes(permission);
};
