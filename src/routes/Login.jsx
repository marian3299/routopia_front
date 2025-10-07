import { useNavigate, Link } from "react-router-dom";
import "../index.css";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const userData = await login(data.username, data.password);
      navigate(userData.role === "ADMIN" ? "/admin" : "/");
    } catch (err) {
      console.log(err);
      setError("root", { message: "Credenciales inválidas" });
    }
  };

  return (
    <main className="main-container">
      <div className="form-tour-container auth-container">
        <h2 className="auth-title">Iniciar sesión</h2>
        <div className="form-section auth-card">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="username">Usuario</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="tu_usuario"
                {...register("username", {
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
          <Link to="/register" className="auth-link">
            Regístrate
          </Link>
        </p>
      </div>
    </main>
  );
}

export default Login;
