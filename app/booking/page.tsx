"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { gsap } from "gsap";
import { stepVariants, staggerContainerVariants, fadeUpVariants, popVariants } from "@/lib/animations";

// ─── Data ──────────────────────────────────────────────────────────────────

const SERVICES = [
  { id: "software-dev",  name: "Software & App Development",       icon: "💻", desc: "Websites, mobile apps & custom software tailored to your business.", duration: "Discovery call · 30 min" },
  { id: "it-security",   name: "IT Security & System Management",   icon: "🔒", desc: "Secure networks, data protection & reliable IT support.",             duration: "Assessment call · 45 min" },
  { id: "graphics",      name: "Graphics & Digital Design",         icon: "🎨", desc: "Brand identities, logos, banners and marketing materials.",           duration: "Briefing call · 30 min" },
  { id: "training",      name: "Computer Training",                 icon: "🎓", desc: "Practical digital skills through hands-on training programs.",        duration: "Intake session · 30 min" },
  { id: "consultancy",   name: "IT Consultancy",                    icon: "🧠", desc: "Expert advice to improve your systems and digital strategy.",         duration: "Strategy call · 60 min" },
  { id: "network-cctv",  name: "CCTV & Network Setup",              icon: "📡", desc: "Professional CCTV installation and network configuration.",          duration: "Site visit · 30 min" },
];

const BUDGETS = [
  { id: "under-500k", label: "Under UGX 500,000",             desc: "Small tasks & quick fixes" },
  { id: "500k-2m",    label: "UGX 500,000 – 2,000,000",       desc: "Standard projects" },
  { id: "2m-5m",      label: "UGX 2,000,000 – 5,000,000",     desc: "Medium-scale projects" },
  { id: "5m-plus",    label: "UGX 5,000,000+",                 desc: "Large or enterprise solutions" },
  { id: "discuss",    label: "Let's Discuss",                   desc: "I'd like a custom quote" },
];

const TIME_SLOTS = ["08:00 AM","09:00 AM","10:00 AM","11:00 AM","12:00 PM","01:00 PM","02:00 PM","03:00 PM","04:00 PM","05:00 PM"];
const MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const STEPS = [
  { label: "Service",      desc: "What can we help you with?" },
  { label: "Budget",       desc: "What's your estimated budget?" },
  { label: "Date & Time",  desc: "When works for a consultation?" },
  { label: "Your Details", desc: "Tell us how to reach you." },
];

function getDaysInMonth(year: number, month: number) { return new Date(year, month + 1, 0).getDate(); }
function getFirstDay(year: number, month: number)    { return new Date(year, month, 1).getDay(); }

// ─── Component ─────────────────────────────────────────────────────────────

export default function BookingPage() {
  const [step, setStep]                       = useState(0);
  const [stepDir, setStepDir]                 = useState(1);
  const [selectedService, setSelectedService] = useState("");
  const [selectedBudget, setSelectedBudget]   = useState("");
  const [selectedDate, setSelectedDate]       = useState("");
  const [selectedTime, setSelectedTime]       = useState("");
  const [calYear, setCalYear]                 = useState(new Date().getFullYear());
  const [calMonth, setCalMonth]               = useState(new Date().getMonth());
  const [form, setForm]                       = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted]             = useState(false);
  const [isSubmitting, setIsSubmitting]       = useState(false);

  const todayMidnight = new Date(); todayMidnight.setHours(0, 0, 0, 0);
  const daysInMonth   = getDaysInMonth(calYear, calMonth);
  const firstDay      = getFirstDay(calYear, calMonth);

  /* GSAP entrance for page header */
  const headerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const tl = gsap.timeline({ delay: 0.15 });
    tl.from(el.querySelectorAll(".gsap-heading > *"), { opacity: 0, y: 24, stagger: 0.1, duration: 0.6, ease: "power3.out" });
    return () => { tl.kill(); };
  }, []);

  const goStep = (next: number) => {
    setStepDir(next > step ? 1 : -1);
    setStep(next);
  };

  const prevMonth = () => { if (calMonth === 0) { setCalMonth(11); setCalYear((y) => y - 1); } else setCalMonth((m) => m - 1); };
  const nextMonth = () => { if (calMonth === 11) { setCalMonth(0); setCalYear((y) => y + 1); } else setCalMonth((m) => m + 1); };

  const canNext = () => {
    if (step === 0) return !!selectedService;
    if (step === 1) return !!selectedBudget;
    if (step === 2) return !!selectedDate && !!selectedTime;
    if (step === 3) return !!form.name && !!form.phone;
    return false;
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    const svc = SERVICES.find((s) => s.id === selectedService);
    const bud = BUDGETS.find((b)  => b.id === selectedBudget);
    const text = encodeURIComponent(
      `Hello Troy Tech Solutions! I'd like to book a consultation.\n\n` +
      `🛠️ Service: ${svc?.name}\n💵 Budget: ${bud?.label}\n📅 Date: ${selectedDate}\n⏰ Time: ${selectedTime}\n\n` +
      `👤 Name: ${form.name}\n` + (form.email ? `📧 Email: ${form.email}\n` : "") +
      `📞 Phone: ${form.phone}\n` + (form.message ? `📝 Notes: ${form.message}` : ""),
    );
    window.open(`https://wa.me/256747447447?text=${text}`, "_blank");
    setSubmitted(true);
    setIsSubmitting(false);
  };

  // ── Submitted screen ──────────────────────────────────────────────────────
  if (submitted) {
    return (
      <main className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6">
        <motion.div
          className="max-w-md w-full text-center"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
        >
          <motion.div
            className="w-20 h-20 rounded-full bg-orange-500/10 border-2 border-orange-500 flex items-center justify-center mx-auto mb-6 shadow-[0_0_24px_rgba(249,115,22,0.3)]"
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.2 }}
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </motion.div>
          <motion.h1
            className="text-3xl font-extrabold text-white tracking-tight mb-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            Request{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">Sent!</span>
          </motion.h1>
          <motion.p className="text-gray-400 leading-relaxed mb-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}>
            Thanks, <strong className="text-white">{form.name}</strong>! Your booking request has been sent via WhatsApp. Our team will confirm your appointment shortly.
          </motion.p>
          <motion.p className="text-sm text-gray-500 mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            We&apos;ll reach you on <span className="text-orange-400 font-semibold">{form.phone}</span>.
          </motion.p>
          <motion.div
            className="bg-orange-500/10 border border-orange-500/20 rounded-xl px-5 py-4 text-sm text-orange-400 mb-8"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
          >
            💬 A WhatsApp message has been prepared with your booking details. Please send it to confirm.
          </motion.div>
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link href="/" className="inline-flex items-center gap-2 rounded-xl px-8 py-3 text-sm font-semibold text-black bg-[#F97316] shadow-[0_0_16px_rgba(249,115,22,0.4)] hover:brightness-110 transition-all duration-200">
              ← Back to Home
            </Link>
          </motion.div>
        </motion.div>
      </main>
    );
  }

  // ── Main layout ────────────────────────────────────────────────────────────
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      {/* Grid overlay */}
      <div className="pointer-events-none fixed inset-0 z-0"
        style={{ backgroundImage: "linear-gradient(rgba(249,115,22,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.025) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-12 md:py-20">
        {/* Back link */}
        <motion.div whileHover={{ x: -3 }}>
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-mono text-gray-500 hover:text-orange-400 transition-colors mb-10 group">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              className="group-hover:-translate-x-1 transition-transform">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back to Home
          </Link>
        </motion.div>

        {/* Page header */}
        <div ref={headerRef} className="mb-10">
          <div className="gsap-heading">
            <p className="text-xs font-mono font-semibold text-orange-400 tracking-widest uppercase mb-3">Booking</p>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Book a{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">Consultation</span>
            </h1>
            <p className="mt-4 text-gray-400 max-w-lg leading-relaxed">
              Let us understand your needs. Fill in the form below and we&apos;ll reach out via{" "}
              <span className="text-orange-400 font-semibold">WhatsApp</span> to confirm your appointment.
            </p>
          </div>
        </div>

        {/* Step progress */}
        <div className="flex items-center gap-0 mb-10 overflow-x-auto pb-2">
          {STEPS.map((s, i) => (
            <div key={i} className="flex items-center flex-shrink-0">
              <div className="flex flex-col items-center">
                <motion.div
                  className={`w-9 h-9 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all ${
                    i < step ? "bg-[#F97316] border-[#F97316] text-black"
                      : i === step ? "border-[#F97316] text-[#F97316] bg-orange-500/10"
                      : "border-gray-700 text-gray-600"
                  }`}
                  animate={i === step ? { scale: [1, 1.12, 1], boxShadow: ["0 0 0px rgba(249,115,22,0)", "0 0 16px rgba(249,115,22,0.5)", "0 0 8px rgba(249,115,22,0.3)"] } : {}}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  {i < step ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : i + 1}
                </motion.div>
                <span className={`text-xs mt-1 font-mono font-medium whitespace-nowrap ${i === step ? "text-orange-400" : "text-gray-600"}`}>
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <motion.div
                  className={`w-16 md:w-24 h-0.5 mx-1 mb-5 ${i < step ? "bg-[#F97316]" : "bg-gray-800"}`}
                  animate={i < step ? { scaleX: 1 } : { scaleX: 1 }}
                  style={{ originX: 0 }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Card with animated step transitions */}
        <div className="bg-[#1a1a1a] rounded-2xl border border-orange-500/10 shadow-[0_4px_24px_rgba(0,0,0,0.4)] backdrop-blur-sm p-6 md:p-8 overflow-hidden">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white tracking-tight">{STEPS[step].label}</h2>
            <p className="text-sm text-gray-500 mt-1 leading-relaxed">{STEPS[step].desc}</p>
          </div>

          <AnimatePresence mode="wait" custom={stepDir}>
            <motion.div
              key={step}
              custom={stepDir}
              variants={stepVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >

              {/* ── Step 0: Service ── */}
              {step === 0 && (
                <motion.div
                  className="grid sm:grid-cols-2 gap-3"
                  variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
                  initial="hidden"
                  animate="visible"
                >
                  {SERVICES.map((svc) => (
                    <motion.button
                      key={svc.id}
                      variants={popVariants}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => setSelectedService(svc.id)}
                      className={`text-left border-2 rounded-xl p-4 transition-all ${
                        selectedService === svc.id
                          ? "border-[#F97316] bg-orange-500/5 shadow-[0_0_16px_rgba(249,115,22,0.12)]"
                          : "border-orange-500/10 bg-[#0a0a0a] hover:border-orange-500/60 hover:shadow-[0_0_16px_rgba(249,115,22,0.1)]"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-2xl mb-2">{svc.icon}</div>
                          <h3 className="font-semibold text-white text-sm leading-snug">{svc.name}</h3>
                          <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">{svc.desc}</p>
                          <span className="inline-block mt-2 text-xs text-orange-400 font-mono font-medium">{svc.duration}</span>
                        </div>
                        <AnimatePresence>
                          {selectedService === svc.id && (
                            <motion.div
                              key="check"
                              initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                              transition={{ type: "spring", stiffness: 500, damping: 20 }}
                              className="w-5 h-5 rounded-full bg-[#F97316] flex items-center justify-center shrink-0 mt-1"
                            >
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.button>
                  ))}
                </motion.div>
              )}

              {/* ── Step 1: Budget ── */}
              {step === 1 && (
                <motion.div
                  className="space-y-3 max-w-xl"
                  variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
                  initial="hidden"
                  animate="visible"
                >
                  {BUDGETS.map((b) => (
                    <motion.button
                      key={b.id}
                      variants={popVariants}
                      whileHover={{ scale: 1.01, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => setSelectedBudget(b.id)}
                      className={`w-full text-left border-2 rounded-xl px-5 py-4 transition-all flex items-center justify-between gap-4 ${
                        selectedBudget === b.id
                          ? "border-[#F97316] bg-orange-500/5 shadow-[0_0_16px_rgba(249,115,22,0.12)]"
                          : "border-orange-500/10 bg-[#0a0a0a] hover:border-orange-500/60 hover:shadow-[0_0_16px_rgba(249,115,22,0.1)]"
                      }`}
                    >
                      <div>
                        <p className="font-semibold text-white text-sm">{b.label}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{b.desc}</p>
                      </div>
                      <motion.div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                          selectedBudget === b.id ? "bg-[#F97316] border-[#F97316]" : "border-gray-700"
                        }`}
                        animate={selectedBudget === b.id ? { scale: [1, 1.2, 1] } : {}}
                        transition={{ duration: 0.3 }}
                      >
                        {selectedBudget === b.id && (
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </motion.div>
                    </motion.button>
                  ))}
                </motion.div>
              )}

              {/* ── Step 2: Date & Time ── */}
              {step === 2 && (
                <div className="space-y-6 max-w-lg">
                  {/* Calendar */}
                  <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                    <div className="flex items-center justify-between mb-4">
                      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                        onClick={prevMonth} className="w-8 h-8 rounded-full hover:bg-orange-950/60 flex items-center justify-center text-gray-400 hover:text-orange-400 transition-colors">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
                      </motion.button>
                      <span className="font-semibold text-white text-sm font-mono">{MONTH_NAMES[calMonth]} {calYear}</span>
                      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                        onClick={nextMonth} className="w-8 h-8 rounded-full hover:bg-orange-950/60 flex items-center justify-center text-gray-400 hover:text-orange-400 transition-colors">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
                      </motion.button>
                    </div>

                    <div className="grid grid-cols-7 gap-1 text-center">
                      {["Su","Mo","Tu","We","Th","Fr","Sa"].map((d) => (
                        <div key={d} className="text-xs font-mono font-semibold text-gray-600 py-1">{d}</div>
                      ))}
                      {Array.from({ length: firstDay }).map((_, i) => <div key={`e${i}`} />)}
                      {Array.from({ length: daysInMonth }).map((_, i) => {
                        const day = i + 1;
                        const dateStr = `${calYear}-${String(calMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                        const dateObj = new Date(calYear, calMonth, day);
                        const isPast = dateObj < todayMidnight;
                        const isSelected = selectedDate === dateStr;
                        const isToday = day === new Date().getDate() && calMonth === new Date().getMonth() && calYear === new Date().getFullYear();
                        return (
                          <motion.button
                            key={day}
                            type="button"
                            disabled={isPast}
                            onClick={() => !isPast && setSelectedDate(dateStr)}
                            whileHover={!isPast ? { scale: 1.15 } : {}}
                            whileTap={!isPast ? { scale: 0.9 } : {}}
                            className={`w-full aspect-square rounded-full text-xs font-medium transition-all ${
                              isSelected ? "bg-[#F97316] text-black shadow-[0_0_12px_rgba(249,115,22,0.4)]"
                                : isPast ? "text-gray-700 cursor-not-allowed"
                                : isToday ? "border-2 border-[#F97316] text-orange-400 font-bold hover:bg-orange-500/10"
                                : "text-gray-300 hover:bg-orange-950/50 hover:text-orange-400"
                            }`}
                          >
                            {day}
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>

                  {/* Time slots */}
                  <AnimatePresence>
                    {selectedDate && (
                      <motion.div
                        key="timeslots"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.35 }}
                      >
                        <p className="text-sm font-semibold text-white mb-3">
                          Available Times — <span className="text-orange-400 font-mono">{selectedDate}</span>
                        </p>
                        <motion.div
                          className="grid grid-cols-4 sm:grid-cols-5 gap-2"
                          variants={{ visible: { transition: { staggerChildren: 0.04 } } }}
                          initial="hidden"
                          animate="visible"
                        >
                          {TIME_SLOTS.map((time) => (
                            <motion.button
                              key={time}
                              variants={popVariants}
                              whileHover={{ scale: 1.06 }}
                              whileTap={{ scale: 0.94 }}
                              type="button"
                              onClick={() => setSelectedTime(time)}
                              className={`py-2 px-1 rounded-lg text-xs font-mono font-medium border-2 transition-all ${
                                selectedTime === time
                                  ? "border-[#F97316] bg-[#F97316] text-black shadow-[0_0_10px_rgba(249,115,22,0.3)]"
                                  : "border-orange-500/15 text-gray-400 hover:border-orange-500/50 hover:text-orange-400"
                              }`}
                            >
                              {time}
                            </motion.button>
                          ))}
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* ── Step 3: Details ── */}
              {step === 3 && (
                <div className="grid md:grid-cols-2 gap-8">
                  <motion.div
                    className="space-y-4"
                    variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
                    initial="hidden"
                    animate="visible"
                  >
                    {[
                      { key: "name",    label: "Full Name",     type: "text",  placeholder: "Your full name",   required: true },
                      { key: "phone",   label: "Phone Number",  type: "tel",   placeholder: "+256 7XX XXX XXX", required: true },
                      { key: "email",   label: "Email Address", type: "email", placeholder: "your@email.com",   required: false },
                    ].map(({ key, label, type, placeholder, required }) => (
                      <motion.div key={key} variants={fadeUpVariants}>
                        <label className="block text-xs font-mono font-semibold text-gray-400 tracking-widest uppercase mb-1.5">
                          {label}{" "}
                          {required ? <span className="text-red-400">*</span> : <span className="text-gray-600 font-normal normal-case">(optional)</span>}
                        </label>
                        <input
                          type={type}
                          value={form[key as keyof typeof form]}
                          onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                          placeholder={placeholder}
                          className="w-full border-2 border-orange-500/15 rounded-xl px-4 py-3 text-sm bg-[#0a0a0a] text-white placeholder:text-gray-600 focus:outline-none focus:border-orange-500/50 focus:shadow-[0_0_12px_rgba(249,115,22,0.1)] transition-all"
                        />
                      </motion.div>
                    ))}
                    <motion.div variants={fadeUpVariants}>
                      <label className="block text-xs font-mono font-semibold text-gray-400 tracking-widest uppercase mb-1.5">Project Notes</label>
                      <textarea
                        value={form.message}
                        onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                        placeholder="Briefly describe what you need..."
                        rows={4}
                        className="w-full border-2 border-orange-500/15 rounded-xl px-4 py-3 text-sm bg-[#0a0a0a] text-white placeholder:text-gray-600 focus:outline-none focus:border-orange-500/50 focus:shadow-[0_0_12px_rgba(249,115,22,0.1)] transition-all resize-none leading-relaxed"
                      />
                    </motion.div>
                  </motion.div>

                  {/* Summary */}
                  <motion.div
                    className="rounded-2xl bg-[#0a0a0a] border border-orange-500/10 p-5 h-fit"
                    initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.45, delay: 0.2 }}
                  >
                    <h3 className="font-bold text-white text-sm mb-4 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-orange-400 inline-block shadow-[0_0_6px_rgba(249,115,22,0.6)]" />
                      Booking Summary
                    </h3>
                    <div className="space-y-3 text-xs">
                      {[
                        { label: "Service",  value: SERVICES.find((s) => s.id === selectedService)?.name },
                        { label: "Budget",   value: BUDGETS.find((b)  => b.id === selectedBudget)?.label },
                        { label: "Date",     value: selectedDate },
                        { label: "Time",     value: selectedTime },
                        { label: "Location", value: "Kireka Kamuli C, Alongside Kamuli Rd, Kampala" },
                      ].map((row) => (
                        <div key={row.label} className="flex justify-between gap-2">
                          <span className="text-gray-500 shrink-0 font-mono">{row.label}</span>
                          <span className="font-medium text-gray-300 text-right">{row.value}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-5 pt-4 border-t border-orange-500/10">
                      <div className="flex items-center gap-2 text-xs text-orange-400">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.69h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.09a16 16 0 0 0 6 6l1.46-1.46a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                        <span className="font-mono">+256 (747) 447-447</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">We&apos;ll confirm your booking on WhatsApp.</p>
                    </div>
                  </motion.div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-orange-500/10">
            <motion.button
              type="button"
              onClick={() => step > 0 && goStep(step - 1)}
              whileHover={step > 0 ? { scale: 1.03 } : {}}
              whileTap={step > 0 ? { scale: 0.97 } : {}}
              className={`px-6 py-2.5 border-2 border-orange-500/20 text-gray-400 text-sm font-medium rounded-xl hover:border-orange-500/50 hover:text-white transition-all ${step === 0 ? "invisible" : ""}`}
            >
              ← Back
            </motion.button>

            {step < STEPS.length - 1 ? (
              <motion.button
                type="button"
                onClick={() => goStep(step + 1)}
                disabled={!canNext()}
                whileHover={canNext() ? { scale: 1.04 } : {}}
                whileTap={canNext() ? { scale: 0.97 } : {}}
                className={`px-8 py-2.5 text-sm font-semibold rounded-xl transition-all ${
                  canNext() ? "bg-[#F97316] text-black shadow-[0_0_16px_rgba(249,115,22,0.4)] hover:brightness-110" : "bg-gray-800 text-gray-600 cursor-not-allowed"
                }`}
              >
                Next →
              </motion.button>
            ) : (
              <motion.button
                type="button"
                onClick={handleSubmit}
                disabled={!canNext() || isSubmitting}
                whileHover={canNext() && !isSubmitting ? { scale: 1.04 } : {}}
                whileTap={canNext() && !isSubmitting ? { scale: 0.97 } : {}}
                className={`px-8 py-2.5 text-sm font-semibold rounded-xl transition-all flex items-center gap-2 ${
                  canNext() && !isSubmitting ? "bg-[#F97316] text-black shadow-[0_0_16px_rgba(249,115,22,0.4)] hover:brightness-110" : "bg-gray-800 text-gray-600 cursor-not-allowed"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <motion.svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                      animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </motion.svg>
                    Sending…
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 448 512" fill="currentColor">
                      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                    </svg>
                    Book via WhatsApp
                  </>
                )}
              </motion.button>
            )}
          </div>
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-gray-400 mt-6">
          Prefer to call?{" "}
          <a href="tel:+256747447447" className="text-green-500 hover:underline font-medium">+256 (747) 447-447</a>{" "}
          or{" "}
          <a href="mailto:techtroy28@gmail.com" className="text-green-500 hover:underline font-medium">techtroy28@gmail.com</a>
        </p>
      </div>
    </main>
  );
}
