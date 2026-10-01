"use client";

import { useEffect, useState, type ReactNode } from "react";

type HeaderShellProps = {
  transparentUntilScroll: boolean;
  children: ReactNode;
};

const SCROLL_THRESHOLD = 64;

export function HeaderShell({ transparentUntilScroll, children }: HeaderShellProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (!transparentUntilScroll) return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [transparentUntilScroll]);

  const isTransparent = transparentUntilScroll && !isScrolled;

  const classes = [
    "sticky top-0 z-40 w-full transition-colors",
    isTransparent
      ? "bg-transparent text-foreground-on-dark"
      : "border-b border-border bg-background text-foreground",
  ];

  return <header className={classes.join(" ")}>{children}</header>;
}
