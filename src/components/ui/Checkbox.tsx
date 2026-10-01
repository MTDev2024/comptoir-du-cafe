import type { ComponentPropsWithoutRef } from "react";

type CheckboxProps = Omit<ComponentPropsWithoutRef<"input">, "type">;

export function Checkbox({ className, ...props }: CheckboxProps) {
  const classes = [
    "h-4 w-4 rounded-sm border border-border text-primary transition",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
    "disabled:cursor-not-allowed disabled:opacity-50",
  ];
  if (className) classes.push(className);

  return <input type="checkbox" className={classes.join(" ")} {...props} />;
}
