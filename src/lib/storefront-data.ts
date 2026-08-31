import { categories as mockCategories, products as mockProducts, type Product as MockProduct } from "@/data/products";
import { supabase } from "@/lib/supabase";

export type StorefrontCategory = {
  name: string;
  count: number;
  accent?: string;
};

const mapProduct = (row: Record<string, unknown>): MockProduct => ({
  id: Number(row.id ?? 0),
  name: String(row.name ?? "Unnamed product"),
  slug: String(row.slug ?? "unnamed-product"),
  price: Number(row.price ?? 0),
  originalPrice: Number(row.original_price ?? row.originalPrice ?? Number(row.price ?? 0)),
  rating: Number(row.rating ?? 5),
  badge: String(row.badge ?? "NEW"),
  accent: String(row.accent ?? "from-slate-700 via-slate-800 to-slate-900"),
  description: String(row.description ?? "Sản phẩm của 365online."),
  category: String(row.category ?? "Khác"),
  stock: Number(row.stock ?? 0),
});

const mapCategory = (row: Record<string, unknown>): StorefrontCategory => ({
  name: String(row.name ?? "Khác"),
  count: Number(row.count ?? row.product_count ?? 0),
  accent: String(row.accent ?? "from-slate-700 via-slate-800 to-slate-900"),
});

export async function getCategories(): Promise<StorefrontCategory[]> {
  if (!supabase) return mockCategories.map((item) => ({ ...item, accent: "from-slate-700 via-slate-800 to-slate-900" }));

  const { data, error } = await supabase.from("categories").select("*").order("id");

  if (error || !data) {
    return mockCategories.map((item) => ({ ...item, accent: "from-slate-700 via-slate-800 to-slate-900" }));
  }

  return data.map(mapCategory);
}

export async function getProducts(): Promise<MockProduct[]> {
  if (!supabase) return mockProducts;

  const { data, error } = await supabase.from("products").select("*").order("id");

  if (error || !data || data.length === 0) {
    return mockProducts;
  }

  return data.map(mapProduct);
}

export async function getProductById(id: number): Promise<MockProduct | null> {
  const products = await getProducts();
  return products.find((product) => product.id === id) ?? null;
}

export async function getProductBySlug(slug: string): Promise<MockProduct | null> {
  const products = await getProducts();
  return products.find((product) => product.slug === slug) ?? null;
}
