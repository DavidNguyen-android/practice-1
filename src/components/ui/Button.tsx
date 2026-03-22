import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  loading?: boolean;
}

export const Button = ({
  children,
  variant = "primary",
  loading = false,
  disabled,
  className = "",
  ...props
}: ButtonProps) => {
  const baseClass = "btn";
  const variantClass = `btn-${variant}`;

  return (
    <button
      {...props}
      disabled={loading || disabled}
      className={`${baseClass} ${variantClass} ${className}`}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};