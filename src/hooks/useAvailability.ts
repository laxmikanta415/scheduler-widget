import { useState, useEffect } from "react";
import { AvailabilityResponse } from "../types";
import { getAvailability } from "../services/api";

export function useAvailability(
  date: string | undefined,
  serviceType: string | undefined,
  zipCode: string | undefined
) {
  const [availability, setAvailability] = useState<AvailabilityResponse | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAvailability = async () => {
      if (!date || !serviceType || !zipCode) {
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const data = await getAvailability(date, serviceType, zipCode);
        setAvailability(data);
      } catch (err) {
        setError("Failed to load availability. Please try again.");
        console.error("Error fetching availability:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAvailability();
  }, [date, serviceType, zipCode]);

  return {
    availability,
    isLoading,
    error,
  };
}
