import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prismadb from "@/lib/prismadb";

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { amount, orderId, currency = "INR" } = body;

    if (!amount || !orderId) {
      return new NextResponse("Amount and orderId are required", { status: 400 });
    }

    // Verify store exists and belongs to user
    const store = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId: session.user.id,
      },
    });

    if (!store) {
      return new NextResponse("Store not found", { status: 404 });
    }

    // Verify order exists and belongs to store
    const order = await prismadb.order.findFirst({
      where: {
        id: orderId,
        storeId: params.storeId,
      },
    });

    if (!order) {
      return new NextResponse("Order not found", { status: 404 });
    }

    // Create Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(amount * 100), // Convert to paise and ensure it's an integer
      currency,
      receipt: orderId,
      notes: {
        storeId: params.storeId,
        orderId: orderId,
      },
    });

    // Update order with Razorpay order ID
    await prismadb.order.update({
      where: {
        id: orderId,
      },
      data: {
        razorpayOrderId: razorpayOrder.id,
      },
    });

    return NextResponse.json({
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      receipt: razorpayOrder.receipt,
    });
  } catch (error) {
    console.error("[CHECKOUT_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 