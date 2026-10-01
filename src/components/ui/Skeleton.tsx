import type { ComponentPropsWithoutRef } from "react";

type SkeletonProps = ComponentPropsWithoutRef<"div">;

export function Skeleton({ className, ...props }: SkeletonProps) {
  const classes = ["animate-pulse rounded-md bg-surface"];
  if (className) classes.push(className);

  return <div aria-hidden="true" className={classes.join(" ")} {...props} />;
}
