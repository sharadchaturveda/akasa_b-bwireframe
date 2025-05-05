export interface Testimonial {
  quote: string;
  author: string;
  title: string;
  rating: number;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "Every bite was a revelation. The space, the staff, the food—everything sings in perfect harmony. A culinary journey I'll never forget.",
    author: "Michelle Johnson",
    title: "Food Critic",
    rating: 5
  },
  {
    quote: "An unforgettable dining experience that blends tradition with innovation. Chef Akhilesh's creations are nothing short of masterpieces.",
    author: "Li Wei",
    title: "Regular Patron",
    rating: 5
  },
  {
    quote: "The flavors transported me back to my grandmother's kitchen in Delhi. Authentic yet elevated, with service that makes you feel like royalty.",
    author: "Akriti Mehta",
    title: "Food Blogger",
    rating: 5
  }
];
