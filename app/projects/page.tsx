"use client";

import ServicesSection from "@/components/service";
import Image from "next/image";
import Link from "next/link";
import HeroParallaxSlider from "@/components/HeroParallaxSlider";

const HERO_IMAGES = [
  "/projects/hero/project1.jpg",
  "/projects/hero/project2.jpg",
  "/projects/hero/project3.jpg",
];

const projects = [
  { id: 1, title: "Online Banking System",       description: "A secure banking platform built with Next.js, Node.js and PostgreSQL.",                                                                                               image: "/projects/banking.jpg",    tech: ["Next.js", "Node.js", "PostgreSQL"],     link: "#" },
  { id: 2, title: "Election Data Collection App", description: "Mobile data collection application designed for Uganda's 2026 elections.",                                                                                         image: "/projects/election.jpg",   tech: ["React", "Mobile App", "API"],           link: "#" },
  { id: 3, title: "E-commerce Website",           description: "Modern e-commerce platform with product catalog, payments and dashboard.",                                                                                          image: "/projects/e-commerce.jpg", tech: ["Next.js", "Stripe", "Tailwind"],        link: "#" },
  { id: 4, title: "Portfolio Website",            description: "A personal developer portfolio showcasing projects and skills.",                                                                                                    image: "/projects/port.jpg",       tech: ["Next.js", "Tailwind", "Framer Motion"], link: "#" },
  { id: 5, title: "School Management System",     description: "Web platform for managing students, teachers, classes and results.",                                                                                                image: "/projects/school.jpg",     tech: ["React", "Node.js", "MongoDB"],          link: "#" },
  { id: 6, title: "Blog Platform",                description: "Content publishing platform with articles, categories and comments.",                                                                                               image: "/projects/blog.jpg",       tech: ["Next.js", "Prisma", "PostgreSQL"],      link: "#" },
  { id: 7, title: "Movie Website",                description: "A modern movie website where users can discover new films, watch trailers, read reviews, and stay updated with the latest entertainment and cinema releases.",     image: "/projects/movie.jpg",      tech: ["Next.js", "Prisma", "PostgreSQL"],      link: "#" },
  { id: 8, title: "Investment System",            description: "A modern investment platform designed to help users manage their portfolios and make informed financial decisions.",                                                 image: "/projects/investment.png", tech: ["Next.js", "Prisma", "PostgreSQL"],      link: "#" },
];

export default function ProjectsPage() {
  return (
    <main className="min-h-screen">

      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section className="relative border-b border-orange-500/10 overflow-hidden" style={{ minHeight: "420px" }}>
        <div className="absolute inset-0 z-0">
          <HeroParallaxSlider images={HERO_IMAGES} parallaxStrength={30} autoPlayMs={6000} />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-28 md:py-36">
          <p className="text-xs font-mono font-semibold text-orange-400 tracking-widest uppercase mb-4 drop-shadow">
            Our Work
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight drop-shadow-lg">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
              Projects
            </span>
          </h1>
          <p className="mt-5 text-lg text-gray-200 leading-relaxed max-w-2xl mx-auto drop-shadow">
            A collection of projects showcasing our experience in building modern digital products and web applications.
          </p>
        </div>
      </section>

      {/* ── FEATURED PROJECT ─────────────────────────────────────────────── */}
      <section className="relative bg-[#0a0a0a] py-16 overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 50% at 0% 50%, rgba(249,115,22,0.06) 0%, transparent 70%)" }} />
        <div className="relative max-w-7xl mx-auto px-6">
          <p className="text-xs font-mono font-semibold text-orange-400 tracking-widest uppercase mb-6">
            Featured
          </p>
          <div className="grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-orange-500/15 shadow-[0_8px_40px_rgba(249,115,22,0.08)] bg-[#1a1a1a]">
            <div className="relative h-80 md:h-full min-h-[280px]">
              <Image src="/projects/smartdigital.jpg" alt="Featured Project" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#1a1a1a]/60" />
            </div>
            <div className="p-10 flex flex-col justify-center">
              <span className="text-xs font-mono font-semibold text-orange-400 tracking-widest uppercase">
                Featured Project
              </span>
              <h2 className="text-3xl font-extrabold mt-2 text-white leading-snug">Smart Digital Platform</h2>
              <p className="text-gray-400 mt-4 leading-relaxed">
                A powerful digital platform designed to streamline operations, manage data efficiently,
                and provide real-time insights through modern web technologies.
              </p>
              <Link
                href="#"
                className="inline-flex items-center gap-1 mt-6 self-start rounded-xl px-6 py-3 text-sm font-semibold text-black bg-[#F97316] shadow-[0_0_16px_rgba(249,115,22,0.4)] hover:brightness-110 hover:scale-[1.03] hover:shadow-[0_0_28px_rgba(249,115,22,0.6)] active:scale-[0.97] transition-all duration-200"
              >
                View Project →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECT GRID ─────────────────────────────────────────────────── */}
      <section className="relative bg-[#1a1a1a] border-t border-orange-500/10 py-20 overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(249,115,22,0.04) 0%, transparent 70%)" }} />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-mono font-semibold text-orange-400 tracking-widest uppercase mb-3">
              All Projects
            </p>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              What We&apos;ve{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
                Built
              </span>
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group relative rounded-2xl overflow-hidden bg-[#0a0a0a] border border-orange-500/10 shadow-[0_4px_24px_rgba(0,0,0,0.5)] backdrop-blur-sm hover:-translate-y-1.5 hover:border-orange-500/40 hover:shadow-[0_8px_40px_rgba(249,115,22,0.12)] transition-all duration-300 ease-out"
              >
                <div className="relative h-52">
                  <Image src={project.image} alt={project.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors duration-300 leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm mt-2 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.tech.map((tech, i) => (
                      <span key={i} className="text-xs bg-orange-950/50 border border-orange-500/20 text-orange-300 px-2.5 py-0.5 rounded-full font-mono">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <Link href={project.link} className="inline-block mt-5 text-sm font-semibold text-orange-400 hover:text-orange-300 transition-colors duration-200">
                    View Details →
                  </Link>
                </div>
                <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-orange-500 to-amber-400 transition-all duration-500 ease-out" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────────────────── */}
      <ServicesSection />

      {/* ── CTA ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-[#1a1a1a] border-t border-orange-500/10 py-20 overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 60% at 50% 100%, rgba(249,115,22,0.07) 0%, transparent 70%)" }} />
        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Have a{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
              Project
            </span>{" "}
            in Mind?
          </h2>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto leading-relaxed">
            Let&apos;s work together to create something amazing.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl px-8 py-3.5 text-sm font-semibold text-black bg-[#F97316] shadow-[0_0_20px_rgba(249,115,22,0.45)] hover:brightness-110 hover:scale-[1.04] hover:shadow-[0_0_36px_rgba(249,115,22,0.65)] active:scale-[0.97] transition-all duration-200"
            >
              Start a Project
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-xl px-8 py-3.5 text-sm font-semibold text-white bg-transparent border border-orange-500/50 hover:border-orange-400 hover:shadow-[0_0_20px_rgba(249,115,22,0.25)] hover:scale-[1.03] active:scale-[0.97] transition-all duration-200"
            >
              About Us
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
