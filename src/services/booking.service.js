import api from "./api";
import { URLS } from "./urls";

export const createBooking = async (bookingData) => {
  try {
    const response = await api.post(URLS.CREATE_BOOKING, bookingData);
    return response.data;
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error;
  }
};

export const getBookingAvailability = async (destinoId, from, to) => {
  try {
    const response = await api.get(URLS.BOOKING_AVAILABILITY, {
      params: { destinoId, from, to },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching booking availability:", error);
    throw error;
  }
};
