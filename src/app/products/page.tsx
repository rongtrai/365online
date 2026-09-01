import Link from "next/link";
import { getCategories, getProducts } from "@/lib/storefront-data";

type ProductsPageProps = {
  searchParams?: Promise<{ category?: string; q?: string; sort?: string }> | { category?: string; q?: string; sort?: string };
};

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const resolvedParams = await Promise.resolve(searchParams ?? {});
  const rawCategory = typeof resolvedParams.category === "string" ? resolvedParams.category : "";
  const normalizedCategory = rawCategory.trim();
  const selectedCategory = normalizedCategory && normalizedCategory.toLowerCase() !== "all" ? normalizedCategory : "all";
  const query = typeof resolvedParams.q === "string" ? resolvedParams.q.trim().toLowerCase() : "";
  const sort = typeof resolvedParams.sort === "string" ? resolvedParams.sort : "featured";

  let categories: Awaited<ReturnType<typeof getCategories>> = [];
  let products: Awaited<ReturnType<typeof getProducts>> = [];

  try {
    [categories, products] = await Promise.all([getCategories(), getProducts()]);
  } catch {
    categories = [];
    products = [];
  }

  const normalizeCategoryValue = (value: string) =>
    value
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const categoryMatches = (product: (typeof products)[number]) => {
    if (selectedCategory === "all") return true;

    const categoryName = product.category ?? "";
    const categoryTarget = normalizeCategoryValue(selectedCategory);
    const categoryNameNormalized = normalizeCategoryValue(categoryName);

    return (
      categoryNameNormalized === categoryTarget ||
      categoryName.toLowerCase() === selectedCategory.toLowerCase() ||
      categoryNameNormalized.includes(categoryTarget) ||
      categoryTarget.includes(categoryNameNormalized)
    );
  };

  const filteredProducts = products
    .filter((product) => categoryMatches(product))
    .filter((product) => {
      if (!query) return true;
      return (
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    })
    .sort((a, b) => {
      switch (sort) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        default:
          return b.id - a.id;
      }
    });

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">SẢN PHẨM</p>
            <h1 className="mt-2 text-4xl font-black tracking-tight">Danh sách sản phẩm</h1>
          </div>
          <Link
            href="/"
            className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900"
          >
            Về trang chủ
          </Link>
        </div>

        <div className="mb-6 rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/products"
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                selectedCategory === "all"
                  ? "bg-slate-900 text-white shadow-sm"
                  : "border border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:text-slate-900"
              }`}
            >
              Tất cả
            </Link>
            {categories.map((category) => (
              <Link
                key={category.name}
                href={`/products?category=${encodeURIComponent(category.name)}`}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  selectedCategory === category.name
                    ? "bg-orange-500 text-white shadow-sm"
                    : "border border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:text-slate-900"
                }`}
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm text-slate-500">Hiển thị</p>
            <p className="text-lg font-bold text-slate-900">{filteredProducts.length} sản phẩm</p>
          </div>

          <form action="/products" method="GET" className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2">
              <input
                name="q"
                defaultValue={query}
                placeholder="Tìm sản phẩm..."
                className="w-48 bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
              />
              {selectedCategory !== "all" ? (
                <input type="hidden" name="category" value={selectedCategory} />
              ) : null}
              <input type="hidden" name="sort" value={sort} />
              <button type="submit" className="rounded-full bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white">
                Tìm
              </button>
            </div>

            <select
              name="sort"
              defaultValue={sort}
              className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 focus:outline-none"
              onChange={(event) => event.currentTarget.form?.requestSubmit()}
            >
              <option value="featured">Nổi bật</option>
              <option value="price-asc">Giá: thấp đến cao</option>
              <option value="price-desc">Giá: cao đến thấp</option>
              <option value="rating">Đánh giá cao</option>
            </select>
            {selectedCategory !== "all" ? (
              <input type="hidden" name="category" value={selectedCategory} />
            ) : null}
          </form>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="rounded-[24px] border border-dashed border-slate-300 bg-white p-12 text-center shadow-sm">
            <p className="text-lg font-bold text-slate-900">Không tìm thấy sản phẩm nào phù hợp.</p>
            <p className="mt-2 text-sm text-slate-500">Hãy thử từ khóa khác hoặc quay lại danh mục toàn bộ.</p>
            <Link
              href="/products"
              className="mt-5 inline-flex rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Xem tất cả sản phẩm
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <article
                key={product.id}
                className="group overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/70"
              >
                <div className={`h-52 bg-gradient-to-br ${product.accent} p-4`}>
                  <div className="flex h-full items-start justify-between">
                    <span className="rounded-full bg-white/20 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-white">
                      {product.badge}
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <p className="text-sm font-medium text-slate-500">{product.category}</p>
                  <h2 className="mt-2 line-clamp-2 text-xl font-bold text-slate-900">{product.name}</h2>

                  <div className="mt-3 flex items-center gap-1 text-amber-400">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <span key={index}>★</span>
                    ))}
                    <span className="ml-1 text-xs text-slate-500">{product.rating}</span>
                  </div>

                  <div className="mt-4 flex items-end justify-between gap-2">
                    <div>
                      <span className="text-2xl font-black text-slate-900">{new Intl.NumberFormat("vi-VN").format(product.price * 1000)}đ</span>
                      <span className="ml-2 text-sm text-slate-400 line-through">{new Intl.NumberFormat("vi-VN").format(product.originalPrice * 1000)}đ</span>
                    </div>
                    <Link
                      href={`/products/${product.id}`}
                      className="rounded-full bg-slate-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-slate-800"
                    >
                      Xem chi tiết
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
