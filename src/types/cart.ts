/**
 * ============================================================================
 * Definisi Tipe Keranjang Belanja (Shopping Cart Types)
 * ============================================================================
 * Merepresentasikan setiap item produk yang dimasukkan ke dalam keranjang belanja.
 * Mendukung variasi produk (warna dan ukuran terpilih) serta informasi vendor.
 */

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
