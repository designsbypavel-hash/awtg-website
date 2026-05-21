import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

type Card = {
  title: string
  desc: string
  href: string
}

type UtilityPageProps = {
  eyebrow: string
  title: string
  intro: string
  cards?: Card[]
  primaryLabel?: string
  primaryHref?: string
}

function UtilityPage({
  eyebrow,
  title,
  intro,
  cards = [],
  primaryLabel = 'Request a Demo',
  primaryHref = '/contact',
}: UtilityPageProps) {
  return (
    <>
      <section className="pt-32 pb-20 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#228DC1] mb-4">{eyebrow}</p>
          <h1 className="font-serif-display text-[#0a1628] leading-tight mb-6" style={{ fontSize: '40px', lineHeight: 1.1 }}>
            {title}
          </h1>
          <p className="text-[#0a1628]/60 text-lg max-w-2xl font-normal leading-relaxed">{intro}</p>
          <Link
            to={primaryHref}
            className="inline-flex items-center gap-2 mt-8 px-7 py-3.5 border border-[#228DC1] text-[#228DC1] text-sm font-medium hover:bg-[#228DC1] hover:text-white transition-colors"
          >
            {primaryLabel} <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {cards.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-8 lg:px-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card) => (
              <Link
                key={card.href}
                to={card.href}
                className="group p-7 border border-gray-100 hover:border-[#228DC1]/30 hover:shadow-md transition-all bg-white"
              >
                <h2 className="text-xl font-semibold text-[#0a1628] mb-3 group-hover:text-[#228DC1] transition-colors">
                  {card.title}
                </h2>
                <p className="text-[#0a1628]/75 text-sm leading-relaxed font-normal mb-6">{card.desc}</p>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-[#228DC1]">
                  Explore <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  )
}

export function ServicesOverviewPage() {
  return (
    <UtilityPage
      eyebrow="Services"
      title="How AWTG delivers AI, networks and software."
      intro="A single delivery partner for strategy, engineering, software, IoT and AI programmes that need to move from plan to production without losing control."
      cards={[
        { title: 'Consultancy', desc: 'Strategic advisory, roadmaps and procurement support for complex technology decisions.', href: '/services/consultancy' },
        { title: 'Engineering', desc: 'RF, 5G and network engineering delivered by teams used to critical environments.', href: '/services/engineering' },
        { title: 'Software Development', desc: 'Custom platforms, dashboards and operational tools built around real workflows.', href: '/services/software' },
        { title: 'Digital Transformation', desc: 'Modernisation programmes that connect people, systems and measurable outcomes.', href: '/services/digital-transformation' },
        { title: 'IoT Platforms', desc: 'Device, sensor and data platforms for connected operations and public services.', href: '/services/iot' },
        { title: 'AI/ML Solutions', desc: 'Models, agents and automation deployed safely inside enterprise environments.', href: '/services/ai-ml' },
      ]}
    />
  )
}

export function PartnershipsPage() {
  return (
    <UtilityPage
      eyebrow="Proof"
      title="Trusted by operators, vendors and public sector partners."
      intro="AWTG works with organisations where delivery matters: telecoms operators, technology vendors, NHS and public sector teams, and enterprise leaders modernising critical infrastructure."
      cards={[
        { title: 'Client Outcomes', desc: 'See how AWTG translates AI and connectivity into working deployments.', href: '/insights/case-studies' },
        { title: 'Certifications', desc: 'Explore the standards, accreditations and frameworks behind our delivery model.', href: '/about/certifications' },
        { title: 'Leadership', desc: 'Meet the people guiding AWTG across telecoms, AI and public sector technology.', href: '/about/leadership' },
      ]}
    />
  )
}

export function InnovationPage() {
  return (
    <UtilityPage
      eyebrow="Innovation"
      title="Applied innovation, built for real-world deployment."
      intro="AWTG focuses innovation on systems that organisations can actually adopt: AI workflows, private networks, smart infrastructure and digital platforms with measurable value."
      cards={[
        { title: 'Generative AI', desc: 'Production-ready GenAI for enterprise and public sector workflows.', href: '/solutions/generative-ai' },
        { title: 'Telecoms AI', desc: 'AI-powered network intelligence and optimisation for operators and vendors.', href: '/solutions/telecoms-ai' },
        { title: 'Smart Cities', desc: 'Connected infrastructure for better public services and urban operations.', href: '/solutions/smart-cities' },
      ]}
    />
  )
}

export function IBecomePage() {
  return (
    <UtilityPage
      eyebrow="Community"
      title="iBecome."
      intro="A technology-led programme focused on helping people build digital confidence, access opportunity and participate in the connected economy."
      primaryLabel="Contact AWTG"
    />
  )
}

export function IYouthPage() {
  return (
    <UtilityPage
      eyebrow="Community"
      title="iYouth."
      intro="A youth-focused initiative supporting digital skills, STEM exposure and pathways into future technology careers."
      primaryLabel="Contact AWTG"
    />
  )
}

export function PrivacyPage() {
  return (
    <UtilityPage
      eyebrow="Legal"
      title="Privacy Policy."
      intro="This page summarises how AWTG handles information responsibly. For formal privacy enquiries, contact the team directly."
      primaryLabel="Contact Us"
    />
  )
}

export function TermsPage() {
  return (
    <UtilityPage
      eyebrow="Legal"
      title="Terms of Service."
      intro="This page provides a simple destination for AWTG terms and service information while the full legal copy is finalised."
      primaryLabel="Contact Us"
    />
  )
}

export function CookiesPage() {
  return (
    <UtilityPage
      eyebrow="Legal"
      title="Cookie Settings."
      intro="Manage cookie and tracking preferences for the AWTG website. Full preference controls can be connected here when analytics is enabled."
      primaryLabel="Contact Us"
    />
  )
}
