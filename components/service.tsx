export default function ServicesSection() {
  const services = [
    { title: "IT Security & System Management",  desc: "Protect your systems with secure networks, data protection, and reliable IT support." },
    { title: "Software & App Development",        desc: "We build modern websites and applications tailored to your business needs." },
    { title: "Graphics & Digital Design",         desc: "Create powerful brand identities with professional graphic design solutions." },
    { title: "Computer Training",                 desc: "Gain practical digital skills through hands-on training programs." },
    { title: "IT Consultancy",                    desc: "Get expert advice to improve your systems, operations, and digital strategy." },
    { title: "CCTV & Network Setup",              desc: "Professional CCTV installation and network configuration to keep your premises secure." },
  ];

  return (
    <section className="relative bg-[#0a0a0a] border-t border-orange-500/10 py-20 overflow-hidden transition-colors duration-300">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 50% 60% at 0% 50%, rgba(249,115,22,0.06) 0%, transparent 70%)" }} />
      <div className="relative max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-xs font-mono font-semibold text-orange-400 tracking-widest uppercase mb-3">
            What We Do
          </p>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
              Services
            </span>
          </h2>
          <p className="text-gray-400 mt-3 max-w-2xl mx-auto">
            We provide reliable IT solutions and training to help individuals
            and businesses grow in Kampala and across Uganda.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative rounded-2xl bg-[#1a1a1a] border border-orange-500/10 shadow-[0_4px_24px_rgba(0,0,0,0.5)] backdrop-blur-sm p-6 hover:-translate-y-1.5 hover:border-orange-500/40 hover:shadow-[0_8px_40px_rgba(249,115,22,0.12)] transition-all duration-300 ease-out overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full bg-orange-500/5 blur-2xl pointer-events-none" />
              <h3 className="text-base font-semibold text-white group-hover:text-orange-400 transition-colors duration-300">
                {service.title}
              </h3>
              <p className="mt-2 text-gray-400 text-sm leading-relaxed">{service.desc}</p>
              <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-orange-500 to-amber-400 rounded-b-2xl transition-all duration-500 ease-out" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
