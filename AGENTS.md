# Le Comptoir du Café

Démonstrateur e-commerce (Next.js / TypeScript + PrestaShop) pour une maison de
torréfaction fictive. Voir `docs/PROJECT.md` pour le contexte produit complet.

## Avant de coder

- Lire `docs/CURRENT-STATE.md` pour l'état d'avancement réel (phase en cours,
  ce qui est implémenté vs seulement documenté).
- Lire `docs/IMPLEMENTATION-ROADMAP.md` : ne pas empiler des fonctionnalités
  d'une phase future tant que la phase courante n'est pas validée.
- Respecter les sources de vérité définies dans `docs/ARCHITECTURE.md`
  (PrestaShop pour le commerce, Decap pour le blog, Cal.com pour les ateliers,
  `src/config/site.ts` pour la configuration statique).
- Conventions de code : `docs/TECHNICAL-SPEC.md`.
- Système de design (fonts, palette, tokens, composants) : `docs/UI-DESIGN-SYSTEM.md`.

## Commandes

Voir `docs/LOCAL-DEVELOPMENT.md`. En résumé :
`npm run dev`, `npm run lint`, `npm run typecheck`, `npm run build`, `npm run format`.

## Règles non négociables

- Ne jamais modifier le core PrestaShop.
- Un seul panier commercial réel : celui de PrestaShop (pas de panier client dupliqué).
- Pas de NextAuth/Auth.js pour dupliquer l'identité client (PrestaShop fait foi).
- Server Components par défaut, `"use client"` uniquement si nécessaire.
- Secrets côté serveur uniquement ; jamais commités.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
