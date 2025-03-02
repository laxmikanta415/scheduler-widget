import { cn } from "../../lib/utils";
import { Clock } from "lucide-react";

export interface TimePickerProps {
  id?: string;
  name: string;
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  required?: boolean;
  className?: string;
  placeholder?: string;
  options?: string[];
}

const TimePicker: React.FC<TimePickerProps> = ({
  id,
  name,
  label,
  value,
  onChange,
  error,
  required,
  className,
  placeholder = "Select time",
  options,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(e.target.value);
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
        {options && options.length > 0 ? (
          <select
            id={id || name}
            name={name}
            value={value || ""}
            onChange={handleChange}
            required={required}
            className={cn(
              "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none",
              error && "border-red-500 focus-visible:ring-red-500"
            )}
          >
            <option value="" disabled>
              {placeholder}
            </option>
            {options.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        ) : (
          <input
            id={id || name}
            name={name}
            type="time"
            value={value || ""}
            onChange={(e) => onChange && onChange(e.target.value)}
            required={required}
            className={cn(
              "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              error && "border-red-500 focus-visible:ring-red-500"
            )}
            placeholder={placeholder}
          />
        )}
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <Clock className="h-4 w-4 text-gray-400" />
        </div>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default TimePicker;
