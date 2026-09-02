"use client";

import {
  Menu,
  Search,
  ShoppingCart,
} from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useCartStore } from "@/lib/cart-store";
import { supabase } from "@/lib/supabase";

export default function Header() {
  const pathname = usePathname();
  const cartItems = useCartStore((state) => state.items);
  const totalQuantity = cartItems ? cartItems.reduce((acc, item) => acc + item.quantity, 0) : 0;
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const client = supabase;

    if (!client) {
      setUser(null);
      setLoading(false);
      return;
    }

    const syncAuth = async () => {
      try {
        const {
          data: { session },
        } = await client.auth.getSession();

        if (isMounted) {
          setUser(session?.user ?? null);
        }
      } catch {
        if (isMounted) {
          setUser(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    syncAuth();

    const {
      data: { subscription },
    } = client.auth.onAuthStateChange((_event, session) => {
      if (isMounted) {
        setUser(session?.user ?? null);
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-teal-500/20 bg-teal-800 text-white shadow-sm backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 py-3 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <button className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white lg:hidden">
              <Menu className="h-5 w-5" />
            </button>

            <a href="/" className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-500 text-[9px] font-black tracking-[-0.12em] text-white shadow-lg shadow-pink-900/20">
                365
              </div>
              <div className="leading-none">
                <p className="text-xl font-black tracking-[-0.06em] text-white">365online</p>
              </div>
            </a>
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
            {!loading && user !== null ? (
              <button
                type="button"
                onClick={async () => {
                  if (supabase) {
                    await supabase.auth.signOut();
                  }
                }}
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/15 hover:text-teal-100"
              >
                Đăng xuất
              </button>
            ) : !loading ? (
              <a href="/login" className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/15 hover:text-teal-100">
                Đăng nhập
              </a>
            ) : null}

            <a href="/cart" className="relative inline-flex items-center gap-1.5 rounded-full bg-emerald-500 px-2.5 py-2 text-[11px] font-semibold text-white shadow-lg shadow-emerald-900/20 transition hover:bg-emerald-400 sm:px-3.5">
              <ShoppingCart className="h-3.5 w-3.5 shrink-0" />
              <span className="whitespace-nowrap">Giỏ hàng</span>
              {totalQuantity > 0 ? (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-orange-500 px-1 text-[9px] font-bold text-white">
                  {totalQuantity}
                </span>
              ) : null}
            </a>
          </div>
        </div>

        <nav className="flex items-center gap-4 overflow-x-auto border-t border-white/10 py-3 text-sm font-medium text-white/90">
          <div className="flex items-center gap-2 whitespace-nowrap">
            <a
              href="/"
              className={[
                "rounded-lg px-3 py-1.5 transition-all duration-200 ease-in-out",
                pathname === "/"
                  ? "border border-white/30 bg-white/20 text-white shadow-sm"
                  : "text-white/80 hover:bg-white/10 hover:text-white",
              ].join(" ")}
            >
              Cửa hàng
            </a>
            <a
              href="/posts?category=Tool%20%26%20Code"
              className={[
                "rounded-lg px-3 py-1.5 transition-all duration-200 ease-in-out",
                pathname.startsWith("/posts") && useSearchParams().get("category") === "Tool & Code"
                  ? "border border-white/30 bg-white/20 text-white shadow-sm"
                  : "text-white/80 hover:bg-white/10 hover:text-white",
              ].join(" ")}
            >
              Tool, Code, Phần mềm
            </a>
            <a
              href="/posts?category=B%C3%A0i%20vi%E1%BA%BFt%20chia%20s%E1%BA%BB"
              className={[
                "rounded-lg px-3 py-1.5 transition-all duration-200 ease-in-out",
                pathname.startsWith("/posts") && useSearchParams().get("category") === "Bài viết chia sẻ"
                  ? "border border-white/30 bg-white/20 text-white shadow-sm"
                  : "text-white/80 hover:bg-white/10 hover:text-white",
              ].join(" ")}
            >
              Bài viết chia sẻ
            </a>
            <a
              href="/posts?category=Khuy%E1%BA%BFn%20m%C3%A3i"
              className={[
                "rounded-lg px-3 py-1.5 transition-all duration-200 ease-in-out",
                pathname.startsWith("/posts") && useSearchParams().get("category") === "Khuyến mãi"
                  ? "border border-white/30 bg-white/20 text-white shadow-sm"
                  : "text-white/80 hover:bg-white/10 hover:text-white",
              ].join(" ")}
            >
              Khuyến mãi
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
