# Deployment

## Local

- Next.js : `localhost:3000`
- PrestaShop : `localhost:8080` via Docker
- services externes en mode test/sandbox lorsque disponible

## Preview

Chaque branche/PR importante peut utiliser une Preview Vercel pour validation visuelle et fonctionnelle.

## Demo publique

Le démonstrateur peut être public avec :

- données fictives
- Stripe test
- Click & Collect
- Cal.com
- Finder
- panier / checkout

L'infrastructure doit rester gratuite ou presque gratuite. Aucun système payant lourd n'est nécessaire pour V1.

## Production client

Une vraie production peut nécessiter :

- staging
- sauvegardes DB et médias
- monitoring
- alerting
- paiement réel
- domaine personnalisé
- TLS/HTTPS
- politique de sauvegarde et restauration testée
- hébergement PrestaShop adapté
- règles fiscales adaptées
- livraison si nécessaire
- conformité légale adaptée au client

## Variables d'environnement

Ne jamais committer `.env.local`.

Versionner `.env.example` avec les noms, jamais les secrets.

Les variables exactes seront complétées lors de l'implémentation des clients d'intégration.

## Déploiement

1. Pull Request.
2. CI.
3. Preview.
4. Validation fonctionnelle / visuelle.
5. Merge vers `main`.
6. Déploiement stable.
7. Vérification smoke test.

## Git

- `main` stable
- branches courtes `feature/*`, `fix/*`
- commits de type `feat`, `fix`, `refactor`, `docs`, `test`
- tags de version importants selon SemVer
- aucune mention d'outil ou d'assistant IA (Claude, Claude Code, ChatGPT, Gemini ou autre) dans les messages de commit, y compris en co-auteur (`Co-Authored-By`)
- aucun committer/auteur autre que le porteur du projet sur les commits
