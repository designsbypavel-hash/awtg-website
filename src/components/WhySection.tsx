import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShieldHalved, faBolt, faGlobe, faUsers } from '@fortawesome/free-solid-svg-icons'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'

const reasons: { icon: IconDefinition; title: string; description: string }[] = [
  {
    icon: faShieldHalved,
    title: 'Security First',
    description: 'Every solution we design is built with zero-trust principles and compliance with the highest security standards.',
  },
  {
    icon: faBolt,
    title: 'Proven Performance',
    description: 'Our networks consistently deliver sub-millisecond latency and 99.99% uptime across mission-critical environments.',
  },
  {
    icon: faGlobe,
    title: 'Global Reach',
    description: 'With operations across 40+ countries, we bring local expertise backed by a truly global delivery capability.',
  },
  {
    icon: faUsers,
    title: 'Expert Team',
    description: 'Our team of 200+ certified engineers brings decades of combined experience in telecoms, AI, and systems integration.',
  },
]

export default function WhySection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[#228DC1] font-semibold text-sm uppercase tracking-widest mb-3">Why AWTG</p>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#0a1628] mb-6 leading-tight">
              The Partner You Can Rely On
            </h2>
            <p className="text-[#0a1628]/75 text-lg leading-relaxed mb-8">
              We don't just build networks, we build long-term partnerships. Our approach combines deep technical expertise with a genuine commitment to your success.
            </p>
            <div className="w-16 h-1 bg-[#228DC1] rounded" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {reasons.map((reason) => (
              <div key={reason.title} className="p-6 bg-[#f5f7fa] rounded-xl">
                <div className="w-10 h-10 bg-[#228DC1]/10 rounded-lg flex items-center justify-center mb-4">
                  <FontAwesomeIcon icon={reason.icon} className="w-5 h-5 text-[#228DC1]" />
                </div>
                <h3 className="font-bold text-[#0a1628] mb-2">{reason.title}</h3>
                <p className="text-[#0a1628]/75 text-sm leading-relaxed">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
