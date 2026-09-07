"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Activity, Clock, Cpu, Layers, Zap, Shield } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  fadeUpVariants,
  staggerContainerVariants,
  scaleVariants,
} from "@/lib/animations";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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
    gradient: "from-orange-500 to-amber-500",
    category: "IT Services",
  },
  {
    name: "Graphics Designing",
    description:
      "A showcase of graphic design projects highlighting creativity, branding, and visual communication skills.",
    icon: Clock,
    gradient: "from-rose-500 to-pink-600",
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
    gradient: "from-orange-600 to-red-500",
    category: "Consultancy",
  },
  {
    name: "IT Security & Network Setup",
    description:
      "Protect your infrastructure with robust cybersecurity measures, CCTV installation, network configuration, and reliable IT support.",
    icon: Shield,
    gradient: "from-gray-500 to-gray-700",
    category: "Security",
  },
];

/* Card with GSAP hover magnetic effect */
function FeatureCard({
  feature,
  index,
}: {
  feature: Feature;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(card, {
      rotateX: (-y / rect.height) * 6,
      rotateY: (x / rect.width) * 6,
      transformPerspective: 900,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.5)",
    });
    setHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      variants={scaleVariants}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative overflow-hidden rounded-2xl bg-[#0a0a0a] border border-orange-500/10 shadow-[0_4px_24px_rgba(0,0,0,0.5)] backdrop-blur-sm hover:-translate-y-1.5 hover:border-orange-500/40 hover:shadow-[0_8px_40px_rgba(249,115,22,0.12)] transition-shadow duration-300 ease-out will-change-transform"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Corner glow */}
      <div className="absolute top-0 right-0 w-32 h-32 -mr-12 -mt-12 rounded-full bg-orange-500/5 blur-2xl pointer-events-none" />

      <div className="p-6">
        {/* Category badge */}
        <div className="absolute top-5 right-5">
          <motion.span
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: index * 0.07 + 0.3,
              type: "spring",
              stiffness: 400,
              damping: 20,
            }}
            className="inline-flex items-center rounded-full bg-orange-950/60 border border-orange-500/20 px-2.5 py-0.5 text-xs font-mono font-medium text-orange-400"
          >
            {feature.category}
          </motion.span>
        </div>

        {/* Icon */}
        <motion.div
          className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} shadow-lg mb-5`}
          whileHover={{ scale: 1.12, rotate: 6 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
        >
          <feature.icon className="h-6 w-6 text-white" />
        </motion.div>

        <h3 className="text-lg font-semibold text-white group-hover:text-orange-400 transition-colors duration-300 pr-16">
          {feature.name}
        </h3>

        <p className="mt-3 text-sm text-gray-400 leading-relaxed">
          {feature.description}
        </p>

        <div className="mt-5 inline-flex items-center text-sm font-medium text-orange-400/70 group-hover:text-orange-400 transition-colors duration-300">
          <span>Learn more</span>
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            className="ml-1 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            animate={{ x: hovered ? 4 : 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </motion.svg>
        </div>
      </div>

      {/* Bottom accent bar */}
      <motion.div
        className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r ${feature.gradient}`}
        initial={{ scaleX: 0, originX: 0 }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.div>
  );
}

export default function FeatureSectionThree() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  /* GSAP scroll-triggered header line animation */
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const lines = header.querySelectorAll(".gsap-line");
    if (!lines.length) return;

    const ctx = gsap.context(() => {
      gsap.from(lines, {
        scaleX: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: header,
          start: "top 82%",
          toggleActions: "play none none none",
        },
      });
    }, header);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative bg-[#1a1a1a] border-t border-orange-500/10 py-24 sm:py-32 overflow-hidden transition-colors duration-300"
    >
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(249,115,22,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

        {/* Header */}
        <motion.div
          ref={headerRef}
          className="mx-auto max-w-2xl text-center"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainerVariants}
        >
          <motion.div
            variants={fadeUpVariants}
            className="flex justify-center mb-6"
          >
            <div className="gsap-line h-px w-12 bg-gradient-to-r from-transparent via-orange-500 to-transparent self-center origin-center" />
            <h2 className="mx-4 text-base font-semibold text-orange-400 uppercase tracking-widest font-mono">
              TroyTech Features
            </h2>
            <div className="gsap-line h-px w-12 bg-gradient-to-r from-transparent via-orange-500 to-transparent self-center origin-center" />
          </motion.div>

          <motion.p
            variants={fadeUpVariants}
            className="mt-2 text-4xl font-bold tracking-tight text-white"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
              Powerful Capabilities
            </span>{" "}
            for Modern Future
          </motion.p>

          <motion.p
            variants={fadeUpVariants}
            className="mt-6 text-lg leading-8 text-gray-400"
          >
            Computer Training, Software Installation, Hardware Services, Website
            Designing, Hosting, Mobile Apps, Phone Flashing &amp; Updates,
            Computer Repair, Graphics Designing, Printing Solutions, CCTV
            Installation, Network Setup, Data Recovery, IT Consultancy, and
            more.
          </motion.p>
        </motion.div>

        {/* Feature Cards grid */}
        <motion.div
          className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.1, delayChildren: 0.2 },
            },
          }}
        >
          {features.map((feature, index) => (
            <FeatureCard key={feature.name} feature={feature} index={index} />
          ))}
        </motion.div>

        {/* Buttons */}
        <motion.div
          className="mt-20 flex justify-center gap-3"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="rounded-xl px-5 py-2.5 text-sm font-semibold text-white bg-transparent border border-orange-500/50 hover:border-orange-400 hover:shadow-[0_0_16px_rgba(249,115,22,0.25)] transition-all duration-200"
          >
            View documentation
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.04, filter: "brightness(1.1)" }}
            whileTap={{ scale: 0.97 }}
            className="rounded-xl px-5 py-2.5 text-sm font-semibold text-black bg-[#F97316] shadow-[0_0_14px_rgba(249,115,22,0.4)] hover:shadow-[0_0_26px_rgba(249,115,22,0.6)] transition-all duration-200"
          >
            Get started
          </motion.button>
        </motion.div>

      </div>
    </div>
  );
}
