import { forwardRef } from "react";
import { cn } from "../../lib/utils";
import { FieldOption } from "../../types";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  options: FieldOption[];
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, fullWidth = false, options, ...props }, ref) => {
    return (
      <div className={cn("space-y-2", fullWidth && "w-full")}>
        {label && (
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor={props.id}
          >
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <select
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-red-500 focus-visible:ring-red-500",
            className
          )}
          ref={ref}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;
