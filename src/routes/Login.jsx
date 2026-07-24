import { useNavigate, useLocation, Link } from "react-router-dom";
import "../index.css";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const loginMessage = location.state?.message;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const userData = await login(data.email, data.password);
      if (location.state?.from) {
        navigate(location.state.from);
      } else {
        navigate(userData.role === "ADMIN" ? "/admin" : "/");
      }
    } catch (err) {
      console.log(err);
      setError("root", { message: "Credenciales inválidas" });
    }
  };

  return (
    <main className="main-container">
      <div className="form-tour-container auth-container">
        <h2 className="auth-title">Iniciar sesión</h2>
        {loginMessage && <p className="login-context-message">{loginMessage}</p>}
        <div className="form-section auth-card">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="tu@email.com"
                {...register("email", {
                  required: "El email es requerido",
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
                {...register("password", {
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
              {isSubmitting ? "Ingresando..." : "Ingresar"}
            </button>
          </form>
        </div>
        <p className="auth-alt" style={{ marginTop: 8 }}>
          ¿No tienes cuenta?{" "}
          <Link to="/register" state={location.state} className="auth-link">
            Regístrate
          </Link>
        </p>
      </div>
    </main>
  );
}

export default Login;
