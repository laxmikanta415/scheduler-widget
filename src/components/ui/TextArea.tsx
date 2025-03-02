import { forwardRef } from "react";
import { cn } from "../../lib/utils";

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, label, error, fullWidth = false, ...props }, ref) => {
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
        <textarea
          className={cn(
            "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-red-500 focus-visible:ring-red-500",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

TextArea.displayName = "TextArea";

export default TextArea;
