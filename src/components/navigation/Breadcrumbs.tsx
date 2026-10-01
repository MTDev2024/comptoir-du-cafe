import { Link } from "@/components/ui/Link";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  className?: string;
};

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  const classes = ["overflow-x-auto"];
  if (className) classes.push(className);

  return (
    <nav aria-label="Fil d'Ariane" className={classes.join(" ")}>
      <ol className="text-body-sm text-foreground-muted flex items-center gap-8 whitespace-nowrap">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center gap-8">
              {index > 0 && <span aria-hidden="true">/</span>}
              {isLast ? (
                <span aria-current="page" className="text-foreground">
                  {item.label}
                </span>
              ) : item.href ? (
                <Link
                  href={item.href}
                  className="hover:text-foreground focus-visible:outline-primary rounded-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  {item.label}
                </Link>
              ) : (
                <span>{item.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
