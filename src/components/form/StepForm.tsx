import React, { useState } from "react";
import { Step } from "../../types";
import DynamicField from "./DynamicField";
import Button from "../ui/Button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface StepFormProps {
  step: Step;
  formData: Record<string, string | number | boolean>;
  onFieldChange: (
    id: string,
    value: string | number | boolean | string[]
  ) => void;
  onNext: () => void;
  onPrevious: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  isLoading?: boolean;
}

const StepForm: React.FC<StepFormProps> = ({
  step,
  formData,
  onFieldChange,
  onNext,
  onPrevious,
  isFirstStep,
  isLastStep,
  isLoading = false,
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep = (): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

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
            typeof dependsOnValue === "string" &&
            !field.dependsOn.valueMapping[dependsOnValue]
          ) {
            continue;
          }
        }

        const value = formData[fieldId];

        if (value === undefined || value === null || value === "") {
          newErrors[fieldId] =
            field.validationMessage || "This field is required";
          isValid = false;
        } else if (field.validation) {
          if (
            field.type === "email" &&
            typeof value === "string" &&
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ) {
            newErrors[fieldId] =
              field.validationMessage || "Please enter a valid email address";
            isValid = false;
          } else if (
            field.type === "zipcode" &&
            field.validation.pattern &&
            typeof value === "string" &&
            !new RegExp(field.validation.pattern).test(value)
          ) {
            newErrors[fieldId] =
              field.validationMessage || "Please enter a valid zip code";
            isValid = false;
          } else if (
            field.validation.minLength &&
            typeof value === "string" &&
            value.length < field.validation.minLength
          ) {
            newErrors[
              fieldId
            ] = `Must be at least ${field.validation.minLength} characters`;
            isValid = false;
          } else if (
            field.validation.maxLength &&
            typeof value === "string" &&
            value.length > field.validation.maxLength
          ) {
            newErrors[
              fieldId
            ] = `Must be no more than ${field.validation.maxLength} characters`;
            isValid = false;
          }
        }
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateStep()) {
      onNext();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        {step.fields.map((field) => (
          <DynamicField
            key={field.id}
            field={field}
            value={formData[field.id]}
            onChange={onFieldChange}
            error={errors[field.id]}
            formData={formData}
          />
        ))}
      </div>

      <div className="flex justify-between pt-4">
        {!isFirstStep && (
          <Button
            type="button"
            variant="outline"
            onClick={onPrevious}
            leftIcon={<ArrowLeft className="h-4 w-4" />}
          >
            {step.backButtonText || "Back"}
          </Button>
        )}

        <div className={isFirstStep ? "ml-auto" : ""}>
          <Button
            type="submit"
            isLoading={isLoading}
            rightIcon={<ArrowRight className="h-4 w-4" />}
          >
            {step.nextButtonText || (isLastStep ? "Submit" : "Continue")}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default StepForm;
