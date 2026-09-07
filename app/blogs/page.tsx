"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect } from "react";
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
  "/blogs/hero/blog1.jpg",
  "/blogs/hero/blog2.jpg",
  "/blogs/hero/blog3.jpg",
];

const posts = [
  { id: 1, title: "How to Build a Modern Next.js Website",   desc: "Learn how to create fast and scalable web applications using Next.js and Tailwind CSS.",    image: "/blogs/modern-next.jpg", category: "Development", date: "March 10, 2026", slug: "#" },
  { id: 2, title: "Designing Beautiful UI with Tailwind CSS", desc: "Tailwind CSS makes it easy to design responsive and modern interfaces.",                        image: "/blogs/ui.jpg",          category: "Design",      date: "March 5, 2026",  slug: "#" },
  { id: 3, title: "Understanding React Components",           desc: "A beginner-friendly guide to reusable components in React.",                                     image: "/blogs/react.jpg",       category: "React",       date: "March 1, 2026",  slug: "#" },
  { id: 4, title: "Building a Portfolio Website",             desc: "Step-by-step guide to building a professional developer portfolio.",                             image: "/blogs/portfolio.jpg",   category: "Career",      date: "Feb 20, 2026",   slug: "#" },
  { id: 5, title: "Deploying Next.js Apps",                   desc: "Learn how to deploy your Next.js projects to production.",                                       image: "/blogs/deploy.jpg",      category: "Deployment",  date: "Feb 15, 2026",   slug: "#" },
  { id: 6, title: "Optimizing Website Performance",           desc: "Improve speed and performance of your web applications.",                                        image: "/blogs/seo.jpg",         category: "Performance", date: "Feb 10, 2026",   slug: "#" },
];

export default function BlogPage() {
  /* Hero GSAP entrance */
  const heroTextRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = heroTextRef.current;
    if (!el) return;
    const tl = gsap.timeline({ delay: 0.25 });
    tl.from(el.querySelectorAll(".hero-tag"), { opacity: 0, y: -14, duration: 0.5, ease: "back.out(2)" })
      .from(el.querySelectorAll(".hero-title"), { opacity: 0, y: 28, duration: 0.65, ease: "power3.out" }, "-=0.15")
      .from(el.querySelectorAll(".hero-sub"),   { opacity: 0, y: 16, duration: 0.55, ease: "power3.out" }, "-=0.25");
    return () => { tl.kill(); };
  }, []);

  /* Featured section */
  const featuredRef = useRef<HTMLElement>(null);
  const featuredInView = useInView(featuredRef, { once: true, margin: "-80px" });

  /* Grid section */
  const gridRef = useRef<HTMLElement>(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-60px" });

  /* GSAP shimmer on featured image reveal */
  const featuredImgRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = featuredImgRef.current;
    if (!el || !featuredInView) return;
    gsap.from(el, { clipPath: "inset(0 100% 0 0)", duration: 1.1, ease: "power3.out" });
  }, [featuredInView]);

  return (
    <main className="min-h-screen">

      {/* ── HERO ── */}
      <section className="relative border-b border-orange-500/10 overflow-hidden" style={{ minHeight: "420px" }}>
        <div className="absolute inset-0 z-0">
          <HeroParallaxSlider images={HERO_IMAGES} parallaxStrength={30} autoPlayMs={5500} />
        </div>
        <div ref={heroTextRef} className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-28 md:py-36">
          <p className="hero-tag text-xs font-mono font-semibold text-orange-400 tracking-widest uppercase mb-4 drop-shadow">
            Insights & Tutorials
          </p>
          <h1 className="hero-title text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight drop-shadow-lg">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">Blog</span>
          </h1>
          <p className="hero-sub mt-5 text-lg text-gray-200 leading-relaxed max-w-2xl mx-auto drop-shadow">
            Insights, tutorials, and resources about web development, design, and technology.
          </p>
        </div>
      </section>

      {/* ── FEATURED POST ── */}
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
            Featured Article
          </motion.p>

          <motion.div
            className="grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-orange-500/15 shadow-[0_8px_40px_rgba(249,115,22,0.08)] bg-[#1a1a1a]"
            variants={scaleVariants}
            initial="hidden"
            animate={featuredInView ? "visible" : "hidden"}
          >
            <div ref={featuredImgRef} className="relative h-72 md:h-full min-h-[260px]">
              <Image src="/blogs/future.jpg" alt="featured" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#1a1a1a]/60" />
            </div>

            <motion.div
              className="p-8 flex flex-col justify-center"
              variants={fadeRightVariants}
              initial="hidden"
              animate={featuredInView ? "visible" : "hidden"}
            >
              <span className="text-xs font-mono font-semibold text-orange-400 tracking-widest uppercase">Featured</span>
              <h2 className="text-3xl font-extrabold mt-2 text-white leading-snug">The Future of Web Development</h2>
              <p className="text-gray-400 mt-4 leading-relaxed">
                Explore the trends shaping the future of web development, including AI-powered apps,
                server components, and faster frameworks.
              </p>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="#"
                  className="inline-flex items-center gap-1 mt-6 self-start rounded-xl px-6 py-3 text-sm font-semibold text-black bg-[#F97316] shadow-[0_0_16px_rgba(249,115,22,0.4)] hover:brightness-110 hover:shadow-[0_0_28px_rgba(249,115,22,0.6)] transition-all duration-200"
                >
                  Read Article →
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── BLOG GRID ── */}
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
            <motion.p variants={fadeUpVariants} className="text-xs font-mono font-semibold text-orange-400 tracking-widest uppercase mb-3">
              All Articles
            </motion.p>
            <motion.h2 variants={fadeUpVariants} className="text-3xl font-extrabold text-white tracking-tight">
              Latest{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">Posts</span>
            </motion.h2>
          </motion.div>

          <motion.div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            variants={staggerSlowContainerVariants}
            initial="hidden"
            animate={gridInView ? "visible" : "hidden"}
          >
            {posts.map((post) => (
              <motion.article
                key={post.id}
                variants={scaleVariants}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="group relative rounded-2xl overflow-hidden bg-[#0a0a0a] border border-orange-500/10 shadow-[0_4px_24px_rgba(0,0,0,0.5)] backdrop-blur-sm hover:border-orange-500/40 hover:shadow-[0_8px_40px_rgba(249,115,22,0.12)] transition-colors duration-300 ease-out"
              >
                {/* Image with scale-on-hover */}
                <div className="relative h-52 overflow-hidden">
                  <motion.div
                    className="absolute inset-0"
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    <Image src={post.image} alt={post.title} fill className="object-cover" />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/10 to-transparent" />
                </div>

                <div className="p-6">
                  <motion.span
                    variants={popVariants}
                    className="text-xs font-mono font-semibold text-orange-400 tracking-widest uppercase"
                  >
                    {post.category}
                  </motion.span>
                  <h3 className="text-lg font-bold mt-2 text-white group-hover:text-orange-400 transition-colors duration-300 leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 mt-3 text-sm leading-relaxed">{post.desc}</p>
                  <div className="flex justify-between items-center mt-6">
                    <span className="text-xs text-gray-500 font-mono">{post.date}</span>
                    <Link href={post.slug} className="text-sm font-semibold text-orange-400 hover:text-orange-300 transition-colors duration-200">
                      Read →
                    </Link>
                  </div>
                </div>

                {/* Bottom bar */}
                <motion.div
                  className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-orange-500 to-amber-400"
                  initial={{ scaleX: 0, originX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.4 }}
                />
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

    </main>
  );
}
