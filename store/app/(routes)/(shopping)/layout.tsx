import Footer from "@/components/footer";
import type { Metadata } from "next";
import { Urbanist, Anek_Devanagari } from "next/font/google";
import Navbar from "@/components/navbar";
import Marquee from "@/components/ui/marquee";

export const urbanist = Urbanist({ subsets: ["latin"] });
export const anek = Anek_Devanagari({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Indigo Amour",
  description: "Shop your dyed clothes from Indigo Amour",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className={urbanist.className}>
        <Marquee
          marqueeText={
            "FREE SHIPPING + Sale- get UPTO 40% OFF + Extra 10% Off on Prepaid"
          }
        />
        <Navbar />
        {children}
        <Footer />
      </div>
    </div>
  );
}
