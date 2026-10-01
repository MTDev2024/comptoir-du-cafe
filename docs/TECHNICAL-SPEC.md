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
