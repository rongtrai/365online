import Link from "next/link";
import { notFound } from "next/navigation";
import { getOrderById } from "@/lib/storefront-data";

type OrderDetailPageProps = {
  params: Promise<{ id: string }>;
};

const formatMoney = (value: number) => new Intl.NumberFormat("vi-VN").format(value) + "đ";

export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
  const { id } = await params;
  const orderId = Number(id);
  const detail = await getOrderById(orderId);

  if (!detail) {
    notFound();
  }

  const { order, items } = detail;
  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const shipping = 25000;
  const total = subtotal + shipping;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">ĐƠN HÀNG</p>
            <h1 className="mt-2 text-4xl font-black tracking-tight">#{order.id}</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/admin" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700">
              Quay lại admin
            </Link>
            <Link href="/products" className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
              Tiếp tục mua sắm
            </Link>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <section className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between gap-3">
              <h2 className="text-2xl font-black">Chi tiết đơn hàng</h2>
              <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-700">{order.status}</span>
            </div>

            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${item.productAccent}`} />
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-lg font-bold text-slate-900">{item.productName}</p>
                    <p className="mt-1 text-sm text-slate-500">{item.productCategory}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-500">SL: {item.quantity}</p>
                    <p className="mt-1 text-base font-black text-slate-900">{formatMoney(item.unitPrice * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-black">Thông tin khách hàng</h2>
              <div className="mt-5 space-y-3 text-sm text-slate-600">
                <div>
                  <p className="text-slate-400">Khách hàng</p>
                  <p className="mt-1 font-bold text-slate-900">{order.customerName}</p>
                </div>
                <div>
                  <p className="text-slate-400">Số điện thoại</p>
                  <p className="mt-1 font-bold text-slate-900">{order.phone}</p>
                </div>
                <div>
                  <p className="text-slate-400">Địa chỉ</p>
                  <p className="mt-1 font-bold text-slate-900">{order.address}</p>
                </div>
              </div>
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-black">Tóm tắt thanh toán</h2>
              <div className="mt-5 space-y-3 text-sm text-slate-600">
                <div className="flex justify-between">
                  <span>Tạm tính</span>
                  <span>{formatMoney(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Phí vận chuyển</span>
                  <span>{formatMoney(shipping)}</span>
                </div>
                <div className="flex justify-between border-t border-slate-200 pt-3 text-base font-bold text-slate-900">
                  <span>Tổng cộng</span>
                  <span>{formatMoney(total)}</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
