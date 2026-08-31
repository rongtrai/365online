import Link from "next/link";
import { getCategories, getProducts } from "@/lib/storefront-data";

export default async function ProductsPage() {
  const [categories, products] = await Promise.all([getCategories(), getProducts()]);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">SẢN PHẨM</p>
            <h1 className="mt-2 text-4xl font-black tracking-tight">Danh sách sản phẩm</h1>
          </div>
          <Link
            href="/"
            className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm"
          >
            Về trang chủ
          </Link>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-4">
          {categories.map((category) => (
            <div key={category.name} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-lg font-bold text-slate-900">{category.name}</p>
              <p className="mt-1 text-sm text-slate-500">{category.count} sản phẩm</p>
            </div>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {products.map((product) => (
            <article key={product.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <div className={`h-52 bg-gradient-to-br ${product.accent} p-4`}>
                <div className="flex h-full items-start justify-between">
                  <span className="rounded-full bg-white/20 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-white">
                    {product.badge}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <p className="text-sm font-medium text-slate-500">{product.category}</p>
                <h2 className="mt-2 text-xl font-bold text-slate-900">{product.name}</h2>

                <div className="mt-3 flex items-center gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <span key={index}>★</span>
                  ))}
                  <span className="ml-1 text-xs text-slate-500">{product.rating}</span>
                </div>

                <div className="mt-4 flex items-end justify-between gap-2">
                  <div>
                    <span className="text-2xl font-black text-slate-900">${product.price}</span>
                    <span className="ml-2 text-sm text-slate-400 line-through">${product.originalPrice}</span>
                  </div>
                  <Link
                    href={`/products/${product.id}`}
                    className="rounded-full bg-slate-900 px-3 py-2 text-xs font-semibold text-white"
                  >
                    Xem chi tiết
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
