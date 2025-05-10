"use client";

import { memo } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image"
;
import DesktopGallery from "./DesktopGallery";


const GallerySection = memo(function GallerySection() {
  return (
    <section className="w-full overflow-hidden p-0 m-0 flex flex-col">
      {/* Desktop gallery component */}
      <DesktopGallery />

      {/* Mobile gallery component */}
      <></>

      {/* Private Dining Promotion */}
      <div className="h-[40vh] w-full bg-[#1e1e1e] text-white">
        <div className="h-full w-full relative flex items-center justify-center p-8 overflow-hidden">
          {/* Use Next.js Image for better performance */}
          <div className="absolute inset-0">
            <Image src="/images/unused/event3.jpg"
              alt="Private dining"
              fill
              sizes="100vw"
              className="object-cover"
              quality={75}
              loading="lazy"
              style={{
                objectPosition: "center"
              }}
            />
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-black/40"></div>
          </div>

          <div className="text-center relative z-10">
            <h2 className="text-3xl font-playfair mb-2">We Host. You Toast.</h2>
            <p className="mb-4 font-montserrat">Let us craft your private dining experience with flavor and flair.</p>
            <Link href="/events">
              <Button className="uppercase bg-[#1A2A3A] text-white hover:bg-[#0A1A2A] w-[240px] text-center">View All</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
});

export default GallerySection;


