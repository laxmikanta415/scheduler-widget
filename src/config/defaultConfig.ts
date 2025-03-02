import { WidgetConfig, BrandingConfig } from "../types";

export const defaultWidgetConfig: WidgetConfig = {
  version: "1.0",
  tenant: "default_tenant",
  steps: [
    {
      id: "issue",
      title: "Select Your Issue",
      description: "Please tell us what service you need",
      fields: [
        {
          id: "issueType",
          type: "dropdown",
          label: "Please select your issue",
          placeholder: "Select",
          options: [
            { value: "repair", label: "Repair" },
            { value: "maintenance", label: "Maintenance" },
            { value: "emergency", label: "Emergency" },
            { value: "quote", label: "Get a Quote" },
          ],
          required: true,
          validationMessage: "Please select an issue type",
        },
        {
          id: "category",
          type: "radio",
          label: "Category",
          options: [],
          dependsOn: {
            field: "issueType",
            valueMapping: {
              repair: [
                { value: "hvac", label: "HVAC" },
                { value: "plumbing", label: "Plumbing" },
              ],
              emergency: [
                { value: "no_heat", label: "No Heat" },
                { value: "water_leak", label: "Water Leak" },
              ],
            },
          },
          required: true,
          validationMessage: "Please select a category",
        },
      ],
      nextButtonText: "Continue",
      backButtonText: "Back",
      validation: {
        requiredFields: ["issueType", "category"],
      },
    },
    {
      id: "details",
      title: "Service Details",
      description: "Please provide more information about your service needs",
      fields: [
        {
          id: "details",
          type: "textarea",
          label: "Please describe your issue",
          placeholder: "Enter details here...",
          required: true,
          validationMessage: "Please provide details about your issue",
          validation: {
            minLength: 10,
            maxLength: 500,
          },
        },
      ],
      nextButtonText: "Continue",
      backButtonText: "Back",
      validation: {
        requiredFields: ["details"],
      },
    },
    {
      id: "contact",
      title: "Contact Information",
      description: "Please provide your contact information",
      fields: [
        {
          id: "name",
          type: "text",
          label: "Full Name",
          placeholder: "John Doe",
          required: true,
          validationMessage: "Please enter your full name",
        },
        {
          id: "email",
          type: "email",
          label: "Email Address",
          placeholder: "john.doe@example.com",
          required: true,
          validationMessage: "Please enter a valid email address",
        },
        {
          id: "phone",
          type: "phone",
          label: "Phone Number",
          placeholder: "(555) 555-5555",
          required: true,
          validationMessage: "Please enter a valid phone number",
        },
      ],
      nextButtonText: "Continue",
      backButtonText: "Back",
      validation: {
        requiredFields: ["name", "email", "phone"],
      },
    },
    {
      id: "address",
      title: "Service Address",
      description: "Please provide the address where service is needed",
      fields: [
        {
          id: "street",
          type: "text",
          label: "Street Address",
          placeholder: "123 Main St",
          required: true,
          validationMessage: "Please enter your street address",
        },
        {
          id: "unit",
          type: "text",
          label: "Apt/Suite/Unit",
          placeholder: "Apt 4B",
          required: false,
        },
        {
          id: "city",
          type: "text",
          label: "City",
          placeholder: "Anytown",
          required: true,
          validationMessage: "Please enter your city",
        },
        {
          id: "state",
          type: "dropdown",
          label: "State",
          placeholder: "Select",
          options: [
            { value: "CA", label: "California" },
            { value: "NY", label: "New York" },
            { value: "TX", label: "Texas" },
          ],
          required: true,
          validationMessage: "Please select your state",
        },
        {
          id: "zipcode",
          type: "zipcode",
          label: "Zip Code",
          placeholder: "12345",
          required: true,
          validationMessage: "Please enter a valid zip code",
          validation: {
            pattern: "^[0-9]{5}(-[0-9]{4})?$",
          },
        },
      ],
      nextButtonText: "Continue",
      backButtonText: "Back",
      validation: {
        requiredFields: ["street", "city", "state", "zipcode"],
      },
    },
    {
      id: "schedule",
      title: "Schedule Appointment",
      description: "Please select a date and time for your appointment",
      fields: [
        {
          id: "date",
          type: "date",
          label: "Preferred Date",
          required: true,
          validationMessage: "Please select a date",
        },
        {
          id: "time",
          type: "time",
          label: "Preferred Time",
          dependsOn: {
            field: "date",
          },
          required: true,
          validationMessage: "Please select a time",
        },
      ],
      nextButtonText: "Schedule",
      backButtonText: "Back",
      validation: {
        requiredFields: ["date", "time"],
      },
    },
  ],
};

export const defaultBrandingConfig: BrandingConfig = {
  version: "1.0",
  tenant: "default_tenant",
  colors: {
    primary: "#0999e0",
    secondary: "#000000",
    accent: "#f3f4f6",
    success: "#10b981",
    warning: "#f59e0b",
    error: "#ef4444",
    background: "#ffffff",
    text: {
      primary: "#111827",
      secondary: "#6b7280",
      onPrimary: "#ffffff",
      onSecondary: "#ffffff",
    },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
    headingFontFamily: "Inter, sans-serif",
    baseFontSize: "16px",
    fontWeights: {
      normal: 400,
      medium: 500,
      bold: 700,
    },
    lineHeights: {
      tight: 1.25,
      normal: 1.5,
      loose: 1.75,
    },
  },
  spacing: {
    unit: "4px",
    scale: [1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24],
  },
  borderRadius: {
    small: "2px",
    medium: "4px",
    large: "8px",
    full: "9999px",
  },
  shadows: {
    small: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    medium:
      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    large:
      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  },
  logos: {
    header: {
      src: "https://placehold.co/150x40/0b99e0/white?text=Scheduler",
      width: 150,
      height: 40,
      alt: "Company Logo",
    },
    confirmation: {
      src: "https://placehold.co/200x60/0b99e0/white?text=Scheduler",
      width: 200,
      height: 60,
      alt: "Company Logo",
    },
  },
};
