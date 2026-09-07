"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { staggerContainerVariants, fadeUpVariants, fadeLeftVariants } from "@/lib/animations";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ── Data ─────────────────────────────────────────────────────────────── */
const socialLinks = [
  { icon: Twitter, href: "https://x.com/Ikodit2002", label: "Twitter / X", color: "hover:bg-sky-500/20 hover:border-sky-500/50 hover:text-sky-400" },
  { icon: Instagram, href: "https://www.instagram.com/ikoditbenjami/", label: "Instagram", color: "hover:bg-pink-500/20 hover:border-pink-500/50 hover:text-pink-400" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/ikodit-benjamin-197365350/", label: "LinkedIn", color: "hover:bg-blue-500/20 hover:border-blue-500/50 hover:text-blue-400" },
  { icon: Youtube, href: "https://www.youtube.com/channel/UCBHBnSol61cCFGzWn8lXshQ", label: "YouTube", color: "hover:bg-red-500/20 hover:border-red-500/50 hover:text-red-400" },
  { icon: Facebook, href: "https://www.facebook.com/profile.php?id=100090950210061", label: "Facebook", color: "hover:bg-blue-600/20 hover:border-blue-600/50 hover:text-blue-400" },
];

const companyLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact", href: "/contact" },
  { label: "Book a Call", href: "/booking" },
];

const serviceLinks = [
  { label: "Software Development", href: "/services" },
  { label: "IT Security", href: "/services" },
  { label: "Graphics Design", href: "/services" },
  { label: "Computer Training", href: "/services" },
  { label: "IT Consultancy", href: "/services" },
  { label: "Network & CCTV Setup", href: "/services" },
];

const contactItems = [
  { icon: Mail, value: "techtroy28@gmail.com", href: "mailto:techtroy28@gmail.com" },
  { icon: Phone, value: "+256 747 447 447", href: "tel:+256747447447" },
  { icon: MapPin, value: "Kireka Kamuli C, Kampala, UG", href: null },
];

/* Column variant that staggers with increasing delay by column index */
const columnVariants = (delay: number) => ({
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      delay,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
});

/* ── Component ────────────────────────────────────────────────────────── */
export default function Footer() {
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: true, margin: "-60px" });

  /* GSAP: animate the top glow border width when in view */
  const glowRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = glowRef.current;
    if (!el || !isInView) return;
    gsap.from(el, {
      scaleX: 0,
      duration: 1.4,
      ease: "power3.out",
      transformOrigin: "left center",
    });
  }, [isInView]);

  const handleJoin = () => {
    if (email.trim()) {
      setJoined(true);
      setEmail("");
      setTimeout(() => setJoined(false), 3000);
    }
  };

  return (
    <footer ref={footerRef} className="relative w-full bg-[#0a0a0a] overflow-hidden">
      {/* ── Top glow border ── */}
      <div
        ref={glowRef}
        className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent"
      />
      <div className="absolute top-0 inset-x-0 h-[1px] blur-sm bg-gradient-to-r from-transparent via-orange-400/30 to-transparent" />

      {/* ── Ambient glow ── */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(249,115,22,0.06) 0%, transparent 70%)" }}
      />

      {/* ── Main content ── */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-12">
        <div className="grid gap-12 lg:grid-cols-[2fr_1fr_1fr_1fr] xl:gap-16">

          {/* ── Brand column ── */}
          <motion.div
            className="space-y-6"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={columnVariants(0)}
          >
            <Link href="/" className="inline-flex items-center gap-3 group">
              <motion.div
                whileHover={{ scale: 1.08, rotate: -3 }}
                className="relative h-10 w-10 rounded-xl overflow-hidden border border-orange-500/25 bg-[#1a1a1a] flex items-center justify-center shadow-[0_0_12px_rgba(249,115,22,0.15)] group-hover:shadow-[0_0_20px_rgba(249,115,22,0.30)] transition-all duration-300"
              >
                <Image src="/logo/TROYTECH.png" alt="TroyTech logo" fill className="object-contain p-1" />
              </motion.div>
              <div>
                <span className="text-lg font-extrabold text-white tracking-tight leading-none">TroyTech</span>
                <span className="text-lg font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300 tracking-tight leading-none">.Solutions</span>
              </div>
            </Link>

            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              Building modern digital products, scalable platforms, and powerful web applications for businesses across{" "}
              <span className="text-orange-400/80">Uganda</span> and worldwide.
            </p>

            <div>
              <p className="text-xs font-mono font-semibold text-gray-600 tracking-widest uppercase mb-3">Follow Us</p>
              <motion.div
                className="flex flex-wrap gap-2"
                variants={staggerContainerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                {socialLinks.map(({ icon: Icon, href, label, color }) => (
                  <motion.div
                    key={label}
                    variants={fadeUpVariants}
                    whileHover={{ scale: 1.15, y: -2 }}
                    whileTap={{ scale: 0.93 }}
                  >
                    <Link
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className={`h-9 w-9 rounded-xl bg-[#1a1a1a] border border-white/5 flex items-center justify-center text-gray-500 ${color} transition-all duration-200`}
                    >
                      <Icon size={15} />
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* ── Company links ── */}
          <motion.div
            className="space-y-4"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={columnVariants(0.1)}
          >
            <h3 className="text-xs font-mono font-bold text-white tracking-widest uppercase">Company</h3>
            <ul className="space-y-2.5">
              {companyLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="group inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-orange-400 transition-colors duration-200"
                  >
                    <motion.span
                      className="overflow-hidden"
                      initial={{ width: 0 }}
                      whileHover={{ width: 12 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowRight size={10} className="text-orange-400 shrink-0" />
                    </motion.span>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ── Services links ── */}
          <motion.div
            className="space-y-4"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={columnVariants(0.2)}
          >
            <h3 className="text-xs font-mono font-bold text-white tracking-widest uppercase">Services</h3>
            <ul className="space-y-2.5">
              {serviceLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="group inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-orange-400 transition-colors duration-200"
                  >
                    <motion.span
                      className="overflow-hidden"
                      initial={{ width: 0 }}
                      whileHover={{ width: 12 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowRight size={10} className="text-orange-400 shrink-0" />
                    </motion.span>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ── Contact + Newsletter ── */}
          <motion.div
            className="space-y-8"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={columnVariants(0.3)}
          >
            <div className="space-y-4">
              <h3 className="text-xs font-mono font-bold text-white tracking-widest uppercase">Contact</h3>
              <ul className="space-y-3">
                {contactItems.map(({ icon: Icon, value, href }) => (
                  <motion.li
                    key={value}
                    className="flex items-start gap-2.5"
                    whileHover={{ x: 3 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    <div className="mt-0.5 h-6 w-6 rounded-lg bg-orange-950/50 border border-orange-500/15 flex items-center justify-center text-orange-500 shrink-0">
                      <Icon size={12} />
                    </div>
                    {href ? (
                      <a href={href} className="text-sm text-gray-500 hover:text-orange-400 transition-colors duration-200 leading-relaxed">
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm text-gray-500 leading-relaxed">{value}</p>
                    )}
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono font-bold text-white tracking-widest uppercase">Newsletter</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Get updates on our <span className="text-orange-400/80">latest products</span> and services.
              </p>
              <AnimatePresence mode="wait">
                {joined ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="rounded-xl bg-orange-500/10 border border-orange-500/20 px-4 py-3 text-xs text-orange-400 font-medium"
                  >
                    ✓ You&apos;re subscribed!
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex gap-2"
                  >
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleJoin()}
                      className="h-9 text-xs bg-[#1a1a1a] border-white/8 text-white placeholder:text-gray-600 focus:border-orange-500/40 focus:ring-orange-500/10 rounded-xl"
                    />
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
                      <Button
                        onClick={handleJoin}
                        className="h-9 px-3 text-xs font-semibold text-black bg-[#F97316] rounded-xl shadow-[0_0_10px_rgba(249,115,22,0.3)] hover:brightness-110 hover:shadow-[0_0_18px_rgba(249,115,22,0.5)] transition-all duration-200 shrink-0"
                      >
                        Join
                      </Button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </div>

      {/* ── Bottom bar ── */}
      <motion.div
        className="relative max-w-7xl mx-auto px-6 lg:px-8 py-6"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600 font-mono">
            © 2026 <span className="text-gray-500">TroyTech Solutions</span> · All rights reserved.
          </p>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1a1a1a] border border-white/5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-orange-400" />
            </span>
            <span className="text-xs text-gray-500 font-mono">All systems operational</span>
          </div>

          <p className="text-xs text-gray-600 font-mono">
            Built with{" "}
            <span className="text-orange-500/70 hover:text-orange-400 transition-colors cursor-default">Next.js</span>
            {" · "}
            <span className="text-orange-500/70 hover:text-orange-400 transition-colors cursor-default">Tailwind CSS</span>
          </p>
        </div>
      </motion.div>
    </footer>
  );
}
