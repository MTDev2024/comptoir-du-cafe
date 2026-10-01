"use client";

import { useState } from "react";
import { Drawer } from "@/components/ui/Drawer";
import { Link } from "@/components/ui/Link";
import type { NavItem } from "@/config/navigation";

type MobileNavProps = {
  items: NavItem[];
  secondaryItem?: NavItem;
};

export function MobileNav({ items, secondaryItem }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        aria-label="Ouvrir le menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="text-body text-foreground hover:text-foreground-muted focus-visible:outline-primary transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 lg:hidden"
      >
        Menu
      </button>

      <Drawer open={open} onClose={() => setOpen(false)} heading="Menu" side="left">
        {/* Le clic bubble jusqu'à ce `nav` ferme le Drawer après navigation : Link ne
            supporte volontairement pas de prop onClick (décision déjà actée). */}
        <nav aria-label="Navigation mobile" onClick={() => setOpen(false)}>
          <ul className="flex flex-col gap-16">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-body text-foreground focus-visible:outline-primary block rounded-sm py-8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  {item.label}
                </Link>
                {item.children && item.children.length > 0 && (
                  <ul className="mt-8 flex flex-col gap-8 pl-16">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className="text-body-sm text-foreground-muted focus-visible:outline-primary block rounded-sm py-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          {secondaryItem && (
            <Link
              href={secondaryItem.href}
              className="text-body-sm text-foreground-muted focus-visible:outline-primary mt-16 block rounded-sm py-8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              {secondaryItem.label}
            </Link>
          )}
        </nav>
      </Drawer>
    </>
  );
}
