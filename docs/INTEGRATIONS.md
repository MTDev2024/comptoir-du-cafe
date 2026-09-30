# Integrations

## PrestaShop

### Rôle

Source de vérité commerce : catalogue, catégories, variantes, caractéristiques, prix, stock, panier, comptes, commandes et checkout.

### Accès

Les clés restent côté serveur. Le navigateur ne contacte pas directement le Webservice avec une clé secrète.

### Catalogue

`lib/prestashop/products.ts` et `categories.ts` exposent des fonctions applicatives, pas des données statiques.

### Panier

Les actions ajoutent, modifient ou retirent des lignes via PrestaShop. Ne pas remplacer le panier complet par une structure envoyée aveuglément depuis le navigateur.

### Stock / prix

Le frontend peut afficher des données cacheables mais PrestaShop valide l'état commercial au moment de l'action.

## Stripe

Stripe est le processeur de paiement utilisé via PrestaShop. Next.js ne collecte ni ne stocke les données bancaires.

V1 : mode test uniquement.

## Decap CMS

### Rôle

Uniquement blog et contenu éditorial.

Médias : `public/images/blog/<article-slug>/`.

Un article peut référencer des produits par ID/slug PrestaShop, sans dupliquer les données produit.

Une publication peut déclencher une revalidation Next.js via webhook.

## Cal.com

### Rôle

Ateliers : événements, dates, horaires, disponibilité, capacité, inscriptions et questions éventuelles.

Le widget Cal.com est intégré inline dans la page Next.js d'atelier. Next.js ne reconstruit pas le moteur de réservation.

## Resend + React Email

Utilisés pour les emails dont Next.js est responsable, notamment le formulaire de contact.

Structure cible :

```text
src/lib/email/
├── client.ts
└── templates/
```

Clé API côté serveur uniquement.

## Brevo

Newsletter optionnelle. Si la feature est désactivée, aucun appel Brevo et aucune variable Brevo n'est nécessaire au runtime.

## Google Business Profile / avis

V1 : avis statiques fictifs.

Production : adaptateur dédié permettant de récupérer les avis Google sans changer `ReviewsSection`.

La disponibilité exacte et les modalités d'accès à l'API devront être vérifiées au moment de l'implémentation réelle du connecteur.

## Email boundaries

| Email                        | Responsable      |
| ---------------------------- | ---------------- |
| Confirmation commande        | PrestaShop       |
| Emails compte                | PrestaShop       |
| Emails réservation           | Cal.com          |
| Contact                      | Next.js + Resend |
| Newsletter                   | Brevo            |
| Notifications custom Next.js | Resend           |
