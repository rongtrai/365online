"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";

type ProductItem = {
  id: number;
  name: string;
  category: string;
  stock: number;
  price: number;
  slug: string;
  description: string;
  badge: string;
  accent: string;
  originalPrice: number;
  rating: number;
};

type OrderItem = {
  id: number;
  customerName: string;
  phone: string;
  address: string;
  status: string;
  total: number;
  createdAt: string;
};

type CategoryOption = {
  id: number;
  name: string;
};

const demoOrders: OrderItem[] = [
  { id: 1024, customerName: "Linh Nguyễn", phone: "0909 123 456", address: "HCM", status: "Đang giao", total: 249000, createdAt: new Date().toISOString() },
  { id: 1025, customerName: "Minh Huy", phone: "0912 111 222", address: "Đà Nẵng", status: "Hoàn tất", total: 119000, createdAt: new Date().toISOString() },
  { id: 1026, customerName: "Phương Anh", phone: "0987 654 321", address: "Hà Nội", status: "Chờ xử lý", total: 89000, createdAt: new Date().toISOString() },
];

const lowStock = [
  { name: "Servo Pro", stock: 12 },
  { name: "Vision Sensor", stock: 8 },
  { name: "Kit AI Starter", stock: 6 },
];

const formatMoney = (value: number) => new Intl.NumberFormat("vi-VN").format(value) + "đ";

export default function AdminPage() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [liveProducts, setLiveProducts] = useState<ProductItem[]>([]);
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [form, setForm] = useState({ name: "", price: "", stock: "", category: "Robot, Mô hình", description: "" });
  const [editingProductId, setEditingProductId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

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

    const loadData = async () => {
      try {
        const [productsRes, ordersRes, categoriesRes] = await Promise.all([
          fetch("/api/products"),
          fetch("/api/orders"),
          fetch("/api/categories"),
        ]);

        if (productsRes.ok) {
          const productsData = await productsRes.json();
          setLiveProducts(Array.isArray(productsData) ? productsData.slice(0, 8) : []);
        }

        if (ordersRes.ok) {
          const ordersData = await ordersRes.json();
          setOrders(Array.isArray(ordersData) && ordersData.length > 0 ? ordersData : demoOrders);
        } else {
          setOrders(demoOrders);
        }

        try {
          if (supabase) {
            const { data, error } = await supabase.from("categories").select("*");

            if (error) {
              console.error("Error fetching categories:", error);
              setCategories([]);
              return;
            }

            const mappedCategories = Array.isArray(data)
              ? data
                  .map((category: { id?: number; name?: string }) => ({
                    id: Number(category.id ?? 0),
                    name: String(category.name ?? "Khác"),
                  }))
                  .filter((category) => category.name && category.id)
              : [];

            setCategories(mappedCategories);
            if (mappedCategories.length > 0) {
              setForm((current) => ({
                ...current,
                category: current.category && mappedCategories.some((category) => category.name === current.category)
                  ? current.category
                  : mappedCategories[0].name,
              }));
            }
          } else if (categoriesRes.ok) {
            const categoriesData = await categoriesRes.json();
            const mappedCategories = Array.isArray(categoriesData)
              ? categoriesData
                  .map((category: { id?: number; name?: string }) => ({
                    id: Number(category.id ?? 0),
                    name: String(category.name ?? "Khác"),
                  }))
                  .filter((category) => category.name && category.id)
              : [];
            setCategories(mappedCategories);
            if (mappedCategories.length > 0) {
              setForm((current) => ({
                ...current,
                category: current.category && mappedCategories.some((category) => category.name === current.category)
                  ? current.category
                  : mappedCategories[0].name,
              }));
            }
          }
        } catch (fetchError) {
          console.error("Failed to fetch categories:", fetchError);
          setCategories([]);
        }
      } catch {
        setLiveProducts([]);
        setOrders(demoOrders);
      }
    };

    checkAccess();
    loadData();
    setIsMounted(true);
  }, [router]);

  const handleLogout = () => {
    if (isSupabaseConfigured && supabase) {
      supabase.auth.signOut();
    }
    localStorage.removeItem("365online_demo_user");
    router.push("/login");
  };

  const resetForm = () => {
    setForm({ name: "", price: "", stock: "", category: "Robot, Mô hình", description: "" });
    setEditingProductId(null);
  };

  const handleSubmitProduct = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      const payload = {
        name: form.name,
        price: Number(form.price),
        stock: Number(form.stock),
        category: form.category,
        description: form.description,
        badge: "NEW",
        accent: "from-slate-700 via-slate-800 to-slate-900",
      };

      const response = editingProductId
        ? await fetch(`/api/products/${editingProductId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          })
        : await fetch("/api/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || (editingProductId ? "Không thể cập nhật sản phẩm." : "Không thể thêm sản phẩm."));
      }

      resetForm();
      const refreshed = await fetch("/api/products");
      if (refreshed.ok) {
        const refreshedData = await refreshed.json();
        setLiveProducts(Array.isArray(refreshedData) ? refreshedData.slice(0, 8) : []);
      }
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : editingProductId ? "Không thể cập nhật sản phẩm." : "Không thể thêm sản phẩm.");
    } finally {
      setSaving(false);
    }
  };

  const handleEditProduct = (product: ProductItem) => {
    setEditingProductId(product.id);
    setForm({
      name: product.name,
      price: String(product.price),
      stock: String(product.stock),
      category: product.category,
      description: product.description,
    });
  };

  const handleDeleteProduct = async (id: number) => {
    try {
      await fetch(`/api/products/${id}`, { method: "DELETE" });
      const refreshed = await fetch("/api/products");
      if (refreshed.ok) {
        const refreshedData = await refreshed.json();
        setLiveProducts(Array.isArray(refreshedData) ? refreshedData.slice(0, 8) : []);
      }
    } catch {
      setError("Không thể xóa sản phẩm.");
    }
  };

  const handleOrderStatusChange = async (orderId: number, nextStatus: string) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data?.error || "Không thể cập nhật trạng thái đơn hàng.");
      }

      setOrders((current) =>
        current.map((order) => (order.id === orderId ? { ...order, status: nextStatus } : order))
      );
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Không thể cập nhật trạng thái đơn hàng.");
    }
  };

  const revenue = orders.reduce((sum, order) => sum + order.total, 0);

  if (!isMounted || !isLoggedIn) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-slate-200 bg-white px-8 py-6 shadow-sm">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-teal-600" />
          <p className="text-sm font-medium text-slate-600">Đang kiểm tra quyền truy cập...</p>
        </div>
      </main>
    );
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
            <button onClick={handleLogout} className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
              Đăng xuất
            </button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Doanh thu</p>
            <div className="mt-3 flex items-end justify-between gap-3">
              <h2 className="text-3xl font-black tracking-tight">{formatMoney(revenue)}</h2>
              <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-bold text-emerald-700">+18.2%</span>
            </div>
          </div>
          <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Đơn hàng</p>
            <div className="mt-3 flex items-end justify-between gap-3">
              <h2 className="text-3xl font-black tracking-tight">{orders.length}</h2>
              <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-bold text-emerald-700">+9.8%</span>
            </div>
          </div>
          <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Khách hàng</p>
            <div className="mt-3 flex items-end justify-between gap-3">
              <h2 className="text-3xl font-black tracking-tight">8,490</h2>
              <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-bold text-emerald-700">+12.4%</span>
            </div>
          </div>
          <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Tỷ lệ chuyển đổi</p>
            <div className="mt-3 flex items-end justify-between gap-3">
              <h2 className="text-3xl font-black tracking-tight">4.6%</h2>
              <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-bold text-emerald-700">+0.9%</span>
            </div>
          </div>
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
                  {orders.map((order) => (
                    <tr key={order.id} className="border-t border-slate-200">
                      <td className="px-4 py-3 font-semibold text-slate-900">
                        <Link href={`/orders/${order.id}`} className="text-slate-900 underline underline-offset-4 hover:text-orange-600">
                          #{order.id}
                        </Link>
                      </td>
                      <td className="px-4 py-3">{order.customerName}</td>
                      <td className="px-4 py-3">{formatMoney(order.total)}</td>
                      <td className="px-4 py-3">
                        <select
                          value={order.status}
                          onChange={(event) => handleOrderStatusChange(order.id, event.target.value)}
                          className="rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-bold text-slate-700 outline-none"
                        >
                          <option value="Chờ xử lý">Chờ xử lý</option>
                          <option value="Đang giao">Đang giao</option>
                          <option value="Hoàn tất">Hoàn tất</option>
                          <option value="Hủy">Hủy</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
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
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-black">Quản lý sản phẩm</h2>

              <form onSubmit={handleSubmitProduct} className="mt-4 space-y-3">
                <input
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-orange-400"
                  placeholder="Tên sản phẩm"
                  value={form.name}
                  onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-orange-400"
                    placeholder="Giá"
                    inputMode="numeric"
                    value={form.price}
                    onChange={(event) => setForm((current) => ({ ...current, price: event.target.value }))}
                  />
                  <input
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-orange-400"
                    placeholder="Tồn kho"
                    inputMode="numeric"
                    value={form.stock}
                    onChange={(event) => setForm((current) => ({ ...current, stock: event.target.value }))}
                  />
                </div>
                <select
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-orange-400"
                  value={form.category || ""}
                  onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))}
                >
                  <option value="">-- Chọn danh mục --</option>
                  {categories?.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <textarea
                  className="min-h-[80px] w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-orange-400"
                  placeholder="Mô tả"
                  value={form.description}
                  onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
                />
                {error ? <div className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-700">{error}</div> : null}
                <div className="flex gap-2">
                  <button type="submit" disabled={saving} className="flex-1 rounded-full bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60">
                    {saving ? "Đang lưu..." : editingProductId ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}
                  </button>
                  {editingProductId ? (
                    <button type="button" onClick={resetForm} className="rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700">
                      Hủy
                    </button>
                  ) : null}
                </div>
              </form>

              <div className="mt-5 space-y-3">
                {liveProducts.length === 0 ? (
                  <p className="text-sm text-slate-500">Đang tải dữ liệu sản phẩm...</p>
                ) : (
                  liveProducts.map((product) => (
                    <div key={product.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                      <div className="flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <p className="truncate font-bold text-slate-900">{product.name}</p>
                          <span className="mt-1 inline-flex rounded-full bg-slate-200 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-slate-700">
                            {product.category}
                          </span>
                        </div>
                        <span className="rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-bold text-emerald-700">{product.stock} còn</span>
                      </div>
                      <div className="mt-2 flex items-center justify-between gap-3">
                        <span className="text-sm font-semibold text-slate-700">{formatMoney(product.price)}</span>
                        <div className="flex gap-2">
                          <button onClick={() => handleEditProduct(product)} className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-bold text-slate-700">
                            Sửa
                          </button>
                          <button onClick={() => handleDeleteProduct(product.id)} className="rounded-full border border-rose-200 bg-white px-2.5 py-1 text-[10px] font-bold text-rose-700">
                            Xóa
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
