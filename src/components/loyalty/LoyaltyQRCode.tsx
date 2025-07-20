"use client";

import Image from "next/image";
import { memo } from "react";

const LoyaltyQRCode = memo(function LoyaltyQRCode() {
  return (
    <section className="w-full py-20 relative overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e6c78b' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px',
          animation: 'slideBackground 60s linear infinite'
        }}></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-playfair mb-6 relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E6C78B] to-[#D4B679]">Join Our Loyalty Program</span>
              <div className="absolute -bottom-3 left-0 w-full h-0.5 bg-gradient-to-r from-[#E6C78B] to-transparent"></div>
            </h2>
            <p className="text-lg font-montserrat text-white/80 max-w-2xl mx-auto">
              Scan the QR code below to join our loyalty program and start earning exclusive benefits with every visit.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 items-center justify-center">
            {/* QR Code */}
            <div className="w-full max-w-md lg:w-1/2">
              <div className="relative aspect-square max-w-sm mx-auto">
                <div className="relative aspect-square overflow-hidden group">
                  {/* Decorative frame */}
                  <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#E6C78B] opacity-70 z-10"></div>
                  <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-[#E6C78B] opacity-70 z-10"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-[#E6C78B] opacity-70 z-10"></div>
                  <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#E6C78B] opacity-70 z-10"></div>

                  {/* QR Code Placeholder */}
                  <div className="w-full h-full bg-white flex items-center justify-center p-8">
                    <div className="text-center">
                      <Image 
                        src="/images/offers/loyalty_program/qr-code-placeholder.png"
                        alt="QR Code for Loyalty Program"
                        width={300}
                        height={300}
                        className="mx-auto mb-4"
                      />
                      <p className="text-sm text-gray-600 font-montserrat">
                        Scan to join loyalty program
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefits Preview */}
            <div className="w-full lg:w-1/2">
              <div className="p-8 bg-black/40 backdrop-blur-md border border-white/5 rounded-lg shadow-2xl">
                <h3 className="text-2xl font-playfair mb-6 text-[#E6C78B]">Program Benefits</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-[#E6C78B] flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-black text-xs font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-montserrat font-medium text-white mb-1">Sky Tier (1-5 visits)</h4>
                      <p className="text-sm text-white/80">Enjoy 5% off on your 2nd to 5th visits</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-[#E6C78B] flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-black text-xs font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-montserrat font-medium text-white mb-1">Horizon Tier (6+ visits)</h4>
                      <p className="text-sm text-white/80">5% off lunch & 10% off dinner and weekends</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-[#E6C78B] flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-black text-xs font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-montserrat font-medium text-white mb-1">Exclusive Drinks</h4>
                      <p className="text-sm text-white/80">Beer on tap & house wines for $10 (opening to 2000hrs)</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-[#E6C78B] flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-black text-xs font-bold">4</span>
                    </div>
                    <div>
                      <h4 className="font-montserrat font-medium text-white mb-1">Early Access</h4>
                      <p className="text-sm text-white/80">Priority access to special menus and seasonal offers</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default LoyaltyQRCode; 