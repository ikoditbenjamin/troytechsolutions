"use client";
import React, { useState } from "react";
import { Activity, Clock, Cpu, Layers, BarChart3, Zap } from "lucide-react";

interface Feature {
  name: string;
  description: string;
  icon: React.ElementType;
  gradient: string;
  category: string;
}

const features: Feature[] = [
  {
    name: "Computer Training",
    description:
      "Provide fundamental computer skills training, covering operating systems, internet usage, and essential applications.",
    icon: Activity,
    gradient: "from-purple-500 to-indigo-600",
    category: "Training",
  },
  {
    name: "Software & Hardware Services",
    description:
      "Install, configure & troubleshoot software applications, hardware training and troubleshooting including operating systems, productivity software, and hardware components.",
    icon: Cpu,
    gradient: "from-blue-500 to-cyan-500",
    category: "IT Services",
  },
  {
    name: "Graphics Designing",
    description:
      "A showcase of my graphic design projects highlighting creativity, branding, and visual communication skills.",
    icon: Clock,
    gradient: "from-emerald-500 to-green-500",
    category: "Design",
  },
  {
    name: "System Architecture & Website Design",
    description:
      "Modern website design, responsive development, web applications, SEO optimization, and innovative digital solutions built to deliver great user experiences.",
    icon: Layers,
    gradient: "from-amber-500 to-orange-500",
    category: "Web Design",
  },
  {
    name: "Printing Solutions, Online Applications and IT Consultancy",
    description:
      "Professional printing solutions, modern online application development, and expert IT consultancy services to help businesses enhance their brand and embrace digital transformation.",
    icon: Zap,
    gradient: "from-rose-500 to-pink-600",
    category: "Consultancy",
  },
  {
    name: "Loan & Financing",
    description:
      "Flexible loan and financing solutions that help individuals and businesses access funds and achieve financial goals.",
    icon: BarChart3,
    gradient: "from-cyan-500 to-sky-600",
    category: "Finance",
  },
];

export default function FeatureSectionThree() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <div className="relative bg-[#0F172A] border-t border-cyan-500/10 py-24 sm:py-32 overflow-hidden transition-colors duration-300">
      {/* Radial glow — center */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(6,182,212,0.05) 0%, transparent 70%)" }} />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-cyan-500 to-transparent self-center" />
            <h2 className="mx-4 text-base font-semibold text-cyan-400 uppercase tracking-widest font-mono">
              TroyTech Features
            </h2>
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-cyan-500 to-transparent self-center" />
          </div>

          <p className="mt-2 text-4xl font-bold tracking-tight text-white">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
              Powerful Capabilities
            </span>{" "}
            for Modern Future
          </p>

          <p className="mt-6 text-lg leading-8 text-gray-400">
            Computer Training, Software Installation, Hardware Services,
            Website Designing, Hosting, Mobile Apps, Phone Flashing &amp; Updates,
            Computer Repair, Graphics Designing, Printing Solutions, CCTV
            Installation, Network Setup, Data Recovery, IT Consultancy,
            Loans &amp; Financing, and more.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.name}
              className="group relative overflow-hidden rounded-2xl bg-[#020617] border border-cyan-500/10 shadow-[0_4px_24px_rgba(0,0,0,0.4)] backdrop-blur-sm hover:-translate-y-1.5 hover:border-cyan-500/40 hover:shadow-[0_8px_40px_rgba(6,182,212,0.12)] transition-all duration-300 ease-out"
              onMouseEnter={() => setHoveredCard(feature.name)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Subtle corner glow */}
              <div className="absolute top-0 right-0 w-32 h-32 -mr-12 -mt-12 rounded-full bg-cyan-500/5 blur-2xl pointer-events-none" />

              <div className="p-6">
                {/* Category badge */}
                <div className="absolute top-5 right-5">
                  <span className="inline-flex items-center rounded-full bg-cyan-950/60 border border-cyan-500/20 px-2.5 py-0.5 text-xs font-mono font-medium text-cyan-400">
                    {feature.category}
                  </span>
                </div>

                {/* Icon */}
                <div
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} shadow-lg mb-5`}
                >
                  <feature.icon className="h-6 w-6 text-white" />
                </div>

                <h3 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors duration-300 pr-16">
                  {feature.name}
                </h3>

                <p className="mt-3 text-sm text-gray-400 leading-relaxed">
                  {feature.description}
                </p>

                <div className="mt-5 inline-flex items-center text-sm font-medium text-cyan-400/70 group-hover:text-cyan-400 transition-colors duration-300">
                  <span>Learn more</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`ml-1 h-4 w-4 transition-transform duration-300 ${
                      hoveredCard === feature.name ? "translate-x-1" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              {/* Bottom accent bar */}
              <div
                className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r ${feature.gradient} transition-all duration-500 ease-out ${
                  hoveredCard === feature.name ? "w-full" : "w-0"
                }`}
              />
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="mt-20 flex justify-center gap-3">
          <button className="rounded-xl px-5 py-2.5 text-sm font-semibold text-white bg-transparent border border-[#06B6DA]/50 hover:border-[#06B6DA] hover:shadow-[0_0_16px_rgba(6,182,218,0.25)] hover:scale-[1.03] active:scale-[0.97] transition-all duration-200">
            View documentation
          </button>
          <button className="rounded-xl px-5 py-2.5 text-sm font-semibold text-gray-950 bg-[#06B6DA] shadow-[0_0_14px_rgba(6,182,218,0.4)] hover:brightness-110 hover:scale-[1.04] hover:shadow-[0_0_26px_rgba(6,182,218,0.6)] active:scale-[0.97] transition-all duration-200">
            Get started
          </button>
        </div>

      </div>
    </div>
  );
}
