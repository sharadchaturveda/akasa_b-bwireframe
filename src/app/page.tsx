"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "HOME", path: "/" },
    { name: "MENU", path: "/menu" },
    { name: "OUR CHEF", path: "/chef" },
    { name: "RESERVATIONS", path: "/reservations" }
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <main className="w-full bg-black text-white overflow-x-hidden">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50 px-4 md:px-8 py-4 md:py-6">
        {/* Desktop Navigation */}
        <div className="hidden md:flex justify-between items-center">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className="uppercase tracking-wider text-base font-montserrat text-white hover:text-white/80 transition-colors duration-200 relative group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-300"></span>
            </Link>
          ))}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex justify-between items-center">
          <Link href="/" className="uppercase tracking-wide text-lg font-montserrat text-white">{"Akasa"}</Link>
          <button
            onClick={toggleMobileMenu}
            className="text-white p-2 rounded-md border border-white/20 flex items-center justify-center transition-all duration-300 hover:bg-white/10"
            aria-label="Toggle menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 bg-black/95 z-40 md:hidden flex flex-col items-center justify-center transition-opacity duration-300 will-change-opacity ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          {/* Close button at top right */}
          <button
            onClick={toggleMobileMenu}
            className="absolute top-4 right-4 text-white p-3 rounded-full bg-[#1A2A3A] hover:bg-[#0A1A2A] transition-all duration-300 flex items-center justify-center shadow-lg"
            aria-label="Close menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <div className={`flex flex-col items-center gap-8 transition-transform duration-500 ${mobileMenuOpen ? 'translate-y-0' : 'translate-y-10'}`}>
            {navItems.map((item, index) => (
              <Link
                key={item.name}
                href={item.path}
                className={`uppercase tracking-wider text-xl font-montserrat text-white hover:text-white/80 transition-all duration-300 relative group opacity-0 animate-fadeIn`}
                onClick={() => setMobileMenuOpen(false)}
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="h-screen w-full bg-cover bg-center flex items-center justify-center relative" style={{ backgroundImage: "url('/images/hero.jpg')" }}>
        <div className="absolute inset-0 flex items-center justify-center" style={{ top: '-15%', bottom: '40%' }}>
          <Image
            src="/images/logo.png"
            alt="Akasa Logo"
            width={450}
            height={450}
            className="w-[250px] sm:w-[350px] md:w-[450px] h-auto"
            priority
            quality={80}
          />
        </div>
        <div className="text-center relative z-20">
          <div className="mb-10">
            <div className="flex flex-col items-center">
              <span className="text-sm md:text-base text-white/80 font-montserrat tracking-[0.3em] uppercase mb-2">{"Experience"}</span>
              <h1 className="relative font-playfair text-4xl sm:text-5xl md:text-6xl text-white italic mb-2">
                {"Finest Indian Cuisine"}
              </h1>
              <div className="flex items-center justify-center w-full mb-4">
                <div className="h-[1px] w-12 md:w-16 bg-white/40"></div>
                <div className="mx-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-60">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" strokeWidth="1" />
                    <path d="M12 6V12L16 14" stroke="white" strokeWidth="1" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="h-[1px] w-12 md:w-16 bg-white/40"></div>
              </div>
              <span className="text-xs md:text-sm text-white/70 font-montserrat tracking-wider">{"ESTABLISHED 1995"}</span>
            </div>
          </div>
          <Button variant="default" className="uppercase bg-[#1A2A3A] text-white hover:bg-[#0A1A2A] w-[240px] text-center">{"Explore Menu"}</Button>
        </div>
        <div className="absolute inset-0 bg-black/30"></div>
      </section>

      {/* About Section - Commented out
      <section className="h-screen w-full bg-cover bg-center flex items-start justify-end p-16" style={{ backgroundImage: "url('/images/about.jpg')" }}>
        <div className="max-w-xl text-right">
          <h2 className="text-4xl font-serif mb-4">Not Just a Meal. An Experience.</h2>
          <p className="text-lg leading-relaxed">Our kitchen lives in the heart of every dish. Locally sourced, passionately crafted.</p>
        </div>
      </section>
      */}

      {/* Brand Philosophy Section */}
      <section className="min-h-[80vh] w-full grid grid-cols-1 md:grid-cols-[45%_55%]">
        {/* Left Side - Brand Philosophy */}
        <div className="relative p-6 md:p-16 flex flex-col justify-center" style={{ backgroundImage: "url('/images/philosophy-bg.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="relative max-w-md">
            <h3 className="text-2xl font-montserrat text-white mb-2">{"Not just a meal."}</h3>
            <h2 className="text-4xl font-playfair text-white mb-6">{"An experience."}</h2>
            <p className="font-montserrat text-white mb-8 leading-relaxed">
              {"We work closely with local farmers to bring you the freshest seasonal ingredients. Inspired by India's rich culinary heritage, we use heirloom grains, vibrant spices, and pasture-raised meats to craft soulful dishes. Enjoy them the traditional way—family style. Whether you order à la carte or try our chef's selection, everything is served to share."}
            </p>
            <Button className="bg-[#1A2A3A] text-white hover:bg-[#0A1A2A] w-[240px] px-6 text-center" showArrow>
              {"Our Location"}
            </Button>
          </div>
        </div>

        {/* Right Side - Location Info */}
        <div className="relative" style={{ backgroundImage: "url('/images/drink.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="relative h-full flex flex-col justify-center p-6 md:p-16">
            <h2 className="text-4xl font-playfair mb-6">{"Singapore"}</h2>

            <div className="space-y-6">
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

            <div className="mt-12 flex flex-col gap-4">
              <Button className="bg-[#1A2A3A] text-white hover:bg-[#0A1A2A] w-[240px] px-6 py-3 text-center" showArrow>
                {"Order Online"}
              </Button>
              <Button className="bg-[#1A2A3A] text-white hover:bg-[#0A1A2A] w-[240px] px-6 py-3 text-center" showArrow>
                {"Make a Reservation"}
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* Accolades */}
      <section className="min-h-screen sm:h-screen w-full bg-cover bg-center relative py-16 sm:py-0" style={{ backgroundImage: "url('/images/awards.jpg')" }}>
        {/* Dark overlay for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"></div>

        {/* Content container */}
        <div className="relative h-full w-full flex items-end justify-start p-17 z-10">
          <div className="max-w-sm ml-8 mb-24 bg-black/70 p-6 rounded-lg border border-[#8B4513]/20 shadow-xl">
            <h2 className="text-2xl font-playfair mb-2 text-white">{"Celebrated & Savored"}</h2>
            <p className="text-base italic font-montserrat mb-6 text-gray-200">{"Where spice meets soul – Indian cuisine, reimagined."}</p>
            <div className="flex flex-col gap-4 w-full">
              <Button className="bg-[#1A2A3A] text-white hover:bg-[#0A1A2A] w-full px-6 py-3 text-center" showArrow>
                {"Order Online"}
              </Button>
              <Button className="bg-[#1A2A3A] text-white hover:bg-[#0A1A2A] w-full px-6 py-3 text-center" showArrow>
                {"Make a Reservation"}
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* Auto-scrolling Gallery - directly connected to Toast section */}
      <section className="w-full overflow-hidden p-0 m-0 flex flex-col">
        {/* Desktop gallery */}
        <div className="hidden sm:flex animate-scroll will-change-transform hardware-accelerated">
          <div className="flex">
            {/* First set of images - reduced for better performance */}
            <div className="flex-none w-[400px] h-[400px] relative">
              <Image
                src="/images/gallery1.jpg"
                alt="Gallery Image 1"
                fill
                className="object-cover"
                loading="lazy"
                sizes="(max-width: 640px) 300px, 400px"
                quality={70}
              />
            </div>
            <div className="flex-none w-[400px] h-[400px] relative">
              <Image
                src="/images/gallery3.jpg"
                alt="Gallery Image 3"
                fill
                className="object-cover"
                loading="lazy"
                sizes="(max-width: 640px) 300px, 400px"
                quality={70}
              />
            </div>
            <div className="flex-none w-[400px] h-[400px] relative">
              <Image
                src="/images/gallery5.jpg"
                alt="Gallery Image 5"
                fill
                className="object-cover"
                loading="lazy"
                sizes="(max-width: 640px) 300px, 400px"
                quality={70}
              />
            </div>
            {/* Duplicate set for seamless scrolling */}
            <div className="flex-none w-[400px] h-[400px] relative">
              <Image
                src="/images/gallery1.jpg"
                alt="Gallery Image 1"
                fill
                className="object-cover"
                loading="lazy"
                sizes="(max-width: 640px) 300px, 400px"
                quality={70}
              />
            </div>
            <div className="flex-none w-[400px] h-[400px] relative">
              <Image
                src="/images/gallery3.jpg"
                alt="Gallery Image 3"
                fill
                className="object-cover"
                loading="lazy"
                sizes="(max-width: 640px) 300px, 400px"
                quality={70}
              />
            </div>
            <div className="flex-none w-[400px] h-[400px] relative">
              <Image
                src="/images/gallery5.jpg"
                alt="Gallery Image 5"
                fill
                className="object-cover"
                loading="lazy"
                sizes="(max-width: 640px) 300px, 400px"
                quality={70}
              />
            </div>
          </div>
        </div>

        {/* Mobile gallery - Simple scrollable gallery */}
        <div className="sm:hidden block p-0 m-0">
          <div className="relative">
            {/* Subtle arrow indicator for scrolling */}
            <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10 pointer-events-none">
              <span className="bg-black/30 text-white p-2 rounded-full inline-flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6"></path>
                </svg>
              </span>
            </div>

            {/* Simple scrollable container - no padding, no scrollbar */}
            <div className="overflow-x-auto scrollbar-hide pb-0 mb-0">
              <div className="flex w-max pb-0 mb-0">
                <div className="w-[100vw] h-[250px] flex-shrink-0 overflow-hidden">
                  <img
                    src="/images/gallery1.jpg"
                    alt="Gallery Image 1"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-[100vw] h-[250px] flex-shrink-0 overflow-hidden">
                  <img
                    src="/images/gallery3.jpg"
                    alt="Gallery Image 3"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-[100vw] h-[250px] flex-shrink-0 overflow-hidden">
                  <img
                    src="/images/gallery5.jpg"
                    alt="Gallery Image 5"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-[100vw] h-[250px] flex-shrink-0 overflow-hidden">
                  <img
                    src="/images/gallery1.jpg"
                    alt="Gallery Image 1"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-[100vw] h-[250px] flex-shrink-0 overflow-hidden">
                  <img
                    src="/images/gallery3.jpg"
                    alt="Gallery Image 3"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Auto-scrolling gallery for desktop */}
        <div className="hidden sm:block">
          <div className="relative overflow-hidden">
            <div className="flex animate-scroll will-change-transform hardware-accelerated">
              <div className="flex-none w-[400px] h-[400px] relative">
                <Image
                  src="/images/gallery1.jpg"
                  alt="Gallery Image 1"
                  fill
                  className="object-cover"
                  loading="lazy"
                  sizes="400px"
                  quality={70}
                />
              </div>
              <div className="flex-none w-[400px] h-[400px] relative">
                <Image
                  src="/images/gallery3.jpg"
                  alt="Gallery Image 3"
                  fill
                  className="object-cover"
                  loading="lazy"
                  sizes="400px"
                  quality={70}
                />
              </div>
              <div className="flex-none w-[400px] h-[400px] relative">
                <Image
                  src="/images/gallery5.jpg"
                  alt="Gallery Image 5"
                  fill
                  className="object-cover"
                  loading="lazy"
                  sizes="400px"
                  quality={70}
                />
              </div>
              <div className="flex-none w-[400px] h-[400px] relative">
                <Image
                  src="/images/gallery1.jpg"
                  alt="Gallery Image 1"
                  fill
                  className="object-cover"
                  loading="lazy"
                  sizes="400px"
                  quality={70}
                />
              </div>
              <div className="flex-none w-[400px] h-[400px] relative">
                <Image
                  src="/images/gallery3.jpg"
                  alt="Gallery Image 3"
                  fill
                  className="object-cover"
                  loading="lazy"
                  sizes="400px"
                  quality={70}
                />
              </div>
              <div className="flex-none w-[400px] h-[400px] relative">
                <Image
                  src="/images/gallery5.jpg"
                  alt="Gallery Image 5"
                  fill
                  className="object-cover"
                  loading="lazy"
                  sizes="400px"
                  quality={70}
                />
              </div>
            </div>
          </div>
        </div>

      {/* Toast Section - directly connected to gallery */}
      <div className="h-[40vh] w-full bg-[#1e1e1e] text-white">
        <div className="h-full w-full bg-cover bg-center flex items-center justify-center p-8" style={{ backgroundImage: "url('/images/event3.jpg')" }}>
          <div className="text-center">
            <h2 className="text-3xl font-playfair mb-2">{"We Host. You Toast."}</h2>
            <p className="mb-4 font-montserrat">{"Let us craft your private dining experience with flavor and flair."}</p>
            <Button className="uppercase bg-[#1A2A3A] text-white hover:bg-[#0A1A2A] w-[240px] text-center">{"View All"}</Button>
          </div>
        </div>
      </div>
      </section>
      {/* What's Happening Section */}
      <section className="w-full py-0 -mt-1">
        <div className="grid grid-cols-1 md:grid-cols-[55%_45%]">
          <div className="h-[50vh] md:h-[80vh] w-full bg-cover bg-center" style={{ backgroundImage: "url('/images/whats-happening.jpg')" }}></div>
          <div className="h-[50vh] md:h-[80vh] relative w-full flex flex-col justify-center p-6 md:p-16" style={{ backgroundImage: "url('/images/whats-happening-bg.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="relative">
              <h2 className="text-4xl font-playfair text-white mb-6">{"What's Happening"}</h2>
              <p className="text-white mb-8 leading-relaxed font-montserrat">
                {"At Akasa, We're always cooking up something new with exciting offers & events."}
              </p>
              <Button className="bg-[#1A2A3A] text-white hover:bg-[#0A1A2A] w-[240px] text-center" showArrow>
                {"Find Out More"}
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* Testimonials */}
      <section className="w-full relative py-16 -mt-1">
        {/* Full-width background image - using CSS background for better performance */}
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/testimonial.jpg')" }}></div>

        {/* Overlay with gradient for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-black/70"></div>

        {/* Content container */}
        <div className="relative flex flex-col items-center justify-center px-4 sm:px-8 py-16 z-10">
          <div className="w-full max-w-6xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair mb-4 text-white">{"Through the Grapevine"}</h2>
            <p className="text-lg font-montserrat text-gray-200 mb-8 italic">{"What our guests are saying"}</p>

            {/* Simplified decorative element for better performance */}
            <div className="flex items-center justify-center mb-8">
              <div className="w-16 h-[1px] bg-[#8B4513]"></div>
              <div className="w-3 h-3 mx-2 rounded-full bg-[#8B4513]"></div>
              <div className="w-16 h-[1px] bg-[#8B4513]"></div>
            </div>

            {/* Testimonials container - single column on mobile, 3 columns on desktop */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {/* Testimonial 1 - simplified for better performance */}
              <div className="bg-[#0D0D0D]/90 p-4 sm:p-6 rounded-lg border border-[#8B4513]/30 shadow-lg">
                <div className="text-5xl sm:text-6xl text-[#8B4513] font-lora leading-none mb-3">&quot;</div>
                <blockquote className="text-base sm:text-lg italic font-lora text-white">
                  {"Every bite was a revelation. The space, the staff, the food—everything sings."}
                  <footer className="mt-4 text-sm not-italic text-gray-300 flex items-center justify-center font-montserrat">
                    <span className="w-6 h-[1px] bg-[#8B4513] mr-2"></span>
                    {"Sarah Johnson, Food Critic"}
                  </footer>
                </blockquote>
              </div>

              {/* Testimonial 2 - simplified for better performance */}
              <div className="bg-[#0D0D0D]/90 p-4 sm:p-6 rounded-lg border border-[#8B4513]/30 shadow-lg">
                <div className="text-5xl sm:text-6xl text-[#8B4513] font-lora leading-none mb-3">&quot;</div>
                <blockquote className="text-base sm:text-lg italic font-lora text-white">
                  {"An unforgettable dining experience that blends tradition with innovation."}
                  <footer className="mt-4 text-sm not-italic text-gray-300 flex items-center justify-center font-montserrat">
                    <span className="w-6 h-[1px] bg-[#8B4513] mr-2"></span>
                    {"Michael Chen, Regular Patron"}
                  </footer>
                </blockquote>
              </div>

              {/* Testimonial 3 - simplified for better performance */}
              <div className="bg-[#0D0D0D]/90 p-4 sm:p-6 rounded-lg border border-[#8B4513]/30 shadow-lg">
                <div className="text-5xl sm:text-6xl text-[#8B4513] font-lora leading-none mb-3">&quot;</div>
                <blockquote className="text-base sm:text-lg italic font-lora text-white">
                  {"The flavors transported me back to my grandmother's kitchen in Delhi. Authentic yet elevated."}
                  <footer className="mt-4 text-sm not-italic text-gray-300 flex items-center justify-center font-montserrat">
                    <span className="w-6 h-[1px] bg-[#8B4513] mr-2"></span>
                    {"Priya Patel, Food Blogger"}
                  </footer>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Visit Us Section */}
      <section className="min-h-[80vh] w-full bg-cover bg-center flex items-center justify-center text-center px-8 py-16 relative -mt-1" style={{ backgroundImage: "url('/images/location.jpg')" }}>
        {/* Dark overlay for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/30"></div>

        <div className="relative z-10 bg-black/70 p-6 sm:p-10 rounded-lg border border-white/10 shadow-2xl w-[90%] max-w-lg">
          <h2 className="text-3xl font-playfair mb-4 text-white" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}>{"Visit Us"}</h2>
          <p className="text-lg font-montserrat text-white mb-8" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}>{"79 Robinson Road, #01-03 Capitasky, Tanjong Pagar, Singapore 068897"}</p>
          <p className="text-base font-montserrat text-white mb-8" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}>{"Monday to Saturday: 11:30am to 10:00pm"}</p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button className="uppercase bg-[#1A2A3A] text-white hover:bg-[#0A1A2A] w-full sm:w-[240px] text-center">{"Order Online"}</Button>
            <Button className="uppercase bg-[#1A2A3A] text-white hover:bg-[#0A1A2A] w-full sm:w-[240px] text-center">{"Reserve"}</Button>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="h-40 w-full relative flex items-center justify-center -mt-1 pt-0">
        {/* Thin separator line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/20 z-10"></div>

        {/* Background image */}
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/footer-bg.jpg')" }}></div>

        {/* Dark overlay for better text visibility */}
        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative z-10 flex flex-col items-center justify-center gap-2">
          <div className="bg-white/20 p-2 rounded-full mb-2">
            <Image
              src="/images/logo.png"
              alt="Akasa Logo"
              width={80}
              height={80}
              loading="lazy"
              quality={80}
              className="w-[60px] h-auto"
            />
          </div>
          <div className="flex gap-5 mb-2">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
            </a>
          </div>
          <p className="text-sm text-white/70 font-montserrat">{"© 2025 Akasa Singapore"}</p>
        </div>
      </footer>
    </main>
  );
}
