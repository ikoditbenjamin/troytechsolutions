"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Mail, Phone, MapPin, Linkedin, Twitter, Instagram,
  Facebook, Youtube, Github,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Turnstile, TurnstileInstance } from "@marsidev/react-turnstile";
import HeroParallaxSlider from "@/components/HeroParallaxSlider";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  fadeUpVariants,
  fadeLeftVariants,
  fadeRightVariants,
  scaleVariants,
  staggerContainerVariants,
  popVariants,
} from "@/lib/animations";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const HERO_IMAGES = [
  "/contact/contact1.jpg",
  "/contact/contact2.jpg",
  "/contact/contact3.jpg",
];

const socialLinks = [
  { icon: Linkedin,  label: "LinkedIn",  href: "#", hover: "hover:bg-blue-600" },
  { icon: Twitter,   label: "Twitter",   href: "#", hover: "hover:bg-sky-500" },
  { icon: Instagram, label: "Instagram", href: "#", hover: "hover:bg-purple-600" },
  { icon: Github,    label: "GitHub",    href: "#", hover: "hover:bg-gray-600" },
  { icon: Facebook,  label: "Facebook",  href: "#", hover: "hover:bg-blue-700" },
  { icon: Youtube,   label: "YouTube",   href: "#", hover: "hover:bg-red-600" },
];

interface ContactFormState {
  name: string; email: string; message: string; website: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormState>({ name: "", email: "", message: "", website: "" });
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const turnstileRef = useRef<TurnstileInstance>(null);

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

  /* Main grid */
  const mainRef = useRef<HTMLElement>(null);
  const mainInView = useInView(mainRef, { once: true, margin: "-60px" });

  /* Map */
  const mapRef = useRef<HTMLElement>(null);
  const mapInView = useInView(mapRef, { once: true, margin: "-60px" });

  /* GSAP: stagger form fields on section enter */
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (!mainInView || !formRef.current) return;
    const fields = formRef.current.querySelectorAll(".gsap-field");
    const ctx = gsap.context(() => {
      gsap.from(fields, {
        opacity: 0, y: 22, duration: 0.55, stagger: 0.09,
        ease: "power3.out", delay: 0.35,
      });
    }, formRef.current);
    return () => ctx.revert();
  }, [mainInView]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!turnstileToken) { setError("Please complete the verification challenge before sending."); return; }
    setLoading(true); setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, turnstileToken }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        turnstileRef.current?.reset(); setTurnstileToken(""); return;
      }
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "", website: "" });
      turnstileRef.current?.reset(); setTurnstileToken("");
      setTimeout(() => setSubmitted(false), 5000);
    } catch {
      setError("Network error. Please check your connection and try again.");
      turnstileRef.current?.reset(); setTurnstileToken("");
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">

      {/* ── Hero ── */}
      <section className="relative border-b border-orange-500/10 overflow-hidden" style={{ minHeight: "420px" }}>
        <div className="absolute inset-0 z-0">
          <HeroParallaxSlider images={HERO_IMAGES} parallaxStrength={30} autoPlayMs={5000} />
        </div>
        <div ref={heroTextRef} className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-28 md:py-36">
          <p className="hero-tag text-xs font-mono font-semibold text-orange-400 tracking-widest uppercase mb-4 drop-shadow">Contact Us</p>
          <h1 className="hero-title text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow-lg">
            Get in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">Touch</span>
          </h1>
          <p className="hero-sub mt-5 text-lg text-gray-200 leading-relaxed max-w-xl mx-auto drop-shadow">
            We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* ── Main grid ── */}
      <section ref={mainRef} className="relative bg-[#0a0a0a] overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 60% at 100% 50%, rgba(249,115,22,0.05) 0%, transparent 70%)" }} />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">

            {/* Left: contact info */}
            <motion.div
              className="space-y-10"
              variants={fadeLeftVariants}
              initial="hidden"
              animate={mainInView ? "visible" : "hidden"}
            >
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">Contact Information</h2>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                  Reach us through any of the channels below — we&apos;re always happy to help.
                </p>
              </div>

              {/* Info rows */}
              <motion.div
                className="space-y-6"
                variants={staggerContainerVariants}
                initial="hidden"
                animate={mainInView ? "visible" : "hidden"}
              >
                {[
                  { icon: Mail,   label: "Email",    value: "techtroy28@gmail.com", href: "mailto:techtroy28@gmail.com" },
                  { icon: Phone,  label: "Phone",    value: "+256 (747) 447-447 · +256 (768) 711-017", href: "tel:+256747447447" },
                  { icon: MapPin, label: "Location", value: "Kireka Kamuli C, Alongside Kamuli Road, Kampala, Uganda", href: null },
                ].map(({ icon: Icon, label, value, href }) => (
                  <motion.div key={label} variants={fadeUpVariants} className="flex gap-4 items-start">
                    <motion.div
                      whileHover={{ scale: 1.12, rotate: 6 }}
                      className="flex-shrink-0 h-10 w-10 rounded-xl bg-orange-950/60 border border-orange-500/20 flex items-center justify-center text-orange-400"
                    >
                      <Icon size={18} />
                    </motion.div>
                    <div>
                      <p className="text-xs font-mono font-semibold text-orange-400 tracking-widest uppercase mb-1">{label}</p>
                      {href ? (
                        <a href={href} className="text-sm text-gray-300 hover:text-orange-400 transition-colors duration-200 leading-relaxed">{value}</a>
                      ) : (
                        <p className="text-sm text-gray-400 leading-relaxed">{value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Social links */}
              <div>
                <h3 className="text-sm font-bold text-white tracking-wide mb-4">Follow Us</h3>
                <motion.div
                  className="flex flex-wrap gap-3"
                  variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
                  initial="hidden"
                  animate={mainInView ? "visible" : "hidden"}
                >
                  {socialLinks.map(({ icon: Icon, label, href, hover }) => (
                    <motion.a
                      key={label}
                      href={href}
                      aria-label={label}
                      variants={popVariants}
                      whileHover={{ scale: 1.14, y: -2 }}
                      className={`h-10 w-10 rounded-xl bg-[#1a1a1a] border border-orange-500/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-orange-500/40 hover:shadow-[0_0_12px_rgba(249,115,22,0.2)] ${hover} transition-all duration-200`}
                    >
                      <Icon size={18} />
                    </motion.a>
                  ))}
                  <motion.a
                    href="#"
                    aria-label="WhatsApp"
                    variants={popVariants}
                    whileHover={{ scale: 1.14, y: -2 }}
                    className="h-10 w-10 rounded-xl bg-[#1a1a1a] border border-orange-500/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-green-600 hover:border-green-500/40 transition-all duration-200"
                  >
                    <FaWhatsapp size={18} />
                  </motion.a>
                </motion.div>
              </div>
            </motion.div>

            {/* Right: form */}
            <motion.div
              variants={fadeRightVariants}
              initial="hidden"
              animate={mainInView ? "visible" : "hidden"}
            >
              <div className="rounded-2xl bg-[#1a1a1a] border border-orange-500/10 shadow-[0_4px_24px_rgba(0,0,0,0.4)] backdrop-blur-sm p-8">
                <h2 className="text-2xl font-bold text-white tracking-tight mb-1">Send us a Message</h2>
                <p className="text-sm text-gray-500 mb-8 leading-relaxed">
                  Fill in the form and we&apos;ll get back to you within 24 hours.
                </p>

                <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                  <div className="gsap-field">
                    <label htmlFor="name" className="block text-xs font-semibold text-gray-400 tracking-wide uppercase mb-2">Full Name</label>
                    <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Your name" required
                      className="w-full bg-[#0a0a0a] border-orange-500/20 text-white placeholder:text-gray-600 focus:border-orange-500/60 focus:ring-orange-500/20 rounded-xl h-11" />
                  </div>

                  <div className="gsap-field">
                    <label htmlFor="email" className="block text-xs font-semibold text-gray-400 tracking-wide uppercase mb-2">Email Address</label>
                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" required
                      className="w-full bg-[#0a0a0a] border-orange-500/20 text-white placeholder:text-gray-600 focus:border-orange-500/60 focus:ring-orange-500/20 rounded-xl h-11" />
                  </div>

                  <div className="gsap-field">
                    <label htmlFor="message" className="block text-xs font-semibold text-gray-400 tracking-wide uppercase mb-2">Message</label>
                    <textarea id="message" name="message" value={formData.message} onChange={handleChange}
                      placeholder="Tell us about your project..." required rows={5}
                      className="w-full px-4 py-3 rounded-xl bg-[#0a0a0a] border border-orange-500/20 text-white placeholder:text-gray-600 focus:outline-none focus:border-orange-500/60 focus:ring-2 focus:ring-orange-500/10 resize-none text-sm leading-relaxed transition-colors" />
                  </div>

                  {/* Honeypot */}
                  <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, overflow: "hidden" }}>
                    <label htmlFor="website">Website (leave this empty)</label>
                    <input id="website" name="website" type="text" value={formData.website} onChange={handleChange} tabIndex={-1} autoComplete="off" />
                  </div>

                  <div className="gsap-field flex justify-center pt-1">
                    <Turnstile
                      ref={turnstileRef}
                      siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY as string}
                      onSuccess={(token: string) => { setTurnstileToken(token); setError(""); }}
                      onExpire={() => { setTurnstileToken(""); }}
                      onError={() => { setTurnstileToken(""); setError("Verification failed to load. Please refresh and try again."); }}
                      options={{ theme: "dark", size: "flexible" }}
                    />
                  </div>

                  <motion.div className="gsap-field" whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                    <Button
                      type="submit"
                      disabled={loading || !turnstileToken}
                      className="w-full rounded-xl h-11 text-sm font-semibold text-black bg-[#F97316] shadow-[0_0_16px_rgba(249,115,22,0.35)] hover:brightness-110 hover:shadow-[0_0_28px_rgba(249,115,22,0.55)] active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <span className="flex items-center justify-center gap-2">
                          <motion.svg
                            className="h-4 w-4"
                            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          >
                            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                          </motion.svg>
                          Sending…
                        </span>
                      ) : submitted ? "✓ Message Sent!" : !turnstileToken ? "Complete Verification to Send" : "Send Message"}
                    </Button>
                  </motion.div>
                </form>

                {/* Error / Success */}
                <AnimatePresence>
                  {error && (
                    <motion.div key="err" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                      <p className="text-sm text-red-400 font-medium">{error}</p>
                    </motion.div>
                  )}
                  {submitted && (
                    <motion.div key="ok" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      className="mt-4 p-3 bg-orange-500/10 border border-orange-500/20 rounded-xl">
                      <p className="text-sm text-orange-400 font-medium">
                        ✅ Message sent! We&apos;ll reply within 24 hours. Check your inbox for a confirmation email.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Map ── */}
      <section ref={mapRef} className="relative bg-[#1a1a1a] border-t border-orange-500/10 py-16 overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(249,115,22,0.05) 0%, transparent 70%)" }} />
        <div className="relative w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.p
              variants={fadeUpVariants}
              initial="hidden"
              animate={mapInView ? "visible" : "hidden"}
              className="text-xs font-mono font-semibold text-orange-400 tracking-widest uppercase mb-4"
            >
              Our Location
            </motion.p>
            <motion.div
              className="relative w-full h-[300px] md:h-[420px] rounded-2xl overflow-hidden border border-orange-500/15 shadow-[0_8px_40px_rgba(249,115,22,0.06)]"
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={mapInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.97 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.745313320775!2d32.64591957310303!3d0.3466123639828599!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177db948a3fc10ab%3A0xa61368735eb67913!2sKireka%20Shopping%20Centre!5e0!3m2!1sen!2sug!4v1773226618219!5m2!1sen!2sug"
                className="absolute inset-0 w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
}
