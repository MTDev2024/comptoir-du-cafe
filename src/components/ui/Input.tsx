import type { ComponentPropsWithoutRef } from "react";

type InputProps = ComponentPropsWithoutRef<"input">;

export function Input({ className, ...props }: InputProps) {
  const classes = [
    "w-full rounded-md border border-border bg-background px-4 py-2 text-body text-foreground transition",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "aria-invalid:border-error",
  ];
  if (className) classes.push(className);

  return <input className={classes.join(" ")} {...props} />;
}
