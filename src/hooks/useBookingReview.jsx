import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNotification } from "../context/useNotificationProvider";
import { getDestinationById } from "../services/destino.service";
import {
  createBooking,
  getBookingAvailability,
} from "../services/booking.service";

const useBookingReview = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { notify } = useNotification();

  const bookingDate = location.state?.bookingDate ?? null;
  const personCount = location.state?.personCount ?? null;
  const notes = location.state?.notes ?? null;

  const [destination, setDestination] = useState(null);
  const [loadingDestination, setLoadingDestination] = useState(true);
  const [checkingAvailability, setCheckingAvailability] = useState(true);
  const [dateUnavailable, setDateUnavailable] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Si se entra directo por URL (sin pasar por el formulario de fecha), no hay nada que confirmar.
  useEffect(() => {
    if (!bookingDate || !personCount) {
      navigate(`/tour/${id}`, { replace: true });
    }
  }, [bookingDate, personCount, id, navigate]);

  useEffect(() => {
    if (!id) return undefined;
    let active = true;
    setLoadingDestination(true);

    getDestinationById(id)
      .then((data) => {
        if (active) setDestination(data);
      })
      .catch((error) => {
        console.error("Error fetching destination:", error);
        if (active) setDestination(null);
      })
      .finally(() => {
        if (active) setLoadingDestination(false);
      });

    return () => {
      active = false;
    };
  }, [id]);

  // Revalida que la fecha elegida en la pantalla anterior siga libre.
  useEffect(() => {
    if (!id || !bookingDate) return undefined;
    let active = true;
    setCheckingAvailability(true);

    getBookingAvailability(id, bookingDate, bookingDate)
      .then((data) => {
        if (!active) return;
        const blocked = (data.blockedDates || []).some(
          (blockedDate) => blockedDate.split("T")[0] === bookingDate,
        );
        setDateUnavailable(blocked);
      })
      .catch((error) => {
        console.error("Error checking availability:", error);
        if (active) setDateUnavailable(false);
      })
      .finally(() => {
        if (active) setCheckingAvailability(false);
      });

    return () => {
      active = false;
    };
  }, [id, bookingDate]);

  const confirmBooking = useCallback(async () => {
    if (!user || dateUnavailable || !bookingDate || !personCount) return;

    setSubmitting(true);
    try {
      const booking = await createBooking({
        destinoId: Number(id),
        bookingDate,
        personCount,
        notes,
        userId: user.id,
      });
      navigate(`/tour/${id}/reserva-confirmada`, {
        state: {
          booking,
          destinationName: destination?.name,
          destinationImage: destination?.imageUrl,
        },
      });
    } catch (error) {
      notify({
        message:
          error.response?.data?.message ||
          "No se pudo procesar la reserva. Intenta nuevamente.",
        type: "error",
      });
      console.error("Error creating booking:", error);
    } finally {
      setSubmitting(false);
    }
  }, [
    user,
    dateUnavailable,
    bookingDate,
    personCount,
    notes,
    id,
    destination,
    notify,
    navigate,
  ]);

  const carouselImages = destination
    ? [destination.imageUrl, ...(destination.secondaryImages || [])].slice(
        0,
        4,
      )
    : [];

  return {
    destination,
    carouselImages,
    loadingDestination,
    bookingDate,
    personCount,
    notes,
    checkingAvailability,
    dateUnavailable,
    submitting,
    confirmBooking,
    user,
  };
};

export default useBookingReview;
