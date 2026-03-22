import type { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { FormField } from "./FormField";

interface FormInputProps {
  id: string;
  label: string;
  type?: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  step?: string;
}

export const FormInput = ({
  id,
  label,
  type = "text",
  register,
  error,
  step,
}: FormInputProps) => {
  return (
    <FormField id={id} label={label} error={error}>
      <input
        id={id}
        type={type}
        step={step}
        {...register}
        className={error ? "error" : ""}
      />
    </FormField>
  );
};