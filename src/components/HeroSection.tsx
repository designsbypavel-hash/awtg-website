import { Link } from 'react-router-dom'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center bg-[#f8fafc] overflow-hidden pt-18">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(34,141,193,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(34,141,193,0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />
      {/* Glow */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#228DC1]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-[#228DC1]/20 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-24">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-[#228DC1]/10 border border-[#228DC1]/30 rounded-full px-4 py-1.5 mb-8">
            <span className="w-2 h-2 bg-[#228DC1] rounded-full animate-pulse" />
            <span className="text-[#228DC1] text-sm font-medium">Next-Generation Telecoms Solutions</span>
          </div>

          <h1 className="font-serif-display text-[#0a1628] mb-6">
            Connecting the <span className="text-[#228DC1]">Future</span> of Enterprise Networks
          </h1>

          <p className="text-[18px] text-[#0a1628]/65 leading-[1.7] mb-10 max-w-2xl">
            AWTG delivers cutting-edge 5G, AI, and private network solutions that empower businesses and governments to thrive in an increasingly connected world.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/solutions"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#228DC1] text-white font-semibold hover:bg-[#1a6e99] transition-colors text-[16px]"
            >
              Explore Solutions
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-8 py-4 border border-gray-200 text-[#0a1628]/70 font-semibold hover:border-[#228DC1]/40 hover:bg-[#228DC1]/5 transition-colors text-[16px]"
            >
              About AWTG
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
    </section>
  )
}
