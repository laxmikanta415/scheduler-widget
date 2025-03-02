import React from "react";
import { Step } from "../../types";

interface StepHeaderProps {
  step: Step;
}

const StepHeader: React.FC<StepHeaderProps> = ({ step }) => {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold text-gray-900">{step.title}</h2>
      {step.description && (
        <p className="mt-2 text-sm text-gray-600">{step.description}</p>
      )}
    </div>
  );
};

export default StepHeader;
