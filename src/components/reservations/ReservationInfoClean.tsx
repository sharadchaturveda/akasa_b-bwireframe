"use client";

import { memo, useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

/**
 * ReservationInfo Component
 *
 * A clean, mobile-first component for displaying dining information.
 * No optimization scripts, no interference, just clean code.
 */
const ReservationInfo = memo(function ReservationInfo() {
  // State to track if device is mobile for responsive adjustments
  const [, setIsMobile] = useState(false);

  // Load our clean CSS
  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") {
      return;
    }

    // Load our clean CSS
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/dining-info-clean.css";
    link.id = "dining-info-clean-css";
    document.head.appendChild(link);

    return () => {
      if (typeof window === "undefined" || typeof document === "undefined") {
        return;
      }

      // Remove the CSS when the component unmounts
      const cssLink = document.getElementById("dining-info-clean-css");
      if (cssLink) {
        cssLink.remove();
      }
    };
  }, []);

  // Simple mobile detection
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      if (typeof window === "undefined") {
        return;
      }
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  return (
    <div className="dining-info-container">
      <div className="dining-info-title-container">
        <h2 className="dining-info-title font-playfair">
          Dining Information
          <span className="dining-info-title-underline"></span>
        </h2>
      </div>

      <div className="dining-info-sections">
        {/* Hours */}
        <div className="dining-info-section mb-16 border-b border-[#E6C78B]/30 pb-12">
          <div className="dining-info-section-with-icon">
            <div className="dining-info-icon">
              <svg
                className="dining-info-icon-svg"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="dining-info-content">
              <h3 className="dining-info-heading font-playfair">
                Hours of Operation
              </h3>
              <div className="dining-info-content-inner">
                <div className="hours-container space-y-8">
                  <div className="flex flex-col sm:flex-row sm:justify-between">
                    <div className="dining-info-label font-medium">
                      Monday - Saturday:
                    </div>
                    <div className="dining-info-text">11:30 AM - 10:30 PM</div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:justify-between">
                    <div className="dining-info-label font-medium">
                      Soulful Weekend:
                    </div>
                    <div className="dining-info-text">
                      Friday 5:00 PM - Saturday 10:30 PM
                    </div>
                  </div>

                  {/* <div className="flex flex-col sm:flex-row sm:justify-between">
                    <div className="dining-info-label font-medium">
                      Saturday:
                    </div>
                    <div className="dining-info-text">Closed</div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="dining-info-section mb-16 border-b border-[#E6C78B]/30 pb-12">
          <div className="dining-info-section-with-icon">
            <div className="dining-info-icon">
              <svg
                className="dining-info-icon-svg"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <div className="dining-info-content">
              <h3 className="dining-info-heading font-playfair">Location</h3>
              <div className="dining-info-content-inner">
                <p className="dining-info-text break-words">
                  79 Robinson Road, #01-03 Capitasky
                  <br />
                  Tanjong Pagar, Singapore 068897
                </p>
                <div className="dining-info-label-value mt-2">
                  <span className="dining-info-label">Parking:</span>
                  <span className="dining-info-text">
                    Public parking available at nearby Capitasky building. MRT
                    station within walking distance.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Parking Rates */}
        <div className="dining-info-section mb-16 border-b border-[#E6C78B]/30 pb-12">
          <div className="dining-info-section-with-icon">
            <div className="dining-info-icon">
              <svg
                className="dining-info-icon-svg"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 3l1.65 3.824A9.953 9.953 0 003 12c0 2.97.96 5.72 2.65 7.926L3 21m18-18l-1.65 3.824A9.953 9.953 0 0121 12c0 2.97-.96 5.72-2.65 7.926L21 21m-1.65-3.824A9.953 9.953 0 0012 21c-2.97 0-5.72-.96-7.926-2.65L3 18.35m18-14.7l-1.65-3.824A9.953 9.953 0 0012 3c-2.97 0-5.72.96-7.926 2.65L3 5.65"
                />
              </svg>
            </div>
            <div className="dining-info-content">
              <h3 className="dining-info-heading font-playfair">
                Parking Rates
              </h3>
              <div className="dining-info-content-inner">
                {/* Parking Rates Tables Container - Using a container to ensure column alignment */}
                <div className="parking-tables-container">
                  {/* We'll use CSS-only approach for column alignment to avoid hydration errors */}

                  {/* Car Parking Rates Table */}
                  <div className="mb-8">
                    <h4 className="dining-info-subheading font-playfair text-[#E6C78B] mb-6">
                      Car Parking Rates
                    </h4>
                    <div className="bg-black/30 rounded-lg overflow-hidden">
                      <table
                        className="w-full dining-info-table parking-table"
                        id="car-parking-table"
                      >
                        <colgroup>
                          <col className="days-col" />
                          <col className="time-col" />
                          <col className="rate-col" />
                        </colgroup>
                        <thead>
                          <tr>
                            <th className="days-col-header">Days</th>
                            <th className="time-col-header">Time Range</th>
                            <th className="rate-col-header">Rate</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Monday to Friday</td>
                            <td>7:00 am to 5:59 pm</td>
                            <td>$2.90 per 30 minutes</td>
                          </tr>
                          <tr>
                            <td>Monday to Friday</td>
                            <td>6:00 pm to 6:59 am</td>
                            <td>$3.80 per entry</td>
                          </tr>
                          <tr>
                            <td>Saturday</td>
                            <td>7:00 am to 12:59 pm</td>
                            <td>$2.90 per 30 minutes</td>
                          </tr>
                          <tr>
                            <td>Saturday</td>
                            <td>1:00 pm to 6:59 am</td>
                            <td>$3.80 per entry</td>
                          </tr>
                          <tr>
                            <td>Sunday and Public Holidays</td>
                            <td>7:00 am to 6:59 am</td>
                            <td>$3.80 per entry</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Motorcycle Parking Rates Table */}
                  <div className="mb-4">
                    <h4 className="dining-info-subheading font-playfair text-[#E6C78B] mb-6">
                      Motorcycle Parking Rates
                    </h4>
                    <div className="bg-black/30 rounded-lg overflow-hidden">
                      <table
                        className="w-full dining-info-table parking-table"
                        id="motorcycle-parking-table"
                      >
                        <colgroup>
                          <col className="days-col" />
                          <col className="time-col" />
                          <col className="rate-col" />
                        </colgroup>
                        <thead>
                          <tr>
                            <th className="days-col-header">Days</th>
                            <th className="time-col-header">Time Range</th>
                            <th className="rate-col-header">Rate</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Monday to Friday</td>
                            <td>7:00 am to 6:59 am</td>
                            <td>$3.40 per entry</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reservation Policies */}
        <div className="dining-info-section mb-16 border-b border-[#E6C78B]/30 pb-12">
          <div className="dining-info-section-with-icon">
            <div className="dining-info-icon">
              <svg
                className="dining-info-icon-svg"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <div className="dining-info-content">
              <h3 className="dining-info-heading font-playfair">
                Reservation Policies
              </h3>
              <div className="dining-info-content-inner">
                <div className="dining-info-list-item">
                  <span className="dining-info-bullet">•</span>
                  <span className="dining-info-list-text">
                    Reservations are held for 15 minutes past the reserved time.
                  </span>
                </div>

                <div className="dining-info-list-item">
                  <span className="dining-info-bullet">•</span>
                  <span className="dining-info-list-text">
                    Cancellations must be made at least 24 hours in advance to
                    avoid a cancellation fee.
                  </span>
                </div>
                <div className="dining-info-list-item">
                  <span className="dining-info-bullet">•</span>
                  <span className="dining-info-list-text">
                    Special requests are accommodated based on availability.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="dining-info-section mb-12">
          <div className="dining-info-section-with-icon">
            <div className="dining-info-icon">
              <svg
                className="dining-info-icon-svg"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </div>
            <div className="dining-info-content">
              <h3 className="dining-info-heading font-playfair">Contact Us</h3>
              <div className="dining-info-content-inner">
                <div className="dining-info-label-value">
                  <span className="dining-info-label">Phone:</span>
                  <span className="dining-info-value">+65 80121181</span>
                </div>
                <div className="dining-info-label-value">
                  <span className="dining-info-label">Email:</span>
                  <span className="dining-info-value break-all">
                    info@akasa.sg
                  </span>
                </div>
                <div className="dining-info-label-value">
                  <span className="dining-info-label">For Events:</span>
                  <span className="dining-info-value break-all">
                    info@akasa.sg
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="dining-info-cta">
          <Link href="/menu" className="inline-block w-full sm:w-auto">
            <Button>View Our Menus</Button>
          </Link>
        </div>
      </div>
    </div>
  );
});

export default ReservationInfo;
