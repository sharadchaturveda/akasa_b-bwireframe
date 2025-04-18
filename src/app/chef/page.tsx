import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ChefPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative h-[600px]">
            <Image
              src="/images/chef.jpg"
              alt="Chef Profile"
              fill
              className="object-cover"
              priority
            />
          </div>
          
          <div>
            <h1 className="text-5xl font-serif mb-6">{"Meet Our Chef"}</h1>
            <h2 className="text-3xl font-serif mb-4">{"Chef Akhilesh Pathak"}</h2>
            <p className="text-lg mb-6">
              {"Hailing from the vibrant culinary melting pot of Kolkata, Chef Akhilesh's culinary journey spans over two decades, initially nurtured by his mother's guidance and refined through extensive exploration of India's diverse gastronomic landscape."}
            </p>
            <p className="text-lg mb-6">
              {"His philosophy is simple: respect the ingredients, honor the tradition, and push the boundaries of what's possible. Every dish tells a story, and every meal is an opportunity to create something extraordinary."}
            </p>
            <div className="space-y-4">
              <h3 className="text-2xl font-serif">{"Notable Achievements"}</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>{"Michelin Star – 2018, 2019, 2020"}</li>
                <li>{"Asia's 50 Best Restaurants – 2021, 2022"}</li>
                <li>{"James Beard Award Finalist – 2023"}</li>
                <li>{"Featured in 'Chef's Table' – Netflix Series"}</li>
              </ul>
            </div>
            <div className="mt-8">
              <Link href="/reservations">
                <Button className="bg-[#1A2A3A] text-white hover:bg-[#0A1A2A] w-full" showArrow>
                  {"Make a Reservation"}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 