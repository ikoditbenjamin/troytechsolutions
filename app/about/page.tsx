"use client";

import Image from "next/image";
import Link from "next/link";
import HeroParallaxSlider from "@/components/HeroParallaxSlider";

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
  { value: "20+", label: "Projects Completed" },
  { value: "80+", label: "Happy Clients" },
  { value: "10+", label: "Years Experience" },
  { value: "5+",  label: "Team Members" },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen">

      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section className="relative border-b border-orange-500/10 overflow-hidden" style={{ minHeight: "420px" }}>
        {/* Parallax image slider fills the background */}
        <div className="absolute inset-0 z-0">
          <HeroParallaxSlider images={HERO_IMAGES} parallaxStrength={30} autoPlayMs={5000} />
        </div>

        {/* Content sits above the slider */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-28 md:py-36">
          <p className="text-xs font-mono font-semibold text-orange-400 tracking-widest uppercase mb-4 drop-shadow">
            Who We Are
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight drop-shadow-lg">
            About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
              TroyTech
            </span>
          </h1>
          <p className="mt-5 text-lg text-gray-200 leading-relaxed max-w-2xl mx-auto drop-shadow">
            We are committed to delivering innovative digital solutions — website design,
            online applications, printing services, and IT consultancy — helping businesses
            and individuals succeed in the modern digital world.
          </p>
        </div>
      </section>

      {/* ── STORY ───────────────────────────────────────────────────────── */}
      <section className="relative bg-[#0a0a0a] py-24 overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 50% 60% at 0% 50%, rgba(249,115,22,0.06) 0%, transparent 70%)" }} />
        <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="relative h-96 rounded-2xl overflow-hidden border border-orange-500/15 shadow-[0_8px_40px_rgba(249,115,22,0.08)]">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-orange-500/10 to-amber-400/10 blur-xl pointer-events-none" />
            <Image src="/prog.jpg" alt="Our story" fill className="object-cover rounded-2xl" />
          </div>
          <div>
            <p className="text-xs font-mono font-semibold text-orange-400 tracking-widest uppercase mb-3">
              Our Story
            </p>
            <h2 className="text-3xl font-extrabold text-white tracking-tight leading-snug">
              Built on a Vision to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
                Empower
              </span>
            </h2>
            <p className="mt-5 text-gray-400 leading-relaxed">
              Our story began with a vision to deliver innovative digital solutions and
              professional services that empower individuals and businesses to succeed in
              the digital world.
            </p>
            <p className="mt-4 text-gray-400 leading-relaxed">
              Over the years we have worked with startups, enterprises, and organizations
              to design and develop modern web applications and digital products.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center mt-8 rounded-xl px-6 py-3 text-sm font-semibold text-black bg-[#F97316] shadow-[0_0_16px_rgba(249,115,22,0.4)] hover:brightness-110 hover:scale-[1.03] hover:shadow-[0_0_28px_rgba(249,115,22,0.6)] active:scale-[0.97] transition-all duration-200"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* ── STATS ───────────────────────────────────────────────────────── */}
      <section className="relative bg-[#1a1a1a] border-y border-orange-500/10 py-20 overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(249,115,22,0.05) 0%, transparent 70%)" }} />
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-mono font-semibold text-orange-400 tracking-widest uppercase mb-3">
              By the Numbers
            </p>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
                Impact
              </span>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="group relative rounded-2xl bg-[#0a0a0a] border border-orange-500/10 p-8 text-center hover:-translate-y-1.5 hover:border-orange-500/40 hover:shadow-[0_8px_32px_rgba(249,115,22,0.12)] transition-all duration-300 ease-out overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-20 h-20 -mr-6 -mt-6 rounded-full bg-orange-500/5 blur-xl pointer-events-none" />
                <h3 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
                  {stat.value}
                </h3>
                <p className="text-gray-400 mt-2 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ────────────────────────────────────────────────────────── */}
      <section className="relative bg-[#0a0a0a] py-24 overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 50% 60% at 100% 50%, rgba(249,115,22,0.05) 0%, transparent 70%)" }} />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-mono font-semibold text-orange-400 tracking-widest uppercase mb-3">
              The Team
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Meet Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
                People
              </span>
            </h2>
            <p className="text-gray-400 mt-3 max-w-xl mx-auto">
              The talented people behind our success
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, index) => (
              <div
                key={index}
                className="group relative rounded-2xl bg-[#1a1a1a] border border-orange-500/10 shadow-[0_4px_24px_rgba(0,0,0,0.5)] backdrop-blur-sm p-6 text-center hover:-translate-y-1.5 hover:border-orange-500/40 hover:shadow-[0_8px_40px_rgba(249,115,22,0.12)] transition-all duration-300 ease-out overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full bg-orange-500/5 blur-2xl pointer-events-none" />
                <div className="relative w-28 h-28 mx-auto">
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-orange-500/30 to-amber-400/30 blur-sm" />
                  <Image src={member.image} alt={member.name} fill className="rounded-full object-cover relative" />
                </div>
                <h3 className="mt-5 font-semibold text-base text-white group-hover:text-orange-400 transition-colors duration-300">
                  {member.name}
                </h3>
                <p className="text-gray-500 text-sm mt-1">{member.role}</p>
                <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-orange-500 to-amber-400 rounded-b-2xl transition-all duration-500 ease-out" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-[#1a1a1a] border-t border-orange-500/10 py-20 overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 60% at 50% 100%, rgba(249,115,22,0.07) 0%, transparent 70%)" }} />
        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Let&apos;s Build Something{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
              Great Together
            </span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto leading-relaxed">
            Have a project in mind? We would love to hear from you.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl px-8 py-3.5 text-sm font-semibold text-black bg-[#F97316] shadow-[0_0_20px_rgba(249,115,22,0.45)] hover:brightness-110 hover:scale-[1.04] hover:shadow-[0_0_36px_rgba(249,115,22,0.65)] active:scale-[0.97] transition-all duration-200"
            >
              Get In Touch
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center justify-center rounded-xl px-8 py-3.5 text-sm font-semibold text-white bg-transparent border border-orange-500/50 hover:border-orange-400 hover:shadow-[0_0_20px_rgba(249,115,22,0.25)] hover:scale-[1.03] active:scale-[0.97] transition-all duration-200"
            >
              View Our Work
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
