import { useConfig } from "../context/ConfigContext";
import { useWidgetState } from "../context/WidgetStateContext";
import WidgetContainer from "./layout/WidgetContainer";
import WidgetHeader from "./layout/WidgetHeader";
import ProgressBar from "./layout/ProgressBar";
import StepHeader from "./layout/StepHeader";
import StepForm from "./form/StepForm";
import ConfirmationScreen from "./ConfirmationScreen";
import LoadingScreen from "./LoadingScreen";
import ErrorScreen from "./ErrorScreen";

const SchedulerWidget: React.FC = () => {
  const {
    widgetConfig,
    brandingConfig,
    isLoading: configLoading,
    error: configError,
  } = useConfig();
  const { state, nextStep, prevStep, updateFormData, setLoading, setError } =
    useWidgetState();

  const { currentStep, formData, ui } = state;

  const handleFieldChange = (
    id: string,
    value: string | number | boolean | string[]
  ) => {
    updateFormData({ [id]: value });
  };
  const handleSubmitForm = async () => {
    setLoading(true);
    setError(null);

    try {
      // In a real implementation, this would call the API
      // For now, i am  simulating a successful submission
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Move to confirmation step
      nextStep();
    } catch (err) {
      setError("Failed to submit form. Please try again.");
      console.error("Error submitting form:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    const isLastStep = currentStep === widgetConfig.steps.length - 1;

    if (isLastStep) {
      handleSubmitForm();
    } else {
      nextStep();
    }
  };

  if (configLoading) {
    return <LoadingScreen message="Loading scheduler..." />;
  }

  if (configError) {
    return <ErrorScreen message={configError} />;
  }

  if (currentStep >= widgetConfig.steps.length) {
    return (
      <WidgetContainer brandingConfig={brandingConfig}>
        <WidgetHeader brandingConfig={brandingConfig} />
        <ConfirmationScreen
          formData={formData}
          brandingConfig={brandingConfig}
        />
      </WidgetContainer>
    );
  }

  const step = widgetConfig.steps[currentStep];

  return (
    <WidgetContainer brandingConfig={brandingConfig}>
      <WidgetHeader brandingConfig={brandingConfig} />

      <div className="px-4 sm:px-6 py-6">
        <ProgressBar steps={widgetConfig.steps} currentStep={currentStep} />

        <StepHeader step={step} />

        {ui.error && (
          <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-md">
            {ui.error}
          </div>
        )}

        <StepForm
          step={step}
          formData={formData}
          onFieldChange={handleFieldChange}
          onNext={handleNext}
          onPrevious={prevStep}
          isFirstStep={currentStep === 0}
          isLastStep={currentStep === widgetConfig.steps.length - 1}
          isLoading={ui.loading}
        />
      </div>
    </WidgetContainer>
  );
};

export default SchedulerWidget;
