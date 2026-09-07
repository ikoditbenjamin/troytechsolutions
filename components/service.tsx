"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { scaleVariants, staggerSlowContainerVariants } from "@/lib/animations";

const icons = ["🔒", "💻", "🎨", "🎓", "🧠", "📡"];

const services = [
  { title: "IT Security & System Management",  desc: "Protect your systems with secure networks, data protection, and reliable IT support." },
  { title: "Software & App Development",        desc: "We build modern websites and applications tailored to your business needs." },
  { title: "Graphics & Digital Design",         desc: "Create powerful brand identities with professional graphic design solutions." },
  { title: "Computer Training",                 desc: "Gain practical digital skills through hands-on training programs." },
  { title: "IT Consultancy",                    desc: "Get expert advice to improve your systems, operations, and digital strategy." },
  { title: "CCTV & Network Setup",              desc: "Professional CCTV installation and network configuration to keep your premises secure." },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView   = useInView(sectionRef, { once: true, margin: "-60px" });

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0a0a0a] border-t border-orange-500/10 py-20 overflow-hidden transition-colors duration-300"
    >
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 50% 60% at 0% 50%, rgba(249,115,22,0.06) 0%, transparent 70%)" }} />

      <div className="relative max-w-7xl mx-auto px-4">

        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs font-mono font-semibold text-orange-400 tracking-widest uppercase mb-3">What We Do</p>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">Services</span>
          </h2>
          <p className="text-gray-400 mt-3 max-w-2xl mx-auto">
            We provide reliable IT solutions and training to help individuals and businesses grow in Kampala and across Uganda.
          </p>
        </motion.div>

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
              <div className="absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full bg-orange-500/5 blur-2xl pointer-events-none" />

              <motion.div
                className="text-3xl mb-4"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ delay: index * 0.08 + 0.25, type: "spring", stiffness: 420, damping: 20 }}
              >
                {icons[index]}
              </motion.div>

              <h3 className="text-base font-semibold text-white group-hover:text-orange-400 transition-colors duration-300">
                {service.title}
              </h3>
              <p className="mt-2 text-gray-400 text-sm leading-relaxed">{service.desc}</p>

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
