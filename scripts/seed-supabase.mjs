import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ptqgeulmqfuzvoqbbiik.supabase.co';
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0cWdldWxtcWZ1enZvcWJiaWlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgxNDY5ODIsImV4cCI6MjEwMzcyMjk4Mn0.VO7AbgpxSPtTO-Aov6MrG0ZyNssiGeweXpk468fWDHI';

const supabase = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const categories = [
  { name: 'Robot, Mô hình', count: 24, accent: 'from-sky-500 via-cyan-500 to-teal-500' },
  { name: 'Linh kiện, Thiết bị', count: 18, accent: 'from-violet-500 via-purple-500 to-fuchsia-500' },
  { name: 'Phụ kiện Robot', count: 16, accent: 'from-amber-400 via-orange-500 to-rose-500' },
  { name: 'Kit phát triển', count: 32, accent: 'from-emerald-500 via-teal-500 to-cyan-600' },
];

const products = [
  {
    name: 'Đồng hồ thông minh AeroFit Pro',
    slug: 'dong-ho-thong-minh-aerofit-pro',
    description: 'Đồng hồ thông minh đa năng với theo dõi sức khỏe, nhịp tim và hoạt động thể thao.',
    price: 249,
    original_price: 329,
    rating: 4.8,
    badge: '-24%',
    accent: 'from-cyan-500 via-sky-500 to-blue-600',
    category: 'Robot, Mô hình',
    stock: 18,
  },
  {
    name: 'Tai nghe không dây Nova',
    slug: 'tai-nghe-khong-day-nova',
    description: 'Tai nghe chống ồn tốt, pin bền và âm thanh rõ ràng cho việc học tập và làm việc.',
    price: 119,
    original_price: 169,
    rating: 4.7,
    badge: 'HOT',
    accent: 'from-violet-500 via-purple-500 to-fuchsia-600',
    category: 'Phụ kiện Robot',
    stock: 26,
  },
  {
    name: 'Đèn bàn Luma',
    slug: 'den-ban-luma',
    description: 'Đèn bàn ánh sáng mềm, tiết kiệm điện, phù hợp cho không gian làm việc và học tập.',
    price: 89,
    original_price: 129,
    rating: 4.9,
    badge: 'MỚI',
    accent: 'from-amber-400 via-orange-500 to-rose-500',
    category: 'Linh kiện, Thiết bị',
    stock: 15,
  },
  {
    name: 'Ba lô UrbanFlex',
    slug: 'ba-lo-urbanflex',
    description: 'Ba lô chống nước, thiết kế gọn, phù hợp cho đi học, đi làm và đi du lịch ngắn ngày.',
    price: 139,
    original_price: 199,
    rating: 4.6,
    badge: '-18%',
    accent: 'from-emerald-500 via-teal-500 to-cyan-600',
    category: 'Phụ kiện Robot',
    stock: 12,
  },
  {
    name: 'Loa Bluetooth Horizon Mini',
    slug: 'loa-bluetooth-horizon-mini',
    description: 'Loa nhỏ gọn nhưng âm thanh mạnh, dễ mang theo và tương thích với mọi thiết bị.',
    price: 179,
    original_price: 249,
    rating: 4.9,
    badge: 'HOT',
    accent: 'from-pink-500 via-rose-500 to-orange-500',
    category: 'Linh kiện, Thiết bị',
    stock: 22,
  },
  {
    name: 'Máy ảnh mini PixelGo',
    slug: 'may-anh-mini-pixelgo',
    description: 'Máy ảnh cầm tay nhỏ gọn, sắc nét, phù hợp ghi lại khoảnh khắc và thử nghiệm maker.',
    price: 329,
    original_price: 449,
    rating: 4.8,
    badge: 'NEW',
    accent: 'from-indigo-500 via-purple-500 to-violet-600',
    category: 'Kit phát triển',
    stock: 9,
  },
  {
    name: 'Bàn phím cơ KeyPad X',
    slug: 'ban-phim-co-keypad-x',
    description: 'Bàn phím cơ LED, hành trình gõ tốt, phù hợp cho lập trình và chơi game.',
    price: 219,
    original_price: 299,
    rating: 4.7,
    badge: '-15%',
    accent: 'from-slate-700 via-slate-800 to-slate-900',
    category: 'Robot, Mô hình',
    stock: 20,
  },
  {
    name: 'Ghế làm việc FlexSeat',
    slug: 'ghe-lam-viec-flexseat',
    description: 'Ghế làm việc thoải mái, thiết kế tối ưu cho không gian sáng tạo và làm việc lâu.',
    price: 259,
    original_price: 349,
    rating: 4.6,
    badge: 'MỚI',
    accent: 'from-cyan-500 via-teal-500 to-emerald-600',
    category: 'Thiết bị văn phòng',
    stock: 14,
  },
  {
    name: 'Màn hình văn phòng ViewMax',
    slug: 'man-hinh-van-phong-viewmax',
    description: 'Màn hình hiển thị sắc nét, rộng và phù hợp cho làm việc sáng tạo và thiết kế.',
    price: 489,
    original_price: 629,
    rating: 4.9,
    badge: '-20%',
    accent: 'from-blue-500 via-cyan-500 to-sky-600',
    category: 'Linh kiện, Thiết bị',
    stock: 11,
  },
  {
    name: 'Đèn LED Trang trí NeoGlow',
    slug: 'den-led-trang-tri-neoglow',
    description: 'Đèn LED trang trí làm không gian làm việc, phòng ngủ và studio thêm sinh động.',
    price: 79,
    original_price: 119,
    rating: 4.5,
    badge: 'HOT',
    accent: 'from-yellow-400 via-orange-400 to-red-500',
    category: 'Phụ kiện Robot',
    stock: 34,
  },
];

try {
  const { error: categoryError } = await supabase.from('categories').insert(categories);
  if (categoryError) {
    console.error('CATEGORY_ERROR', categoryError.message);
    process.exitCode = 1;
  } else {
    console.log('Inserted categories');
  }

  const { error: productError } = await supabase.from('products').upsert(products, { onConflict: 'slug' });
  if (productError) {
    console.error('PRODUCT_ERROR', productError.message);
    process.exitCode = 1;
  } else {
    console.log('Inserted or updated products');
  }
} catch (error) {
  console.error('SEED_FAILURE', error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
