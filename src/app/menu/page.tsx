import Image from "next/image";
import Link from "next/link";

export default function MenuPage() {
  const menuSections = [
    {
      title: "Starters",
      items: [
        { name: "Truffle Arancini", price: "$18", description: "Crispy risotto balls with black truffle and parmesan" },
        { name: "Beef Tartare", price: "$24", description: "Hand-cut beef with quail egg and capers" },
        { name: "Scallop Ceviche", price: "$22", description: "Fresh scallops with citrus and chili" }
      ]
    },
    {
      title: "Mains",
      items: [
        { name: "Wagyu Ribeye", price: "$68", description: "300g Australian wagyu with truffle mash" },
        { name: "Lobster Risotto", price: "$42", description: "Maine lobster with saffron risotto" },
        { name: "Duck Confit", price: "$38", description: "Slow-cooked duck leg with cherry reduction" }
      ]
    },
    {
      title: "Desserts",
      items: [
        { name: "Chocolate Soufflé", price: "$16", description: "Warm chocolate soufflé with vanilla ice cream" },
        { name: "Crème Brûlée", price: "$14", description: "Classic vanilla bean with caramelized sugar" },
        { name: "Cheese Selection", price: "$22", description: "Artisanal cheeses with honey and nuts" }
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-8 py-24">
        <h1 className="text-5xl font-serif mb-12 text-center">Our Menu</h1>
        
        {menuSections.map((section) => (
          <div key={section.title} className="mb-16">
            <h2 className="text-3xl font-serif mb-8">{section.title}</h2>
            <div className="grid gap-8">
              {section.items.map((item) => (
                <div key={item.name} className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-medium">{item.name}</h3>
                    <p className="text-gray-400">{item.description}</p>
                  </div>
                  <span className="text-xl">{item.price}</span>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="text-center mt-12">
          <Link href="/reservations" className="inline-block">
            <button className="px-6 py-3 bg-white text-black uppercase hover:bg-gray-100 transition-colors">
              Make a Reservation
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
} 