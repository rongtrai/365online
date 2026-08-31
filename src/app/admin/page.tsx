"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";

const stats = [
  { label: "Doanh thu", value: "$128.4K", change: "+18.2%" },
  { label: "Đơn hàng", value: "1,284", change: "+9.8%" },
  { label: "Khách hàng", value: "8,490", change: "+12.4%" },
  { label: "Tỷ lệ chuyển đổi", value: "4.6%", change: "+0.9%" },
];

const recentOrders = [
  { id: "#1024", customer: "Linh Nguyễn", total: "$249", status: "Đang giao" },
  { id: "#1025", customer: "Minh Huy", total: "$119", status: "Hoàn tất" },
  { id: "#1026", customer: "Phương Anh", total: "$89", status: "Chờ xử lý" },
  { id: "#1027", customer: "Quang Vũ", total: "$329", status: "Hoàn tất" },
];

const lowStock = [
  { name: "Servo Pro", stock: 12 },
  { name: "Vision Sensor", stock: 8 },
  { name: "Kit AI Starter", stock: 6 },
];

export default function AdminPage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAccess = async () => {
      if (isSupabaseConfigured && supabase) {
        const { data } = await supabase.auth.getSession();
        setIsLoggedIn(Boolean(data.session));
        if (!data.session) {
          router.replace("/login");
        }
        return;
      }

      const demoUser = localStorage.getItem("365online_demo_user");
      const loggedIn = Boolean(demoUser);
      setIsLoggedIn(loggedIn);
      if (!loggedIn) {
        router.replace("/login");
      }
    };

    checkAccess();
  }, [router]);

  const handleLogout = () => {
    if (isSupabaseConfigured && supabase) {
      supabase.auth.signOut();
    }
    localStorage.removeItem("365online_demo_user");
    router.push("/login");
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">ADMIN</p>
            <h1 className="mt-2 text-4xl font-black tracking-tight">Dashboard quản trị</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">
              Về trang chủ
            </Link>
            <button
              onClick={handleLogout}
              className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
            >
              Đăng xuất
            </button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">{stat.label}</p>
              <div className="mt-3 flex items-end justify-between gap-3">
                <h2 className="text-3xl font-black tracking-tight">{stat.value}</h2>
                <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-bold text-emerald-700">{stat.change}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
          <section className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-2xl font-black">Đơn hàng gần đây</h2>
              <button className="rounded-full bg-slate-900 px-3 py-2 text-xs font-semibold text-white">Xuất báo cáo</button>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-slate-100 text-slate-600">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Mã đơn</th>
                    <th className="px-4 py-3 font-semibold">Khách hàng</th>
                    <th className="px-4 py-3 font-semibold">Tổng tiền</th>
                    <th className="px-4 py-3 font-semibold">Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-t border-slate-200">
                      <td className="px-4 py-3 font-semibold text-slate-900">{order.id}</td>
                      <td className="px-4 py-3">{order.customer}</td>
                      <td className="px-4 py-3">{order.total}</td>
                      <td className="px-4 py-3">
                        <span className="rounded-full bg-orange-100 px-2.5 py-1 text-xs font-bold text-orange-700">{order.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <aside className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-black">Sản phẩm sắp hết</h2>
            <div className="mt-5 space-y-4">
              {lowStock.map((item) => (
                <div key={item.name} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-bold text-slate-900">{item.name}</p>
                    <span className="rounded-full bg-rose-100 px-2 py-1 text-xs font-bold text-rose-700">{item.stock} còn</span>
                  </div>
                  <div className="mt-3 h-2.5 rounded-full bg-slate-200">
                    <div className="h-2.5 rounded-full bg-orange-500" style={{ width: `${Math.min((item.stock / 20) * 100, 100)}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
