import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AddToCartModal from "@/components/common/AddToCartModal";
import QuickViewModal from "@/components/common/QuickViewModal";
import CookiesWarning from "@/components/common/CookiesWarning";
import RoleSwitcher from "@/components/common/RoleSwitcher";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <AddToCartModal />
      <QuickViewModal />
      <CookiesWarning />
      <RoleSwitcher />
    </div>
  );
}
