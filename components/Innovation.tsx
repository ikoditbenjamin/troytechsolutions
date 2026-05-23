"use client";

import { useEffect, useRef } from "react";
import {
  ArrowRightIcon,
  ShieldCheckIcon,
  BoltIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";

/* ─── Animated particle canvas ─────────────────────────────────────────── */
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
    }

    const COUNT = 60;
    const particles: Particle[] = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.5 + 0.15,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connecting lines
      for (let i = 0; i < COUNT; i++) {
        for (let j = i + 1; j < COUNT; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(34,211,238,${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw dots
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34,211,238,${p.alpha})`;
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 w-full h-full"
    />
  );
}

/* ─── Hero component ────────────────────────────────────────────────────── */
export default function Innovation() {
  return (
    <div className="relative isolate overflow-hidden min-h-screen">

      {/* Dark futuristic gradient background */}
      <div className="absolute inset-0 bg-[#020617] -z-10" />

      {/* Radial glow blobs */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-cyan-500/5 blur-[120px] -z-10" />
      <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] rounded-full bg-emerald-500/5 blur-[100px] -z-10" />
      <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full bg-cyan-400/4 blur-[80px] -z-10" />

      {/* Animated particles */}
      <div className="absolute inset-0 -z-10">
        <ParticleCanvas />
      </div>

      {/* Grid texture */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(34,211,238,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.025) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 min-h-screen">

          {/* ── Left column ─────────────────────────────────────────────── */}
          <div className="flex flex-col justify-center py-24 lg:py-32">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-mono font-semibold text-cyan-300 bg-cyan-950/50 border border-cyan-500/25 rounded-full mb-8 self-start tracking-widest uppercase animate-fade-in-up hover:border-cyan-500/50 hover:shadow-[0_0_16px_rgba(6,182,212,0.2)] transition-all duration-300">
              <BoltIcon className="w-3.5 h-3.5 text-cyan-400" />
              Empowering Innovation · Uganda 2.0
            </div>

            {/* Heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] animate-fade-in-up delay-100">
              <span className="text-white">IT Services &amp;</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-300 to-emerald-400 drop-shadow-[0_0_30px_rgba(34,211,238,0.4)]">
                Loan Solutions
              </span>
              <br />
              <span className="text-gray-300 text-4xl sm:text-5xl lg:text-6xl font-bold">
                in Uganda
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="mt-6 text-lg text-cyan-300/80 font-mono max-w-lg leading-relaxed tracking-wide animate-fade-in-up delay-200">
              Professional software development, graphics design, computer
              training &amp; reliable loan services — built for{" "}
              <span className="text-cyan-400 font-semibold">Kampala</span> and
              the entire country.
            </p>

            <p className="mt-4 text-base text-gray-500 max-w-lg leading-relaxed animate-fade-in-up delay-300">
              Turn ideas into real solutions through expert IT services and
              hands-on training. We also provide reliable financial support,
              empowering individuals and businesses across Uganda to grow with
              confidence.
            </p>

            {/* Feature bullets */}
            <div className="mt-10 space-y-5">
              {[
                {
                  icon: ShieldCheckIcon,
                  color: "text-cyan-400",
                  bg: "bg-cyan-950/60 border-cyan-800/40",
                  title: "Secure & Reliable Systems",
                  desc: "We safeguard your data with strong IT security, system maintenance, and trusted technical support.",
                  delay: "delay-300",
                },
                {
                  icon: BoltIcon,
                  color: "text-emerald-400",
                  bg: "bg-emerald-950/60 border-emerald-800/40",
                  title: "Fast & Scalable Solutions",
                  desc: "From apps to infrastructure, we deliver efficient IT solutions that grow with your needs.",
                  delay: "delay-400",
                },
                {
                  icon: ChartBarIcon,
                  color: "text-cyan-400",
                  bg: "bg-cyan-950/60 border-cyan-800/40",
                  title: "Growth-Driven Support",
                  desc: "We combine IT expertise, training, and financial services to help your business succeed.",
                  delay: "delay-500",
                },
              ].map(({ icon: Icon, color, bg, title, desc, delay }) => (
                <div key={title} className={`flex items-start gap-4 animate-fade-in-up ${delay} group`}>
                  <div
                    className={`flex-shrink-0 p-2 rounded-lg border ${bg} group-hover:shadow-[0_0_12px_rgba(6,182,212,0.2)] transition-all duration-300`}
                  >
                    <Icon className={`h-5 w-5 ${color}`} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white font-mono tracking-wide group-hover:text-cyan-400 transition-colors duration-300">
                      {title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              {/* Primary button */}
              <a
                href="mailto:ikoditbenjamin9@gmail.com"
                className="group inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-mono font-semibold text-gray-950 bg-[#06B6DA] shadow-[0_0_20px_rgba(6,182,218,0.45)] hover:brightness-110 hover:scale-[1.03] hover:shadow-[0_0_36px_rgba(6,182,218,0.65)] active:scale-[0.98] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#06B6DA] focus:ring-offset-2 focus:ring-offset-gray-950"
              >
                Get Started Free
                <ArrowRightIcon className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>

              {/* Secondary button */}
              <a
                href="https://wa.me/256782391512?text=Hello%20TroyTech%2C%20I%20am%20interested%20in%20learning%20more%20about%20your%20IT%20courses."
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-mono font-semibold text-white bg-transparent border border-[#06B6DA]/60 hover:border-[#06B6DA] hover:shadow-[0_0_20px_rgba(6,182,218,0.3)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
              >
                Talk to TroyTech
                <ArrowRightIcon className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
            </div>

            {/* Social proof */}
            <p className="mt-8 text-xs text-gray-600 font-mono tracking-widest uppercase">
              2,500+ companies already using TroyTech
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-6 w-20 bg-cyan-950/40 border border-cyan-900/30 rounded animate-pulse"
                  style={{ animationDelay: `${i * 150}ms` }}
                />
              ))}
            </div>
          </div>

          {/* ── Right column ─────────────────────────────────────────────── */}
          <div className="relative flex items-center justify-center py-16 lg:py-0">

            {/* Background gradient panel */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-950/20 via-transparent to-emerald-950/20 rounded-2xl" />

            <div className="relative z-10 w-full max-w-lg xl:max-w-xl animate-float-slow">

              {/* Glow halo behind image */}
              <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 blur-2xl animate-glow-pulse" />
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 opacity-20 blur-sm" />

              {/* Hero image */}
              <img
                src="/programmer.jpg"
                alt="TroyTech programmer at work"
                className="relative w-full rounded-xl shadow-2xl object-cover object-center border border-cyan-900/40 transition-all duration-500 hover:shadow-[0_0_60px_rgba(6,182,212,0.2)]"
                style={{ maxHeight: "520px" }}
              />

              {/* Scan-line overlay for cyberpunk feel */}
              <div
                className="absolute inset-0 rounded-xl pointer-events-none"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(34,211,238,0.015) 2px, rgba(34,211,238,0.015) 4px)",
                }}
              />

              {/* Floating stats card */}
              <div className="absolute -bottom-5 -right-4 sm:right-4 bg-[#0F172A]/95 backdrop-blur-md border border-cyan-800/40 rounded-xl shadow-[0_0_30px_rgba(34,211,238,0.12)] p-4 flex items-center gap-4 animate-float hover:shadow-[0_0_40px_rgba(6,182,212,0.25)] hover:-translate-y-1 transition-all duration-300"
                style={{ animationDelay: "0.5s" }}>
                <div className="h-11 w-11 bg-gradient-to-br from-cyan-500 to-emerald-500 rounded-full flex items-center justify-center animate-glow-pulse">
                  <ChartBarIcon className="h-5 w-5 text-gray-950" />
                </div>
                <div>
                  <p className="text-xs font-mono text-gray-500 tracking-widest uppercase">
                    IT Growth
                  </p>
                  <p className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 font-mono">
                    +48.2%
                  </p>
                </div>
              </div>

              {/* Floating badge — top left */}
              <div className="absolute -top-4 -left-4 sm:left-4 bg-[#0F172A]/95 backdrop-blur-md border border-emerald-800/40 rounded-xl shadow-[0_0_20px_rgba(0,255,128,0.08)] px-4 py-2.5 flex items-center gap-2 animate-float-xs hover:shadow-[0_0_28px_rgba(52,211,153,0.2)] hover:-translate-y-1 transition-all duration-300"
                style={{ animationDelay: "1s" }}>
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
                </span>
                <p className="text-xs font-mono text-emerald-300 font-semibold tracking-wide">
                  Live Support · 24/7
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
