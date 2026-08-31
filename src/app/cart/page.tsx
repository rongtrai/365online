"use client";

import Link from "next/link";
import { useCartStore } from "@/lib/cart-store";

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart } = useCartStore();
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = items.length === 0 ? 0 : 25;
  const total = subtotal + shipping;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">GIỎ HÀNG</p>
            <h1 className="mt-2 text-4xl font-black tracking-tight">Giỏ hàng của bạn</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/products" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700">
              Tiếp tục mua sắm
            </Link>
            {items.length > 0 ? (
              <button onClick={clearCart} className="rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700">
                Xóa giỏ
              </button>
            ) : null}
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.5fr_0.8fr]">
          <div className="space-y-4">
            {items.length === 0 ? (
              <div className="rounded-[24px] border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
                <p className="text-lg font-bold text-slate-800">Giỏ hàng trống</p>
                <p className="mt-2 text-sm text-slate-500">Hãy thêm vài sản phẩm để bắt đầu mua sắm.</p>
                <Link href="/products" className="mt-5 inline-block rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white">
                  Mua ngay
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className={`h-24 w-24 rounded-2xl bg-gradient-to-br ${item.accent ?? "from-slate-700 via-slate-800 to-slate-900"}`} />
                  <div className="flex-1">
                    <p className="text-lg font-bold text-slate-900">{item.name}</p>
                    <p className="mt-1 text-sm text-slate-500">{item.category ?? "Sản phẩm"}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button onClick={() => updateQuantity(item.id, -1)} className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-lg">−</button>
                    <span className="w-4 text-center text-sm font-semibold">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-lg">+</button>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-black text-slate-900">{new Intl.NumberFormat("vi-VN").format(item.price * item.quantity * 1000)}đ</p>
                    <button onClick={() => removeItem(item.id)} className="mt-2 text-xs font-semibold text-rose-600">Xóa</button>
                  </div>
                </div>
              ))
            )}
          </div>

          <aside className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-black">Tóm tắt đơn hàng</h2>
            <div className="mt-6 space-y-3 text-sm text-slate-600">
              <div className="flex justify-between">
                <span>Tạm tính</span>
                <span>{new Intl.NumberFormat("vi-VN").format(subtotal * 1000)}đ</span>
              </div>
              <div className="flex justify-between">
                <span>Phí vận chuyển</span>
                <span>{new Intl.NumberFormat("vi-VN").format(shipping * 1000)}đ</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-3 text-base font-bold text-slate-900">
                <span>Tổng</span>
                <span>{new Intl.NumberFormat("vi-VN").format(total * 1000)}đ</span>
              </div>
            </div>

            <Link href="/checkout" className="mt-6 block rounded-full bg-slate-900 px-4 py-3 text-center text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60" aria-disabled={items.length === 0}>
              Tiến hành thanh toán
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
}
