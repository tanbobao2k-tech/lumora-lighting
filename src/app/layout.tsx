import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ContactIcons } from "@/components/layout/ContactIcons";
import { CartProvider } from "@/components/cart/CartContext";

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "LUMORA — Đèn chiếu sáng chính hãng",
  description:
    "LUMORA phân phối đèn chiếu sáng chính hãng Opple, Philips, Osram — đèn trong nhà, ngoài trời và quạt năng lượng mặt trời.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="vi" className={`${notoSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <ContactIcons />
        </CartProvider>
      </body>
    </html>
  );
}
