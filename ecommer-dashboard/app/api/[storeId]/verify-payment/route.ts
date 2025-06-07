import { NextResponse } from "next/server";
import crypto from "crypto";
import prismadb from "@/lib/prismadb";
import { getCorsHeaders, handlePreflight } from "@/lib/cors";

export async function OPTIONS(req: Request) {
  return handlePreflight(req);
}

export async function POST(req: Request, { params }: { params: { storeId: string } }) {
  const headers = getCorsHeaders(req.headers.get("origin") || "*");

  try {
    const body = await req.json();
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature, orderId } = body;

    const secret = process.env.RAZORPAY_KEY_SECRET!;
    
    // Generate the signature using HMAC SHA256
    const generatedSignature = crypto
      .createHmac("sha256", secret)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest("hex");

    // Log the generated and received signature for debugging
    console.log('Generated Signature:', generatedSignature);
    console.log('Razorpay Signature:', razorpaySignature);

    // Verify the signatures
    if (generatedSignature !== razorpaySignature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400, headers });
    }

    // If signatures match, update the order status in the database
    await prismadb.order.update({
      where: { id: orderId },
      data: {
        razorpayPaymentId,
        razorpaySignature,
        isPaid: true,
        status: "processing",
      },
    });

    return NextResponse.json(
      { msg: "Payment verified successfully" },
      { status: 200, headers }
    );
  } catch (error) {
    console.error("[VERIFY_PAYMENT_POST]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500, headers }
    );
  }
}
