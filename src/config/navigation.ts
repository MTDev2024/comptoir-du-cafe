export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
};

export const mainNav: NavItem[] = [
  {
    label: "Cafés",
    href: "/cafes",
    children: [
      { label: "Tous les cafés", href: "/cafes" },
      { label: "Origines", href: "/cafes/origines" },
      { label: "Assemblages", href: "/cafes/assemblages" },
      { label: "Éditions limitées", href: "/cafes/editions-limitees" },
    ],
  },
  {
    label: "Machines & matériel",
    href: "/machines-materiel",
    children: [
      { label: "Machines espresso", href: "/machines-materiel/machines-espresso" },
      { label: "Moulins", href: "/machines-materiel/moulins" },
      { label: "Méthodes douces", href: "/machines-materiel/methodes-douces" },
      { label: "Accessoires", href: "/machines-materiel/accessoires" },
    ],
  },
  { label: "Sets & coffrets", href: "/sets-coffrets" },
  { label: "Ateliers", href: "/ateliers" },
  { label: "La Maison", href: "/la-maison" },
];

// Traitement éditorial secondaire dans le Header (moins dominant que mainNav).
export const secondaryNavItem: NavItem = { label: "Blog", href: "/blog" };

// Regroupement éditorial pour les colonnes du Footer (distinct de mainNav).
export const footerShopNav: NavItem[] = [
  { label: "Cafés", href: "/cafes" },
  { label: "Machines & matériel", href: "/machines-materiel" },
  { label: "Sets & coffrets", href: "/sets-coffrets" },
];

export const footerDiscoverNav: NavItem[] = [
  { label: "Ateliers", href: "/ateliers" },
  { label: "La Maison", href: "/la-maison" },
  { label: "Blog", href: "/blog" },
];
