import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth();

  // Mostrar loading mientras se verifica la autenticación
  if (loading) {
    return (
      <div className="main-container">
        <div style={{ textAlign: "center", padding: "50px" }}>
          <p>Cargando...</p>
        </div>
      </div>
    );
  }

  // Si no hay usuario, redirigir al login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Si requiere admin y el usuario no es admin, redirigir según su rol
  if (adminOnly && user.role !== "ADMIN") {
    return <Navigate to="/admin" replace />;
  }

  // Si es USER e intenta acceder a rutas restringidas, redirigir al home
  if (user.role === "USER" && adminOnly) {
    return <Navigate to="/" replace />;
  }

  // Si todo está bien, mostrar el componente hijo
  return children;
};

export default ProtectedRoute;
