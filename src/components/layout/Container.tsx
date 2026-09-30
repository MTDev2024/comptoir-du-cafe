import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export function Container({ children, className }: ContainerProps) {
  const classes = [
    "mx-auto",
    "w-full",
    "max-w-[1440px]",
    "px-5",
    "md:px-8",
    "lg:px-12",
    "xl:px-16",
  ];
  if (className) classes.push(className);

  return <div className={classes.join(" ")}>{children}</div>;
}
