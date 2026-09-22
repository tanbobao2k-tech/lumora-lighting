import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ContactIcons } from "@/components/layout/ContactIcons";
import { CartProvider } from "@/components/cart/CartContext";
import { getSiteInfo } from "@/lib/content-store";

export const dynamic = "force-dynamic";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const siteInfo = getSiteInfo();

  return (
    <CartProvider>
      <Header brandName={siteInfo.brandName} />
      <main className="flex-1">{children}</main>
      <Footer />
      <ContactIcons />
    </CartProvider>
  );
}
