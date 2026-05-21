import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faCircleCheck } from '@fortawesome/free-solid-svg-icons'

const products = [
  {
    name: 'Kai',
    tag: 'Enterprise AI Platform',
    color: '#228DC1',
    desc: 'Kai is our production enterprise AI platform. Live, not a concept. It handles customer conversations at scale, connects to your existing systems, and gives you clear visibility of what is working through real-time dashboards and satisfaction metrics.',
    proof: 'Live with British Council English Online',
    features: [
      'Handles high volumes of customer interactions in production',
      'Connects to existing CRMs and enterprise systems',
      'Real-time dashboards with CSAT and containment data',
      'Human-in-the-loop escalation when AI hands off to people',
    ],
  },
  {
    name: 'Aruva',
    tag: 'Agentic Education AI',
    color: '#059669',
    desc: 'Aruva is an agentic AI platform built for schools and institutions. It personalises learning for every student, automates content delivery, and gives educators real-time insight into progress, without adding to their workload.',
    proof: 'Education sector deployments across the UK',
    features: [
      'Agentic AI that adapts to each individual learner',
      'Automated content delivery and curriculum support',
      'Real-time student progress and engagement analytics',
      'Secure, institution-grade deployment and governance',
    ],
  },
  {
    name: 'Ella',
    tag: 'Voice AI, Est. 2016',
    color: '#7c3aed',
    desc: "Ella was AWTG's first AI product, a voice command and control solution launched in 2016, the first of its kind in the market at the time. Ella established AWTG's AI engineering capability and laid the foundation for Kai and Aruva.",
    proof: 'First voice AI of its kind at launch',
    features: [
      'Voice command and control interface',
      'First-generation natural language processing',
      'Foundation for AWTG\'s AI product heritage',
      'Launched commercially in 2016',
    ],
  },
]

const caseStudies = [
  {
    client: 'British Council',
    project: 'English Online: Kai in Production',
    outcome: 'British Council needed to handle a high volume of learner enquiries without scaling their support team. AWTG deployed Kai and integrated it directly into their systems. It now handles the bulk of interactions, reduces escalations, and tracks satisfaction in real time.',
    tags: ['Enterprise AI', 'Customer Service', 'Live Production'],
  },
]

export default function GenerativeAIPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-white pt-32 pb-20">
        <div className="absolute inset-0 opacity-[0.16]" style={{ background: 'radial-gradient(circle at 82% 18%, #228DC1 0, transparent 34%), radial-gradient(circle at 12% 82%, #7c3aed 0, transparent 28%)' }} />
        <div className="relative max-w-7xl mx-auto px-8 lg:px-12 grid lg:grid-cols-[1.05fr_0.95fr] gap-16 items-end">
          <div>
            <p className="type-label text-[#7ac4e0] mb-5">AI Solutions</p>
            <h1 className="font-serif-display text-[#0a1628] leading-[1.02] mb-6">
              Generative AI
            </h1>
            <p className="text-[#0a1628]/65 text-[18px] max-w-xl font-normal leading-[1.7] mb-3">
              Most AI projects never reach production. Ours do. We build AI that works inside real organisations, connected to your systems, governed by your rules, and measured by actual outcomes.
            </p>
            <p className="text-[#0a1628]/60 text-sm font-normal leading-relaxed max-w-xl mb-9">
              Kai, Aruva and our AI consultancy practice are evidence of this. We have been shipping AI since 2016.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#228DC1] text-white text-sm font-medium hover:bg-[#1a6e99] transition-colors">
                Request a Demo <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
              </Link>
              <Link to="/solutions" className="inline-flex items-center gap-2 px-7 py-3.5 text-[#0a1628]/60 hover:text-[#228DC1] text-sm font-medium transition-colors">
                View all solutions
              </Link>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="relative h-[340px] overflow-hidden bg-[#0a1628]/4">
              <img src="https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1100&q=85&auto=format&fit=crop" alt="Generative AI" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="border border-white/12 bg-[#0a1628]/4 px-6 py-5">
              <p className="text-[#0a1628]/65 text-[10px] uppercase tracking-[0.2em] font-semibold mb-2">Focus</p>
              <p className="text-[#0a1628] text-base font-medium leading-snug">Production-ready AI: Kai, Aruva and enterprise GenAI</p>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-8 lg:px-12 py-10 grid sm:grid-cols-3 gap-8">
          <div><p className="text-[#0a1628] text-3xl font-semibold mb-1">2016</p><p className="text-[#0a1628]/65 text-xs font-normal uppercase tracking-[0.18em]">AI products shipping since</p></div>
          <div><p className="text-[#0a1628] text-3xl font-semibold mb-1">3</p><p className="text-[#0a1628]/65 text-xs font-normal uppercase tracking-[0.18em]">Production AI products</p></div>
          <div><p className="text-[#0a1628] text-3xl font-semibold mb-1">Enterprise</p><p className="text-[#0a1628]/65 text-xs font-normal uppercase tracking-[0.18em]">Governed, secure deployment</p></div>
        </div>
      </section>

      {/* AI Products */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <p className="type-label text-[#228DC1] mb-4">Our AI Products</p>
          <h2 className="font-heading text-[#0a1628] mb-16">
            Built and shipped.<br />Not theoretical.
          </h2>
          <div className="space-y-px">
            {products.map((p) => (
              <div key={p.name} className="grid lg:grid-cols-[280px_1fr] gap-0 border border-gray-100 bg-white hover:border-[#228DC1]/30 transition-all">
                <div className="p-8 border-b lg:border-b-0 lg:border-r border-gray-100 flex flex-col justify-between">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] mb-2" style={{ color: p.color }}>{p.tag}</p>
                    <h3 className="font-serif-display text-[#0a1628]">{p.name}</h3>
                  </div>
                  <p className="text-[#0a1628]/60 text-xs font-normal mt-6 italic">{p.proof}</p>
                </div>
                <div className="p-8">
                  <p className="text-[#0a1628]/65 leading-relaxed font-normal mb-6">{p.desc}</p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {p.features.map((f) => (
                      <div key={f} className="flex items-start gap-2.5">
                        <FontAwesomeIcon icon={faCircleCheck} className="w-4 h-4 shrink-0 mt-0.5 text-[#228DC1]" />
                        <span className="text-[#0a1628]/75 text-sm font-normal">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-24 bg-[#f7f8fa]">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <p className="type-label text-[#228DC1] mb-4">Delivered</p>
          <h2 className="font-heading text-[#0a1628] mb-16">
            Proof points, not promises.
          </h2>
          <div className="grid lg:grid-cols-2 gap-px bg-gray-100 border border-gray-100">
            {caseStudies.map((cs) => (
              <div key={cs.client} className="bg-white p-10">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#228DC1] mb-2">{cs.client}</p>
                <h3 className="font-semibold text-[#0a1628] text-lg mb-4 leading-snug">{cs.project}</h3>
                <p className="text-[#0a1628]/75 text-sm leading-relaxed font-normal mb-6">{cs.outcome}</p>
                <div className="flex flex-wrap gap-2">
                  {cs.tags.map((t) => (
                    <span key={t} className="text-[10px] font-semibold uppercase tracking-[0.12em] px-3 py-1 bg-[#228DC1]/8 text-[#228DC1]">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <p className="type-label text-[#228DC1] mb-4">What we build</p>
          <h2 className="font-heading text-[#0a1628] mb-12">
            Built to work in your organisation.
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-100 border border-gray-100">
            {[
              { title: 'AI Agents', desc: 'AI that handles real workflows, not just answers questions. With built-in approval, audit trails and human handoff when needed.' },
              { title: 'Knowledge AI', desc: 'AI that searches and answers from your own documents, policies and internal records. Accurate, secure and always up to date.' },
              { title: 'AI Strategy and Transformation', desc: 'We help organisations find where AI actually adds value, build the case, and create a roadmap the whole leadership team can get behind.' },
              { title: 'Safe Deployment', desc: 'Deployed on your infrastructure or in a private cloud. You stay in control of your data, with full observability from day one.' },
            ].map((c) => (
              <div key={c.title} className="bg-white p-8 hover:bg-[#f7f8fa] transition-colors">
                <FontAwesomeIcon icon={faCircleCheck} className="w-5 h-5 text-[#228DC1] mb-5" />
                <h3 className="text-[#0a1628] font-semibold mb-2 text-sm">{c.title}</h3>
                <p className="text-[#0a1628]/65 text-sm font-normal leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-8 lg:px-12 text-center">
          <p className="type-label text-[#228DC1] mb-6">Get in Touch</p>
          <h2 className="font-heading text-[#0a1628] mb-6">
            Ready to build AI that actually works in your organisation?
          </h2>
          <p className="text-[#0a1628]/65 text-[18px] leading-[1.7] mb-10 font-normal max-w-xl mx-auto">
            We have the products, the experience and the delivery track record. Talk to us about what you need and we will show you what is possible.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#228DC1] hover:bg-[#1a6e99] text-white text-sm font-medium transition-colors">
              Request a conversation
            </Link>
            <Link to="/solutions" className="inline-flex items-center gap-2 px-7 py-3.5 border border-[#228DC1]/40 hover:border-[#228DC1] text-[#228DC1] text-sm font-medium transition-colors">
              View all solutions
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
