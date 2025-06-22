'use client';

import { memo } from 'react';

/**
 * Restaurant Structured Data Component
 * 
 * This component adds JSON-LD structured data for the restaurant.
 * It helps search engines understand the content and can lead to rich results in search listings.
 * 
 * @returns {JSX.Element} Script element with JSON-LD data
 */
const RestaurantStructuredData = memo(function RestaurantStructuredData() {
  const restaurantData = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Akasa",
    "image": "https://akasa.sg/images/home/hero/carousel/hero1.jpg",
    "url": "https://akasa.sg",
    "telephone": "+6580121181",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "79 Robinson Road",
      "addressLocality": "Singapore",
      "postalCode": "068897",
      "addressCountry": "SG"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 1.2789, // Replace with actual coordinates
      "longitude": 103.8496 // Replace with actual coordinates
    },
    "priceRange": "$$$$",
    "servesCuisine": "Indian",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Sunday"
        ],
        "opens": "11:30",
        "closes": "22:30"
      }
    ],
    "menu": "https://akasa.sg/menu",
    "acceptsReservations": "True"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(restaurantData)
      }}
    />
  );
});

export default RestaurantStructuredData;
