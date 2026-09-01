"use client";

import {
  Heart,
  Menu,
  Search,
  ShoppingCart,
} from "lucide-react";
import { create } from "zustand";
import { useCartStore } from "@/lib/cart-store";

const useShopStore = create<{
  wishlistIds: number[];
  toggleWishlist: (id: number) => void;
}>((set) => ({
  wishlistIds: [1, 4],
  toggleWishlist: (id: number) =>
    set((state) => {
      const wishlistIds = state.wishlistIds.includes(id)
        ? state.wishlistIds.filter((item) => item !== id)
        : [...state.wishlistIds, id];

      return { wishlistIds };
    }),
}));

export default function Header() {
  const cartCount = useCartStore((state) => state.itemCount);

  return (
    <header className="sticky top-0 z-50 border-b border-teal-500/20 bg-teal-700 text-white shadow-sm backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 py-3 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <button className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white lg:hidden">
              <Menu className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-500 text-[9px] font-black tracking-[-0.12em] text-white shadow-lg shadow-teal-900/20">
                365
              </div>
              <div className="leading-none">
                <p className="text-xl font-black tracking-[-0.06em] text-white">365online</p>
              </div>
            </div>
          </div>

          <div className="w-full md:flex-1 md:px-2">
            <form action="/products" method="GET" className="w-full">
              <label className="flex w-full items-center gap-3 rounded-full border border-white/20 bg-white px-4 py-3 shadow-sm transition focus-within:border-white focus-within:ring-2 focus-within:ring-white/30">
                <Search className="h-4 w-4 text-slate-400" />
                <input
                  aria-label="Search products"
                  name="q"
                  className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
                  placeholder="Tìm kiếm sản phẩm, ưu đãi, danh mục..."
                />
              </label>
            </form>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <a href="/login" className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/15 hover:text-teal-100">
              Đăng nhập
            </a>

            <a href="/cart" className="relative inline-flex items-center gap-1.5 rounded-full bg-emerald-500 px-2.5 py-2 text-[11px] font-semibold text-white shadow-lg shadow-emerald-900/20 transition hover:bg-emerald-400 sm:px-3.5">
              <ShoppingCart className="h-3.5 w-3.5 shrink-0" />
              <span className="whitespace-nowrap">Giỏ hàng</span>
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-orange-500 px-1 text-[9px] font-bold text-white">
                {cartCount}
              </span>
            </a>
          </div>
        </div>

        <nav className="flex items-center gap-4 overflow-x-auto border-t border-white/10 py-3 text-sm font-medium text-white/90">
          <div className="flex items-center gap-6 whitespace-nowrap">
            <a href="/products" className="underline decoration-white/70 underline-offset-8 transition hover:text-teal-100">
              Cửa hàng
            </a>
            <a href="/products" className="transition hover:text-teal-100">
              Tool, Code, Phần mềm
            </a>
            <a href="/products" className="transition hover:text-teal-100">
              Bài viết chia sẻ
            </a>
            <a href="/products" className="transition hover:text-teal-100">
              Khuyến mãi
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
