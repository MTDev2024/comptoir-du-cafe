import type { ReactNode } from "react";

type HeadingLevel = "h2" | "h3" | "h4";

type EmptyStateProps = {
  title: string;
  description?: string;
  action?: ReactNode;
  headingLevel?: HeadingLevel;
  className?: string;
};

export function EmptyState({
  title,
  description,
  action,
  headingLevel = "h2",
  className,
}: EmptyStateProps) {
  const Heading = headingLevel;

  const classes = ["flex flex-col items-center gap-16 py-32 text-center"];
  if (className) classes.push(className);

  return (
    <div className={classes.join(" ")}>
      <Heading className="text-h4 font-heading text-foreground">{title}</Heading>
      {description && <p className="text-body text-foreground-muted">{description}</p>}
      {action && <div className="mt-8">{action}</div>}
    </div>
  );
}
