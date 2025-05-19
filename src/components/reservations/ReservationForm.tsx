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
      {/* Quandoo Widget */}
      <iframe
        src="https://widget.quandoo.sg/widget/reservation/merchant/HUsUS?aid=2&countryId=SGP"
        width="100%"
        height="600px"
        frameBorder="0"
        title="Quandoo Reservations"
        style={{ marginBottom: '2rem' }}
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
        loading="lazy"
      ></iframe>
    </div>
  );
});

export default ReservationForm;
