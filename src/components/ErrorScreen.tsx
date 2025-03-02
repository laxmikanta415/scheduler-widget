import { AlertTriangle } from "lucide-react";
import Button from "./ui/Button";

interface ErrorScreenProps {
  message: string;
  onRetry?: () => void;
}

const ErrorScreen: React.FC<ErrorScreenProps> = ({ message, onRetry }) => {
  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md">
      <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
      <h2 className="text-xl font-bold text-gray-900 mb-2">
        Something went wrong
      </h2>
      <p className="text-gray-600 mb-6 text-center">{message}</p>
      {onRetry && <Button onClick={onRetry}>Try Again</Button>}
    </div>
  );
};

export default ErrorScreen;
