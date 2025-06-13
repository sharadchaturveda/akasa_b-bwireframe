import { useState } from "react";
import { BlogPost } from "@/app/blog/[slug]/page";

export function BlogFAQ({ faqSections }: { faqSections: BlogPost['faqSection'] }) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    if (!faqSections?.length) return null;

    return (
        <div className="mt-16">
            {faqSections.map((group, groupIndex) => (
                <div key={groupIndex} className="bg-black/40 backdrop-blur-sm p-8 md:p-12 border border-white/10 rounded-lg shadow-xl mb-12">
                    <h2 className="text-3xl font-playfair mb-8 text-center text-white">
                        <span className="relative">
                            {group.faqTitle || "Frequently Asked Questions"}
                            <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#E6C78B]/80 to-transparent"></span>
                        </span>
                    </h2>

                    <div className="space-y-4">
                        {group.faqItems?.map((faq, index) => {
                            const globalIndex = groupIndex * 100 + index; // avoid index collision between groups
                            return (
                                <div
                                    key={faq._key || index}
                                    className="border border-white/10 rounded-lg overflow-hidden transition-all duration-300"
                                >
                                    <button
                                        className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                                        onClick={() => toggleFAQ(globalIndex)}
                                    >
                                        <span className="text-lg font-playfair text-white">{faq.question}</span>
                                        <span className={`transform transition-transform duration-300 ${openIndex === globalIndex ? 'rotate-180' : ''}`}>
                                            <svg className="w-5 h-5 text-[#E6C78B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </span>
                                    </button>
                                    <div
                                        className={`px-6 overflow-hidden transition-all duration-300 ${openIndex === globalIndex ? 'max-h-96 py-4 opacity-100' : 'max-h-0 py-0 opacity-0'
                                            }`}
                                    >
                                        <p className="text-white/80">{faq.answer}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
}
