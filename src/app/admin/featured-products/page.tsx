import { redirect } from "next/navigation";

export default function FeaturedProductsPage() {
  redirect("/admin/products?list=featured");
}
