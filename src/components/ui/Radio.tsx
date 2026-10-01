import type { ComponentPropsWithoutRef } from "react";

type RadioProps = Omit<ComponentPropsWithoutRef<"input">, "type">;

export function Radio({ className, ...props }: RadioProps) {
  const classes = [
    "h-4 w-4 rounded-full border border-border text-primary transition",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
    "disabled:cursor-not-allowed disabled:opacity-50",
  ];
  if (className) classes.push(className);

  return <input type="radio" className={classes.join(" ")} {...props} />;
}
