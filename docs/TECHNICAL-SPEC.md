# Technical Specification

## Structure applicative

```text
src/
├── app/
├── actions/
├── components/
├── config/
├── lib/
├── types/
└── styles/
```

## Organisation de `src/components/`

```text
src/components/
├── ui/           # composants de base (Button, Input, Badge, Alert, Modal, …)
├── layout/       # primitives de layout (Container, Section, Stack, Grid)
├── navigation/   # Header, Footer, Breadcrumbs, menus
├── commerce/     # ProductCard, CartDrawer, VariantSelector, …
├── blog/         # composants liés aux articles Decap
├── workshops/    # composants liés aux ateliers Cal.com
├── finder/       # composants du Coffee Finder
├── reviews/      # composants d'affichage des avis
├── gallery/      # composants de galerie image
└── sections/     # sections de page composées (Hero, etc.)
```

Chaque composant est placé dans le sous-dossier correspondant à son domaine plutôt qu'à la racine de `components/`.

### Primitives de layout : Container, Section, Stack, Grid

`Container`, `Section`, `Stack` et `Grid` (`src/components/layout/`) sont quatre primitives indépendantes, chacune avec une responsabilité unique et minimale :

- `Container` : largeur max et padding horizontal. Ne porte aucune sémantique (rend un `<div>`).
- `Section` : rythme vertical entre blocs de page et sémantique (rend un `<section>`). Ne gère pas la largeur/le padding horizontal.
- `Stack` : pose uniquement `display: flex` (rend un `<div>`). Direction, gap, wrap et alignement passent entièrement par `className`.
- `Grid` : pose uniquement `display: grid` (rend un `<div>`). Colonnes, gap et responsive passent entièrement par `className`.

Aucune de ces primitives n'intègre les autres automatiquement — elles se composent manuellement dans les pages/composants consommateurs. Exemple :

```tsx
<Section>
  <Container>
    <Grid className="grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3">
      {/* contenu */}
    </Grid>
  </Container>
</Section>
```

Ces primitives restent volontairement de très petites briques et ne reproduisent aucune fonctionnalité déjà couverte par les utilitaires Tailwind (`gap-*`, `grid-cols-*`, `items-*`, `justify-*`, `flex-row`/`flex-col`, etc.) : aucune prop `direction`, `gap`, `columns`, `wrap`, `align` ou `justify` n'est ajoutée sur `Stack`/`Grid`. Toute variante de ce type se règle via `className`.

### Button et Link : action vs navigation

`Button` et `Link` (`src/components/ui/`) ont des responsabilités strictement séparées, jamais mélangées :

- `Button` = **action** (soumission de formulaire, déclenchement côté client). Rend un `<button>`. Deux variantes seulement : `primary` (fond `primary`/texte `primary-foreground`) et `accent` (fond `accent`/texte `accent-foreground`). Pas de prop `size`, pas de prop `onClick`, pas de prop polymorphique, pas de slot icône dédié. `disabled` utilise l'attribut natif ; `loading` ajoute `aria-busy` et désactive le bouton. Reste un Server Component (pas de `"use client"`) : il ne porte aucune logique interactive propre. Les interactions client (gestion de `onClick`, état, etc.) sont portées par les composants clients qui utilisent `Button`, pas par `Button` lui-même.
- `Link` = **navigation**. Rend `next/link` pour les destinations internes (`href` commençant par `/` ou `#`), un `<a>` natif pour tout le reste (externe, `mailto:`, `tel:`, etc.). Pas de prop `variant`, `size`, `external` ou `openInNewTab` ; aucune apparence de bouton. N'ajoute jamais `target="_blank"` automatiquement. Si un usage futur a besoin de `target="_blank"`, une indication accessible de l'ouverture dans un nouvel onglet doit l'accompagner (non implémenté tant qu'aucun besoin réel n'existe, car l'API actuelle de `Link` ne porte pas de prop `target`).

### Form controls : Input, Select, Checkbox, Radio, FormField

`Input`, `Select`, `Checkbox`, `Radio` (`src/components/ui/`) sont de simples wrappers stylés autour de leur élément HTML natif respectif. Leur API est un **passthrough des attributs natifs** (`ComponentPropsWithoutRef<"input"|"select">` + `className`) : `value`, `defaultValue`, `onChange`, `disabled`, `name`, `placeholder`, `required`, etc. ne sont pas réinventés. Aucun état interne, aucun hook, aucun `"use client"`. `Select` reste un `<select>` natif (pas de listbox personnalisée). `Checkbox` ne supporte pas `indeterminate`. `Radio` reste un contrôle individuel ; aucun `RadioGroup`/`fieldset` n'est implémenté à ce stade.

`FormField` (`src/components/ui/FormField.tsx`) associe un label, une description optionnelle et un message d'erreur optionnel à **un** contrôle passé en `children` :

```ts
type FormFieldProps = {
  id: string; // requis, aucune génération automatique (pas de useId())
  label: string;
  description?: string;
  error?: string; // chaîne uniquement
  required?: boolean;
  children: ReactNode;
};
```

`FormField` n'injecte aucune prop dans `children` (pas de `cloneElement`) : le câblage `aria-describedby`/`aria-invalid` entre le contrôle et les ids déterministes `${id}-description`/`${id}-error` reste **explicite, à la charge du consommateur**. `required` est reflété à la fois par l'attribut natif sur le contrôle et par une indication visuelle dans `FormField`. Aucun `"use client"`, aucune validation métier, aucune gestion d'état de formulaire : ces composants restent des wrappers UI purs. La validation (Zod), les Server Actions et la soumission restent hors de ces composants.

### Alert : message persistant

`Alert` (`src/components/ui/Alert.tsx`) affiche un message persistant d'information, succès, avertissement ou erreur :

```ts
type AlertProps = ComponentPropsWithoutRef<"div"> & {
  variant?: "info" | "success" | "warning" | "error"; // défaut "info"
};
```

Fond teinté à faible opacité (`bg-{variant}/10`) + bordure gauche 4px pleine couleur du variant + texte en `foreground` — uniquement des tokens déjà définis, aucune nouvelle couleur. Pas d'icône intégrée, pas de bouton close, pas de titre séparé (un seul `children` libre). Composant présentationnel pur : aucun `"use client"`, aucun hook, aucune logique métier.

**Accessibilité : `Alert` n'impose aucun rôle ARIA.** Ni `role="alert"` ni `role="status"` ne sont appliqués automatiquement selon la variante — le passthrough des attributs natifs (`ComponentPropsWithoutRef<"div">`) permet au consommateur de poser explicitement le rôle approprié à son contexte d'usage (`role="alert"`, `role="status"`, ou aucun rôle pour un message purement visuel/persistant). Ce choix est volontaire : `Alert` ne peut pas savoir, depuis le composant lui-même, si une instance donnée est statique au chargement de la page ou injectée dynamiquement — seul le consommateur connaît ce contexte.

### Toast : notification transitoire

`Toast` (`src/components/ui/Toast.tsx`) affiche une notification transitoire, pilotée entièrement par le consommateur :

```ts
type ToastVariant = "info" | "success" | "warning" | "error";

type ToastProps = ComponentPropsWithoutRef<"div"> & {
  open: boolean;
  variant?: ToastVariant; // défaut "info"
  onClose?: () => void;
};
```

Mêmes 4 tokens de variante que `Alert` (fond teinté faible opacité + bordure gauche 4px), présentation plus compacte (padding réduit, texte `text-body-sm`). `open=false` → le composant retourne `null` : pas d'animation de sortie, pas de système de présence. **Aucune animation en V1** (ni en entrée, ni en sortie) — `globals.css` n'est pas modifié pour `Toast`.

Contrairement à `Alert` et `Button`, `Toast` porte la directive `"use client"` — exception justifiée uniquement par le bouton de fermeture qui attache un `onClick` à un élément DOM natif (nécessite l'hydratation). Aucun hook, aucun état interne, aucun timer, aucune fermeture automatique : `open`/`onClose` restent entièrement contrôlés par le consommateur. Pas de `ToastProvider`, pas de `ToastViewport`, pas de Context API, pas de store, pas de portail, aucune dépendance externe.

Le bouton de fermeture (`<button type="button">` natif, `aria-label="Fermer"`) n'est rendu que si `onClose` est fourni. Il n'est **pas** construit à partir du composant `Button` existant : `Button` ne supporte volontairement pas `onClick` (décision Phase 2), et cette décision n'est pas remise en cause pour résoudre le cas de `Toast` — `Toast` définit son propre bouton minimal, local, non réutilisable ailleurs.

**Accessibilité** : `role="status"` par défaut (destructuré avec valeur par défaut, donc surchargeable explicitement si le consommateur passe son propre `role`). Aucun `aria-live` ajouté en plus de `role="status"` (redondant, le rôle porte déjà une sémantique live implicite). Pas de focus automatique à l'apparition. **Limitation V1 assumée et documentée** : `role="status"` ne garantit pas une annonce fiable par tous les lecteurs d'écran dans tous les contextes, car cette V1 ne fournit pas de région live persistante (`ToastViewport`) — un nœud `role="status"` inséré d'un coup dans le DOM avec son contenu déjà final n'est pas toujours annoncé de façon cohérente d'un lecteur d'écran à l'autre. Résoudre ce point nécessiterait une région live persistante, explicitement hors périmètre de cette étape.

## Règles React / Next.js

- Server Components par défaut.
- `use client` uniquement si nécessaire.
- Les pages composent les composants et récupèrent les données côté serveur lorsque possible.
- Ne pas placer toute la logique métier dans les composants.

## PrestaShop adapter

```text
src/lib/prestashop/
├── client.ts
├── schemas/
├── mappers/
├── products.ts
├── categories.ts
├── cart.ts
├── customers.ts
├── orders.ts
└── carriers.ts
```

`client.ts` centralise base URL, authentification, headers, timeout, gestion d'erreurs et politique de retry.

Les schemas valident les réponses externes. Les mappers convertissent les structures externes vers les types du domaine.

## Server Actions

```text
src/actions/
├── cart.ts
└── customer.ts
```

Les mutations commerciales passent par ces actions ou une couche serveur équivalente.

## Types

Les types du domaine ne doivent pas reproduire aveuglément les objets PrestaShop.

Exemple de chaîne :

`PrestaShop response → schema → mapper → Product → component`

## Validation

Utiliser Zod aux frontières externes lorsque pertinent. Ne pas faire confiance aux données reçues du navigateur.

## Feature flags

Utiliser uniquement des flags correspondant à des fonctionnalités réellement variables : newsletter, analytics, workshops, reviews, Finder, etc.

## Erreurs

Les erreurs utilisateur doivent être compréhensibles et non techniques. Les logs peuvent contenir les détails techniques nécessaires, sans secrets ni PII inutile.

## États UI

Tout parcours interactif important prévoit :

- idle
- loading
- success
- empty lorsque pertinent
- error

## SEO

Utiliser les mécanismes Next.js de metadata, canonical, sitemap et robots. Les données structurées sont générées côté serveur et doivent correspondre au contenu visible.

## Conventions

- TypeScript strict
- `@/*` pour les imports internes
- composants en PascalCase
- fonctions/variables en camelCase
- types en PascalCase
- pas de `any` sans justification
- dépendances minimales

## Configuration

`.env.local` est ignoré. `.env.example` est versionné. Les secrets ne sont jamais commités.
