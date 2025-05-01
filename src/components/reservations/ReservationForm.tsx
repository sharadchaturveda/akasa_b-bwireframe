"use client";

import { useState, memo } from "react";
import { Button } from "@/components/ui/button";

interface FormData {
  date: string;
  time: string;
  guests: string;
  occasion: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
}

const ReservationForm = memo(function ReservationForm() {
  const [formData, setFormData] = useState<FormData>({
    date: "",
    time: "",
    guests: "",
    occasion: "",
    name: "",
    email: "",
    phone: "",
    notes: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          date: "",
          time: "",
          guests: "",
          occasion: "",
          name: "",
          email: "",
          phone: "",
          notes: ""
        });
      }, 3000);
    }, 1500);
  };

  return (
    <div className="relative">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-20 h-20 border-t border-l border-[#E6C78B]/20 -mt-4 -ml-4 hidden md:block"></div>
      <div className="absolute bottom-0 right-0 w-20 h-20 border-b border-r border-[#E6C78B]/20 -mb-4 -mr-4 hidden md:block"></div>

      <div className="bg-black/40 backdrop-blur-sm p-8 md:p-12 border border-white/10 rounded-lg shadow-xl relative overflow-hidden">
        {/* Success message */}
        {isSubmitted && (
          <div className="absolute inset-0 bg-black/90 flex items-center justify-center z-20 animate-fadeIn">
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-[#E6C78B]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#E6C78B]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-playfair text-white mb-2">Reservation Confirmed</h3>
              <p className="text-white/80 mb-4">Thank you for your reservation. We've sent a confirmation to your email.</p>
            </div>
          </div>
        )}

        {/* Form background with subtle animation */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e6c78b' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px',
            animation: 'slideBackground 60s linear infinite'
          }}
        ></div>

        <div className="relative z-10">
          <h2 className="text-3xl font-playfair mb-8 text-center text-white">
            <span className="relative">
              Complete Your Reservation
              <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#E6C78B]/80 to-transparent"></span>
            </span>
          </h2>

          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="group">
                <label htmlFor="date" className="block mb-2 text-white/80 group-focus-within:text-[#E6C78B] transition-colors duration-300">Date</label>
                <input
                  type="date"
                  id="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-md text-white focus:border-[#E6C78B]/50 focus:outline-none focus:ring-1 focus:ring-[#E6C78B]/50 transition-all duration-300"
                  required
                />
              </div>
              <div className="group">
                <label htmlFor="time" className="block mb-2 text-white/80 group-focus-within:text-[#E6C78B] transition-colors duration-300">Time</label>
                <input
                  type="time"
                  id="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-md text-white focus:border-[#E6C78B]/50 focus:outline-none focus:ring-1 focus:ring-[#E6C78B]/50 transition-all duration-300"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="group">
                <label htmlFor="guests" className="block mb-2 text-white/80 group-focus-within:text-[#E6C78B] transition-colors duration-300">Number of Guests</label>
                <select
                  id="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-md text-white focus:border-[#E6C78B]/50 focus:outline-none focus:ring-1 focus:ring-[#E6C78B]/50 transition-all duration-300"
                  required
                >
                  <option value="">Select number of guests</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                    <option key={num} value={num}>{`${num} ${num === 1 ? "guest" : "guests"}`}</option>
                  ))}
                  <option value="more">More than 12 guests</option>
                </select>
              </div>
              <div className="group">
                <label htmlFor="occasion" className="block mb-2 text-white/80 group-focus-within:text-[#E6C78B] transition-colors duration-300">Occasion</label>
                <select
                  id="occasion"
                  value={formData.occasion}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-md text-white focus:border-[#E6C78B]/50 focus:outline-none focus:ring-1 focus:ring-[#E6C78B]/50 transition-all duration-300"
                >
                  <option value="">Select occasion (optional)</option>
                  <option value="birthday">Birthday</option>
                  <option value="anniversary">Anniversary</option>
                  <option value="business">Business Meal</option>
                  <option value="date">Date Night</option>
                  <option value="celebration">Celebration</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="group">
              <label htmlFor="name" className="block mb-2 text-white/80 group-focus-within:text-[#E6C78B] transition-colors duration-300">Full Name</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-md text-white focus:border-[#E6C78B]/50 focus:outline-none focus:ring-1 focus:ring-[#E6C78B]/50 transition-all duration-300"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="group">
                <label htmlFor="email" className="block mb-2 text-white/80 group-focus-within:text-[#E6C78B] transition-colors duration-300">Email</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-md text-white focus:border-[#E6C78B]/50 focus:outline-none focus:ring-1 focus:ring-[#E6C78B]/50 transition-all duration-300"
                  required
                />
              </div>
              <div className="group">
                <label htmlFor="phone" className="block mb-2 text-white/80 group-focus-within:text-[#E6C78B] transition-colors duration-300">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-md text-white focus:border-[#E6C78B]/50 focus:outline-none focus:ring-1 focus:ring-[#E6C78B]/50 transition-all duration-300"
                  required
                />
              </div>
            </div>

            <div className="group">
              <label htmlFor="notes" className="block mb-2 text-white/80 group-focus-within:text-[#E6C78B] transition-colors duration-300">Special Requests</label>
              <textarea
                id="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-md text-white focus:border-[#E6C78B]/50 focus:outline-none focus:ring-1 focus:ring-[#E6C78B]/50 transition-all duration-300"
                placeholder="Dietary restrictions, seating preferences, special occasions, etc."
              ></textarea>
            </div>

            <div className="text-center pt-4">
              <Button
                type="submit"
                className="bg-[#1A2A3A] text-white hover:bg-[#0A1A2A] w-full max-w-xs"
                disabled={isSubmitting || isSubmitted}
              >
                {isSubmitting ? "Processing..." : "Book Now"}
              </Button>
              <p className="mt-4 text-white/60 text-sm">
                By booking, you agree to our reservation policy and cancellation terms.
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Add custom CSS for animations */}
      <style jsx>{`
        @keyframes slideBackground {
          0% { background-position: 0 0; }
          100% { background-position: 100% 100%; }
        }
      `}</style>
    </div>
  );
});

export default ReservationForm;
