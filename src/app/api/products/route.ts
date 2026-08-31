import { NextResponse } from "next/server";
import { getProducts } from "@/lib/storefront-data";
import { supabase } from "@/lib/supabase";

const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "san-pham";

export async function GET() {
  const products = await getProducts();
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body?.name || "").trim();
    const price = Number(body?.price ?? 0);
    const category = String(body?.category || "Khác").trim();

    if (!name || !Number.isFinite(price) || price <= 0) {
      return NextResponse.json({ error: "Tên và giá sản phẩm không hợp lệ." }, { status: 400 });
    }

    const payload = {
      name,
      slug: String(body?.slug || slugify(name)),
      description: String(body?.description || "Sản phẩm của 365online."),
      price,
      original_price: Number(body?.originalPrice ?? price),
      rating: Number(body?.rating ?? 5),
      badge: String(body?.badge || "NEW"),
      accent: String(body?.accent || "from-slate-700 via-slate-800 to-slate-900"),
      category,
      stock: Number(body?.stock ?? 0),
    };

    if (!supabase) {
      return NextResponse.json({
        success: true,
        product: {
          id: Date.now(),
          ...payload,
          originalPrice: payload.original_price,
        },
      });
    }

    const { data, error } = await supabase.from("products").insert(payload).select().single();

    if (error || !data) {
      return NextResponse.json({ error: error?.message || "Không thể thêm sản phẩm." }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      product: {
        id: Number(data.id),
        name: data.name,
        slug: data.slug,
        description: data.description,
        price: Number(data.price),
        originalPrice: Number(data.original_price ?? data.price),
        rating: Number(data.rating ?? 5),
        badge: data.badge,
        accent: data.accent,
        category: data.category,
        stock: Number(data.stock ?? 0),
      },
    });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Không thể thêm sản phẩm." }, { status: 500 });
  }
}
