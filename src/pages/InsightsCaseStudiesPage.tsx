import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import CTASection from '@/components/CTASection'

// ── Featured clients — hero treatment ──────────────────────────────────────
const featured = [
  {
    client: 'British Council',
    tag: 'Enterprise AI: Live in Production',
    outcome: 'AI handling learner support at scale. Customer satisfaction up. Escalations down.',
    desc: 'British Council English Online needed to handle a high volume of learner enquiries without scaling their support team. AWTG deployed Kai, our enterprise AI platform, directly into their systems. It now handles the bulk of interactions in production, reduces escalations, and tracks satisfaction in real time.',
    deliverable: 'Kai: Enterprise AI Platform',
    sector: 'AI / Enterprise',
  },
]

// ── Supporting case studies ─────────────────────────────────────────────────
const supporting = [
  {
    client: 'Major UK Port Operator',
    title: 'Private 5G across 500 hectares of port estate',
    sector: 'Logistics',
    stat: '40%',
    statLabel: 'Productivity gain',
    desc: 'Campus-wide private 5G enabling autonomous vehicle coordination, real-time cargo tracking and digital twin integration across quayside and warehouse operations.',
  },
  {
    client: 'Large NHS Acute Trust',
    title: 'Digital ward transformation across 1,200 beds',
    sector: 'Health Tech',
    stat: '60%',
    statLabel: 'Reduction in admin time',
    desc: 'Ward-level private network and IoT monitoring replacing paper-based observation rounds with continuous real-time vital signs data for nursing and clinical teams.',
  },
  {
    client: 'Bristol City Council',
    title: 'AI-controlled traffic management across 42 routes',
    sector: 'Public Sector',
    stat: '25%',
    statLabel: 'Congestion reduction',
    desc: 'End-to-end smart traffic management system with AI signal optimisation, IoT environmental sensors and a city operations dashboard reducing journey times city-wide.',
  },
  {
    client: 'Tier-1 UK Mobile Network Operator',
    title: 'AI network operations across 12,000 cell sites',
    sector: 'Telecoms',
    stat: '35%',
    statLabel: 'OPEX reduction',
    desc: 'AI-driven network operations centre with automated fault correlation, predictive maintenance and capacity forecasting across a national mobile network.',
  },
  {
    client: 'UK Ministry of Defence',
    title: 'SC-cleared private LTE for defence training estate',
    sector: 'Defence',
    stat: '100%',
    statLabel: 'Mission-critical uptime',
    desc: 'Air-gapped private LTE network for a UK MoD training facility, meeting the highest security, resilience and latency requirements for mission-critical communications.',
  },
  {
    client: 'National Retail Group',
    title: 'IoT and analytics platform across 280 stores',
    sector: 'Retail',
    stat: '18%',
    statLabel: 'Shrinkage reduction',
    desc: 'IoT sensor network and real-time analytics platform delivering stock visibility, footfall analytics and loss prevention insights across a national retail estate.',
  },
]

export default function InsightsCaseStudiesPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <p className="type-label text-[#228DC1] mb-4">Insights</p>
          <h1 className="font-serif-display text-[#0a1628] mb-6">
            Case Studies
          </h1>
          <p className="text-[#0a1628]/70 text-[18px] max-w-xl font-normal leading-[1.7]">
            Real outcomes delivered for real clients. AI, private networks, smart infrastructure and digital transformation. Built, deployed and measured.
          </p>
        </div>
      </section>

      {/* Featured */}
      <section className="bg-[#f8fafc] border-t border-gray-100 pb-0">
        <div className="max-w-7xl mx-auto px-8 lg:px-12 pb-0">
          <div className="grid gap-px bg-[#0a1628]/5">
            {featured.map((f, i) => (
              <div key={f.client} className="bg-[#f8fafc] p-10 flex flex-col justify-between hover:bg-[#0f2347] transition-colors">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <p className="type-label text-[#228DC1]">{f.tag}</p>
                    <span className="type-label text-[#0a1628]/60">0{i + 1}</span>
                  </div>
                  {/* Client name — the hero */}
                  <p className="font-black text-[#0a1628] mb-2" style={{ fontSize: '32px', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                    {f.client}
                  </p>
                  {/* Scannable outcome */}
                  <p className="text-[#228DC1] font-semibold text-[18px] leading-[1.3] mb-5">
                    {f.outcome}
                  </p>
                  <p className="text-[#0a1628]/60 text-[14px] font-normal leading-[1.7]">
                    {f.desc}
                  </p>
                </div>
                <div className="mt-8 flex items-center justify-between border-t border-gray-100 pt-6">
                  <span className="text-[#0a1628]/65 text-xs font-normal">{f.deliverable}</span>
                  <Link to="/contact" className="type-label text-[#228DC1] hover:text-white transition-colors flex items-center gap-2">
                    Discuss a similar project <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supporting case studies */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <p className="type-label text-[#0a1628]/60 mb-10">More projects</p>
          <div className="space-y-px bg-gray-100 border border-gray-100">
            {supporting.map(cs => (
              <div
                key={cs.title}
                className="bg-white grid lg:grid-cols-[1fr_auto] gap-8 p-8 hover:bg-[#f7f8fa] transition-colors"
              >
                <div className="grid lg:grid-cols-[200px_1fr] gap-6">
                  {/* Client name — prominent */}
                  <div>
                    <p className="font-bold text-[#0a1628] text-[16px] leading-[1.3] mb-1">{cs.client}</p>
                    <span className="type-label text-[#228DC1]">{cs.sector}</span>
                  </div>
                  <div>
                    <h2 className="font-card-heading text-[#0a1628] text-[15px] mb-2">{cs.title}</h2>
                    <p className="text-[#0a1628]/60 text-[14px] font-normal leading-[1.7]">{cs.desc}</p>
                  </div>
                </div>
                {/* Stat */}
                <div className="flex flex-col justify-center items-end min-w-[100px]">
                  <p className="font-black text-[#228DC1]" style={{ fontSize: 'clamp(22px, 2.5vw, 32px)', letterSpacing: '-0.02em' }}>{cs.stat}</p>
                  <p className="type-label text-[#0a1628]/60 text-right mt-1">{cs.statLabel}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="See What We Can Achieve Together"
        subtitle="Tell us about your challenge and we will share the most relevant experience from across our project portfolio."
        primaryLabel="Get in Touch"
        primaryHref="/contact"
        secondaryLabel="Read White Papers"
        secondaryHref="/insights/white-papers"
      />
    </>
  )
}
