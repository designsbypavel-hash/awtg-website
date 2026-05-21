import CTASection from '@/components/CTASection'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faBriefcase, faLightbulb, faUsers, faArrowTrendUp, faGlobe } from '@fortawesome/free-solid-svg-icons'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'

const openRoles = [
  { title: 'Senior RF Engineer', location: 'London, UK', type: 'Full-time', dept: 'Engineering' },
  { title: '5G Solutions Architect', location: 'Remote (UK)', type: 'Full-time', dept: 'Pre-Sales' },
  { title: 'AI/ML Engineer, Telecoms', location: 'London, UK', type: 'Full-time', dept: 'AI & Data' },
  { title: 'Project Manager, Private Networks', location: 'Manchester, UK', type: 'Full-time', dept: 'Delivery' },
  { title: 'Business Development Manager', location: 'London, UK', type: 'Full-time', dept: 'Commercial' },
  { title: 'DevOps Engineer, Network Automation', location: 'Remote (UK)', type: 'Full-time', dept: 'Engineering' },
]

const values: { icon: IconDefinition; title: string; desc: string }[] = [
  { icon: faLightbulb,     title: 'Innovation',    desc: 'We encourage bold thinking and support you in exploring new ideas.' },
  { icon: faUsers,         title: 'Collaboration', desc: "You'll work alongside brilliant people from diverse backgrounds." },
  { icon: faArrowTrendUp,  title: 'Growth',        desc: 'Continuous learning is built into how we work, with dedicated development budgets.' },
  { icon: faGlobe,         title: 'Impact',        desc: 'Your work will directly shape how organisations and cities stay connected.' },
]

export default function CareersPage() {
  return (
    <>
      <section className="pt-32 pb-20 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-[#228DC1] font-semibold text-sm uppercase tracking-widest mb-3">Careers</p>
          <h1 className="text-5xl lg:text-6xl font-normal text-[#0a1628] mb-6 max-w-3xl leading-tight">
            Shape the Future of Connectivity
          </h1>
          <p className="text-[#0a1628]/60 text-xl max-w-2xl">
            Join a team of world-class engineers, consultants and innovators solving the world's most complex connectivity challenges.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="font-heading text-[#0a1628] mb-12 text-center" style={{ fontSize: '32px', lineHeight: 1.1 }}>Why Work at AWTG?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-100 border border-gray-100 mb-16">
            {values.map((v) => (
              <div key={v.title} className="bg-white p-8 hover:bg-[#f7f8fa] transition-colors group">
                <div className="w-11 h-11 bg-[#228DC1]/8 flex items-center justify-center mb-6">
                  <FontAwesomeIcon icon={v.icon} className="w-5 h-5 text-[#228DC1]" />
                </div>
                <h3 className="font-semibold text-[#0a1628] mb-2 text-sm">{v.title}</h3>
                <p className="text-[#0a1628]/60 text-sm font-normal leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open roles */}
      <section className="py-24 bg-[#f5f7fa]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="font-heading text-[#0a1628] mb-12" style={{ fontSize: '32px', lineHeight: 1.1 }}>Open Positions</h2>
          <ul role="list" className="space-y-4">
            {openRoles.map((role) => (
              <li key={role.title} role="listitem" className="bg-white p-6 border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#228DC1]/40 hover:shadow-md transition-all">
                <div>
                  <div className="text-xs font-semibold text-[#228DC1] uppercase tracking-wider mb-1">{role.dept}</div>
                  <h3 className="font-medium text-[#0a1628] text-lg">{role.title}</h3>
                  <div className="flex items-center gap-4 mt-2 text-sm text-[#0a1628]/60">
                    <span className="flex items-center gap-1"><FontAwesomeIcon icon={faLocationDot} className="w-3 h-3" /> {role.location}</span>
                    <span className="flex items-center gap-1"><FontAwesomeIcon icon={faBriefcase} className="w-3 h-3" /> {role.type}</span>
                  </div>
                </div>
                <button className="flex-shrink-0 px-6 py-2.5 bg-[#228DC1] text-white rounded font-semibold text-sm hover:bg-[#1a6e99] transition-colors">
                  Apply Now
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTASection title="Don't See Your Role?" subtitle="We're always interested in hearing from talented people. Send us your CV and tell us how you can contribute." primaryLabel="Send Speculative Application" primaryHref="/contact" secondaryLabel="Learn About AWTG" secondaryHref="/about" />
    </>
  )
}
