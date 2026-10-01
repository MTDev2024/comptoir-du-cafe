import { Link } from "@/components/ui/Link";
import { mainNav, secondaryNavItem } from "@/config/navigation";
import { HeaderShell } from "@/components/navigation/HeaderShell";
import { MobileNav } from "@/components/navigation/MobileNav";

type HeaderProps = {
  transparentUntilScroll?: boolean;
};

const navLinkClasses =
  "rounded-sm text-body transition hover:text-foreground-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

const secondaryLinkClasses =
  "rounded-sm text-body-sm text-foreground-muted transition hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

const iconLinkClasses =
  "items-center justify-center rounded-sm p-4 transition hover:text-foreground-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

function SearchIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-5 w-5"
    >
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function AccountIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-5 w-5"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-5 w-5"
    >
      <path d="M6 8h12l-1 12H7L6 8Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
  );
}

export function Header({ transparentUntilScroll = false }: HeaderProps) {
  return (
    <HeaderShell transparentUntilScroll={transparentUntilScroll}>
      <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between px-5 md:px-8 lg:px-12 xl:px-16">
        <Link href="/" className="font-heading leading-none">
          <span className="text-h4 block">Le Comptoir</span>
          <span className="text-body-sm text-foreground-muted block tracking-wide">
            du Café
          </span>
        </Link>

        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex items-center gap-32">
            {mainNav.map((item) =>
              item.children && item.children.length > 0 ? (
                <li key={item.href}>
                  <details name="main-nav" className="relative">
                    <summary
                      className={`${navLinkClasses} list-none [&::-webkit-details-marker]:hidden`}
                    >
                      {item.label}
                    </summary>
                    <ul className="border-border bg-background absolute top-full left-0 z-10 mt-8 min-w-[200px] rounded-md border p-16 shadow-lg">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="text-body-sm text-foreground-muted hover:text-foreground focus-visible:outline-primary block rounded-sm px-8 py-8 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                </li>
              ) : (
                <li key={item.href}>
                  <Link href={item.href} className={navLinkClasses}>
                    {item.label}
                  </Link>
                </li>
              ),
            )}
            <li>
              <Link href={secondaryNavItem.href} className={secondaryLinkClasses}>
                {secondaryNavItem.label}
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-8">
          <Link href="/recherche" className={`${iconLinkClasses} hidden sm:inline-flex`}>
            <SearchIcon />
            <span className="sr-only">Recherche</span>
          </Link>
          <Link href="/compte" className={`${iconLinkClasses} hidden sm:inline-flex`}>
            <AccountIcon />
            <span className="sr-only">Compte</span>
          </Link>
          <Link href="/panier" className={`inline-flex ${iconLinkClasses}`}>
            <CartIcon />
            <span className="sr-only">Panier</span>
          </Link>
          <MobileNav items={mainNav} secondaryItem={secondaryNavItem} />
        </div>
      </div>
    </HeaderShell>
  );
}
