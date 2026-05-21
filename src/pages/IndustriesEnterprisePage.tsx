import CTASection from '@/components/CTASection'
import { Link } from 'react-router-dom'

const solutions = [
  { title: 'Private 5G and LTE Networks', desc: 'Campus-wide private wireless networks delivering guaranteed coverage, low latency and complete independence from public mobile networks for enterprise operations.' },
  { title: 'Industrial IoT Platforms', desc: 'Connected sensor and device management platforms providing real-time visibility across factories, warehouses, logistics estates and connected supply chains.' },
  { title: 'AI-Driven Operations', desc: 'Machine learning and intelligent automation for asset monitoring, predictive maintenance, energy management and operational workflow optimisation.' },
  { title: 'Digital Twin Integration', desc: 'Wireless infrastructure designed to feed real-time data into digital twin environments, enabling simulation, planning and remote operational oversight.' },
  { title: 'Secure Edge Computing', desc: 'On-premises compute and connectivity architectures that keep sensitive operational data local while enabling real-time processing at the network edge.' },
  { title: 'Cloud and Hybrid Networking', desc: 'Enterprise-grade SD-WAN, cloud connectivity and hybrid networking solutions integrating sites, data centres and cloud platforms into a unified managed estate.' },
]

export default function IndustriesEnterprisePage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <p className="type-label text-[#228DC1] mb-4">Industries</p>
          <h1 className="font-serif-display text-[#0a1628] mb-6">
            Enterprises and Connected Industries
          </h1>
          <p className="text-[#0a1628]/70 text-lg max-w-2xl font-normal leading-relaxed">
            Private wireless, AI and IoT solutions for enterprises operating at scale, from manufacturing and logistics to energy, utilities and connected campuses.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#f8fafc] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-8 lg:px-12 py-12 grid sm:grid-cols-3 gap-8">
          <div>
            <p className="font-black text-[#0a1628] mb-1" style={{ fontSize: '32px', lineHeight: 1.1, letterSpacing: '-0.02em' }}>500+</p>
            <p className="type-label text-[#0a1628]/60">Hectares of private network coverage delivered</p>
          </div>
          <div>
            <p className="font-black text-[#0a1628] mb-1" style={{ fontSize: '32px', lineHeight: 1.1, letterSpacing: '-0.02em' }}>40%</p>
            <p className="type-label text-[#0a1628]/60">Average productivity gain reported</p>
          </div>
          <div>
            <p className="font-black text-[#0a1628] mb-1" style={{ fontSize: '32px', lineHeight: 1.1, letterSpacing: '-0.02em' }}>20+</p>
            <p className="type-label text-[#0a1628]/60">Enterprise sectors served</p>
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <p className="type-label text-[#228DC1] mb-4">What we deliver</p>
          <h2 className="font-heading text-[#0a1628] mb-4">
            Solutions for enterprise connectivity
          </h2>
          <p className="text-[#0a1628]/65 mb-14 max-w-2xl font-normal text-[18px] leading-[1.7]">
            AWTG designs and deploys the wireless and AI infrastructure that enterprise organisations need to operate securely, efficiently and at scale.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-100 border border-gray-100">
            {solutions.map(s => (
              <div key={s.title} className="bg-white p-7 hover:bg-[#f7f8fa] transition-colors">
                <h3 className="font-card-heading text-[#0a1628] text-[15px] mb-2">{s.title}</h3>
                <p className="text-[#0a1628]/65 text-sm font-normal leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proof */}
      <section className="py-20 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="border-l-2 border-[#228DC1] pl-8">
            <p className="type-label text-[#228DC1] mb-3">Delivered at scale</p>
            <p className="text-[#0a1628]/80 text-xl font-normal leading-relaxed max-w-3xl">
              AWTG deployed a campus-wide private 5G network across 500 hectares for a major UK port operator, enabling autonomous vehicle coordination, real-time cargo tracking and digital twin integration, delivering a 40% productivity gain.
            </p>
            <Link
              to="/insights/case-studies"
              className="inline-flex items-center gap-2 mt-6 text-[#228DC1] text-sm font-semibold uppercase tracking-widest hover:opacity-70 transition-opacity"
            >
              View Case Studies
            </Link>
          </div>
        </div>
      </section>

      <CTASection
        title="Connect Your Enterprise"
        subtitle="Talk to our team about private wireless, AI and IoT solutions designed for your operational environment."
        primaryLabel="Get in Touch"
        primaryHref="/contact"
        secondaryLabel="View Our Solutions"
        secondaryHref="/solutions"
      />
    </>
  )
}
