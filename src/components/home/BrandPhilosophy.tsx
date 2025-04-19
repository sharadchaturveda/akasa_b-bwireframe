"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function BrandPhilosophy() {
  return (
    <section className="min-h-[45vh] w-full grid grid-cols-1 md:grid-cols-[40%_60%]">
      {/* Left Side - Brand Philosophy */}
      <div className="relative p-6 md:py-8 md:px-12 flex flex-col justify-center" style={{ backgroundImage: "url('/images/philosophy-bg.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative max-w-md">
          <h3 className="text-2xl font-montserrat text-white mb-2">{"Not just a meal."}</h3>
          <h2 className="text-4xl font-playfair text-white mb-4">{"An experience."}</h2>
          <p className="font-montserrat text-white mb-6 leading-relaxed">
            {"We work closely with local farmers to bring you the freshest seasonal ingredients. Inspired by India's rich culinary heritage, we use heirloom grains, vibrant spices, and pasture-raised meats to craft soulful dishes. Enjoy them the traditional way—family style. Whether you order à la carte or try our chef's selection, everything is served to share."}
          </p>
          <Link href="/location">
            <Button className="bg-[#1A2A3A] text-white hover:bg-[#0A1A2A] w-[240px] px-6 text-center" showArrow>
              {"Our Location"}
            </Button>
          </Link>
        </div>
      </div>

      {/* Right Side - Location Info */}
      <div className="relative" style={{ backgroundImage: "url('/images/drink.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative h-full flex flex-col justify-center p-6 md:py-8 md:px-12">
          <h2 className="text-4xl font-playfair mb-4">{"Singapore"}</h2>

          <div className="space-y-4">
            <div>
              <p className="text-gray-300 text-sm font-montserrat">{"address:"}</p>
              <p className="text-white text-lg font-montserrat">{"79 Robinson Road, #01-03 Capitasky,"}</p>
              <p className="text-white text-lg font-montserrat">{"Tanjong Pagar, Singapore 068897"}</p>
            </div>
            <div>
              <p className="text-gray-300 text-sm font-montserrat">{"hours:"}</p>
              <p className="text-white text-lg font-montserrat">{"Monday to Saturday: 11:30am to 10:00pm"}</p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3">
            <Link href="/order">
              <Button className="bg-[#1A2A3A] text-white hover:bg-[#0A1A2A] w-[240px] px-6 py-3 text-center" showArrow>
                {"Order Online"}
              </Button>
            </Link>
            <Link href="/reservations">
              <Button className="bg-[#1A2A3A] text-white hover:bg-[#0A1A2A] w-[240px] px-6 py-3 text-center" showArrow>
                {"Make a Reservation"}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
