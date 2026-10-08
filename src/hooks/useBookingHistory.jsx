import { useCallback, useEffect, useState } from "react";
import { getMyBookings } from "../services/booking.service";
import usePagination from "./usePagination";

const useBookingHistory = (pageSize = 10) => {
  const [bookings, setBookings] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const fetchPage = useCallback(async (_query, page, size) => {
    setFetching(true);
    try {
      const data = await getMyBookings({ page, size });
      setBookings(data.content || []);
      setTotalPages(data.totalPages || 0);
      setTotalElements(data.totalElements || 0);
    } catch (error) {
      console.error("Error fetching booking history:", error);
      setBookings([]);
      setTotalPages(0);
      setTotalElements(0);
    } finally {
      setFetching(false);
    }
  }, []);

  const { currentPage, goToPage } = usePagination(fetchPage, 0, pageSize);

  useEffect(() => {
    goToPage(0);
  }, []);

  return {
    bookings,
    fetching,
    totalPages,
    totalElements,
    currentPage,
    goToPage,
  };
};

export default useBookingHistory;
