import CTASection from '@/components/CTASection'
import { Link } from 'react-router-dom'

const solutions = [
  { title: 'Hospital Private Networks', desc: 'Dedicated on-premises 5G and Wi-Fi 6E networks providing reliable, low-latency connectivity across wards, theatres and clinical environments.' },
  { title: 'Remote Patient Monitoring IoT', desc: 'Secure IoT infrastructure enabling continuous patient monitoring at home, reducing hospital admissions and supporting virtual ward programmes.' },
  { title: 'Medical Device Connectivity', desc: 'Certified wireless integration for medical devices including infusion pumps, imaging systems and point-of-care diagnostics across clinical networks.' },
  { title: 'Clinical AI Platforms', desc: 'AI-assisted diagnostic tooling, workflow automation and predictive patient flow systems designed for NHS operational environments.' },
  { title: 'Secure Data Infrastructure', desc: 'DSPT-compliant data architecture, network segmentation and encrypted communications protecting patient data across integrated care systems.' },
  { title: 'Digital Ward Transformation', desc: 'End-to-end digital ward programmes covering electronic patient records connectivity, nurse call systems and real-time location services.' },
]

export default function IndustriesHealthTechPage() {
  return (
    <>
      <section className="pt-32 pb-20 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#228DC1] mb-4">Industries</p>
          <h1
            className="font-serif-display text-[#0a1628] leading-tight mb-6"
            style={{ fontSize: 'clamp(40px,5vw,72px)' }}
          >
            Health Tech
          </h1>
          <p className="text-[#0a1628]/60 text-lg max-w-2xl font-normal leading-relaxed">
            Supporting NHS trusts and healthcare organisations with secure, DSPT-compliant digital infrastructure: from hospital private networks to clinical AI platforms and remote patient monitoring.
          </p>
        </div>
      </section>

      <section className="bg-[#f8fafc] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-8 lg:px-12 py-12 grid grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-[#0a1628] text-3xl font-semibold mb-1">20+</p>
            <p className="text-[#0a1628]/65 text-sm font-normal uppercase tracking-widest">NHS Trusts</p>
          </div>
          <div>
            <p className="text-[#0a1628] text-3xl font-semibold mb-1">DSPT</p>
            <p className="text-[#0a1628]/65 text-sm font-normal uppercase tracking-widest">Compliant</p>
          </div>
          <div>
            <p className="text-[#0a1628] text-3xl font-semibold mb-1">99.99%</p>
            <p className="text-[#0a1628]/65 text-sm font-normal uppercase tracking-widest">Uptime SLA</p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <h2
            className="font-serif-display text-[#0a1628] mb-4"
            style={{ fontSize: 'clamp(28px,3vw,42px)' }}
          >
            Solutions for Health Tech
          </h2>
          <p className="text-[#0a1628]/75 mb-12 max-w-2xl font-normal">
            AWTG combines clinical environment expertise with enterprise-grade wireless and AI capability to accelerate the NHS digital agenda, safely, securely and at scale.
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
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#228DC1] mb-3">Compliance</p>
            <p className="text-[#0a1628] text-xl font-normal leading-relaxed max-w-3xl">
              All AWTG health technology deployments are delivered in full compliance with the NHS Data Security and Protection Toolkit (DSPT), with 99.99% uptime SLAs and defined incident response procedures aligned to NHS England standards.
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
