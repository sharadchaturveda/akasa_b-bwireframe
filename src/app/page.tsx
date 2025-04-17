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
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-6 bg-transparent">
        {navItems.map((item) => (
          <Link 
            key={item.name} 
            href={item.path}
            className="uppercase tracking-wide text-lg hover:underline cursor-pointer"
          >
            {item.name}
          </Link>
        ))}
      </header>

      {/* Hero Section */}
      <section className="h-screen w-full bg-cover bg-center flex items-center justify-center relative" style={{ backgroundImage: "url('/images/hero.jpg')" }}>
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <Image
            src="/images/logo.png"
            alt="Akasa Logo"
            width={600}
            height={600}
            className="w-[600px] h-auto"
            priority
          />
        </div>
        <div className="text-center z-20 mt-[400px]">
          <h1 className="text-5xl md:text-7xl font-serif uppercase mb-6">Honest. Goodness. Eats.</h1>
          <Button variant="default" className="uppercase px-6 py-3 bg-white text-black">Explore Menu</Button>
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
      <section className="h-[40vh] w-full grid grid-cols-[45%_55%]">
        {/* Left Side - Brand Philosophy */}
        <div className="bg-[#E8F0F7] p-16 flex flex-col justify-center">
          <div className="max-w-md">
            <h3 className="text-2xl text-[#1A2A3A] mb-2">Not just a meal.</h3>
            <h2 className="text-4xl text-[#1A2A3A] mb-6">An experience.</h2>
            <p className="text-[#1A2A3A] mb-8 leading-relaxed">
              We build meaningful relationships with our suppliers, especially the farmers who bring us the finest and freshest seasonal produce. We prize heirloom vegetables and pasture raised meats. We are driven by a passion to create dishes that burst with rich, wholesome flavor. We encourage you to dine family style, whether you order a la carte or our chef's choice experience, dishes are served as they come and are meant to be shared.
            </p>
            <Button className="bg-[#1A2A3A] text-white hover:bg-[#0A1A2A]" showArrow>
              Our Location
            </Button>
          </div>
        </div>

        {/* Right Side - Location Info */}
        <div className="relative" style={{ backgroundImage: "url('/images/drink.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="relative h-full flex flex-col justify-center p-16">
            <h2 className="text-4xl font-serif mb-8">Singapore</h2>
            
            <div className="space-y-6">
              <div>
                <p className="text-gray-300 text-sm">brunch:</p>
                <p className="text-white text-lg">10am - 2pm, Saturday</p>
              </div>
              
              <div>
                <p className="text-gray-300 text-sm">dinner:</p>
                <p className="text-white text-lg">5pm - 9:30pm, Monday–Thursday, Sunday</p>
                <p className="text-white text-lg">5pm–10pm, Friday & Saturday</p>
              </div>
            </div>

            <div className="mt-12 space-y-4">
              <Button className="bg-[#1A2A3A] text-white hover:bg-[#0A1A2A] w-full" showArrow>
                Order Online
              </Button>
              <Button className="bg-[#1A2A3A] text-white hover:bg-[#0A1A2A] w-full" showArrow>
                Make a Reservation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Accolades */}
      <section className="h-screen w-full bg-cover bg-center flex items-center justify-start p-17" style={{ backgroundImage: "url('/images/awards.jpg')" }}>
        <div className="max-w-md ml-8">
          <h2 className="text-2xl font-serif mb-2">Finalists & Flattered</h2>
          <p className="text-base italic mb-6">Selected for the James Beard Foundation Award – and it's just the beginning.</p>
          <div className="space-y-4">
            <Button className="bg-[#1A2A3A] text-white hover:bg-[#0A1A2A] w-full" showArrow>
              Order Online
            </Button>
            <Button className="bg-[#1A2A3A] text-white hover:bg-[#0A1A2A] w-full" showArrow>
              Make a Reservation
            </Button>
          </div>
        </div>
      </section>

      {/* Auto-scrolling Gallery */}
      <section className="w-full bg-black py-16 overflow-hidden">
        <div className="flex animate-scroll">
          <div className="flex space-x-8">
            {/* First set of images */}
            <div className="flex-none w-[300px] h-[400px] relative">
              <Image
                src="/images/gallery1.jpg"
                alt="Gallery Image 1"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-none w-[300px] h-[400px] relative">
              <Image
                src="/images/gallery2.jpg"
                alt="Gallery Image 2"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-none w-[300px] h-[400px] relative">
              <Image
                src="/images/gallery3.jpg"
                alt="Gallery Image 3"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-none w-[300px] h-[400px] relative">
              <Image
                src="/images/gallery4.jpg"
                alt="Gallery Image 4"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-none w-[300px] h-[400px] relative">
              <Image
                src="/images/gallery5.jpg"
                alt="Gallery Image 5"
                fill
                className="object-cover"
              />
            </div>
            {/* Duplicate set for seamless scrolling */}
            <div className="flex-none w-[300px] h-[400px] relative">
              <Image
                src="/images/gallery1.jpg"
                alt="Gallery Image 1"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-none w-[300px] h-[400px] relative">
              <Image
                src="/images/gallery2.jpg"
                alt="Gallery Image 2"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-none w-[300px] h-[400px] relative">
              <Image
                src="/images/gallery3.jpg"
                alt="Gallery Image 3"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-none w-[300px] h-[400px] relative">
              <Image
                src="/images/gallery4.jpg"
                alt="Gallery Image 4"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-none w-[300px] h-[400px] relative">
              <Image
                src="/images/gallery5.jpg"
                alt="Gallery Image 5"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Location & Hours */}
      <section className="h-screen w-full bg-cover bg-center flex items-center justify-center text-center px-8" style={{ backgroundImage: "url('/images/location.jpg')" }}>
        <div>
          <h2 className="text-3xl font-serif mb-2">Visit Us</h2>
          <p className="text-lg">123 Rustic Lane, Singapore | Tue–Sun: 11am – 10pm</p>
          <div className="mt-6 space-x-4">
            <Button className="uppercase px-5 py-2 bg-white text-[#1A2A3A]">Order Online</Button>
            <Button className="uppercase px-5 py-2 bg-[#1A2A3A] text-white">Reserve</Button>
          </div>
        </div>
      </section>

      {/* Events */}
      <section className="h-screen w-full bg-[#1A2A3A] text-white grid grid-cols-1 md:grid-cols-3">
        <div className="bg-cover bg-center h-full" style={{ backgroundImage: "url('/images/event1.jpg')" }}></div>
        <div className="bg-cover bg-center h-full" style={{ backgroundImage: "url('/images/event2.jpg')" }}></div>
        <div className="bg-cover bg-center h-full flex items-center justify-center p-8" style={{ backgroundImage: "url('/images/event3.jpg')" }}>
          <div className="text-center">
            <h2 className="text-3xl font-serif mb-2">We Host. You Toast.</h2>
            <p className="mb-4">Let us craft your private dining experience with flavor and flair.</p>
            <Button className="uppercase px-5 py-2 bg-white text-[#1A2A3A]">View All</Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="h-screen w-full grid grid-cols-1 md:grid-cols-2 bg-[#1A2A3A]">
        <div className="bg-cover bg-center h-full" style={{ backgroundImage: "url('/images/testimonial.jpg')" }}></div>
        <div className="flex items-center justify-center p-12">
          <blockquote className="text-xl italic font-serif max-w-md">
            "Every bite was a revelation. The space, the staff, the food—everything sings."
          </blockquote>
        </div>
      </section>

      {/* Footer */}
      <footer className="h-20 w-full bg-[#1A2A3A] flex items-center justify-center">
        <p className="text-sm opacity-70">© 2025 Akasa Singapore</p>
      </footer>
    </main>
  );
}
