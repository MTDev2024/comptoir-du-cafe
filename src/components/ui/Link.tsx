import type { ReactNode } from "react";
import NextLink from "next/link";

type LinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

function isInternalHref(href: string): boolean {
  return href.startsWith("/") || href.startsWith("#");
}

export function Link({ href, children, className }: LinkProps) {
  if (isInternalHref(href)) {
    return (
      <NextLink href={href} className={className}>
        {children}
      </NextLink>
    );
  }

  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}
