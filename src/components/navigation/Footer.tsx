import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";
import { Link } from "@/components/ui/Link";
import { footerDiscoverNav, footerShopNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";

const footerLinkClasses =
  "rounded-sm text-body-sm text-foreground-muted transition hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

const footerHeadingClasses =
  "mb-16 text-caption uppercase tracking-wide text-foreground-muted";

export function Footer() {
  const { contact, social } = siteConfig;
  const hasContact = Boolean(contact?.address || contact?.phone || contact?.email);
  const hasSocial = Boolean(social?.instagram || social?.facebook || social?.linkedin);
  const hasContactColumn = hasContact || hasSocial;

  return (
    <footer className="border-border bg-background text-foreground border-t">
      <Container className="py-64">
        <Grid className="grid-cols-1 gap-32 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-8">
            <p className="font-heading text-h4 text-foreground">{siteConfig.name}</p>
            <p className="text-body-sm text-foreground-muted max-w-prose">
              {siteConfig.description}
            </p>
          </div>

          <nav aria-label="Boutique">
            <p className={footerHeadingClasses}>Boutique</p>
            <ul className="flex flex-col gap-8">
              {footerShopNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={footerLinkClasses}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Découvrir">
            <p className={footerHeadingClasses}>Découvrir</p>
            <ul className="flex flex-col gap-8">
              {footerDiscoverNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={footerLinkClasses}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {hasContactColumn && (
            <div className="flex flex-col gap-16">
              {hasContact && (
                <ul className="text-body-sm text-foreground-muted flex flex-col gap-4">
                  {contact?.address && <li>{contact.address}</li>}
                  {contact?.phone && <li>{contact.phone}</li>}
                  {contact?.email && <li>{contact.email}</li>}
                </ul>
              )}
              {hasSocial && (
                <ul className="flex gap-16">
                  {social?.instagram && (
                    <li>
                      <Link href={social.instagram} className={footerLinkClasses}>
                        Instagram
                      </Link>
                    </li>
                  )}
                  {social?.facebook && (
                    <li>
                      <Link href={social.facebook} className={footerLinkClasses}>
                        Facebook
                      </Link>
                    </li>
                  )}
                  {social?.linkedin && (
                    <li>
                      <Link href={social.linkedin} className={footerLinkClasses}>
                        LinkedIn
                      </Link>
                    </li>
                  )}
                </ul>
              )}
            </div>
          )}
        </Grid>

        <p className="text-caption text-foreground-muted mt-48">
          © {new Date().getFullYear()} {siteConfig.name}
        </p>
      </Container>
    </footer>
  );
}
