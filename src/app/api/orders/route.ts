import { NextResponse } from "next/server";
import { getOrders } from "@/lib/storefront-data";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const orders = await getOrders();
  return NextResponse.json(orders);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const customerName = String(body?.customerName || "").trim();
    const phone = String(body?.phone || "").trim();
    const address = String(body?.address || "").trim();
    const paymentMethod = String(body?.paymentMethod || "COD").trim();
    const items = Array.isArray(body?.items) ? body.items : [];

    if (!customerName || !phone || !address || items.length === 0) {
      return NextResponse.json({ error: "Thiếu thông tin đơn hàng." }, { status: 400 });
    }

    if (!supabase) {
      return NextResponse.json({
        success: true,
        order: {
          id: `DEMO-${Date.now()}`,
          customerName,
          phone,
          address,
          paymentMethod,
          total: items.reduce((sum: number, item: any) => sum + Number(item.unitPrice || 0) * Number(item.quantity || 1), 0),
          status: "pending",
        },
      });
    }

    const { data: orderData, error: orderError } = await supabase
      .from("orders")
      .insert({
        customer_name: customerName,
        phone,
        address,
        status: "pending",
        total: items.reduce((sum: number, item: any) => sum + Number(item.unitPrice || 0) * Number(item.quantity || 1), 0),
      })
      .select()
      .single();

    if (orderError || !orderData) {
      return NextResponse.json({ error: orderError?.message || "Không thể tạo đơn hàng." }, { status: 500 });
    }

    const orderItems = items.map((item: any) => ({
      order_id: orderData.id,
      product_id: item.productId,
      quantity: Number(item.quantity || 1),
      unit_price: Number(item.unitPrice || 0),
    }));

    const { error: itemError } = await supabase.from("order_items").insert(orderItems);

    if (itemError) {
      return NextResponse.json({ error: itemError.message || "Không thể lưu sản phẩm trong đơn hàng." }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      order: {
        id: orderData.id,
        customerName: orderData.customer_name,
        phone: orderData.phone,
        address: orderData.address,
        status: orderData.status,
        total: orderData.total,
        paymentMethod,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Đặt hàng thất bại." }, { status: 500 });
  }
}
