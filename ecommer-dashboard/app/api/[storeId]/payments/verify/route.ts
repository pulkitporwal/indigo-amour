import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import crypto from "crypto";
import prismadb from "@/lib/prismadb";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

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
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId,
    } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !orderId) {
      return new NextResponse("Missing required fields", { status: 400 });
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
        razorpayOrderId: razorpay_order_id,
      },
    });

    if (!order) {
      return new NextResponse("Order not found", { status: 404 });
    }

    // Verify signature
    const text = `${razorpay_order_id}|${razorpay_payment_id}`;
    const signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(text)
      .digest("hex");

    const isAuthentic = signature === razorpay_signature;

    if (!isAuthentic) {
      return new NextResponse("Invalid signature", { status: 400 });
    }

    // Update order status
    await prismadb.order.update({
      where: {
        id: orderId,
      },
      data: {
        isPaid: true,
        status: "completed",
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
      },
    });

    return NextResponse.json({
      verified: true,
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
    });
  } catch (error) {
    console.error("[VERIFY_PAYMENT_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 