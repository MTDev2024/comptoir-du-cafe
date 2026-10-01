import { Container } from "@/components/layout/Container";
import { Link } from "@/components/ui/Link";
import { mainNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";

const footerLinkClasses =
  "rounded-sm text-body-sm text-foreground-muted transition hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export function Footer() {
  const { contact, social } = siteConfig;
  const hasContact = Boolean(contact?.address || contact?.phone || contact?.email);
  const hasSocial = Boolean(social?.instagram || social?.facebook || social?.linkedin);

  return (
    <footer className="border-border bg-background text-foreground border-t">
      <Container className="flex flex-col gap-32 py-48">
        <div className="flex flex-col gap-8">
          <p className="font-heading text-h4 text-foreground">{siteConfig.name}</p>
          <p className="text-body-sm text-foreground-muted max-w-prose">
            {siteConfig.description}
          </p>
        </div>

        <nav aria-label="Pied de page">
          <ul className="flex flex-wrap gap-24">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={footerLinkClasses}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

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

        <p className="text-caption text-foreground-muted">
          © {new Date().getFullYear()} {siteConfig.name}
        </p>
      </Container>
    </footer>
  );
}
