"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Metadata } from "next";
import {
  fadeUpVariants,
  scaleVariants,
  staggerContainerVariants,
  staggerSlowContainerVariants,
} from "@/lib/animations";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const services = [
  { title: "IT Security & System Management",  desc: "Protect your systems with secure networks, data protection, and reliable IT support." },
  { title: "Software & App Development",        desc: "We build modern websites and applications tailored to your business needs." },
  { title: "Graphics & Digital Design",         desc: "Create powerful brand identities with professional graphic design solutions." },
  { title: "Computer Training",                 desc: "Gain practical digital skills through hands-on training programs." },
  { title: "IT Consultancy",                    desc: "Get expert advice to improve your systems, operations, and digital strategy." },
  { title: "CCTV & Network Setup",              desc: "Professional CCTV installation and network configuration to keep your premises secure and connected." },
];

/* Icon per service */
const icons = ["🔒", "💻", "🎨", "🎓", "🧠", "📡"];

export default function ServicesSection() {
  /* GSAP: header text stagger */
  const headerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  useEffect(() => {
    const el = headerRef.current;
    if (!el || !isInView) return;
    const ctx = gsap.context(() => {
      gsap.from(el.querySelectorAll(".gsap-h"), {
        opacity: 0, y: 28, stagger: 0.12, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 82%", toggleActions: "play none none none" },
      });
    }, el);
    return () => ctx.revert();
  }, [isInView]);

  return (
    <section ref={sectionRef} className="py-20 bg-[#0a0a0a] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <div ref={headerRef} className="text-center mb-12">
          <p className="gsap-h text-xs font-mono font-semibold text-orange-400 tracking-widest uppercase mb-3">What We Do</p>
          <h2 className="gsap-h text-3xl font-bold text-white">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">Services</span>
          </h2>
          <p className="gsap-h text-gray-400 mt-2 max-w-2xl mx-auto">
            We provide reliable IT solutions and training to help individuals and businesses grow in Kampala
            and across Uganda.
          </p>
        </div>

        {/* Grid */}
        <motion.div
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerSlowContainerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={scaleVariants}
              whileHover={{ y: -7, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group relative rounded-2xl bg-[#1a1a1a] border border-orange-500/10 shadow-[0_4px_24px_rgba(0,0,0,0.5)] backdrop-blur-sm p-6 hover:border-orange-500/40 hover:shadow-[0_8px_40px_rgba(249,115,22,0.12)] transition-colors duration-300 ease-out overflow-hidden"
            >
              {/* Corner glow */}
              <div className="absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full bg-orange-500/5 blur-2xl pointer-events-none" />

              {/* Icon */}
              <motion.div
                className="text-3xl mb-4"
                initial={{ scale: 0.6, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ delay: index * 0.09 + 0.3, type: "spring", stiffness: 400, damping: 18 }}
              >
                {icons[index]}
              </motion.div>

              <h3 className="text-base font-semibold text-white group-hover:text-orange-400 transition-colors duration-300">
                {service.title}
              </h3>
              <p className="mt-2 text-gray-400 text-sm leading-relaxed">{service.desc}</p>

              {/* Bottom accent */}
              <motion.div
                className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-orange-500 to-amber-400 rounded-b-2xl"
                initial={{ scaleX: 0, originX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.4 }}
              />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
