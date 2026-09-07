"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  ArrowRightIcon,
  ShieldCheckIcon,
  BoltIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  fadeUpVariants,
  staggerContainerVariants,
} from "@/lib/animations";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ─── Three.js WebGL Particle Field ───────────────────────────────────── */
function ThreeParticleField() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    /* ── Renderer ── */
    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(el.clientWidth, el.clientHeight);
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    /* ── Scene / Camera ── */
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      el.clientWidth / el.clientHeight,
      0.1,
      1000,
    );
    camera.position.z = 5;

    /* ── Particles ── */
    const COUNT = 320;
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const sizes = new Float32Array(COUNT);

    const orange = new THREE.Color(0xf97316);
    const amber = new THREE.Color(0xfbbf24);
    const white = new THREE.Color(0xffffff);

    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;

      const t = Math.random();
      const c = t < 0.6 ? orange.clone().lerp(amber, Math.random()) : white;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;

      sizes[i] = Math.random() * 3 + 1;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    /* Circular disc texture for each particle */
    const canvas2d = document.createElement("canvas");
    canvas2d.width = 32;
    canvas2d.height = 32;
    const ctx = canvas2d.getContext("2d")!;
    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, "rgba(255,255,255,1)");
    grad.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 32, 32);
    const sprite = new THREE.CanvasTexture(canvas2d);

    const mat = new THREE.PointsMaterial({
      vertexColors: true,
      size: 0.12,
      sizeAttenuation: true,
      map: sprite,
      transparent: true,
      opacity: 0.75,
      depthWrite: false,
    });

    const points = new THREE.Points(geo, mat);
    scene.add(points);

    /* ── Connection lines (subset for performance) ── */
    const lineGeo = new THREE.BufferGeometry();
    const linePositions: number[] = [];
    const threshold = 2.2;
    for (let i = 0; i < COUNT; i++) {
      for (let j = i + 1; j < COUNT; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < threshold) {
          linePositions.push(
            positions[i * 3],
            positions[i * 3 + 1],
            positions[i * 3 + 2],
            positions[j * 3],
            positions[j * 3 + 1],
            positions[j * 3 + 2],
          );
        }
      }
    }
    lineGeo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(linePositions, 3),
    );
    const lineMat = new THREE.LineBasicMaterial({
      color: 0xf97316,
      transparent: true,
      opacity: 0.06,
    });
    scene.add(new THREE.LineSegments(lineGeo, lineMat));

    /* ── Mouse parallax ── */
    let mouseX = 0;
    let mouseY = 0;
    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    /* ── Resize ── */
    const onResize = () => {
      if (!el) return;
      camera.aspect = el.clientWidth / el.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(el.clientWidth, el.clientHeight);
    };
    window.addEventListener("resize", onResize, { passive: true });

    /* ── Animation loop ── */
    let frame: number;
    const clock = new THREE.Clock();
    const animate = () => {
      frame = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      /* Slow drift rotation */
      points.rotation.y = elapsed * 0.03 + mouseX * 0.08;
      points.rotation.x = elapsed * 0.015 + mouseY * 0.05;

      /* Opacity pulse */
      mat.opacity = 0.55 + Math.sin(elapsed * 0.8) * 0.2;

      renderer.render(scene, camera);
    };
    animate();

    /* ── GSAP entrance: fade in the whole canvas ── */
    gsap.from(renderer.domElement, {
      opacity: 0,
      duration: 2,
      ease: "power2.out",
    });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      geo.dispose();
      mat.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      sprite.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="pointer-events-none absolute inset-0 w-full h-full"
      aria-hidden
    />
  );
}

/* ─── GSAP entrance hook for left-column items ───────────────────────── */
function useGsapEntrance(containerRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const tl = gsap.timeline({ delay: 0.1 });

    tl.from(el.querySelectorAll(".gsap-badge"), {
      opacity: 0,
      y: -18,
      scale: 0.85,
      duration: 0.55,
      ease: "back.out(2)",
    })
      .from(
        el.querySelectorAll(".gsap-heading > *"),
        {
          opacity: 0,
          y: 36,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
        },
        "-=0.2",
      )
      .from(
        el.querySelectorAll(".gsap-sub"),
        { opacity: 0, y: 20, duration: 0.6, stagger: 0.1, ease: "power3.out" },
        "-=0.35",
      )
      .from(
        el.querySelectorAll(".gsap-bullet"),
        {
          opacity: 0,
          x: -24,
          duration: 0.5,
          stagger: 0.1,
          ease: "power3.out",
        },
        "-=0.3",
      )
      .from(
        el.querySelectorAll(".gsap-cta"),
        {
          opacity: 0,
          y: 16,
          scale: 0.94,
          duration: 0.55,
          stagger: 0.08,
          ease: "back.out(1.5)",
        },
        "-=0.2",
      )
      .from(
        el.querySelectorAll(".gsap-proof"),
        { opacity: 0, duration: 0.5, ease: "power2.out" },
        "-=0.1",
      );

    return () => {
      tl.kill();
    };
  }, [containerRef]);
}

/* ─── Hero component ────────────────────────────────────────────────── */
export default function Innovation() {
  const leftColRef = useRef<HTMLDivElement>(null);
  useGsapEntrance(leftColRef as React.RefObject<HTMLElement | null>);

  return (
    <div className="relative isolate overflow-hidden min-h-screen">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0a0a0a] -z-10" />

      {/* Radial glow blobs */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-orange-500/5 blur-[120px] -z-10" />
      <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] rounded-full bg-amber-500/4 blur-[100px] -z-10" />
      <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full bg-orange-400/3 blur-[80px] -z-10" />

      {/* Three.js WebGL particle field */}
      <div className="absolute inset-0 -z-10">
        <ThreeParticleField />
      </div>

      {/* Grid texture */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(249,115,22,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.025) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 min-h-screen">

          {/* ── Left column ─────────────────────────────────────────── */}
          <div
            ref={leftColRef}
            className="flex flex-col justify-center py-24 lg:py-32"
          >
            {/* Badge */}
            <div className="gsap-badge inline-flex items-center gap-2 px-3 py-1.5 text-xs font-mono font-semibold text-orange-300 bg-orange-950/50 border border-orange-500/25 rounded-full mb-8 self-start tracking-widest uppercase hover:border-orange-500/50 hover:shadow-[0_0_16px_rgba(249,115,22,0.2)] transition-all duration-300">
              <BoltIcon className="w-3.5 h-3.5 text-orange-400" />
              Empowering Innovation · Uganda 2.0
            </div>

            {/* Heading */}
            <h1 className="gsap-heading text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05]">
              <span className="text-white">IT Services &amp;</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-white drop-shadow-[0_0_30px_rgba(249,115,22,0.4)]">
                Digital Solutions
              </span>
              <br />
              <span className="text-gray-300 text-4xl sm:text-5xl lg:text-6xl font-bold">
                in Uganda
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="gsap-sub mt-6 text-lg text-orange-300/80 font-mono max-w-lg leading-relaxed tracking-wide">
              Professional software development, graphics design &amp; computer
              training — built for{" "}
              <span className="text-orange-400 font-semibold">Kampala</span> and
              the entire country.
            </p>

            <p className="gsap-sub mt-4 text-base text-gray-500 max-w-lg leading-relaxed">
              Turn ideas into real solutions through expert IT services and
              hands-on training. We empower individuals and businesses across
              Uganda to grow with confidence through technology.
            </p>

            {/* Feature bullets */}
            <div className="mt-10 space-y-5">
              {[
                {
                  icon: ShieldCheckIcon,
                  color: "text-orange-400",
                  bg: "bg-orange-950/60 border-orange-800/40",
                  title: "Secure & Reliable Systems",
                  desc: "We safeguard your data with strong IT security, system maintenance, and trusted technical support.",
                },
                {
                  icon: BoltIcon,
                  color: "text-white",
                  bg: "bg-white/5 border-white/10",
                  title: "Fast & Scalable Solutions",
                  desc: "From apps to infrastructure, we deliver efficient IT solutions that grow with your needs.",
                },
                {
                  icon: ChartBarIcon,
                  color: "text-orange-400",
                  bg: "bg-orange-950/60 border-orange-800/40",
                  title: "Growth-Driven Support",
                  desc: "We combine IT expertise and training to help your business succeed in the digital age.",
                },
              ].map(({ icon: Icon, color, bg, title, desc }) => (
                <div
                  key={title}
                  className="gsap-bullet flex items-start gap-4 group"
                >
                  <div
                    className={`flex-shrink-0 p-2 rounded-lg border ${bg} group-hover:shadow-[0_0_12px_rgba(249,115,22,0.2)] transition-all duration-300`}
                  >
                    <Icon className={`h-5 w-5 ${color}`} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white font-mono tracking-wide group-hover:text-orange-400 transition-colors duration-300">
                      {title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <a
                href="mailto:ikoditbenjamin9@gmail.com"
                className="gsap-cta group inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-mono font-semibold text-black bg-[#F97316] shadow-[0_0_20px_rgba(249,115,22,0.45)] hover:brightness-110 hover:scale-[1.03] hover:shadow-[0_0_36px_rgba(249,115,22,0.65)] active:scale-[0.98] transition-all duration-200"
              >
                Get Started Free
                <ArrowRightIcon className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
              <a
                href="https://wa.me/256782391512?text=Hello%20TroyTech%2C%20I%20am%20interested%20in%20learning%20more%20about%20your%20IT%20courses."
                target="_blank"
                rel="noopener noreferrer"
                className="gsap-cta group inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-mono font-semibold text-white bg-transparent border border-orange-500/50 hover:border-orange-400 hover:shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
              >
                Talk to TroyTech
                <ArrowRightIcon className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
            </div>

            {/* Social proof */}
            <div className="gsap-proof">
              <p className="mt-8 text-xs text-gray-600 font-mono tracking-widest uppercase">
                2,500+ companies already using TroyTech
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="h-6 w-20 bg-orange-950/40 border border-orange-900/30 rounded animate-pulse"
                    style={{ animationDelay: `${i * 150}ms` }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ── Right column ─────────────────────────────────────────── */}
          <motion.div
            className="relative flex items-center justify-center py-16 lg:py-0"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Background gradient panel */}
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-950/20 via-transparent to-amber-950/10 rounded-2xl" />

            <div className="relative z-10 w-full max-w-lg xl:max-w-xl animate-float-slow">
              {/* Glow halo */}
              <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-orange-500/20 to-amber-400/10 blur-2xl animate-glow-pulse" />
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-orange-500 to-amber-400 opacity-20 blur-sm" />

              {/* Hero image */}
              <img
                src="/programmer.jpg"
                alt="TroyTech programmer at work"
                className="relative w-full rounded-xl shadow-2xl object-cover object-center border border-orange-900/40 transition-all duration-500 hover:shadow-[0_0_60px_rgba(249,115,22,0.2)]"
                style={{ maxHeight: "520px" }}
              />

              {/* Scan-line overlay */}
              <div
                className="absolute inset-0 rounded-xl pointer-events-none"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(249,115,22,0.012) 2px, rgba(249,115,22,0.012) 4px)",
                }}
              />

              {/* Floating stats card */}
              <motion.div
                className="absolute -bottom-5 -right-4 sm:right-4 bg-[#1a1a1a]/95 backdrop-blur-md border border-orange-800/40 rounded-xl shadow-[0_0_30px_rgba(249,115,22,0.12)] p-4 flex items-center gap-4 hover:shadow-[0_0_40px_rgba(249,115,22,0.25)] hover:-translate-y-1 transition-all duration-300"
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.6,
                  delay: 0.85,
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
              >
                <div className="h-11 w-11 bg-gradient-to-br from-orange-500 to-amber-400 rounded-full flex items-center justify-center animate-glow-pulse">
                  <ChartBarIcon className="h-5 w-5 text-black" />
                </div>
                <div>
                  <p className="text-xs font-mono text-gray-500 tracking-widest uppercase">
                    IT Growth
                  </p>
                  <p className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300 font-mono">
                    +48.2%
                  </p>
                </div>
              </motion.div>

              {/* Floating badge — top left */}
              <motion.div
                className="absolute -top-4 -left-4 sm:left-4 bg-[#1a1a1a]/95 backdrop-blur-md border border-orange-800/40 rounded-xl shadow-[0_0_20px_rgba(249,115,22,0.10)] px-4 py-2.5 flex items-center gap-2 hover:shadow-[0_0_28px_rgba(249,115,22,0.25)] hover:-translate-y-1 transition-all duration-300"
                initial={{ opacity: 0, y: -16, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.6,
                  delay: 1.05,
                  type: "spring",
                  stiffness: 300,
                  damping: 22,
                }}
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-400" />
                </span>
                <p className="text-xs font-mono text-orange-300 font-semibold tracking-wide">
                  Live Support · 24/7
                </p>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
