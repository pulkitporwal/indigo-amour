"use client";

import Button from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { useStore } from "@/hooks/use-store";

declare global {
  interface Window { Razorpay: any; }
}

const Summary = () => {
  const router = useRouter();
  const { userId, sessionId } = useAuth();
  const store = useStore();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, []);

  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price);
  }, 0);

  const handlePayment = async () => {
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    if (!userId) {
      toast.error("Please sign in to proceed with payment");
      router.push("/sign-in");
      return;
    }

    if (!store.id) {
      toast.error("Store information is missing");
      return;
    }

    try {
      const orderItems = items.map(item => ({
        product: {
          id: item.id,
          price: item.price
        },
        quantity: item.quantity || 1
      }));

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/checkout`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${sessionId}`,
        },
        body: JSON.stringify({ 
          storeId: store.id,
          orderItems,
          customerName: store.name,
          customerEmail: store.email,
          phone: store.phone,
          address: store.address
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.message || "Failed to create order");
      }

      const data = await res.json();

      const options = {
        key: data.key,
        amount: data.amount * 100,
        currency: data.currency,
        name: data.name,
        description: data.description,
        order_id: data.razorpayOrderId,
        handler: async (response: any) => {
          try {
            const verifyRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/${data.orderId}/confirm`, {
              method: "POST",
              headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionId}`,
              },
              body: JSON.stringify({
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
              }),
            });

            if (!verifyRes.ok) {
              const errorData = await verifyRes.json().catch(() => null);
              throw new Error(errorData?.message || "Payment verification failed");
            }

            toast.success("Payment successful!");
            removeAll();
            router.push("/orders");
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Payment verification failed";
            toast.error(errorMessage);
            console.error("Payment verification error:", error);
          }
        },
        prefill: data.prefill,
        theme: {
          color: "#EE6470"
        },
        modal: {
          ondismiss: () => {
            toast.error("Payment cancelled");
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Something went wrong";
      toast.error(errorMessage);
      console.error("Checkout error:", error);
    }
  };

  return (
    <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">Order Total</div>
          <Currency value={totalPrice} />
        </div>
      </div>
      <Button 
        onClick={handlePayment}
        disabled={items.length === 0}
        className={`w-full mt-6 ${items.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {items.length === 0 ? 'Cart is Empty' : 'Pay Now'}
      </Button>
    </div>
  );
};

export default Summary;
