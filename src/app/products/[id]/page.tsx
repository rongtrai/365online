"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCartStore } from "@/lib/cart-store";

type ProductDetail = {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  rating: number;
  badge: string;
  accent: string;
  description: string;
  category: string;
  stock: number;
};

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const addToCart = useCartStore((state) => state.addItem);
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<ProductDetail[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const response = await fetch("/api/products");
        if (!response.ok) throw new Error("Failed");
        const data = await response.json();
        const items = Array.isArray(data) ? data : [];
        const found = items.find((item: ProductDetail) => String(item.id) === String(params.id)) ?? null;
        setProduct(found);
        setRelatedProducts(items.filter((item: ProductDetail) => item.id !== Number(params.id)).slice(0, 3));
      } catch {
        setProduct(null);
        setRelatedProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [params.id]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      badge: product.badge,
      accent: product.accent,
      category: product.category,
    });
  };

  if (loading) {
    return <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900"><div className="mx-auto max-w-6xl rounded-[28px] border border-slate-200 bg-white p-8 text-center shadow-sm">Đang tải sản phẩm...</div></main>;
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900">
        <div className="mx-auto max-w-xl rounded-[28px] border border-slate-200 bg-white p-10 text-center shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">SẢN PHẨM</p>
          <h1 className="mt-3 text-3xl font-black tracking-tight">Sản phẩm không tồn tại</h1>
          <Link href="/products" className="mt-5 inline-block rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white">
            Quay lại danh sách sản phẩm
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <Link href="/products" className="text-sm font-medium text-slate-600 underline underline-offset-4">
            ← Quay lại danh sách
          </Link>
          <Link href="/cart" className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
            Giỏ hàng
          </Link>
        </div>

        <div className="grid gap-8 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-2">
          <div className={`h-[420px] rounded-[28px] bg-gradient-to-br ${product.accent} p-6`}>
            <div className="flex h-full items-start justify-between">
              <span className="rounded-full bg-white/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-white">
                {product.badge}
              </span>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">{product.category}</p>
            <h1 className="mt-3 text-4xl font-black tracking-tight">{product.name}</h1>
            <div className="mt-4 flex items-center gap-2 text-amber-400">
              {Array.from({ length: 5 }).map((_, index) => (
                <span key={index}>★</span>
              ))}
              <span className="text-sm font-medium text-slate-500">{product.rating}</span>
            </div>

            <div className="mt-5 flex items-center gap-3">
              <span className="text-4xl font-black text-slate-900">{new Intl.NumberFormat("vi-VN").format(product.price * 1000)}đ</span>
              <span className="text-lg text-slate-400 line-through">{new Intl.NumberFormat("vi-VN").format(product.originalPrice * 1000)}đ</span>
            </div>

            <p className="mt-5 text-base leading-7 text-slate-600">{product.description}</p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button onClick={handleAddToCart} className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white">
                Thêm vào giỏ
              </button>
              <button onClick={() => { handleAddToCart(); router.push("/checkout"); }} className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700">
                Mua ngay
              </button>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3 text-sm text-slate-600">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <p className="font-bold text-slate-900">Tồn kho</p>
                <p className="mt-1">{product.stock} sản phẩm</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <p className="font-bold text-slate-900">Vận chuyển</p>
                <p className="mt-1">2-4 ngày</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <p className="font-bold text-slate-900">Bảo hành</p>
                <p className="mt-1">12 tháng</p>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-12">
          <h2 className="text-3xl font-black tracking-tight">Sản phẩm liên quan</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {relatedProducts.map((item) => (
              <Link key={item.id} href={`/products/${item.id}`} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className={`h-40 bg-gradient-to-br ${item.accent} p-4`} />
                <div className="p-4">
                  <p className="text-lg font-bold text-slate-900">{item.name}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xl font-black text-slate-900">{new Intl.NumberFormat("vi-VN").format(item.price * 1000)}đ</span>
                    <span className="text-sm text-slate-500">{item.rating} ★</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
