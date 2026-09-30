# Data Models

Les types ci-dessous représentent le domaine frontend. Ils ne constituent pas une base de données parallèle.

## Product

```ts
export type Orderability = "available" | "preorder" | "unavailable";

export type FulfillmentMode = "ready_to_ship" | "prepared_to_order" | "made_to_order";

export type LeadTime = {
  minDays: number;
  maxDays?: number;
  unit: "calendar_days" | "business_days";
};

export type ProductVariant = {
  id: string;
  name: string;
  sku?: string;
  price: number;
  orderability: Orderability;
  fulfillmentMode?: FulfillmentMode;
  leadTime?: LeadTime;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  images: ProductImage[];
  variants?: ProductVariant[];
  categoryIds: string[];
  orderability: Orderability;
  fulfillmentMode: FulfillmentMode;
  leadTime?: LeadTime;
};
```

## ProductImage

```ts
export type ProductImage = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};
```

## Category

```ts
export type Category = {
  id: string;
  slug: string;
  name: string;
  description?: string;
  image?: ProductImage;
};
```

## Cart

```ts
export type CartItem = {
  id: string;
  productId: string;
  variantId?: string;
  name: string;
  quantity: number;
  unitPrice: number;
  image?: ProductImage;
};

export type Cart = {
  id: string;
  items: CartItem[];
  subtotal: number;
  total: number;
  currency: string;
};
```

Les valeurs commerciales finales proviennent de PrestaShop.

## Customer

```ts
export type Customer = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
};
```

Ne pas exposer plus de données que nécessaire.

## Address

```ts
export type Address = {
  id: string;
  firstName: string;
  lastName: string;
  address1: string;
  address2?: string;
  postcode: string;
  city: string;
  countryCode: string;
};
```

## Workshop

```ts
export type Workshop = {
  id: string;
  slug: string;
  title: string;
  description?: string;
  duration?: string;
  image?: ProductImage;
  bookingUrl?: string;
};
```

Les créneaux, disponibilités, capacité et inscriptions restent dans Cal.com.

## Article

```ts
export type ArticleImage = {
  src: string;
  alt: string;
  caption?: string;
};

export type Article = {
  title: string;
  slug: string;
  category: string;
  publishedAt: string;
  featuredImage: ArticleImage;
  excerpt: string;
  content: ArticleBlock[];
  relatedProducts?: string[];
  relatedArticles?: string[];
  seo?: {
    title?: string;
    description?: string;
  };
};
```

Le contenu est structuré, pas un champ HTML arbitraire.

## Review

```ts
export type Review = {
  id: string;
  author: string;
  rating: number;
  text: string;
  date?: string;
  source: "google" | "static";
  url?: string;
};
```

## Finder

Le Finder est V1 un moteur de scoring déterministe. Il ne nécessite pas d'IA.

Les règles et le calcul doivent rester testables indépendamment de l'interface.
