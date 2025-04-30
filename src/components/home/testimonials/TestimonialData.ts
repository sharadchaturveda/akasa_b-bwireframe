"use client";

/**
 * Testimonial data structure
 *
 * To use your own images:
 * 1. Place avatar images in: public/images/testimonials/
 *    - Name them: avatar1.jpg, avatar2.jpg, avatar3.jpg
 * 2. Place background image in: public/images/
 *    - Name it: testimonial.jpg
 */

export interface TestimonialType {
  quote: string;
  author: string;
  title: string;
  avatar: string;  // Path to avatar image
  rating: number;  // Rating out of 5
}

export const TESTIMONIALS: TestimonialType[] = [
  {
    quote: "Every bite was a revelation. The space, the staff, the food—everything sings in perfect harmony. A culinary journey I'll never forget.",
    author: "Sarah Johnson",
    title: "Food Critic, Gourmet Magazine",
    avatar: "/images/testimonials/avatar1.jpg",
    rating: 5
  },
  {
    quote: "An unforgettable dining experience that blends tradition with innovation. Chef Akhilesh's creations are nothing short of masterpieces.",
    author: "Michael Chen",
    title: "Regular Patron",
    avatar: "/images/testimonials/avatar2.jpg",
    rating: 5
  },
  {
    quote: "The flavors transported me back to my grandmother's kitchen in Delhi. Authentic yet elevated, with service that makes you feel like royalty.",
    author: "Priya Patel",
    title: "Food Blogger, Spice & Soul",
    avatar: "/images/testimonials/avatar3.jpg",
    rating: 5
  }
];
