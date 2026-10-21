import { redirect } from "next/navigation";

export default function SpecialOffersPage() {
  redirect("/admin/products?list=special");
}
