import React from "react";
import { Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaClock } from "react-icons/fa";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import useTourBookingForm from "../hooks/useTourBookingForm";

const TourDescription = ({ destination }) => {
  const {
    register,
    control,
    handleSubmit,
    errors,
    onSubmit,
    blockedDates,
    loadingAvailability,
    availabilityError,
    retryAvailability,
  } = useTourBookingForm({ destination });

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
  return (
    <div className="tour-description-card">
      <h2>
        Desde ${destination?.precio} <span>por persona</span>
      </h2>

      <div className="tour-reservation">
        <h3>Seleccionar fecha y personas</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="tour-reservation">
          {availabilityError && (
            <div className="availability-error">
              <p>
                No se pudo obtener la disponibilidad en este momento. Intenta
                nuevamente más tarde.
              </p>
              <button type="button" onClick={retryAvailability}>
                Reintentar
              </button>
            </div>
          )}

          <Controller
            control={control}
            name="bookingDate"
            rules={{ required: "La fecha es requerida" }}
            render={({ field }) => (
              <DatePicker
                selected={field.value}
                onChange={field.onChange}
                dateFormat="dd/MM/yyyy"
                placeholderText="Seleccionar fecha"
                minDate={new Date()}
                excludeDates={blockedDates}
                disabled={loadingAvailability || availabilityError}
                monthsShown={2}
                withPortal
                calendarClassName="tour-datepicker-calendar"
                popperClassName="tour-datepicker-popper"
              />
            )}
          />
          {errors.bookingDate && (
            <span className="error">{errors.bookingDate.message}</span>
          )}

          <input
            type="number"
            min="1"
            step="1"
            placeholder="Cantidad de personas"
            {...register("personCount", {
              required: "La cantidad de personas es requerida",
              valueAsNumber: true,
              validate: (value) =>
                Number.isInteger(value) && value > 0
                  ? true
                  : "Debe ser un entero mayor a 0",
            })}
          />
          {errors.personCount && (
            <span className="error">{errors.personCount.message}</span>
          )}

          <button className="primary" type="submit">
            Reservar
          </button>
        </form>
      </div>

      <p className="icon-text">
        <FaClock className="icon" /> {destination?.duration_time} horas (aprox.)
      </p>
      <div className="tour-languages">
        <p className="icon-text">
          <IoChatbubbleEllipses className="icon" /> Idiomas
        </p>
        <ul>
          {destination?.languages.map((language) => (
            <li key={language}>{getLanguage(language)}</li>
          ))}
        </ul>
      </div>
      <p className="icon-text">
        <FaLocationDot className="icon" /> {destination?.address},{" "}
        {destination?.city}
      </p>
    </div>
  );
};

export default TourDescription;
