import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  const navItems = [
    { name: "HOME", path: "/" },
    { name: "MENU", path: "/menu" },
    { name: "OUR CHEF", path: "/chef" },
    { name: "RESERVATIONS", path: "/reservations" }
  ];

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
          <button className="text-white p-2 rounded-md border border-white/20">
            <span className="font-montserrat text-sm uppercase tracking-widest">{"Menu"}</span>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="h-screen w-full bg-cover bg-center flex items-center justify-center relative" style={{ backgroundImage: "url('/images/hero.jpg')" }}>
        <div className="absolute inset-0 flex items-center justify-center" style={{ top: '-15%', bottom: '40%' }}>
          <Image
            src="/images/logo.png"
            alt="Akasa Logo"
            width={3840}
            height={3840}
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
              {"We work closely with local farmers to bring you the freshest seasonal ingredients. Inspired by India&apos;s rich culinary heritage, we use heirloom grains, vibrant spices, and pasture-raised meats to craft soulful dishes. Enjoy them the traditional way—family style. Whether you order à la carte or try our chef&apos;s selection, everything is served to share."}
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
      {/* Auto-scrolling Gallery */}
      <section className="w-full overflow-hidden">
        {/* Desktop gallery */}
        <div className="hidden sm:flex animate-scroll">
          <div className="flex">
            {/* First set of images - reduced for better performance */}
            <div className="flex-none w-[400px] h-[400px] relative">
              <Image
                src="/images/gallery1.jpg"
                alt="Gallery Image 1"
                fill
                className="object-cover"
                loading="lazy"
              />
            </div>
            <div className="flex-none w-[400px] h-[400px] relative">
              <Image
                src="/images/gallery3.jpg"
                alt="Gallery Image 3"
                fill
                className="object-cover"
                loading="lazy"
              />
            </div>
            <div className="flex-none w-[400px] h-[400px] relative">
              <Image
                src="/images/gallery5.jpg"
                alt="Gallery Image 5"
                fill
                className="object-cover"
                loading="lazy"
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
              />
            </div>
            <div className="flex-none w-[400px] h-[400px] relative">
              <Image
                src="/images/gallery3.jpg"
                alt="Gallery Image 3"
                fill
                className="object-cover"
                loading="lazy"
              />
            </div>
            <div className="flex-none w-[400px] h-[400px] relative">
              <Image
                src="/images/gallery5.jpg"
                alt="Gallery Image 5"
                fill
                className="object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Mobile gallery - wider images and faster scroll */}
        <div className="flex sm:hidden animate-scroll-mobile">
          <div className="flex">
            {/* Mobile optimized gallery images */}
            <div className="flex-none w-[300px] h-[300px] relative">
              <Image
                src="/images/gallery1.jpg"
                alt="Gallery Image 1"
                fill
                className="object-cover"
                loading="lazy"
              />
            </div>
            <div className="flex-none w-[300px] h-[300px] relative">
              <Image
                src="/images/gallery3.jpg"
                alt="Gallery Image 3"
                fill
                className="object-cover"
                loading="lazy"
              />
            </div>
            <div className="flex-none w-[300px] h-[300px] relative">
              <Image
                src="/images/gallery5.jpg"
                alt="Gallery Image 5"
                fill
                className="object-cover"
                loading="lazy"
              />
            </div>
            {/* Duplicate set for seamless scrolling */}
            <div className="flex-none w-[300px] h-[300px] relative">
              <Image
                src="/images/gallery1.jpg"
                alt="Gallery Image 1"
                fill
                className="object-cover"
                loading="lazy"
              />
            </div>
            <div className="flex-none w-[300px] h-[300px] relative">
              <Image
                src="/images/gallery3.jpg"
                alt="Gallery Image 3"
                fill
                className="object-cover"
                loading="lazy"
              />
            </div>
            <div className="flex-none w-[300px] h-[300px] relative">
              <Image
                src="/images/gallery5.jpg"
                alt="Gallery Image 5"
                fill
                className="object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
      {/* Toast Section */}
      <section className="h-[40vh] w-full bg-[#1e1e1e] text-white">
        <div className="h-full w-full bg-cover bg-center flex items-center justify-center p-8" style={{ backgroundImage: "url('/images/event3.jpg')" }}>
          <div className="text-center">
            <h2 className="text-3xl font-playfair mb-2">{"We Host. You Toast."}</h2>
            <p className="mb-4 font-montserrat">{"Let us craft your private dining experience with flavor and flair."}</p>
            <Button className="uppercase bg-[#1A2A3A] text-white hover:bg-[#0A1A2A] w-[240px] text-center">{"View All"}</Button>
          </div>
        </div>
      </section>
      {/* What's Happening Section */}
      <section className="w-full py-0">
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
      <section className="min-h-screen w-full relative py-16 sm:py-0">
        {/* Full-width background image */}
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/testimonial.jpg')" }}></div>

        {/* Overlay with gradient for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-black/70"></div>

        {/* Content container */}
        <div className="relative h-full flex flex-col items-center justify-center px-4 sm:px-8 py-16 z-10">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl sm:text-5xl font-playfair mb-4 text-white">{"Through the Grapevine"}</h2>
            <p className="text-lg font-montserrat text-gray-200 mb-12 italic">{"What our guests are saying"}</p>

            {/* Decorative element - Elegant divider */}
            <div className="flex items-center justify-center mb-8 sm:mb-16">
              <div className="w-16 h-[1px] bg-[#8B4513]"></div>
              <div className="w-3 h-3 mx-2 rounded-full bg-[#8B4513]"></div>
              <div className="w-32 h-[1px] bg-[#8B4513]"></div>
              <div className="w-3 h-3 mx-2 rounded-full bg-[#8B4513]"></div>
              <div className="w-16 h-[1px] bg-[#8B4513]"></div>
            </div>

            {/* Testimonials container */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
              {/* Testimonial 1 */}
              <div className="bg-[#0D0D0D]/90 p-8 rounded-lg border border-[#8B4513]/30 hover:translate-y-[-2px] transition-transform duration-200 shadow-xl">
                <div className="text-7xl text-[#8B4513] font-lora leading-none mb-4">&quot;</div>
                <blockquote className="text-xl italic font-lora text-white">
                  {"Every bite was a revelation. The space, the staff, the food—everything sings."}
                  <footer className="mt-6 text-base not-italic text-gray-300 flex items-center justify-center font-montserrat">
                    <span className="w-8 h-[1px] bg-[#8B4513] mr-3"></span>
                    {"Sarah Johnson, Food Critic"}
                  </footer>
                </blockquote>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-[#0D0D0D]/90 p-8 rounded-lg border border-[#8B4513]/30 hover:translate-y-[-2px] transition-transform duration-200 shadow-xl">
                <div className="text-7xl text-[#8B4513] font-lora leading-none mb-4">&quot;</div>
                <blockquote className="text-xl italic font-lora text-white">
                  {"An unforgettable dining experience that blends tradition with innovation. The attention to detail is remarkable."}
                  <footer className="mt-6 text-base not-italic text-gray-300 flex items-center justify-center font-montserrat">
                    <span className="w-8 h-[1px] bg-[#8B4513] mr-3"></span>
                    {"Michael Chen, Regular Patron"}
                  </footer>
                </blockquote>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-[#0D0D0D]/90 p-8 rounded-lg border border-[#8B4513]/30 hover:translate-y-[-2px] transition-transform duration-200 shadow-xl">
                <div className="text-7xl text-[#8B4513] font-lora leading-none mb-4">&quot;</div>
                <blockquote className="text-xl italic font-lora text-white">
                  {"The flavors transported me back to my grandmother&apos;s kitchen in Delhi. Authentic yet elevated in every way."}
                  <footer className="mt-6 text-base not-italic text-gray-300 flex items-center justify-center font-montserrat">
                    <span className="w-8 h-[1px] bg-[#8B4513] mr-3"></span>
                    {"Priya Patel, Food Blogger"}
                  </footer>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Visit Us Section */}
      <section className="h-[90vh] sm:h-[90vh] w-full bg-cover bg-center flex items-center justify-center text-center px-8 relative" style={{ backgroundImage: "url('/images/location.jpg')" }}>
        {/* Dark overlay for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/30"></div>

        <div className="relative z-10 bg-black/70 p-6 sm:p-10 rounded-lg border border-white/10 shadow-2xl w-[90%] max-w-lg">
          <h2 className="text-3xl font-playfair mb-4 text-white" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}>{"Visit Us"}</h2>
          <p className="text-lg font-montserrat text-white mb-8" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}>{"79 Robinson Road, #01-03 Capitasky, Tanjong Pagar, Singapore 068897"}</p>
          <p className="text-base font-montserrat text-white mb-8" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}>{"Monday to Saturday: 11:30am to 10:00pm"}</p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button className="uppercase bg-[#1A2A3A] text-white hover:bg-[#0A1A2A] w-[240px] text-center">{"Order Online"}</Button>
            <Button className="uppercase bg-[#1A2A3A] text-white hover:bg-[#0A1A2A] w-[240px] text-center">{"Reserve"}</Button>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="h-40 w-full relative flex items-center justify-center mt-0 pt-0">
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
