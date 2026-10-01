import type { ComponentPropsWithoutRef } from "react";

type AlertVariant = "info" | "success" | "warning" | "error";

type AlertProps = ComponentPropsWithoutRef<"div"> & {
  variant?: AlertVariant;
};

const variantClasses: Record<AlertVariant, string> = {
  info: "border-info bg-info/10",
  success: "border-success bg-success/10",
  warning: "border-warning bg-warning/10",
  error: "border-error bg-error/10",
};

export function Alert({ variant = "info", className, children, ...props }: AlertProps) {
  const classes = [
    "rounded-md border-l-4 px-4 py-3 text-body text-foreground",
    variantClasses[variant],
  ];
  if (className) classes.push(className);

  return (
    <div className={classes.join(" ")} {...props}>
      {children}
    </div>
  );
}
