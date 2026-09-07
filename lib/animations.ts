/**
 * Shared animation utilities for TroyTech Solutions
 * Centralises GSAP, Three.js helpers, and Framer Motion variants.
 */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Variants } from "framer-motion";

/* ── GSAP plugin registration ─────────────────────────────────────────── */
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

/* ── Typed cubic-bezier tuple (required by Framer Motion's Easing type) ── */
const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as [number, number, number, number];

/* ══════════════════════════════════════════════════════════════════════
   FRAMER MOTION VARIANTS
   ══════════════════════════════════════════════════════════════════════ */

/** Fade up — basic entrance from below */
export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT_EXPO },
  },
};

/** Fade in from left */
export const fadeLeftVariants: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: EASE_OUT_EXPO },
  },
};

/** Fade in from right */
export const fadeRightVariants: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: EASE_OUT_EXPO },
  },
};

/** Scale + fade — for cards and modals */
export const scaleVariants: Variants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: EASE_OUT_EXPO },
  },
};

/** Spring pop — for badges, chips, small elements */
export const popVariants: Variants = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 500, damping: 24 },
  },
};

/** Container that staggers children */
export const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

/** Slower stagger for large grids */
export const staggerSlowContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

/** Chat window open/close */
export const chatWindowVariants: Variants = {
  hidden: { opacity: 0, scale: 0.88, y: 16, originX: 1, originY: 1 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 380, damping: 28 },
  },
  exit: {
    opacity: 0,
    scale: 0.88,
    y: 16,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

/** Mobile menu slide-in from right */
export const mobileMenuVariants: Variants = {
  hidden: { x: "100%", opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
  exit: {
    x: "100%",
    opacity: 0,
    transition: { duration: 0.25, ease: "easeIn" },
  },
};

/** Nav item stagger */
export const navItemVariants: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 400, damping: 28 },
  },
};

/** Step transition for booking wizard */
export const stepVariants: Variants = {
  hidden: (dir: number) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: EASE_OUT_EXPO },
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? -60 : 60,
    transition: { duration: 0.25, ease: "easeIn" },
  }),
};

/* ══════════════════════════════════════════════════════════════════════
   GSAP HELPERS
   ══════════════════════════════════════════════════════════════════════ */

/**
 * Batch-reveal elements when they enter the viewport.
 * @param selector CSS selector
 * @param fromVars GSAP from-vars (default: fade up)
 */
export function gsapReveal(
  selector: string | Element[],
  fromVars: gsap.TweenVars = {},
) {
  if (typeof window === "undefined") return;
  const defaults: gsap.TweenVars = {
    opacity: 0,
    y: 40,
    duration: 0.8,
    ease: "power3.out",
    stagger: 0.1,
    scrollTrigger: {
      trigger:
        typeof selector === "string"
          ? (selector as string)
          : (selector[0] as Element),
      start: "top 82%",
      toggleActions: "play none none none",
    },
    ...fromVars,
  };
  return gsap.from(selector, defaults);
}

/**
 * Create a GSAP ScrollTrigger timeline for a container.
 * @param trigger Element or selector that acts as the scroll trigger
 * @param callback Function that receives the timeline and adds tweens
 */
export function gsapScrollTimeline(
  trigger: Element | string,
  callback: (tl: gsap.core.Timeline) => void,
) {
  if (typeof window === "undefined") return;
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger,
      start: "top 78%",
      toggleActions: "play none none none",
    },
  });
  callback(tl);
  return tl;
}

/* ══════════════════════════════════════════════════════════════════════
   COUNTER ANIMATION
   ══════════════════════════════════════════════════════════════════════ */

/**
 * Animate a numeric counter element from 0 to target using GSAP.
 * @param el  Target DOM element
 * @param end Final numeric value (without suffix like "+")
 */
export function animateCounter(el: HTMLElement, end: number, suffix = "") {
  if (typeof window === "undefined") return;
  const obj = { val: 0 };
  gsap.to(obj, {
    val: end,
    duration: 2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: el,
      start: "top 85%",
      toggleActions: "play none none none",
    },
    onUpdate() {
      el.textContent = Math.round(obj.val) + suffix;
    },
  });
}
