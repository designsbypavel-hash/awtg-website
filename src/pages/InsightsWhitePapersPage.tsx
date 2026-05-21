import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import CTASection from '@/components/CTASection'

const papers = [
  {
    title: 'The Business Case for Private 5G in Manufacturing',
    pages: 24,
    date: 'March 2025',
    desc: 'A practitioner-focused framework for evaluating the total cost of ownership, ROI and operational benefits of private 5G deployments across manufacturing and logistics environments, with real-world benchmarks.',
  },
  {
    title: 'AI in Telecoms Network Operations: A Practitioner\'s Guide',
    pages: 32,
    date: 'January 2025',
    desc: 'An in-depth exploration of production AI deployments in network operations, covering use case selection, model architecture, data requirements, change management and measured outcomes from live deployments.',
  },
  {
    title: 'Smart Cities 2030: Infrastructure, Data & Governance',
    pages: 18,
    date: 'November 2024',
    desc: 'An analysis of the connectivity, data platform and governance frameworks required to realise smart city ambitions, drawing on case studies from the UK, Europe and the Gulf.',
  },
  {
    title: 'Generative AI for Enterprise: A Decision-Maker\'s Framework',
    pages: 28,
    date: 'September 2024',
    desc: 'A structured framework to help technology and business leaders evaluate generative AI opportunities, assess build-versus-buy decisions and manage risk, security and compliance in enterprise deployments.',
  },
]

export default function InsightsWhitePapersPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#228DC1] mb-4">Insights</p>
          <h1
            className="font-serif-display text-[#0a1628] leading-[1.1] mb-6"
           
          >
            White Papers &amp; Research
          </h1>
          <p className="text-[#0a1628]/60 text-[18px] max-w-xl font-normal leading-[1.7]">
            Authoritative research and practical frameworks from AWTG's technical and strategy teams, available to download at no cost.
          </p>
        </div>
      </section>

      {/* Papers */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-8 lg:px-12 space-y-6">
          {papers.map(p => (
            <div
              key={p.title}
              className="border border-gray-100 p-8 hover:border-[#228DC1]/30 transition-colors grid lg:grid-cols-4 gap-8 items-start"
            >
              {/* Content */}
              <div className="lg:col-span-3">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] bg-[#228DC1]/8 text-[#228DC1] px-3 py-1">
                    White Paper
                  </span>
                  <span className="text-xs text-[#0a1628]/60 font-normal">{p.date}</span>
                  <span className="text-xs text-[#0a1628]/60 font-normal">{p.pages} pages</span>
                </div>
                <h2 className="font-serif-display text-[#0a1628] mb-3" style={{ fontSize: 'clamp(18px,2vw,24px)' }}>
                  {p.title}
                </h2>
                <p className="text-[#0a1628]/75 text-[14px] font-normal leading-[1.7]">{p.desc}</p>
              </div>

              {/* Download */}
              <div className="flex flex-col gap-3 justify-start lg:pt-12">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#228DC1] text-white text-[13px] font-medium tracking-wide hover:bg-[#1a6e99] transition-colors w-full"
                >
                  <FontAwesomeIcon icon={faDownload} className="w-4 h-4 shrink-0" />
                  Download PDF
                </Link>
                <p className="text-[11px] text-[#0a1628]/60 font-normal text-center">No registration required</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTASection
        title="Want Research Tailored to Your Sector?"
        subtitle="Our strategy team produces bespoke research and market analysis for clients. Get in touch to discuss your requirements."
        primaryLabel="Get in Touch"
        primaryHref="/contact"
        secondaryLabel="View Case Studies"
        secondaryHref="/insights/case-studies"
      />
    </>
  )
}
