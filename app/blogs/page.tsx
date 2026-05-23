"use client";

import Image from "next/image";
import Link from "next/link";

const posts = [
  {
    id: 1,
    title: "How to Build a Modern Next.js Website",
    desc: "Learn how to create fast and scalable web applications using Next.js and Tailwind CSS.",
    image: "/blogs/modern-next.jpg",
    category: "Development",
    date: "March 10, 2026",
    slug: "#",
  },
  {
    id: 2,
    title: "Designing Beautiful UI with Tailwind CSS",
    desc: "Tailwind CSS makes it easy to design responsive and modern interfaces.",
    image: "/blogs/ui.jpg",
    category: "Design",
    date: "March 5, 2026",
    slug: "#",
  },
  {
    id: 3,
    title: "Understanding React Components",
    desc: "A beginner-friendly guide to reusable components in React.",
    image: "/blogs/react.jpg",
    category: "React",
    date: "March 1, 2026",
    slug: "#",
  },
  {
    id: 4,
    title: "Building a Portfolio Website",
    desc: "Step-by-step guide to building a professional developer portfolio.",
    image: "/blogs/portfolio.jpg",
    category: "Career",
    date: "Feb 20, 2026",
    slug: "#",
  },
  {
    id: 5,
    title: "Deploying Next.js Apps",
    desc: "Learn how to deploy your Next.js projects to production.",
    image: "/blogs/deploy.jpg",
    category: "Deployment",
    date: "Feb 15, 2026",
    slug: "#",
  },
  {
    id: 6,
    title: "Optimizing Website Performance",
    desc: "Improve speed and performance of your web applications.",
    image: "/blogs/seo.jpg",
    category: "Performance",
    date: "Feb 10, 2026",
    slug: "#",
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen">

      {/* ── HERO — #0F172A (raised) ──────────────────────────────────────── */}
      <section className="relative bg-[#0F172A] border-b border-cyan-500/10 py-24 overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(6,182,212,0.08) 0%, transparent 70%)" }} />
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <p className="text-xs font-mono font-semibold text-cyan-400 tracking-widest uppercase mb-4">
            Insights & Tutorials
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
              Blog
            </span>
          </h1>
          <p className="mt-5 text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto">
            Insights, tutorials, and resources about web development, design, and technology.
          </p>
        </div>
      </section>

      {/* ── FEATURED POST — #020617 (deep) ──────────────────────────────── */}
      <section className="relative bg-[#020617] py-16 overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 50% at 0% 50%, rgba(6,182,212,0.06) 0%, transparent 70%)" }} />
        <div className="relative max-w-7xl mx-auto px-6">
          <p className="text-xs font-mono font-semibold text-cyan-400 tracking-widest uppercase mb-6">
            Featured Article
          </p>
          <div className="grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-cyan-500/15 shadow-[0_8px_40px_rgba(6,182,212,0.08)] bg-[#0F172A]">
            <div className="relative h-72 md:h-full min-h-[260px]">
              <Image src="/blogs/future.jpg" alt="featured" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0F172A]/60" />
            </div>
            <div className="p-8 flex flex-col justify-center">
              <span className="text-xs font-mono font-semibold text-cyan-400 tracking-widest uppercase">
                Featured
              </span>
              <h2 className="text-3xl font-extrabold mt-2 text-white leading-snug">
                The Future of Web Development
              </h2>
              <p className="text-gray-400 mt-4 leading-relaxed">
                Explore the trends shaping the future of web development, including AI-powered apps,
                server components, and faster frameworks.
              </p>
              <Link
                href="#"
                className="inline-flex items-center gap-1 mt-6 self-start rounded-xl px-6 py-3 text-sm font-semibold text-gray-950 bg-[#06B6DA] shadow-[0_0_16px_rgba(6,182,212,0.4)] hover:brightness-110 hover:scale-[1.03] hover:shadow-[0_0_28px_rgba(6,182,212,0.6)] active:scale-[0.97] transition-all duration-200"
              >
                Read Article →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── BLOG GRID — #0F172A (raised) ────────────────────────────────── */}
      <section className="relative bg-[#0F172A] border-t border-cyan-500/10 py-20 overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(6,182,212,0.04) 0%, transparent 70%)" }} />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-mono font-semibold text-cyan-400 tracking-widest uppercase mb-3">
              All Articles
            </p>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Latest{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
                Posts
              </span>
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.id}
                className="group relative rounded-2xl overflow-hidden bg-[#020617] border border-cyan-500/10 shadow-[0_4px_24px_rgba(0,0,0,0.4)] backdrop-blur-sm hover:-translate-y-1.5 hover:border-cyan-500/40 hover:shadow-[0_8px_40px_rgba(6,182,212,0.12)] transition-all duration-300 ease-out"
              >
                <div className="relative h-52">
                  <Image src={post.image} alt={post.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/10 to-transparent" />
                </div>
                <div className="p-6">
                  <span className="text-xs font-mono font-semibold text-cyan-400 tracking-widest uppercase">
                    {post.category}
                  </span>
                  <h3 className="text-lg font-bold mt-2 text-white group-hover:text-cyan-400 transition-colors duration-300 leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 mt-3 text-sm leading-relaxed">{post.desc}</p>
                  <div className="flex justify-between items-center mt-6">
                    <span className="text-xs text-gray-500 font-mono">{post.date}</span>
                    <Link href={post.slug} className="text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors duration-200">
                      Read →
                    </Link>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-cyan-500 to-emerald-500 transition-all duration-500 ease-out" />
              </article>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
