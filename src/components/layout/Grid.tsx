import type { ReactNode } from "react";

type GridProps = {
  children: ReactNode;
  className?: string;
};

export function Grid({ children, className }: GridProps) {
  const classes = ["grid"];
  if (className) classes.push(className);

  return <div className={classes.join(" ")}>{children}</div>;
}
