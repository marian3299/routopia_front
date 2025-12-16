import { useAuth } from "../context/AuthContext";
import { PERMISSIONS } from "../constants/permissions";

export const usePermissions = () => {
  const { user } = useAuth();

  const hasPermission = (permission) => {
    if (!user) return false;

    // Si es ADMIN, tiene todos los permisos
    if (user.role === "ADMIN") return true;

    // Verificar si tiene el permiso específico
    return user.permissions?.includes(permission) || false;
  };

  const hasAnyPermission = (permissions) => {
    return permissions.some((perm) => hasPermission(perm));
  };

  const hasAllPermissions = (permissions) => {
    return permissions.every((perm) => hasPermission(perm));
  };

  // Verificar si tiene algún permiso de una sección
  const hasAnySectionPermission = (section) => {
    const sectionPerms = Object.values(PERMISSIONS[section] || {});
    return hasAnyPermission(sectionPerms);
  };

  // Verificar si tiene todos los permisos de una sección
  const hasAllSectionPermissions = (section) => {
    const sectionPerms = Object.values(PERMISSIONS[section] || {});
    return hasAllPermissions(sectionPerms);
  };

  return {
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    hasAnySectionPermission,
    hasAllSectionPermissions,
  };
};
