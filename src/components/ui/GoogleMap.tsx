import React from "react";

const GoogleMap = () => {
  return (
    <div className="mt-16 mb-8">
      <h2 className="text-2xl font-bold mb-6">Our Location</h2>
      <div className="w-full h-[500px] rounded-lg overflow-hidden shadow-lg">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8271966753764!2d103.8479306!3d1.2771267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da191db227bf1d%3A0x2fbc594ea2d2a033!2sAkasa%20%7C%20North%20Indian%20Restaurant%20And%20Bar!5e0!3m2!1sen!2sin!4v1756222158817!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default GoogleMap;
