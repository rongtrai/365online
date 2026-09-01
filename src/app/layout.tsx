import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "365online",
  description: "365online shopping and deals",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const Footer = () => (
    <footer className="mt-auto border-t border-white/20 bg-teal-700 text-teal-50">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-sm sm:px-6 lg:flex-row lg:px-8">
        <p className="text-white">© 2026 365online</p>
        <div className="flex items-center gap-4 text-teal-100">
          <a href="/" className="transition hover:text-white">Trang chủ</a>
          <a href="/products" className="transition hover:text-white">Sản phẩm</a>
          <a href="/cart" className="transition hover:text-white">Giỏ hàng</a>
        </div>
      </div>
    </footer>
  );

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <div className="flex min-h-screen flex-col">
          <main className="min-h-screen">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
