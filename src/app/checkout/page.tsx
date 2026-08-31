import Link from "next/link";
import { getProducts } from "@/lib/storefront-data";

export default async function CheckoutPage() {
  const products = await getProducts();
  const cartItems = products.slice(0, 3);
  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const shipping = 25;
  const discount = 120;
  const total = subtotal + shipping - discount;

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

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="space-y-6">
            <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-black">Thông tin nhận hàng</h2>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <label className="block text-sm font-medium text-slate-700">
                  Họ và tên
                  <input className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-orange-400" defaultValue="Nguyễn Văn A" />
                </label>
                <label className="block text-sm font-medium text-slate-700">
                  Số điện thoại
                  <input className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-orange-400" defaultValue="0909 123 456" />
                </label>
                <label className="block text-sm font-medium text-slate-700 md:col-span-2">
                  Địa chỉ
                  <input className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-orange-400" defaultValue="123 Lê Lợi, Quận 1, Hồ Chí Minh" />
                </label>
              </div>
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-black">Phương thức thanh toán</h2>
              <div className="mt-5 space-y-3">
                {[
                  "Thanh toán khi nhận hàng (COD)",
                  "Thẻ tín dụng / ghi nợ",
                  "Chuyển khoản ngân hàng",
                  "Ví điện tử",
                ].map((method, index) => (
                  <label key={method} className="flex cursor-pointer items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center gap-3">
                      <input type="radio" name="payment" defaultChecked={index === 0} className="h-4 w-4 accent-orange-500" />
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
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3">
                  <div className={`h-14 w-14 rounded-xl bg-gradient-to-br ${item.accent}`} />
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-800">{item.name}</p>
                    <p className="text-xs text-slate-500">1 x ${item.price}</p>
                  </div>
                  <p className="font-bold text-slate-900">${item.price}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-3 text-sm text-slate-600">
              <div className="flex justify-between">
                <span>Tạm tính</span>
                <span>${subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Phí vận chuyển</span>
                <span>${shipping}</span>
              </div>
              <div className="flex justify-between">
                <span>Khuyến mãi</span>
                <span className="text-emerald-600">-${discount}</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-3 text-base font-bold text-slate-900">
                <span>Tổng thanh toán</span>
                <span>${total}</span>
              </div>
            </div>

            <button className="mt-6 w-full rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
              Xác nhận đặt hàng
            </button>
          </aside>
        </div>
      </div>
    </main>
  );
}
