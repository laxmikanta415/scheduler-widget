import React from "react";
import { BrandingConfig } from "../../types";

interface WidgetHeaderProps {
  brandingConfig: BrandingConfig;
}

const WidgetHeader: React.FC<WidgetHeaderProps> = ({ brandingConfig }) => {
  const { logos } = brandingConfig;

  return (
    <header className="flex justify-center py-4 border-b border-gray-200 mb-6">
      {logos.header && (
        <img
          src={logos.header.src}
          alt={logos.header.alt}
          width={logos.header.width}
          height={logos.header.height}
          className="max-h-12 w-auto"
        />
      )}
    </header>
  );
};

export default WidgetHeader;
