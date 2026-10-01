import type { ReactNode } from "react";

type FormFieldProps = {
  id: string;
  label: string;
  description?: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
};

export function FormField({
  id,
  label,
  description,
  error,
  required = false,
  children,
}: FormFieldProps) {
  const descriptionId = `${id}-description`;
  const errorId = `${id}-error`;

  return (
    <div className="flex flex-col gap-8">
      <label htmlFor={id} className="text-body-sm text-foreground font-medium">
        {label}
        {required && (
          <span aria-hidden="true" className="text-error">
            {" "}
            *
          </span>
        )}
      </label>
      {children}
      {description && (
        <p id={descriptionId} className="text-caption text-foreground-muted">
          {description}
        </p>
      )}
      {error && (
        <p id={errorId} className="text-caption text-error">
          {error}
        </p>
      )}
    </div>
  );
}
