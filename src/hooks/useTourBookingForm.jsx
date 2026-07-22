import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNotification } from "../context/useNotificationProvider";
import { useAuth } from "../context/AuthContext";
import {
  createBooking,
  getBookingAvailability,
} from "../services/booking.service";

const formatDateParam = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

const parseBlockedDate = (dateStr) => {
  const [y, m, d] = dateStr.split("T")[0].split("-").map(Number);
  return new Date(y, m - 1, d);
};

const isSameDay = (a, b) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const useTourBookingForm = ({ destination }) => {
  const { notify } = useNotification();
  const { user } = useAuth();
  const [blockedDates, setBlockedDates] = useState([]);
  const [loadingAvailability, setLoadingAvailability] = useState(false);
  const [availabilityError, setAvailabilityError] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      bookingDate: null,
      personCount: 1,
    },
  });

  const fetchAvailability = useCallback(async () => {
    if (!destination?.id) return;

    const from = new Date();
    const to = new Date();
    to.setFullYear(to.getFullYear() + 1);

    setLoadingAvailability(true);
    setAvailabilityError(false);

    try {
      const data = await getBookingAvailability(
        destination.id,
        formatDateParam(from),
        formatDateParam(to),
      );
      setBlockedDates((data.blockedDates || []).map(parseBlockedDate));
    } catch (error) {
      console.error("Error fetching availability:", error);
      setAvailabilityError(true);
      setBlockedDates([]);
    } finally {
      setLoadingAvailability(false);
    }
  }, [destination?.id]);

  useEffect(() => {
    fetchAvailability();
  }, [fetchAvailability]);

  const onSubmit = async (data) => {
    const isBlocked = blockedDates.some((date) =>
      isSameDay(date, data.bookingDate),
    );
    if (isBlocked) {
      notify({
        message: "La fecha seleccionada ya no está disponible.",
        type: "error",
      });
      return;
    }

    const bookingData = {
      destinoId: destination.id,
      bookingDate: formatDateParam(data.bookingDate),
      personCount: data.personCount,
      userId: user?.id,
    };

    try {
      await createBooking(bookingData);
      notify({
        message: `Reserva confirmada para ${destination?.name || "destino"} (${data.personCount} persona/s)`,
        type: "success",
      });
      reset({ bookingDate: null, personCount: 1 });
      await fetchAvailability();
    } catch (error) {
      notify({
        message:
          error.response?.data?.message ||
          "No se pudo procesar la reserva. Intenta nuevamente.",
        type: "error",
      });
      console.error("Error creating booking:", error);
    }
  };

  return {
    register,
    control,
    handleSubmit,
    errors,
    onSubmit,
    blockedDates,
    loadingAvailability,
    availabilityError,
    retryAvailability: fetchAvailability,
  };
};

export default useTourBookingForm;
