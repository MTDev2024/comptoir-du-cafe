# État actuel du projet

Dernière mise à jour : 2026-10-01.

## Phase actuelle

**Phase 2 — UI foundation : en cours.** Phase 1 validée (commit de référence `ccb1b31c5dc3a8c212cc5ed91fe41eb04ca4e8f9`). `Container`, `Section`, `Stack`, `Grid`, `Button`, `Link`, `Input`, `Select`, `Checkbox`, `Radio`, `FormField` implémentés et vérifiés ; les autres éléments de la phase (Alert/Toast/Modal/Drawer, Breadcrumbs, Skeleton/EmptyState, Header/Footer) restent à faire.

## Étapes terminées

- **Phase 0 — Documentation (partielle)** : documents de `docs/` ajoutés au dépôt applicatif, `AGENTS.md` complété avec le contexte projet. La vérification de cohérence croisée complète reste à refaire à chaque évolution documentaire.
- **Phase 1 — Fondation Next.js** :
  - Next.js 16 / React 19 / TypeScript initialisés (App Router, répertoire `src/`, alias `@/*`, mode strict)
  - ESLint (`eslint-config-next`) et Prettier (`prettier-plugin-tailwindcss`) configurés
  - Tailwind CSS v4 configuré
  - Fonts `next/font/google` : Fraunces (titres) / Inter (corps de texte)
  - Design tokens dans `src/app/globals.css` (palette, mapping sémantique, typographie, espacements, radius, motion, `prefers-reduced-motion`)
  - Layout global (`src/app/layout.tsx`) avec `lang="fr"`, fonts appliquées, metadata de base (title template, description, Open Graph, `metadataBase`)
  - Structure `src/` complète : `app/`, `actions/`, `components/`, `config/`, `lib/`, `types/`, `styles/`
  - `src/config/site.ts` créé comme source de vérité de la configuration statique du site
  - Page d'accueil minimale de validation (remplace le boilerplate Next.js par défaut)
- **Phase 2 — UI foundation (en cours)** :
  - Structure de sous-dossiers `src/components/{ui,layout,navigation,commerce,blog,workshops,finder,reviews,gallery,sections}/` créée
  - `Container` implémenté (`src/components/layout/Container.tsx`) : wrapper de layout (`<div>` simple, sans sémantique), largeur max 1440px, padding horizontal responsive (20/32/48/64px), props minimales (`children`, `className` optionnel)
  - `Section` implémenté (`src/components/layout/Section.tsx`) : rythme vertical (`<section>` sémantique), padding vertical responsive symétrique (`py-16 lg:py-24 xl:py-32` = 64/96/128px), props minimales (`children`, `className` optionnel). Indépendant de `Container` (pas de composition automatique) ; usage standard documenté dans `TECHNICAL-SPEC.md` : `<Section><Container>…</Container></Section>`
  - `Stack` implémenté (`src/components/layout/Stack.tsx`) : pose uniquement `display: flex` (`<div>`), props minimales (`children`, `className` optionnel). Direction, gap, wrap, alignement entièrement via `className`.
  - `Grid` implémenté (`src/components/layout/Grid.tsx`) : pose uniquement `display: grid` (`<div>`), props minimales (`children`, `className` optionnel). Colonnes, gap, responsive entièrement via `className`.
  - `Button` implémenté (`src/components/ui/Button.tsx`) : `<button>` natif, 2 variantes (`primary`/`accent`), pas de `size`, pas de `onClick` (reste un Server Component, les interactions client sont portées par les composants clients consommateurs), `disabled` natif, `loading` → `aria-busy` + désactivation, focus visible.
  - `Link` implémenté (`src/components/ui/Link.tsx`) : `next/link` pour les hrefs internes (`/`, `#`), `<a>` natif sinon, pas de variante, pas de `target="_blank"` automatique, pas de prop `external`/`openInNewTab`.
  - `Input`, `Select`, `Checkbox`, `Radio` implémentés (`src/components/ui/`) : wrappers stylés purs, API en passthrough des attributs natifs (`ComponentPropsWithoutRef`) + `className`, aucun état interne, aucun hook, aucun `"use client"`. `Select` = `<select>` natif. `Checkbox` sans `indeterminate`. `Radio` individuel, pas de `RadioGroup`/`fieldset`.
  - `FormField` implémenté (`src/components/ui/FormField.tsx`) : associe label/description/erreur à un contrôle passé en `children` ; `id` requis (pas de `useId()`), ids `description`/`error` dérivés déterministes (`${id}-description`, `${id}-error`), câblage `aria-describedby`/`aria-invalid` explicite côté consommateur (pas de `cloneElement`), `required` reflété par l'attribut natif + indicateur visuel.

## Vérifications effectuées

- `npm run lint` → 0 erreur
- `npm run typecheck` → 0 erreur
- `npm run build` → succès (2 routes statiques générées)
- `npm run dev` → serveur démarré, `GET /` → 200
- Diff entre `docs/` du dépôt applicatif et `docs/` du dépôt de documentation source (`comptoir-du-cafe-documentation-v1`) : contenu identique, seules des différences de formatage Prettier (tableaux Markdown reflowés, points-virgules ajoutés aux blocs TypeScript de `DATA-MODELS.md`) — aucune décision ni contenu modifié.
- Après ajout de `Container` : `npm run lint` → 0 erreur, `npm run typecheck` → 0 erreur, `npm run build` → succès.
- Après ajout de `Section` : `npm run lint` → 0 erreur, `npm run typecheck` → 0 erreur, `npm run build` → succès.
- Après ajout de `Stack` et `Grid` : `npm run lint` → 0 erreur, `npm run typecheck` → 0 erreur, `npm run build` → succès.
- Après ajout de `Button` et `Link` : `npm run lint` → 0 erreur, `npm run typecheck` → 0 erreur, `npm run build` → succès.
- Après ajout des form controls (`Input`, `Select`, `Checkbox`, `Radio`, `FormField`) : `npm run lint` → 0 erreur, `npm run typecheck` → 0 erreur, `npm run build` → succès.

## Étape en cours

Phase 2 — UI foundation : `Container`, `Section`, `Stack`, `Grid`, `Button`, `Link`, `Input`, `Select`, `Checkbox`, `Radio`, `FormField` livrés. Prochain élément non commencé : `Alert / Toast / Modal / Drawer`.

## Prochaine étape

`Alert / Toast / Modal / Drawer` (élément suivant de la Phase 2 dans [`IMPLEMENTATION-ROADMAP.md`](./IMPLEMENTATION-ROADMAP.md)), à ne démarrer qu'après validation explicite.

## Décisions importantes prises

- Utilisation de `create-next-app` avec Turbopack (comportement par défaut de Next.js 16), App Router, TypeScript strict, Tailwind v4, répertoire `src/`, alias d'import `@/*`.
- Design tokens implémentés via `@theme inline` de Tailwind v4 dans `globals.css`, avec séparation entre variables de palette brute (`--palette-*`) et variables sémantiques (`--background`, `--foreground`, `--primary`, etc.), afin d'éviter toute collision de nommage avec les tokens `--color-*` générés par Tailwind.
- `src/config/site.ts` créé comme unique source de vérité pour la configuration statique du site, conformément à `ARCHITECTURE.md`.
- Les SVG placeholders par défaut de `create-next-app` (logos Vercel/Next.js) ont été supprimés de `public/`, n'ayant aucun rapport avec le projet.
- Règle Git validée : aucune mention d'outil/assistant IA dans les messages de commit (y compris `Co-Authored-By`), aucun committer/auteur autre que le porteur du projet. Documentée dans `AGENTS.md` et `DEPLOYMENT.md`.
- Organisation de `src/components/` validée en sous-dossiers par domaine (`ui/`, `layout/`, `navigation/`, `commerce/`, `blog/`, `workshops/`, `finder/`, `reviews/`, `gallery/`, `sections/`), documentée dans `TECHNICAL-SPEC.md`.
- `Container` : API minimale (`children`, `className` optionnel), pas de prop `size`/`as`. Rend un `<div>` simple, sans responsabilité sémantique — la sémantique est portée par les composants qui l'utilisent (notamment `Section`).
- `Section` : API minimale identique à `Container` (`children`, `className` optionnel), pas de prop `background`/`variant`/`as`. Rend un `<section>`. Reste volontairement indépendante de `Container` (pas d'intégration automatique) : la composition `<Section><Container>…</Container></Section>` est laissée à la charge des pages/sections consommatrices. Padding vertical mappé sur 3 paliers Tailwind (`base`, `lg`, `xl`) pour les 3 valeurs documentées (64/96/128px), au lieu des 4 paliers utilisés pour le padding horizontal de `Container`.
- `Stack`/`Grid` : API strictement minimale (`children`, `className` optionnel) — Option A retenue explicitement pour éviter toute duplication des utilitaires Tailwind (`gap-*`, `grid-cols-*`, `flex-row`/`flex-col`, `items-*`, `justify-*`). Aucune prop `direction`, `gap`, `columns`, `wrap`, `align` ou `justify`, aucun gap par défaut, aucune logique responsive intégrée. `Grid` reste une brique générique : la logique de colonnes spécifique aux grilles de produits/articles est déléguée aux futurs composants métier (`ProductGrid` en Phase 4), pas à cette primitive.
- `Button` = action, `Link` = navigation : responsabilités strictement séparées, jamais mélangées. `Button` : 2 variantes uniquement (`primary`/`accent`, dérivées des tokens sémantiques existants), pas de `size`, pas de prop `onClick` (laissée aux composants clients consommateurs), pas de prop polymorphique, pas de slot icône. `Button` reste un Server Component (pas de `"use client"`) car il ne porte aucune logique interactive propre. `Link` : pas de variante/size/`external`/`openInNewTab`, détection interne/externe par simple préfixe du `href` (`/` ou `#` → `next/link`, sinon `<a>` natif), jamais de `target="_blank"` automatique — si un futur besoin l'introduit explicitement, une indication accessible d'ouverture dans un nouvel onglet devra l'accompagner.
- Form controls (`Input`/`Select`/`Checkbox`/`Radio`) : API en passthrough intégral des attributs natifs, aucune réinvention de `value`/`defaultValue`/`onChange`/`disabled`/`name`/`placeholder`. Aucun état interne, aucun hook, aucun `"use client"` — cohérent avec `Button`. `Select` reste natif (pas de listbox custom), `Checkbox` sans `indeterminate`, `Radio` sans `RadioGroup`/`fieldset` — ces besoins seront traités seulement si un cas réel apparaît (pas anticipés).
- `FormField` : `id` requis, pas de génération automatique via `useId()` (garde `FormField` en Server Component). Pas d'injection automatique de props dans `children` (pas de `cloneElement`) — câblage `aria-describedby`/`aria-invalid` explicite côté consommateur, cohérent avec l'absence de composition automatique déjà actée pour les primitives de layout. `error` reste une chaîne de caractères. Aucune validation métier, aucune gestion d'état de formulaire dans ce composant.
- Les fichiers `AGENTS.md` et `CLAUDE.md` générés automatiquement par `next dev` sont conservés : le bloc `<!-- BEGIN:nextjs-agent-rules -->` de `AGENTS.md` est régénéré par Next.js et ne doit pas être considéré comme de la documentation projet ; le contexte projet a été ajouté au-dessus de ce bloc.
- L'ensemble des documents `docs/` (y compris ceux non explicitement modifiés en Phase 1, comme `DATA-MODELS.md`, `DEPLOYMENT.md`, `INTEGRATIONS.md`, `ROUTES.md`, `TESTING.md`, `UI-DESIGN-SYSTEM.md`) a été copié tel quel depuis le dépôt de documentation source, sans modification de fond, pour que le dépôt applicatif soit autoporteur.

## Points restant à valider

- Processus de synchronisation entre ce dépôt et le dépôt de documentation source (`comptoir-du-cafe-documentation-v1`) : à ce stade, les fichiers ont été copiés manuellement ; aucun mécanisme de synchronisation automatique n'existe.
- Contenu du `README.md` et du bloc de contexte ajouté à `AGENTS.md` : à relire pour confirmer qu'ils reflètent bien la façon dont l'équipe souhaite présenter le projet publiquement.
- Informations non encore définies dans la documentation source, à traiter lors des phases correspondantes plutôt qu'inventées maintenant (détaillées dans [`LOCAL-DEVELOPMENT.md`](./LOCAL-DEVELOPMENT.md)) :
  - configuration Docker concrète de PrestaShop local (image, version, volumes, ports) — Phase 3
  - URL du back-office PrestaShop local et gestion des identifiants — Phase 3
  - procédure exacte d'activation du Webservice PrestaShop et permissions par ressource — Phase 3
  - noms exacts des variables d'environnement (PrestaShop, Stripe, Resend, Brevo, webhooks Decap/Cal.com) — Phases 3, 6, 8, 9, 11
  - nécessité, nom et structure du futur module PrestaShop personnalisé — à confirmer en Phase 3
  - configuration précise du module de paiement Stripe test côté PrestaShop — Phase 6
  - configuration du transporteur Click & Collect dans PrestaShop — Phase 6

## Blocages

Aucun blocage identifié à ce stade.

## État de l'environnement local

- Node.js : 22.22.2
- npm : 11.12.0
- Next.js : 16.3.8 (Turbopack)
- React : 19.2.8
- Commandes vérifiées avec succès : `npm run lint`, `npm run typecheck`, `npm run build`, `npm run dev` (réponse HTTP 200 sur `/`).
- Aucune variable d'environnement requise à ce stade (aucune intégration externe branchée). Voir [`LOCAL-DEVELOPMENT.md`](./LOCAL-DEVELOPMENT.md).

## Écarts entre documentation et code actuel

Aucun écart de fond identifié : rien dans le code de la Phase 1 ne contredit une décision documentée. Les lignes ci-dessous listent les domaines documentés mais pas encore implémentés — normal à ce stade, chacun étant rattaché à une phase ultérieure de [`IMPLEMENTATION-ROADMAP.md`](./IMPLEMENTATION-ROADMAP.md).

| Domaine documenté                                                                       | État d'implémentation                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| --------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Structure `src/` ([`TECHNICAL-SPEC.md`](./TECHNICAL-SPEC.md))                           | Squelette créé (`app`, `actions`, `components`, `config`, `lib`, `types`, `styles`) ; `components/` sous-structuré en `ui/`, `layout/`, `navigation/`, `commerce/`, `blog/`, `workshops/`, `finder/`, `reviews/`, `gallery/`, `sections/` ; `layout/` contient `Container.tsx`, `Section.tsx`, `Stack.tsx`, `Grid.tsx` ; `ui/` contient `Button.tsx`, `Link.tsx`, `Input.tsx`, `Select.tsx`, `Checkbox.tsx`, `Radio.tsx`, `FormField.tsx` ; les autres sous-dossiers et `actions/`, `lib/`, `types/`, `styles/` restent vides |
| Design tokens / fonts ([`UI-DESIGN-SYSTEM.md`](./UI-DESIGN-SYSTEM.md))                  | Palette, sémantique, typographie, espacements, radius et motion traduits en tokens CSS/Tailwind ; fonts Fraunces/Inter branchées                                                                                                                                                                                                                                                                                                                                                                                              |
| Configuration statique (`src/config/site.ts`) ([`ARCHITECTURE.md`](./ARCHITECTURE.md))  | Créé avec les champs de base (name, description, locale, url)                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| Composants UI de base ([`UI-DESIGN-SYSTEM.md`](./UI-DESIGN-SYSTEM.md), Phase 2)         | `Container`, `Section`, `Stack`, `Grid`, `Button`, `Link`, `Input`, `Select`, `Checkbox`, `Radio`, `FormField` implémentés ; Alert/Toast/Modal/Drawer, Breadcrumbs, Skeleton/EmptyState, Header/Footer non implémentés — Phase 2 en cours                                                                                                                                                                                                                                                                                     |
| PrestaShop adapter (`src/lib/prestashop/`) ([`TECHNICAL-SPEC.md`](./TECHNICAL-SPEC.md)) | Non implémenté — prévu en Phase 3                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| Server Actions (`src/actions/cart.ts`, `customer.ts`)                                   | Non implémentées — dossier `actions/` vide, prévu en Phase 5/6                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| Pages catalogue, panier, checkout, blog, ateliers, Finder                               | Non implémentées — prévues à partir de la Phase 4                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| Tests (unitaires, composants, intégration, Playwright) ([`TESTING.md`](./TESTING.md))   | Non implémentés — prévus en Phase 12                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
