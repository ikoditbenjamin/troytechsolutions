import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "IT Services in Kampala Uganda | TroyTech Solutions",
  description:
    "TroyTech Solutions in Kampala, Uganda offers IT security, software & app development, graphics design, computer training, CCTV installation, network setup, and printing services.",
  keywords: [
    "IT services Uganda",
    "IT services Kampala",
    "software development Uganda",
    "software development Kampala",
    "web development Uganda",
    "web development Kampala",
    "app development Uganda",
    "mobile app developer Uganda",
    "CCTV installation Uganda",
    "CCTV installation Kampala",
    "network setup Uganda",
    "computer training Uganda",
    "computer training Kampala",
    "IT security Uganda",
    "cybersecurity Uganda",
    "graphics design Uganda",
    "graphics design Kampala",
    "logo design Uganda",
    "IT consultancy Uganda",
    "IT support Kampala",
    "data recovery Uganda",
    "computer repair Kampala",
    "printing services Kampala",
    "TroyTech services",
    "hire developer Uganda",
    "tech company services Uganda",
    "digital services Kampala Uganda",
    "IT solutions East Africa",
  ],
  alternates: {
    canonical: "https://www.troytech.xyz/services",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "IT Services in Kampala Uganda | TroyTech Solutions",
    description:
      "TroyTech Solutions in Kampala, Uganda offers IT security, software development, graphics design, computer training, CCTV installation, and network setup.",
    url: "https://www.troytech.xyz/services",
    siteName: "TroyTech Solutions",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "TroyTech Solutions IT Services Uganda" }],
    locale: "en_UG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IT Services in Kampala Uganda | TroyTech Solutions",
    description:
      "TroyTech Solutions in Kampala, Uganda offers IT security, software development, graphics design, computer training, and CCTV installation.",
    images: ["/og-image.png"],
  },
};

export default function ServicesSection() {
  const services = [
    {
      title: "IT Security & System Management",
      desc: "Protect your systems with secure networks, data protection, and reliable IT support.",
    },
    {
      title: "Software & App Development",
      desc: "We build modern websites and applications tailored to your business needs.",
    },
    {
      title: "Graphics & Digital Design",
      desc: "Create powerful brand identities with professional graphic design solutions.",
    },
    {
      title: "Computer Training",
      desc: "Gain practical digital skills through hands-on training programs.",
    },
    {
      title: "IT Consultancy",
      desc: "Get expert advice to improve your systems, operations, and digital strategy.",
    },
    {
      title: "CCTV & Network Setup",
      desc: "Professional CCTV installation and network configuration to keep your premises secure and connected.",
    },
  ];

  return (
    <section className="py-20 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
              Services
            </span>
          </h2>
          <p className="text-gray-400 mt-2 max-w-2xl mx-auto">
            We provide reliable IT solutions and training to help individuals
            and businesses grow in Kampala and across Uganda.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative rounded-2xl bg-[#1a1a1a] border border-orange-500/10 shadow-[0_4px_24px_rgba(0,0,0,0.5)] backdrop-blur-sm p-6 hover:-translate-y-1.5 hover:border-orange-500/40 hover:shadow-[0_8px_40px_rgba(249,115,22,0.12)] transition-all duration-300 ease-out"
            >
              {/* corner glow */}
              <div className="absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full bg-orange-500/5 blur-2xl pointer-events-none" />

              <h3 className="text-base font-semibold text-white group-hover:text-orange-400 transition-colors duration-300">
                {service.title}
              </h3>
              <p className="mt-2 text-gray-400 text-sm leading-relaxed">{service.desc}</p>

              {/* bottom accent */}
              <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-orange-500 to-amber-400 rounded-b-2xl transition-all duration-500 ease-out" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
