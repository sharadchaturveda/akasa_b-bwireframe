"use client";

import { useEffect } from "react";
import Footer from "@/components/home/Footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import DesktopNavigation from "@/components/navigation/DesktopNavigation";
import { winePairingMenu } from "@/data/winePairingMenu";

interface WineCourse {
  course_name: string;
  dish?: {
    name: string;
    description: string;
    is_vegetarian: boolean;
  };
  dishes?: {
    name: string;
    description: string;
    is_vegetarian: boolean;
  }[];
  wine: {
    name: string;
    type: string;
    origin: string;
    description?: string;
    color: string;
  };
}

interface WineCourseSectionProps {
  course: WineCourse;
  index: number;
}

const WineCourseSection = ({ course, index }: WineCourseSectionProps) => {
  const getWineGradient = (color: string) => {
    switch (color) {
      case "sparkling":
        return "from-amber-200/20 to-amber-400/20";
      case "white":
        return "from-yellow-200/20 to-yellow-400/20";
      case "red":
        return "from-red-900/20 to-red-700/20";
      default:
        return "from-purple-200/20 to-purple-400/20";
    }
  };

  const getWineIcon = (color: string) => {
    switch (color) {
      case "sparkling":
        return "🥂";
      case "white":
        return "🍾";
      case "red":
        return "🍷";
      default:
        return "🍷";
    }
  };

  return (
    <div className="mb-20">
      {/* Course Header */}
      <div className="relative mb-12 text-center">
        <div className="inline-block">
          <span className="text-[#D4AF37]/60 font-playfair text-lg mb-2 block">Course {index + 1}</span>
          <h2 className="text-3xl md:text-4xl font-playfair text-[#D4AF37] mb-4 tracking-wider">
            {course.course_name}
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto"></div>
        </div>
      </div>

      {/* Course Content - Side by Side Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Dish Card */}
        <div className="group relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#D4AF37]/0 via-[#D4AF37]/30 to-[#D4AF37]/0 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>

          <div className="relative p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 group-hover:border-[#D4AF37]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#D4AF37]/10 h-full">
            <div className="absolute top-4 right-4">
              <span className="text-4xl">🍽️</span>
            </div>

            <h3 className="text-xl font-playfair text-white mb-6">The Dish</h3>

            {course.dish ? (
              <div className="mb-4">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-lg font-montserrat font-semibold text-white transition-colors duration-300">
                    {course.dish.name}
                  </h4>
                  <span className="text-2xl ml-2 flex-shrink-0">{course.dish.is_vegetarian ? "🟢" : "🔴"}</span>
                </div>
                <p className="text-white/80 font-montserrat text-sm leading-relaxed">{course.dish.description}</p>
              </div>
            ) : (
              <div className="space-y-6">
                {course.dishes?.map((dish, dishIndex) => (
                  <div key={dishIndex}>
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-lg font-montserrat font-semibold text-white transition-colors duration-300">
                        {dish.name}
                      </h4>
                      <span className="text-2xl ml-2 flex-shrink-0">{dish.is_vegetarian ? "🟢" : "🔴"}</span>
                    </div>
                    <p className="text-white/80 font-montserrat text-sm leading-relaxed">{dish.description}</p>
                    {dishIndex < (course.dishes?.length || 0) - 1 && (
                      <div className="my-4 text-center text-[#D4AF37]/50">or</div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Wine Card */}
        <div className="group relative">
          <div
            className={`absolute -inset-0.5 bg-gradient-to-r ${getWineGradient(
              course.wine.color
            )} rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200`}
          ></div>

          <div className="relative p-8 rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-sm border border-[#D4AF37]/20 group-hover:border-[#D4AF37]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#D4AF37]/20 h-full">
            <div className="absolute top-4 right-4">
              <span className="text-4xl">{getWineIcon(course.wine.color)}</span>
            </div>

            <h3 className="text-xl font-playfair text-[#D4AF37] mb-6">The Pairing</h3>

            <div className="mb-4">
              <h4 className="text-2xl font-playfair font-semibold text-white mb-2">{course.wine.name}</h4>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-sm font-montserrat text-[#D4AF37] bg-[#D4AF37]/10 px-3 py-1 rounded-full">
                  {course.wine.type}
                </span>
                <span className="text-sm font-montserrat text-white/70">{course.wine.origin}</span>
              </div>
              {course.wine.description && (
                <p className="text-white/90 font-montserrat text-sm leading-relaxed italic">{course.wine.description}</p>
              )}
            </div>

            {/* Pairing Connection Visual */}
            <div className="mt-6 pt-6 border-t border-[#D4AF37]/20">
              <div className="flex items-center justify-center gap-3">
                <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-[#D4AF37]"></div>
                <span className="text-[#D4AF37] text-xs font-montserrat tracking-wider">PERFECTLY PAIRED</span>
                <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-[#D4AF37]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function WinePairingPage() {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImageIndex((prev) => (prev + 1) % winePairingImages.length);
//     }, 4000);

//     return () => clearInterval(interval);
//   }, []);

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
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      {/* Festive Announcement Banner */}
      <div className="relative z-50 bg-gradient-to-r from-amber-600 via-[#D4AF37] to-amber-600 py-3">
        <div className="container mx-auto px-4 text-center">
          <p className="text-black font-montserrat font-semibold text-sm md:text-base">
            🍷 FESTIVE SPECIAL: Wine Pairing Menu | Limited Time Only | {winePairingMenu.price} per person
          </p>
        </div>
      </div>

      <DesktopNavigation className="absolute top-10 left-0 right-0 z-50" />

      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D4AF37' fill-opacity='0.1'%3E%3Cpath d='M30 0c16.569 0 30 13.431 30 30 0 16.569-13.431 30-30 30C13.431 60 0 46.569 0 30 0 13.431 13.431 0 30 0zm0 10c11.046 0 20 8.954 20 20s-8.954 20-20 20-20-8.954-20-20 8.954-20 20-20z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px",
            animation: "float 25s ease-in-out infinite",
          }}
        ></div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center py-20">
        {/* Background Image Carousel */}
        {/* <div className="absolute inset-0">
          {winePairingImages.map((image, index) => (
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
        </div> */}

        {/* Hero Content */}
        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Wine Glass Icon */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 blur-xl bg-[#D4AF37]/30 rounded-full"></div>
                <span className="text-6xl md:text-7xl relative">🍷</span>
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-playfair mb-6 text-white leading-tight">
              Festive Wine
              <span className="block text-[#D4AF37] mt-2">Pairing Menu</span>
            </h1>

            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mb-8"></div>

            <p className="text-2xl md:text-3xl font-playfair text-[#D4AF37] mb-4 italic">{winePairingMenu.subtitle}</p>

            {/* Price and Season Info */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
              <div className="bg-gradient-to-r from-[#D4AF37]/20 to-amber-600/20 backdrop-blur-sm px-6 py-3 rounded-full border border-[#D4AF37]/30">
                <span className="text-xl md:text-2xl font-playfair text-[#D4AF37] font-bold">
                  {winePairingMenu.price} per person
                </span>
              </div>
              <div className="bg-gradient-to-r from-amber-500/20 to-amber-700/20 backdrop-blur-sm px-6 py-3 rounded-full border border-amber-500/30">
                <span className="text-lg font-montserrat text-amber-400">{winePairingMenu.season}</span>
              </div>
            </div>

            {/* Experience Description */}
            <div className="bg-black/40 backdrop-blur-sm p-8 rounded-2xl border border-white/10 mb-8">
              <p className="text-lg md:text-xl font-montserrat text-white/90 max-w-3xl mx-auto leading-relaxed">
                {winePairingMenu.description}
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <span className="text-sm font-montserrat text-[#D4AF37] bg-[#D4AF37]/10 px-4 py-2 rounded-full">
                  5 Courses
                </span>
                <span className="text-sm font-montserrat text-[#D4AF37] bg-[#D4AF37]/10 px-4 py-2 rounded-full">
                  5 Wine Pairings
                </span>
                <span className="text-sm font-montserrat text-[#D4AF37] bg-[#D4AF37]/10 px-4 py-2 rounded-full">
                  International Selection
                </span>
              </div>
            </div>

            {/* Image Indicators */}
            {/* <div className="flex justify-center mt-12 space-x-2">
              {winePairingImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentImageIndex ? "bg-[#D4AF37] scale-125" : "bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div> */}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-[#D4AF37] rounded-full flex justify-center">
            <div className="w-1 h-3 bg-[#D4AF37] rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Menu Content Section */}
      <section className="relative py-20 bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          {/* Understanding Wine Pairing Section */}
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-playfair text-[#D4AF37] mb-8">The Art of Wine Pairing</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                <div className="w-16 h-16 bg-[#D4AF37]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-xl font-playfair text-white mb-3">Complementary Flavors</h3>
                <p className="text-white/80 font-montserrat text-sm leading-relaxed">
                  Each wine is carefully selected to enhance and balance the spices and flavors of the paired dish
                </p>
              </div>
              <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                <div className="w-16 h-16 bg-[#D4AF37]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌍</span>
                </div>
                <h3 className="text-xl font-playfair text-white mb-3">International Selection</h3>
                <p className="text-white/80 font-montserrat text-sm leading-relaxed">
                  Premium wines from Italy, South Africa, Chile, and Australia paired with authentic Indian cuisine
                </p>
              </div>
              <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                <div className="w-16 h-16 bg-[#D4AF37]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">✨</span>
                </div>
                <h3 className="text-xl font-playfair text-white mb-3">Curated Experience</h3>
                <p className="text-white/80 font-montserrat text-sm leading-relaxed">
                  A thoughtfully designed journey from sparkling to dessert wine, creating perfect harmony
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

          {/* Wine Pairing Courses */}
          {winePairingMenu.courses.map((course, index) => (
            <WineCourseSection key={index} course={course} index={index} />
          ))}

          {/* New to Wine Pairing? Section */}
          <div className="mt-20 mb-16">
            <h2 className="text-3xl md:text-4xl font-playfair text-center text-[#D4AF37] mb-8">
              New to Wine Pairing? Start Here!
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                <h3 className="text-xl font-playfair text-[#D4AF37] mb-4">🥂 What is Wine Pairing?</h3>
                <p className="text-white/80 font-montserrat text-sm leading-relaxed mb-3">
                  Wine pairing is the art of matching wines with food to enhance both the dish and the wine. The right
                  pairing can elevate your dining experience by creating harmony between flavors, textures, and aromas.
                </p>
                <p className="text-white/70 font-montserrat text-xs">
                  Our sommelier has carefully selected each wine to complement Chef Akhilesh's authentic Indian cuisine
                </p>
              </div>
              <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                <h3 className="text-xl font-playfair text-[#D4AF37] mb-4">🍷 Understanding Wine Types</h3>
                <p className="text-white/80 font-montserrat text-sm leading-relaxed mb-3">
                  <strong className="text-[#D4AF37]">Sparkling:</strong> Light, bubbly, refreshing - perfect for
                  starters
                  <br />
                  <strong className="text-[#D4AF37]">White:</strong> Crisp, fruity, pairs well with lighter dishes
                  <br />
                  <strong className="text-[#D4AF37]">Red:</strong> Bold, rich, complements hearty mains
                  <br />
                  <strong className="text-[#D4AF37]">Riesling:</strong> Sweet, aromatic, ideal for desserts
                </p>
              </div>
              <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                <h3 className="text-xl font-playfair text-[#D4AF37] mb-4">📖 How to Enjoy This Menu</h3>
                <p className="text-white/80 font-montserrat text-sm leading-relaxed mb-3">
                  Start with the sparkling wine to cleanse your palate, then progress through whites to reds. Take a sip
                  of wine before and after each bite to experience how the flavors evolve and complement each other.
                </p>
                <p className="text-white/70 font-montserrat text-xs">
                  Pro tip: Let the wine sit in your mouth for a moment before swallowing to fully appreciate the pairing
                </p>
              </div>
              <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                <h3 className="text-xl font-playfair text-[#D4AF37] mb-4">🌶️ Wine & Indian Spices</h3>
                <p className="text-white/80 font-montserrat text-sm leading-relaxed mb-3">
                  Indian cuisine's complex spices pair beautifully with wine. The acidity in whites cuts through rich
                  curries, while the tannins in reds balance smoky tandoori flavors. Sweet Riesling cools spicy heat.
                </p>
                <p className="text-white/70 font-montserrat text-xs">
                  Don't worry about spice levels - our dishes are crafted to showcase flavors, not just heat
                </p>
              </div>
            </div>
            <div className="text-center mt-8">
              <p className="text-white/70 font-montserrat text-sm italic">
                Our team is here to guide you through the experience and answer any questions about the wines or
                pairings!
              </p>
            </div>
          </div>

          {/* Reservation CTA */}
          <div className="text-center mt-20 mb-16">
            <div className="bg-gradient-to-br from-[#D4AF37]/10 to-amber-600/10 backdrop-blur-sm p-8 rounded-3xl border border-[#D4AF37]/20 max-w-4xl mx-auto mb-8">
              <h3 className="text-2xl md:text-3xl font-playfair text-[#D4AF37] mb-4">
                Ready for a Memorable Wine Pairing Experience?
              </h3>
              <p className="text-white/80 font-montserrat mb-6 leading-relaxed">
                Reserve your table now for this exclusive festive menu. Limited availability. Experience the perfect
                marriage of authentic Indian cuisine and international wines, crafted by Chef Akhilesh Pathak.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/reservations">
                  <Button className="bg-gradient-to-r from-[#D4AF37] to-amber-600 text-black hover:from-amber-600 hover:to-[#D4AF37] font-montserrat font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#D4AF37]/25">
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
