"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";

const WA_NUMBER  = "256747447447";
const WA_MESSAGE = encodeURIComponent("Hello TroyTech Solutions! I'd like to learn more about your IT services.");
const WA_LINK    = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`;

/* ── Tiny Three.js orb behind the button ─────────────────────────────── */
function OrbCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const W = 80, H = 80;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 100);
    camera.position.z = 2.8;

    /* Icosphere */
    const geo = new THREE.IcosahedronGeometry(1, 3);
    const mat = new THREE.MeshStandardMaterial({
      color: 0x25d366,
      emissive: 0x25d366,
      emissiveIntensity: 0.35,
      roughness: 0.3,
      metalness: 0.6,
      transparent: true,
      opacity: 0.55,
      wireframe: true,
    });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    /* Point light */
    const light = new THREE.PointLight(0x25d366, 3, 8);
    light.position.set(1.5, 1.5, 2);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));

    let frame: number;
    const clock = new THREE.Clock();
    const animate = () => {
      frame = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      mesh.rotation.y = t * 0.6;
      mesh.rotation.x = t * 0.3;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frame);
      renderer.dispose();
      geo.dispose();
      mat.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute -inset-3 pointer-events-none opacity-40"
      aria-hidden
    />
  );
}

/* ── WhatsApp button ─────────────────────────────────────────────────── */
export default function WhatsAppButton() {
  const [visible, setVisible]   = useState(false);
  const [tooltip, setTooltip]   = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="wa-wrapper"
          className="fixed bottom-6 left-5 z-[9998] flex flex-col items-start gap-2"
          initial={{ opacity: 0, y: 24, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 340, damping: 22 }}
        >
          {/* Tooltip bubble */}
          <AnimatePresence>
            {tooltip && (
              <motion.div
                key="tooltip"
                initial={{ opacity: 0, y: 8, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 4, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="ml-1 mb-1 bg-[#1a1a1a] border border-white/10 text-white text-xs font-medium px-3 py-2 rounded-xl shadow-lg whitespace-nowrap relative"
              >
                Chat with us on WhatsApp
                <div className="absolute -bottom-1.5 left-4 w-3 h-3 bg-[#1a1a1a] border-b border-r border-white/10 rotate-45" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Button */}
          <motion.a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            onHoverStart={() => setTooltip(true)}
            onHoverEnd={() => setTooltip(false)}
            onFocus={() => setTooltip(true)}
            onBlur={() => setTooltip(false)}
            whileHover={{ scale: 1.13 }}
            whileTap={{ scale: 0.93 }}
            className="relative h-14 w-14 rounded-full flex items-center justify-center bg-[#25D366] shadow-[0_0_0_4px_rgba(37,211,102,0.20),0_8px_28px_rgba(37,211,102,0.45)] hover:shadow-[0_0_0_6px_rgba(37,211,102,0.28),0_12px_36px_rgba(37,211,102,0.60)] transition-shadow duration-300"
          >
            {/* Three.js orb background */}
            <OrbCanvas />

            {/* WhatsApp icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              className="relative z-10 h-7 w-7 fill-white"
              aria-hidden="true"
            >
              <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
            </svg>

            {/* Framer Motion pulse ring */}
            <motion.span
              className="absolute inset-0 rounded-full bg-[#25D366]/30"
              animate={{ scale: [1, 1.55, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
