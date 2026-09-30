export const siteConfig = {
  name: "Le Comptoir du Café",
  shortName: "Le Comptoir",
  description:
    "Maison de torréfaction familiale fondée en 1896. Cafés torréfiés sur place, matériel, sets, coffrets et ateliers.",
  locale: "fr-FR",
  url: "http://localhost:3000",
} as const;

export type SiteConfig = typeof siteConfig;
