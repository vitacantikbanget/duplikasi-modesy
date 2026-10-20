export interface ProductVariationColor {
  name: string;
  hex: string;
}

export interface ProductReview {
  id: string;
  user: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
}

export interface ProductItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  categorySlug: string;
  subcategory: string;
  subcategorySlug: string;
  price: number | "Free" | "Request a Quote";
  originalPrice?: number | null;
  discount?: number | null;
  productType: "physical" | "digital" | "license_key" | "quote" | "ordinary";
  condition?: "New" | "Used - Like New" | "Used - Good" | "Used - Fair";
  listingType?: "sale" | "ordinary" | "quote" | "license";
  stock: number;
  sku: string;
  rating: number;
  reviewsCount: number;
  images: string[];
  colors?: ProductVariationColor[];
  sizes?: string[];
  vendor: {
    name: string;
    slug: string;
    avatar: string;
    rating: number;
    joinedDate: string;
    location: string;
    verified: boolean;
  };
  description: string;
  specs: { label: string; value: string }[];
  shippingInfo: {
    estimatedDelivery: string;
    shippingCost: string;
    returnPolicy: string;
  };
  reviews: ProductReview[];
}
