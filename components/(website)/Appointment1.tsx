"use client";
import { useEffect, useRef, useState } from "react";

export default function Appointment1() {
  const [calendlyLoaded, setCalendlyLoaded] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    script.onload = () => {
      setCalendlyLoaded(true);
    };
    document.body.appendChild(script);
    // Fallback: if Calendly doesn't fire onload, set loaded after a delay
    const fallback = setTimeout(() => setCalendlyLoaded(true), 3000);
    return () => {
      document.body.removeChild(script);
      clearTimeout(fallback);
    };
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
            Ready to bring your creative vision to life? Let&apos;s discuss your project and create something extraordinary together.
          </p>
        </div>
      </section>

      {/* Calendly Inline Widget */}
      <section className="w-full max-w-7xl mx-auto flex justify-center items-center px-4 sm:px-6 lg:px-8 pb-20">
        <div className="w-full max-w-7xl mx-auto rounded-md border border-[color:var(--study-blue)] bg-[color:var(--study-blue)]/10 shadow-md overflow-hidden min-h-[960px]">
          {!calendlyLoaded && (
            <div className="w-full h-[960px] flex items-start pt-6 justify-center bg-[color:var(--study-blue)]/10">
              <div className="flex space-x-8">
                <span className="dot-loader" />
                <span className="dot-loader" style={{ animationDelay: "0.3s" }} />
                <span className="dot-loader" style={{ animationDelay: "0.6s" }} />
              </div>
              <style jsx>{`
                .dot-loader {
                  display: block;
                  background: #6b7280; /* Tailwind gray-500 */
                  border-radius: 9999px;
                  width: 20px;
                  height: 20px;
                  animation: zoom-bounce 1.5s infinite;
                }
                @keyframes zoom-bounce {
                  0%, 100% {
                    transform: scale(0.5);
                    opacity: 0.6;
                  }
                  40% {
                    transform: scale(2);
                    opacity: 1;
                  }
                  80% {
                    transform: scale(0.5);
                    opacity: 0.6;
                  }
                }
              `}</style>
            </div>
          )}
          <div
            ref={widgetRef}
            style={{ display: calendlyLoaded ? "block" : "none", minWidth: "200px", width: "100%", height: "960px", paddingTop: "20px" }}
            className="calendly-inline-widget w-full"
            data-url="https://calendly.com/studyabroadbyvalueadz8/?background_color=ffffff&text_color=004672&primary_color=f78e40&back=1"
            data-auto-load="true"
          ></div>
        </div>
      </section>
    </div>
  );
} 