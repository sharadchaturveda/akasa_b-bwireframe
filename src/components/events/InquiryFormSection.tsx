"use client";

import { Button } from "@/components/ui/button";
import { memo } from "react";

const InquiryFormSection = memo(function InquiryFormSection() {
  return (
    <section id="inquiry" className="w-full bg-[url('/images/gallery6.jpg')] bg-cover bg-center py-16 relative">
      <div className="absolute inset-0 bg-black/80"></div>
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-playfair mb-4">{"Inquire About Your Event"}</h2>
            <p className="text-lg font-montserrat text-white/70">
              {"Fill out the form below and our events team will get back to you within 24 hours."}
            </p>
          </div>
          
          <form className="space-y-6 bg-black/70 p-8 rounded-lg backdrop-blur-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block mb-2 font-montserrat">Full Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-md text-white"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 font-montserrat">Email Address</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-md text-white"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="block mb-2 font-montserrat">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-md text-white"
                />
              </div>
              <div>
                <label htmlFor="eventType" className="block mb-2 font-montserrat">Event Type</label>
                <select
                  id="eventType"
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-md text-white"
                  required
                >
                  <option value="">Select Event Type</option>
                  <option value="private">Private Dining</option>
                  <option value="corporate">Corporate Event</option>
                  <option value="wedding">Wedding</option>
                  <option value="birthday">Birthday</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="date" className="block mb-2 font-montserrat">Preferred Date</label>
                <input
                  type="date"
                  id="date"
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-md text-white"
                  required
                />
              </div>
              <div>
                <label htmlFor="guests" className="block mb-2 font-montserrat">Number of Guests</label>
                <input
                  type="number"
                  id="guests"
                  min="1"
                  max="100"
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-md text-white"
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="message" className="block mb-2 font-montserrat">Additional Information</label>
              <textarea
                id="message"
                rows={4}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-md text-white"
              ></textarea>
            </div>
            
            <div className="text-center">
              <Button className="bg-[#E6C78B] text-black hover:bg-[#D4B679] px-8 py-3 w-full md:w-auto">
                {"Submit Inquiry"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
});

export default InquiryFormSection;
