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
import { create } from "zustand";

const useShopStore = create<{
  cartCount: number;
  wishlistIds: number[];
  addToCart: () => void;
  toggleWishlist: (id: number) => void;
}>((set) => ({
  cartCount: 3,
  wishlistIds: [1, 4],
  addToCart: () =>
    set((state) => ({
      cartCount: state.cartCount + 1,
    })),
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

const categories = [
  { name: "Robot, Mô hình", count: "24 sản phẩm", accent: "from-sky-500 via-cyan-500 to-teal-500" },
  { name: "Linh kiện, Thiết bị", count: "18 sản phẩm", accent: "from-violet-500 via-purple-500 to-fuchsia-500" },
  { name: "Phụ kiện Robot", count: "16 sản phẩm", accent: "from-amber-400 via-orange-500 to-rose-500" },
  { name: "Kit phát triển", count: "32 sản phẩm", accent: "from-emerald-500 via-teal-500 to-cyan-600" },
  { name: "Tool, Code, Phần mềm", count: "14 sản phẩm", accent: "from-pink-500 via-rose-500 to-red-500" },
];

const articles = [
  {
    title: "Cách các thương hiệu biến sự kiện ra mắt thành khoảnh khắc truyền thông",
    category: "Chiến lược PR",
    readTime: "4 phút đọc",
    excerpt:
      "Khám phá các hook truyền thông, hợp tác creator và chiến lược giữ chân khách hàng giúp sản phẩm luôn được chú ý sau ngày ra mắt.",
    accent: "from-indigo-500 via-violet-500 to-fuchsia-500",
  },
  {
    title: "5 góc nhìn đánh giá sản phẩm mà người mua tin trước khi thanh toán",
    category: "Đánh giá",
    readTime: "6 phút đọc",
    excerpt:
      "Phân tích thực tế về các đánh giá, bằng chứng và so sánh mà người đọc quan tâm khi chọn các thiết bị cao cấp.",
    accent: "from-orange-400 via-pink-500 to-rose-500",
  },
  {
    title: "Sổ tay khuyến mãi theo mùa để tăng trưởng bán hàng trong quý 4",
    category: "Marketing",
    readTime: "5 phút đọc",
    excerpt:
      "Thời điểm triển khai chiến dịch, cách chồng ưu đãi và remarketing để chương trình khuyến mãi mang cảm giác cao cấp thay vì gây ồn.",
    accent: "from-emerald-500 via-teal-500 to-cyan-500",
  },
];

export default function Home() {
  const cartCount = useShopStore((state) => state.cartCount);
  const wishlistIds = useShopStore((state) => state.wishlistIds);
  const addToCart = useShopStore((state) => state.addToCart);
  const toggleWishlist = useShopStore((state) => state.toggleWishlist);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 py-4">
            <div className="flex items-center gap-3">
              <button className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-100 text-slate-700 lg:hidden">
                <Menu className="h-5 w-5" />
              </button>

              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 via-pink-500 to-orange-400 text-[9px] font-black tracking-[-0.12em] text-white shadow-lg shadow-orange-200">
                  365
                </div>
                <div className="leading-none">
                  <p className="text-xl font-black tracking-[-0.06em] text-slate-900">365online</p>
                </div>
              </div>
            </div>

            <div className="hidden flex-1 items-center justify-center md:flex">
              <label className="flex w-full max-w-2xl items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-4 py-3 shadow-sm transition focus-within:border-orange-400 focus-within:bg-white focus-within:shadow-md">
                <Search className="h-4 w-4 text-slate-400" />
                <input
                  aria-label="Search products"
                  className="w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
                  placeholder="Tìm kiếm sản phẩm, bài viết, ưu đãi..."
                />
              </label>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <button className="relative inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900 sm:px-4">
                <Heart className="h-4 w-4" />
                <span className="hidden sm:inline">Yêu thích</span>
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white">
                  {wishlistIds.length}
                </span>
              </button>

              <button className="relative inline-flex items-center gap-2 rounded-full bg-slate-900 px-3 py-2 text-sm font-medium text-white shadow-lg shadow-slate-200 transition hover:bg-slate-800 sm:px-4">
                <ShoppingCart className="h-4 w-4" />
                <span className="hidden sm:inline">Giỏ hàng</span>
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              </button>
            </div>
          </div>

          <nav className="flex items-center justify-between gap-4 overflow-x-auto border-t border-slate-100 py-3 text-sm font-medium text-slate-600">
            <div className="flex items-center gap-6 whitespace-nowrap">
              <div className="group relative">
                <a href="#" className="text-slate-900 underline decoration-orange-500 underline-offset-8">
                  Cửa hàng
                </a>
                <div className="invisible absolute left-0 top-full z-20 mt-3 w-72 rounded-2xl border border-slate-200 bg-white p-3 opacity-0 shadow-xl shadow-slate-200/70 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                  <div className="space-y-2 text-sm text-slate-700">
                    <a href="#" className="block rounded-xl px-3 py-2 transition hover:bg-slate-100 hover:text-slate-900">Robot, Mô hình</a>
                    <a href="#" className="block rounded-xl px-3 py-2 transition hover:bg-slate-100 hover:text-slate-900">Linh kiện, Thiết bị</a>
                    <a href="#" className="block rounded-xl px-3 py-2 transition hover:bg-slate-100 hover:text-slate-900">Phụ kiện Robot</a>
                    <a href="#" className="block rounded-xl px-3 py-2 transition hover:bg-slate-100 hover:text-slate-900">Kit phát triển</a>
                    <a href="#" className="block rounded-xl px-3 py-2 transition hover:bg-slate-100 hover:text-slate-900">Tool, Code, Phần mềm</a>
                  </div>
                </div>
              </div>
              <a href="#" className="transition hover:text-slate-900">
                Tool, Code, Phần mềm
              </a>
              <a href="#" className="transition hover:text-slate-900">
                Bài viết chia sẻ
              </a>
              <a href="#" className="transition hover:text-slate-900">
                Khuyến mãi
              </a>
            </div>
            <div className="hidden items-center gap-4 whitespace-nowrap text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 md:flex">
              <span>GIAO HÀNG NHANH</span>
              <span>•</span>
              <span>THANH TOÁN AN TOÀN</span>
            </div>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 shadow-[0_30px_80px_-30px_rgba(15,23,42,0.9)]">
          <div className="grid gap-10 px-5 py-8 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:py-10">
            <div className="flex flex-col justify-center">
              <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-orange-200">
                <Sparkles className="h-3.5 w-3.5" />
                Sự kiện ra mắt mùa hè
              </div>

              <h1 className="max-w-xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                Nâng tầm phong cách sống mỗi ngày
              </h1>

              <p className="mt-5 max-w-lg text-base text-slate-300 sm:text-lg">
                Khám phá các sản phẩm công nghệ cao cấp, thiết bị hiện đại và ưu đãi độc quyền dành riêng cho bạn.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/30 transition hover:bg-orange-400">
                  Khám phá ngay
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                  Xem khuyến mãi
                </button>
              </div>

              <div className="mt-8 grid max-w-lg grid-cols-3 gap-4">
                {[
                  ["Miễn phí vận chuyển", "Đơn hàng từ 1.500.000đ"],
                  ["Bảo hành 2 năm", "Bao gồm"],
                  ["Đánh giá 4.9/5", "Đã xác minh"],
                ].map(([title, detail]) => (
                  <div key={title} className="rounded-2xl border border-white/10 bg-white/5 px-3 py-3 backdrop-blur-sm">
                    <p className="text-base font-bold text-white">{title}</p>
                    <p className="mt-1 text-xs text-slate-300">{detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-xl overflow-hidden rounded-[28px] border border-white/10 bg-white/5 p-4 shadow-2xl shadow-slate-950/40">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(251,146,60,0.35),transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.35),transparent_30%)]" />

                <div className="relative rounded-[22px] bg-gradient-to-br from-slate-200 via-white to-slate-100 p-4 shadow-inner">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Ưu đãi nổi bật</p>
                      <p className="mt-1 text-xl font-black text-slate-900">Thiết lập nhà thông minh</p>
                    </div>
                    <div className="flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-700">
                      <BadgePercent className="h-3.5 w-3.5" />
                      39% GIẢM
                    </div>
                  </div>

                  <div className="grid h-72 grid-cols-2 gap-4">
                    <div className="rounded-[22px] bg-gradient-to-br from-cyan-500 via-sky-500 to-blue-600 p-3 text-white shadow-lg shadow-blue-500/25">
                      <div className="flex h-full flex-col justify-between">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100">Âm thanh</span>
                          <Heart className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-3xl font-black">3.999.000đ</p>
                          <p className="text-sm text-cyan-100">Wireless Pro</p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-[22px] bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-600 p-3 text-white shadow-lg shadow-violet-500/25">
                      <div className="flex h-full flex-col justify-between">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-100">Đồng hồ</span>
                          <Sparkles className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-3xl font-black">5.999.000đ</p>
                          <p className="text-sm text-violet-100">AeroWatch</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">Tiết kiệm khi mua bộ</p>
                      <p className="text-xs text-slate-500">Tiết kiệm tới 4,5 triệu cho combo</p>
                    </div>
                    <button className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-3 py-2 text-xs font-semibold text-white">
                      Mua trọn bộ
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 flex min-h-[90px] items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-100 px-4 text-center text-sm font-medium text-slate-500 shadow-sm">
          <span className="tracking-[0.12em] text-slate-400">Không gian quảng cáo / Google Ads</span>
        </section>

        <section className="mt-10">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">NỔI BẬT</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900">Sản phẩm bán chạy nhất tuần</h2>
            </div>
            <button className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900">
              Xem tất cả
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {products.map((product) => {
              const isSaved = wishlistIds.includes(product.id);

              return (
                <article
                  key={product.id}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/80"
                >
                  <div className="relative overflow-hidden rounded-2xl bg-slate-100">
                    <div className={`h-52 bg-gradient-to-br ${product.accent} p-4`}>
                      <div className="flex h-full items-start justify-between">
                        <div className="inline-flex rounded-full bg-white/20 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-white">
                          {product.badge}
                        </div>
                        <button
                          aria-label={`Toggle wishlist for ${product.name}`}
                          onClick={() => toggleWishlist(product.id)}
                          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white backdrop-blur-sm"
                        >
                          <Heart className={`h-4 w-4 ${isSaved ? "fill-current text-rose-200" : ""}`} />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center justify-between gap-2">
                      <p className="line-clamp-2 text-sm font-semibold text-slate-800">{product.name}</p>
                    </div>

                    <div className="mt-3 flex items-center gap-1 text-amber-400">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star key={index} className={`h-3.5 w-3.5 ${index < Math.round(product.rating) ? "fill-current" : "text-slate-300 fill-none"}`} />
                      ))}
                      <span className="ml-1 text-xs font-medium text-slate-500">{product.rating}</span>
                    </div>

                    <div className="mt-3 flex items-end justify-between gap-2">
                      <div>
                        <span className="text-xl font-black text-slate-900">${product.price}</span>
                        <span className="ml-2 text-sm text-slate-400 line-through">${product.originalPrice}</span>
                      </div>
                      <button
                        onClick={addToCart}
                        className="inline-flex items-center justify-center rounded-full bg-slate-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-slate-800"
                      >
                        Thêm vào giỏ
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mt-10">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-500">SẢN PHẨM</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900">Khám phá thêm cho bạn</h2>
            </div>
            <button className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900">
              Xem thêm
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {catalogProducts.map((product) => {
              const isSaved = wishlistIds.includes(product.id);

              return (
                <article
                  key={product.id}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/80"
                >
                  <div className="relative overflow-hidden rounded-2xl bg-slate-100">
                    <div className={`h-52 bg-gradient-to-br ${product.accent} p-4`}>
                      <div className="flex h-full items-start justify-between">
                        <div className="inline-flex rounded-full bg-white/20 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-white">
                          {product.badge}
                        </div>
                        <button
                          aria-label={`Toggle wishlist for ${product.name}`}
                          onClick={() => toggleWishlist(product.id)}
                          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white backdrop-blur-sm"
                        >
                          <Heart className={`h-4 w-4 ${isSaved ? "fill-current text-rose-200" : ""}`} />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center justify-between gap-2">
                      <p className="line-clamp-2 text-sm font-semibold text-slate-800">{product.name}</p>
                    </div>

                    <div className="mt-3 flex items-center gap-1 text-amber-400">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star key={index} className={`h-3.5 w-3.5 ${index < Math.round(product.rating) ? "fill-current" : "text-slate-300 fill-none"}`} />
                      ))}
                      <span className="ml-1 text-xs font-medium text-slate-500">{product.rating}</span>
                    </div>

                    <div className="mt-3 flex items-end justify-between gap-2">
                      <div>
                        <span className="text-xl font-black text-slate-900">${product.price}</span>
                        <span className="ml-2 text-sm text-slate-400 line-through">${product.originalPrice}</span>
                      </div>
                      <button
                        onClick={addToCart}
                        className="inline-flex items-center justify-center rounded-full bg-slate-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-slate-800"
                      >
                        Thêm vào giỏ
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mt-10">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">DANH MỤC</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900">Danh mục robot nổi bật</h2>
            </div>
            <button className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900">
              Xem tất cả
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {categories.map((category) => (
              <button
                key={category.name}
                className="group overflow-hidden rounded-[22px] border border-slate-200 bg-white p-0 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/80"
              >
                <div className={`relative h-28 bg-gradient-to-br ${category.accent} p-4`}>
                  <div className="flex h-full items-start justify-between">
                    <span className="rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-white backdrop-blur-sm">
                      Hot
                    </span>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/10 text-lg text-white backdrop-blur-sm">
                      →
                    </span>
                  </div>
                </div>
                <div className="px-4 py-4">
                  <p className="text-lg font-black text-slate-900">{category.name}</p>
                  <p className="mt-1 text-sm text-slate-500">{category.count}</p>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-[28px] border border-slate-200 bg-gradient-to-r from-orange-50 via-white to-sky-50 p-4 shadow-sm sm:p-6 lg:p-8">
          <div className="flex min-h-[120px] flex-col items-center justify-center rounded-2xl border border-dashed border-orange-200 bg-white/70 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-500">Tài trợ</p>
            <p className="mt-2 text-lg font-bold text-slate-900 sm:text-xl">Banner quảng cáo tài trợ</p>
            <p className="mt-1 text-sm text-slate-500">Vị trí quảng cáo giữa nội dung sản phẩm và bài viết chuyên mục</p>
          </div>
        </section>

        <section className="mt-10">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-500">BÀI VIẾT & TIN TỨC</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900">Bài viết mới nhất & Câu chuyện sản phẩm</h2>
            </div>
            <button className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900">
              Xem tất cả bài viết
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {articles.map((article) => (
              <article key={article.title} className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/70">
                <div className={`relative h-52 bg-gradient-to-br ${article.accent} p-4`}>
                  <div className="flex h-full items-start justify-between">
                    <span className="rounded-full bg-white/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-sm">
                      {article.category}
                    </span>
                    <span className="rounded-full bg-slate-900/20 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-sm">
                      {article.readTime}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-bold leading-tight text-slate-900">{article.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{article.excerpt}</p>

                  <button className="mt-5 inline-flex items-center gap-2 rounded-full bg-orange-50 px-4 py-2.5 text-sm font-semibold text-orange-700 transition hover:bg-orange-100">
                    Đọc bài viết
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      <footer className="mt-16 border-t border-slate-200 bg-slate-950 text-slate-200">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 via-pink-500 to-orange-400 text-[9px] font-black tracking-[-0.12em] text-white shadow-lg shadow-orange-900/30">
                  365
                </div>
                <div className="leading-none">
                  <p className="text-xl font-black tracking-[-0.06em] text-white">365online</p>
                </div>
              </div>

              <p className="mt-5 max-w-sm text-sm leading-6 text-slate-400">
                Khám phá các sản phẩm thiết yếu, thiết bị xu hướng và ưu đãi nổi bật giúp cuộc sống hàng ngày trở nên tiện nghi, hiện đại và đáng tin cậy hơn.
              </p>

              <div className="mt-5 flex items-center gap-3 text-slate-300">
                <a href="#" className="rounded-full border border-slate-700 bg-slate-900 p-2.5 transition hover:border-slate-500 hover:text-white" aria-label="Instagram">
                  <Camera className="h-4 w-4" />
                </a>
                <a href="#" className="rounded-full border border-slate-700 bg-slate-900 p-2.5 transition hover:border-slate-500 hover:text-white" aria-label="Facebook">
                  <Globe className="h-4 w-4" />
                </a>
                <a href="#" className="rounded-full border border-slate-700 bg-slate-900 p-2.5 transition hover:border-slate-500 hover:text-white" aria-label="Chat">
                  <MessageCircle className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-slate-400">Chăm sóc khách hàng</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-300">
                <li><a href="#" className="transition hover:text-white">Liên hệ hỗ trợ</a></li>
                <li><a href="#" className="transition hover:text-white">Vận chuyển & giao hàng</a></li>
                <li><a href="#" className="transition hover:text-white">Đổi trả & hoàn tiền</a></li>
                <li><a href="#" className="transition hover:text-white">Theo dõi đơn hàng</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-slate-400">Công ty</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-300">
                <li><a href="#" className="transition hover:text-white">Về chúng tôi</a></li>
                <li><a href="#" className="transition hover:text-white">Chương trình đối tác</a></li>
                <li><a href="#" className="transition hover:text-white">Chính sách bảo mật</a></li>
                <li><a href="#" className="transition hover:text-white">Điều khoản & điều kiện</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-slate-400">Thanh toán</h3>
              <div className="mt-4 grid max-w-xs grid-cols-4 gap-3">
                {[
                  ["Visa", "bg-gradient-to-br from-blue-600 to-indigo-700"],
                  ["PayPal", "bg-gradient-to-br from-sky-500 to-blue-600"],
                  ["Momo", "bg-gradient-to-br from-pink-500 to-rose-500"],
                  ["COD", "bg-gradient-to-br from-emerald-500 to-teal-600"],
                ].map(([label, color]) => (
                  <div key={label} className={`flex h-11 items-center justify-center rounded-xl text-[10px] font-black uppercase tracking-[0.12em] text-white ${color}`}>
                    {label}
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-3 text-sm text-slate-300">
                <div className="flex items-center gap-3">
                  <Truck className="h-4 w-4 text-orange-400" />
                  <span>Miễn phí vận chuyển cho đơn từ 1.500.000đ</span>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  <span>Bảo mật thanh toán an toàn</span>
                </div>
                <div className="flex items-center gap-3">
                  <Headphones className="h-4 w-4 text-sky-400" />
                  <span>Hỗ trợ khách hàng 24/7</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4 border-t border-slate-800 pt-6 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 365online. Mọi quyền được bảo lưu.</p>
            <div className="flex items-center gap-5">
              <span className="flex items-center gap-2"><CreditCard className="h-4 w-4" /> Thanh toán an toàn</span>
              <span>support@365online.com</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
