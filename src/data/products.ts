export type Product = {
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

export const categories = [
  { name: "Robot, Mô hình", count: 24, accent: "from-sky-500 via-cyan-500 to-teal-500" },
  { name: "Linh kiện, Thiết bị", count: 18, accent: "from-violet-500 via-purple-500 to-fuchsia-500" },
  { name: "Phụ kiện Robot", count: 16, accent: "from-amber-400 via-orange-500 to-rose-500" },
  { name: "Kit phát triển", count: 32, accent: "from-emerald-500 via-teal-500 to-cyan-600" },
];

export const products: Product[] = [
  {
    id: 1,
    name: "Đồng hồ thông minh AeroFit Pro",
    slug: "dong-ho-thong-minh-aerofit-pro",
    price: 249,
    originalPrice: 329,
    rating: 4.8,
    badge: "-24%",
    accent: "from-cyan-500 via-sky-500 to-blue-600",
    description: "Đồng hồ thông minh đa năng với theo dõi sức khỏe, nhịp tim và hoạt động thể thao.",
    category: "Robot, Mô hình",
    stock: 18,
  },
  {
    id: 2,
    name: "Tai nghe không dây Nova",
    slug: "tai-nghe-khong-day-nova",
    price: 119,
    originalPrice: 169,
    rating: 4.7,
    badge: "HOT",
    accent: "from-violet-500 via-purple-500 to-fuchsia-600",
    description: "Tai nghe chống ồn tốt, pin bền và âm thanh rõ ràng cho việc học tập và làm việc.",
    category: "Phụ kiện Robot",
    stock: 26,
  },
  {
    id: 3,
    name: "Đèn bàn Luma",
    slug: "den-ban-luma",
    price: 89,
    originalPrice: 129,
    rating: 4.9,
    badge: "MỚI",
    accent: "from-amber-400 via-orange-500 to-rose-500",
    description: "Đèn bàn ánh sáng mềm, tiết kiệm điện, phù hợp cho không gian làm việc và học tập.",
    category: "Linh kiện, Thiết bị",
    stock: 15,
  },
  {
    id: 4,
    name: "Ba lô UrbanFlex",
    slug: "ba-lo-urbanflex",
    price: 139,
    originalPrice: 199,
    rating: 4.6,
    badge: "-18%",
    accent: "from-emerald-500 via-teal-500 to-cyan-600",
    description: "Ba lô chống nước, thiết kế gọn, phù hợp cho đi học, đi làm và đi du lịch ngắn ngày.",
    category: "Phụ kiện Robot",
    stock: 12,
  },
  {
    id: 5,
    name: "Loa Bluetooth Horizon Mini",
    slug: "loa-bluetooth-horizon-mini",
    price: 179,
    originalPrice: 249,
    rating: 4.9,
    badge: "HOT",
    accent: "from-pink-500 via-rose-500 to-orange-500",
    description: "Loa nhỏ gọn nhưng âm thanh mạnh, dễ mang theo và tương thích với mọi thiết bị.",
    category: "Linh kiện, Thiết bị",
    stock: 22,
  },
  {
    id: 6,
    name: "Máy ảnh mini PixelGo",
    slug: "may-anh-mini-pixelgo",
    price: 329,
    originalPrice: 449,
    rating: 4.8,
    badge: "NEW",
    accent: "from-indigo-500 via-purple-500 to-violet-600",
    description: "Máy ảnh cầm tay nhỏ gọn, sắc nét, phù hợp ghi lại khoảnh khắc và thử nghiệm maker.",
    category: "Kits phát triển",
    stock: 9,
  },
  {
    id: 7,
    name: "Bàn phím cơ KeyPad X",
    slug: "ban-phim-co-keypad-x",
    price: 219,
    originalPrice: 299,
    rating: 4.7,
    badge: "-15%",
    accent: "from-slate-700 via-slate-800 to-slate-900",
    description: "Bàn phím cơ LED, hành trình gõ tốt, phù hợp cho lập trình và chơi game.",
    category: "Robot, Mô hình",
    stock: 20,
  },
  {
    id: 8,
    name: "Ghế làm việc FlexSeat",
    slug: "ghe-lam-viec-flexseat",
    price: 259,
    originalPrice: 349,
    rating: 4.6,
    badge: "MỚI",
    accent: "from-cyan-500 via-teal-500 to-emerald-600",
    description: "Ghế làm việc thoải mái, thiết kế tối ưu cho không gian sáng tạo và làm việc lâu.",
    category: "Thiết bị văn phòng",
    stock: 14,
  },
  {
    id: 9,
    name: "Màn hình văn phòng ViewMax",
    slug: "man-hinh-van-phong-viewmax",
    price: 489,
    originalPrice: 629,
    rating: 4.9,
    badge: "-20%",
    accent: "from-blue-500 via-cyan-500 to-sky-600",
    description: "Màn hình hiển thị sắc nét, rộng và phù hợp cho làm việc sáng tạo và thiết kế.",
    category: "Linh kiện, Thiết bị",
    stock: 11,
  },
  {
    id: 10,
    name: "Đèn LED Trang trí NeoGlow",
    slug: "den-led-trang-tri-neoglow",
    price: 79,
    originalPrice: 119,
    rating: 4.5,
    badge: "HOT",
    accent: "from-yellow-400 via-orange-400 to-red-500",
    description: "Đèn LED trang trí làm không gian làm việc, phòng ngủ và studio thêm sinh động.",
    category: "Phụ kiện Robot",
    stock: 34,
  },
];

export const featuredProducts = products.slice(0, 8);
