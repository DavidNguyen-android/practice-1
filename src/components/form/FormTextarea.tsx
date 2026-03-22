import type { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { FormField } from "./FormField";

interface Props {
  id: string;
  label: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  rows?: number;
}

export const FormTextarea = ({
  id,
  label,
  register,
  error,
  rows = 4,
}: Props) => {
  return (
    <FormField id={id} label={label} error={error}>
      <textarea
        id={id}
        rows={rows}
        {...register}
        className={error ? "error" : ""}
      />
    </FormField>
  );
};