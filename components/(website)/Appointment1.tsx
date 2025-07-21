"use client";
import { useEffect } from "react";

export default function Appointment1() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="bg-gradient-to-br from-gray-50 via-blue-50/30 to-orange-50/20">
      {/* Banner/Hero Section */}
      <section className="w-full bg-navy text-white py-20 mb-12">
        <div className="w-full max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            Book Your <span className="text-orange">Appointment</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Ready to bring your creative vision to life? Let's discuss your project and create something extraordinary together.
          </p>
        </div>
      </section>

      {/* Calendly Inline Widget */}
      <section className="w-full max-w-7xl mx-auto flex justify-center items-center px-4 sm:px-6 lg:px-8 pb-20">
        <div className="w-full max-w-7xl mx-auto rounded-md border border-[color:var(--study-blue)] shadow-md overflow-hidden">
          <div
            className="calendly-inline-widget w-full"
            data-url="https://calendly.com/studyabroadbyvalueadz8/30min?background_color=ffffff&text_color=004672&primary_color=f78e40&back=1"
            style={{ minWidth: "200px", width: "100%", height: "960px", paddingTop: "20px" }}
            data-auto-load="true"
          ></div>
        </div>
      </section>
    </div>
  );
} 