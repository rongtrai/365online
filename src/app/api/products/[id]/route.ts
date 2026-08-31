import { NextResponse } from "next/server";
import { getProductById } from "@/lib/storefront-data";
import { supabase } from "@/lib/supabase";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProductById(Number(id));

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(product);
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const productId = Number(id);

    if (!supabase) {
      return NextResponse.json({ success: true, id: productId });
    }

    const payload = {
      name: String(body?.name || "").trim(),
      slug: String(body?.slug || "san-pham"),
      description: String(body?.description || "Sản phẩm của 365online."),
      price: Number(body?.price ?? 0),
      original_price: Number(body?.originalPrice ?? body?.price ?? 0),
      rating: Number(body?.rating ?? 5),
      badge: String(body?.badge || "NEW"),
      accent: String(body?.accent || "from-slate-700 via-slate-800 to-slate-900"),
      category: String(body?.category || "Khác"),
      stock: Number(body?.stock ?? 0),
    };

    const { data, error } = await supabase.from("products").update(payload).eq("id", productId).select().single();

    if (error || !data) {
      return NextResponse.json({ error: error?.message || "Không thể cập nhật sản phẩm." }, { status: 500 });
    }

    return NextResponse.json({ success: true, product: data });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Không thể cập nhật sản phẩm." }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const productId = Number(id);

    if (!supabase) {
      return NextResponse.json({ success: true, id: productId });
    }

    const { error } = await supabase.from("products").delete().eq("id", productId);

    if (error) {
      return NextResponse.json({ error: error.message || "Không thể xóa sản phẩm." }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: productId });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Không thể xóa sản phẩm." }, { status: 500 });
  }
}
