# Technical Specification

## Structure applicative

```text
src/
├── app/
├── actions/
├── components/
├── config/
├── lib/
├── types/
└── styles/
```

## Organisation de `src/components/`

```text
src/components/
├── ui/           # composants de base (Button, Input, Badge, Alert, Modal, …)
├── layout/       # primitives de layout (Container, Section, Stack, Grid)
├── navigation/   # Header, Footer, Breadcrumbs, menus
├── commerce/     # ProductCard, CartDrawer, VariantSelector, …
├── blog/         # composants liés aux articles Decap
├── workshops/    # composants liés aux ateliers Cal.com
├── finder/       # composants du Coffee Finder
├── reviews/      # composants d'affichage des avis
├── gallery/      # composants de galerie image
└── sections/     # sections de page composées (Hero, etc.)
```

Chaque composant est placé dans le sous-dossier correspondant à son domaine plutôt qu'à la racine de `components/`.

### Primitives de layout : Container, Section, Stack, Grid

`Container`, `Section`, `Stack` et `Grid` (`src/components/layout/`) sont quatre primitives indépendantes, chacune avec une responsabilité unique et minimale :

- `Container` : largeur max et padding horizontal. Ne porte aucune sémantique (rend un `<div>`).
- `Section` : rythme vertical entre blocs de page et sémantique (rend un `<section>`). Ne gère pas la largeur/le padding horizontal.
- `Stack` : pose uniquement `display: flex` (rend un `<div>`). Direction, gap, wrap et alignement passent entièrement par `className`.
- `Grid` : pose uniquement `display: grid` (rend un `<div>`). Colonnes, gap et responsive passent entièrement par `className`.

Aucune de ces primitives n'intègre les autres automatiquement — elles se composent manuellement dans les pages/composants consommateurs. Exemple :

```tsx
<Section>
  <Container>
    <Grid className="grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3">
      {/* contenu */}
    </Grid>
  </Container>
</Section>
```

Ces primitives restent volontairement de très petites briques et ne reproduisent aucune fonctionnalité déjà couverte par les utilitaires Tailwind (`gap-*`, `grid-cols-*`, `items-*`, `justify-*`, `flex-row`/`flex-col`, etc.) : aucune prop `direction`, `gap`, `columns`, `wrap`, `align` ou `justify` n'est ajoutée sur `Stack`/`Grid`. Toute variante de ce type se règle via `className`.

### Button et Link : action vs navigation

`Button` et `Link` (`src/components/ui/`) ont des responsabilités strictement séparées, jamais mélangées :

- `Button` = **action** (soumission de formulaire, déclenchement côté client). Rend un `<button>`. Deux variantes seulement : `primary` (fond `primary`/texte `primary-foreground`) et `accent` (fond `accent`/texte `accent-foreground`). Pas de prop `size`, pas de prop `onClick`, pas de prop polymorphique, pas de slot icône dédié. `disabled` utilise l'attribut natif ; `loading` ajoute `aria-busy` et désactive le bouton. Reste un Server Component (pas de `"use client"`) : il ne porte aucune logique interactive propre. Les interactions client (gestion de `onClick`, état, etc.) sont portées par les composants clients qui utilisent `Button`, pas par `Button` lui-même.
- `Link` = **navigation**. Rend `next/link` pour les destinations internes (`href` commençant par `/` ou `#`), un `<a>` natif pour tout le reste (externe, `mailto:`, `tel:`, etc.). Pas de prop `variant`, `size`, `external` ou `openInNewTab` ; aucune apparence de bouton. N'ajoute jamais `target="_blank"` automatiquement. Si un usage futur a besoin de `target="_blank"`, une indication accessible de l'ouverture dans un nouvel onglet doit l'accompagner (non implémenté tant qu'aucun besoin réel n'existe, car l'API actuelle de `Link` ne porte pas de prop `target`).

### Form controls : Input, Select, Checkbox, Radio, FormField

`Input`, `Select`, `Checkbox`, `Radio` (`src/components/ui/`) sont de simples wrappers stylés autour de leur élément HTML natif respectif. Leur API est un **passthrough des attributs natifs** (`ComponentPropsWithoutRef<"input"|"select">` + `className`) : `value`, `defaultValue`, `onChange`, `disabled`, `name`, `placeholder`, `required`, etc. ne sont pas réinventés. Aucun état interne, aucun hook, aucun `"use client"`. `Select` reste un `<select>` natif (pas de listbox personnalisée). `Checkbox` ne supporte pas `indeterminate`. `Radio` reste un contrôle individuel ; aucun `RadioGroup`/`fieldset` n'est implémenté à ce stade.

`FormField` (`src/components/ui/FormField.tsx`) associe un label, une description optionnelle et un message d'erreur optionnel à **un** contrôle passé en `children` :

```ts
type FormFieldProps = {
  id: string; // requis, aucune génération automatique (pas de useId())
  label: string;
  description?: string;
  error?: string; // chaîne uniquement
  required?: boolean;
  children: ReactNode;
};
```

`FormField` n'injecte aucune prop dans `children` (pas de `cloneElement`) : le câblage `aria-describedby`/`aria-invalid` entre le contrôle et les ids déterministes `${id}-description`/`${id}-error` reste **explicite, à la charge du consommateur**. `required` est reflété à la fois par l'attribut natif sur le contrôle et par une indication visuelle dans `FormField`. Aucun `"use client"`, aucune validation métier, aucune gestion d'état de formulaire : ces composants restent des wrappers UI purs. La validation (Zod), les Server Actions et la soumission restent hors de ces composants.

### Alert : message persistant

`Alert` (`src/components/ui/Alert.tsx`) affiche un message persistant d'information, succès, avertissement ou erreur :

```ts
type AlertProps = ComponentPropsWithoutRef<"div"> & {
  variant?: "info" | "success" | "warning" | "error"; // défaut "info"
};
```

Fond teinté à faible opacité (`bg-{variant}/10`) + bordure gauche 4px pleine couleur du variant + texte en `foreground` — uniquement des tokens déjà définis, aucune nouvelle couleur. Pas d'icône intégrée, pas de bouton close, pas de titre séparé (un seul `children` libre). Composant présentationnel pur : aucun `"use client"`, aucun hook, aucune logique métier.

**Accessibilité : `Alert` n'impose aucun rôle ARIA.** Ni `role="alert"` ni `role="status"` ne sont appliqués automatiquement selon la variante — le passthrough des attributs natifs (`ComponentPropsWithoutRef<"div">`) permet au consommateur de poser explicitement le rôle approprié à son contexte d'usage (`role="alert"`, `role="status"`, ou aucun rôle pour un message purement visuel/persistant). Ce choix est volontaire : `Alert` ne peut pas savoir, depuis le composant lui-même, si une instance donnée est statique au chargement de la page ou injectée dynamiquement — seul le consommateur connaît ce contexte.

### Toast : notification transitoire

`Toast` (`src/components/ui/Toast.tsx`) affiche une notification transitoire, pilotée entièrement par le consommateur :

```ts
type ToastVariant = "info" | "success" | "warning" | "error";

type ToastProps = ComponentPropsWithoutRef<"div"> & {
  open: boolean;
  variant?: ToastVariant; // défaut "info"
  onClose?: () => void;
};
```

Mêmes 4 tokens de variante que `Alert` (fond teinté faible opacité + bordure gauche 4px), présentation plus compacte (padding réduit, texte `text-body-sm`). `open=false` → le composant retourne `null` : pas d'animation de sortie, pas de système de présence. **Aucune animation en V1** (ni en entrée, ni en sortie) — `globals.css` n'est pas modifié pour `Toast`.

Contrairement à `Alert` et `Button`, `Toast` porte la directive `"use client"` — exception justifiée uniquement par le bouton de fermeture qui attache un `onClick` à un élément DOM natif (nécessite l'hydratation). Aucun hook, aucun état interne, aucun timer, aucune fermeture automatique : `open`/`onClose` restent entièrement contrôlés par le consommateur. Pas de `ToastProvider`, pas de `ToastViewport`, pas de Context API, pas de store, pas de portail, aucune dépendance externe.

Le bouton de fermeture (`<button type="button">` natif, `aria-label="Fermer"`) n'est rendu que si `onClose` est fourni. Il n'est **pas** construit à partir du composant `Button` existant : `Button` ne supporte volontairement pas `onClick` (décision Phase 2), et cette décision n'est pas remise en cause pour résoudre le cas de `Toast` — `Toast` définit son propre bouton minimal, local, non réutilisable ailleurs.

**Accessibilité** : `role="status"` par défaut (destructuré avec valeur par défaut, donc surchargeable explicitement si le consommateur passe son propre `role`). Aucun `aria-live` ajouté en plus de `role="status"` (redondant, le rôle porte déjà une sémantique live implicite). Pas de focus automatique à l'apparition. **Limitation V1 assumée et documentée** : `role="status"` ne garantit pas une annonce fiable par tous les lecteurs d'écran dans tous les contextes, car cette V1 ne fournit pas de région live persistante (`ToastViewport`) — un nœud `role="status"` inséré d'un coup dans le DOM avec son contenu déjà final n'est pas toujours annoncé de façon cohérente d'un lecteur d'écran à l'autre. Résoudre ce point nécessiterait une région live persistante, explicitement hors périmètre de cette étape.

### Modal : boîte de dialogue native

`Modal` (`src/components/ui/Modal.tsx`) s'appuie sur l'élément HTML natif `<dialog>` et sa méthode `.showModal()`, plutôt que sur un `<div>` + ARIA manuel :

```ts
type ModalProps = Omit<ComponentPropsWithoutRef<"dialog">, "open" | "onClose"> & {
  open: boolean;
  onClose: () => void;
  heading?: string;
};
```

**Pourquoi `<dialog>` natif** : focus trap, focus initial et restauration du focus sont gérés **nativement** par `showModal()`/`close()` — aucun focus trap fait maison, aucune dépendance de focus management (`focus-trap-react`, Radix, etc.). `createPortal` n'est pas utilisé : les dialogs ouverts via `showModal()` sont rendus par le navigateur dans le "top layer", au-dessus de tout, sans dépendre d'un portail React — ce qui élimine aussi tout risque de mismatch SSR/hydratation (le `<dialog>` se SSR comme un élément HTML normal ; seuls les appels impératifs `showModal()`/`close()` vivent dans un `useEffect` côté client).

**Pourquoi `Omit<..., "open" | "onClose">`** : `open` est un attribut natif de `<dialog>` (différent de notre prop contrôlée — ne doit jamais être transmis tel quel, sous peine de produire un dialog _non modal_, sans aucun des comportements natifs). `onClose` est une prop contrôlée gérée entièrement par le composant (écoute de l'événement natif `close`), pas un passthrough direct. `heading` remplace `title` pour éviter la collision avec l'attribut HTML global `title` (infobulle), de sens totalement différent.

**Fonctionnement showModal/close** : un seul `useEffect` synchronise la prop `open` avec l'état natif du dialog (`dialog.showModal()` si `open && !dialog.open`, `dialog.close()` si `!open && dialog.open` — jamais d'appel redondant). Un second `useEffect` écoute l'événement natif `close` et appelle `onClose()` — **point d'entrée unique** : Escape (comportement natif du `<dialog>`), le bouton de fermeture et le clic sur le backdrop appellent tous `dialog.close()` plutôt que `onClose()` directement, garantissant une synchronisation cohérente dans tous les cas.

**Backdrop** : détection par comparaison `event.target === dialogRef.current` sur le `onClick` du `<dialog>` lui-même (un clic dans le contenu interne a un `target` différent, donc ne ferme pas).

**Bouton de fermeture** : `<button type="button">` natif local, `aria-label="Fermer"`, non construit à partir de `Button` (même raison que pour `Toast` : `Button` ne supporte volontairement pas `onClick`).

**Scroll lock** : inclus en V1. À l'ouverture, verrouille `document.body.style.overflow` et compense la largeur de la scrollbar (`window.innerWidth - document.documentElement.clientWidth`) via `padding-right`, uniquement si nécessaire. Les valeurs inline précédentes sont conservées et restaurées exactement à la fermeture/au démontage (pas de système global de scroll lock — à réexaminer seulement si `Drawer` en révèle un besoin réel).

**ARIA** : `role="dialog"` (explicite, bien qu'implicite sur `<dialog>`, pour une robustesse maximale vis-à-vis des technologies d'assistance plus anciennes) et `aria-modal="true"` toujours posés. Si `heading` est fourni : rendu d'un `<h2>` visible avec un `id` stable (`useId()`), associé via `aria-labelledby`. **Si `heading` est absent, aucun `aria-labelledby` n'est généré artificiellement** — c'est alors la responsabilité du consommateur de fournir son propre `aria-label` via le passthrough natif pour que le dialog conserve un nom accessible.

Aucune animation en V1 (`globals.css` non modifié, aucune keyframe, aucun système de présence). `"use client"` obligatoire — hooks limités à `useRef`, `useEffect` et `useId`, aucun état interne superflu. Pas de `Context`, pas de store, pas de gestionnaire global : `Modal` reste une primitive contrôlée autonome.

### Drawer : panneau latéral natif

`Drawer` (`src/components/ui/Drawer.tsx`) reprend la même architecture que `Modal` (`<dialog>` natif, `showModal()`/`close()`, focus natif, scroll lock, bouton de fermeture local, `heading`/`aria-labelledby` conditionnels) pour un panneau positionné sur un bord de l'écran plutôt qu'une boîte centrée :

```ts
type DrawerSide = "left" | "right";

type DrawerProps = Omit<ComponentPropsWithoutRef<"dialog">, "open" | "onClose"> & {
  open: boolean;
  onClose: () => void;
  heading?: string;
  side?: DrawerSide; // défaut "right"
};
```

**Pourquoi `<dialog>` natif, encore** : exactement les mêmes raisons que pour `Modal` — focus trap, focus initial et restauration du focus natifs (aucun focus trap fait maison, aucune dépendance de focus management), pas de `createPortal` (rendu "top layer"), pas de risque de mismatch SSR/hydratation.

**`side`** : seule prop ajoutée par rapport à `Modal`, justifiée par les usages réels visés (panier à droite, menu mobile à gauche) — `"left" | "right"` uniquement, défaut `"right"`. Pas de prop `width` : la largeur par défaut (pleine largeur sur mobile, plafonnée sur desktop via `w-full max-w-sm`) est définie dans le composant et reste surchargeable via `className`.

**Comportement showModal/close, backdrop, fermeture** : identiques à `Modal` — un `useEffect` synchronise `open` avec l'état natif (`showModal()`/`close()` jamais redondants), un second écoute l'événement natif `close` comme point d'entrée unique vers `onClose()`. Escape, bouton de fermeture et clic sur le backdrop (`event.target === dialogRef.current`) passent tous par `dialog.close()`. Bouton de fermeture natif local (`<button type="button" aria-label="Fermer">`), non construit à partir de `Button`.

**Scroll lock** : même principe que `Modal` (verrouillage `overflow` + compensation scrollbar + restauration exacte des valeurs inline précédentes), **implémenté localement dans `Drawer.tsx`**, sans extraction d'un hook partagé (`useScrollLock`) avec `Modal`. Avec seulement deux consommateurs à ce stade, l'extraction ajouterait un couplage entre deux primitives aujourd'hui indépendantes pour économiser une quinzaine de lignes — à reconsidérer seulement si un troisième composant a un besoin identique.

**ARIA** : `role="dialog"` + `aria-modal="true"` toujours posés. Si `heading` est fourni, `<h2>` + `id` stable (`useId()`) + `aria-labelledby`. Si absent, aucun `aria-labelledby` généré artificiellement — responsabilité du consommateur de fournir `aria-label` via le passthrough natif, identique à `Modal`.

**Aucune animation en V1** (`globals.css` non modifié, aucune keyframe, aucun système de présence, aucune dépendance). **Compromis UX à noter explicitement** : contrairement à `Modal`, le mouvement de glissement latéral fait partie de l'identité visuelle attendue d'un drawer — son absence est donc un compromis plus visible ici que pour `Modal`/`Toast`. Ce choix est volontaire pour cette V1 et pourra être réévalué plus tard si le besoin se confirme, sans qu'il soit nécessaire d'introduire un système de présence dès maintenant.

Aucune abstraction commune (`BaseDialog`, `DialogPrimitive`, etc.) n'est créée avec `Modal` : les deux restent des primitives autonomes, `Modal.tsx` n'a pas été modifié pour cette étape.

## Règles React / Next.js

- Server Components par défaut.
- `use client` uniquement si nécessaire.
- Les pages composent les composants et récupèrent les données côté serveur lorsque possible.
- Ne pas placer toute la logique métier dans les composants.

## PrestaShop adapter

```text
src/lib/prestashop/
├── client.ts
├── schemas/
├── mappers/
├── products.ts
├── categories.ts
├── cart.ts
├── customers.ts
├── orders.ts
└── carriers.ts
```

`client.ts` centralise base URL, authentification, headers, timeout, gestion d'erreurs et politique de retry.

Les schemas valident les réponses externes. Les mappers convertissent les structures externes vers les types du domaine.

## Server Actions

```text
src/actions/
├── cart.ts
└── customer.ts
```

Les mutations commerciales passent par ces actions ou une couche serveur équivalente.

## Types

Les types du domaine ne doivent pas reproduire aveuglément les objets PrestaShop.

Exemple de chaîne :

`PrestaShop response → schema → mapper → Product → component`

## Validation

Utiliser Zod aux frontières externes lorsque pertinent. Ne pas faire confiance aux données reçues du navigateur.

## Feature flags

Utiliser uniquement des flags correspondant à des fonctionnalités réellement variables : newsletter, analytics, workshops, reviews, Finder, etc.

## Erreurs

Les erreurs utilisateur doivent être compréhensibles et non techniques. Les logs peuvent contenir les détails techniques nécessaires, sans secrets ni PII inutile.

## États UI

Tout parcours interactif important prévoit :

- idle
- loading
- success
- empty lorsque pertinent
- error

## SEO

Utiliser les mécanismes Next.js de metadata, canonical, sitemap et robots. Les données structurées sont générées côté serveur et doivent correspondre au contenu visible.

## Conventions

- TypeScript strict
- `@/*` pour les imports internes
- composants en PascalCase
- fonctions/variables en camelCase
- types en PascalCase
- pas de `any` sans justification
- dépendances minimales

## Configuration

`.env.local` est ignoré. `.env.example` est versionné. Les secrets ne sont jamais commités.
