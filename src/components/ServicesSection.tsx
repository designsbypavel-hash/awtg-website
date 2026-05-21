import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faNetworkWired, faBrain, faMicrochip, faBuilding, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'

const services: { icon: IconDefinition; title: string; description: string; href: string; color: string }[] = [
  {
    icon: faNetworkWired,
    title: 'Mobile Private Networks',
    description: 'Design and deploy dedicated 4G/5G private networks that give your organisation full control over connectivity, security and performance.',
    href: '/solutions/mobile-private-networks',
    color: '#228DC1',
  },
  {
    icon: faBrain,
    title: 'Telecoms AI',
    description: 'Harness AI to optimise network operations, predict failures before they happen, and automate complex processes at scale.',
    href: '/solutions/telecoms-ai',
    color: '#228DC1',
  },
  {
    icon: faMicrochip,
    title: 'Generative AI',
    description: 'Integrate large language models and generative AI into your telecom workflows to accelerate decision-making and innovation.',
    href: '/solutions/generative-ai',
    color: '#228DC1',
  },
  {
    icon: faBuilding,
    title: 'Smart Cities',
    description: 'Build connected urban infrastructure that improves public services, mobility, safety and sustainability for citizens.',
    href: '/solutions/smart-cities',
    color: '#228DC1',
  },
]

export default function ServicesSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-[#228DC1] font-semibold text-sm uppercase tracking-widest mb-3">What We Do</p>
          <h2 className="font-heading text-[#0a1628] mb-4" style={{ fontSize: '32px', lineHeight: 1.1 }}>Our Core Solutions</h2>
          <p className="text-[#0a1628]/75 text-[16px] max-w-2xl mx-auto">
            From private 5G networks to AI-driven analytics, we deliver end-to-end telecoms transformation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => (
            <Link
              key={service.title}
              to={service.href}
              className="group p-8 border border-gray-100 rounded-2xl hover:border-[#228DC1]/40 hover:shadow-lg transition-all bg-white"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                style={{ backgroundColor: '#228DC115' }}
              >
                <FontAwesomeIcon icon={service.icon} className="w-6 h-6 text-[#228DC1]" />
              </div>
              <h3 className="text-xl font-medium text-[#0a1628] mb-3">{service.title}</h3>
              <p className="text-[#0a1628]/75 leading-relaxed mb-4">{service.description}</p>
              <span className="inline-flex items-center gap-1 text-[#228DC1] text-sm font-semibold group-hover:gap-2 transition-all">
                Learn more <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
