"use client";

import "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, memo, FormEvent } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  eventType: string;
  preferredDate: string;
  guests: number;
  additionalInfo: string;
}

const InquiryFormSection = memo(function InquiryFormSection() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;

    const fullName = (form.elements.namedItem('name') as HTMLInputElement)?.value || "";
    const email = (form.elements.namedItem('email') as HTMLInputElement)?.value || "";
    const phone = (form.elements.namedItem('phone') as HTMLInputElement)?.value || "";
    const eventType = (form.elements.namedItem('eventType') as HTMLSelectElement)?.value || "";
    const preferredDate = (form.elements.namedItem('date') as HTMLInputElement)?.value || "";
    const guests = Number((form.elements.namedItem('guests') as HTMLInputElement)?.value) || 0;
    const additionalInfo = (form.elements.namedItem('message') as HTMLTextAreaElement)?.value || "";

    const formData: FormData = {
      fullName,
      email,
      phone,
      eventType,
      preferredDate,
      guests,
      additionalInfo,
    };

    setLoading(true);

    try {
      const res = await fetch('/api/send-inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success('Inquiry sent successfully!');
        form.reset();
      } else {
        toast.error(`Error: ${result.message}`);
      }
    } catch (error : unknown) {
      console.error('Error submitting inquiry:', error);
      toast.error('Unexpected error. Please try again later.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="inquiry" className="w-full bg-black pb-16 relative">
      <div
        className="absolute inset-0 z-0 opacity-20 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/menu/hero/gallery-6.jpg')" }}
        aria-hidden="true"
      ></div>

      <div className="absolute inset-0 bg-black/85"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 pt-16">
            <h2 className="text-3xl md:text-4xl font-playfair mb-4">Inquire About Your Event</h2>
            <p className="text-lg font-montserrat text-white/70 max-w-2xl mx-auto">
              Let us know what you're planning, and our events team will get back to you shortly.
            </p>
          </div>

          <form
            className="bg-black/90 p-8 border border-[#1A2A3A]"
            onSubmit={handleSubmit}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="name" className="block mb-2 font-montserrat">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-3 bg-[#1A2A3A] border border-[#2A3A4A] text-white"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 font-montserrat">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 bg-[#1A2A3A] border border-[#2A3A4A] text-white"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="phone" className="block mb-2 font-montserrat">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-4 py-3 bg-[#1A2A3A] border border-[#2A3A4A] text-white"
                />
              </div>
              <div>
                <label htmlFor="eventType" className="block mb-2 font-montserrat">Event Type</label>
                <select
                  id="eventType"
                  name="eventType"
                  className="w-full px-4 py-3 bg-[#1A2A3A] border border-[#2A3A4A] text-white"
                  required
                >
                  <option value="">Select Event Type</option>
                  <option value="birthday">Birthday</option>
                  <option value="anniversary">Anniversary</option>
                  <option value="office-lunch">Office Lunch</option>
                  <option value="office-parties">Office Parties</option>
                  <option value="networking">Networking Events</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="date" className="block mb-2 font-montserrat">Preferred Date</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  className="w-full px-4 py-3 bg-[#1A2A3A] border border-[#2A3A4A] text-white"
                  required
                />
              </div>
              <div>
                <label htmlFor="guests" className="block mb-2 font-montserrat">Number of Guests</label>
                <input
                  type="number"
                  id="guests"
                  name="guests"
                  min="1"
                  max="100"
                  className="w-full px-4 py-3 bg-[#1A2A3A] border border-[#2A3A4A] text-white"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="block mb-2 font-montserrat">Additional Information</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full px-4 py-3 bg-[#1A2A3A] border border-[#2A3A4A] text-white"
              ></textarea>
            </div>

            <div className="text-center mt-4">
              <Button
                type="submit"
                className="bg-[#1A2A3A] text-white px-8 py-3 w-full md:w-auto"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Sending...
                  </>
                ) : (
                  "Submit Inquiry"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
});

export default InquiryFormSection;