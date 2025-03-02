import { AvailabilityResponse, BookingResponse, Customer } from "../types";

// Base API URL
const API_BASE_URL = "https://api.example.com";

async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const defaultOptions: RequestInit = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(url, {
    ...defaultOptions,
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(
      error.message || `API request failed with status ${response.status}`
    );
  }

  return response.json();
}
export async function getAvailability(
  date: string,
  serviceType: string,
  zipCode: string
): Promise<AvailabilityResponse> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const slots = [];
  const startDate = new Date(date);

  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);

    if (currentDate.getDay() === 0) continue;

    const dateString = currentDate.toISOString().split("T")[0];

    // Generate time slots from 8 AM to 5 PM
    const times = [];
    for (let hour = 8; hour <= 17; hour++) {
      // Skip some hours
      if (hour === 12) continue;

      times.push(`${hour}:00`);
      if (hour < 17) {
        times.push(`${hour}:30`);
      }
    }

    slots.push({
      date: dateString,
      times,
    });
  }

  return { slots };
}

// Book an appointment
export async function bookAppointment(
  appointmentData: Record<string, any>
): Promise<BookingResponse> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    success: true,
    appointmentId: Math.floor(Math.random() * 1000000),
  };
}

// Get customer information
export async function getCustomer(
  email: string,
  phone: string
): Promise<Customer | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return null;
}

export async function createCustomer(
  customerData: Record<string, any>
): Promise<Customer> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  return {
    customerId: Math.floor(Math.random() * 1000000),
    locationId: Math.floor(Math.random() * 1000000),
    address: {
      street: customerData.street,
      unit: customerData.unit || "",
      city: customerData.city,
      state: customerData.state,
      zip: customerData.zipcode,
    },
    hasMembership: false,
  };
}
