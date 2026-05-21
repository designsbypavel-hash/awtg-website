import CTASection from '@/components/CTASection'
import { Link } from 'react-router-dom'

const solutions = [
  { title: 'Smart City Connectivity', desc: 'City-wide wireless infrastructure design and deployment: from sensor networks and connected streetlighting to integrated urban data platforms.' },
  { title: 'Emergency Services Networks', desc: 'Mission-critical communications design for police, fire and ambulance services, including ESMCP-aligned 4G/5G transitional architectures.' },
  { title: 'PSBA/ESMCP Programmes', desc: 'Specialist delivery support for the Emergency Services Mobile Communications Programme, covering integration, testing and programme assurance.' },
  { title: 'Digital Inclusion', desc: 'Connectivity programmes targeting underserved communities, rural broadband planning, and digital skills infrastructure for local authorities.' },
  { title: 'Secure Government Communications', desc: 'Design and implementation of classified and sensitive communications networks, compliant with government security policy frameworks.' },
  { title: 'Local Authority IoT', desc: 'IoT platform deployment for waste management, environmental monitoring, parking, and asset tracking across council estates and public spaces.' },
]

export default function IndustriesPublicSectorPage() {
  return (
    <>
      <section className="pt-32 pb-20 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#228DC1] mb-4">Industries</p>
          <h1
            className="font-serif-display text-[#0a1628] leading-tight mb-6"
           
          >
            Public Sector
          </h1>
          <p className="text-[#0a1628]/60 text-lg max-w-2xl font-normal leading-relaxed">
            Trusted technology partner to central and local government, delivering secure, compliant and future-ready connectivity and digital infrastructure across the UK public sector.
          </p>
        </div>
      </section>

      <section className="bg-[#f8fafc] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-8 lg:px-12 py-12 grid grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-[#0a1628] text-3xl font-semibold mb-1">50+</p>
            <p className="text-[#0a1628]/65 text-sm font-normal uppercase tracking-widest">Public Sector Clients</p>
          </div>
          <div>
            <p className="text-[#0a1628] text-3xl font-semibold mb-1">CCS</p>
            <p className="text-[#0a1628]/65 text-sm font-normal uppercase tracking-widest">Crown Commercial Supplier</p>
          </div>
          <div>
            <p className="text-[#0a1628] text-3xl font-semibold mb-1">SC</p>
            <p className="text-[#0a1628]/65 text-sm font-normal uppercase tracking-widest">Cleared Personnel</p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <h2
            className="font-serif-display text-[#0a1628] mb-4"
           
          >
            Solutions for Public Sector
          </h2>
          <p className="text-[#0a1628]/75 mb-12 max-w-2xl font-normal">
            As a Crown Commercial Supplier with SC-cleared engineers, AWTG is fully accredited to support sensitive government programmes and public service infrastructure delivery.
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
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#228DC1] mb-3">Framework Status</p>
            <p className="text-[#0a1628] text-xl font-normal leading-relaxed max-w-3xl">
              AWTG is a Crown Commercial Supplier, enabling public sector bodies to procure our services directly under compliant framework agreements, reducing procurement timelines and administrative overhead.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 mt-6 text-[#228DC1] text-sm font-semibold uppercase tracking-widest hover:opacity-70 transition-opacity"
            >
              About AWTG
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
