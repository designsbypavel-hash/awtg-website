import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faCircleCheck } from '@fortawesome/free-solid-svg-icons'

const solutions = [
  {
    tag: 'AI & Machine Learning',
    title: 'Telecoms AI',
    headline: 'Intelligent networks that think ahead.',
    description: 'Apply machine learning to every layer of your network. AWTG\'s Telecoms AI platform delivers real-time anomaly detection, predictive fault resolution, and autonomous optimisation across 4G and 5G estates.',
    href: '/solutions/telecoms-ai',
    highlights: ['Predictive fault detection', 'Automated NOC operations', 'Real-time KPI optimisation', 'AI-driven traffic management'],
    img: 'https://images.unsplash.com/photo-1516110833967-0b5716ca1387?w=900&q=85&auto=format&fit=crop',
    flip: false,
  },
  {
    tag: 'Generative AI',
    title: 'Generative AI for Enterprise',
    headline: 'Production-ready GenAI, built around your operations.',
    description: 'Deploy large language models securely within your environment. From intelligent document processing to multi-agent automation, AWTG builds GenAI solutions that integrate with your existing infrastructure from day one.',
    href: '/solutions/generative-ai',
    highlights: ['Custom LLM integration and fine-tuning', 'RAG pipelines and knowledge bases', 'On-premises or private cloud deployment', 'Workflow automation and AI agents'],
    img: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=900&q=85&auto=format&fit=crop',
    flip: true,
  },
  {
    tag: 'Private Connectivity',
    title: 'Private Network as a Service',
    headline: 'Enterprise 5G, fully managed, live in weeks.',
    description: 'AWTG designs, deploys and manages dedicated 4G/5G private networks for enterprise and public sector. Complete control over connectivity, security and performance, whether on a factory floor, port, or government campus.',
    href: '/solutions/mobile-private-networks',
    highlights: ['Rapid deployment in weeks, not months', '99.99% uptime SLA with 24/7 NOC', 'Spectrum management and licensing', 'Seamless ERP and OT integration'],
    img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900&q=85&auto=format&fit=crop',
    flip: false,
  },
  {
    tag: 'Urban Intelligence',
    title: 'Smart Cities & IoT',
    headline: 'Infrastructure that serves every citizen.',
    description: 'AWTG\'s iRegen platform connects urban infrastructure to deliver smarter communities. From IoT sensor networks to AI-driven traffic management, we build the digital backbone of tomorrow\'s cities today.',
    href: '/solutions/smart-cities',
    highlights: ['IoT sensor integration and analytics', 'Smart street furniture and mobility', 'NHS and public sector connectivity', 'Community digital inclusion programmes'],
    img: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=900&q=85&auto=format&fit=crop',
    flip: true,
  },
  {
    tag: 'Digital Health',
    title: 'Smart Health',
    headline: 'Connected care that improves outcomes.',
    description: 'Digital health connectivity and AI platforms purpose-built for NHS trusts and healthcare providers. AWTG delivers the secure, resilient infrastructure that modern healthcare demands: from ward to data centre.',
    href: '/solutions/smart-health',
    highlights: ['NHS-grade secure connectivity', 'Clinical AI and diagnostics support', 'Remote patient monitoring infrastructure', 'DSPT and CQC compliant deployments'],
    img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&q=85&auto=format&fit=crop',
    flip: false,
  },
  {
    tag: 'Industry 4.0',
    title: 'Industry 4.0',
    headline: 'The connected factory starts here.',
    description: 'Combine private 5G, IoT and AI to transform manufacturing, logistics and supply chain operations. AWTG delivers the connectivity and intelligence infrastructure that powers the next generation of industrial operations.',
    href: '/solutions/industry-4',
    highlights: ['Private 5G for manufacturing floors', 'Real-time OT/IT convergence', 'Autonomous robotics connectivity', 'Predictive maintenance at scale'],
    img: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=900&q=85&auto=format&fit=crop',
    flip: true,
  },
]

export default function SolutionsPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative pt-36 pb-24 bg-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="absolute top-0 right-0 w-2/3 h-full"
          style={{ background: 'radial-gradient(ellipse at right center, rgba(37,99,235,0.10) 0%, transparent 65%)' }} />
        <div className="relative max-w-7xl mx-auto px-8 lg:px-12">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-6 h-px bg-[#228DC1]" />
            <span className="text-[#228DC1] text-[11px] font-bold uppercase tracking-[0.3em]">Our Solutions</span>
          </div>
          <h1
            className="font-serif-display text-[#0a1628] leading-tight mb-6 max-w-3xl"
           
          >
            Technology solutions<br />
            built for the{' '}
            <span className="italic text-[#228DC1]">AI era.</span>
          </h1>
          <p className="text-[#0a1628]/65 text-base leading-relaxed max-w-xl font-normal">
            From private 5G networks to enterprise AI deployment, AWTG delivers end-to-end technology solutions for UK enterprises and public sector, built to perform.
          </p>
        </div>
      </section>

      {/* ── Solution panels ── */}
      <section className="bg-white">
        {solutions.map((s, i) => (
          <div
            key={s.title}
            className={`grid lg:grid-cols-2 items-stretch border-b border-gray-100 ${i === 0 ? 'border-t' : ''}`}
          >
            {/* Image */}
            <div className={`relative overflow-hidden min-h-[360px] lg:min-h-[480px] bg-gray-100 ${s.flip ? 'lg:order-2' : 'lg:order-1'}`}>
              <img
                src={s.img}
                alt={s.title}
                className="w-full h-full object-cover absolute inset-0"
                loading="lazy"
              />
              {/* Subtle dark overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#050a12]/20 to-transparent" />
            </div>

            {/* Content */}
            <div className={`flex flex-col justify-center py-16 ${s.flip ? 'lg:order-1 pl-16 lg:pl-24 pr-12 lg:pr-16' : 'lg:order-2 pl-12 lg:pl-16 pr-16 lg:pr-24'}`}>
              <h2
                className="font-serif-display text-[#0a1628] leading-tight mb-3"
               
              >
                {s.title}
              </h2>
              <p className="text-[#228DC1] text-sm font-medium italic mb-5">{s.headline}</p>
              <p className="text-[#0a1628]/75 text-[15px] leading-relaxed mb-8 font-normal">
                {s.description}
              </p>
              <ul className="space-y-2.5 mb-10">
                {s.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 text-sm text-[#0a1628]/75 font-normal">
                    <FontAwesomeIcon icon={faCircleCheck} className="w-4 h-4 text-[#228DC1] shrink-0 mt-0.5" />
                    {h}
                  </li>
                ))}
              </ul>
              <Link
                to={s.href}
                className="inline-flex items-center gap-2 text-sm font-medium text-[#228DC1] hover:gap-3 transition-all duration-200 w-fit"
              >
                Explore {s.title} <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </section>

      {/* ── CTA ── */}
      <section className="py-28 bg-white">
        <div className="max-w-4xl mx-auto px-8 lg:px-12 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#228DC1] mb-6">Ready to get started?</p>
          <h2
            className="font-serif-display text-[#0a1628] leading-tight mb-6"
           
          >
            Not sure which solution<br />
            <span className="italic text-[#228DC1]">fits your challenge?</span>
          </h2>
          <p className="text-[#0a1628]/60 text-base leading-relaxed mb-10 font-normal max-w-xl mx-auto">
            Our engineers will scope the right approach for your organisation. No obligation, just honest technical advice from people who have done it before.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#228DC1] hover:bg-[#1a6e99] text-white text-sm font-medium transition-colors duration-200"
            >
              Talk to an Expert
            </Link>
            <Link
              to="/about"
              className="text-[#0a1628]/60 hover:text-white text-sm font-normal self-center transition-colors duration-200"
            >
              About AWTG →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
