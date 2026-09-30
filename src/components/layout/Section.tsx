import type { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  className?: string;
};

export function Section({ children, className }: SectionProps) {
  const classes = ["py-16", "lg:py-24", "xl:py-32"];
  if (className) classes.push(className);

  return <section className={classes.join(" ")}>{children}</section>;
}
