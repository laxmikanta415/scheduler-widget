import React, { createContext, useContext, useState, useEffect } from "react";
import { WidgetConfig, BrandingConfig } from "../types";
import {
  defaultWidgetConfig,
  defaultBrandingConfig,
} from "../config/defaultConfig";

interface ConfigContextType {
  widgetConfig: WidgetConfig;
  brandingConfig: BrandingConfig;
  setWidgetConfig: (config: WidgetConfig) => void;
  setBrandingConfig: (config: BrandingConfig) => void;
  loadConfig: (tenantId: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [widgetConfig, setWidgetConfig] =
    useState<WidgetConfig>(defaultWidgetConfig);
  const [brandingConfig, setBrandingConfig] = useState<BrandingConfig>(
    defaultBrandingConfig
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadConfig = async (tenantId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // In a real implementation, this would fetch from an API
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Simulate tenant-specific configuration
      const tenantWidgetConfig = { ...defaultWidgetConfig, tenant: tenantId };
      const tenantBrandingConfig = {
        ...defaultBrandingConfig,
        tenant: tenantId,
      };

      setWidgetConfig(tenantWidgetConfig);
      setBrandingConfig(tenantBrandingConfig);
    } catch (err) {
      setError("Failed to load configuration");
      console.error("Error loading configuration:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tenantId = urlParams.get("tenant") || "default_tenant";

    loadConfig(tenantId);
  }, []);

  return (
    <ConfigContext.Provider
      value={{
        widgetConfig,
        brandingConfig,
        setWidgetConfig,
        setBrandingConfig,
        loadConfig,
        isLoading,
        error,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (context === undefined) {
    throw new Error("useConfig must be used within a ConfigProvider");
  }
  return context;
};
