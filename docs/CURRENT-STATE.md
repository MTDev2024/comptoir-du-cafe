# État actuel du projet

Dernière mise à jour : 2026-10-02.

## Phase actuelle

**Phase 2 — UI foundation : terminée.** Phase 1 validée (commit de référence `ccb1b31c5dc3a8c212cc5ed91fe41eb04ca4e8f9`). Tous les éléments de la Phase 2 sont implémentés et vérifiés : `Container`, `Section`, `Stack`, `Grid`, `Button`, `Link`, `Input`, `Select`, `Checkbox`, `Radio`, `FormField`, `Alert`, `Toast`, `Modal`, `Drawer`, `Breadcrumbs`, `Skeleton`, `EmptyState`, `Header`, `Footer`. Critère d'acceptation ("système UI cohérent et accessible") satisfait. **Prochaine phase : Phase 3 — PrestaShop integration** (non démarrée).

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
- **Phase 2 — UI foundation (terminée)** :
  - Structure de sous-dossiers `src/components/{ui,layout,navigation,commerce,blog,workshops,finder,reviews,gallery,sections}/` créée
  - `Container` implémenté (`src/components/layout/Container.tsx`) : wrapper de layout (`<div>` simple, sans sémantique), largeur max 1440px, padding horizontal responsive (20/32/48/64px), props minimales (`children`, `className` optionnel)
  - `Section` implémenté (`src/components/layout/Section.tsx`) : rythme vertical (`<section>` sémantique), padding vertical responsive symétrique (`py-16 lg:py-24 xl:py-32` = 64/96/128px), props minimales (`children`, `className` optionnel). Indépendant de `Container` (pas de composition automatique) ; usage standard documenté dans `TECHNICAL-SPEC.md` : `<Section><Container>…</Container></Section>`
  - `Stack` implémenté (`src/components/layout/Stack.tsx`) : pose uniquement `display: flex` (`<div>`), props minimales (`children`, `className` optionnel). Direction, gap, wrap, alignement entièrement via `className`.
  - `Grid` implémenté (`src/components/layout/Grid.tsx`) : pose uniquement `display: grid` (`<div>`), props minimales (`children`, `className` optionnel). Colonnes, gap, responsive entièrement via `className`.
  - `Button` implémenté (`src/components/ui/Button.tsx`) : `<button>` natif, 2 variantes (`primary`/`accent`), pas de `size`, pas de `onClick` (reste un Server Component, les interactions client sont portées par les composants clients consommateurs), `disabled` natif, `loading` → `aria-busy` + désactivation, focus visible.
  - `Link` implémenté (`src/components/ui/Link.tsx`) : `next/link` pour les hrefs internes (`/`, `#`), `<a>` natif sinon, pas de variante, pas de `target="_blank"` automatique, pas de prop `external`/`openInNewTab`.
  - `Input`, `Select`, `Checkbox`, `Radio` implémentés (`src/components/ui/`) : wrappers stylés purs, API en passthrough des attributs natifs (`ComponentPropsWithoutRef`) + `className`, aucun état interne, aucun hook, aucun `"use client"`. `Select` = `<select>` natif. `Checkbox` sans `indeterminate`. `Radio` individuel, pas de `RadioGroup`/`fieldset`.
  - `FormField` implémenté (`src/components/ui/FormField.tsx`) : associe label/description/erreur à un contrôle passé en `children` ; `id` requis (pas de `useId()`), ids `description`/`error` dérivés déterministes (`${id}-description`, `${id}-error`), câblage `aria-describedby`/`aria-invalid` explicite côté consommateur (pas de `cloneElement`), `required` reflété par l'attribut natif + indicateur visuel.
  - `Alert` implémenté (`src/components/ui/Alert.tsx`) : message persistant, 4 variantes (`info`/`success`/`warning`/`error`, défaut `info`), fond teinté faible opacité + bordure gauche 4px + texte `foreground` (tokens existants uniquement, aucune nouvelle couleur), pas d'icône/close/titre séparé. Composant présentationnel pur, passthrough `ComponentPropsWithoutRef<"div">`. **N'impose aucun rôle ARIA** (ni `role="alert"` ni `role="status"` automatique selon la variante) : le rôle est laissé au consommateur via le passthrough natif.
  - `Toast` implémenté (`src/components/ui/Toast.tsx`) : notification transitoire contrôlée (`open`/`onClose`), mêmes 4 variantes que `Alert`, présentation plus compacte. `"use client"` — exception justifiée uniquement par le bouton de fermeture (`onClick`), aucun hook/état interne/timer. `open=false` → `null`. Aucune animation en V1, `globals.css` non modifié. `role="status"` par défaut (surchargeable via passthrough), bouton de fermeture natif conditionnel (`aria-label="Fermer"`), pas de focus automatique.
  - `Modal` implémenté (`src/components/ui/Modal.tsx`) : basé sur l'élément HTML natif `<dialog>` + `.showModal()`/`.close()` — focus trap, focus initial et restauration du focus **natifs**, aucun focus trap fait maison, aucune dépendance de focus management, aucun `createPortal`. `"use client"` avec `useRef`/`useEffect`/`useId` uniquement. Scroll lock inclus (verrouillage + compensation scrollbar, valeurs inline restaurées exactement). `heading` optionnel (remplace `title` pour éviter la collision avec l'attribut HTML natif), `aria-labelledby` généré seulement si `heading` est fourni. Aucune animation en V1.
  - `Drawer` implémenté (`src/components/ui/Drawer.tsx`) : même architecture que `Modal` (`<dialog>` natif, focus/scroll lock/fermeture natifs ou locaux, `heading` conditionnel), pour un panneau positionné sur un bord plutôt qu'une boîte centrée. Seule prop ajoutée : `side?: "left" | "right"` (défaut `"right"`). Pas de prop `width` — largeur par défaut (pleine largeur mobile, plafonnée desktop) surchargeable via `className`. Scroll lock dupliqué localement (pas d'extraction de `useScrollLock` partagé avec `Modal`). Aucune animation en V1. Aucune abstraction commune créée avec `Modal` ; `Modal.tsx` non modifié.
  - `Breadcrumbs` implémenté (`src/components/navigation/Breadcrumbs.tsx`) : `<nav aria-label="Fil d'Ariane">` + `<ol>`, dernier élément toujours rendu en `<span aria-current="page">` (par position, `href` ignoré s'il est fourni), séparateur dédié `aria-hidden="true"` (pas de pseudo-élément CSS), scroll horizontal responsive (`overflow-x-auto`, pas de troncature/JS), réutilise `Link` avec focus visible explicite sur chaque instance. Aucun JSON-LD dans le composant (traité séparément par la couche SEO, plus tard). Server Component.
  - `Skeleton` implémenté (`src/components/ui/Skeleton.tsx`) : `ComponentPropsWithoutRef<"div">`, `aria-hidden="true"` par défaut, `animate-pulse` par défaut (classe Tailwind native, aucune keyframe/dépendance), aucune prop de variante/dimension/forme (forme via `className`), Server Component.
  - `EmptyState` implémenté (`src/components/ui/EmptyState.tsx`) : `title` requis rendu via un véritable élément de heading dynamique (`headingLevel?: "h2"|"h3"|"h4"`, défaut `"h2"`), `description?`, `action?: ReactNode` (slot de composition plutôt que configuration `{label, href}`), pas de prop `icon`/`children` libre, aucune variante, Server Component.
  - `Header`/`Footer` implémentés (`src/components/navigation/`) : voir section dédiée ci-dessous.

### Header / Footer — détail

- **Navigation statique** : `src/config/navigation.ts` — source unique de vérité pour Header desktop, menu mobile et Footer. `mainNav` (5 entrées : Cafés, Machines & matériel, Sets & coffrets, Ateliers, La Maison — Cafés et Machines & matériel avec sous-catégories pour les mega menus), `secondaryNavItem` (Blog, traitement éditorial secondaire), `footerShopNav`/`footerDiscoverNav` (regroupement dédié aux colonnes du Footer, distinct de `mainNav`).
- **`site.ts`** étendu avec `contact?`/`social?` optionnels (aucune valeur par défaut, aucune donnée inventée) — le Footer n'affiche que ce qui est réellement configuré.
- **Mega menus** : `<details name="main-nav">` natif pour Cafés et Machines & matériel (groupement natif, fermeture automatique mutuelle), Sets & coffrets reste un lien simple (aucune route `[slug]` documentée pour ses sous-items dans `ROUTES.md`, contrairement à Cafés/Machines & matériel). Pas de fermeture JS au clic extérieur/Escape en V1 (limite native assumée).
- **`HeaderShell.tsx`** (client) : seul îlot gérant le scroll (`transparentUntilScroll` prop, seuil de scroll simple, pas de couplage à un composant Hero). Contrôle aussi la hauteur du Header (88px par défaut / 72px en mode compact scrollé) via le même état `isScrolled`.
- **`MobileNav.tsx`** (client) : bouton hamburger natif (pas construit à partir de `Button`, qui ne supporte pas `onClick`) + `Drawer` existant (`side="left"`), fermeture par délégation de clic sur le `<nav>` englobant (`Link` ne supporte pas `onClick`, décision non remise en cause). Rend `mainNav` + `secondaryNavItem`.
- **Actions Header** : Recherche/Compte/Panier en icônes SVG inline (dessinées à la main, aucune dépendance), nom accessible via `<span className="sr-only">` à l'intérieur de chaque `Link` (pas d'`aria-label` sur `Link`, qui ne le supporte pas). Pas de badge panier (aucune donnée PrestaShop réelle à ce stade).
- **Logo** : wordmark texte deux lignes ("Le Comptoir" / "du Café"), interimaire assumé — un asset logo réel est anticipé par `ARCHITECTURE.md` (`public/`) mais n'existe pas encore.
- **Footer** : structure en 4 colonnes via le primitif `Grid` existant — Marque (nom + description) / Boutique / Découvrir / Contact-réseaux sociaux (conditionnel). Empilement mobile natif (`grid-cols-1` → `sm:grid-cols-2` → `lg:grid-cols-4`). Aucun lien légal créé (routes documentées dans `ROUTES.md` mais pages non créées), aucune newsletter (Phase 11).
- **Correction post-revue** : "Trouver mon café" retiré du Header et du menu mobile, et `finderNavItem` supprimé de `navigation.ts` — ce n'est pas une entrée de navigation persistante mais un CTA du Hero / une fonctionnalité du Finder (`ROUTES.md` : section homepage dédiée juste après le Hero), qui sera traité au moment de l'implémentation du Hero (Phase 7) ou du Finder (Phase 10). Aucune référence résiduelle au Finder dans le Header/Footer actuels.

## Vérifications effectuées

- `npm run lint` → 0 erreur
- `npm run typecheck` → 0 erreur
- `npm run build` → succès
- `npm run dev` → serveur démarré, `GET /` → 200
- Diff entre `docs/` du dépôt applicatif et `docs/` du dépôt de documentation source (`comptoir-du-cafe-documentation-v1`) : contenu identique, seules des différences de formatage Prettier — aucune décision ni contenu modifié.
- Après ajout de `Container` : lint/typecheck/build → succès.
- Après ajout de `Section` : lint/typecheck/build → succès.
- Après ajout de `Stack` et `Grid` : lint/typecheck/build → succès.
- Après ajout de `Button` et `Link` : lint/typecheck/build → succès.
- Après ajout des form controls (`Input`, `Select`, `Checkbox`, `Radio`, `FormField`) : lint/typecheck/build → succès.
- Après ajout d'`Alert` : lint/typecheck/build → succès.
- Après ajout de `Toast` : lint/typecheck/build → succès.
- Après ajout de `Modal` : lint/typecheck/build → succès.
- Après ajout de `Drawer` : lint/typecheck/build → succès.
- Après ajout de `Breadcrumbs` : lint/typecheck → succès.
- Après ajout de `Skeleton`/`EmptyState` : lint/typecheck → succès.
- Après ajout de `Header`/`Footer` (câblage réel dans `layout.tsx`) : lint/typecheck/build → succès, rendu vérifié en navigateur (`npm run dev`).
- Après correction du Finder (retrait de `finderNavItem` et de ses usages) : lint/typecheck/build → succès.

## Étape en cours

Aucune — Phase 2 terminée et vérifiée.

## Prochaine étape

**Phase 3 — PrestaShop integration** : client API, validation d'environnement, schemas, mappers, produits, catégories, gestion erreurs/timeouts. Critère : données PrestaShop utilisables par les Server Components. À ne démarrer qu'après validation explicite.

## Décisions importantes prises

- Utilisation de `create-next-app` avec Turbopack (comportement par défaut de Next.js 16), App Router, TypeScript strict, Tailwind v4, répertoire `src/`, alias d'import `@/*`.
- Design tokens implémentés via `@theme inline` de Tailwind v4 dans `globals.css`, avec séparation entre variables de palette brute (`--palette-*`) et variables sémantiques (`--background`, `--foreground`, `--primary`, etc.), afin d'éviter toute collision de nommage avec les tokens `--color-*` générés par Tailwind.
- `src/config/site.ts` créé comme unique source de vérité pour la configuration statique du site, conformément à `ARCHITECTURE.md`. Étendu en Phase 2 avec `contact?`/`social?` optionnels.
- Les SVG placeholders par défaut de `create-next-app` (logos Vercel/Next.js) ont été supprimés de `public/`, n'ayant aucun rapport avec le projet.
- Règle Git validée : aucune mention d'outil/assistant IA dans les messages de commit (y compris `Co-Authored-By`), aucun committer/auteur autre que le porteur du projet. Documentée dans `AGENTS.md` et `DEPLOYMENT.md`.
- Organisation de `src/components/` validée en sous-dossiers par domaine (`ui/`, `layout/`, `navigation/`, `commerce/`, `blog/`, `workshops/`, `finder/`, `reviews/`, `gallery/`, `sections/`), documentée dans `TECHNICAL-SPEC.md`.
- `Container` : API minimale (`children`, `className` optionnel), pas de prop `size`/`as`. Rend un `<div>` simple, sans responsabilité sémantique.
- `Section` : API minimale identique à `Container`, pas de prop `background`/`variant`/`as`. Rend un `<section>`. Reste volontairement indépendante de `Container` (pas d'intégration automatique).
- `Stack`/`Grid` : API strictement minimale (`children`, `className` optionnel) — aucune duplication des utilitaires Tailwind. `Grid` reste une brique générique : la logique de colonnes spécifique (ex. `ProductGrid`) est déléguée aux futurs composants métier.
- `Button` = action, `Link` = navigation : responsabilités strictement séparées. `Button` reste un Server Component (pas de `"use client"`) car il ne porte aucune logique interactive propre. `Link` : détection interne/externe par simple préfixe du `href`, jamais de `target="_blank"` automatique.
- Form controls (`Input`/`Select`/`Checkbox`/`Radio`) : API en passthrough intégral des attributs natifs. `Select` natif, `Checkbox` sans `indeterminate`, `Radio` sans `RadioGroup`/`fieldset`.
- `FormField` : `id` requis, pas de `useId()` (Server Component). Pas d'injection automatique de props dans `children`.
- `Alert` : 4 variantes sur tokens existants, aucun rôle ARIA imposé automatiquement.
- `Toast` : `"use client"` justifié uniquement par le bouton de fermeture. `role="status"` par défaut, surchargeable. Limitation V1 assumée sur la fiabilité d'annonce (pas de région live persistante).
- `Modal` : `<dialog>` natif + `.showModal()`/`.close()` plutôt qu'un `<div>` + ARIA manuel — focus trap/initial/restauration natifs, aucun `createPortal`. `Omit<ComponentPropsWithoutRef<"dialog">, "open"|"onClose">`, `heading` au lieu de `title`.
- `Drawer` : réutilise la même architecture que `Modal`, sans abstraction partagée (`BaseDialog`/`useScrollLock`) — deux consommateurs seulement, couplage non justifié. Seule prop ajoutée : `side`.
- `Breadcrumbs` : dernier élément toujours `aria-current="page"` par position, séparateur dédié `aria-hidden`, scroll horizontal plutôt que troncature, JSON-LD délibérément hors du composant.
- `Skeleton`/`EmptyState` : aucune prop de variante/icône sans besoin concret identifié ; `animate-pulse` natif Tailwind accepté car sans coût (pas de système de présence requis, contrairement aux décisions "pas d'animation" de `Toast`/`Modal`/`Drawer`).
- `Header`/`Footer` : navigation statique centralisée dans `navigation.ts` ; mega menus natifs `<details>` pour Cafés/Machines & matériel uniquement (Sets & coffrets = lien simple, incohérence de `ROUTES.md` signalée plutôt que résolue unilatéralement) ; Recherche/Compte/Panier en icônes SVG inline accessibles via texte `sr-only` ; Header avec hauteur contrôlée (88px/72px) via le même îlot client que le scroll ; Footer en 4 colonnes éditoriales ; **"Trouver mon café" explicitement exclu du Header/Footer** — c'est un CTA du Hero/Finder, pas un élément de navigation persistante, traité au moment de l'implémentation du Hero ou du Finder.
- Les fichiers `AGENTS.md` et `CLAUDE.md` générés automatiquement par `next dev` sont conservés : le bloc `<!-- BEGIN:nextjs-agent-rules -->` de `AGENTS.md` est régénéré par Next.js et ne doit pas être considéré comme de la documentation projet.
- L'ensemble des documents `docs/` a été copié tel quel depuis le dépôt de documentation source, sans modification de fond, pour que le dépôt applicatif soit autoporteur.

## Points restant à valider

- Processus de synchronisation entre ce dépôt et le dépôt de documentation source (`comptoir-du-cafe-documentation-v1`) : fichiers copiés manuellement, aucun mécanisme automatique.
- Contenu du `README.md` et du bloc de contexte ajouté à `AGENTS.md` : à relire pour confirmer la présentation publique souhaitée.
- Incohérence `ROUTES.md` signalée : "Sets & coffrets" apparaît avec 5 sous-items dans l'arbre de navigation, mais aucune route dynamique (`[slug]`) n'est déclarée pour ce groupe dans le tableau des routes principales, contrairement à Cafés/Machines & matériel. Traité en V1 comme lien simple sans mega menu ; à clarifier si une vraie hiérarchie de routes est prévue pour ce groupe.
- Informations non encore définies, à traiter lors des phases correspondantes :
  - configuration Docker concrète de PrestaShop local (image, version, volumes, ports) — Phase 3
  - URL du back-office PrestaShop local et gestion des identifiants — Phase 3
  - procédure exacte d'activation du Webservice PrestaShop et permissions par ressource — Phase 3
  - noms exacts des variables d'environnement (PrestaShop, Stripe, Resend, Brevo, webhooks Decap/Cal.com) — Phases 3, 6, 8, 9, 11
  - nécessité, nom et structure du futur module PrestaShop personnalisé — à confirmer en Phase 3
  - configuration précise du module de paiement Stripe test côté PrestaShop — Phase 6
  - configuration du transporteur Click & Collect dans PrestaShop — Phase 6
  - coordonnées de contact et réseaux sociaux réels (`site.ts` prêt à les recevoir, valeurs non fournies)
  - routes légales (`/mentions-legales`, `/politique-confidentialite`, `/cgv`, `/politique-cookies`) documentées dans `ROUTES.md` mais pages non créées — Footer n'y renvoie aucun lien en attendant

## Blocages

Aucun blocage identifié à ce stade.

## État de l'environnement local

- Node.js : 22.22.2
- npm : 11.12.0
- Next.js : 16.3.8 (Turbopack)
- React : 19.2.8
- Commandes vérifiées avec succès : `npm run lint`, `npm run typecheck`, `npm run build`, `npm run dev` (réponse HTTP 200 sur `/`, Header/Footer confirmés dans le rendu).
- Aucune variable d'environnement requise à ce stade (aucune intégration externe branchée). Voir [`LOCAL-DEVELOPMENT.md`](./LOCAL-DEVELOPMENT.md).

## Écarts entre documentation et code actuel

Aucun écart de fond identifié une fois la correction du Finder appliquée. Les lignes ci-dessous listent les domaines documentés mais pas encore implémentés au-delà de la Phase 2 — normal, chacun rattaché à une phase ultérieure de [`IMPLEMENTATION-ROADMAP.md`](./IMPLEMENTATION-ROADMAP.md).

| Domaine documenté                                                                       | État d'implémentation                                                                                                                                                                                                                                                                                                                                                                                                                 |
| --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Structure `src/` ([`TECHNICAL-SPEC.md`](./TECHNICAL-SPEC.md))                           | Squelette complet ; `components/ui/` : Button, Link, Input, Select, Checkbox, Radio, FormField, Alert, Toast, Modal, Drawer, Skeleton, EmptyState ; `components/layout/` : Container, Section, Stack, Grid ; `components/navigation/` : Breadcrumbs, Header, HeaderShell, MobileNav, Footer ; `config/` : site.ts, navigation.ts ; `actions/`, `lib/`, `types/`, `styles/` et les autres sous-dossiers de `components/` restent vides |
| Design tokens / fonts ([`UI-DESIGN-SYSTEM.md`](./UI-DESIGN-SYSTEM.md))                  | Palette, sémantique, typographie, espacements, radius et motion traduits en tokens CSS/Tailwind ; fonts Fraunces/Inter branchées                                                                                                                                                                                                                                                                                                      |
| Configuration statique (`src/config/`) ([`ARCHITECTURE.md`](./ARCHITECTURE.md))         | `site.ts` (name, description, locale, url, contact?, social?) et `navigation.ts` (mainNav, secondaryNavItem, footerShopNav, footerDiscoverNav)                                                                                                                                                                                                                                                                                        |
| Composants UI de base ([`UI-DESIGN-SYSTEM.md`](./UI-DESIGN-SYSTEM.md), Phase 2)         | Tous implémentés — Phase 2 terminée                                                                                                                                                                                                                                                                                                                                                                                                   |
| Header / Footer réels dans l'application                                                | Câblés dans `src/app/layout.tsx`, visibles sur toutes les pages                                                                                                                                                                                                                                                                                                                                                                       |
| PrestaShop adapter (`src/lib/prestashop/`) ([`TECHNICAL-SPEC.md`](./TECHNICAL-SPEC.md)) | Non implémenté — prévu en Phase 3                                                                                                                                                                                                                                                                                                                                                                                                     |
| Server Actions (`src/actions/cart.ts`, `customer.ts`)                                   | Non implémentées — dossier `actions/` vide, prévu en Phase 5/6                                                                                                                                                                                                                                                                                                                                                                        |
| Pages catalogue, panier, checkout, blog, ateliers, Finder, Hero                         | Non implémentées — prévues à partir de la Phase 4 (catalogue) et Phase 7 (Hero/pages éditoriales)                                                                                                                                                                                                                                                                                                                                     |
| Tests (unitaires, composants, intégration, Playwright) ([`TESTING.md`](./TESTING.md))   | Non implémentés — prévus en Phase 12                                                                                                                                                                                                                                                                                                                                                                                                  |
