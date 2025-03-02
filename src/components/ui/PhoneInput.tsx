import React, { useState, useEffect } from "react";
import { cn } from "../../lib/utils";
import { formatPhoneNumber } from "../../lib/utils";
import { Phone } from "lucide-react";

export interface PhoneInputProps {
  id?: string;
  name: string;
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  required?: boolean;
  className?: string;
  placeholder?: string;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  id,
  name,
  label,
  value = "",
  onChange,
  error,
  required,
  className,
  placeholder = "(555) 555-5555",
}) => {
  const [inputValue, setInputValue] = useState(formatPhoneNumber(value));

  useEffect(() => {
    setInputValue(formatPhoneNumber(value));
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    const formattedValue = formatPhoneNumber(rawValue);

    setInputValue(formattedValue);

    if (onChange) {
      onChange(rawValue);
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <label
          htmlFor={id || name}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          id={id || name}
          name={name}
          type="tel"
          value={inputValue}
          onChange={handleChange}
          required={required}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-red-500 focus-visible:ring-red-500"
          )}
          placeholder={placeholder}
          maxLength={14}
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Phone className="h-4 w-4 text-gray-400" />
        </div>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default PhoneInput;
