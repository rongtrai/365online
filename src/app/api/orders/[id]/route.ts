import { NextResponse } from "next/server";
import { getOrderById } from "@/lib/storefront-data";
import { supabase } from "@/lib/supabase";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const orderId = Number(id);
    const detail = await getOrderById(orderId);

    if (!detail) {
      return NextResponse.json({ error: "Không tìm thấy đơn hàng." }, { status: 404 });
    }

    return NextResponse.json(detail);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Không thể tải đơn hàng." }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const nextStatus = String(body?.status || "").trim();
    const orderId = Number(id);

    if (!nextStatus) {
      return NextResponse.json({ error: "Trạng thái không hợp lệ." }, { status: 400 });
    }

    if (!supabase) {
      return NextResponse.json({ success: true, id: orderId, status: nextStatus });
    }

    const { error } = await supabase.from("orders").update({ status: nextStatus }).eq("id", orderId);

    if (error) {
      return NextResponse.json({ error: error.message || "Không thể cập nhật trạng thái đơn hàng." }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: orderId, status: nextStatus });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Không thể cập nhật trạng thái đơn hàng." }, { status: 500 });
  }
}
