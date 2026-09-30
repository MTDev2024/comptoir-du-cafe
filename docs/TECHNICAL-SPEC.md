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

### Primitives de layout : Container et Section

`Container` et `Section` (`src/components/layout/`) sont deux primitives indépendantes avec des responsabilités distinctes :

- `Container` : largeur max et padding horizontal. Ne porte aucune sémantique (rend un `<div>`).
- `Section` : rythme vertical entre blocs de page et sémantique (rend un `<section>`). Ne gère pas la largeur/le padding horizontal.

`Section` n'intègre pas `Container` automatiquement. La composition standard pour un bloc de page est :

```tsx
<Section>
  <Container>{/* contenu */}</Container>
</Section>
```

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
