"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import HeroParallaxSlider from "@/components/HeroParallaxSlider";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  fadeUpVariants,
  fadeLeftVariants,
  fadeRightVariants,
  scaleVariants,
  staggerContainerVariants,
  staggerSlowContainerVariants,
  popVariants,
} from "@/lib/animations";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const HERO_IMAGES = [
  "/about/hero/about1.jpg",
  "/about/hero/about2.jpg",
  "/about/hero/about3.jpg",
];

const team = [
  { name: "Benjamin Ikodit",   role: "Founder & Developer",  image: "/about/benjamin.png" },
  { name: "Ngobi Owen Albert", role: "Lead Developer",        image: "/about/owen.png" },
  { name: "Monic Arinaitwe",   role: "Accountant",            image: "/about/monic.jpg" },
  { name: "Irene Asekenye",    role: "Marketing Manager",     image: "/about/irene.jpg" },
];

const stats = [
  { value: 20,  suffix: "+", label: "Projects Completed" },
  { value: 80,  suffix: "+", label: "Happy Clients" },
  { value: 10,  suffix: "+", label: "Years Experience" },
  { value: 5,   suffix: "+", label: "Team Members" },
];

/* ── Animated counter ── */
function AnimatedStat({ value, suffix, label, index }: { value: number; suffix: string; label: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!isInView || !numRef.current) return;
    const el = numRef.current;
    const obj = { val: 0 };
    gsap.to(obj, {
      val: value,
      duration: 2.2,
      delay: index * 0.12,
      ease: "power2.out",
      onUpdate() { el.textContent = Math.round(obj.val) + suffix; },
    });
  }, [isInView, value, suffix, index]);

  return (
    <motion.div
      ref={ref}
      variants={scaleVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ delay: index * 0.1 }}
      className="group relative rounded-2xl bg-[#0a0a0a] border border-orange-500/10 p-8 text-center hover:-translate-y-1.5 hover:border-orange-500/40 hover:shadow-[0_8px_32px_rgba(249,115,22,0.12)] transition-all duration-300 ease-out overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-20 h-20 -mr-6 -mt-6 rounded-full bg-orange-500/5 blur-xl pointer-events-none" />
      <h3
        ref={numRef}
        className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300"
      >
        0{suffix}
      </h3>
      <p className="text-gray-400 mt-2 text-sm">{label}</p>
    </motion.div>
  );
}

export default function AboutPage() {
  /* Hero text GSAP entrance */
  const heroTextRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = heroTextRef.current;
    if (!el) return;
    const tl = gsap.timeline({ delay: 0.3 });
    tl.from(el.querySelectorAll(".gsap-hero-tag"), { opacity: 0, y: -14, duration: 0.5, ease: "back.out(2)" })
      .from(el.querySelectorAll(".gsap-hero-h1"), { opacity: 0, y: 30, duration: 0.7, stagger: 0.1, ease: "power3.out" }, "-=0.2")
      .from(el.querySelectorAll(".gsap-hero-p"),  { opacity: 0, y: 18, duration: 0.6, ease: "power3.out" }, "-=0.3");
    return () => { tl.kill(); };
  }, []);

  /* Story section refs */
  const storyRef = useRef<HTMLElement>(null);
  const storyInView = useInView(storyRef, { once: true, margin: "-80px" });

  /* Stats section */
  const statsRef = useRef<HTMLElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-80px" });

  /* Team section */
  const teamRef = useRef<HTMLElement>(null);
  const teamInView = useInView(teamRef, { once: true, margin: "-60px" });

  /* CTA section */
  const ctaRef = useRef<HTMLElement>(null);
  const ctaInView = useInView(ctaRef, { once: true, margin: "-60px" });

  return (
    <main className="min-h-screen">

      {/* ── HERO ── */}
      <section className="relative border-b border-orange-500/10 overflow-hidden" style={{ minHeight: "420px" }}>
        <div className="absolute inset-0 z-0">
          <HeroParallaxSlider images={HERO_IMAGES} parallaxStrength={30} autoPlayMs={5000} />
        </div>
        <div ref={heroTextRef} className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-28 md:py-36">
          <p className="gsap-hero-tag text-xs font-mono font-semibold text-orange-400 tracking-widest uppercase mb-4 drop-shadow">
            Who We Are
          </p>
          <h1 className="gsap-hero-h1 text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight drop-shadow-lg">
            About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">TroyTech</span>
          </h1>
          <p className="gsap-hero-p mt-5 text-lg text-gray-200 leading-relaxed max-w-2xl mx-auto drop-shadow">
            We are committed to delivering innovative digital solutions — website design, online applications,
            printing services, and IT consultancy — helping businesses and individuals succeed in the modern
            digital world.
          </p>
        </div>
      </section>

      {/* ── STORY ── */}
      <section ref={storyRef} className="relative bg-[#0a0a0a] py-24 overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 50% 60% at 0% 50%, rgba(249,115,22,0.06) 0%, transparent 70%)" }} />
        <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

          <motion.div
            className="relative h-96 rounded-2xl overflow-hidden border border-orange-500/15 shadow-[0_8px_40px_rgba(249,115,22,0.08)]"
            variants={fadeLeftVariants}
            initial="hidden"
            animate={storyInView ? "visible" : "hidden"}
          >
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-orange-500/10 to-amber-400/10 blur-xl pointer-events-none" />
            <Image src="/prog.jpg" alt="Our story" fill className="object-cover rounded-2xl" />
          </motion.div>

          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            animate={storyInView ? "visible" : "hidden"}
          >
            <motion.p variants={fadeUpVariants} className="text-xs font-mono font-semibold text-orange-400 tracking-widest uppercase mb-3">
              Our Story
            </motion.p>
            <motion.h2 variants={fadeUpVariants} className="text-3xl font-extrabold text-white tracking-tight leading-snug">
              Built on a Vision to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">Empower</span>
            </motion.h2>
            <motion.p variants={fadeUpVariants} className="mt-5 text-gray-400 leading-relaxed">
              Our story began with a vision to deliver innovative digital solutions and professional services
              that empower individuals and businesses to succeed in the digital world.
            </motion.p>
            <motion.p variants={fadeUpVariants} className="mt-4 text-gray-400 leading-relaxed">
              Over the years we have worked with startups, enterprises, and organizations to design and develop
              modern web applications and digital products.
            </motion.p>
            <motion.div variants={fadeUpVariants}>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center mt-8 rounded-xl px-6 py-3 text-sm font-semibold text-black bg-[#F97316] shadow-[0_0_16px_rgba(249,115,22,0.4)] hover:brightness-110 hover:scale-[1.03] hover:shadow-[0_0_28px_rgba(249,115,22,0.6)] active:scale-[0.97] transition-all duration-200"
              >
                Contact Us
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section ref={statsRef} className="relative bg-[#1a1a1a] border-y border-orange-500/10 py-20 overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(249,115,22,0.05) 0%, transparent 70%)" }} />
        <div className="relative max-w-6xl mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            variants={staggerContainerVariants}
            initial="hidden"
            animate={statsInView ? "visible" : "hidden"}
          >
            <motion.p variants={fadeUpVariants} className="text-xs font-mono font-semibold text-orange-400 tracking-widest uppercase mb-3">
              By the Numbers
            </motion.p>
            <motion.h2 variants={fadeUpVariants} className="text-3xl font-extrabold text-white tracking-tight">
              Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">Impact</span>
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <AnimatedStat key={stat.label} {...stat} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section ref={teamRef} className="relative bg-[#0a0a0a] py-24 overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 50% 60% at 100% 50%, rgba(249,115,22,0.05) 0%, transparent 70%)" }} />
        <div className="relative max-w-7xl mx-auto px-6">

          <motion.div
            className="text-center mb-14"
            variants={staggerContainerVariants}
            initial="hidden"
            animate={teamInView ? "visible" : "hidden"}
          >
            <motion.p variants={fadeUpVariants} className="text-xs font-mono font-semibold text-orange-400 tracking-widest uppercase mb-3">
              The Team
            </motion.p>
            <motion.h2 variants={fadeUpVariants} className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Meet Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">People</span>
            </motion.h2>
            <motion.p variants={fadeUpVariants} className="text-gray-400 mt-3 max-w-xl mx-auto">
              The talented people behind our success
            </motion.p>
          </motion.div>

          <motion.div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            variants={staggerSlowContainerVariants}
            initial="hidden"
            animate={teamInView ? "visible" : "hidden"}
          >
            {team.map((member, index) => (
              <motion.div
                key={index}
                variants={scaleVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group relative rounded-2xl bg-[#1a1a1a] border border-orange-500/10 shadow-[0_4px_24px_rgba(0,0,0,0.5)] backdrop-blur-sm p-6 text-center hover:border-orange-500/40 hover:shadow-[0_8px_40px_rgba(249,115,22,0.12)] transition-colors duration-300 ease-out overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full bg-orange-500/5 blur-2xl pointer-events-none" />

                {/* Profile image with animated ring */}
                <div className="relative w-28 h-28 mx-auto">
                  <motion.div
                    className="absolute -inset-1 rounded-full bg-gradient-to-r from-orange-500/30 to-amber-400/30 blur-sm"
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity, delay: index * 0.4 }}
                  />
                  <Image src={member.image} alt={member.name} fill className="rounded-full object-cover relative" />
                </div>

                <h3 className="mt-5 font-semibold text-base text-white group-hover:text-orange-400 transition-colors duration-300">
                  {member.name}
                </h3>
                <p className="text-gray-500 text-sm mt-1">{member.role}</p>

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

      {/* ── CTA ── */}
      <section ref={ctaRef} className="relative bg-[#1a1a1a] border-t border-orange-500/10 py-20 overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 60% at 50% 100%, rgba(249,115,22,0.07) 0%, transparent 70%)" }} />
        <motion.div
          className="relative max-w-6xl mx-auto px-6 text-center"
          variants={staggerContainerVariants}
          initial="hidden"
          animate={ctaInView ? "visible" : "hidden"}
        >
          <motion.h2 variants={fadeUpVariants} className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Let&apos;s Build Something{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">Great Together</span>
          </motion.h2>
          <motion.p variants={fadeUpVariants} className="mt-4 text-gray-400 max-w-xl mx-auto leading-relaxed">
            Have a project in mind? We would love to hear from you.
          </motion.p>
          <motion.div variants={fadeUpVariants} className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl px-8 py-3.5 text-sm font-semibold text-black bg-[#F97316] shadow-[0_0_20px_rgba(249,115,22,0.45)] hover:brightness-110 hover:shadow-[0_0_36px_rgba(249,115,22,0.65)] transition-all duration-200"
              >
                Get In Touch
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/projects"
                className="inline-flex items-center justify-center rounded-xl px-8 py-3.5 text-sm font-semibold text-white bg-transparent border border-orange-500/50 hover:border-orange-400 hover:shadow-[0_0_20px_rgba(249,115,22,0.25)] transition-all duration-200"
              >
                View Our Work
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

    </main>
  );
}
