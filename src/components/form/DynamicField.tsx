import { Field } from "../../types";
import { shouldShowField, getFieldOptions } from "../../lib/utils";
import Input from "../ui/Input";
import TextArea from "../ui/TextArea";
import Select from "../ui/Select";
import RadioGroup from "../ui/RadioGroup";
import CheckboxGroup from "../ui/CheckboxGroup";
import DatePicker from "../ui/DatePicker";
import TimePicker from "../ui/TimePicker";
import PhoneInput from "../ui/PhoneInput";

interface DynamicFieldProps {
  field: Field;
  value: string | number | boolean | string[] | undefined;
  onChange: (id: string, value: string | number | boolean | string[]) => void;
  error?: string;
  formData: Record<string, string | number | boolean | string[]> & {
    apiData?: { availability?: { slots: { date: string; times: string[] }[] } };
  };
}

const DynamicField: React.FC<DynamicFieldProps> = ({
  field,
  value,
  onChange,
  error,
  formData,
}) => {
  if (!shouldShowField(field, formData)) {
    return null;
  }

  const handleChange = (val: string | number | boolean | string[]) => {
    onChange(field.id, val);
  };

  const options = getFieldOptions(field, formData);

  switch (field.type) {
    case "text":
    case "email":
    case "zipcode":
      return (
        <Input
          id={field.id}
          name={field.id}
          type={field.type === "email" ? "email" : "text"}
          label={field.label}
          placeholder={field.placeholder}
          value={typeof value === "string" ? value : ""}
          onChange={(e) => handleChange(e.target.value)}
          error={error}
          required={field.required}
          fullWidth
        />
      );
    case "textarea":
      return (
        <TextArea
          id={field.id}
          name={field.id}
          label={field.label}
          placeholder={field.placeholder}
          value={typeof value === "string" ? value : ""}
          onChange={(e) => handleChange(e.target.value)}
          error={error}
          required={field.required}
          fullWidth
        />
      );
    case "dropdown":
      return (
        <Select
          id={field.id}
          name={field.id}
          label={field.label}
          options={options}
          value={typeof value === "string" ? value : ""}
          onChange={(e) => handleChange(e.target.value)}
          error={error}
          required={field.required}
          fullWidth
        />
      );
    case "radio":
      return (
        <RadioGroup
          id={field.id}
          name={field.id}
          label={field.label}
          options={options}
          value={typeof value === "string" ? value : ""}
          onChange={handleChange}
          error={error}
          required={field.required}
        />
      );
    case "checkbox":
      return (
        <CheckboxGroup
          id={field.id}
          name={field.id}
          label={field.label}
          options={options}
          value={
            Array.isArray(value)
              ? value.filter((v) => typeof v === "string")
              : typeof value === "string"
              ? [value]
              : []
          }
          onChange={handleChange}
          error={error}
          required={field.required}
        />
      );
    case "date":
      return (
        <DatePicker
          id={field.id}
          name={field.id}
          label={field.label}
          value={typeof value === "string" ? value : ""}
          onChange={handleChange}
          error={error}
          required={field.required}
          placeholder={field.placeholder}
        />
      );
    case "time":
      return (
        <TimePicker
          id={field.id}
          name={field.id}
          label={field.label}
          value={typeof value === "string" ? value : ""}
          onChange={handleChange}
          error={error}
          required={field.required}
          placeholder={field.placeholder}
          options={
            field.dependsOn?.field === "date" && formData.date
              ? formData.apiData?.availability?.slots.find(
                  (slot: { date: unknown }) => slot.date === formData.date
                )?.times
              : undefined
          }
        />
      );
    case "phone":
      return (
        <PhoneInput
          id={field.id}
          name={field.id}
          label={field.label}
          value={typeof value === "string" ? value : ""}
          onChange={handleChange}
          error={error}
          required={field.required}
          placeholder={field.placeholder}
        />
      );
    default:
      return (
        <Input
          id={field.id}
          name={field.id}
          type="text"
          label={field.label}
          placeholder={field.placeholder}
          value={typeof value === "boolean" ? "" : value || ""}
          onChange={(e) => handleChange(e.target.value)}
          error={error}
          required={field.required}
          fullWidth
        />
      );
  }
};

export default DynamicField;
