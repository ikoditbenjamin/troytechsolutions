"use client";

import Image from "next/image";
import Link from "next/link";

const loans = [
  {
    title: "Personal Loan",
    description:
      "Flexible personal loans designed to help you manage unexpected expenses or achieve your goals.",
    image: "/loans/personal.jpg",
  },
  {
    title: "Business Loan",
    description:
      "Empowering entrepreneurs with capital to grow and scale their businesses.",
    image: "/loans/business.jpg",
  },
  {
    title: "Education Loan",
    description:
      "Invest in your future with education loans that support your academic journey.",
    image: "/loans/education.jpg",
  },
  {
    title: "Home Loan",
    description:
      "Affordable home financing solutions to help you own your dream house.",
    image: "/loans/home.jpg",
  },
];

const steps = [
  { title: "Apply Online",   desc: "Complete a quick online application form to get started." },
  { title: "Verification",   desc: "Our team verifies your details and reviews your eligibility." },
  { title: "Approval",       desc: "Get fast loan approval once your application is reviewed." },
  { title: "Receive Funds",  desc: "Funds are securely transferred to your account." },
];

export default function LoanPage() {
  return (
    <main className="min-h-screen">

      {/* HERO — #020617 (deep) */}
      <section className="relative bg-[#020617] border-b border-cyan-500/10 py-24 overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(6,182,212,0.07) 0%, transparent 70%)" }} />
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <p className="text-xs font-mono font-semibold text-cyan-400 tracking-widest uppercase mb-4">
            Financial Services
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Loans &amp;{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
              Financing
            </span>
          </h1>
          <p className="mt-5 text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto">
            Explore flexible loan solutions designed to support your personal, business, and financial goals.
          </p>
        </div>
      </section>

      {/* FEATURED LOAN — #0F172A (raised) */}
      <section className="relative bg-[#0F172A] border-b border-cyan-500/10 py-16 overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 50% at 100% 50%, rgba(6,182,212,0.06) 0%, transparent 70%)" }} />
        <div className="relative max-w-7xl mx-auto px-6">
          <p className="text-xs font-mono font-semibold text-cyan-400 tracking-widest uppercase mb-6">Featured Offer</p>
          <div className="grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-cyan-500/15 shadow-[0_8px_40px_rgba(6,182,212,0.08)] bg-[#020617]">
            <div className="relative h-80 md:h-full min-h-[280px]">
              <Image src="/loans/fast.jpg" alt="Featured Loan" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#020617]/60" />
            </div>
            <div className="p-10 flex flex-col justify-center">
              <span className="text-xs font-mono font-semibold text-cyan-400 tracking-widest uppercase">
                Fast Access
              </span>
              <h2 className="text-3xl font-extrabold mt-2 text-white leading-snug">Fast Personal Loans</h2>
              <p className="text-gray-400 mt-4 leading-relaxed">
                Get quick access to funds with our simple personal loan application process and flexible repayment options.
              </p>
              <Link
                href="#"
                className="inline-flex items-center gap-1 mt-6 self-start rounded-xl px-6 py-3 text-sm font-semibold text-gray-950 bg-[#06B6DA] shadow-[0_0_16px_rgba(6,182,212,0.4)] hover:brightness-110 hover:scale-[1.03] hover:shadow-[0_0_28px_rgba(6,182,212,0.6)] active:scale-[0.97] transition-all duration-200"
              >
                Apply Now →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* LOAN TYPES — #020617 (deep) */}
      <section className="relative bg-[#020617] py-20 overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(6,182,212,0.04) 0%, transparent 70%)" }} />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-mono font-semibold text-cyan-400 tracking-widest uppercase mb-3">Loan Types</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Our Loan{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Services</span>
            </h2>
            <p className="text-gray-400 mt-3">Choose the loan option that best fits your needs.</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {loans.map((loan, index) => (
              <div
                key={index}
                className="group relative rounded-2xl overflow-hidden bg-[#0F172A] border border-cyan-500/10 shadow-[0_4px_24px_rgba(0,0,0,0.4)] backdrop-blur-sm hover:-translate-y-1.5 hover:border-cyan-500/40 hover:shadow-[0_8px_40px_rgba(6,182,212,0.12)] transition-all duration-300 ease-out"
              >
                <div className="relative h-48">
                  <Image src={loan.image} alt={loan.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent" />
                </div>
                <div className="p-5">
                  <h3 className="text-base font-semibold text-white group-hover:text-cyan-400 transition-colors duration-300">
                    {loan.title}
                  </h3>
                  <p className="text-gray-400 text-sm mt-2 leading-relaxed">{loan.description}</p>
                  <Link href="#" className="inline-block mt-4 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors duration-200">
                    Learn More →
                  </Link>
                </div>
                <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-cyan-500 to-emerald-500 transition-all duration-500 ease-out" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOAN PROCESS — #0F172A (raised) */}
      <section className="relative bg-[#0F172A] border-y border-cyan-500/10 py-20 overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(6,182,212,0.05) 0%, transparent 70%)" }} />
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-mono font-semibold text-cyan-400 tracking-widest uppercase mb-3">How It Works</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Simple Loan{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Process</span>
            </h2>
            <p className="text-gray-400 mt-3">Apply for a loan in just a few easy steps.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-4">
            {steps.map((step, index) => (
              <div
                key={index}
                className="group relative rounded-2xl bg-[#020617] border border-cyan-500/10 p-6 text-center hover:-translate-y-1.5 hover:border-cyan-500/35 hover:shadow-[0_8px_32px_rgba(6,182,212,0.1)] transition-all duration-300 ease-out overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-20 h-20 -mr-6 -mt-6 rounded-full bg-cyan-500/5 blur-xl pointer-events-none" />
                <div className="w-12 h-12 flex items-center justify-center mx-auto rounded-full bg-[#06B6DA]/10 border border-[#06B6DA]/30 text-[#06B6DA] text-lg font-bold font-mono shadow-[0_0_16px_rgba(6,182,212,0.2)] group-hover:shadow-[0_0_24px_rgba(6,182,212,0.35)] transition-all duration-300">
                  {index + 1}
                </div>
                <h3 className="mt-4 font-semibold text-white">{step.title}</h3>
                <p className="text-gray-400 text-sm mt-2 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — #020617 (deep) */}
      <section className="relative bg-[#020617] border-t border-cyan-500/10 py-20 overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 60% at 50% 100%, rgba(6,182,212,0.07) 0%, transparent 70%)" }} />
        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Ready to Apply for a{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Loan?</span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto leading-relaxed">
            Start your loan application today and get access to the financial support you need.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#"
              className="inline-flex items-center justify-center rounded-xl px-8 py-3.5 text-sm font-semibold text-gray-950 bg-[#06B6DA] shadow-[0_0_20px_rgba(6,182,212,0.45)] hover:brightness-110 hover:scale-[1.04] hover:shadow-[0_0_36px_rgba(6,182,212,0.65)] active:scale-[0.97] transition-all duration-200"
            >
              Apply Now
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl px-8 py-3.5 text-sm font-semibold text-white bg-transparent border border-[#06B6DA]/50 hover:border-[#06B6DA] hover:shadow-[0_0_20px_rgba(6,182,212,0.25)] hover:scale-[1.03] active:scale-[0.97] transition-all duration-200"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
