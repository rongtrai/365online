"use client";

import {
  ArrowRight,
  BadgePercent,
  ChevronRight,
  Heart,
  Menu,
  Search,
  ShoppingCart,
  Sparkles,
  Star,
  Truck,
  ShieldCheck,
  CreditCard,
  Headphones,
  Camera,
  Globe,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
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

type Product = {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  rating: number;
  badge: string;
  accent: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Đồng hồ thông minh AeroFit Pro",
    price: 249,
    originalPrice: 329,
    rating: 4.8,
    badge: "-24%",
    accent: "from-cyan-500 via-sky-500 to-blue-600",
  },
  {
    id: 2,
    name: "Tai nghe không dây Nova",
    price: 119,
    originalPrice: 169,
    rating: 4.7,
    badge: "HOT",
    accent: "from-violet-500 via-purple-500 to-fuchsia-600",
  },
  {
    id: 3,
    name: "Đèn bàn Luma",
    price: 89,
    originalPrice: 129,
    rating: 4.9,
    badge: "MỚI",
    accent: "from-amber-400 via-orange-500 to-rose-500",
  },
  {
    id: 4,
    name: "Ba lô UrbanFlex",
    price: 139,
    originalPrice: 199,
    rating: 4.6,
    badge: "-18%",
    accent: "from-emerald-500 via-teal-500 to-cyan-600",
  },
];

const catalogProducts: Product[] = [
  {
    id: 5,
    name: "Loa Bluetooth Horizon Mini",
    price: 179,
    originalPrice: 249,
    rating: 4.9,
    badge: "HOT",
    accent: "from-pink-500 via-rose-500 to-orange-500",
  },
  {
    id: 6,
    name: "Máy ảnh mini PixelGo",
    price: 329,
    originalPrice: 449,
    rating: 4.8,
    badge: "NEW",
    accent: "from-indigo-500 via-purple-500 to-violet-600",
  },
  {
    id: 7,
    name: "Bàn phím cơ KeyPad X",
    price: 219,
    originalPrice: 299,
    rating: 4.7,
    badge: "-15%",
    accent: "from-slate-700 via-slate-800 to-slate-900",
  },
  {
    id: 8,
    name: "Ghế làm việc FlexSeat",
    price: 259,
    originalPrice: 349,
    rating: 4.6,
    badge: "MỚI",
    accent: "from-cyan-500 via-teal-500 to-emerald-600",
  },
  {
    id: 9,
    name: "Màn hình văn phòng ViewMax",
    price: 489,
    originalPrice: 629,
    rating: 4.9,
    badge: "-20%",
    accent: "from-blue-500 via-cyan-500 to-sky-600",
  },
  {
    id: 10,
    name: "Đèn LED Trang trí NeoGlow",
    price: 79,
    originalPrice: 119,
    rating: 4.5,
    badge: "HOT",
    accent: "from-yellow-400 via-orange-400 to-red-500",
  },
  {
    id: 11,
    name: "Camera an ninh LiteCam",
    price: 299,
    originalPrice: 389,
    rating: 4.8,
    badge: "NEW",
    accent: "from-sky-500 via-indigo-500 to-violet-600",
  },
  {
    id: 12,
    name: "Túi chống nước DriftPack",
    price: 109,
    originalPrice: 159,
    rating: 4.7,
    badge: "-10%",
    accent: "from-emerald-500 via-green-500 to-lime-500",
  },
];

const fallbackCategories = [
  { name: "Robot, Mô hình", count: 0, accent: "from-sky-500 via-cyan-500 to-teal-500" },
  { name: "Linh kiện, Thiết bị", count: 0, accent: "from-violet-500 via-purple-500 to-fuchsia-500" },
  { name: "Phụ kiện Robot", count: 0, accent: "from-amber-400 via-orange-500 to-rose-500" },
  { name: "Kit phát triển", count: 0, accent: "from-emerald-500 via-teal-500 to-cyan-600" },
  { name: "Tool, Code, Phần mềm", count: 0, accent: "from-pink-500 via-rose-500 to-red-500" },
];

const collections = [
  {
    title: "Bộ kit Robotics Starter",
    category: "Best seller",
    readTime: "Từ 2.499.000đ",
    excerpt:
      "Gói khởi đầu hoàn chỉnh cho học tập, demo dự án và trải nghiệm lập trình robot một cách nhanh chóng.",
    accent: "from-indigo-500 via-violet-500 to-fuchsia-500",
  },
  {
    title: "Sensor & camera AI",
    category: "Mới cập nhật",
    readTime: "Bộ sưu tập",
    excerpt:
      "Linh kiện nhận diện hình ảnh, cảm biến thông minh và thiết bị hỗ trợ mô hình AI cho các dự án hiện đại.",
    accent: "from-orange-400 via-pink-500 to-rose-500",
  },
  {
    title: "Phụ kiện & thiết bị văn phòng",
    category: "Combo tiện ích",
    readTime: "Giải pháp",
    excerpt:
      "Mở rộng không gian làm việc với màn hình, bàn phím, đèn và phụ kiện hỗ trợ tập trung và sáng tạo.",
    accent: "from-emerald-500 via-teal-500 to-cyan-500",
  },
];

export default function Home() {
  const cartCount = useCartStore((state) => state.itemCount);
  const wishlistIds = useShopStore((state) => state.wishlistIds);
  const toggleWishlist = useShopStore((state) => state.toggleWishlist);
  const addToCart = useCartStore((state) => state.addItem);
  const [categories, setCategories] = useState<Array<{ name: string; count: number; accent: string }>>([]);

  useEffect(() => {
    let isMounted = true;

    const loadCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();

        if (!isMounted) return;

        const nextCategories = Array.isArray(data)
          ? data.map((category: { name?: string; count?: number | string; product_count?: number | string; accent?: string }) => ({
              name: String(category.name ?? "Khác"),
              count: Number(category.count ?? category.product_count ?? 0) || 0,
              accent: String(category.accent ?? "from-slate-700 via-slate-800 to-slate-900"),
            }))
          : fallbackCategories;

        setCategories(nextCategories);
      } catch {
        if (isMounted) {
          setCategories(fallbackCategories);
        }
      }
    };

    loadCategories();

    return () => {
      isMounted = false;
    };
  }, []);

  const articleCards: (typeof collections)[number][] = collections.length
    ? collections
    : [
        {
          title: "Cách chọn kit robot phù hợp cho người mới",
          category: "Hướng dẫn",
          readTime: "5 phút đọc",
          excerpt: "Khám phá bộ kit phù hợp với mục tiêu học tập, thử nghiệm và xây dựng dự án maker cá nhân.",
          accent: "from-indigo-500 via-violet-500 to-fuchsia-500",
        },
        {
          title: "AI trong mô hình giám sát tự động",
          category: "Công nghệ",
          readTime: "7 phút đọc",
          excerpt: "Ứng dụng AI vào hệ thống giám sát, nhận diện và tối ưu quy trình làm việc cho doanh nghiệp nhỏ.",
          accent: "from-orange-400 via-pink-500 to-rose-500",
        },
        {
          title: "Lựa chọn phụ kiện văn phòng thông minh cho không gian làm việc",
          category: "Đời sống",
          readTime: "6 phút đọc",
          excerpt: "Tận dụng các thiết bị hỗ trợ tập trung, sáng tạo và nâng cao hiệu quả công việc mỗi ngày.",
          accent: "from-emerald-500 via-teal-500 to-cyan-500",
        },
      ];

  const sidebarCategories = categories.length ? categories : fallbackCategories;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:items-start">
          <aside className="w-full space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-500">Danh mục</p>
              <ul className="mt-3 space-y-1.5 text-sm text-slate-700">
                {sidebarCategories
                  .filter((category) => category.name !== "Tool, Code, Phần mềm")
                  .map((category) => (
                    <li key={category.name}>
                      <Link
                        href={`/products?category=${encodeURIComponent(category.name)}`}
                        className="flex w-full items-center justify-between rounded-xl px-2.5 py-2 text-left transition hover:bg-slate-100 hover:text-slate-900"
                      >
                        <span className="truncate">{category.name}</span>
                        <span className="inline-flex min-w-10 items-center justify-center rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-500">
                          {Number(category.count ?? 0) || 0}
                        </span>
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-900 p-4 text-white shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-200">Hot</p>
              <h3 className="mt-3 text-2xl font-black tracking-tight">Kit robot AI</h3>
              <p className="mt-2 text-sm text-slate-300">Bộ phát triển cho học tập, demo và dự án maker.</p>
              <button className="mt-4 inline-flex items-center gap-2 rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-400">
                Khám phá
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </aside>

          <div className="space-y-6">
            <section className="overflow-hidden rounded-[24px] border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 p-5 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.9)]">
              <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                <div>
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-orange-200">
                    <Sparkles className="h-3.5 w-3.5" />
                    365online marketplace
                  </div>
                  <h1 className="max-w-xl text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
                    Mua sắm thông minh cho công việc, học tập & sáng tạo
                  </h1>
                  <p className="mt-4 max-w-lg text-sm text-slate-300 sm:text-base">
                    Khám phá robot, cảm biến AI, thiết bị văn phòng và linh kiện kỹ thuật số được chọn lọc để giúp bạn làm việc nhanh hơn, sáng tạo tốt hơn và vận hành hiệu quả hơn.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <a href="/products" className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/30 transition hover:bg-orange-400">
                      Mua ngay
                      <ArrowRight className="h-4 w-4" />
                    </a>
                    <a href="/products" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10">
                      Xem ưu đãi
                    </a>
                  </div>
                </div>

                <div className="rounded-[22px] bg-gradient-to-br from-slate-200 via-white to-slate-100 p-4 shadow-inner">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-[20px] bg-gradient-to-br from-cyan-500 via-sky-500 to-blue-600 p-4 text-white shadow-lg shadow-blue-500/20">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-100">Servo</span>
                        <Heart className="h-4 w-4" />
                      </div>
                      <p className="mt-8 text-3xl font-black">3.999.000đ</p>
                      <p className="text-sm text-cyan-100">Servo Pro</p>
                    </div>

                    <div className="rounded-[20px] bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-600 p-4 text-white shadow-lg shadow-violet-500/20">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-100">Cảm biến</span>
                        <Sparkles className="h-4 w-4" />
                      </div>
                      <p className="mt-8 text-3xl font-black">5.999.000đ</p>
                      <p className="text-sm text-violet-100">Vision Sensor</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <section className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm lg:col-span-2">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">NỔI BẬT</p>
                <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900">Sản phẩm bán chạy nhất</h2>
              </div>
              <button className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900">
                Xem tất cả
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
              {products.slice(0, 4).map((product) => {
                const isSaved = wishlistIds.includes(product.id);

                return (
                  <Link
                    key={product.id}
                    href={`/products/${product.id}`}
                    className="group block h-full"
                  >
                    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/80">
                      <div className="relative overflow-hidden rounded-2xl bg-slate-100">
                        <div className={`h-52 bg-gradient-to-br ${product.accent} p-4`}>
                          <div className="flex h-full items-start justify-between">
                            <div className="inline-flex rounded-full bg-white/20 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-white">
                              {product.badge}
                            </div>
                            <button
                              aria-label={`Toggle wishlist for ${product.name}`}
                              onClick={(event) => {
                                event.preventDefault();
                                event.stopPropagation();
                                toggleWishlist(product.id);
                              }}
                              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white backdrop-blur-sm"
                            >
                              <Heart className={`h-4 w-4 ${isSaved ? "fill-current text-rose-200" : ""}`} />
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-1 flex-col">
                        <p className="line-clamp-2 text-sm font-semibold text-slate-800">{product.name}</p>

                        <div className="mt-3 flex items-center gap-1 text-amber-400">
                          {Array.from({ length: 5 }).map((_, index) => (
                            <Star key={index} className={`h-3.5 w-3.5 ${index < Math.round(product.rating) ? "fill-current" : "text-slate-300 fill-none"}`} />
                          ))}
                          <span className="ml-1 text-xs font-medium text-slate-500">{product.rating}</span>
                        </div>

                        <div className="mt-auto pt-3">
                          <div className="flex min-h-[42px] items-center justify-between gap-2">
                            <div className="min-w-0 flex items-baseline gap-2">
                              <span className="text-xl font-black text-slate-900">${product.price}</span>
                              <span className="text-sm text-slate-400 line-through">${product.originalPrice}</span>
                            </div>
                            <button
                              onClick={(event) => {
                                event.preventDefault();
                                event.stopPropagation();
                                addToCart({
                                  id: product.id,
                                  name: product.name,
                                  price: product.price,
                                  originalPrice: product.originalPrice,
                                  badge: product.badge,
                                  accent: product.accent,
                                  category: "Robot, Mô hình",
                                });
                              }}
                              className="inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-slate-900 px-2.5 py-2 text-[10px] font-semibold text-white transition hover:bg-slate-800"
                            >
                              Thêm vào giỏ
                            </button>
                          </div>
                        </div>
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>
          </section>

          <section className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm lg:col-span-2">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-500">SẢN PHẨM</p>
                <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900">Khám phá thêm cho bạn</h2>
              </div>
              <a href="/products" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900">
                Xem thêm
                <ChevronRight className="h-4 w-4" />
              </a>
            </div>

            <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
              {catalogProducts.slice(0, 8).map((product) => {
                const isSaved = wishlistIds.includes(product.id);

                return (
                  <Link
                    key={product.id}
                    href={`/products/${product.id}`}
                    className="group block h-full"
                  >
                    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/80">
                      <div className="relative overflow-hidden rounded-2xl bg-slate-100">
                        <div className={`h-52 bg-gradient-to-br ${product.accent} p-4`}>
                          <div className="flex h-full items-start justify-between">
                            <div className="inline-flex rounded-full bg-white/20 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-white">
                              {product.badge}
                            </div>
                            <button
                              aria-label={`Toggle wishlist for ${product.name}`}
                              onClick={(event) => {
                                event.preventDefault();
                                event.stopPropagation();
                                toggleWishlist(product.id);
                              }}
                              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white backdrop-blur-sm"
                            >
                              <Heart className={`h-4 w-4 ${isSaved ? "fill-current text-rose-200" : ""}`} />
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-1 flex-col">
                        <p className="line-clamp-2 text-sm font-semibold text-slate-800">{product.name}</p>

                        <div className="mt-3 flex items-center gap-1 text-amber-400">
                          {Array.from({ length: 5 }).map((_, index) => (
                            <Star key={index} className={`h-3.5 w-3.5 ${index < Math.round(product.rating) ? "fill-current" : "text-slate-300 fill-none"}`} />
                          ))}
                          <span className="ml-1 text-xs font-medium text-slate-500">{product.rating}</span>
                        </div>

                        <div className="mt-auto pt-3">
                          <div className="flex min-h-[42px] items-center justify-between gap-2">
                            <div className="min-w-0 flex items-baseline gap-2">
                              <span className="text-xl font-black text-slate-900">${product.price}</span>
                              <span className="text-sm text-slate-400 line-through">${product.originalPrice}</span>
                            </div>
                            <button
                              onClick={(event) => {
                                event.preventDefault();
                                event.stopPropagation();
                                addToCart({
                                  id: product.id,
                                  name: product.name,
                                  price: product.price,
                                  originalPrice: product.originalPrice,
                                  badge: product.badge,
                                  accent: product.accent,
                                  category: "Robot, Mô hình",
                                });
                              }}
                              className="inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-slate-900 px-2.5 py-2 text-[10px] font-semibold text-white transition hover:bg-slate-800"
                            >
                              Thêm vào giỏ
                            </button>
                          </div>
                        </div>
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>
          </section>

          <section className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm lg:col-span-2">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-500">BÀI VIẾT</p>
                <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900">Bài viết chia sẻ</h2>
              </div>
              <a href="/products" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900">
                Xem tất cả
                <ChevronRight className="h-4 w-4" />
              </a>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {articleCards.map((collection) => (
                <article
                  key={collection.title}
                  className="group overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/70"
                >
                  <div className={`relative h-52 bg-gradient-to-br ${collection.accent} p-4`}>
                    <div className="flex h-full items-start justify-between">
                      <span className="rounded-full bg-white/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-sm">
                        {collection.category}
                      </span>
                      <span className="rounded-full bg-slate-900/20 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-sm">
                        {collection.readTime}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="mb-3 flex flex-wrap items-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em] text-slate-500">
                      <span className="rounded-full bg-slate-100 px-2.5 py-1">AI</span>
                      <span className="rounded-full bg-slate-100 px-2.5 py-1">Robot</span>
                      <span className="rounded-full bg-slate-100 px-2.5 py-1">Tips</span>
                    </div>

                    <h3 className="text-xl font-bold leading-tight text-slate-900 transition group-hover:text-slate-700">
                      {collection.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      {collection.excerpt}
                    </p>

                    <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
                      <span className="text-xs font-medium text-slate-500">5 phút đọc</span>
                      <a href="/products" className="inline-flex items-center gap-2 text-sm font-semibold text-orange-600 transition group-hover:text-orange-700">
                        Đọc tiếp
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>

      <section className="mx-auto mt-8 max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              { title: "Giao hàng nhanh", text: "Vận chuyển trong 24-48h toàn quốc", icon: Truck },
              { title: "Bảo hành rõ ràng", text: "Hỗ trợ chính hãng và đổi trả minh bạch", icon: ShieldCheck },
              { title: "Hỗ trợ 24/7", text: "Tư vấn trước và sau mua hàng", icon: Headphones },
              { title: "Ưu đãi mỗi tháng", text: "Flash sale và combo giá tốt", icon: BadgePercent },
            ].map(({ title, text, icon: Icon }) => (
              <div key={title} className="rounded-[20px] border border-slate-200 bg-slate-50 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-bold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


    </main>
  );
}
