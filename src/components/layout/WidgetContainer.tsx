import { cn } from "../../lib/utils";
import { BrandingConfig } from "../../types";

interface WidgetContainerProps {
  children: React.ReactNode;
  brandingConfig: BrandingConfig;
  className?: string;
}

const WidgetContainer: React.FC<WidgetContainerProps> = ({
  children,
  brandingConfig,
  className,
}) => {
  const { colors, borderRadius, shadows } = brandingConfig;

  // Self note: CSS variables for theming
  const cssVariables = {
    "--color-primary": colors.primary,
    "--color-secondary": colors.secondary,
    "--color-accent": colors.accent,
    "--color-success": colors.success,
    "--color-warning": colors.warning,
    "--color-error": colors.error,
    "--color-background": colors.background,
    "--color-text-primary": colors.text.primary,
    "--color-text-secondary": colors.text.secondary,
    "--color-text-on-primary": colors.text.onPrimary,
    "--color-text-on-secondary": colors.text.onSecondary,
    "--border-radius-small": borderRadius.small,
    "--border-radius-medium": borderRadius.medium,
    "--border-radius-large": borderRadius.large,
    "--shadow-medium": shadows.medium,
  } as React.CSSProperties;

  return (
    <div
      className={cn(
        "max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden",
        className
      )}
      style={cssVariables}
    >
      {children}
    </div>
  );
};

export default WidgetContainer;
