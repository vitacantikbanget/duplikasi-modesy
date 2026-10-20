import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CookiesWarning from "@/components/common/CookiesWarning";
import RoleSwitcher from "@/components/common/RoleSwitcher";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <CookiesWarning />
      <RoleSwitcher />
    </div>
  );
}
