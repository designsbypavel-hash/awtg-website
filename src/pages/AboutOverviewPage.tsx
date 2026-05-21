import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import CTASection from '@/components/CTASection'

const latestInsights = [
  {
    tag: 'Case Study',
    title: 'How AWTG Deployed a Private 5G Network for a Major UK Port',
    excerpt: 'From ageing Wi-Fi to a full 5G NR deployment supporting autonomous cranes, real-time cargo tracking, and a live digital twin.',
    date: 'March 2025',
    slug: 'private-5g-uk-port',
  },
  {
    tag: 'AI',
    title: 'The Rise of AI-Driven Network Operations: What to Expect in 2025',
    excerpt: 'From self-healing networks to predictive maintenance, AI is fundamentally changing how telecoms organisations operate.',
    date: 'February 2025',
    slug: 'ai-network-operations-2025',
  },
  {
    tag: '5G',
    title: 'Understanding Open RAN: Opportunities and Challenges for Enterprises',
    excerpt: 'Open RAN is reshaping the vendor landscape. We explore what it means for enterprise private network deployments.',
    date: 'January 2025',
    slug: 'open-ran-enterprises',
  },
]

const milestones = [
  {
    year: '2003',
    event: 'AWTG founded in London as a specialist telecoms consultancy.',
    detail: 'Starting with a focused team of RF and wireless experts, AWTG began serving UK mobile operators with specialist consultancy that larger firms could not match for depth or speed.',
  },
  {
    year: '2010',
    event: 'Expanded into systems integration and network deployment services.',
    detail: 'Growing client demand led us to build full end-to-end delivery capability, taking projects from initial design right through to live network deployment and handover.',
  },
  {
    year: '2015',
    event: "Launched private LTE division, becoming one of the UK's first private network specialists.",
    detail: 'We identified the enterprise opportunity in dedicated wireless infrastructure ahead of the market and built a dedicated practice around private LTE long before it became mainstream.',
  },
  {
    year: '2019',
    event: 'Awarded major 5G private network contracts across defence and port sectors.',
    detail: 'Landmark projects with UK MoD and major port operators validated our 5G deployment capability at scale, across some of the most demanding connectivity environments in the country.',
  },
  {
    year: '2022',
    event: 'Established AI and Analytics division, integrating ML into network operations.',
    detail: 'We built an internal AI engineering team and began productising our network intelligence capability into what would become Kai, our enterprise AI platform now live with major clients.',
  },
  {
    year: '2024',
    event: 'Launched Generative AI practice and expanded operations to 40+ countries.',
    detail: 'Kai went live with British Council, Aruva launched for education, and AWTG began advising global organisations on AI transformation strategy, roadmapping and delivery.',
  },
  {
    year: '2026',
    event: 'Kai reaches 250,000+ users across 150+ countries.',
    detail: 'Kai, our enterprise AI platform, is now live at scale across enterprise, government and education sectors worldwide, with continued growth across every region.',
  },
]

const subLinks = [
  { label: 'Leadership Team', href: '/about/leadership', desc: 'Meet the people driving AWTG forward.' },
  { label: 'Certifications', href: '/about/certifications', desc: 'Our standards, accreditations and quality commitments.' },
  { label: 'Sustainability', href: '/about/sustainability', desc: "How we're building a greener future." },
]

function TimelineSection() {
  const [active, setActive] = useState<Set<number>>(new Set())
  const rowRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const check = () => {
      const triggerY = window.innerHeight * 0.72
      const next = new Set<number>()
      rowRefs.current.forEach((row, i) => {
        if (!row) return
        if (row.getBoundingClientRect().top < triggerY) next.add(i)
      })
      setActive(prev => (next.size === prev.size ? prev : next))
    }
    const t = setTimeout(check, 60)
    window.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check, { passive: true })
    return () => { clearTimeout(t); window.removeEventListener('scroll', check); window.removeEventListener('resize', check) }
  }, [])

  const isLast = (i: number) => i === milestones.length - 1

  return (
    <section className="py-28 bg-[#f8fafc]">
      <div className="max-w-3xl mx-auto px-8 lg:px-12">
        <p className="type-label text-[#228DC1] mb-4">History</p>
        <h2 className="font-heading text-[#0a1628] mb-20">
          Our journey
        </h2>

        {/* Timeline — no gaps between rows so line segments are seamless */}
        <div>
          {milestones.map((m, i) => {
            const isActive = active.has(i)
            const nextActive = active.has(i + 1)
            const delay = `${i * 50}ms`

            return (
              <div
                key={m.year}
                ref={el => { rowRefs.current[i] = el }}
                className="flex"
              >
                {/* ── Year ── */}
                <div className="shrink-0 w-16 text-right pr-5 pt-1">
                  <span
                    className="font-black tabular-nums text-[14px] leading-none block"
                    style={{
                      color: isActive ? '#228DC1' : '#d1dbe8',
                      letterSpacing: '-0.01em',
                      transition: 'color 0.45s ease',
                      transitionDelay: delay,
                    }}
                  >
                    {m.year}
                  </span>
                </div>

                {/* ── Dot + connector column ──
                     This column STRETCHES to full row height (no items-start on parent).
                     The flex-1 connector below the dot fills the remaining height,
                     so the line is always continuous with no gaps.                ── */}
                <div className="shrink-0 w-5 flex flex-col items-center">
                  {/* Small top spacer so dot aligns with first line of text */}
                  <div style={{ height: '6px', flexShrink: 0 }} />

                  {/* Dot */}
                  <div
                    style={{
                      width: '14px',
                      height: '14px',
                      borderRadius: '50%',
                      flexShrink: 0,
                      backgroundColor: isActive ? '#228DC1' : 'white',
                      border: `2px solid ${isActive ? '#228DC1' : '#d1dbe8'}`,
                      boxShadow: isActive ? '0 0 0 5px rgba(37,99,235,0.13)' : 'none',
                      transition: 'all 0.45s cubic-bezier(0.4,0,0.2,1)',
                      transitionDelay: delay,
                      position: 'relative',
                      zIndex: 1,
                    }}
                  />

                  {/* Connector line below this dot (not on last item) */}
                  {!isLast(i) && (
                    <div
                      style={{
                        flex: 1,
                        width: '2px',
                        marginTop: '4px',
                        borderRadius: '1px',
                        background: '#e8edf4',
                        position: 'relative',
                        overflow: 'hidden',
                        minHeight: '32px',
                      }}
                    >
                      {/* Blue fill travels down as next item activates */}
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          top: 0,
                          background: '#228DC1',
                          height: nextActive ? '100%' : '0%',
                          transition: 'height 0.6s cubic-bezier(0.4,0,0.2,1)',
                          transitionDelay: nextActive ? `${(i + 1) * 50}ms` : '0ms',
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* ── Content ── */}
                <div
                  className="flex-1 pl-6 pb-10"
                  style={{
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? 'translateY(0px)' : 'translateY(10px)',
                    transition: 'opacity 0.5s ease, transform 0.5s ease',
                    transitionDelay: isActive ? `${i * 50 + 90}ms` : '0ms',
                  }}
                >
                  <p
                    className="font-semibold leading-[1.3] mb-2"
                    style={{ fontSize: '15px', color: '#0a1628' }}
                  >
                    {m.event}
                  </p>
                  <p
                    className="text-[14px] font-normal leading-[1.7]"
                    style={{ color: 'rgba(10,22,40,0.5)' }}
                  >
                    {m.detail}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default function AboutOverviewPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <p className="type-label text-[#228DC1] mb-4">About AWTG</p>
          <h1 className="font-serif-display text-[#0a1628] mb-6">
            Over Two Decades of Telecoms Excellence
          </h1>
          <p className="text-[#0a1628]/65 text-[18px] max-w-2xl font-normal leading-[1.7]">
            AWTG is an Advanced Wireless Technology Group, a UK-based specialist in private networks, telecoms AI and smart infrastructure for enterprises and governments worldwide.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-8 lg:px-12 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="type-label text-[#228DC1] mb-4">Our Mission</p>
            <h2 className="font-heading text-[#0a1628] mb-6">
              Connectivity that transforms organisations
            </h2>
            <p className="text-[#0a1628]/65 leading-[1.7] font-normal text-[18px] mb-4">
              We exist to make cutting-edge wireless technology accessible, reliable and transformative for organisations that depend on connectivity. From a single-site private 5G deployment to a national smart city programme, we bring the expertise and commitment to deliver.
            </p>
            <p className="text-[#0a1628]/65 leading-[1.7] font-normal">
              Our team of engineers, consultants and project managers are united by a passion for solving complex connectivity challenges and a relentless focus on client outcomes.
            </p>
          </div>
          <div className="h-72 overflow-hidden bg-gray-100">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=85&auto=format&fit=crop"
              alt="AWTG team collaboration"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Timeline */}
      <TimelineSection />

      {/* Sub-nav */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="grid sm:grid-cols-3 gap-px bg-gray-100 border border-gray-100">
            {subLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="group bg-white p-8 hover:border-[#228DC1]/30 hover:bg-[#f7f8fa] transition-colors"
              >
                <h3 className="font-card-heading text-[#0a1628] text-[15px] mb-2 group-hover:text-[#228DC1] transition-colors">{link.label}</h3>
                <p className="text-[#0a1628]/60 text-[14px] font-normal">{link.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Insights */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="flex items-end justify-between mb-10 gap-8">
            <div>
              <p className="type-label text-[#228DC1] mb-3">Insights</p>
              <h2 className="font-heading text-[#0a1628]">
                Latest thinking from AWTG
              </h2>
            </div>
            <Link
              to="/insights/blog"
              className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-[#0a1628]/60 hover:text-[#228DC1] transition-colors shrink-0"
            >
              All articles <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid lg:grid-cols-3 gap-px bg-gray-100 border border-gray-100">
            {latestInsights.map((post) => (
              <Link
                key={post.slug}
                to={`/insights/blog/${post.slug}`}
                className="group bg-white p-8 flex flex-col justify-between hover:bg-[#f7f8fa] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="type-label text-[#228DC1]">{post.tag}</span>
                    <span className="text-[#0a1628]/65 text-xs font-normal">{post.date}</span>
                  </div>
                  <h3 className="font-card-heading text-[#0a1628] text-[15px] leading-[1.3] mb-3 group-hover:text-[#228DC1] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-[#0a1628]/65 text-[14px] font-normal leading-[1.7]">
                    {post.excerpt}
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-6 text-[#228DC1] text-xs font-semibold uppercase tracking-[0.14em]">
                  Read <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
