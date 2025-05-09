"use client";

import { memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useDeviceDetection } from "@/hooks/useDeviceDetection";

/**
 * FloatingActionButtons Component
 *
 * Displays floating CTA buttons (Book Now and WhatsApp) that are fixed on the screen
 * and visible across all pages. WhatsApp button is positioned on the left side,
 * while Book Now button is on the right side.
 */
const FloatingActionButtons = memo(function FloatingActionButtons() {
  const { isMobile } = useDeviceDetection();

  // WhatsApp message and phone number
  const whatsappNumber = "6561234567"; // Singapore number format with country code
  const whatsappMessage = "Hello, I'd like to make a reservation at Akasa. Could you please assist me?";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  // Adjust position and size based on device
  const rightPosition = isMobile ? "bottom-4 right-4" : "bottom-6 right-6";
  const leftPosition = isMobile ? "bottom-4 left-4" : "bottom-6 left-6";
  const buttonSize = isMobile ? "w-10 h-10" : "w-12 h-12";
  const iconSize = isMobile ? "20" : "24";

  // Use the custom WhatsApp image that has been uploaded
  const useCustomWhatsAppImage = true; // Using the custom image
  const whatsAppImagePath = "/images/whatsapp-button.jpg";

  return (
    <>
      {/* WhatsApp Button - Left Side */}
      <div className={`fixed ${leftPosition} z-50`}>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center justify-center ${buttonSize} rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden`}
          aria-label="Contact us on WhatsApp"
          style={{
            boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
            border: '1px solid rgba(255,255,255,0.1)',
            padding: 0,
            backgroundColor: useCustomWhatsAppImage ? 'transparent' : '#25D366'
          }}
        >
          {useCustomWhatsAppImage ? (
            <Image
              src={whatsAppImagePath}
              alt="WhatsApp"
              width={48}
              height={48}
              className="object-cover w-full h-full"
              priority={true}
            />
          ) : (
            <WhatsAppIcon size={iconSize} />
          )}
        </a>
      </div>

      {/* Book Now Button - Right Side */}
      <div className={`fixed ${rightPosition} z-50`}>
        <Link href="/reservations">
          <Button
            variant="default"
            size={isMobile ? "small" : "medium"}
            className="rounded-full bg-[#1A2A3A] text-white shadow-lg hover:shadow-xl"
            showHoverAnimation={!isMobile}
            style={{
              boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
              border: '1px solid rgba(255,255,255,0.1)'
            }}
          >
            <span className="whitespace-nowrap px-2">Book Now</span>
          </Button>
        </Link>
      </div>
    </>
  );
});

// WhatsApp Icon Component
const WhatsAppIcon = ({ size = "24" }: { size?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="white"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 6.628 5.373 12 12 12 6.628 0 12-5.373 12-12 0-6.627-5.372-12-12-12zm6.586 16.874c-.28.394-.725.69-1.23.792-.507.102-1.15.128-1.83-.128-1.067-.402-3.154-1.154-5.353-3.533-2.075-2.248-2.642-4.944-2.667-5.193-.025-.25-.105-1.524.83-2.56.38-.422.875-.723 1.48-.777.37-.027.65-.038.915.062.285.108.6.35.92.672.32.32.68.74.786 1.016.106.275.302.764.097 1.167-.204.402-.608.648-.905.85-.3.196-.382.3-.255.59.127.292.557 1.248 1.2 2.02.757.9 1.395 1.19 1.588 1.33.193.14.382.117.522-.128.14-.246.6-.97.76-1.3.158-.33.317-.276.532-.167.215.11 1.37.646 1.603.765.233.118.39.177.446.277.056.099.056.57-.137.118z" fillRule="nonzero"/>
  </svg>
);

export default FloatingActionButtons;
