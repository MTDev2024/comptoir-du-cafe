type ContactInfo = {
  email?: string;
  phone?: string;
  address?: string;
};

type SocialLinks = {
  instagram?: string;
  facebook?: string;
  linkedin?: string;
};

type SiteConfig = {
  name: string;
  shortName: string;
  description: string;
  locale: string;
  url: string;
  contact?: ContactInfo;
  social?: SocialLinks;
};

export const siteConfig: SiteConfig = {
  name: "Le Comptoir du Café",
  shortName: "Le Comptoir",
  description:
    "Maison de torréfaction familiale fondée en 1896. Cafés torréfiés sur place, matériel, sets, coffrets et ateliers.",
  locale: "fr-FR",
  url: "http://localhost:3000",
};

export type { SiteConfig };
