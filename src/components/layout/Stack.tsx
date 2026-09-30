import type { ReactNode } from "react";

type StackProps = {
  children: ReactNode;
  className?: string;
};

export function Stack({ children, className }: StackProps) {
  const classes = ["flex"];
  if (className) classes.push(className);

  return <div className={classes.join(" ")}>{children}</div>;
}
