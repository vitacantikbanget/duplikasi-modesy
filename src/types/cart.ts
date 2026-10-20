export interface CartItem {
  id: string;
  productSlug: string;
  title: string;
  price: number;
  imageUrl: string;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
  vendorName: string;
}
