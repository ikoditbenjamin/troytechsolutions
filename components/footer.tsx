"use client";

import { useState } from "react";
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

/* ── Data ─────────────────────────────────────────────────────────────── */

const socialLinks = [
  {
    icon: Twitter,
    href: "https://x.com/Ikodit2002",
    label: "Twitter / X",
    color: "hover:bg-sky-500/20 hover:border-sky-500/50 hover:text-sky-400",
  },
  {
    icon: Instagram,
    href: "https://www.instagram.com/ikoditbenjami/",
    label: "Instagram",
    color: "hover:bg-pink-500/20 hover:border-pink-500/50 hover:text-pink-400",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/ikodit-benjamin-197365350/",
    label: "LinkedIn",
    color: "hover:bg-blue-500/20 hover:border-blue-500/50 hover:text-blue-400",
  },
  {
    icon: Youtube,
    href: "https://www.youtube.com/channel/UCBHBnSol61cCFGzWn8lXshQ",
    label: "YouTube",
    color: "hover:bg-red-500/20 hover:border-red-500/50 hover:text-red-400",
  },
  {
    icon: Facebook,
    href: "https://www.facebook.com/profile.php?id=100090950210061",
    label: "Facebook",
    color: "hover:bg-blue-600/20 hover:border-blue-600/50 hover:text-blue-400",
  },
];

const companyLinks = [
  { label: "Home",     href: "/" },
  { label: "About",    href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Blogs",    href: "/blogs" },
  { label: "Contact",  href: "/contact" },
  { label: "Book a Call", href: "/booking" },
];

const serviceLinks = [
  { label: "Software Development",  href: "/services" },
  { label: "IT Security",           href: "/services" },
  { label: "Graphics Design",       href: "/services" },
  { label: "Computer Training",     href: "/services" },
  { label: "IT Consultancy",        href: "/services" },
  { label: "Loan & Financing",      href: "/services" },
];

const contactItems = [
  { icon: Mail,    value: "techtroy28@gmail.com",          href: "mailto:techtroy28@gmail.com" },
  { icon: Phone,   value: "+256 747 447 447",              href: "tel:+256747447447" },
  { icon: MapPin,  value: "Kireka Kamuli C, Kampala, UG",  href: null },
];

/* ── Component ────────────────────────────────────────────────────────── */

export default function Footer() {
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);

  const handleJoin = () => {
    if (email.trim()) {
      setJoined(true);
      setEmail("");
      setTimeout(() => setJoined(false), 3000);
    }
  };

  return (
    <footer className="relative w-full bg-[#020617] overflow-hidden">

      {/* ── Top glow border ──────────────────────────────────────────────── */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
      <div className="absolute top-0 inset-x-0 h-[1px] blur-sm bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />

      {/* ── Ambient radial glow ──────────────────────────────────────────── */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(6,182,212,0.06) 0%, transparent 70%)",
        }}
      />

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-12">
        <div className="grid gap-12 lg:grid-cols-[2fr_1fr_1fr_1fr] xl:gap-16">

          {/* ── Brand column ─────────────────────────────────────────────── */}
          <div className="space-y-6">
            {/* Logo + name */}
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="relative h-10 w-10 rounded-xl overflow-hidden border border-cyan-500/20 bg-[#0F172A] flex items-center justify-center shadow-[0_0_12px_rgba(6,182,212,0.15)] group-hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all duration-300">
                <Image src="/logo/logo.png" alt="TroyTech logo" fill className="object-contain p-1" />
              </div>
              <div>
                <span className="text-lg font-extrabold text-white tracking-tight leading-none">
                  TroyTech
                </span>
                <span className="text-lg font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 tracking-tight leading-none">
                  .Solutions
                </span>
              </div>
            </Link>

            {/* Tagline */}
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              Building modern digital products, scalable platforms, and powerful
              web applications for businesses across{" "}
              <span className="text-cyan-400/80">Uganda</span> and worldwide.
            </p>

            {/* Social icons */}
            <div>
              <p className="text-xs font-mono font-semibold text-gray-600 tracking-widest uppercase mb-3">
                Follow Us
              </p>
              <div className="flex flex-wrap gap-2">
                {socialLinks.map(({ icon: Icon, href, label, color }) => (
                  <Link
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={`h-9 w-9 rounded-xl bg-[#0F172A] border border-white/5 flex items-center justify-center text-gray-500 ${color} transition-all duration-200`}
                  >
                    <Icon size={15} />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* ── Company links ─────────────────────────────────────────────── */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold text-white tracking-widest uppercase">
              Company
            </h3>
            <ul className="space-y-2.5">
              {companyLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="group inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-cyan-400 transition-colors duration-200"
                  >
                    <span className="w-0 group-hover:w-3 overflow-hidden transition-all duration-200">
                      <ArrowRight size={10} className="text-cyan-400 shrink-0" />
                    </span>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Services links ────────────────────────────────────────────── */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold text-white tracking-widest uppercase">
              Services
            </h3>
            <ul className="space-y-2.5">
              {serviceLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="group inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-cyan-400 transition-colors duration-200"
                  >
                    <span className="w-0 group-hover:w-3 overflow-hidden transition-all duration-200">
                      <ArrowRight size={10} className="text-cyan-400 shrink-0" />
                    </span>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact + Newsletter ──────────────────────────────────────── */}
          <div className="space-y-8">
            {/* Contact */}
            <div className="space-y-4">
              <h3 className="text-xs font-mono font-bold text-white tracking-widest uppercase">
                Contact
              </h3>
              <ul className="space-y-3">
                {contactItems.map(({ icon: Icon, value, href }) => (
                  <li key={value} className="flex items-start gap-2.5">
                    <div className="mt-0.5 h-6 w-6 rounded-lg bg-cyan-950/50 border border-cyan-500/15 flex items-center justify-center text-cyan-500 shrink-0">
                      <Icon size={12} />
                    </div>
                    {href ? (
                      <a
                        href={href}
                        className="text-sm text-gray-500 hover:text-cyan-400 transition-colors duration-200 leading-relaxed"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm text-gray-500 leading-relaxed">{value}</p>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono font-bold text-white tracking-widest uppercase">
                Newsletter
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Get updates on our{" "}
                <span className="text-cyan-400/80">latest products</span> and services.
              </p>
              {joined ? (
                <div className="rounded-xl bg-cyan-500/10 border border-cyan-500/20 px-4 py-3 text-xs text-cyan-400 font-medium">
                  ✓ You&apos;re subscribed!
                </div>
              ) : (
                <div className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleJoin()}
                    className="h-9 text-xs bg-[#0F172A] border-white/8 text-white placeholder:text-gray-600 focus:border-cyan-500/40 focus:ring-cyan-500/10 rounded-xl"
                  />
                  <Button
                    onClick={handleJoin}
                    className="h-9 px-3 text-xs font-semibold text-gray-950 bg-[#06B6DA] rounded-xl shadow-[0_0_10px_rgba(6,182,212,0.3)] hover:brightness-110 hover:shadow-[0_0_18px_rgba(6,182,212,0.5)] active:scale-[0.97] transition-all duration-200 shrink-0"
                  >
                    Join
                  </Button>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* ── Divider ──────────────────────────────────────────────────────── */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </div>

      {/* ── Bottom bar ───────────────────────────────────────────────────── */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Copyright */}
          <p className="text-xs text-gray-600 font-mono">
            © 2026{" "}
            <span className="text-gray-500">TroyTech Solutions</span>
            {" "}· All rights reserved.
          </p>

          {/* Status badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0F172A] border border-white/5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
            </span>
            <span className="text-xs text-gray-500 font-mono">All systems operational</span>
          </div>

          {/* Tech stack */}
          <p className="text-xs text-gray-600 font-mono">
            Built with{" "}
            <span className="text-cyan-500/70 hover:text-cyan-400 transition-colors cursor-default">Next.js</span>
            {" "}·{" "}
            <span className="text-cyan-500/70 hover:text-cyan-400 transition-colors cursor-default">Tailwind CSS</span>
          </p>

        </div>
      </div>

    </footer>
  );
}
