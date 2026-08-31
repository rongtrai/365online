import { categories as mockCategories, products as mockProducts, type Product as MockProduct } from "@/data/products";
import { supabase } from "@/lib/supabase";

export type StorefrontCategory = {
  name: string;
  count: number;
  accent?: string;
};

export type StorefrontOrder = {
  id: number;
  customerName: string;
  phone: string;
  address: string;
  status: string;
  total: number;
  createdAt: string;
};

export type StorefrontOrderItem = {
  id: number;
  orderId: number;
  productId: number;
  productName: string;
  productCategory: string;
  productAccent: string;
  quantity: number;
  unitPrice: number;
};

export type StorefrontOrderDetail = {
  order: StorefrontOrder;
  items: StorefrontOrderItem[];
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

const mapOrder = (row: Record<string, unknown>): StorefrontOrder => ({
  id: Number(row.id ?? 0),
  customerName: String(row.customer_name ?? row.customerName ?? "Khách hàng"),
  phone: String(row.phone ?? ""),
  address: String(row.address ?? ""),
  status: String(row.status ?? "pending"),
  total: Number(row.total ?? 0),
  createdAt: String(row.created_at ?? row.createdAt ?? new Date().toISOString()),
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

export async function getOrders(): Promise<StorefrontOrder[]> {
  if (!supabase) return [];

  const { data, error } = await supabase.from("orders").select("*").order("created_at", { ascending: false });

  if (error || !data || data.length === 0) {
    return [];
  }

  return data.map(mapOrder);
}

export async function getOrderById(orderId: number): Promise<StorefrontOrderDetail | null> {
  if (!supabase) {
    const order = {
      id: orderId,
      customerName: "Nguyễn Văn A",
      phone: "0909 123 456",
      address: "123 Lê Lợi, Quận 1, TP.HCM",
      status: "Chờ xử lý",
      total: 368000,
      createdAt: new Date().toISOString(),
    };

    return {
      order,
      items: [
        { id: 1, orderId: orderId, productId: 1, productName: "Đồng hồ thông minh AeroFit Pro", productCategory: "Robot, Mô hình", productAccent: "from-cyan-500 via-sky-500 to-blue-600", quantity: 1, unitPrice: 249000 },
        { id: 2, orderId: orderId, productId: 2, productName: "Tai nghe không dây Nova", productCategory: "Phụ kiện Robot", productAccent: "from-violet-500 via-purple-500 to-fuchsia-600", quantity: 1, unitPrice: 119000 },
      ],
    };
  }

  const { data: orderData, error: orderError } = await supabase
    .from("orders")
    .select("*")
    .eq("id", orderId)
    .single();

  if (orderError || !orderData) {
    return null;
  }

  const { data: itemRows, error: itemError } = await supabase
    .from("order_items")
    .select("*, products(name, category, accent)")
    .eq("order_id", orderId);

  if (itemError) {
    return {
      order: mapOrder(orderData as Record<string, unknown>),
      items: [],
    };
  }

  const items = (itemRows ?? []).map((row: any) => ({
    id: Number(row.id ?? 0),
    orderId: Number(row.order_id ?? orderId),
    productId: Number(row.product_id ?? 0),
    productName: String(row.products?.name ?? "Sản phẩm"),
    productCategory: String(row.products?.category ?? "Khác"),
    productAccent: String(row.products?.accent ?? "from-slate-700 via-slate-800 to-slate-900"),
    quantity: Number(row.quantity ?? 1),
    unitPrice: Number(row.unit_price ?? 0),
  }));

  return {
    order: mapOrder(orderData as Record<string, unknown>),
    items,
  };
}

export async function getProductById(id: number): Promise<MockProduct | null> {
  const products = await getProducts();
  return products.find((product) => product.id === id) ?? null;
}

export async function getProductBySlug(slug: string): Promise<MockProduct | null> {
  const products = await getProducts();
  return products.find((product) => product.slug === slug) ?? null;
}
