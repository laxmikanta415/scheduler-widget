import { useState } from "react";
import { BookingResponse } from "../types";
import { bookAppointment } from "../services/api";

export function useBooking() {
  const [bookingResult, setBookingResult] = useState<BookingResponse | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitBooking = async (formData: Record<string, any>) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await bookAppointment(formData);
      setBookingResult(result);
      return result;
    } catch (err) {
      const errorMessage = "Failed to book appointment. Please try again.";
      setError(errorMessage);
      console.error("Error booking appointment:", err);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    bookingResult,
    isLoading,
    error,
    submitBooking,
  };
}
