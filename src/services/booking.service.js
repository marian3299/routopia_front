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

export const getMyBookings = async ({ page = 0, size = 10 } = {}) => {
  try {
    const response = await api.get(URLS.MY_BOOKINGS, {
      params: { page, size },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching booking history:", error);
    throw error;
  }
};
