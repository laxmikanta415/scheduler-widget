import { useState, useEffect } from "react";
import { Step } from "../types";

export function useFormValidation(step: Step, formData: Record<string, any>) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    validateStep();
  }, [formData, step]);

  const validateStep = () => {
    const newErrors: Record<string, string> = {};
    let valid = true;

    if (step.validation?.requiredFields) {
      for (const fieldId of step.validation.requiredFields) {
        const field = step.fields.find((f) => f.id === fieldId);

        if (!field) continue;

        if (field.dependsOn) {
          const dependsOnField = field.dependsOn.field;
          const dependsOnValue = formData[dependsOnField];

          if (!dependsOnValue) continue;

          if (
            field.dependsOn.valueMapping &&
            !field.dependsOn.valueMapping[dependsOnValue]
          ) {
            continue;
          }
        }

        const value = formData[fieldId];

        if (value === undefined || value === null || value === "") {
          newErrors[fieldId] =
            field.validationMessage || "This field is required";
          valid = false;
        } else if (field.validation) {
          if (
            field.type === "email" &&
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ) {
            newErrors[fieldId] =
              field.validationMessage || "Please enter a valid email address";
            valid = false;
          } else if (
            field.type === "zipcode" &&
            field.validation.pattern &&
            !new RegExp(field.validation.pattern).test(value)
          ) {
            newErrors[fieldId] =
              field.validationMessage || "Please enter a valid zip code";
            valid = false;
          } else if (
            field.validation.minLength &&
            value.length < field.validation.minLength
          ) {
            newErrors[
              fieldId
            ] = `Must be at least ${field.validation.minLength} characters`;
            valid = false;
          } else if (
            field.validation.maxLength &&
            value.length > field.validation.maxLength
          ) {
            newErrors[
              fieldId
            ] = `Must be no more than ${field.validation.maxLength} characters`;
            valid = false;
          }
        }
      }
    }

    setErrors(newErrors);
    setIsValid(valid);

    return valid;
  };

  return {
    errors,
    isValid,
    validateStep,
  };
}
