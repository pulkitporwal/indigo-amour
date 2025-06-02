import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { prismadb } from "@/lib/prismadb";
import { razorpay } from "@/lib/razorpay";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(
  req: Request,
  { params }: { params: { orderId: string } }
) {
  try {
    // Temporarily remove auth check for testing
    // const { userId } = auth();
    // if (!userId) {
    //   return new NextResponse("Unauthorized", { status: 401, headers: corsHeaders });
    // }

    const body = await req.json();
    const { razorpayPaymentId, razorpayOrderId, razorpaySignature } = body;

    if (!razorpayPaymentId || !razorpayOrderId || !razorpaySignature) {
      return new NextResponse("Missing payment details", { status: 400, headers: corsHeaders });
    }

    // Verify payment signature
    const expectedSignature = razorpay.utils.verifyPaymentSignature({
      order_id: razorpayOrderId,
      payment_id: razorpayPaymentId,
      signature: razorpaySignature,
    });

    if (!expectedSignature) {
      return new NextResponse("Invalid payment signature", { status: 400, headers: corsHeaders });
    }

    // Update order status
    const order = await prismadb.order.update({
      where: {
        id: params.orderId,
      },
      data: {
        isPaid: true,
        status: "completed",
        razorpayPaymentId,
        razorpaySignature,
      },
      include: {
        orderItems: true,
      },
    });

    return NextResponse.json(order, { headers: corsHeaders });
  } catch (error) {
    console.log("[ORDER_CONFIRM]", error);
    return new NextResponse("Internal error", { status: 500, headers: corsHeaders });
  }
} 