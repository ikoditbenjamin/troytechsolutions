"use client";

import { useState, useEffect } from "react";

const WA_NUMBER = "256747447447";
const WA_MESSAGE = encodeURIComponent(
  "Hello TroyTech Solutions! I'd like to learn more about your IT services."
);
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`;

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);
  const [tooltip, setTooltip] = useState(false);

  // Fade in after 1.5s so it doesn't compete with page load
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className={`fixed bottom-6 left-5 z-[9998] flex flex-col items-start gap-2 transition-all duration-500
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
    >
      {/* Tooltip bubble */}
      {tooltip && (
        <div className="ml-1 mb-1 bg-[#1a1a1a] border border-white/10 text-white text-xs font-medium px-3 py-2 rounded-xl shadow-lg whitespace-nowrap animate-fade-in-up">
          Chat with us on WhatsApp
          {/* Arrow pointing down-left toward the button */}
          <div className="absolute -bottom-1.5 left-4 w-3 h-3 bg-[#1a1a1a] border-b border-r border-white/10 rotate-45" />
        </div>
      )}

      {/* WhatsApp button */}
      <a
        href={WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        onMouseEnter={() => setTooltip(true)}
        onMouseLeave={() => setTooltip(false)}
        onFocus={() => setTooltip(true)}
        onBlur={() => setTooltip(false)}
        className="
          h-14 w-14 rounded-full flex items-center justify-center
          bg-[#25D366]
          shadow-[0_0_0_4px_rgba(37,211,102,0.20),0_8px_28px_rgba(37,211,102,0.45)]
          hover:scale-110
          hover:shadow-[0_0_0_6px_rgba(37,211,102,0.28),0_12px_36px_rgba(37,211,102,0.60)]
          active:scale-95
          transition-all duration-300
        "
      >
        {/* Official WhatsApp SVG icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          className="h-7 w-7 fill-white"
          aria-hidden="true"
        >
          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
        </svg>

        {/* Pulse ring */}
        <span className="absolute h-14 w-14 rounded-full bg-[#25D366]/30 animate-ping" />
      </a>
    </div>
  );
}
