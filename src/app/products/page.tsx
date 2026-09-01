"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Product = {
  id: number;
  name: string;
  slug: string;
  price: number;
  originalPrice: number;
  rating: number;
  badge: string;
  accent: string;
  description: string;
  category: string;
  stock: number;
};

const mapProduct = (row: Record<string, unknown>): Product => ({
  id: Number(row.id ?? 0),
  name: String(row.name ?? "Unnamed product"),
  slug: String(row.slug ?? "unnamed-product"),
  price: Number(row.price ?? 0),
  originalPrice: Number(row.original_price ?? row.originalPrice ?? Number(row.price ?? 0)),
  rating: Number(row.rating ?? 5),
  badge: String(row.badge ?? "NEW"),
  accent: String(row.accent ?? "from-slate-700 via-slate-800 to-slate-900"),
  description: String(row.description ?? "Sản phẩm của 365online."),
  category: String(row.category ?? "Khác"),
  stock: Number(row.stock ?? 0),
});

function ProductsCatalog() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category") || "";
  const decodedCategory = (() => {
    if (!categoryParam) return "";
    try {
      return decodeURIComponent(categoryParam || "").trim();
    } catch {
      return categoryParam.trim();
    }
  })();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadProducts = async () => {
      setLoading(true);

      try {
        if (!supabase) {
          setProducts([]);
          return;
        }

        let query = supabase.from("products").select("*");

        if (decodedCategory) {
          query = query.eq("category", decodedCategory);
        }

        const { data, error } = await query.order("id");

        if (!isMounted) return;

        if (error || !data || data.length === 0) {
          const fallbackResponse = await supabase.from("products").select("*").order("id");
          const fallbackData = fallbackResponse.data ?? [];
          setProducts(fallbackResponse.error || !fallbackData.length ? [] : fallbackData.map(mapProduct));
          return;
        }

        setProducts(data.map(mapProduct));
      } catch {
        if (isMounted) {
          setProducts([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, [decodedCategory]);

  const filteredProducts = products.filter((product) => {
    if (!decodedCategory) return true;
    return product.category === decodedCategory;
  });

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">SẢN PHẨM</p>
            <h1 className="mt-2 text-4xl font-black tracking-tight">Danh sách sản phẩm</h1>
          </div>
          <Link
            href="/"
            className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900"
          >
            Về trang chủ
          </Link>
        </div>

        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="overflow-hidden rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
                <div className="h-52 animate-pulse rounded-2xl bg-slate-200" />
                <div className="mt-4 h-4 w-20 animate-pulse rounded bg-slate-200" />
                <div className="mt-3 h-6 w-3/4 animate-pulse rounded bg-slate-200" />
                <div className="mt-4 h-8 w-full animate-pulse rounded bg-slate-200" />
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="rounded-[24px] border border-dashed border-slate-300 bg-white p-12 text-center shadow-sm">
            <p className="text-lg font-bold text-slate-900">Không tìm thấy sản phẩm nào phù hợp.</p>
            <p className="mt-2 text-sm text-slate-500">Hãy thử từ khóa khác hoặc quay lại danh mục toàn bộ.</p>
            <Link
              href="/products"
              className="mt-5 inline-flex rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Xem tất cả sản phẩm
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <article
                key={product.id}
                className="group overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/70"
              >
                <div className={`h-52 bg-gradient-to-br ${product.accent} p-4`}>
                  <div className="flex h-full items-start justify-between">
                    <span className="rounded-full bg-white/20 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-white">
                      {product.badge}
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <p className="text-sm font-medium text-slate-500">{product.category}</p>
                  <h2 className="mt-2 line-clamp-2 text-xl font-bold text-slate-900">{product.name}</h2>

                  <div className="mt-3 flex items-center gap-1 text-amber-400">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <span key={index}>★</span>
                    ))}
                    <span className="ml-1 text-xs text-slate-500">{product.rating}</span>
                  </div>

                  <div className="mt-4 flex items-end justify-between gap-2">
                    <div>
                      <span className="text-2xl font-black text-slate-900">{new Intl.NumberFormat("vi-VN").format(product.price * 1000)}đ</span>
                      <span className="ml-2 text-sm text-slate-400 line-through">{new Intl.NumberFormat("vi-VN").format(product.originalPrice * 1000)}đ</span>
                    </div>
                    <Link
                      href={`/products/${product.id}`}
                      className="rounded-full bg-slate-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-slate-800"
                    >
                      Xem chi tiết
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900"><div className="mx-auto max-w-7xl rounded-[24px] border border-slate-200 bg-white p-8 text-center text-slate-600 shadow-sm">Đang tải sản phẩm...</div></main>}>
      <ProductsCatalog />
    </Suspense>
  );
}
