"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import Image from "next/image";

interface HeroParallaxSliderProps {
  images: string[];
  /** Max px shift for the image layer. Default 50 */
  parallaxStrength?: number;
  /** Auto-advance interval in ms. Default 5000. Pass 0 to disable. */
  autoPlayMs?: number;
  /** Extra class applied to the outer wrapper */
  className?: string;
}

export default function HeroParallaxSlider({
  images,
  parallaxStrength = 50,
  autoPlayMs = 5000,
  className = "",
}: HeroParallaxSliderProps) {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [direction, setDirection] = useState<1 | -1>(1);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const count = images.length;

  // -1 → +1 normalised mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Image layer moves the full strength
  const imgX = useTransform(mouseX, [-1, 1], [-parallaxStrength, parallaxStrength]);
  const imgY = useTransform(mouseY, [-1, 1], [-parallaxStrength * 0.4, parallaxStrength * 0.4]);

  // Overlay moves at ~40% of the image shift → depth illusion
  const ovlX = useTransform(mouseX, [-1, 1], [-parallaxStrength * 0.4, parallaxStrength * 0.4]);
  const ovlY = useTransform(mouseY, [-1, 1], [-parallaxStrength * 0.15, parallaxStrength * 0.15]);

  // Orange vignette moves opposite at ~20% → counter-depth
  const vinX = useTransform(mouseX, [-1, 1], [parallaxStrength * 0.2, -parallaxStrength * 0.2]);
  const vinY = useTransform(mouseY, [-1, 1], [parallaxStrength * 0.1, -parallaxStrength * 0.1]);

  const go = useCallback(
    (nextIndex: number, dir: 1 | -1) => {
      setPrev(current);
      setDirection(dir);
      setCurrent(nextIndex);
    },
    [current],
  );

  const next  = useCallback(() => go((current + 1) % count, 1),                   [current, count, go]);
  const prev_ = useCallback(() => go((current - 1 + count) % count, -1),          [current, count, go]);

  useEffect(() => {
    if (!autoPlayMs) return;
    timerRef.current = setTimeout(next, autoPlayMs);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [current, autoPlayMs, next]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left)  / rect.width  * 2 - 1;
    const ny = (e.clientY - rect.top)   / rect.height * 2 - 1;
    animate(mouseX, nx, { duration: 0.7, ease: "easeOut" });
    animate(mouseY, ny, { duration: 0.7, ease: "easeOut" });
  };

  const handleMouseLeave = () => {
    animate(mouseX, 0, { duration: 1, ease: "easeOut" });
    animate(mouseY, 0, { duration: 1, ease: "easeOut" });
  };

  // Slide variants
  const variants = {
    enter:  (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0, scale: 1.08 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit:   (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0, scale: 0.95 }),
  };

  return (
    <div
      className={`relative w-full h-full overflow-hidden select-none ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* ── Slides ───────────────────────────────────────────────────── */}
      {images.map((src, i) => {
        const isActive = i === current;
        const isPrev   = i === prev;
        if (!isActive && !isPrev) return null;

        return (
          <motion.div
            key={src}
            className="absolute inset-0"
            custom={direction}
            variants={variants}
            initial={isActive ? "enter" : "center"}
            animate={isActive ? "center" : "exit"}
            transition={{ duration: 0.85, ease: [0.32, 0, 0.67, 0] }}
            onAnimationComplete={() => { if (!isActive) setPrev(null); }}
          >
            {/* ── Layer 1: image (moves the most) ────────────────────── */}
            <motion.div
              className="absolute inset-[-60px]"
              style={{ x: isActive ? imgX : 0, y: isActive ? imgY : 0 }}
            >
              <Image
                src={src}
                alt=""
                fill
                priority={i === 0}
                className="object-cover object-center"
                sizes="100vw"
              />
            </motion.div>

            {/* ── Layer 2: dark gradient overlay (medium parallax) ────── */}
            <motion.div
              className="absolute inset-[-20px]"
              style={{ x: isActive ? ovlX : 0, y: isActive ? ovlY : 0 }}
            >
              {/* Base darkness */}
              <div className="absolute inset-0 bg-black/55" />
              {/* Bottom fade to solid black */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/80" />
              {/* Top fade */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />
              {/* Left shadow */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />
            </motion.div>

            {/* ── Layer 3: orange brand vignette (counter-parallax) ───── */}
            <motion.div
              className="absolute inset-[-20px]"
              style={{ x: isActive ? vinX : 0, y: isActive ? vinY : 0 }}
            >
              {/* Orange radial glow bottom-left */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse 70% 50% at 0% 100%, rgba(249,115,22,0.28) 0%, transparent 65%)",
                }}
              />
              {/* Subtle orange top-right accent */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse 50% 40% at 100% 0%, rgba(249,115,22,0.12) 0%, transparent 60%)",
                }}
              />
              {/* Horizontal orange scan-line at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-orange-500/60 via-orange-400/30 to-transparent" />
            </motion.div>
          </motion.div>
        );
      })}

      {/* ── Prev / Next arrows ───────────────────────────────────────── */}
      <button
        onClick={prev_}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 h-11 w-11 rounded-full bg-black/40 border border-orange-500/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-orange-500/30 hover:border-orange-400 hover:scale-110 active:scale-95 transition-all duration-200 shadow-[0_0_16px_rgba(249,115,22,0.2)]"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 h-11 w-11 rounded-full bg-black/40 border border-orange-500/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-orange-500/30 hover:border-orange-400 hover:scale-110 active:scale-95 transition-all duration-200 shadow-[0_0_16px_rgba(249,115,22,0.2)]"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* ── Dot indicators ───────────────────────────────────────────── */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i, i > current ? 1 : -1)}
            aria-label={`Go to slide ${i + 1}`}
          >
            <span
              className={`block rounded-full transition-all duration-300 ${
                i === current
                  ? "w-7 h-2 bg-[#F97316] shadow-[0_0_8px_rgba(249,115,22,0.7)]"
                  : "w-2 h-2 bg-white/40 hover:bg-white/70"
              }`}
            />
          </button>
        ))}
      </div>

      {/* ── Slide counter ────────────────────────────────────────────── */}
      <div className="absolute top-5 right-16 z-20 text-xs font-mono text-white/50 tracking-widest">
        <span className="text-orange-400 font-semibold">{String(current + 1).padStart(2, "0")}</span>
        <span className="mx-1">/</span>
        {String(count).padStart(2, "0")}
      </div>

      {/* ── Auto-play progress bar ───────────────────────────────────── */}
      {autoPlayMs > 0 && (
        <motion.div
          key={current}
          className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-orange-500 to-amber-400 z-20 origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: autoPlayMs / 1000, ease: "linear" }}
        />
      )}
    </div>
  );
}
