import type { ReactNode } from "react";
import type { FieldError } from "react-hook-form";


interface FormFieldProps {
  id: string;
  label: string;
  error?: FieldError;
  children: ReactNode;
}

export const FormField = ({
  id,
  label,
  error,
  children,
}: FormFieldProps) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>

      {children}

      {error && (
        <span className="error-message">{error.message}</span>
      )}
    </div>
  );
};