import type { ComponentPropsWithoutRef } from "react";

type SelectProps = ComponentPropsWithoutRef<"select">;

export function Select({ className, children, ...props }: SelectProps) {
  const classes = [
    "w-full rounded-md border border-border bg-background px-4 py-2 text-body text-foreground transition",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "aria-invalid:border-error",
  ];
  if (className) classes.push(className);

  return (
    <select className={classes.join(" ")} {...props}>
      {children}
    </select>
  );
}
