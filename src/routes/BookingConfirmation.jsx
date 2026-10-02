import React, { useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { FaCircleCheck } from "react-icons/fa6";

const formatDisplayDate = (isoDate) => {
  const [y, m, d] = isoDate.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  const formatted = date.toLocaleDateString("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
};

const BookingConfirmation = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const booking = location.state?.booking ?? null;
  const destinationName = location.state?.destinationName ?? null;
  const destinationImage = location.state?.destinationImage ?? null;

  // Sin datos de reserva en el state (ej. entraron por URL directo), no hay nada que confirmar.
  useEffect(() => {
    if (!booking) {
      navigate(`/tour/${id}`, { replace: true });
    }
  }, [booking, id, navigate]);

  if (!booking) {
    return null;
  }

  return (
    <div className="booking-confirmation-page">
      <div className="booking-confirmation-card">
        <FaCircleCheck className="booking-confirmation-icon" />
        <h1>¡Reserva confirmada!</h1>
        <p className="booking-confirmation-subtitle">
          Tu reserva se realizó con éxito. Te esperamos.
        </p>

        {destinationImage && (
          <img
            src={destinationImage}
            alt={destinationName || "Destino reservado"}
            className="booking-confirmation-image"
          />
        )}

        <div className="booking-confirmation-details">
          <div className="booking-confirmation-row">
            <span>Producto</span>
            <strong>{destinationName || "—"}</strong>
          </div>
          <div className="booking-confirmation-row">
            <span>Fecha</span>
            <strong>{formatDisplayDate(booking.bookingDate)}</strong>
          </div>
          <div className="booking-confirmation-row">
            <span>Personas</span>
            <strong>{booking.personCount}</strong>
          </div>
          {booking.notes && (
            <div className="booking-confirmation-row">
              <span>Comentarios</span>
              <strong>{booking.notes}</strong>
            </div>
          )}
          <div className="booking-confirmation-row">
            <span>Número de reserva</span>
            <strong>#{booking.id}</strong>
          </div>
        </div>

        <div className="booking-confirmation-actions">
          <Link to={`/tour/${id}`}>
            <button type="button">Ver producto</button>
          </Link>
          <Link to="/">
            <button type="button" className="primary">
              Volver al inicio
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
