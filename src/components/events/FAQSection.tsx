"use client";

import { memo } from "react";

const FAQSection = memo(function FAQSection() {
  const faqs = [
    {
      question: "How far in advance should I book my event?",
      answer: "We recommend booking at least 4-6 weeks in advance for private dining and 2-3 months for larger events like weddings or corporate functions to ensure availability."
    },
    {
      question: "Can you accommodate dietary restrictions?",
      answer: "Yes, our culinary team can accommodate most dietary restrictions and preferences. Please inform us of any special requirements when making your inquiry."
    },
    {
      question: "Is there a minimum spend requirement?",
      answer: "Minimum spend requirements vary depending on the day of the week, time of year, and the space reserved. Our events team will provide specific details based on your event needs."
    },
    {
      question: "Can I bring my own cake?",
      answer: "Yes, you may bring your own cake for special occasions. There is a cake cutting fee of $5 per person."
    }
  ];

  return (
    <section className="w-full bg-black py-16 relative">
      {/* Background image with optimized loading */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0 opacity-30"
        style={{
          backgroundImage: "url('/images/menu/gallery1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      ></div>
      <div className="absolute inset-0 bg-black/75"></div>
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-playfair mb-4">{"Frequently Asked Questions"}</h2>
            <p className="text-lg font-montserrat text-white/70">
              {"Find answers to common questions about hosting events at Akasa."}
            </p>
          </div>

          <div className="divide-y divide-[#1A2A3A]">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-black/80 backdrop-blur-sm p-6">
                <h3 className="text-xl font-playfair mb-3">{faq.question}</h3>
                <p className="text-white/80">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

export default FAQSection;
