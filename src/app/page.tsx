import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function HomePage() {
  const navItems = ["HOME", "MENU", "OUR STORY", "RESERVATIONS"];

  return (
    <main className="w-full bg-black text-white overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-6 bg-transparent">
        {navItems.map((item, idx) => (
          <span key={idx} className="uppercase tracking-wide text-lg hover:underline cursor-pointer">
            {item}
          </span>
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

      {/* About Section */}
      <section className="h-screen w-full bg-cover bg-center flex items-start justify-end p-16" style={{ backgroundImage: "url('/images/about.jpg')" }}>
        <div className="max-w-xl text-right">
          <h2 className="text-4xl font-serif mb-4">Not Just a Meal. An Experience.</h2>
          <p className="text-lg leading-relaxed">Our kitchen lives in the heart of every dish. Locally sourced, passionately crafted.</p>
        </div>
      </section>

      {/* Location & Hours */}
      <section className="h-screen w-full bg-cover bg-center flex items-center justify-center text-center px-8" style={{ backgroundImage: "url('/images/location.jpg')" }}>
        <div>
          <h2 className="text-3xl font-serif mb-2">Visit Us</h2>
          <p className="text-lg">123 Rustic Lane, Singapore | Tue–Sun: 11am – 10pm</p>
          <div className="mt-6 space-x-4">
            <Button className="uppercase px-5 py-2 bg-white text-black">Order Online</Button>
            <Button className="uppercase px-5 py-2 bg-yellow-600 text-white">Reserve</Button>
          </div>
        </div>
      </section>

      {/* Accolades */}
      <section className="h-screen w-full bg-cover bg-center flex items-center justify-start p-16" style={{ backgroundImage: "url('/images/awards.jpg')" }}>
        <div className="max-w-md">
          <h2 className="text-4xl font-serif mb-3">Finalists & Flattered</h2>
          <p className="text-lg italic">Selected for the James Beard Foundation Award – and it's just the beginning.</p>
        </div>
      </section>

      {/* Events */}
      <section className="h-screen w-full bg-[#1e1e1e] text-white grid grid-cols-1 md:grid-cols-3">
        <div className="bg-cover bg-center h-full" style={{ backgroundImage: "url('/images/event1.jpg')" }}></div>
        <div className="bg-cover bg-center h-full" style={{ backgroundImage: "url('/images/event2.jpg')" }}></div>
        <div className="bg-cover bg-center h-full flex items-center justify-center p-8" style={{ backgroundImage: "url('/images/event3.jpg')" }}>
          <div className="text-center">
            <h2 className="text-3xl font-serif mb-2">We Host. You Toast.</h2>
            <p className="mb-4">Let us craft your private dining experience with flavor and flair.</p>
            <Button className="uppercase px-5 py-2 bg-white text-black">View All</Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="h-screen w-full grid grid-cols-1 md:grid-cols-2 bg-black">
        <div className="bg-cover bg-center h-full" style={{ backgroundImage: "url('/images/testimonial.jpg')" }}></div>
        <div className="flex items-center justify-center p-12">
          <blockquote className="text-xl italic font-serif max-w-md">
            "Every bite was a revelation. The space, the staff, the food—everything sings."
          </blockquote>
        </div>
      </section>

      {/* Footer */}
      <footer className="h-20 w-full bg-black flex items-center justify-center">
        <p className="text-sm opacity-70">© 2025 ButcherBee Singapore</p>
      </footer>
    </main>
  );
}
