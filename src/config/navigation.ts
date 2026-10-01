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
  { label: "Trouver mon café", href: "/trouver-mon-cafe" },
  { label: "Ateliers", href: "/ateliers" },
  { label: "La Maison", href: "/la-maison" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];
