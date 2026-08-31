"use client";

import { useCartStore } from "@/lib/cart-store";

type QuickAddProduct = {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  badge?: string;
  accent?: string;
  category?: string;
};

export function QuickAddToCartButton({ product }: { product: QuickAddProduct }) {
  const addToCart = useCartStore((state) => state.addItem);

  return (
    <button
      type="button"
      onClick={() =>
        addToCart({
          id: product.id,
          name: product.name,
          price: product.price,
          originalPrice: product.originalPrice,
          badge: product.badge,
          accent: product.accent,
          category: product.category,
        })
      }
      className="rounded-full bg-slate-900 px-3 py-2 text-[10px] font-semibold text-white transition hover:bg-slate-800"
    >
      Thêm vào giỏ
    </button>
  );
}
