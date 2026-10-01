"use client";

import type { ComponentPropsWithoutRef } from "react";

type ToastVariant = "info" | "success" | "warning" | "error";

type ToastProps = ComponentPropsWithoutRef<"div"> & {
  open: boolean;
  variant?: ToastVariant;
  onClose?: () => void;
};

const variantClasses: Record<ToastVariant, string> = {
  info: "border-info bg-info/10",
  success: "border-success bg-success/10",
  warning: "border-warning bg-warning/10",
  error: "border-error bg-error/10",
};

export function Toast({
  open,
  variant = "info",
  onClose,
  role = "status",
  className,
  children,
  ...props
}: ToastProps) {
  if (!open) return null;

  const classes = [
    "flex items-center gap-8 rounded-md border-l-4 px-4 py-2 text-body-sm text-foreground",
    variantClasses[variant],
  ];
  if (className) classes.push(className);

  return (
    <div role={role} className={classes.join(" ")} {...props}>
      <span className="flex-1">{children}</span>
      {onClose && (
        <button
          type="button"
          aria-label="Fermer"
          onClick={onClose}
          className="text-foreground-muted hover:text-foreground focus-visible:outline-primary shrink-0 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <span aria-hidden="true">×</span>
        </button>
      )}
    </div>
  );
}
