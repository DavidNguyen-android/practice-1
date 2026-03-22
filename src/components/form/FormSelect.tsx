import type { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { FormField } from "./FormField";

// Support both object options and primitive options
type Option<T extends string | number> =
  | {
      label: string;
      value: T;
    }
  | T;

interface FormSelectProps<T extends string | number> {
  id: string;
  label: string;
  options: readonly Option<T>[];
  register: UseFormRegisterReturn;
  error?: FieldError;
  placeholder?: string;
  disabled?: boolean;
}

export const FormSelect = <T extends string | number>({
  id,
  label,
  options,
  register,
  error,
  placeholder = "Select an option",
  disabled,
}: FormSelectProps<T>) => {
  return (
    <FormField id={id} label={label} error={error}>
      <select
        id={id}
        {...register}
        disabled={disabled}
        className={error ? "error" : ""}
      >
        {/* Placeholder */}
        <option value="">{placeholder}</option>

        {/* Options */}
        {options.map((opt) => {
          const value =
            typeof opt === "object" ? opt.value : opt;

          const label =
            typeof opt === "object" ? opt.label : opt;

          return (
            <option key={String(value)} value={value}>
              {label}
            </option>
          );
        })}
      </select>
    </FormField>
  );
};