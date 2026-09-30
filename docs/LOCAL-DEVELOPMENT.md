# Environnement de développement local

## Prérequis

- Node.js 20 LTS ou supérieur (validé avec Node 22.22.2)
- npm 10+ (validé avec npm 11.12.0)
- Docker (pour PrestaShop local — voir [Rôle de Docker](#rôle-de-docker))

## Installation

```bash
npm install
```

## Scripts disponibles

| Script         | Commande               | Rôle                                                                 |
| -------------- | ---------------------- | -------------------------------------------------------------------- |
| `dev`          | `npm run dev`          | Lance le serveur de développement (Turbopack), http://localhost:3000 |
| `build`        | `npm run build`        | Build de production                                                  |
| `start`        | `npm run start`        | Sert le build de production                                          |
| `lint`         | `npm run lint`         | ESLint (`eslint-config-next`)                                        |
| `typecheck`    | `npm run typecheck`    | Vérification TypeScript stricte (`tsc --noEmit`)                     |
| `format`       | `npm run format`       | Formatage Prettier (écrit les fichiers)                              |
| `format:check` | `npm run format:check` | Vérifie le formatage sans modifier les fichiers                      |

## Next.js local

- Démarrage : `npm run dev`.
- URL : `http://localhost:3000` ([`DEPLOYMENT.md`](./DEPLOYMENT.md#local)).
- Server Components par défaut, Turbopack (comportement par défaut de Next.js 16).

## Rôle de Docker

[`DEPLOYMENT.md`](./DEPLOYMENT.md#local) fixe la cible suivante pour l'environnement local :

- Next.js : `localhost:3000` (hors Docker, exécuté directement avec Node/npm)
- PrestaShop : `localhost:8080` via Docker

**État réel à ce stade (fin Phase 1) :** aucun `docker-compose.yml` ni configuration Docker n'existe encore dans ce dépôt. PrestaShop n'a pas encore été installé/lancé en local. La mise en place concrète (image PrestaShop, base de données MySQL, volumes, ports, version PrestaShop ciblée) est prévue en **Phase 3 — PrestaShop integration** et n'a pas encore été décidée dans le détail. Ne pas anticiper cette configuration avant la Phase 3.

## PrestaShop local

- Cible : `http://localhost:8080` via Docker ([`DEPLOYMENT.md`](./DEPLOYMENT.md#local)).
- PrestaShop est le moteur commerce (catalogue, prix, stock, panier, comptes, commandes, checkout) et reste la seule source de vérité pour ces domaines ([`ARCHITECTURE.md`](./ARCHITECTURE.md#sources-de-vérité)).
- Règle non négociable : **ne jamais modifier le core PrestaShop** ([`ARCHITECTURE.md`](./ARCHITECTURE.md#prestashop)). Toute opération de panier complexe qui ne peut pas passer par le Webservice standard doit passer par un module PrestaShop mince et isolé, plutôt que par un contournement côté navigateur.
- Non encore défini : version PrestaShop précise, image Docker utilisée, procédure d'installation/seed de données de démonstration. À traiter en Phase 3.

## Back-office PrestaShop

- Interface d'administration PrestaShop (gestion catalogue, commandes, clients, configuration du Webservice, etc.), accessible depuis un navigateur une fois l'instance locale démarrée.
- L'URL exacte du back-office, les identifiants d'accès et leur mode de partage/stockage ne sont pas encore définis dans la documentation existante — à traiter lors de la mise en place de l'instance locale (Phase 3). Ne pas stocker d'identifiants de back-office dans le dépôt.

## Distinction IDE / navigateur

- **IDE / terminal (Claude Code)** : lecture/écriture du code source, exécution de commandes CLI (`npm run dev|build|lint|typecheck|format`), exécution de commandes Docker en ligne de commande lorsque demandé, rédaction de la documentation.
- **Navigateur** : back-office PrestaShop, tableau de bord Stripe, interface Cal.com, interface d'administration Decap, test manuel des parcours front (`/`, `/panier`, `/checkout`, etc.). Ces interfaces graphiques nécessitent une navigation, une authentification et un jugement visuel qui restent du ressort de Michael.

## Ce que fait Claude Code

- Génère et modifie le code applicatif Next.js/TypeScript (composants, pages, Server Actions, adapters `src/lib/prestashop/`, schemas, mappers).
- Exécute et vérifie les commandes locales : `npm run dev`, `npm run build`, `npm run lint`, `npm run typecheck`, `npm run format`, tests.
- Peut proposer/exécuter des commandes Docker en CLI (ex. `docker compose up`) lorsque c'est explicitement demandé, dans les limites des autorisations accordées pour la session.
- Rédige et met à jour la documentation du dépôt (`docs/`, `AGENTS.md`, `README.md`).
- Ne possède, ne crée et ne saisit aucun identifiant dans une interface web externe (back-office PrestaShop, Stripe, Cal.com, Decap, Resend, Brevo).
- Ne décide pas seul des secrets/valeurs de production ; ne commit/push pas sans validation explicite.

## Ce que fait Michael

- Possède et configure les comptes des services externes (PrestaShop back-office, Stripe, Cal.com, Decap, Resend, Brevo) et leurs identifiants.
- Installe/démarre l'environnement Docker local de PrestaShop et effectue la configuration initiale depuis le back-office (y compris la génération des clés Webservice).
- Renseigne les valeurs réelles dans `.env.local` (jamais commité).
- Valide visuellement et fonctionnellement les parcours dans le navigateur.
- Valide chaque phase de la roadmap avant que la suivante ne démarre, et valide les commits/push.

## Configuration du Webservice PrestaShop

D'après [`TECHNICAL-SPEC.md`](./TECHNICAL-SPEC.md#prestashop-adapter) et [`ARCHITECTURE.md`](./ARCHITECTURE.md#prestashop) :

- Le Webservice/API PrestaShop sert notamment au catalogue et aux ressources nécessaires ; les clés restent côté serveur, le navigateur ne contacte jamais directement le Webservice avec une clé secrète.
- `src/lib/prestashop/client.ts` centralisera base URL, authentification, headers, timeout, gestion d'erreurs et politique de retry (fichier non encore créé — prévu en Phase 3).
- Ressources concernées par l'adapter (fichiers prévus, non encore créés) : `products.ts`, `categories.ts`, `cart.ts`, `customers.ts`, `orders.ts`, `carriers.ts`.

**Non encore défini dans la documentation existante** : procédure exacte d'activation du Webservice dans le back-office, liste précise des permissions par ressource à accorder à la clé API, format exact de l'URL du Webservice. À définir en Phase 3, sans l'inventer ici.

## Configuration des variables d'environnement

- Règle validée ([`TECHNICAL-SPEC.md`](./TECHNICAL-SPEC.md#configuration), [`DEPLOYMENT.md`](./DEPLOYMENT.md#variables-denvironnement)) : `.env.local` n'est jamais commité ; `.env.example` est versionné avec les noms de variables, jamais les secrets. Les valeurs exactes seront complétées lors de l'implémentation des clients d'intégration.
- **État actuel** : aucun fichier `.env.example` n'existe encore dans le dépôt, aucune variable d'environnement n'est requise pour la Phase 1 (aucune intégration externe branchée).
- **Non encore défini** : noms exacts des variables (URL/clé API PrestaShop, clés Stripe, clé API Resend/Brevo, secrets Decap/Cal.com webhook, etc.). Ces noms seront introduits progressivement avec chaque intégration (Phases 3, 6, 8, 9, 11), et `.env.example` sera mis à jour en conséquence. Ne pas inventer de noms de variables avant l'implémentation réelle du client correspondant.

## Futur module PrestaShop personnalisé

- Décision déjà validée ([`ARCHITECTURE.md`](./ARCHITECTURE.md#prestashop)) : « Le Webservice/API sert notamment au catalogue et aux ressources nécessaires. Les opérations de panier complexes peuvent utiliser un module PrestaShop mince et isolé plutôt que des contournements côté navigateur. » et « Ne jamais modifier le core PrestaShop. »
- **Non encore défini** : nécessité réelle de ce module (à confirmer une fois le Webservice standard testé en Phase 3), son nom, sa structure interne, son mode de déploiement dans l'instance PrestaShop. Aucune architecture de module n'est à inventer avant que ce besoin soit confirmé.

## Stripe en environnement de test

D'après [`INTEGRATIONS.md`](./INTEGRATIONS.md#stripe) et [`PROJECT.md`](./PROJECT.md#périmètre-v1) :

- Stripe est le processeur de paiement utilisé **via PrestaShop** ; Next.js ne collecte ni ne stocke de données bancaires.
- V1 : mode test Stripe uniquement.
- La configuration des clés Stripe (test) se fait donc côté PrestaShop (back-office / module de paiement), pas directement dans Next.js, sauf besoin documenté ultérieurement.
- **Non encore défini** : module de paiement PrestaShop précis utilisé, étapes exactes de configuration du mode test. À traiter en Phase 6 (Checkout / compte).

## Click & Collect

D'après [`PROJECT.md`](./PROJECT.md#périmètre-v1) :

- V1 ne gère que le retrait en Click & Collect ; la livraison à domicile est explicitement hors périmètre V1.
- **Non encore défini** : configuration exacte du transporteur/mode de livraison Click & Collect dans PrestaShop, articulation avec `src/lib/prestashop/carriers.ts` (fichier prévu, non encore créé). À traiter en Phase 6.

## Règles concernant les modifications du core PrestaShop

- Règle non négociable, déjà validée ([`ARCHITECTURE.md`](./ARCHITECTURE.md#prestashop)) : **ne jamais modifier le core PrestaShop**.
- Toute extension nécessaire passe par le Webservice standard en priorité, ou par un module PrestaShop mince et isolé si une opération ne peut pas être couverte autrement — jamais par un contournement côté navigateur ni par une modification directe des fichiers core.
- Cette règle s'applique dès la Phase 3 et pour toute la durée du projet.

## Variables d'environnement — résumé

Aucune variable d'environnement n'est requise au stade actuel (Phase 1 — fondation, aucune intégration externe branchée).

Lorsque les intégrations externes seront ajoutées (PrestaShop, Stripe, Decap, Cal.com, Resend — voir [`INTEGRATIONS.md`](./INTEGRATIONS.md)), un fichier `.env.example` sera versionné et `.env.local` restera ignoré par Git, conformément à [`TECHNICAL-SPEC.md`](./TECHNICAL-SPEC.md#configuration).

## Structure du projet

Voir [`TECHNICAL-SPEC.md`](./TECHNICAL-SPEC.md#structure-applicative) pour le détail de l'arborescence `src/`.

La configuration statique du site (nom, description, locale, URL) est centralisée dans `src/config/site.ts`, conformément à [`ARCHITECTURE.md`](./ARCHITECTURE.md#sources-de-vérité).

## Vérifications avant commit

Avant de proposer une évolution, s'assurer que les commandes suivantes passent sans erreur :

```bash
npm run lint
npm run typecheck
npm run build
```
