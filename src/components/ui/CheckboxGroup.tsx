import { cn } from "../../lib/utils";
import { FieldOption } from "../../types";

export interface CheckboxGroupProps {
  id?: string;
  name: string;
  label?: string;
  options: FieldOption[];
  value?: string[];
  onChange?: (value: string[]) => void;
  error?: string;
  required?: boolean;
  className?: string;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  id,
  name,
  label,
  options,
  value = [],
  onChange,
  error,
  required,
  className,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!onChange) return;

    const optionValue = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
      onChange([...value, optionValue]);
    } else {
      onChange(value.filter((v) => v !== optionValue));
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="space-y-2">
        {options.map((option) => (
          <div key={option.value} className="flex items-center">
            <input
              id={`${id || name}-${option.value}`}
              name={name}
              type="checkbox"
              value={option.value}
              checked={value.includes(option.value)}
              onChange={handleChange}
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <label
              htmlFor={`${id || name}-${option.value}`}
              className="ml-2 block text-sm text-gray-700"
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default CheckboxGroup;
