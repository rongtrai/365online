"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "DEMO";

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900">
      <div className="mx-auto max-w-3xl rounded-[28px] border border-emerald-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl">✓</div>
        <p className="mt-5 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">Đặt hàng thành công</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-900">Cảm ơn bạn đã mua sắm!</h1>
        <p className="mt-4 text-base text-slate-600">
          Đơn hàng của bạn đã được ghi nhận. Mã đơn: <span className="font-bold text-slate-900">#{orderId}</span>
        </p>

        <div className="mt-8 grid gap-4 rounded-[24px] border border-slate-200 bg-slate-50 p-6 text-left sm:grid-cols-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Trạng thái</p>
            <p className="mt-2 font-bold text-slate-900">Chờ xử lý</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Phương thức</p>
            <p className="mt-2 font-bold text-slate-900">COD</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Ngày đặt</p>
            <p className="mt-2 font-bold text-slate-900">Hôm nay</p>
          </div>
        </div>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/products" className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white">
            Tiếp tục mua sắm
          </Link>
          <Link href="/" className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700">
            Về trang chủ
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900"><div className="mx-auto max-w-3xl rounded-[28px] border border-slate-200 bg-white p-8 text-center shadow-sm">Đang tải xác nhận đơn hàng...</div></main>}>
      <CheckoutSuccessContent />
    </Suspense>
  );
}
