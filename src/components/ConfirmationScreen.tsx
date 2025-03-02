import { BrandingConfig } from "../types";
import { Check, Calendar, MapPin, Phone, Mail, FileText } from "lucide-react";
import { formatDate, formatTime } from "../lib/utils";

interface ConfirmationScreenProps {
  formData: Record<string, any>;
  brandingConfig: BrandingConfig;
}

const ConfirmationScreen: React.FC<ConfirmationScreenProps> = ({
  formData,
  brandingConfig,
}) => {
  const { logos } = brandingConfig;

  return (
    <div className="px-4 sm:px-6 py-8">
      <div className="flex flex-col items-center text-center mb-8">
        <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Appointment Confirmed!
        </h2>
        <p className="text-gray-600 max-w-md">
          Your appointment has been scheduled successfully. We've sent a
          confirmation email with all the details.
        </p>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Appointment Details
        </h3>

        <div className="space-y-4">
          <div className="flex items-start">
            <Calendar className="h-5 w-5 text-primary mr-3 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900">Date & Time</p>
              <p className="text-gray-600">
                {formData.date ? formatDate(formData.date) : "N/A"} at{" "}
                {formData.time ? formatTime(formData.time) : "N/A"}
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <MapPin className="h-5 w-5 text-primary mr-3 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900">Service Address</p>
              <p className="text-gray-600">
                {formData.street}
                {formData.unit ? `, ${formData.unit}` : ""}
                <br />
                {formData.city}, {formData.state} {formData.zipcode}
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <FileText className="h-5 w-5 text-primary mr-3 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900">Service Details</p>
              <p className="text-gray-600">
                <span className="capitalize">{formData.issueType}</span>
                {formData.category ? ` - ${formData.category}` : ""}
              </p>
              {formData.details && (
                <p className="text-gray-600 mt-1">{formData.details}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Contact Information
        </h3>

        <div className="space-y-4">
          <div className="flex items-center">
            <Phone className="h-5 w-5 text-primary mr-3" />
            <div>
              <p className="font-medium text-gray-900">Phone</p>
              <p className="text-gray-600">{formData.phone || "N/A"}</p>
            </div>
          </div>

          <div className="flex items-center">
            <Mail className="h-5 w-5 text-primary mr-3" />
            <div>
              <p className="font-medium text-gray-900">Email</p>
              <p className="text-gray-600">{formData.email || "N/A"}</p>
            </div>
          </div>
        </div>
      </div>

      {logos.confirmation && (
        <div className="mt-8 flex justify-center">
          <img
            src={logos.confirmation.src}
            alt={logos.confirmation.alt}
            width={logos.confirmation.width}
            height={logos.confirmation.height}
            className="max-h-16 w-auto"
          />
        </div>
      )}
    </div>
  );
};

export default ConfirmationScreen;
