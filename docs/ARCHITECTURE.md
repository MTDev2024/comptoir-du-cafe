# Architecture technique

## Vue générale

```text
Visiteur
  ↓
Next.js / React / TypeScript
  ├── UI / SEO / recherche / Finder / blog / pages publiques
  │
  ├── Server Actions / serveur
  │        ↓
  │     PrestaShop
  │        ├── produits
  │        ├── prix
  │        ├── stock
  │        ├── panier
  │        ├── clients
  │        ├── commandes
  │        └── checkout
  │             ↓
  │           Stripe
  │
  ├── Decap → contenu blog
  ├── Cal.com → ateliers
  └── Resend → emails Next.js
```

## Sources de vérité

| Domaine                        | Source                             |
| ------------------------------ | ---------------------------------- |
| Configuration statique du site | `src/config/site.ts`               |
| Produits                       | PrestaShop                         |
| Catégories commerciales        | PrestaShop                         |
| Prix / promotions              | PrestaShop                         |
| Stock                          | PrestaShop                         |
| Panier                         | PrestaShop                         |
| Client / compte                | PrestaShop                         |
| Commande                       | PrestaShop                         |
| Paiement                       | Stripe via PrestaShop              |
| Blog                           | Decap                              |
| Ateliers                       | Cal.com                            |
| Avis V1                        | données statiques                  |
| Avis production                | adaptateur Google Business Profile |

## PrestaShop

PrestaShop est le moteur commerce. Le frontend ne doit pas devenir un deuxième backend métier.

Le Webservice/API sert notamment au catalogue et aux ressources nécessaires. Les opérations de panier complexes peuvent utiliser un module PrestaShop mince et isolé plutôt que des contournements côté navigateur.

Ne jamais modifier le core PrestaShop.

## Panier

Un seul panier commercial : celui de PrestaShop.

Le frontend affiche et déclenche les opérations via des Server Actions ou endpoints serveur appropriés.

## Compte

PrestaShop possède l'identité e-commerce. Pas de NextAuth/Auth.js pour dupliquer les comptes.

## Checkout

Le checkout cible le One Page Checkout natif de PrestaShop, personnalisé visuellement. Le mécanisme précis de routage et de cookies doit être validé lors de l'implémentation et de l'infrastructure finale.

## Domaine

En production, viser un domaine public unique. Les URLs SEO publiques appartiennent à Next.js. Les pages panier, compte, checkout et commande ne sont pas des pages SEO.

Le mécanisme exact de reverse proxy/routing sera choisi avec l'infrastructure finale, sans créer de deuxième domaine public concurrent.

## Cache

Cache/revalidation pour le contenu consultatif. Données transactionnelles dynamiques.

Jamais de cache Next.js comme source de vérité commerciale.

## Images

- Produits : PrestaShop
- Blog : Decap/Git
- Hero, galerie, maison, catégories : `public/`
- Logo et icônes : `public/`
- Affichage : `next/image`

## Sécurité

Les secrets restent côté serveur. Les données externes sont validées. Les Server Actions vérifient contexte et autorisation. Le navigateur ne peut pas imposer prix, stock, client ou commande.

## Performance

- Server Components par défaut
- `next/image`
- `next/font`
- hero prioritaire pour le LCP
- images sous la ligne de flottaison lazy
- pas de dépendances lourdes sans nécessité
- Cal.com chargé seulement où nécessaire
- analytics et newsletter chargés seulement si activés

## Accessibilité

Cible WCAG 2.2 AA comme référence de conception et de test. Ne pas prétendre à une certification automatique.
