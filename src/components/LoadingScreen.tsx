import { Loader2 } from "lucide-react";

interface LoadingScreenProps {
  message?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  message = "Loading...",
}) => {
  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md">
      <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
      <p className="text-lg font-medium text-gray-700">{message}</p>
    </div>
  );
};

export default LoadingScreen;
