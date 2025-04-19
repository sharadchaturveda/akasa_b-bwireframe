"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function WhatsHappeningSection() {
  return (
    <section className="w-full py-0">
      <div className="grid grid-cols-1 md:grid-cols-[60%_40%]">
        <div className="h-[50vh] md:h-[80vh] w-full bg-cover bg-center" style={{ backgroundImage: "url('/images/whats-happening.jpg?quality=75&width=1200')" }}></div>
        <div className="h-[50vh] md:h-[80vh] relative w-full flex flex-col justify-center p-6 md:p-16" style={{ backgroundImage: "url('/images/whats-happening-bg.jpg?quality=75&width=1200')", backgroundSize: "cover", backgroundPosition: "center" }}>
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="relative">
            <h2 className="text-4xl font-playfair text-white mb-6">{"What's Happening"}</h2>
            <p className="text-white mb-8 leading-relaxed font-montserrat">
              {"At Akasa, We're always cooking up something new with exciting offers & events."}
            </p>
            <Link href="/events">
              <Button className="bg-[#1A2A3A] text-white hover:bg-[#0A1A2A] w-[240px] text-center" showArrow>
                {"Find Out More"}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
