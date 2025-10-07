import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import "../index.css";

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const {
    register: registerForm,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const userData = await register(data.username, data.email, data.password);
      navigate(userData.role === "ADMIN" ? "/admin" : "/");
    } catch (err) {
      console.log(err);
      setError("root", { message: "Credenciales inválidas" });
    }
  };

  return (
    <main className="main-container">
      <div className="form-tour-container auth-container">
        <h2 className="auth-title">Crear cuenta</h2>
        <div className="form-section auth-card">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="tu@email.com"
                {...registerForm("email", {
                  required: "El email es requerido",
                })}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="username">Usuario</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="tu_usuario"
                {...registerForm("username", {
                  required: "El usuario es requerido",
                })}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="••••••••"
                {...registerForm("password", {
                  required: "La contraseña es requerida",
                })}
                required
              />
            </div>
            {errors.root && (
              <span className="error">{errors.root.message}</span>
            )}
            <button
              type="submit"
              className="form-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creando..." : "Crear cuenta"}
            </button>
          </form>
        </div>
        <p className="auth-alt" style={{ marginTop: 8 }}>
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="auth-link">
            Inicia sesión
          </Link>
        </p>
      </div>
    </main>
  );
}

export default Register;
