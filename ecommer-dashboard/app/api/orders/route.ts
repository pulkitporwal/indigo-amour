import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { prismadb } from "@/lib/prismadb";
import { razorpay } from "@/lib/razorpay";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { storeId, orderItems, phone, address } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!storeId) {
      return new NextResponse("Store ID is required", { status: 400 });
    }

    if (!orderItems || !orderItems.length) {
      return new NextResponse("Order items are required", { status: 400 });
    }

    // Calculate total amount
    const totalAmount = orderItems.reduce((total: number, item: any) => {
      return total + (item.product.price * item.quantity);
    }, 0);

    // Create order in database
    const order = await prismadb.order.create({
      data: {
        storeId,
        phone,
        address,
        orderItems: {
          create: orderItems.map((item: any) => ({
            productId: item.product.id,
          })),
        },
      },
    });

    // Create Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount: totalAmount * 100, // Convert to paise
      currency: "INR",
      receipt: order.id,
    });

    // Update order with Razorpay order ID
    await prismadb.order.update({
      where: { id: order.id },
      data: { razorpayOrderId: razorpayOrder.id },
    });

    return NextResponse.json({
      orderId: order.id,
      razorpayOrderId: razorpayOrder.id,
      amount: totalAmount,
      currency: "INR",
    });
  } catch (error) {
    console.log("[ORDERS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
} 