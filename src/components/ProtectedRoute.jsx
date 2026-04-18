import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { usePermissions } from "../hooks/usePermissions";

const ProtectedRoute = ({
  children,
  adminOnly = false,
  requiredPermission = null,
  requiredPermissions = [], // Array de permisos (requiere todos)
}) => {
  const { user, loading } = useAuth();
  const { hasPermission, hasAllPermissions } = usePermissions();

  if (loading) {
    return (
      <div className="main-container">
        <div style={{ textAlign: "center", padding: "50px" }}>
          <p>Cargando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Verificar permiso único
  if (requiredPermission && !hasPermission(requiredPermission)) {
    return <Navigate to="/" replace />;
  }

  // Verificar múltiples permisos (requiere todos)
  if (
    requiredPermissions.length > 0 &&
    !hasAllPermissions(requiredPermissions)
  ) {
    return <Navigate to="/" replace />;
  }

  // Verificar si requiere admin
  if (adminOnly && user.role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
