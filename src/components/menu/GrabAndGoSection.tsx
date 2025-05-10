"use client";

import { useEffect, useState, memo } from "react";
import Image from "next/image";

const GrabAndGoSection = memo(function GrabAndGoSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768);
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  return (
    <section className="w-full bg-black py-24 relative overflow-hidden">
      {/* Animated background pattern - matching other sections */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e6c78b' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px',
          animation: 'slideBackground 60s linear infinite'
        }}></div>
      </div>

      <div className="container mx-auto px-4">
        {/* Section heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair text-white inline-block relative">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E6C78B] to-[#D4B679]">
              Grab & Go
            </span>
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-[#E6C78B] to-transparent"></div>
          </h2>
          <p className="text-xl text-white/70 mt-6 max-w-2xl mx-auto font-montserrat">
            Exceptional quality, packaged for convenience
          </p>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Image column with fancy card styling - Responsive dimensions */}
          <div className="flex justify-center">
            <div className={`group relative ${isMobile ? 'w-full aspect-[3/4]' : 'w-[495px] h-[744px]'} rounded-xl overflow-hidden border border-[#E6C78B]/20 bg-black/30 backdrop-blur-sm`}>
              {/* Gold accent corners */}
              <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#E6C78B]/40 z-10 transition-all duration-500 group-hover:w-20 group-hover:h-20"></div>
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#E6C78B]/40 z-10 transition-all duration-500 group-hover:w-20 group-hover:h-20"></div>

              {/* Subtle glow effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                   style={{boxShadow: "inset 0 0 30px rgba(230, 199, 139, 0.1)"}}>
              </div>

              {/* Image with responsive dimensions */}
              <div className="absolute inset-0">
                <Image
                  src="/images/menu/grab-and-go/grab-and-go-main.jpg"
                  alt="Akasa Grab & Go meals"
                  fill
                  sizes="(max-width: 768px) 100vw, 495px"
                  className={`w-full h-full transition-transform duration-700 group-hover:scale-105 ${isMobile ? 'object-contain' : 'object-cover'}`}
                  loading="lazy"
                  quality={75}
                  priority={false}
                />
              </div>

              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20 opacity-50"></div>
            </div>
          </div>

          {/* Content column */}
          <div className="flex flex-col justify-center">
            <div className="space-y-8">
              {/* Feature 1 */}
              <div className="bg-black/40 backdrop-blur-sm rounded-lg p-6 border-l-2 border-[#E6C78B] transform transition-all duration-300 hover:translate-y-[-4px] hover:shadow-lg hover:shadow-[#E6C78B]/5">
                <div className="flex items-start">
                  <div className="text-[#E6C78B] mr-4 mt-1">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12,2L4.5,20.29L5.21,21L18.79,21L19.5,20.29L12,2Z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-playfair text-[#E6C78B] mb-2">Zero Compromise</h3>
                    <p className="text-white/80 font-montserrat">
                      No preservatives. No pretension. Just pure, authentic flavor in every bite.
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="bg-black/40 backdrop-blur-sm rounded-lg p-6 border-l-2 border-[#E6C78B] transform transition-all duration-300 hover:translate-y-[-4px] hover:shadow-lg hover:shadow-[#E6C78B]/5">
                <div className="flex items-start">
                  <div className="text-[#E6C78B] mr-4 mt-1">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7Z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-playfair text-[#E6C78B] mb-2">Fresh Daily</h3>
                    <p className="text-white/80 font-montserrat">
                      Prepared each morning by our chefs—available from<br />
                      11:30 AM until 3:00 PM.
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="bg-black/40 backdrop-blur-sm rounded-lg p-6 border-l-2 border-[#E6C78B] transform transition-all duration-300 hover:translate-y-[-4px] hover:shadow-lg hover:shadow-[#E6C78B]/5">
                <div className="flex items-start">
                  <div className="text-[#E6C78B] mr-4 mt-1">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-playfair text-[#E6C78B] mb-2">Culinary Artistry</h3>
                    <p className="text-white/80 font-montserrat">
                      Signature creations crafted by Chef Akhilesh, rooted in tradition but plated for today.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add custom CSS for animations */}
      <style jsx>{`
        @keyframes slideBackground {
          0% { background-position: 0 0; }
          100% { background-position: 100% 100%; }
        }
      `}</style>
    </section>
  );
});

export default GrabAndGoSection;







