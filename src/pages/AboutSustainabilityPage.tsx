import CTASection from '@/components/CTASection'

const commitments = [
  {
    title: 'Net Zero by 2035',
    desc: 'We are committed to achieving net zero carbon emissions across our operations by 2035, with a 50% reduction target by 2028.',
    stat: '2035',
    statLabel: 'Net Zero Target',
  },
  {
    title: 'Energy-Efficient Networks',
    desc: 'Our network designs prioritise energy efficiency, helping clients reduce the carbon footprint of their wireless infrastructure by up to 40%.',
    stat: '40%',
    statLabel: 'Carbon Footprint Reduction',
  },
  {
    title: 'Responsible Supply Chain',
    desc: 'We require all suppliers to meet our ESG standards and work with partners who share our commitment to ethical and sustainable practices.',
    stat: '100%',
    statLabel: 'ESG-Screened Suppliers',
  },
  {
    title: 'Community Investment',
    desc: 'Through our AWTG Foundation, we invest in digital skills programmes in underserved communities across the UK and globally.',
    stat: 'Global',
    statLabel: 'Community Reach',
  },
]

const pillars = [
  { label: 'Environmental', desc: 'Reducing emissions and designing energy-efficient infrastructure across every project we deliver.' },
  { label: 'Social', desc: 'Investing in digital skills, community programmes and responsible employment practices.' },
  { label: 'Governance', desc: 'Transparent reporting, ethical supply chains and measurable targets held to independent review.' },
]

export default function AboutSustainabilityPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <p className="type-label text-[#228DC1] mb-4">About AWTG</p>
          <h1 className="font-serif-display text-[#0a1628] mb-6">
            Sustainability
          </h1>
          <p className="text-[#0a1628]/70 text-[18px] max-w-xl font-normal leading-[1.7]">
            Building a connected future responsibly. Our commitment to environmental and social sustainability is built into everything we deliver.
          </p>
        </div>
      </section>

      {/* Overview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-8 lg:px-12 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="type-label text-[#228DC1] mb-4">Our Approach</p>
            <h2 className="font-heading text-[#0a1628] mb-6">
              Technology for a Better World
            </h2>
            <p className="text-[#0a1628]/75 leading-[1.7] font-normal text-[16px] mb-4">
              We believe that technology should improve lives and protect the planet, not harm it. Sustainability is built into everything we do, from how we design networks to how we run our business.
            </p>
            <p className="text-[#0a1628]/65 leading-[1.7] font-normal">
              Our sustainability strategy covers three pillars: environmental responsibility, social impact, and governance. We report annually on our progress against measurable targets.
            </p>
          </div>
          <div className="h-72 overflow-hidden bg-gray-100">
            <img
              src="https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=900&q=85&auto=format&fit=crop"
              alt="Sustainable green energy"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Three pillars */}
      <section className="py-16 bg-[#f8fafc] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="grid lg:grid-cols-3 gap-px bg-gray-200 border border-gray-200">
            {pillars.map((p) => (
              <div key={p.label} className="bg-[#f8fafc] p-8">
                <p className="type-label text-[#228DC1] mb-3">{p.label}</p>
                <p className="text-[#0a1628]/70 font-normal text-[14px] leading-[1.7]">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commitments */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <p className="type-label text-[#228DC1] mb-4">Commitments</p>
          <h2 className="font-heading text-[#0a1628] mb-14">
            Measurable targets. Annual reporting.
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {commitments.map((c) => (
              <div key={c.title} className="border border-gray-100 p-8 hover:border-[#228DC1]/30 transition-colors">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h3 className="font-card-heading text-[#0a1628] text-[16px]">{c.title}</h3>
                  <div className="text-right shrink-0">
                    <p className="font-black text-[#228DC1]" style={{ fontSize: '20px', lineHeight: 1.1, letterSpacing: '-0.02em' }}>{c.stat}</p>
                    <p className="type-label text-[#0a1628]/60 mt-0.5">{c.statLabel}</p>
                  </div>
                </div>
                <p className="text-[#0a1628]/65 text-[14px] leading-[1.7] font-normal">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Partner With Us for a Sustainable Future"
        subtitle="Learn how our solutions can help reduce your organisation's carbon footprint while delivering the performance your business needs."
        primaryLabel="Get in Touch"
        primaryHref="/contact"
        secondaryLabel="View Our Solutions"
        secondaryHref="/solutions"
      />
    </>
  )
}
