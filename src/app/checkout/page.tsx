"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import { useCartStore } from "@/lib/cart-store";

const paymentMethods = [
  "Thanh toán khi nhận hàng (COD)",
  "Thẻ tín dụng / ghi nợ",
  "Chuyển khoản ngân hàng",
  "Ví điện tử",
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart } = useCartStore();
  const [fullName, setFullName] = useState("Nguyễn Văn A");
  const [phone, setPhone] = useState("0909 123 456");
  const [address, setAddress] = useState("123 Lê Lợi, Quận 1, Hồ Chí Minh");
  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const subtotal = useMemo(() => items.reduce((sum, item) => sum + item.price * item.quantity, 0), [items]);
  const shipping = items.length === 0 ? 0 : 25;
  const discount = items.length === 0 ? 0 : 120;
  const total = subtotal + shipping - discount;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (items.length === 0) {
      setError("Giỏ hàng trống. Hãy thêm sản phẩm trước khi đặt hàng.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerName: fullName,
          phone,
          address,
          paymentMethod,
          items: items.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
            unitPrice: item.price,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Đặt hàng thất bại.");
      }

      clearCart();
      router.push(`/checkout/success?orderId=${encodeURIComponent(data.order.id)}`);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Đặt hàng thất bại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">THANH TOÁN</p>
            <h1 className="mt-2 text-4xl font-black tracking-tight">Xác nhận đơn hàng</h1>
          </div>
          <Link href="/cart" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">
            Quay lại giỏ hàng
          </Link>
        </div>

        {items.length === 0 && !success ? (
          <div className="rounded-[24px] border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
            <p className="text-lg font-bold text-slate-800">Giỏ hàng của bạn đang trống</p>
            <p className="mt-2 text-sm text-slate-500">Hãy chọn một sản phẩm để bắt đầu thanh toán.</p>
            <Link href="/products" className="mt-5 inline-block rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white">
              Tiếp tục mua sắm
            </Link>
          </div>
        ) : (
        <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="space-y-6">
            <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-black">Thông tin nhận hàng</h2>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <label className="block text-sm font-medium text-slate-700">
                  Họ và tên
                  <input
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-orange-400"
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                  />
                </label>
                <label className="block text-sm font-medium text-slate-700">
                  Số điện thoại
                  <input
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-orange-400"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                  />
                </label>
                <label className="block text-sm font-medium text-slate-700 md:col-span-2">
                  Địa chỉ
                  <input
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-orange-400"
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                  />
                </label>
              </div>
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-black">Phương thức thanh toán</h2>
              <div className="mt-5 space-y-3">
                {paymentMethods.map((method) => (
                  <label key={method} className="flex cursor-pointer items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        value={method}
                        checked={paymentMethod === method}
                        onChange={(event) => setPaymentMethod(event.target.value)}
                        className="h-4 w-4 accent-orange-500"
                      />
                      <span className="font-medium text-slate-800">{method}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </section>

          <aside className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-black">Tóm tắt đơn hàng</h2>

            <div className="mt-5 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3">
                  <div className={`h-14 w-14 rounded-xl bg-gradient-to-br ${item.accent ?? "from-slate-700 via-slate-800 to-slate-900"}`} />
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-800">{item.name}</p>
                    <p className="text-xs text-slate-500">{item.quantity} x {new Intl.NumberFormat("vi-VN").format(item.price * 1000)}đ</p>
                  </div>
                  <p className="font-bold text-slate-900">{new Intl.NumberFormat("vi-VN").format(item.price * item.quantity * 1000)}đ</p>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-3 text-sm text-slate-600">
              <div className="flex justify-between">
                <span>Tạm tính</span>
                <span>{new Intl.NumberFormat("vi-VN").format(subtotal * 1000)}đ</span>
              </div>
              <div className="flex justify-between">
                <span>Phí vận chuyển</span>
                <span>{new Intl.NumberFormat("vi-VN").format(shipping * 1000)}đ</span>
              </div>
              <div className="flex justify-between">
                <span>Khuyến mãi</span>
                <span className="text-emerald-600">-{new Intl.NumberFormat("vi-VN").format(discount * 1000)}đ</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-3 text-base font-bold text-slate-900">
                <span>Tổng thanh toán</span>
                <span>{new Intl.NumberFormat("vi-VN").format(total * 1000)}đ</span>
              </div>
            </div>

            {error ? (
              <div className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</div>
            ) : null}

            {success ? (
              <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{success}</div>
            ) : null}

            <button
              type="submit"
              disabled={loading || items.length === 0}
              className="mt-6 w-full rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Đang xử lý..." : "Xác nhận đặt hàng"}
            </button>
          </aside>
        </form>
        )}
      </div>
    </main>
  );
}
