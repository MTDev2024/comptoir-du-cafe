# UI Design System

## Direction

Modern Heritage / Specialty Coffee / Editorial.

Premium, sobre, chaleureux, éditorial. Éviter les codes visuels de dashboard ou de marketplace générique.

## Fonts

- Headings : Fraunces
- Body / UI : Inter
- Logo : typographie dédiée uniquement au logotype si nécessaire

## Palette

```text
Espresso  #17120F
Cacao    #3A2920
Ivoire   #F5F0E8
Crème    #EAE1D5
Champagne #C6A66B
Bronze   #8A6B48
Encre    #211A16
Taupe    #6D6259
Border   #D8CEC2
Success  #4F6B52
Warning  #9A7138
Error    #9B4A42
Info     #6D6259
```

## Sémantique

```text
background: #F5F0E8
backgroundDark: #17120F
surface: #EAE1D5
foreground: #211A16
foregroundMuted: #6D6259
foregroundOnDark: #F5F0E8
primary: #17120F
primaryForeground: #F5F0E8
accent: #C6A66B
accentForeground: #17120F
border: #D8CEC2
```

## Typographie

```text
Display: clamp(2.875rem, 5vw, 4.5rem)
H1: clamp(2.5rem, 4vw, 3.5rem)
H2: clamp(2rem, 3vw, 2.625rem)
H3: clamp(1.5rem, 2vw, 1.875rem)
H4: clamp(1.25rem, 1.5vw, 1.375rem)
Body large: 1.25rem
Body: 1rem
Body small: .875rem
Caption: .75rem
```

Line heights : display .98, headings 1.1, body 1.6, compact 1.35.

## Espacement

`4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96, 128, 160px`.

## Layout

Max width : 1440px.

Padding horizontal : 20px mobile, 32px tablet, 48px desktop, 64px wide.

Sections : 64px mobile, 96px desktop, 128px wide.

## Radius

Utiliser principalement `0`, `4`, `8`, `12px`. Éviter les interfaces excessivement arrondies.

## Motion

Durées : 180 / 300 / 600 / 1000ms selon l'importance.

Utiliser surtout transform/opacity. Respecter `prefers-reduced-motion`.

## Components

Composants de base : Button, Link, IconButton, Input, Select, Checkbox, Radio, FormField, Badge, Alert, Toast, Modal, Drawer, Dropdown, Accordion, Breadcrumbs, Pagination, EmptyState, Spinner, Skeleton.

## Commerce

ProductCard, ProductGrid, CategoryCard, BundleCard, ProductGallery, VariantSelector, AddToCart, QuantitySelector, CartButton, CartDrawer, CartItem, CartSummary, RelatedProducts.

## Reviews

Les avis utilisent les mêmes couleurs, fonts, espacements et composants que le reste du site. Aucun style Google externe ne doit casser la direction artistique.

## Accessibilité

- HTML sémantique
- navigation clavier
- focus visible
- labels de formulaires
- contrastes suffisants
- alt adapté au rôle de l'image
- focus management pour modal/drawer/lightbox/menus
- réduction de mouvement
