export interface WidgetConfig {
  version: string;
  tenant: string;
  steps: Step[];
}

export interface Step {
  id: string;
  title: string;
  description?: string;
  fields: Field[];
  nextButtonText?: string;
  backButtonText?: string;
  validation?: {
    requiredFields: string[];
  };
}

export interface Field {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  options?: FieldOption[];
  required?: boolean;
  validationMessage?: string;
  dependsOn?: DependsOn;
  validation?: FieldValidation;
}

export type FieldType =
  | "text"
  | "textarea"
  | "dropdown"
  | "radio"
  | "checkbox"
  | "date"
  | "time"
  | "phone"
  | "email"
  | "address"
  | "zipcode"
  | "custom";

export interface FieldOption {
  value: string;
  label: string;
}

export interface DependsOn {
  field: string;
  operator?: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan";
  value?: string;
  valueMapping?: Record<string, FieldOption[]>;
}

export interface FieldValidation {
  required?: boolean;
  pattern?: string;
  minLength?: number;
  maxLength?: number;
  custom?: string;
}
export interface BrandingConfig {
  version: string;
  tenant: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    success: string;
    warning: string;
    error: string;
    background: string;
    text: {
      primary: string;
      secondary: string;
      onPrimary: string;
      onSecondary: string;
    };
  };
  typography: {
    fontFamily: string;
    headingFontFamily: string;
    baseFontSize: string;
    fontWeights: {
      normal: number;
      medium: number;
      bold: number;
    };
    lineHeights: {
      tight: number;
      normal: number;
      loose: number;
    };
  };
  spacing: {
    unit: string;
    scale: number[];
  };
  borderRadius: {
    small: string;
    medium: string;
    large: string;
    full: string;
  };
  shadows: {
    small: string;
    medium: string;
    large: string;
  };
  logos: {
    header: {
      src: string;
      width: number;
      height: number;
      alt: string;
    };
    confirmation?: {
      src: string;
      width: number;
      height: number;
      alt: string;
    };
  };
  customCSS?: string;
}

export interface Customer {
  customerId: number;
  locationId: number;
  address: Address;
  hasMembership: boolean;
  equipment?: Equipment[];
  membershipFrom?: string;
  tags?: number[];
}

export interface Address {
  street: string;
  unit: string;
  city: string;
  state: string;
  zip: string;
  longitude?: number;
  latitude?: number;
}

export interface Equipment {
  name: string;
  installedOn?: string;
  model?: string;
  brand?: string;
  serviceProviderWarrantyEnd?: string;
}

export interface Appointment {
  appointmentId: number;
  customerId: number;
  locationId: number;
  technicianId?: number;
  startTime: string;
  endTime: string;
  issueType: string;
  category: string;
  details: string;
  jobTypeId: number;
}

// API Response Types
export interface AvailabilityResponse {
  slots: TimeSlot[];
}

export interface TimeSlot {
  date: string;
  times: string[];
}

export interface BookingResponse {
  success: boolean;
  appointmentId?: number;
  error?: string;
}

// Widget State
export interface WidgetState {
  currentStep: number;
  formData: Record<string, any>;
  validationState: Record<string, boolean>;
  apiData: {
    customer?: Customer;
    availability?: AvailabilityResponse;
    booking?: BookingResponse;
  };
  ui: {
    loading: boolean;
    error: string | null;
  };
}
