# Implementation Roadmap

> État d'avancement détaillé : voir [`CURRENT-STATE.md`](./CURRENT-STATE.md).

## Phase 0 — Documentation

- ajouter `AGENTS.md`
- ajouter les documents `docs/`
- vérifier cohérence croisée

**État : partiellement terminée.** Les documents `docs/` ont été ajoutés au dépôt applicatif et `AGENTS.md` complété avec le contexte projet à l'issue de la Phase 1. La vérification de cohérence croisée reste à refaire à chaque évolution de la documentation.

## Phase 1 — Fondation Next.js

- initialiser Next.js / TypeScript
- config ESLint / Prettier
- Tailwind
- fonts
- design tokens
- layout global
- metadata de base
- structure `src/`

**Critère :** application démarre, lint/typecheck/build fonctionnent.

**État : terminée.** Critère d'acceptation vérifié (`npm run lint`, `npm run typecheck`, `npm run build`, `npm run dev`). Détails dans [`CURRENT-STATE.md`](./CURRENT-STATE.md).

## Phase 2 — UI foundation

- [x] Container
- [x] Section
- [ ] Stack / Grid
- [ ] Button / Link
- [ ] form controls
- [ ] Alert / Toast / Modal / Drawer
- [ ] Breadcrumbs
- [ ] Skeleton / EmptyState
- [ ] Header / Footer

**Critère :** système UI cohérent et accessible.

**État : en cours.** `Container` et `Section` implémentés (`src/components/layout/`) et vérifiés (`npm run lint`, `npm run typecheck`, `npm run build`). Autres éléments non commencés. Détails dans [`CURRENT-STATE.md`](./CURRENT-STATE.md).

## Phase 3 — PrestaShop integration

- client API
- env validation
- schemas
- mappers
- produits
- catégories
- erreurs / timeouts

**Critère :** données PrestaShop utilisables par les Server Components.

## Phase 4 — Catalogue

- `/cafes`
- catégories
- cartes produits
- pagination
- `/produit/[slug]`
- galerie
- variantes
- disponibilité / lead time

**Critère :** catalogue réaliste avec données PrestaShop.

## Phase 5 — Panier

- Server Actions
- add/update/remove
- CartDrawer
- `/panier`
- gestion guest cart

**Critère :** un seul panier réel PrestaShop.

## Phase 6 — Checkout / compte

- intégration compte
- login/register/logout/reset
- checkout PrestaShop
- Click & Collect
- Stripe test
- confirmation commande

**Critère :** parcours achat complet en environnement de test.

## Phase 7 — Pages éditoriales

- accueil
- La Maison
- catégories institutionnelles
- contact
- avis statiques

## Phase 8 — Decap / blog

- modèle Article
- config Decap
- médias
- blog
- article
- related products
- revalidation

## Phase 9 — Cal.com / ateliers

- liste ateliers
- détail atelier
- inline embed
- états indisponibles / erreurs

## Phase 10 — Finder / recherche

- scoring Finder
- résultats
- recherche produits + articles
- classement simple
- noindex recherche

## Phase 11 — Newsletter / analytics optionnels

Implémenter uniquement si activés par configuration.

## Phase 12 — Qualité

- tests unitaires
- composants
- intégration
- Playwright
- accessibilité
- SEO
- performance
- sécurité

## Phase 13 — Demo

- contenu fictif cohérent
- Stripe test
- vérification responsive
- Vercel Preview puis démo publique

## Phase 14 — Stabilisation

- correction bugs
- documentation finale
- README
- version stable
- tag V1

## Règle de progression

Une phase n'est considérée terminée que lorsque son critère d'acceptation est satisfait. Ne pas avancer en empilant des fonctionnalités cassées ou non testées.
