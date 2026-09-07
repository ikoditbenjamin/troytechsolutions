"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import ServicesSection from "@/components/service";
import Image from "next/image";
import Link from "next/link";
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
  "/projects/hero/project1.jpg",
  "/projects/hero/project2.jpg",
  "/projects/hero/project3.jpg",
];

const projects = [
  { id: 1, title: "Online Banking System",        description: "A secure banking platform built with Next.js, Node.js and PostgreSQL.",                                                                                               image: "/projects/banking.jpg",    tech: ["Next.js", "Node.js", "PostgreSQL"],     link: "#" },
  { id: 2, title: "Election Data Collection App",  description: "Mobile data collection application designed for Uganda's 2026 elections.",                                                                                         image: "/projects/election.jpg",   tech: ["React", "Mobile App", "API"],           link: "#" },
  { id: 3, title: "E-commerce Website",            description: "Modern e-commerce platform with product catalog, payments and dashboard.",                                                                                          image: "/projects/e-commerce.jpg", tech: ["Next.js", "Stripe", "Tailwind"],        link: "#" },
  { id: 4, title: "Portfolio Website",             description: "A personal developer portfolio showcasing projects and skills.",                                                                                                    image: "/projects/port.jpg",       tech: ["Next.js", "Tailwind", "Framer Motion"], link: "#" },
  { id: 5, title: "School Management System",      description: "Web platform for managing students, teachers, classes and results.",                                                                                                image: "/projects/school.jpg",     tech: ["React", "Node.js", "MongoDB"],          link: "#" },
  { id: 6, title: "Blog Platform",                 description: "Content publishing platform with articles, categories and comments.",                                                                                               image: "/projects/blog.jpg",       tech: ["Next.js", "Prisma", "PostgreSQL"],      link: "#" },
  { id: 7, title: "Movie Website",                 description: "A modern movie website where users can discover new films, watch trailers, read reviews, and stay updated with the latest entertainment and cinema releases.",     image: "/projects/movie.jpg",      tech: ["Next.js", "Prisma", "PostgreSQL"],      link: "#" },
  { id: 8, title: "Investment System",             description: "A modern investment platform designed to help users manage their portfolios and make informed financial decisions.",                                                 image: "/projects/investment.png", tech: ["Next.js", "Prisma", "PostgreSQL"],      link: "#" },
];

export default function ProjectsPage() {
  /* Hero GSAP entrance */
  const heroTextRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = heroTextRef.current;
    if (!el) return;
    const tl = gsap.timeline({ delay: 0.25 });
    tl.from(el.querySelectorAll(".hero-tag"),   { opacity: 0, y: -14, duration: 0.5, ease: "back.out(2)" })
      .from(el.querySelectorAll(".hero-title"), { opacity: 0, y: 28, duration: 0.65, ease: "power3.out" }, "-=0.15")
      .from(el.querySelectorAll(".hero-sub"),   { opacity: 0, y: 16, duration: 0.55, ease: "power3.out" }, "-=0.25");
    return () => { tl.kill(); };
  }, []);

  /* Section refs */
  const featuredRef  = useRef<HTMLElement>(null);
  const gridRef      = useRef<HTMLElement>(null);
  const ctaRef       = useRef<HTMLElement>(null);
  const featuredInView = useInView(featuredRef,  { once: true, margin: "-80px" });
  const gridInView     = useInView(gridRef,      { once: true, margin: "-60px" });
  const ctaInView      = useInView(ctaRef,       { once: true, margin: "-60px" });

  return (
    <main className="min-h-screen">

      {/* ── HERO ── */}
      <section className="relative border-b border-orange-500/10 overflow-hidden" style={{ minHeight: "420px" }}>
        <div className="absolute inset-0 z-0">
          <HeroParallaxSlider images={HERO_IMAGES} parallaxStrength={30} autoPlayMs={6000} />
        </div>
        <div ref={heroTextRef} className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-28 md:py-36">
          <p className="hero-tag text-xs font-mono font-semibold text-orange-400 tracking-widest uppercase mb-4 drop-shadow">Our Work</p>
          <h1 className="hero-title text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight drop-shadow-lg">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">Projects</span>
          </h1>
          <p className="hero-sub mt-5 text-lg text-gray-200 leading-relaxed max-w-2xl mx-auto drop-shadow">
            A collection of projects showcasing our experience in building modern digital products and web applications.
          </p>
        </div>
      </section>

      {/* ── FEATURED PROJECT ── */}
      <section ref={featuredRef} className="relative bg-[#0a0a0a] py-16 overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 50% at 0% 50%, rgba(249,115,22,0.06) 0%, transparent 70%)" }} />
        <div className="relative max-w-7xl mx-auto px-6">
          <motion.p
            variants={fadeUpVariants}
            initial="hidden"
            animate={featuredInView ? "visible" : "hidden"}
            className="text-xs font-mono font-semibold text-orange-400 tracking-widest uppercase mb-6"
          >
            Featured
          </motion.p>
          <motion.div
            className="grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-orange-500/15 shadow-[0_8px_40px_rgba(249,115,22,0.08)] bg-[#1a1a1a]"
            variants={scaleVariants}
            initial="hidden"
            animate={featuredInView ? "visible" : "hidden"}
          >
            <motion.div
              className="relative h-80 md:h-full min-h-[280px] overflow-hidden"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.5 }}
            >
              <Image src="/projects/smartdigital.jpg" alt="Featured Project" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#1a1a1a]/60" />
            </motion.div>
            <motion.div
              className="p-10 flex flex-col justify-center"
              variants={fadeRightVariants}
              initial="hidden"
              animate={featuredInView ? "visible" : "hidden"}
            >
              <span className="text-xs font-mono font-semibold text-orange-400 tracking-widest uppercase">Featured Project</span>
              <h2 className="text-3xl font-extrabold mt-2 text-white leading-snug">Smart Digital Platform</h2>
              <p className="text-gray-400 mt-4 leading-relaxed">
                A powerful digital platform designed to streamline operations, manage data efficiently,
                and provide real-time insights through modern web technologies.
              </p>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="#"
                  className="inline-flex items-center gap-1 mt-6 self-start rounded-xl px-6 py-3 text-sm font-semibold text-black bg-[#F97316] shadow-[0_0_16px_rgba(249,115,22,0.4)] hover:brightness-110 hover:shadow-[0_0_28px_rgba(249,115,22,0.6)] transition-all duration-200"
                >
                  View Project →
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── PROJECT GRID ── */}
      <section ref={gridRef} className="relative bg-[#1a1a1a] border-t border-orange-500/10 py-20 overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(249,115,22,0.04) 0%, transparent 70%)" }} />
        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            variants={staggerContainerVariants}
            initial="hidden"
            animate={gridInView ? "visible" : "hidden"}
          >
            <motion.p variants={fadeUpVariants} className="text-xs font-mono font-semibold text-orange-400 tracking-widest uppercase mb-3">All Projects</motion.p>
            <motion.h2 variants={fadeUpVariants} className="text-3xl font-extrabold text-white tracking-tight">
              What We&apos;ve{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">Built</span>
            </motion.h2>
          </motion.div>

          <motion.div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            variants={staggerSlowContainerVariants}
            initial="hidden"
            animate={gridInView ? "visible" : "hidden"}
          >
            {projects.map((project) => (
              <motion.div
                key={project.id}
                variants={scaleVariants}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                className="group relative rounded-2xl overflow-hidden bg-[#0a0a0a] border border-orange-500/10 shadow-[0_4px_24px_rgba(0,0,0,0.5)] backdrop-blur-sm hover:border-orange-500/40 hover:shadow-[0_8px_40px_rgba(249,115,22,0.12)] transition-colors duration-300 ease-out"
              >
                {/* Image with zoom on hover */}
                <div className="relative h-52 overflow-hidden">
                  <motion.div
                    className="absolute inset-0"
                    whileHover={{ scale: 1.07 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Image src={project.image} alt={project.title} fill className="object-cover" />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent" />
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors duration-300 leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm mt-2 leading-relaxed">{project.description}</p>

                  {/* Tech badges — pop in with stagger */}
                  <motion.div
                    className="flex flex-wrap gap-2 mt-4"
                    variants={{ visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } } }}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    {project.tech.map((tech, i) => (
                      <motion.span
                        key={i}
                        variants={popVariants}
                        className="text-xs bg-orange-950/50 border border-orange-500/20 text-orange-300 px-2.5 py-0.5 rounded-full font-mono"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </motion.div>

                  <Link href={project.link} className="inline-block mt-5 text-sm font-semibold text-orange-400 hover:text-orange-300 transition-colors duration-200">
                    View Details →
                  </Link>
                </div>

                {/* Bottom bar */}
                <motion.div
                  className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-orange-500 to-amber-400"
                  initial={{ scaleX: 0, originX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.4 }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <ServicesSection />

      {/* ── CTA ── */}
      <section ref={ctaRef} className="relative bg-[#1a1a1a] border-t border-orange-500/10 py-20 overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 60% at 50% 100%, rgba(249,115,22,0.07) 0%, transparent 70%)" }} />
        <motion.div
          className="relative max-w-5xl mx-auto px-6 text-center"
          variants={staggerContainerVariants}
          initial="hidden"
          animate={ctaInView ? "visible" : "hidden"}
        >
          <motion.h2 variants={fadeUpVariants} className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Have a{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">Project</span>{" "}
            in Mind?
          </motion.h2>
          <motion.p variants={fadeUpVariants} className="mt-4 text-gray-400 max-w-xl mx-auto leading-relaxed">
            Let&apos;s work together to create something amazing.
          </motion.p>
          <motion.div variants={fadeUpVariants} className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link href="/contact" className="inline-flex items-center justify-center rounded-xl px-8 py-3.5 text-sm font-semibold text-black bg-[#F97316] shadow-[0_0_20px_rgba(249,115,22,0.45)] hover:brightness-110 hover:shadow-[0_0_36px_rgba(249,115,22,0.65)] transition-all duration-200">
                Start a Project
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link href="/about" className="inline-flex items-center justify-center rounded-xl px-8 py-3.5 text-sm font-semibold text-white bg-transparent border border-orange-500/50 hover:border-orange-400 hover:shadow-[0_0_20px_rgba(249,115,22,0.25)] transition-all duration-200">
                About Us
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

    </main>
  );
}
