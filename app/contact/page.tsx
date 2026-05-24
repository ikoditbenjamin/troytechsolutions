'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
  Youtube,
  Github,
} from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'

const socialLinks = [
  { icon: Linkedin,   label: 'LinkedIn',  href: '#', hover: 'hover:bg-blue-600' },
  { icon: Twitter,    label: 'Twitter',   href: '#', hover: 'hover:bg-sky-500' },
  { icon: Instagram,  label: 'Instagram', href: '#', hover: 'hover:bg-purple-600' },
  { icon: Github,     label: 'GitHub',    href: '#', hover: 'hover:bg-gray-600' },
  { icon: Facebook,   label: 'Facebook',  href: '#', hover: 'hover:bg-blue-700' },
  { icon: Youtube,    label: 'YouTube',   href: '#', hover: 'hover:bg-red-600' },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setFormData({ name: '', email: '', message: '' })
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div className="min-h-screen bg-[#020617]">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-[#0F172A] border-b border-cyan-500/10 px-4 py-24 sm:px-6 lg:px-8 overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(6,182,212,0.08) 0%, transparent 70%)" }} />
        <div className="max-w-3xl mx-auto text-center">
          {/* eyebrow */}
          <p className="text-xs font-mono font-semibold text-cyan-400 tracking-widest uppercase mb-4">
            Contact Us
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white">
            Get in{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
              Touch
            </span>
          </h1>
          <p className="mt-5 text-lg text-gray-400 leading-relaxed max-w-xl mx-auto">
            We&apos;d love to hear from you. Send us a message and we&apos;ll
            respond as soon as possible.
          </p>
        </div>
      </section>

      {/* ── Main grid ────────────────────────────────────────────────────── */}
      <section className="relative bg-[#020617] overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 60% at 100% 50%, rgba(6,182,212,0.05) 0%, transparent 70%)" }} />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">

          {/* ── Left: contact info ───────────────────────────────────────── */}
          <div className="space-y-10">

            {/* Section heading */}
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Contact Information
              </h2>
              <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                Reach us through any of the channels below — we&apos;re always happy to help.
              </p>
            </div>

            {/* Info rows */}
            <div className="space-y-6">
              {[
                {
                  icon: Mail,
                  label: 'Email',
                  value: 'techtroy28@gmail.com',
                  href: 'mailto:techtroy28@gmail.com',
                },
                {
                  icon: Phone,
                  label: 'Phone',
                  value: '+256 (747) 447-447 · +256 (782) 391-512',
                  href: 'tel:+256747447447',
                },
                {
                  icon: MapPin,
                  label: 'Location',
                  value: 'Kireka Kamuli C, Alongside Kamuli Road, Kampala, Uganda',
                  href: null,
                },
              ].map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-xl bg-cyan-950/60 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                    <Icon size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-mono font-semibold text-cyan-400 tracking-widest uppercase mb-1">
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        className="text-sm text-gray-300 hover:text-cyan-400 transition-colors duration-200 leading-relaxed"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm text-gray-400 leading-relaxed">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div>
              <h3 className="text-sm font-bold text-white tracking-wide mb-4">
                Follow Us
              </h3>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map(({ icon: Icon, label, href, hover }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className={`h-10 w-10 rounded-xl bg-[#0F172A] border border-cyan-500/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-cyan-500/40 hover:shadow-[0_0_12px_rgba(6,182,218,0.2)] ${hover} transition-all duration-200`}
                  >
                    <Icon size={18} />
                  </a>
                ))}
                <a
                  href="#"
                  aria-label="WhatsApp"
                  className="h-10 w-10 rounded-xl bg-[#0F172A] border border-cyan-500/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-green-600 hover:border-green-500/40 transition-all duration-200"
                >
                  <FaWhatsapp size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* ── Right: form ──────────────────────────────────────────────── */}
          <div>
            <div className="rounded-2xl bg-[#0F172A] border border-cyan-500/10 shadow-[0_4px_24px_rgba(0,0,0,0.4)] backdrop-blur-sm p-8">

              <h2 className="text-2xl font-bold text-white tracking-tight mb-1">
                Send us a Message
              </h2>
              <p className="text-sm text-gray-500 mb-8 leading-relaxed">
                Fill in the form and we&apos;ll get back to you within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold text-gray-400 tracking-wide uppercase mb-2">
                    Full Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="w-full bg-[#020b18] border-cyan-500/20 text-white placeholder:text-gray-600 focus:border-cyan-500/60 focus:ring-cyan-500/20 rounded-xl h-11"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-gray-400 tracking-wide uppercase mb-2">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                    className="w-full bg-[#020b18] border-cyan-500/20 text-white placeholder:text-gray-600 focus:border-cyan-500/60 focus:ring-cyan-500/20 rounded-xl h-11"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-gray-400 tracking-wide uppercase mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project..."
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl bg-[#020b18] border border-cyan-500/20 text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-500/60 focus:ring-2 focus:ring-cyan-500/10 resize-none text-sm leading-relaxed transition-colors"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full rounded-xl h-11 text-sm font-semibold text-gray-950 bg-[#06B6DA] shadow-[0_0_16px_rgba(6,182,218,0.35)] hover:brightness-110 hover:shadow-[0_0_28px_rgba(6,182,218,0.55)] active:scale-[0.98] transition-all duration-200"
                >
                  {submitted ? '✓ Message Sent!' : 'Send Message'}
                </Button>
              </form>

              {submitted && (
                <div className="mt-4 p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-xl">
                  <p className="text-sm text-cyan-400 font-medium">
                    Thanks! We&apos;ll get back to you soon.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* ── Map ──────────────────────────────────────────────────────────── */}
      <section className="relative bg-[#0F172A] border-t border-cyan-500/10 py-16 overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(6,182,212,0.05) 0%, transparent 70%)" }} />
        <div className="relative w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <p className="text-xs font-mono font-semibold text-cyan-400 tracking-widest uppercase mb-4">
              Our Location
            </p>
            <div className="relative w-full h-[300px] md:h-[420px] rounded-2xl overflow-hidden border border-cyan-500/15 shadow-[0_8px_40px_rgba(6,182,212,0.06)]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.745313320775!2d32.64591957310303!3d0.3466123639828599!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177db948a3fc10ab%3A0xa61368735eb67913!2sKireka%20Shopping%20Centre!5e0!3m2!1sen!2sug!4v1773226618219!5m2!1sen!2sug"
                className="absolute inset-0 w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
