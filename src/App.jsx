import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./routes/Home";
import TourDetail from "./routes/TourDetail";
import Footer from "./components/Footer";
import Category from "./routes/Category";
import FormTour from "./routes/FormTour";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Profile from "./routes/Profile";
import { AuthProvider } from "./context/AuthContext";
import Admin from "./routes/Admin";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Navbar />
        <div className="content">
          <Routes>
            {/* Rutas públicas - no requieren autenticación */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Rutas protegidas - requieren autenticación */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/tour/:id"
              element={
                <ProtectedRoute>
                  <TourDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/category/:type"
              element={
                <ProtectedRoute>
                  <Category />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            {/* Rutas solo para ADMIN */}
            <Route
              path="/new-tour"
              element={
                <ProtectedRoute adminOnly={true}>
                  <FormTour />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit-tour/:id"
              element={
                <ProtectedRoute adminOnly={true}>
                  <FormTour />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute adminOnly={true}>
                  <Admin />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
        <Footer />
      </AuthProvider>
    </div>
  );
}

export default App;
