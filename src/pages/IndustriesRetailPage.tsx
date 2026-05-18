import CTASection from '@/components/CTASection'
import { Link } from 'react-router-dom'

const solutions = [
  { title: 'In-Store Private 5G and Wi-Fi', desc: 'Dedicated store connectivity delivering reliable coverage for staff devices, point-of-sale systems, inventory scanners and customer guest Wi-Fi.' },
  { title: 'Inventory Management IoT', desc: 'RFID and sensor-based inventory tracking platforms providing real-time stock visibility across warehouse, stockroom and shop floor environments.' },
  { title: 'Customer Analytics AI', desc: 'Footfall analysis, dwell-time measurement and customer journey AI tools enabling data-driven merchandising and store layout optimisation.' },
  { title: 'Digital Signage Networks', desc: 'Managed connectivity and content distribution infrastructure for dynamic digital signage across single-site and multi-store retail estates.' },
  { title: 'Click-and-Collect Automation', desc: 'IoT and wireless infrastructure supporting automated locker systems, curbside collection notifications and fulfilment workflow integration.' },
  { title: 'Loss Prevention Technology', desc: 'AI-powered video analytics, electronic article surveillance integration and network-connected alert systems to reduce shrinkage and improve store security.' },
]

export default function IndustriesRetailPage() {
  return (
    <>
      <section className="pt-32 pb-20 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#228DC1] mb-4">Industries</p>
          <h1
            className="font-serif-display text-[#0a1628] leading-tight mb-6"
            style={{ fontSize: 'clamp(40px,5vw,72px)' }}
          >
            Retail
          </h1>
          <p className="text-[#0a1628]/60 text-lg max-w-2xl font-normal leading-relaxed">
            Omnichannel connectivity and AI solutions for retailers, driving operational efficiency, customer insight and sales performance across physical and digital store environments.
          </p>
        </div>
      </section>

      <section className="bg-[#f8fafc] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-8 lg:px-12 py-12 grid grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-[#0a1628] text-3xl font-semibold mb-1">25+</p>
            <p className="text-[#0a1628]/65 text-sm font-normal uppercase tracking-widest">Retail Clients</p>
          </div>
          <div>
            <p className="text-[#0a1628] text-3xl font-semibold mb-1">200+</p>
            <p className="text-[#0a1628]/65 text-sm font-normal uppercase tracking-widest">Store Deployments</p>
          </div>
          <div>
            <p className="text-[#0a1628] text-3xl font-semibold mb-1">15%</p>
            <p className="text-[#0a1628]/65 text-sm font-normal uppercase tracking-widest">Avg. Sales Uplift Reported</p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <h2
            className="font-serif-display text-[#0a1628] mb-4"
            style={{ fontSize: 'clamp(28px,3vw,42px)' }}
          >
            Solutions for Retail
          </h2>
          <p className="text-[#0a1628]/75 mb-12 max-w-2xl font-normal">
            AWTG helps retailers compete in a connected world, deploying the wireless infrastructure and AI analytics that improve margins, customer experience and operational resilience.
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
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#228DC1] mb-3">Commercial Impact</p>
            <p className="text-[#0a1628] text-xl font-normal leading-relaxed max-w-3xl">
              Across more than 200 store deployments, AWTG clients have reported an average 15% uplift in sales attributed to improved in-store connectivity, AI-driven merchandising insights and frictionless omnichannel fulfilment.
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
