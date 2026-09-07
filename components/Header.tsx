"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ModeToggle } from "./ModeToggle";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  mobileMenuVariants,
  navItemVariants,
  staggerContainerVariants,
} from "@/lib/animations";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Blogs", href: "/blogs" },
  { name: "Contact", href: "/contact" },
  { name: "Projects", href: "/projects" },
];

export const isActive = (pathname: string | null, href: string): boolean =>
  pathname === href;

const BOOK_HREF = "/booking";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? window.scrollY / total : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  /* GSAP entrance for desktop nav items on first mount */
  const navRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const items = nav.querySelectorAll(".nav-gsap-item");
    gsap.from(items, {
      opacity: 0,
      y: -12,
      duration: 0.45,
      stagger: 0.06,
      ease: "power2.out",
      delay: 0.2,
    });
  }, []);

  return (
    <>
      {/* ─────────────────── Fixed header bar ─────────────────── */}
      <header
        className={`fixed inset-x-0 top-0 z-50 min-h-[64px] transition-all duration-300
          bg-[rgba(10,10,10,0.88)] backdrop-blur-md border-b border-orange-500/20
          ${scrolled ? "shadow-[0_4px_30px_rgba(249,115,22,0.10)]" : ""}`}
      >
        <nav
          aria-label="Global"
          className="flex items-center justify-between px-4 py-3 lg:px-8 max-w-7xl mx-auto"
        >
          {/* ── Logo ── */}
          <div className="flex lg:flex-1">
            <Link
              href="/"
              className="group -m-1.5 p-1.5 flex items-center gap-3 transition-all duration-300"
            >
              <span className="sr-only">TroyTech Solutions</span>
              <motion.div
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="relative h-11 w-11 rounded-xl overflow-hidden bg-[#1a1a1a] flex items-center justify-center
                  ring-1 ring-orange-500/40 shadow-[0_0_14px_rgba(249,115,22,0.25)]
                  group-hover:ring-orange-400/70 group-hover:shadow-[0_0_28px_rgba(249,115,22,0.50)]
                  transition-all duration-300"
              >
                <Image
                  src="/logo/TROYTECH.png"
                  alt="TroyTech logo"
                  fill
                  className="object-contain p-1.5"
                />
              </motion.div>
              <span className="font-extrabold text-xl tracking-tight font-mono leading-none">
                <span className="text-white group-hover:text-orange-50 transition-colors duration-300">
                  TroyTech
                </span>
                <span className="text-[#F97316] ml-0.5">.</span>
              </span>
            </Link>
          </div>

          {/* ── Mobile controls (visible below lg) ── */}
          <div className="flex lg:hidden items-center gap-2">
            <ModeToggle />
            <motion.button
              whileTap={{ scale: 0.92 }}
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open main menu"
              className="-m-2.5 inline-flex items-center justify-center rounded-xl p-2.5
                text-gray-400 hover:text-orange-400 hover:bg-orange-950/50 transition-all duration-200"
            >
              <Bars3Icon aria-hidden="true" className="h-6 w-6" />
            </motion.button>
          </div>

          {/* ── Desktop nav (hidden below lg) ── */}
          <div ref={navRef} className="hidden lg:flex lg:gap-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`nav-gsap-item relative nav-link text-sm font-mono font-medium tracking-[0.05em]
                  transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:text-orange-400
                  ${isActive(pathname, item.href) ? "text-orange-400" : "text-gray-400"}`}
              >
                {item.name}
                {isActive(pathname, item.href) && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-0.5 left-0 right-0 h-[2px]
                      bg-gradient-to-r from-orange-500 to-amber-400 rounded-full"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* ── Desktop actions (hidden below lg) ── */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4 items-center">
            <Link
              href="#"
              className="text-sm font-mono font-medium text-gray-400 hover:text-orange-400
                hover:-translate-y-0.5 transition-all duration-300"
            >
              Sign in
            </Link>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                href={BOOK_HREF}
                className="group relative text-sm font-mono font-semibold px-5 py-2 rounded-xl
                  bg-[#F97316] text-black shadow-[0_0_16px_rgba(249,115,22,0.45)]
                  hover:brightness-110 hover:shadow-[0_0_28px_rgba(249,115,22,0.70)]
                  transition-all duration-200 overflow-hidden"
              >
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 animate-shimmer transition-opacity duration-300" />
                <span className="relative">📅 Book a Call</span>
              </Link>
            </motion.div>
            <ModeToggle />
          </div>
        </nav>

        {/* Scroll-progress bar */}
        <motion.div
          className="absolute bottom-0 left-0 h-[2px] w-full
            bg-gradient-to-r from-orange-500 via-amber-400 to-orange-300 origin-left"
          style={{ scaleX: scrollProgress }}
        />
      </header>

      {/* Spacer so content doesn't hide under the fixed bar */}
      <div className="h-16" />

      {/* ─────────────────── Mobile menu overlay ──────────────────
          Rendered OUTSIDE <header> so it's never clipped by it.
          z-[9990] sits below chatbot/whatsapp but above everything else. */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="mobile-backdrop"
              className="fixed inset-0 z-[9980] bg-black/75 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Slide-in panel */}
            <motion.div
              key="mobile-panel"
              className="fixed inset-y-0 right-0 z-[9990] w-full overflow-y-auto
                bg-[#0a0a0a] border-l border-orange-500/20 px-6 py-6
                sm:max-w-sm lg:hidden"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Panel header */}
              <div className="flex items-center justify-between mb-8">
                <Link
                  href="/"
                  className="flex items-center gap-3"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="relative h-10 w-10 rounded-xl overflow-hidden bg-[#1a1a1a]
                    ring-1 ring-orange-500/40 shadow-[0_0_12px_rgba(249,115,22,0.2)]">
                    <Image
                      src="/logo/TROYTECH.png"
                      alt="TroyTech logo"
                      fill
                      className="object-contain p-1.5"
                    />
                  </div>
                  <span className="font-extrabold text-base font-mono">
                    <span className="text-white">TroyTech</span>
                    <span className="text-[#F97316]">.</span>
                  </span>
                </Link>

                <motion.button
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                  className="-m-2.5 rounded-xl p-2.5 text-gray-400
                    hover:text-orange-400 hover:bg-orange-950/50 transition-all duration-200"
                >
                  <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                </motion.button>
              </div>

              {/* Nav links — staggered */}
              <motion.div
                className="space-y-1 mb-6"
                variants={staggerContainerVariants}
                initial="hidden"
                animate="visible"
              >
                {navigation.map((item) => (
                  <motion.div key={item.name} variants={navItemVariants}>
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`-mx-3 flex items-center rounded-xl px-3 py-3
                        text-base font-mono font-medium transition-all duration-200
                        ${isActive(pathname, item.href)
                          ? "text-orange-400 bg-orange-950/40 border border-orange-500/20"
                          : "text-gray-300 hover:bg-orange-950/30 hover:text-orange-400 border border-transparent"
                        }`}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-orange-500/25 to-transparent mb-6" />

              {/* Actions */}
              <motion.div
                className="space-y-3"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.4 }}
              >
                <Link
                  href="#"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-xl px-3 py-3 text-base font-mono font-medium
                    text-gray-400 hover:bg-orange-950/30 hover:text-orange-400 transition-all duration-200"
                >
                  Sign in
                </Link>
                <Link
                  href={BOOK_HREF}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-xl px-3 py-3 text-base font-mono font-semibold
                    text-center text-black bg-[#F97316]
                    shadow-[0_0_16px_rgba(249,115,22,0.45)]
                    hover:brightness-110 hover:shadow-[0_0_28px_rgba(249,115,22,0.65)]
                    transition-all duration-200"
                >
                  📅 Book a Call
                </Link>
                <div className="pt-2 flex justify-center">
                  <ModeToggle />
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
