"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ModeToggle } from "./ModeToggle";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export const navigation = [
  { name: "Home",     href: "/" },
  { name: "About",    href: "/about" },
  { name: "Blogs",    href: "/blogs" },
  { name: "Contact",  href: "/contact" },
  { name: "Projects", href: "/projects" },
];

export const isActive = (pathname: string | null, href: string): boolean =>
  pathname === href;

const BOOK_HREF = "/booking";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled]             = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 min-h-[64px] transition-all duration-300
          bg-[rgba(2,6,23,0.85)] backdrop-blur-md border-b border-cyan-400/20
          ${scrolled ? "shadow-[0_4px_30px_rgba(6,182,212,0.08)]" : ""}`}
      >
        <nav
          aria-label="Global"
          className="flex items-center justify-between px-4 py-3 lg:px-8 max-w-7xl mx-auto"
        >
          {/* ── Logo ─────────────────────────────────────────────────────── */}
          <div className="flex lg:flex-1">
            <Link
              href="/"
              className="group -m-1.5 p-1.5 flex items-center gap-2.5 transition-all duration-300"
            >
              <span className="sr-only">TroyTech Solutions</span>
              <div className="relative h-10 w-10 rounded-xl overflow-hidden border border-cyan-500/20 bg-[#0F172A] flex items-center justify-center shadow-[0_0_10px_rgba(6,182,212,0.15)] group-hover:shadow-[0_0_20px_rgba(6,182,212,0.35)] transition-all duration-300">
                <Image src="/logo/logo.png" alt="TroyTech logo" fill className="object-contain p-1" />
              </div>
              <span className="font-extrabold text-lg tracking-tight font-mono">
                <span className="text-white group-hover:text-cyan-100 transition-colors duration-300">TroyTech</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">.</span>
              </span>
            </Link>
          </div>

          {/* ── Mobile controls ──────────────────────────────────────────── */}
          <div className="flex lg:hidden items-center gap-2">
            <ModeToggle />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-xl p-2.5 text-gray-400 hover:text-cyan-400 hover:bg-cyan-950/50 transition-all duration-200"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>

          {/* ── Desktop nav ──────────────────────────────────────────────── */}
          <div className="hidden lg:flex lg:gap-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`nav-link text-sm font-mono font-medium tracking-[0.05em] transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:text-cyan-400
                  ${isActive(pathname, item.href) ? "text-cyan-400" : "text-gray-400"}`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* ── Desktop actions ──────────────────────────────────────────── */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4 items-center">
            <Link
              href="#"
              className="text-sm font-mono font-medium text-gray-400 hover:text-cyan-400 hover:-translate-y-0.5 transition-all duration-300"
            >
              Sign in
            </Link>
            <Link
              href={BOOK_HREF}
              className="group relative text-sm font-mono font-semibold px-5 py-2 rounded-xl bg-[#06B6DA] text-gray-950 shadow-[0_0_16px_rgba(6,182,212,0.4)] hover:brightness-110 hover:scale-[1.04] hover:shadow-[0_0_28px_rgba(6,182,212,0.65)] active:scale-[0.97] transition-all duration-200 overflow-hidden"
            >
              {/* shimmer sweep on hover */}
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 animate-shimmer transition-opacity duration-300" />
              <span className="relative">📅 Book a Call</span>
            </Link>
            <ModeToggle />
          </div>
        </nav>

        {/* ── Mobile menu dialog ───────────────────────────────────────── */}
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm transition-opacity duration-300" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-[#020617] border-l border-cyan-400/20 px-6 py-6 sm:max-w-sm transition-transform duration-300">

            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <Link href="/" className="flex items-center gap-2.5" onClick={() => setMobileMenuOpen(false)}>
                <div className="relative h-9 w-9 rounded-xl overflow-hidden border border-cyan-500/20 bg-[#0F172A]">
                  <Image src="/logo/logo.png" alt="TroyTech logo" fill className="object-contain p-1" />
                </div>
                <span className="font-extrabold text-base font-mono">
                  <span className="text-white">TroyTech</span>
                  <span className="text-cyan-400">.</span>
                </span>
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-xl p-2.5 text-gray-400 hover:text-cyan-400 hover:bg-cyan-950/50 transition-all duration-200"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>

            {/* Nav links */}
            <div className="space-y-1 mb-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`-mx-3 flex items-center rounded-xl px-3 py-3 text-base font-mono font-medium transition-all duration-200
                    ${isActive(pathname, item.href)
                      ? "text-cyan-400 bg-cyan-950/40 border border-cyan-500/20"
                      : "text-gray-300 hover:bg-cyan-950/30 hover:text-cyan-400 border border-transparent"}`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent mb-6" />

            {/* Actions */}
            <div className="space-y-3">
              <Link
                href="#"
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-xl px-3 py-3 text-base font-mono font-medium text-gray-400 hover:bg-cyan-950/30 hover:text-cyan-400 transition-all duration-200"
              >
                Sign in
              </Link>
              <Link
                href={BOOK_HREF}
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-xl px-3 py-3 text-base font-mono font-semibold text-center text-gray-950 bg-[#06B6DA] shadow-[0_0_16px_rgba(6,182,212,0.4)] hover:brightness-110 hover:shadow-[0_0_28px_rgba(6,182,212,0.6)] transition-all duration-200"
              >
                📅 Book a Call
              </Link>
              <div className="pt-2 flex justify-center">
                <ModeToggle />
              </div>
            </div>

          </DialogPanel>
        </Dialog>
      </header>

      {/* Spacer so content doesn't hide under fixed header */}
      <div className="h-16" />
    </>
  );
}
