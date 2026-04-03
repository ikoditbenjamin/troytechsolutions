"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ModeToggle } from "./ModeToggle";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Blogs", href: "/blogs" },
  { name: "Contact", href: "/contact" },
  { name: "Projects", href: "/projects" },
];

const BOOK_HREF = "/booking";

export default function HeroSectionThree() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  return (
    <div className="bg-gray-100 dark:bg-gray-950">
      {/* Subtle grid overlay for matrix/cyber texture */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,255,128,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,128,0.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-gray-950/90 backdrop-blur-md border-b border-emerald-900/40 shadow-[0_0_30px_rgba(0,255,128,0.04)]"
            : "bg-transparent"
        }`}
      >
        <nav
          aria-label="Global"
          className="flex items-center justify-between p-4 lg:px-8 max-w-7xl mx-auto"
        >
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5 flex items-center space-x-2">
              <span className="sr-only">TroyTech Solution</span>
              <div className="px-2 py-1 bg-gradient-to-r from-emerald-900 to-cyan-900 rounded-lg border border-emerald-700/50">
                <img alt="" src="./logo/logo.png" className="h-10 w-auto" />
              </div>
              <span className="font-bold text-xl text-emerald-400 tracking-tight font-mono">
                TroyTech<span className="text-cyan-400">.</span>
              </span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            {/* ModeToggle next to hamburger for quick mobile access */}
            <ModeToggle />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-full p-2.5 text-emerald-400 hover:bg-emerald-950"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:gap-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-gray-400 hover:text-emerald-400 transition-colors font-mono tracking-wide"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4 items-center">
            <a
              href="#"
              className="text-sm font-medium text-gray-400 hover:text-emerald-400 transition-colors font-mono"
            >
              Sign in
            </a>
            <a
              href={BOOK_HREF}
              className="text-sm font-mono font-medium px-4 py-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-gray-950 rounded-full hover:shadow-[0_0_20px_rgba(0,255,128,0.3)] transition-all duration-300"
            >
              📅 Book a Call
            </a>
            <ModeToggle />
          </div>
        </nav>

        {/* Mobile Menu Dialog */}
        <Dialog
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="lg:hidden"
        >
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-950 border-l border-emerald-900/40 px-6 py-6 sm:max-w-sm">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5 flex items-center space-x-2">
                <div className="bg-gradient-to-r from-emerald-600 to-cyan-600 p-2 rounded-lg">
                  <img
                    alt=""
                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=white&shade=600"
                    className="h-6 w-auto"
                  />
                </div>
                <span className="font-bold text-xl text-emerald-400 font-mono">
                  Troy
                </span>
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-full p-2.5 text-emerald-400 hover:bg-emerald-950"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>

            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-emerald-900/40">
                <div className="space-y-1 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-mono font-medium text-gray-300 hover:bg-emerald-950 hover:text-emerald-400"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6 space-y-3">
                  <a
                    href="#"
                    className="block rounded-lg px-3 py-2.5 text-base font-mono font-medium text-gray-400 hover:bg-emerald-950 hover:text-emerald-400"
                  >
                    Sign in
                  </a>
                  <a
                    href={BOOK_HREF}
                    className="block rounded-full px-3 py-2.5 text-base font-mono font-medium text-center text-gray-950 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:shadow-[0_0_20px_rgba(0,255,128,0.3)]"
                  >
                    📅 Book a Call
                  </a>

                  {/* ✅ Mobile Mode Toggle */}
                  <div className="pt-4 flex justify-center">
                    <ModeToggle />
                  </div>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>

      {/* Two column hero section or other content can go here */}
    </div>
  );
}
