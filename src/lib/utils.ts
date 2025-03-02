import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Field, FieldOption } from "../types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function shouldShowField(
  field: Field,
  formData: Record<string, any>
): boolean {
  if (!field.dependsOn) {
    return true;
  }

  const {
    field: dependsOnField,
    operator = "equals",
    value,
    valueMapping,
  } = field.dependsOn;
  const dependentValue = formData[dependsOnField];

  if (dependentValue === undefined) {
    return false;
  }

  if (valueMapping) {
    return !!valueMapping[dependentValue];
  }

  if (value !== undefined) {
    switch (operator) {
      case "equals":
        return dependentValue === value;
      case "notEquals":
        return dependentValue !== value;
      case "contains":
        return dependentValue.includes(value);
      case "greaterThan":
        return dependentValue > value;
      case "lessThan":
        return dependentValue < value;
      default:
        return true;
    }
  }
  return !!dependentValue;
}

export function getFieldOptions(
  field: Field,
  formData: Record<string, any>
): FieldOption[] {
  if (!field.dependsOn?.valueMapping) {
    return field.options || [];
  }

  const { field: dependsOnField, valueMapping } = field.dependsOn;
  const dependentValue = formData[dependsOnField];

  if (!dependentValue || !valueMapping[dependentValue]) {
    return [];
  }

  return valueMapping[dependentValue];
}

export function formatPhoneNumber(value: string): string {
  if (!value) return "";

  const cleaned = value.replace(/\D/g, "");

  if (cleaned.length <= 3) {
    return cleaned;
  } else if (cleaned.length <= 6) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
  } else {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(
      6,
      10
    )}`;
  }
}
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidZipCode(zipcode: string): boolean {
  const zipcodeRegex = /^[0-9]{5}(-[0-9]{4})?$/;
  return zipcodeRegex.test(zipcode);
}

export function formatDate(date: string): string {
  if (!date) return "";

  const d = new Date(date);
  return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
}
export function formatTime(time: string): string {
  if (!time) return "";

  const [hours, minutes] = time.split(":");
  const h = parseInt(hours, 10);
  const period = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;

  return `${hour}:${minutes} ${period}`;
}
