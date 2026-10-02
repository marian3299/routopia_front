import React from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaClock } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoChatbubbleEllipses } from "react-icons/io5";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import ImageCarousel from "../components/ImageCarousel";
import TourPolicies from "../components/TourPolicies";
import useBookingReview from "../hooks/useBookingReview";

const getLanguage = (language) => {
  switch (language) {
    case "SPANISH":
      return "Español";
    case "ENGLISH":
      return "Inglés";
    case "FRENCH":
      return "Francés";
    default:
      return language;
  }
};

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

const BookingReview = () => {
  const {
    destination,
    carouselImages,
    loadingDestination,
    bookingDate,
    personCount,
    checkingAvailability,
    dateUnavailable,
    submitting,
    confirmBooking,
    user,
  } = useBookingReview();

  if (!bookingDate || !personCount || loadingDestination) {
    return <div className="booking-review-status">Cargando...</div>;
  }

  if (!destination) {
    return (
      <div className="booking-review-status">
        No se pudo cargar la información del destino.
      </div>
    );
  }

  const canConfirm = !checkingAvailability && !dateUnavailable && !submitting;

  return (
    <div className="booking-review-page">
      <Link to={`/tour/${destination.id}`} className="booking-review-back">
        <FaArrowLeft className="btnArrow" /> Volver al detalle
      </Link>

      <div className="booking-review-content">
        <section className="booking-review-product">
          <h1>{destination.name}</h1>
          <p className="icon-text">
            <FaLocationDot className="icon" /> {destination.location}
          </p>

          <ImageCarousel images={carouselImages} />

          {(destination.traits?.length ?? 0) > 0 && (
            <div className="booking-review-traits-section">
              <h2>Información destacada</h2>
              <ul className="booking-review-traits">
                {destination.traits.map((trait) => (
                  <li key={trait.id}>
                    {trait.imageUrl && (
                      <img src={trait.imageUrl} alt="" width={18} height={18} />
                    )}
                    {trait.name}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="booking-review-description">
            <h2>Descripción</h2>
            <p>{destination.description}</p>
          </div>

          <div className="booking-review-details">
            <p className="icon-text">
              <FaClock className="icon" /> {destination.duration_time} (aprox.)
            </p>
            {(destination.languages?.length ?? 0) > 0 && (
              <div className="icon-text">
                <IoChatbubbleEllipses className="icon" />
                <span>
                  Idiomas:{" "}
                  {Array.from(destination.languages)
                    .map(getLanguage)
                    .join(", ")}
                </span>
              </div>
            )}
            <p className="icon-text">
              <FaLocationDot className="icon" /> {destination.address},{" "}
              {destination.city}
            </p>
          </div>

          <TourPolicies policies={destination.policies} />

          {(destination.secondaryImages?.length ?? 0) > 0 && (
            <div className="booking-review-gallery">
              <h2>Galería de imágenes</h2>
              <ResponsiveMasonry
                columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
              >
                <Masonry gutter="12px">
                  {destination.secondaryImages.map((src, index) => (
                    <img
                      key={index}
                      src={src}
                      alt={`Imagen ${index}`}
                      style={{
                        width: "100%",
                        display: "block",
                        borderRadius: "8px",
                      }}
                    />
                  ))}
                </Masonry>
              </ResponsiveMasonry>
            </div>
          )}
        </section>

        <section className="booking-review-summary">
          <h2>Resumen de tu reserva</h2>

          <div className="booking-review-block">
            <h3>Datos de quien reserva</h3>
            <p>
              {user?.nombre} {user?.apellido}
            </p>
            <p>{user?.email}</p>
          </div>

          <div className="booking-review-block">
            <h3>Fecha seleccionada</h3>
            <p>{formatDisplayDate(bookingDate)}</p>
            <p>
              {personCount} persona{personCount === 1 ? "" : "s"}
            </p>
            {checkingAvailability && (
              <p className="booking-review-checking">
                Verificando disponibilidad...
              </p>
            )}
            {dateUnavailable && (
              <p className="booking-review-error">
                Esta fecha ya no está disponible. Volvé al detalle del
                producto para elegir otra.
              </p>
            )}
          </div>

          <button
            type="button"
            className="primary booking-review-submit"
            onClick={confirmBooking}
            disabled={!canConfirm}
          >
            {submitting ? "Confirmando..." : "Confirmar reserva"}
          </button>
        </section>
      </div>
    </div>
  );
};

export default BookingReview;
