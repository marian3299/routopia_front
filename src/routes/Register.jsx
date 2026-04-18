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
      const userData = await register(
        data.nombre,
        data.apellido,
        data.email,
        data.password
      );
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
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                placeholder="Tu nombre"
                {...registerForm("nombre", {
                  required: "El nombre es requerido",
                })}
              />
              {errors.nombre && (
                <span className="error">{errors.nombre.message}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="apellido">Apellido</label>
              <input
                type="text"
                id="apellido"
                name="apellido"
                placeholder="Tu apellido"
                {...registerForm("apellido", {
                  required: "El apellido es requerido",
                })}
              />
              {errors.apellido && (
                <span className="error">{errors.apellido.message}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                placeholder="tu@email.com"
                {...registerForm("email", {
                  required: "El email es requerido",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "El email no es válido",
                  },
                })}
              />
              {errors.email && (
                <span className="error">{errors.email.message}</span>
              )}
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
                  minLength: {
                    value: 6,
                    message: "La contraseña debe tener al menos 6 caracteres",
                  },
                })}
              />
              {errors.password && (
                <span className="error">{errors.password.message}</span>
              )}
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
