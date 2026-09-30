# Routes

## Pages principales

| Route                            | Contenu                 | Source principale                     |
| -------------------------------- | ----------------------- | ------------------------------------- |
| `/`                              | Homepage                | config + PrestaShop + Decap + Cal.com |
| `/cafes`                         | Tous les cafés          | PrestaShop                            |
| `/cafes/[slug]`                  | Catégorie café          | PrestaShop                            |
| `/produit/[slug]`                | Produit                 | PrestaShop                            |
| `/machines-materiel`             | Catégories matériel     | PrestaShop                            |
| `/machines-materiel/[categorie]` | Catalogue               | PrestaShop                            |
| `/sets-coffrets`                 | Sets / coffrets         | PrestaShop                            |
| `/ateliers`                      | Liste ateliers          | Cal.com                               |
| `/ateliers/[slug]`               | Atelier + booking       | Cal.com                               |
| `/trouver-mon-cafe`              | Finder                  | logique locale                        |
| `/blog`                          | Articles                | Decap                                 |
| `/blog/[slug]`                   | Article                 | Decap + références PrestaShop         |
| `/la-maison`                     | Histoire / savoir-faire | config / contenu                      |
| `/contact`                       | Contact                 | config + Resend                       |
| `/recherche`                     | Produits + articles     | PrestaShop + Decap                    |
| `/panier`                        | Panier                  | PrestaShop                            |
| `/checkout`                      | Checkout                | PrestaShop                            |
| `/commande/[reference]`          | Confirmation            | PrestaShop                            |
| `/compte`                        | Compte                  | PrestaShop                            |

## Homepage

Ordre cible :

Hero → Nos cafés → Finder → Savoir-faire → Machines & matériel → Sets & coffrets → Ateliers → Histoire → Galerie → Avis → Blog → Newsletter optionnelle → Réassurance → Footer.

## Catalogues

Navigation :

```text
CAFÉS
├── Tous les cafés
├── Origines
├── Assemblages
└── Éditions limitées

MACHINES & MATÉRIEL
├── Machines espresso
├── Moulins
├── Méthodes douces
└── Accessoires

SETS & COFFRETS
├── Set Espresso
├── Set Filtre
├── Set French Press
├── Set Découverte
└── Coffrets cadeaux
```

## SEO par route

Les pages publiques indexables possèdent metadata et données structurées adaptées. Panier, checkout, compte, commande et recherche sont hors SEO et doivent être exclus de l'indexation.

## États

Chaque route dynamique prévoit les états de chargement, vide et erreur appropriés.
