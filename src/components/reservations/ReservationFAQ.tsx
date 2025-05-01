"use client";

import { useState, memo } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const ReservationFAQ = memo(function ReservationFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "How far in advance should I make a reservation?",
      answer: "We recommend making reservations at least 1-2 weeks in advance for regular dining, and 3-4 weeks for weekend dining or special occasions. For large parties or during holiday seasons, earlier reservations are advised."
    },
    {
      question: "What is your cancellation policy?",
      answer: "We require cancellations to be made at least 24 hours in advance. Late cancellations or no-shows may incur a fee of $25 per person. To cancel, please call us directly or use the link in your confirmation email."
    },
    {
      question: "Do you accommodate dietary restrictions?",
      answer: "Yes, we are happy to accommodate most dietary restrictions and allergies. Please note any special dietary needs in the 'Special Requests' section when making your reservation, or inform our staff when you arrive."
    },
    {
      question: "Is there a dress code?",
      answer: "We suggest smart casual attire. While we don't enforce a strict dress code, we ask that guests refrain from wearing athletic wear, beachwear, or overly casual attire to maintain the elegant atmosphere of our restaurant."
    },
    {
      question: "Can I make special arrangements for a celebration?",
      answer: "Absolutely! We offer special arrangements for birthdays, anniversaries, and other celebrations. You can note your request in the reservation form, or contact us directly for more elaborate arrangements like custom menus or private dining."
    },
    {
      question: "Do you accommodate children?",
      answer: "While we don't offer a specific children's menu, we warmly welcome children and can accommodate them with smaller portions of our regular dishes. We also provide high chairs and booster seats upon request to ensure a comfortable dining experience for families."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-black/40 backdrop-blur-sm p-8 md:p-12 border border-white/10 rounded-lg shadow-xl">
      <h2 className="text-3xl font-playfair mb-8 text-center text-white">
        <span className="relative">
          Frequently Asked Questions
          <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#E6C78B]/80 to-transparent"></span>
        </span>
      </h2>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-white/10 rounded-lg overflow-hidden transition-all duration-300"
          >
            <button
              className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
              onClick={() => toggleFAQ(index)}
            >
              <span className="text-lg font-playfair text-white">{faq.question}</span>
              <span className={`transform transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                <svg className="w-5 h-5 text-[#E6C78B]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </button>
            <div
              className={`px-6 overflow-hidden transition-all duration-300 ${
                openIndex === index ? 'max-h-96 py-4 opacity-100' : 'max-h-0 py-0 opacity-0'
              }`}
            >
              <p className="text-white/80">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default ReservationFAQ;
