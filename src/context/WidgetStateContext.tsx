import React, { createContext, useContext, useReducer } from "react";
import { WidgetState } from "../types";

type Action =
  | { type: "SET_CURRENT_STEP"; payload: number }
  | { type: "UPDATE_FORM_DATA"; payload: { [key: string]: any } }
  | { type: "SET_VALIDATION_STATE"; payload: { [key: string]: boolean } }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_API_DATA"; payload: { key: string; data: any } }
  | { type: "RESET_STATE" };

const initialState: WidgetState = {
  currentStep: 0,
  formData: {},
  validationState: {},
  apiData: {},
  ui: {
    loading: false,
    error: null,
  },
};

const widgetReducer = (state: WidgetState, action: Action): WidgetState => {
  switch (action.type) {
    case "SET_CURRENT_STEP":
      return {
        ...state,
        currentStep: action.payload,
      };
    case "UPDATE_FORM_DATA":
      return {
        ...state,
        formData: {
          ...state.formData,
          ...action.payload,
        },
      };
    case "SET_VALIDATION_STATE":
      return {
        ...state,
        validationState: {
          ...state.validationState,
          ...action.payload,
        },
      };
    case "SET_LOADING":
      return {
        ...state,
        ui: {
          ...state.ui,
          loading: action.payload,
        },
      };
    case "SET_ERROR":
      return {
        ...state,
        ui: {
          ...state.ui,
          error: action.payload,
        },
      };
    case "SET_API_DATA":
      return {
        ...state,
        apiData: {
          ...state.apiData,
          [action.payload.key]: action.payload.data,
        },
      };
    case "RESET_STATE":
      return initialState;
    default:
      return state;
  }
};

interface WidgetStateContextType {
  state: WidgetState;
  dispatch: React.Dispatch<Action>;
  nextStep: () => void;
  prevStep: () => void;
  updateFormData: (data: { [key: string]: any }) => void;
  setValidationState: (state: { [key: string]: boolean }) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setApiData: (key: string, data: any) => void;
  resetState: () => void;
}

const WidgetStateContext = createContext<WidgetStateContextType | undefined>(
  undefined
);

export const WidgetStateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(widgetReducer, initialState);

  const nextStep = () => {
    dispatch({ type: "SET_CURRENT_STEP", payload: state.currentStep + 1 });
  };

  const prevStep = () => {
    if (state.currentStep > 0) {
      dispatch({ type: "SET_CURRENT_STEP", payload: state.currentStep - 1 });
    }
  };

  const updateFormData = (data: { [key: string]: any }) => {
    dispatch({ type: "UPDATE_FORM_DATA", payload: data });
  };

  const setValidationState = (validationState: { [key: string]: boolean }) => {
    dispatch({ type: "SET_VALIDATION_STATE", payload: validationState });
  };

  const setLoading = (loading: boolean) => {
    dispatch({ type: "SET_LOADING", payload: loading });
  };

  const setError = (error: string | null) => {
    dispatch({ type: "SET_ERROR", payload: error });
  };

  const setApiData = (key: string, data: any) => {
    dispatch({ type: "SET_API_DATA", payload: { key, data } });
  };

  const resetState = () => {
    dispatch({ type: "RESET_STATE" });
  };

  return (
    <WidgetStateContext.Provider
      value={{
        state,
        dispatch,
        nextStep,
        prevStep,
        updateFormData,
        setValidationState,
        setLoading,
        setError,
        setApiData,
        resetState,
      }}
    >
      {children}
    </WidgetStateContext.Provider>
  );
};

export const useWidgetState = () => {
  const context = useContext(WidgetStateContext);
  if (context === undefined) {
    throw new Error("useWidgetState must be used within a WidgetStateProvider");
  }
  return context;
};
