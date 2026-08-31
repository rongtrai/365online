-- Run this in Supabase SQL editor
-- Purpose: allow the demo storefront to read/write via the anon key while the project is in development

alter table if exists public.categories disable row level security;
alter table if exists public.products disable row level security;
alter table if exists public.orders disable row level security;
alter table if exists public.order_items disable row level security;

-- Optional safety: make the tables accessible to the anon role for this demo setup
grant usage on schema public to anon;
grant all on table public.categories to anon;
grant all on table public.products to anon;
grant all on table public.orders to anon;
grant all on table public.order_items to anon;

-- Seed the catalog if needed
insert into public.categories (name, count, accent)
values
  ('Robot, Mô hình', 24, 'from-sky-500 via-cyan-500 to-teal-500'),
  ('Linh kiện, Thiết bị', 18, 'from-violet-500 via-purple-500 to-fuchsia-500'),
  ('Phụ kiện Robot', 16, 'from-amber-400 via-orange-500 to-rose-500'),
  ('Kit phát triển', 32, 'from-emerald-500 via-teal-500 to-cyan-600')
on conflict do nothing;

insert into public.products (name, slug, description, price, original_price, rating, badge, accent, category, stock)
values
  ('Đồng hồ thông minh AeroFit Pro', 'dong-ho-thong-minh-aerofit-pro', 'Đồng hồ thông minh đa năng với theo dõi sức khỏe, nhịp tim và hoạt động thể thao.', 249, 329, 4.8, '-24%', 'from-cyan-500 via-sky-500 to-blue-600', 'Robot, Mô hình', 18),
  ('Tai nghe không dây Nova', 'tai-nghe-khong-day-nova', 'Tai nghe chống ồn tốt, pin bền và âm thanh rõ ràng cho việc học tập và làm việc.', 119, 169, 4.7, 'HOT', 'from-violet-500 via-purple-500 to-fuchsia-600', 'Phụ kiện Robot', 26),
  ('Đèn bàn Luma', 'den-ban-luma', 'Đèn bàn ánh sáng mềm, tiết kiệm điện, phù hợp cho không gian làm việc và học tập.', 89, 129, 4.9, 'MỚI', 'from-amber-400 via-orange-500 to-rose-500', 'Linh kiện, Thiết bị', 15),
  ('Ba lô UrbanFlex', 'ba-lo-urbanflex', 'Ba lô chống nước, thiết kế gọn, phù hợp cho đi học, đi làm và đi du lịch ngắn ngày.', 139, 199, 4.6, '-18%', 'from-emerald-500 via-teal-500 to-cyan-600', 'Phụ kiện Robot', 12),
  ('Loa Bluetooth Horizon Mini', 'loa-bluetooth-horizon-mini', 'Loa nhỏ gọn nhưng âm thanh mạnh, dễ mang theo và tương thích với mọi thiết bị.', 179, 249, 4.9, 'HOT', 'from-pink-500 via-rose-500 to-orange-500', 'Linh kiện, Thiết bị', 22),
  ('Máy ảnh mini PixelGo', 'may-anh-mini-pixelgo', 'Máy ảnh cầm tay nhỏ gọn, sắc nét, phù hợp ghi lại khoảnh khắc và thử nghiệm maker.', 329, 449, 4.8, 'NEW', 'from-indigo-500 via-purple-500 to-violet-600', 'Kit phát triển', 9),
  ('Bàn phím cơ KeyPad X', 'ban-phim-co-keypad-x', 'Bàn phím cơ LED, hành trình gõ tốt, phù hợp cho lập trình và chơi game.', 219, 299, 4.7, '-15%', 'from-slate-700 via-slate-800 to-slate-900', 'Robot, Mô hình', 20),
  ('Ghế làm việc FlexSeat', 'ghe-lam-viec-flexseat', 'Ghế làm việc thoải mái, thiết kế tối ưu cho không gian sáng tạo và làm việc lâu.', 259, 349, 4.6, 'MỚI', 'from-cyan-500 via-teal-500 to-emerald-600', 'Thiết bị văn phòng', 14),
  ('Màn hình văn phòng ViewMax', 'man-hinh-van-phong-viewmax', 'Màn hình hiển thị sắc nét, rộng và phù hợp cho làm việc sáng tạo và thiết kế.', 489, 629, 4.9, '-20%', 'from-blue-500 via-cyan-500 to-sky-600', 'Linh kiện, Thiết bị', 11),
  ('Đèn LED Trang trí NeoGlow', 'den-led-trang-tri-neoglow', 'Đèn LED trang trí làm không gian làm việc, phòng ngủ và studio thêm sinh động.', 79, 119, 4.5, 'HOT', 'from-yellow-400 via-orange-400 to-red-500', 'Phụ kiện Robot', 34)
on conflict (slug) do nothing;
