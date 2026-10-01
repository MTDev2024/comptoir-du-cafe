import type { ReactNode } from "react";

type ButtonVariant = "primary" | "accent";

type ButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  type?: "button" | "submit";
  disabled?: boolean;
  loading?: boolean;
  className?: string;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-primary text-primary-foreground",
  accent: "bg-accent text-accent-foreground",
};

export function Button({
  children,
  variant = "primary",
  type = "button",
  disabled = false,
  loading = false,
  className,
}: ButtonProps) {
  const classes = [
    "inline-flex items-center justify-center rounded-md px-6 py-3 text-body transition",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
    "disabled:cursor-not-allowed disabled:opacity-50",
    variantClasses[variant],
  ];
  if (className) classes.push(className);

  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={classes.join(" ")}
    >
      {children}
    </button>
  );
}
