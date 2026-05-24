"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, Minimize2 } from "lucide-react";

/* ─── Knowledge base ────────────────────────────────────────────────────── */

const KB: { patterns: RegExp[]; answer: string }[] = [
  // Greetings
  {
    patterns: [/^(hi|hello|hey|good\s*(morning|afternoon|evening)|howdy|sup)/i],
    answer:
      "👋 Hello! I'm **TroyBot**, TroyTech Solutions' virtual assistant. I can help you with information about our IT services, loans, pricing, team, location, and more. What would you like to know?",
  },
  // What is TroyTech
  {
    patterns: [/what\s+is\s+troy\s*tech|about\s+troy\s*tech|tell\s+me\s+about/i],
    answer:
      "**TroyTech Solutions** is a professional IT services and financial solutions company based in **Kampala, Uganda**. We offer:\n\n• 💻 Software & App Development\n• 🔒 IT Security & System Management\n• 🎨 Graphics & Digital Design\n• 🎓 Computer Training\n• 🧠 IT Consultancy\n• 💰 Loan & Financial Services\n\nWe serve individuals, startups, and enterprises across Uganda and beyond.",
  },
  // Services
  {
    patterns: [/service|what\s+do\s+you\s+(do|offer|provide)|capabilities/i],
    answer:
      "We offer a wide range of services:\n\n**IT Services:**\n• 💻 Software & App Development (websites, mobile apps, custom software)\n• 🔒 IT Security & System Management\n• 🎨 Graphics & Digital Design (logos, branding, banners)\n• 🎓 Computer Training (hands-on digital skills)\n• 🖨️ Printing Solutions & Online Applications\n• 🧠 IT Consultancy\n• 📡 CCTV Installation & Network Setup\n• 🔧 Computer Repair & Data Recovery\n\n**Financial Services:**\n• 💰 Personal, Business, Education & Home Loans\n\nWant details on any specific service?",
  },
  // Software development
  {
    patterns: [/software|app\s+dev|web(site)?|mobile\s+app|develop/i],
    answer:
      "Our **Software & App Development** service covers:\n\n• 🌐 Modern website design & development\n• 📱 Mobile app development\n• ⚙️ Custom software solutions\n• 🛒 E-commerce platforms\n• 🏫 School & business management systems\n• 🔗 API integrations\n\nWe use **Next.js, React, Node.js, PostgreSQL** and more. Book a free discovery call to discuss your project! 📅",
  },
  // Graphics design
  {
    patterns: [/graphic|design|logo|brand|banner|poster/i],
    answer:
      "Our **Graphics & Digital Design** team creates:\n\n• 🎨 Logo & brand identity design\n• 📢 Marketing banners & posters\n• 📄 Business cards & stationery\n• 📱 Social media graphics\n• 🖼️ UI/UX design mockups\n\nWe deliver professional, modern designs that make your brand stand out. Contact us to get started!",
  },
  // Computer training
  {
    patterns: [/train|course|learn|computer\s+skill|class|lesson/i],
    answer:
      "Our **Computer Training** programs include:\n\n• 🖥️ Basic computer skills & MS Office\n• 🌐 Internet & email usage\n• 💻 Software applications training\n• 🔧 Hardware troubleshooting basics\n• 📊 Data entry & spreadsheets\n\nTraining is hands-on and practical, suitable for beginners to intermediate users. Sessions available at our Kireka office or online.",
  },
  // IT Security
  {
    patterns: [/security|protect|network|firewall|hack|cyber|cctv|surveillance/i],
    answer:
      "Our **IT Security & System Management** services include:\n\n• 🔒 Network security setup & monitoring\n• 🛡️ Data protection & backup solutions\n• 📡 CCTV installation & surveillance\n• 🔧 System maintenance & support\n• 🌐 Network setup & configuration\n• 🚨 Cybersecurity consulting\n\nWe help safeguard your business from digital threats. Get a free security assessment today!",
  },
  // Loans
  {
    patterns: [/loan|financ|borrow|credit|money|fund|invest/i],
    answer:
      "We offer flexible **Loan & Financial Services**:\n\n• 👤 **Personal Loans** — for unexpected expenses or personal goals\n• 🏢 **Business Loans** — capital to grow your business\n• 🎓 **Education Loans** — invest in your academic journey\n• 🏠 **Home Loans** — affordable home financing\n\n**How to apply:**\n1. Fill out our online application\n2. Our team verifies your details\n3. Get fast approval\n4. Funds transferred to your account\n\nContact us on **+256 747 447 447** to discuss your loan needs!",
  },
  // Pricing
  {
    patterns: [/price|cost|how\s+much|fee|rate|charge|budget|afford/i],
    answer:
      "Our pricing depends on the scope of your project. Here's a general guide:\n\n• 🌐 **Basic website** — from UGX 500,000\n• 📱 **Mobile app** — from UGX 2,000,000\n• 🎨 **Logo design** — from UGX 150,000\n• 🎓 **Computer training** — from UGX 100,000/session\n• 💰 **Loans** — flexible terms, discuss with our team\n\nFor an accurate quote, **book a free consultation** at `/booking` or call **+256 747 447 447**.",
  },
  // Location
  {
    patterns: [/where|location|address|find\s+you|office|kampala|kireka/i],
    answer:
      "📍 **Our Office:**\nKireka Kamuli C, Alongside Kamuli Road\n**Kampala, Uganda**\n\n🕐 **Working Hours:**\nMonday – Friday: 8:00 AM – 6:00 PM\nSaturday: 9:00 AM – 4:00 PM\n\nYou can also reach us online — we serve clients across Uganda and internationally!",
  },
  // Contact
  {
    patterns: [/contact|reach|call|email|phone|whatsapp|message/i],
    answer:
      "You can reach us through:\n\n📧 **Email:** techtroy28@gmail.com\n📞 **Phone:** +256 747 447 447\n📱 **WhatsApp:** +256 782 391 512\n📍 **Office:** Kireka Kamuli C, Kampala\n\nOr use our **Contact page** at `/contact` to send a message directly. We respond within 24 hours!",
  },
  // Team
  {
    patterns: [/team|staff|founder|who\s+(are|is)|people|employee|benjamin|owen|monic|irene/i],
    answer:
      "Meet the **TroyTech Team**:\n\n👨‍💻 **Benjamin Ikodit** — Founder & Lead Developer\n👨‍💻 **Ngobi Owen Albert** — Lead Developer\n💼 **Monic Arinaitwe** — Accountant\n📣 **Irene Asekenye** — Marketing Manager\n\nWe're a passionate team dedicated to delivering quality digital solutions across Uganda.",
  },
  // Projects / portfolio
  {
    patterns: [/project|portfolio|work|built|example|showcase|past/i],
    answer:
      "Here are some of our notable projects:\n\n🏦 **Online Banking System** — Next.js + Node.js + PostgreSQL\n🗳️ **Election Data Collection App** — React + Mobile + API\n🛒 **E-commerce Website** — Next.js + Stripe + Tailwind\n🎬 **Movie Website** — Next.js + Prisma\n📈 **Investment System** — Next.js + PostgreSQL\n🏫 **School Management System** — React + MongoDB\n\nView all projects at `/projects`!",
  },
  // Booking / consultation
  {
    patterns: [/book|appointment|consult|meeting|schedule|call|demo/i],
    answer:
      "📅 **Book a Free Consultation!**\n\nVisit our booking page at `/booking` to:\n1. Select your service\n2. Choose your budget range\n3. Pick a date & time\n4. Enter your details\n\nWe'll confirm via **WhatsApp** within minutes. Alternatively, call us directly on **+256 747 447 447**.",
  },
  // Working hours
  {
    patterns: [/hour|open|close|time|when|available|schedule/i],
    answer:
      "🕐 **TroyTech Working Hours:**\n\n• Monday – Friday: **8:00 AM – 6:00 PM**\n• Saturday: **9:00 AM – 4:00 PM**\n• Sunday: Closed\n\nFor urgent matters, reach us on WhatsApp at **+256 782 391 512** — we try to respond even outside hours!",
  },
  // Technologies
  {
    patterns: [/tech(nolog|stack)?|framework|language|tool|react|next|node|postgres/i],
    answer:
      "Our **Technology Stack** includes:\n\n**Frontend:** React, Next.js, Tailwind CSS, TypeScript\n**Backend:** Node.js, Express, Prisma\n**Databases:** PostgreSQL, MongoDB\n**Mobile:** React Native\n**Design:** Figma, Adobe Suite\n**Cloud:** Vercel, AWS\n\nWe choose the best tools for each project to ensure performance, scalability, and maintainability.",
  },
  // Support
  {
    patterns: [/support|help|assist|problem|issue|fix|maintain/i],
    answer:
      "We offer **ongoing support & maintenance** for all our projects:\n\n• 🔧 Bug fixes & updates\n• 📊 Performance monitoring\n• 🔒 Security patches\n• 📞 Technical support via phone/WhatsApp\n• 🖥️ Remote & on-site assistance\n\nContact us at **techtroy28@gmail.com** or **+256 747 447 447** for support.",
  },
  // Thanks / goodbye
  {
    patterns: [/thank|thanks|bye|goodbye|see\s+you|great|awesome|perfect|helpful/i],
    answer:
      "You're welcome! 😊 It was a pleasure helping you. If you have more questions, feel free to ask anytime.\n\n📞 **+256 747 447 447**\n📧 **techtroy28@gmail.com**\n\nHave a great day! 🚀",
  },
];

const FALLBACK =
  "I'm not sure about that specific question. Here's how you can get the right answer:\n\n📞 **Call us:** +256 747 447 447\n📧 **Email:** techtroy28@gmail.com\n💬 **WhatsApp:** +256 782 391 512\n\nOr try asking about: *services, pricing, loans, location, team, booking, or contact*.";

const SUGGESTIONS = [
  "What services do you offer?",
  "How much does a website cost?",
  "Tell me about your loans",
  "Where are you located?",
  "How do I book a consultation?",
  "Who is on your team?",
];

/* ─── Types ─────────────────────────────────────────────────────────────── */

interface Message {
  id: number;
  role: "bot" | "user";
  text: string;
  time: string;
}

/* ─── Helpers ───────────────────────────────────────────────────────────── */

function getAnswer(input: string): string {
  const trimmed = input.trim();
  for (const entry of KB) {
    if (entry.patterns.some((p) => p.test(trimmed))) {
      return entry.answer;
    }
  }
  return FALLBACK;
}

function formatTime() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function renderMarkdown(text: string) {
  // Bold **text**
  let html = text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  // Line breaks
  html = html.replace(/\n/g, "<br/>");
  return html;
}

/* ─── Component ─────────────────────────────────────────────────────────── */

export default function ChatBot() {
  const [open, setOpen]         = useState(false);
  const [minimized, setMin]     = useState(false);
  const [input, setInput]       = useState("");
  const [typing, setTyping]     = useState(false);
  const [unread, setUnread]     = useState(1);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "bot",
      text: "👋 Hi! I'm **TroyBot**, your TroyTech assistant. Ask me anything about our IT services, loans, pricing, team, or location!",
      time: formatTime(),
    },
  ]);

  const bottomRef  = useRef<HTMLDivElement>(null);
  const inputRef   = useRef<HTMLInputElement>(null);
  const msgCounter = useRef(2);

  // Scroll to bottom on new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  // Focus input when opened
  useEffect(() => {
    if (open && !minimized) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setUnread(0);
    }
  }, [open, minimized]);

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMsg: Message = {
      id: msgCounter.current++,
      role: "user",
      text: trimmed,
      time: formatTime(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    // Simulate bot thinking delay
    setTimeout(() => {
      const botMsg: Message = {
        id: msgCounter.current++,
        role: "bot",
        text: getAnswer(trimmed),
        time: formatTime(),
      };
      setMessages((prev) => [...prev, botMsg]);
      setTyping(false);
      if (!open) setUnread((n) => n + 1);
    }, 800 + Math.random() * 400);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <>
      {/* ── Floating trigger button ──────────────────────────────────── */}
      <button
        onClick={() => { setOpen(true); setMin(false); setUnread(0); }}
        aria-label="Open chat"
        className={`fixed bottom-6 right-6 z-[9999] h-14 w-14 rounded-full flex items-center justify-center
          bg-gradient-to-br from-[#06B6DA] to-[#0891b2]
          shadow-[0_0_0_4px_rgba(6,182,212,0.2),0_8px_32px_rgba(6,182,212,0.45)]
          hover:scale-110 hover:shadow-[0_0_0_6px_rgba(6,182,212,0.25),0_12px_40px_rgba(6,182,212,0.6)]
          active:scale-95 transition-all duration-300
          ${open ? "opacity-0 pointer-events-none scale-75" : "opacity-100 scale-100"}`}
      >
        <MessageCircle className="h-6 w-6 text-white" strokeWidth={2} />
        {unread > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center animate-bounce">
            {unread}
          </span>
        )}
      </button>

      {/* ── Chat window ──────────────────────────────────────────────── */}
      <div
        className={`fixed bottom-6 right-6 z-[9999] flex flex-col
          w-[360px] sm:w-[380px]
          rounded-2xl overflow-hidden
          bg-[#0F172A] border border-cyan-500/20
          shadow-[0_0_0_1px_rgba(6,182,212,0.1),0_24px_60px_rgba(0,0,0,0.6)]
          transition-all duration-300 ease-out origin-bottom-right
          ${open ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-90 translate-y-4 pointer-events-none"}
          ${minimized ? "h-[64px]" : "h-[560px] max-h-[80vh]"}`}
      >
        {/* ── Header ─────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-[#06B6DA]/20 to-[#0891b2]/10 border-b border-cyan-500/15 shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative h-9 w-9 rounded-full bg-gradient-to-br from-[#06B6DA] to-[#0891b2] flex items-center justify-center shadow-[0_0_12px_rgba(6,182,212,0.5)]">
              <Bot className="h-5 w-5 text-white" />
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-400 border-2 border-[#0F172A]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white leading-none">TroyBot</p>
              <p className="text-xs text-emerald-400 mt-0.5">Online · TroyTech Assistant</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setMin((m) => !m)}
              className="h-7 w-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200"
              aria-label="Minimize"
            >
              <Minimize2 className="h-4 w-4" />
            </button>
            <button
              onClick={() => setOpen(false)}
              className="h-7 w-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {!minimized && (
          <>
            {/* ── Messages ─────────────────────────────────────────────── */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-cyan-500/20">

              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  {/* Avatar */}
                  <div className={`shrink-0 h-7 w-7 rounded-full flex items-center justify-center mt-0.5
                    ${msg.role === "bot"
                      ? "bg-gradient-to-br from-[#06B6DA] to-[#0891b2] shadow-[0_0_8px_rgba(6,182,212,0.4)]"
                      : "bg-[#1e293b] border border-cyan-500/20"}`}
                  >
                    {msg.role === "bot"
                      ? <Bot className="h-3.5 w-3.5 text-white" />
                      : <User className="h-3.5 w-3.5 text-cyan-400" />}
                  </div>

                  {/* Bubble */}
                  <div className={`max-w-[78%] ${msg.role === "user" ? "items-end" : "items-start"} flex flex-col gap-1`}>
                    <div
                      className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed
                        ${msg.role === "bot"
                          ? "bg-[#1e293b] text-gray-200 rounded-tl-sm border border-cyan-500/10"
                          : "bg-gradient-to-br from-[#06B6DA] to-[#0891b2] text-white rounded-tr-sm shadow-[0_0_12px_rgba(6,182,212,0.3)]"}`}
                      dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.text) }}
                    />
                    <span className="text-[10px] text-gray-600 px-1">{msg.time}</span>
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {typing && (
                <div className="flex gap-2.5">
                  <div className="shrink-0 h-7 w-7 rounded-full bg-gradient-to-br from-[#06B6DA] to-[#0891b2] flex items-center justify-center shadow-[0_0_8px_rgba(6,182,212,0.4)]">
                    <Bot className="h-3.5 w-3.5 text-white" />
                  </div>
                  <div className="bg-[#1e293b] border border-cyan-500/10 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-bounce"
                        style={{ animationDelay: `${i * 150}ms` }}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* ── Quick suggestions ─────────────────────────────────────── */}
            {messages.length <= 2 && (
              <div className="px-4 pb-3 flex flex-wrap gap-1.5 shrink-0">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => sendMessage(s)}
                    className="text-xs px-2.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/20 text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-500/50 hover:text-white transition-all duration-200"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* ── Input ────────────────────────────────────────────────── */}
            <div className="px-4 pb-4 pt-2 border-t border-cyan-500/10 shrink-0">
              <div className="flex items-center gap-2 bg-[#020617] border border-cyan-500/20 rounded-xl px-3 py-2 focus-within:border-cyan-500/50 focus-within:shadow-[0_0_12px_rgba(6,182,212,0.1)] transition-all duration-200">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-transparent text-sm text-white placeholder:text-gray-600 focus:outline-none"
                />
                <button
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim() || typing}
                  className={`h-8 w-8 rounded-lg flex items-center justify-center transition-all duration-200
                    ${input.trim() && !typing
                      ? "bg-[#06B6DA] text-white shadow-[0_0_10px_rgba(6,182,212,0.4)] hover:brightness-110 hover:scale-105 active:scale-95"
                      : "bg-gray-800 text-gray-600 cursor-not-allowed"}`}
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
              <p className="text-center text-[10px] text-gray-600 mt-2">
                Powered by TroyTech · <a href="/contact" className="text-cyan-500/70 hover:text-cyan-400 transition-colors">Contact us</a>
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
}
