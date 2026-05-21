import CTASection from '@/components/CTASection'
import { Link } from 'react-router-dom'

const solutions = [
  { title: 'Tactical Private 5G', desc: 'Rapidly deployable, hardened 5G private networks for tactical operations, providing high-throughput, low-latency communications in contested and austere environments.' },
  { title: 'Secure Mesh Networking', desc: 'Self-healing mesh network architectures delivering resilient communications across distributed nodes without reliance on fixed infrastructure.' },
  { title: 'Battlefield IoT', desc: 'Ruggedised IoT sensor integration for situational awareness, asset tracking, environmental monitoring and force protection across operational theatres.' },
  { title: 'Encrypted Communications', desc: 'End-to-end encrypted voice, data and video communications platforms designed and validated for defence security classifications.' },
  { title: 'ISR Data Platforms', desc: 'Intelligence, Surveillance and Reconnaissance data infrastructure, processing, fusing and distributing multi-sensor data to operational decision-makers.' },
  { title: 'NATO-Compatible Infrastructure', desc: 'Network architecture and protocol design aligned with NATO STANAG standards, enabling interoperability with allied forces and coalition operations.' },
]

export default function IndustriesDefencePage() {
  return (
    <>
      <section className="pt-32 pb-20 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#228DC1] mb-4">Industries</p>
          <h1
            className="font-serif-display text-[#0a1628] leading-tight mb-6"
           
          >
            Defence
          </h1>
          <p className="text-[#0a1628]/60 text-lg max-w-2xl font-normal leading-relaxed">
            Secure, mission-critical communications and private network solutions for defence, delivered by SC and DV cleared engineers with proven experience across MOD programmes and NATO-aligned environments.
          </p>
        </div>
      </section>

      <section className="bg-[#f8fafc] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-8 lg:px-12 py-12 grid grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-[#0a1628] text-3xl font-semibold mb-1">MOD</p>
            <p className="text-[#0a1628]/65 text-sm font-normal uppercase tracking-widest">Approved Supplier</p>
          </div>
          <div>
            <p className="text-[#0a1628] text-3xl font-semibold mb-1">SC/DV</p>
            <p className="text-[#0a1628]/65 text-sm font-normal uppercase tracking-widest">Cleared Staff</p>
          </div>
          <div>
            <p className="text-[#0a1628] text-3xl font-semibold mb-1">15+</p>
            <p className="text-[#0a1628]/65 text-sm font-normal uppercase tracking-widest">Defence Deployments</p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <h2
            className="font-serif-display text-[#0a1628] mb-4"
           
          >
            Solutions for Defence
          </h2>
          <p className="text-[#0a1628]/75 mb-12 max-w-2xl font-normal">
            AWTG brings together classified-environment expertise, SC and DV cleared engineering capability, and cutting-edge private 5G technology to support the UK defence sector's most demanding connectivity requirements.
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
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#228DC1] mb-3">Security Clearance</p>
            <p className="text-[#0a1628] text-xl font-normal leading-relaxed max-w-3xl">
              AWTG is an MOD approved supplier with SC and DV cleared engineers available for classified programme delivery, ensuring continuity, security compliance and trusted access across the full project lifecycle.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 mt-6 text-[#228DC1] text-sm font-semibold uppercase tracking-widest hover:opacity-70 transition-opacity"
            >
              Contact Defence Team
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
