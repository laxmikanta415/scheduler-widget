import { Fragment } from "react/jsx-runtime";
import { cn } from "../../lib/utils";

interface ProgressBarProps {
  steps: { id: string; title: string }[];
  currentStep: number;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  steps,
  currentStep,
  className,
}) => {
  return (
    <div className={cn("mb-8", className)}>
      {/* Desktop progress bar */}
      <div className="hidden sm:block">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <Fragment key={step.id}>
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium",
                    index <= currentStep
                      ? "bg-primary text-white"
                      : "bg-gray-200 text-gray-500"
                  )}
                >
                  {index + 1}
                </div>
                <span
                  className={cn(
                    "mt-2 text-xs font-medium",
                    index <= currentStep ? "text-primary" : "text-gray-500"
                  )}
                >
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "h-0.5 flex-1",
                    index < currentStep ? "bg-primary" : "bg-gray-200"
                  )}
                />
              )}
            </Fragment>
          ))}
        </div>
      </div>

      {/* Mobile progress bar */}
      <div className="sm:hidden">
        <div className="flex items-center">
          <div className="flex items-center space-x-2 text-sm">
            <span className="font-medium text-primary">
              Step {currentStep + 1} of {steps.length}
            </span>
            <span className="text-gray-500">{steps[currentStep]?.title}</span>
          </div>
        </div>
        <div className="mt-4 h-2 w-full rounded-full bg-gray-200">
          <div
            className="h-2 rounded-full bg-primary"
            style={{
              width: `${((currentStep + 1) / steps.length) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
