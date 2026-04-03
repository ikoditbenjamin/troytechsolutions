"use client";

import { useState } from "react";
import Link from "next/link";

// ─── Data ────────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    id: "software-dev",
    name: "Software & App Development",
    icon: "💻",
    desc: "Websites, mobile apps & custom software tailored to your business.",
    duration: "Discovery call · 30 min",
  },
  {
    id: "it-security",
    name: "IT Security & System Management",
    icon: "🔒",
    desc: "Secure networks, data protection & reliable IT support.",
    duration: "Assessment call · 45 min",
  },
  {
    id: "graphics",
    name: "Graphics & Digital Design",
    icon: "🎨",
    desc: "Brand identities, logos, banners and marketing materials.",
    duration: "Briefing call · 30 min",
  },
  {
    id: "training",
    name: "Computer Training",
    icon: "🎓",
    desc: "Practical digital skills through hands-on training programs.",
    duration: "Intake session · 30 min",
  },
  {
    id: "consultancy",
    name: "IT Consultancy",
    icon: "🧠",
    desc: "Expert advice to improve your systems and digital strategy.",
    duration: "Strategy call · 60 min",
  },
  {
    id: "loans",
    name: "Loan & Financial Services",
    icon: "💰",
    desc: "Flexible financial support to help grow your business.",
    duration: "Finance call · 30 min",
  },
];

const BUDGETS = [
  {
    id: "under-500k",
    label: "Under UGX 500,000",
    desc: "Small tasks & quick fixes",
  },
  {
    id: "500k-2m",
    label: "UGX 500,000 – 2,000,000",
    desc: "Standard projects",
  },
  {
    id: "2m-5m",
    label: "UGX 2,000,000 – 5,000,000",
    desc: "Medium-scale projects",
  },
  {
    id: "5m-plus",
    label: "UGX 5,000,000+",
    desc: "Large or enterprise solutions",
  },
  { id: "discuss", label: "Let's Discuss", desc: "I'd like a custom quote" },
];

const TIME_SLOTS = [
  "08:00 AM",
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
];

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const STEPS = [
  { label: "Service", desc: "What can we help you with?" },
  { label: "Budget", desc: "What's your estimated budget?" },
  { label: "Date & Time", desc: "When works for a consultation?" },
  { label: "Your Details", desc: "Tell us how to reach you." },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDay(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function BookingPage() {
  const [step, setStep] = useState(0);
  const [selectedService, setSelectedService] = useState("");
  const [selectedBudget, setSelectedBudget] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [calYear, setCalYear] = useState(new Date().getFullYear());
  const [calMonth, setCalMonth] = useState(new Date().getMonth());
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const todayMidnight = new Date();
  todayMidnight.setHours(0, 0, 0, 0);
  const daysInMonth = getDaysInMonth(calYear, calMonth);
  const firstDay = getFirstDay(calYear, calMonth);

  const prevMonth = () => {
    if (calMonth === 0) {
      setCalMonth(11);
      setCalYear((y) => y - 1);
    } else setCalMonth((m) => m - 1);
  };
  const nextMonth = () => {
    if (calMonth === 11) {
      setCalMonth(0);
      setCalYear((y) => y + 1);
    } else setCalMonth((m) => m + 1);
  };

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
    const bud = BUDGETS.find((b) => b.id === selectedBudget);

    const text = encodeURIComponent(
      `Hello Troy Tech Solutions! I'd like to book a consultation.\n\n` +
        `🛠️ Service: ${svc?.name}\n` +
        `💵 Budget: ${bud?.label}\n` +
        `📅 Date: ${selectedDate}\n` +
        `⏰ Time: ${selectedTime}\n\n` +
        `👤 Name: ${form.name}\n` +
        (form.email ? `📧 Email: ${form.email}\n` : "") +
        `📞 Phone: ${form.phone}\n` +
        (form.message ? `📝 Notes: ${form.message}` : ""),
    );

    window.open(`https://wa.me/256747447447?text=${text}`, "_blank");
    setSubmitted(true);
    setIsSubmitting(false);
  };

  // ── Submitted screen ───────────────────────────────────────────────────────
  if (submitted) {
    return (
      <main className="min-h-screen bg-gray-100 dark:bg-gray-950 flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-full bg-green-500/10 border-2 border-green-500 flex items-center justify-center mx-auto mb-6">
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#22c55e"
              strokeWidth="2.5"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
            Request Sent!
          </h1>
          <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-2">
            Thanks,{" "}
            <strong className="text-gray-800 dark:text-gray-200">
              {form.name}
            </strong>
            ! Your booking request has been sent via WhatsApp. Our team will
            confirm your appointment shortly.
          </p>
          <p className="text-sm text-gray-400 mb-8">
            We'll reach you on <strong>{form.phone}</strong>.
          </p>
          <div className="bg-green-500/10 border border-green-500/20 rounded-xl px-5 py-4 text-sm text-green-600 dark:text-green-400 mb-8">
            💬 A WhatsApp message has been prepared with your booking details.
            Please send it to confirm.
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3 bg-green-500 text-white font-semibold rounded-full hover:bg-green-600 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </main>
    );
  }

  // ── Main layout ────────────────────────────────────────────────────────────
  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-950">
      {/* Matrix grid overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-30 dark:opacity-100"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,255,128,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,128,0.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-12 md:py-20">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-green-500 transition-colors mb-10 group"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="group-hover:-translate-x-1 transition-transform"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back to Home
        </Link>

        {/* Page title */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
            Book a <span className="text-green-500">Consultation</span>
          </h1>
          <p className="mt-3 text-gray-500 dark:text-gray-400 max-w-lg">
            Let us understand your needs. Fill in the form below and we'll reach
            out via WhatsApp to confirm your appointment.
          </p>
        </div>

        {/* Step Progress */}
        <div className="flex items-center gap-0 mb-10 overflow-x-auto pb-2">
          {STEPS.map((s, i) => (
            <div key={i} className="flex items-center flex-shrink-0">
              <div className="flex flex-col items-center">
                <div
                  className={`w-9 h-9 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all ${
                    i < step
                      ? "bg-green-500 border-green-500 text-white"
                      : i === step
                        ? "border-green-500 text-green-500 bg-green-500/10"
                        : "border-gray-300 dark:border-gray-700 text-gray-400"
                  }`}
                >
                  {i < step ? (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    i + 1
                  )}
                </div>
                <span
                  className={`text-xs mt-1 font-medium whitespace-nowrap ${i === step ? "text-green-500" : "text-gray-400"}`}
                >
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={`w-16 md:w-24 h-0.5 mx-1 mb-5 transition-all ${i < step ? "bg-green-500" : "bg-gray-200 dark:bg-gray-700"}`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 md:p-8">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {STEPS[step].label}
            </h2>
            <p className="text-sm text-gray-400 mt-0.5">{STEPS[step].desc}</p>
          </div>

          {/* ── Step 0: Select Service ── */}
          {step === 0 && (
            <div className="grid sm:grid-cols-2 gap-3">
              {SERVICES.map((svc) => (
                <button
                  key={svc.id}
                  type="button"
                  onClick={() => setSelectedService(svc.id)}
                  className={`text-left border-2 rounded-xl p-4 transition-all hover:border-green-500 ${
                    selectedService === svc.id
                      ? "border-green-500 bg-green-500/5"
                      : "border-gray-200 dark:border-gray-700"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-2xl mb-1">{svc.icon}</div>
                      <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                        {svc.name}
                      </h3>
                      <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                        {svc.desc}
                      </p>
                      <span className="inline-block mt-2 text-xs text-green-500 font-medium">
                        {svc.duration}
                      </span>
                    </div>
                    {selectedService === svc.id && (
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center shrink-0 mt-1">
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          strokeWidth="3"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* ── Step 1: Budget ── */}
          {step === 1 && (
            <div className="space-y-3 max-w-xl">
              {BUDGETS.map((b) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setSelectedBudget(b.id)}
                  className={`w-full text-left border-2 rounded-xl px-5 py-4 transition-all flex items-center justify-between gap-4 hover:border-green-500 ${
                    selectedBudget === b.id
                      ? "border-green-500 bg-green-500/5"
                      : "border-gray-200 dark:border-gray-700"
                  }`}
                >
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">
                      {b.label}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{b.desc}</p>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                      selectedBudget === b.id
                        ? "bg-green-500 border-green-500"
                        : "border-gray-300 dark:border-gray-600"
                    }`}
                  >
                    {selectedBudget === b.id && (
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="3"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* ── Step 2: Date & Time ── */}
          {step === 2 && (
            <div className="space-y-6 max-w-lg">
              {/* Calendar */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={prevMonth}
                    className="w-8 h-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center transition-colors"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                  </button>
                  <span className="font-semibold text-gray-800 dark:text-gray-200 text-sm">
                    {MONTH_NAMES[calMonth]} {calYear}
                  </span>
                  <button
                    onClick={nextMonth}
                    className="w-8 h-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center transition-colors"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-1 text-center">
                  {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                    <div
                      key={d}
                      className="text-xs font-semibold text-gray-400 py-1"
                    >
                      {d}
                    </div>
                  ))}
                  {Array.from({ length: firstDay }).map((_, i) => (
                    <div key={`e${i}`} />
                  ))}
                  {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1;
                    const dateStr = `${calYear}-${String(calMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                    const dateObj = new Date(calYear, calMonth, day);
                    const isPast = dateObj < todayMidnight;
                    const isSelected = selectedDate === dateStr;
                    const isToday =
                      day === new Date().getDate() &&
                      calMonth === new Date().getMonth() &&
                      calYear === new Date().getFullYear();

                    return (
                      <button
                        key={day}
                        type="button"
                        disabled={isPast}
                        onClick={() => !isPast && setSelectedDate(dateStr)}
                        className={`w-full aspect-square rounded-full text-xs font-medium transition-all ${
                          isSelected
                            ? "bg-green-500 text-white shadow"
                            : isPast
                              ? "text-gray-300 dark:text-gray-700 cursor-not-allowed"
                              : isToday
                                ? "border-2 border-green-500 text-green-500 font-bold hover:bg-green-500/10"
                                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time slots */}
              {selectedDate && (
                <div>
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    Available Times — {selectedDate}
                  </p>
                  <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                    {TIME_SLOTS.map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setSelectedTime(time)}
                        className={`py-2 px-1 rounded-lg text-xs font-medium border-2 transition-all ${
                          selectedTime === time
                            ? "border-green-500 bg-green-500 text-white"
                            : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-green-400"
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── Step 3: Details ── */}
          {step === 3 && (
            <div className="grid md:grid-cols-2 gap-8">
              {/* Form */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                    placeholder="Your full name"
                    className="w-full border-2 border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:border-green-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                    Phone Number <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, phone: e.target.value }))
                    }
                    placeholder="+256 7XX XXX XXX"
                    className="w-full border-2 border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:border-green-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                    Email Address{" "}
                    <span className="text-gray-400 font-normal">
                      (optional)
                    </span>
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, email: e.target.value }))
                    }
                    placeholder="your@email.com"
                    className="w-full border-2 border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:border-green-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                    Tell us more about your project
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, message: e.target.value }))
                    }
                    placeholder="Briefly describe what you need..."
                    rows={4}
                    className="w-full border-2 border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:border-green-500 transition-colors resize-none"
                  />
                </div>
              </div>

              {/* Summary */}
              <div className="bg-gray-50 dark:bg-gray-800/60 rounded-xl p-5 h-fit border border-gray-100 dark:border-gray-700/50">
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-sm mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
                  Booking Summary
                </h3>
                <div className="space-y-3 text-xs">
                  {[
                    {
                      label: "Service",
                      value: SERVICES.find((s) => s.id === selectedService)
                        ?.name,
                    },
                    {
                      label: "Budget",
                      value: BUDGETS.find((b) => b.id === selectedBudget)
                        ?.label,
                    },
                    { label: "Date", value: selectedDate },
                    { label: "Time", value: selectedTime },
                    {
                      label: "Location",
                      value: "Kireka Kamuli C, Alongside Kamuli Rd, Kampala",
                    },
                  ].map((row) => (
                    <div key={row.label} className="flex justify-between gap-2">
                      <span className="text-gray-400 shrink-0">
                        {row.label}
                      </span>
                      <span className="font-medium text-gray-700 dark:text-gray-300 text-right">
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-5 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2 text-xs text-green-600 dark:text-green-400">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.69h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.09a16 16 0 0 0 6 6l1.46-1.46a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    +256 (747) 447-447
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    We'll confirm your booking on WhatsApp.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
            <button
              type="button"
              onClick={() => (step > 0 ? setStep((s) => s - 1) : undefined)}
              className={`px-6 py-2.5 border-2 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-sm font-medium rounded-full hover:border-gray-300 dark:hover:border-gray-500 transition-all ${step === 0 ? "invisible" : ""}`}
            >
              ← Back
            </button>

            {step < STEPS.length - 1 ? (
              <button
                type="button"
                onClick={() => setStep((s) => s + 1)}
                disabled={!canNext()}
                className={`px-8 py-2.5 text-sm font-semibold rounded-full transition-all ${
                  canNext()
                    ? "bg-green-500 text-white hover:bg-green-600 shadow-sm shadow-green-500/30"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
                }`}
              >
                Next →
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!canNext() || isSubmitting}
                className={`px-8 py-2.5 text-sm font-semibold rounded-full transition-all flex items-center gap-2 ${
                  canNext() && !isSubmitting
                    ? "bg-green-500 text-white hover:bg-green-600 shadow-sm shadow-green-500/30"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                    Sending…
                  </>
                ) : (
                  <>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 448 512"
                      fill="currentColor"
                    >
                      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                    </svg>
                    Book via WhatsApp
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-gray-400 mt-6">
          Prefer to call?{" "}
          <a
            href="tel:+256747447447"
            className="text-green-500 hover:underline font-medium"
          >
            +256 (747) 447-447
          </a>{" "}
          or{" "}
          <a
            href="mailto:techtroy28@gmail.com"
            className="text-green-500 hover:underline font-medium"
          >
            techtroy28@gmail.com
          </a>
        </p>
      </div>
    </main>
  );
}
