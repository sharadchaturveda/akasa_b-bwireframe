"use client";

import Image from "next/image";
import { memo } from "react";

const ChefSection = memo(function ChefSection() {
  return (
    <section className="h-screen w-full bg-[url('/images/chef.jpg')] bg-cover bg-center flex flex-col items-center justify-center relative">
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="container mx-auto px-4 md:px-8 relative z-10 mt-32">
        <div className="grid grid-cols-1 md:grid-cols-[40%_60%] gap-8 items-center">
          <div className="relative h-[300px] md:h-[400px] overflow-hidden rounded-lg">
            <Image
              src="/images/chef.jpg"
              alt="Chef Akhilesh Pathak"
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          </div>
          
          <div className="p-6 md:p-8 bg-black/70 backdrop-blur-sm rounded-lg">
            <h1 className="text-3xl md:text-5xl font-playfair mb-4 text-white">{"Meet Our Chef"}</h1>
            <h2 className="text-xl md:text-2xl font-playfair mb-6 text-[#E6C78B]">{"Chef Akhilesh Pathak"}</h2>
            
            <p className="text-base md:text-lg font-montserrat mb-6 text-white/90 leading-relaxed">
              {"Hailing from the vibrant culinary melting pot of Kolkata, Chef Akhilesh's culinary journey spans over two decades, initially nurtured by his mother's guidance and refined through extensive exploration of India's diverse gastronomic landscape."}
            </p>
            
            <p className="text-base md:text-lg font-montserrat mb-8 text-white/90 leading-relaxed">
              {"His philosophy is simple: respect the ingredients, honor the tradition, and push the boundaries of what's possible. Every dish at Akasa tells a story of heritage, innovation, and passion."}
            </p>
            
            <div className="flex flex-wrap gap-4">
              <div className="bg-[#1A2A3A] px-4 py-2 rounded-full text-sm text-white/90">Michelin Star Chef</div>
              <div className="bg-[#1A2A3A] px-4 py-2 rounded-full text-sm text-white/90">Asia's 50 Best</div>
              <div className="bg-[#1A2A3A] px-4 py-2 rounded-full text-sm text-white/90">James Beard Finalist</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default ChefSection;
