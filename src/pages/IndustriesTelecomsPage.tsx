import CTASection from '@/components/CTASection'
import { Link } from 'react-router-dom'

const solutions = [
  { title: 'MNO Network Optimisation with AI', desc: 'Machine-learning-driven radio optimisation, predictive fault detection and automated capacity management for mobile network operators.' },
  { title: 'MVNO Platform Enablement', desc: 'End-to-end MVNO launch and operational support: from core network integration to BSS provisioning and billing platform configuration.' },
  { title: 'Tower Company Automation', desc: 'Automated site management, energy monitoring and remote infrastructure control for towercos managing large passive infrastructure portfolios.' },
  { title: 'Spectrum Management', desc: 'Advisory and tooling for spectrum acquisition, interference analysis and regulatory compliance across licensed and shared spectrum bands.' },
  { title: 'RAN Modernisation', desc: 'Vendor-neutral consultancy and delivery for Open RAN deployments, legacy RAN transformation and multi-vendor integration programmes.' },
  { title: 'OSS/BSS Integration', desc: 'Systems integration services connecting operational and business support systems to enable end-to-end service assurance and revenue management.' },
]

export default function IndustriesTelecomsPage() {
  return (
    <>
      <section className="pt-32 pb-20 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#228DC1] mb-4">Industries</p>
          <h1
            className="font-serif-display text-[#0a1628] leading-tight mb-6"
           
          >
            Telecommunications
          </h1>
          <p className="text-[#0a1628]/60 text-lg max-w-2xl font-normal leading-relaxed">
            Deep technical expertise serving MNOs, MVNOs and infrastructure vendors: from network AI and RAN modernisation to OSS/BSS integration and spectrum strategy.
          </p>
        </div>
      </section>

      <section className="bg-[#f8fafc] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-8 lg:px-12 py-12 grid grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-[#0a1628] text-3xl font-semibold mb-1">15+</p>
            <p className="text-[#0a1628]/65 text-sm font-normal uppercase tracking-widest">MNO Clients</p>
          </div>
          <div>
            <p className="text-[#0a1628] text-3xl font-semibold mb-1">40+</p>
            <p className="text-[#0a1628]/65 text-sm font-normal uppercase tracking-widest">RF Engineers</p>
          </div>
          <div>
            <p className="text-[#0a1628] text-3xl font-semibold mb-1">30</p>
            <p className="text-[#0a1628]/65 text-sm font-normal uppercase tracking-widest">Countries</p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <h2
            className="font-serif-display text-[#0a1628] mb-4"
           
          >
            Solutions for Telecoms
          </h2>
          <p className="text-[#0a1628]/75 mb-12 max-w-2xl font-normal">
            From greenfield network builds to incumbent transformation, AWTG delivers proven telecoms solutions across the full operator lifecycle.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutions.map(s => (
              <div key={s.title} className="p-6 border border-gray-100 hover:border-[#228DC1]/30 transition-colors">
                <h3 className="font-semibold text-[#0a1628] mb-2">{s.title}</h3>
                <p className="text-[#0a1628]/75 text-sm font-normal leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="border-l-2 border-[#228DC1] pl-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#228DC1] mb-3">Case Highlight</p>
            <p className="text-[#0a1628] text-xl font-normal leading-relaxed max-w-3xl">
              "Network AI for a Tier-1 UK MNO. 35% reduction in OPEX delivered through automated fault correlation and predictive maintenance across 12,000 cell sites."
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

      <CTASection />
    </>
  )
}
