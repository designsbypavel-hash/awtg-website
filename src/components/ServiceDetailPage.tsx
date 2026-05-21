import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faCircleCheck } from '@fortawesome/free-solid-svg-icons'

type Metric = { value: string; label: string }
type Capability = { title: string; desc: string }
type Step = { title: string; desc: string }

type ServiceDetailPageProps = {
  title: string
  navSummary: string
  hero: string
  image: string
  imageAlt: string
  metrics: Metric[]
  overviewTitle: string
  overview: string
  capabilities: Capability[]
  steps: Step[]
  proofTitle: string
  proof: string
  related: { label: string; href: string }[]
}

export default function ServiceDetailPage({
  title, navSummary, hero, image, imageAlt,
  metrics, overviewTitle, overview,
  capabilities, steps, proofTitle, proof, related,
}: ServiceDetailPageProps) {
  return (
    <>
      {/* ── Hero — L1 heading (900) ── */}
      <section className="relative overflow-hidden bg-white pt-32 pb-20">
        <div className="absolute inset-0 opacity-[0.14]" style={{ background: 'radial-gradient(circle at 80% 20%, #228DC1 0, transparent 32%), radial-gradient(circle at 12% 78%, #228DC1 0, transparent 26%)' }} />
        <div className="relative max-w-7xl mx-auto px-8 lg:px-12 grid lg:grid-cols-[1.05fr_0.95fr] gap-16 items-end">
          <div>
            {/* L5 — eyebrow label */}
            <p className="type-label text-[#7ac4e0] mb-5">Services</p>
            {/* L1 — hero display heading */}
            <h1 className="font-serif-display text-[#0a1628] mb-6">
              {title}
            </h1>
            {/* L4 — body */}
            <p className="text-[#0a1628]/65 text-[18px] max-w-xl font-normal leading-[1.7] mb-9">{hero}</p>
            <Link to="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#228DC1] text-white text-sm font-medium hover:bg-[#1a6e99] transition-colors">
              Request a Demo <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
            </Link>
          </div>
          <div className="flex flex-col">
            <div className="relative h-[340px] overflow-hidden bg-[#0a1628]/4">
              <img src={image} alt={imageAlt} className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="border border-white/12 bg-[#0a1628]/4 px-6 py-5">
              <p className="type-label text-[#0a1628]/60 mb-2">Focus</p>
              <p className="text-[#0a1628] text-[16px] font-medium leading-[1.3]">{navSummary}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Metrics bar ── */}
      <section className="bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-8 lg:px-12 py-10 grid sm:grid-cols-3 gap-8">
          {metrics.map((metric) => (
            <div key={metric.label}>
              <p className="text-[#0a1628] font-black mb-1" style={{ fontSize: 'clamp(28px, 3vw, 40px)', letterSpacing: '-0.02em' }}>{metric.value}</p>
              <p className="type-label text-[#0a1628]/60">{metric.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Overview + Capabilities — L2 heading (700) ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-8 lg:px-12 grid lg:grid-cols-[0.9fr_1.1fr] gap-16">
          <div>
            <p className="type-label text-[#228DC1] mb-4">What you get</p>
            {/* L2 — section heading */}
            <h2 className="font-heading text-[#0a1628] mb-6">
              {overviewTitle}
            </h2>
            {/* L4 — body */}
            <p className="text-[#0a1628]/65 leading-[1.7] font-normal text-[18px]">{overview}</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {capabilities.map((capability) => (
              <div key={capability.title} className="border border-gray-100 p-6 hover:border-[#228DC1]/30 hover:shadow-sm transition-all bg-white">
                <FontAwesomeIcon icon={faCircleCheck} className="w-5 h-5 text-[#228DC1] mb-4" />
                {/* L3 — card heading */}
                <h3 className="font-card-heading text-[#0a1628] text-[15px] mb-2">{capability.title}</h3>
                {/* L4 — body */}
                <p className="text-[#0a1628]/65 text-[14px] leading-[1.7] font-normal">{capability.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process steps — L2 heading (700) ── */}
      <section className="py-24 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="max-w-2xl mb-14">
            <p className="type-label text-[#228DC1] mb-4">Delivery model</p>
            <h2 className="font-heading text-[#0a1628]">
              Clear work. Clear ownership.
            </h2>
          </div>
          <div className="grid lg:grid-cols-3 gap-6">
            {steps.map((step, index) => (
              <div key={step.title} className="bg-white border border-gray-100 p-7">
                <p className="type-label text-[#228DC1] mb-8">0{index + 1}</p>
                {/* L3 — card heading */}
                <h3 className="font-card-heading text-[#0a1628] text-[18px] mb-3">{step.title}</h3>
                {/* L4 — body */}
                <p className="text-[#0a1628]/65 text-[14px] leading-[1.7] font-normal">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why AWTG — L2 heading (700) ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-8 lg:px-12 grid lg:grid-cols-[1fr_0.8fr] gap-16 items-center">
          <div>
            <p className="type-label text-[#7ac4e0] mb-4">Why AWTG</p>
            <h2 className="font-heading text-[#0a1628] mb-6">
              {proofTitle}
            </h2>
            <p className="text-[#0a1628]/65 text-[18px] leading-[1.7] font-normal">{proof}</p>
          </div>
          <div className="border border-gray-100 p-7 bg-white/[0.03]">
            <p className="type-label text-[#0a1628]/60 mb-6">Related pages</p>
            <div className="space-y-3">
              {related.map((link) => (
                <Link key={link.href} to={link.href} className="flex items-center justify-between border-b border-gray-100 pb-3 text-[#0a1628]/70 hover:text-white font-normal text-[15px] transition-colors">
                  {link.label}
                  <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
