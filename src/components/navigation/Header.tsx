import { Link } from "@/components/ui/Link";
import { mainNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { HeaderShell } from "@/components/navigation/HeaderShell";
import { MobileNav } from "@/components/navigation/MobileNav";

type HeaderProps = {
  transparentUntilScroll?: boolean;
};

const navLinkClasses =
  "rounded-sm text-body transition hover:text-foreground-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export function Header({ transparentUntilScroll = false }: HeaderProps) {
  return (
    <HeaderShell transparentUntilScroll={transparentUntilScroll}>
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-16 md:px-8 lg:px-12 xl:px-16">
        <Link href="/" className="font-heading text-h4">
          {siteConfig.shortName}
        </Link>

        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex items-center gap-24">
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
          </ul>
        </nav>

        <div className="flex items-center gap-16">
          <Link href="/recherche" className={`${navLinkClasses} hidden sm:inline`}>
            Recherche
          </Link>
          <Link href="/compte" className={`${navLinkClasses} hidden sm:inline`}>
            Compte
          </Link>
          <Link href="/panier" className={navLinkClasses}>
            Panier
          </Link>
          <MobileNav items={mainNav} />
        </div>
      </div>
    </HeaderShell>
  );
}
