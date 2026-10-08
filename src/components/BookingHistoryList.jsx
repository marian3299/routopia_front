import React from "react";
import { Link } from "react-router-dom";
import useBookingHistory from "../hooks/useBookingHistory";
import Pagination from "./Pagination";

const formatDate = (isoDateTime) => {
  if (!isoDateTime) return "—";
  const [datePart] = isoDateTime.split("T");
  const [y, m, d] = datePart.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const statusLabel = (status) => {
  switch (status) {
    case "CONFIRMED":
      return "Confirmada";
    default:
      return status;
  }
};

const BookingHistoryList = () => {
  const { bookings, fetching, totalPages, currentPage, goToPage, totalElements } =
    useBookingHistory(10);

  return (
    <div className="booking-history-container">
      <h1>Mis reservas</h1>

      {!fetching && totalElements === 0 ? (
        <p className="booking-history-empty-msg">
          Todavía no realizaste ninguna reserva. Explorá destinos y reservá tu
          próxima aventura.
        </p>
      ) : (
        <>
          <div className="booking-history-list">
            {fetching ? (
              <p className="recomendations-loading-msg">Cargando...</p>
            ) : (
              bookings.map((booking) => (
                <Link
                  key={booking.id}
                  to={`/tour/${booking.destinoId}`}
                  className="booking-history-item"
                >
                  <img
                    src={booking.destinoImageUrl}
                    alt={booking.destinoName}
                    className="booking-history-image"
                  />
                  <div className="booking-history-info">
                    <div className="booking-history-header">
                      <h2>{booking.destinoName}</h2>
                      <span
                        className={`booking-history-status booking-history-status--${booking.status?.toLowerCase()}`}
                      >
                        {statusLabel(booking.status)}
                      </span>
                    </div>
                    <p>
                      <strong>Fecha de uso:</strong>{" "}
                      {formatDate(booking.bookingDate)}
                    </p>
                    <p>
                      <strong>Reservado el:</strong>{" "}
                      {formatDate(booking.createdAt)}
                    </p>
                    <p>
                      <strong>Personas:</strong> {booking.personCount}
                    </p>
                    {booking.notes && (
                      <p className="booking-history-notes">
                        <strong>Comentarios:</strong> {booking.notes}
                      </p>
                    )}
                  </div>
                </Link>
              ))
            )}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={goToPage}
            loading={fetching}
            previousLabel="← Anterior"
            nextLabel="Siguiente →"
          />
        </>
      )}
    </div>
  );
};

export default BookingHistoryList;
