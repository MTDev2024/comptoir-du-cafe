# État actuel du projet

Dernière mise à jour : 2026-10-01.

## Phase actuelle

**Phase 1 — Fondation Next.js : validée.** Le dépôt applicatif intègre désormais l'ensemble de la documentation projet (`AGENTS.md`, `README.md`, `docs/`) comme source de vérité, afin que le développement puisse reprendre dans une nouvelle conversation sans perte de contexte. La Phase 2 n'a pas démarré.

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

## Vérifications effectuées

- `npm run lint` → 0 erreur
- `npm run typecheck` → 0 erreur
- `npm run build` → succès (2 routes statiques générées)
- `npm run dev` → serveur démarré, `GET /` → 200
- Diff entre `docs/` du dépôt applicatif et `docs/` du dépôt de documentation source (`comptoir-du-cafe-documentation-v1`) : contenu identique, seules des différences de formatage Prettier (tableaux Markdown reflowés, points-virgules ajoutés aux blocs TypeScript de `DATA-MODELS.md`) — aucune décision ni contenu modifié.

## Étape en cours

Aucune — Phase 1 validée, documentation intégrée. En attente de retour avant de démarrer la Phase 2.

## Prochaine étape

**Phase 2 — UI foundation** (Container, Section, Stack/Grid, Button/Link, form controls, Alert/Toast/Modal/Drawer, Breadcrumbs, Skeleton/EmptyState, Header/Footer), à ne démarrer qu'après validation explicite, conformément à la règle de progression de [`IMPLEMENTATION-ROADMAP.md`](./IMPLEMENTATION-ROADMAP.md).

## Décisions importantes prises

- Utilisation de `create-next-app` avec Turbopack (comportement par défaut de Next.js 16), App Router, TypeScript strict, Tailwind v4, répertoire `src/`, alias d'import `@/*`.
- Design tokens implémentés via `@theme inline` de Tailwind v4 dans `globals.css`, avec séparation entre variables de palette brute (`--palette-*`) et variables sémantiques (`--background`, `--foreground`, `--primary`, etc.), afin d'éviter toute collision de nommage avec les tokens `--color-*` générés par Tailwind.
- `src/config/site.ts` créé comme unique source de vérité pour la configuration statique du site, conformément à `ARCHITECTURE.md`.
- Les SVG placeholders par défaut de `create-next-app` (logos Vercel/Next.js) ont été supprimés de `public/`, n'ayant aucun rapport avec le projet.
- Règle Git validée : aucune mention d'outil/assistant IA dans les messages de commit (y compris `Co-Authored-By`), aucun committer/auteur autre que le porteur du projet. Documentée dans `AGENTS.md` et `DEPLOYMENT.md`.
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

| Domaine documenté                                                                       | État d'implémentation                                                                                                            |
| --------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Structure `src/` ([`TECHNICAL-SPEC.md`](./TECHNICAL-SPEC.md))                           | Squelette créé (`app`, `actions`, `components`, `config`, `lib`, `types`, `styles`), dossiers vides hors `app/` et `config/`     |
| Design tokens / fonts ([`UI-DESIGN-SYSTEM.md`](./UI-DESIGN-SYSTEM.md))                  | Palette, sémantique, typographie, espacements, radius et motion traduits en tokens CSS/Tailwind ; fonts Fraunces/Inter branchées |
| Configuration statique (`src/config/site.ts`) ([`ARCHITECTURE.md`](./ARCHITECTURE.md))  | Créé avec les champs de base (name, description, locale, url)                                                                    |
| Composants UI de base ([`UI-DESIGN-SYSTEM.md`](./UI-DESIGN-SYSTEM.md), Phase 2)         | Non implémentés — prévu en Phase 2                                                                                               |
| PrestaShop adapter (`src/lib/prestashop/`) ([`TECHNICAL-SPEC.md`](./TECHNICAL-SPEC.md)) | Non implémenté — prévu en Phase 3                                                                                                |
| Server Actions (`src/actions/cart.ts`, `customer.ts`)                                   | Non implémentées — dossier `actions/` vide, prévu en Phase 5/6                                                                   |
| Pages catalogue, panier, checkout, blog, ateliers, Finder                               | Non implémentées — prévues à partir de la Phase 4                                                                                |
| Tests (unitaires, composants, intégration, Playwright) ([`TESTING.md`](./TESTING.md))   | Non implémentés — prévus en Phase 12                                                                                             |
