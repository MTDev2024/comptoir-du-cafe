# Testing Strategy

## Pyramide

```text
Unit
  ↓
Component
  ↓
Integration
  ↓
E2E
```

## Unit

Tester notamment :

- scoring du Coffee Finder
- classement de recherche
- formatage prix
- lead time
- mappings PrestaShop
- helpers SEO
- feature flags

## Components

Tester notamment :

- ProductCard
- QuantitySelector
- AddToCart
- Finder
- ReviewsSection
- formulaires et états d'erreur

## Integration

Tester les frontières :

- PrestaShop mapping
- panier
- authentification client
- validation des payloads
- services externes

## E2E

Playwright pour les parcours critiques :

1. accueil → catalogue → produit → panier → checkout
2. Finder → recommandations
3. atelier → réservation Cal.com
4. recherche
5. contact
6. guest → connexion / création de compte → panier conservé

## Cas d'erreur

- PrestaShop indisponible
- timeout API
- stock modifié entre affichage et action
- produit supprimé
- session expirée
- formulaire invalide
- Resend indisponible
- Cal.com indisponible
- erreur Stripe

## Sécurité

Vérifier notamment :

- aucun secret dans le bundle client
- clientId arbitraire refusé pour les données privées
- prix envoyé par le navigateur non fiable
- payloads invalides rejetés
- webhooks authentifiés lorsque nécessaires

## Accessibilité

- lint/a11y lorsque disponible
- navigation clavier
- focus
- lecteurs d'écran sur parcours clés

## SEO

Vérifier :

- title
- description
- canonical
- robots
- sitemap
- JSON-LD
- absence d'indexation des pages privées/transactionnelles

## Performance

Vérifier avec Lighthouse et DevTools :

- LCP
- INP
- CLS
- mobile
- réseau lent
- taille du bundle lorsque pertinent

## CI

Pipeline cible : lint → typecheck → unit/component/integration → build → E2E selon environnement.
