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
      title: "Loan & Financial Services",
      desc: "Access flexible and reliable financial support to grow your business.",
    },
  ];

  return (
    <section className="py-20 bg-[#020b18]">
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
              Services
            </span>
          </h2>
          <p className="text-gray-400 mt-2 max-w-2xl mx-auto">
            We provide reliable IT solutions, training, and financial services to help individuals
            and businesses grow in Kampala and across Uganda.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative rounded-2xl bg-[#0F172A] border border-cyan-500/10 shadow-[0_4px_24px_rgba(0,0,0,0.4)] backdrop-blur-sm p-6 hover:-translate-y-1.5 hover:border-cyan-500/40 hover:shadow-[0_8px_40px_rgba(6,182,218,0.12)] transition-all duration-300 ease-out"
            >
              {/* corner glow */}
              <div className="absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full bg-cyan-500/5 blur-2xl pointer-events-none" />

              <h3 className="text-base font-semibold text-white group-hover:text-cyan-400 transition-colors duration-300">
                {service.title}
              </h3>
              <p className="mt-2 text-gray-400 text-sm leading-relaxed">{service.desc}</p>

              {/* bottom accent */}
              <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-b-2xl transition-all duration-500 ease-out" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
