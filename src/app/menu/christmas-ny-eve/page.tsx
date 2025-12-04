"use client";

import { useEffect, useState, useRef } from "react";
import Footer from "@/components/home/Footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import DesktopNavigation from "@/components/navigation/DesktopNavigation";
import { festiveBrunchMenu, festiveBrunchImages, festiveBrunchVideo } from "@/data/festiveBrunchMenu";

interface MenuItem {
  name: string;
  description: string;
  is_vegetarian: boolean;
}

interface MenuCategory {
  category_name: string;
  items: MenuItem[];
}

interface MenuCategorySectionProps {
  category: MenuCategory;
}

const MenuCategorySection = ({ category }: MenuCategorySectionProps) => {
  return (
    <div className="mb-16">
      <div className="relative mb-8">
        <h2 className="text-3xl md:text-4xl font-playfair text-center text-[#D4AF37] mb-4 tracking-wider">
          {category.category_name}
        </h2>
        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {category.items.map((item, itemIndex) => (
          <div key={itemIndex} className="relative text-white hover:text-[#D4AF37]">
            {/* Card background with festive glow effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600/0 via-[#D4AF37]/30 to-green-600/0 rounded-2xl blur opacity-0 hover:opacity-100 transition duration-1000 hover:duration-200"></div>

            <div className="relative p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 hover:border-[#D4AF37]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#D4AF37]/10">
              {/* Decorative festive corner accent */}
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-[#D4AF37]/30 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>

              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-montserrat font-semibold transition-colors duration-300">{item.name}</h3>
                <span className="text-2xl ml-2 flex-shrink-0">{item.is_vegetarian ? "🟢" : "🔴"}</span>
              </div>
              <p className="text-white/80 font-montserrat text-sm leading-relaxed">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function FestiveBrunchPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const [isVideoHidden, setIsVideoHidden] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % festiveBrunchImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Enhanced video control with mobile optimization
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      console.log("Festive video: Can play");
    };

    const handlePlay = () => {
      console.log("Festive video: Playing");
    };

    const handlePause = () => {
      console.log("Festive video: Paused");
    };

    const handleError = (e: Event) => {
      console.error("Festive video error:", e);
      setVideoError(true);
    };

    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("error", handleError);

    // Auto-play attempt with user interaction fallback
    const attemptAutoPlay = async () => {
      try {
        video.muted = true;
        await video.play();
        console.log("Festive video: Autoplay successful");
      } catch {
        console.log("Festive video: Autoplay prevented, waiting for user interaction");
      }
    };

    if (video.readyState >= 3) {
      attemptAutoPlay();
    } else {
      video.addEventListener("loadeddata", attemptAutoPlay, { once: true });
    }

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("error", handleError);
    };
  }, []);

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) {
      console.error("Video ref is null");
      return;
    }

    video.muted = !video.muted;
    setIsMuted(video.muted);
    console.log(`Video ${video.muted ? "muted" : "unmuted"}`);
  };

  const toggleVideoVisibility = () => {
    setIsVideoHidden(!isVideoHidden);
  };

  useEffect(() => {
    const images = document.querySelectorAll("img");
    images.forEach((img) => {
      if (img.complete) {
        img.classList.add("loaded");
      } else {
        img.onload = () => {
          img.classList.add("loaded");
        };
      }
    });
  }, []);

  return (
    <main className=" min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      {/* Festive Announcement Banner */}
      <div className="relative z-50 bg-gradient-to-r from-red-700 via-[#D4AF37] to-green-700 py-3">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white font-montserrat font-semibold text-sm md:text-base">
            🎄 CHRISTMAS SPECIAL: Christmas | {festiveBrunchMenu.availability} | {festiveBrunchMenu.price} per
            person
          </p>
        </div>
      </div>

      <DesktopNavigation className="absolute top-10 left-0 right-0 z-50" />

      {/* Animated Festive Background */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D4AF37' fill-opacity='0.1'%3E%3Cpath d='M30 5 L32 15 L42 15 L34 21 L37 31 L30 25 L23 31 L26 21 L18 15 L28 15 Z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px",
            animation: "float 25s ease-in-out infinite",
          }}
        ></div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center py-20">
        {/* Background Image Carousel */}
        <div className="absolute inset-0">
          {festiveBrunchImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentImageIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image src={image.src} alt={image.alt} fill className="object-cover" priority={index === 0} />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-black/70 to-black/85"></div>
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Christmas Icon */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 blur-xl bg-[#D4AF37]/30 rounded-full"></div>
                <span className="text-6xl md:text-7xl relative">🎄</span>
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-playfair mb-6 text-white leading-tight">
              Festive
              <span className="block text-[#D4AF37] mt-2">Christmas & NY Eve Special</span>
            </h1>

            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mb-8"></div>

            <p className="text-2xl md:text-3xl font-playfair text-[#D4AF37] mb-4 italic">
              {festiveBrunchMenu.subtitle}
            </p>

            {/* Price and Availability Info */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
              <div className="bg-gradient-to-r from-[#D4AF37]/20 to-amber-600/20 backdrop-blur-sm px-6 py-3 rounded-full border border-[#D4AF37]/30">
                <span className="text-xl md:text-2xl font-playfair text-[#D4AF37] font-bold">
                  {festiveBrunchMenu.price} per person
                </span>
              </div>
              <div className="bg-gradient-to-r from-red-600/20 to-green-600/20 backdrop-blur-sm px-6 py-3 rounded-full border border-[#D4AF37]/30">
                <span className="text-lg font-montserrat text-white">{festiveBrunchMenu.availability}</span>
              </div>
            </div>

            {/* Chef Information */}
            <div className="mb-8">
              <p className="text-lg font-montserrat text-[#D4AF37]/90 mb-2">Curated by</p>
              <p className="text-xl md:text-2xl font-playfair text-white font-semibold">{festiveBrunchMenu.chef}</p>
            </div>

            {/* Experience Description */}
            <div className="bg-black/40 backdrop-blur-sm p-8 rounded-2xl border border-white/10 mb-8">
              <p className="text-lg md:text-xl font-montserrat text-white/90 max-w-3xl mx-auto leading-relaxed">
                {festiveBrunchMenu.description}
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <span className="text-sm font-montserrat text-red-400 bg-red-400/10 px-4 py-2 rounded-full">
                  Christmas Eve Dinner
                </span>
                <span className="text-sm font-montserrat text-[#D4AF37] bg-[#D4AF37]/10 px-4 py-2 rounded-full">
                  Christmas Day Brunch
                </span>
                <span className="text-sm font-montserrat text-green-400 bg-green-400/10 px-4 py-2 rounded-full">
                  Christmas Day Dinner
                </span>
              </div>
            </div>

            {/* Image Indicators */}
            <div className="flex justify-center mt-12 space-x-2">
              {festiveBrunchImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentImageIndex ? "bg-[#D4AF37] scale-125" : "bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-[#D4AF37] rounded-full flex justify-center">
            <div className="w-1 h-3 bg-[#D4AF37] rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Floating Video Player - Bottom Right Corner */}
      {/* Hidden state - Show small toggle button on mobile */}
      {isVideoHidden && (
        <button
          onClick={toggleVideoVisibility}
          className="fixed bottom-14 md:bottom-20 right-4 z-50 md:hidden
                   bg-gradient-to-r from-red-600 via-[#D4AF37] to-green-600 
                   text-white rounded-full p-3 shadow-2xl shadow-[#D4AF37]/30
                   border border-white/30 transition-all duration-300 hover:scale-110 active:scale-95"
          aria-label="Show video"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
          </svg>
        </button>
      )}

      {/* Video Container */}
      <div
        className={`fixed bottom-14 md:bottom-20 right-4 z-50 w-[150px] md:w-[200px] lg:w-[250px] transition-all duration-300 ${isVideoHidden ? "hidden md:block" : ""}`}
      >
        {/* Video Container with Enhanced Festive Border */}
        <div className="relative rounded-xl overflow-hidden shadow-2xl shadow-[#D4AF37]/30 border-3 border-transparent bg-gradient-to-r from-red-600 via-[#D4AF37] to-green-600 p-0.5">
          <div className="relative bg-gray-900 rounded-lg overflow-hidden">
            <video
              ref={videoRef}
              className="w-full h-auto object-contain"
              poster={festiveBrunchVideo.poster}
              playsInline
              preload="auto"
              muted
              loop
              autoPlay
              onLoadedMetadata={() => console.log("Video metadata loaded")}
              onLoadedData={() => console.log("Video data loaded and ready to play")}
            >
              <source src={festiveBrunchVideo.src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {videoError && (
              <div className="absolute inset-0 bg-gray-900 z-20">
                <Image
                  src={festiveBrunchVideo.poster}
                  alt="Christmas/NY Eve Experience"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <div className="text-center px-2">
                    <p className="text-white text-xs font-montserrat">Video unavailable</p>
                  </div>
                </div>
              </div>
            )}

            {/* Close/Hide Button - Top Left (Mobile Only) */}
            <div className="absolute top-2 left-2 z-30 md:hidden">
              <button
                onClick={toggleVideoVisibility}
                className="bg-gradient-to-br from-red-600 to-green-600 hover:from-red-500 hover:to-green-500 
                         backdrop-blur-md text-white rounded-full p-2 transition-all duration-200 
                         hover:scale-110 active:scale-95 shadow-xl border border-white/30"
                aria-label="Hide video"
              >
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                </svg>
              </button>
            </div>

            {/* Mute/Unmute Button - Top Right */}
            <div className="absolute top-2 right-2 z-30">
              <button
                onClick={toggleMute}
                className="bg-gradient-to-br from-red-600 to-green-600 hover:from-red-500 hover:to-green-500 
                         backdrop-blur-md text-white rounded-full p-2 transition-all duration-200 
                         hover:scale-110 active:scale-95 shadow-xl border border-white/30"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? (
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                  </svg>
                ) : (
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                  </svg>
                )}
              </button>
            </div>

            {/* Festive Badge - Bottom */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-30">
              <div
                className="flex items-center justify-center gap-1 bg-gradient-to-r from-red-600 via-[#D4AF37] to-green-600 
                          text-white px-2 py-1 rounded-full text-[10px] sm:text-xs font-montserrat font-medium
                          backdrop-blur-md border border-white/30 shadow-xl animate-pulse whitespace-nowrap"
              >
                <span className="text-xs sm:text-sm">🎄</span>
                <span>Christmas</span>
                <span className="text-xs sm:text-sm">✨</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Content Section */}
      <section className="relative py-20 bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          {/* Festive Highlights */}
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-playfair text-[#D4AF37] mb-8">Festive Highlights</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="bg-gradient-to-br from-red-900/20 to-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                <div className="w-16 h-16 bg-[#D4AF37]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎅</span>
                </div>
                <h3 className="text-xl font-playfair text-white mb-3">Christmas Tandoori Chicken</h3>
                <p className="text-white/80 font-montserrat text-sm leading-relaxed">
                  Our signature festive dish featuring char-roasted chicken in rich Musallam gravy served with fragrant
                  rice
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-900/20 to-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                <div className="w-16 h-16 bg-[#D4AF37]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎁</span>
                </div>
                <h3 className="text-xl font-playfair text-white mb-3">Festive Specialties</h3>
                <p className="text-white/80 font-montserrat text-sm leading-relaxed">
                  Enjoy tandoori garlic prawns, mutton keema, and other seasonal delights prepared specially for
                  Christmas
                </p>
              </div>
              <div className="bg-gradient-to-br from-amber-900/20 to-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                <div className="w-16 h-16 bg-[#D4AF37]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">✨</span>
                </div>
                <h3 className="text-xl font-playfair text-white mb-3">Festive Ambiance</h3>
                <p className="text-white/80 font-montserrat text-sm leading-relaxed">
                  Celebrate in style with festive decorations, warm hospitality, and the spirit of Christmas throughout
                  your meal
                </p>
              </div>
            </div>
          </div>

          {/* Menu Legend */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center gap-8 bg-black/30 backdrop-blur-sm px-8 py-4 rounded-2xl border border-white/20">
              <div className="flex items-center">
                <span className="text-2xl mr-3">🟢</span>
                <span className="text-base font-montserrat text-white">Vegetarian</span>
              </div>
              <div className="flex items-center">
                <span className="text-2xl mr-3">🔴</span>
                <span className="text-base font-montserrat text-white">Non-Vegetarian</span>
              </div>
            </div>
          </div>

          {/* Menu Categories */}
          {festiveBrunchMenu.categories.map((category, index) => (
            <MenuCategorySection key={index} category={category} />
          ))}

          {/* Festive Dining Guide */}
          <div className="mt-20 mb-16">
            <h2 className="text-3xl md:text-4xl font-playfair text-center text-[#D4AF37] mb-8">
              Make Your Christmas Memorable
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                <h3 className="text-xl font-playfair text-[#D4AF37] mb-4">🎄 Perfect for Families</h3>
                <p className="text-white/80 font-montserrat text-sm leading-relaxed mb-3">
                  Our Christmas/NY Eve is designed for families to come together and celebrate. With a variety of
                  vegetarian and non-vegetarian options, there's something for everyone to enjoy during this special
                  season.
                </p>
                <p className="text-white/70 font-montserrat text-xs">
                  Kids-friendly options available. Special seating arrangements for large groups
                </p>
              </div>
              <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                <h3 className="text-xl font-playfair text-[#D4AF37] mb-4">🎅 Christmas Specials</h3>
                <p className="text-white/80 font-montserrat text-sm leading-relaxed mb-3">
                  Don't miss our exclusive Christmas Tandoori Chicken - a festive twist on our signature dishes. Paired
                  with Mutton Keema and Tandoori Garlic Prawns, it's a celebration of flavors.
                </p>
                <p className="text-white/70 font-montserrat text-xs">
                  Limited seating available. Reserve early for the best experience
                </p>
              </div>
              <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                <h3 className="text-xl font-playfair text-[#D4AF37] mb-4">🍽️ Multi-Course Experience</h3>
                <p className="text-white/80 font-montserrat text-sm leading-relaxed mb-3">
                  From fresh salads and chaats to tandoori specialties, rich curries, and decadent desserts - enjoy a
                  complete festive feast that takes you through the best of Indian culinary traditions.
                </p>
                <p className="text-white/70 font-montserrat text-xs">
                  All dishes prepared fresh using premium ingredients
                </p>
              </div>
              <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                <h3 className="text-xl font-playfair text-[#D4AF37] mb-4">🎁 Multiple Dining Options</h3>
                <p className="text-white/80 font-montserrat text-sm leading-relaxed mb-3">
                  Join us for Christmas Eve Dinner (24th Dec), or celebrate on Christmas Day with both Brunch and Dinner
                  options (25th Dec). Make your holiday special with multiple opportunities to dine with us.
                </p>
                <p className="text-white/70 font-montserrat text-xs">
                  Advanced reservations recommended for all time slots
                </p>
              </div>
            </div>
            <div className="text-center mt-8">
              <p className="text-white/70 font-montserrat text-sm italic">
                Wishing you and your loved ones a Merry Christmas! Our team is ready to make your festive celebration
                unforgettable! 🎄✨
              </p>
            </div>
          </div>

          {/* Reservation CTA */}
          <div className="text-center mt-20 mb-16">
            <div className="bg-gradient-to-br from-red-900/20 via-[#D4AF37]/10 to-green-900/20 backdrop-blur-sm p-8 rounded-3xl border border-[#D4AF37]/20 max-w-4xl mx-auto mb-8">
              <h3 className="text-2xl md:text-3xl font-playfair text-[#D4AF37] mb-4">
                Ready to Celebrate Christmas with Us?
              </h3>
              <p className="text-white/80 font-montserrat mb-6 leading-relaxed">
                Reserve your table now for our exclusive Festive Christmas Brunch. Limited seating available for 24th
                December Dinner and 25th December Brunch/Dinner. Create magical memories with your loved ones this
                Christmas season!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/reservations">
                  <Button className="bg-gradient-to-r from-red-700 via-[#D4AF37] to-green-700 text-white hover:from-green-700 hover:via-[#D4AF37] hover:to-red-700 font-montserrat font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#D4AF37]/25">
                    Reserve Your Table
                  </Button>
                </Link>
                <Link href={"tel:+6580121181"} className="ml-0 sm:ml-4">
                  <Button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black font-montserrat font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105">
                    Call Us: +65 80121181
                  </Button>
                </Link>
              </div>
            </div>

            <Link href="/menu">
              <Button className="bg-transparent border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black font-montserrat font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105">
                Explore Other Menus
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
