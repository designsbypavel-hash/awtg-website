import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faCircleCheck, faChevronLeft, faChevronRight, faBolt, faShield, faChartBar } from '@fortawesome/free-solid-svg-icons'

// --- BRAND SVG LOGOS --------------------------------------------------------

function LogoBT() {
  return (
    <svg width="38" height="38" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg">
      <circle cx="19" cy="19" r="19" fill="#5514B4"/>
      <text x="19" y="25" textAnchor="middle" fill="white" fontSize="14" fontWeight="800" fontFamily="Arial,sans-serif">bt</text>
    </svg>
  )
}

function LogoVodafone() {
  return (
    <svg width="38" height="38" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg">
      <circle cx="19" cy="19" r="19" fill="#E60000"/>
      <path d="M19 8C14 8 10 12 10 18C10 24 14 27.5 19 28C20.5 25 21 23 21 20.5C21 18 20 16.5 19 15.5C20.5 15.5 23 17 23 20.5C23 25 20.5 28 19 28C23.5 28 27.5 24 27.5 19C27.5 13 23.5 8 19 8Z" fill="white"/>
    </svg>
  )
}

function LogoEricsson() {
  return (
    <svg width="136" height="20" viewBox="0 0 136 20" xmlns="http://www.w3.org/2000/svg" overflow="visible">
      <text x="0" y="17" fill="#0082F0" fontSize="17" fontWeight="700" fontFamily="Arial,sans-serif" letterSpacing="1.5">ERICSSON</text>
    </svg>
  )
}

function LogoNokia() {
  return (
    <svg width="100" height="24" viewBox="0 0 100 24" xmlns="http://www.w3.org/2000/svg" overflow="visible">
      <text x="0" y="21" fill="#005AFF" fontSize="22" fontWeight="900" fontFamily="Arial,sans-serif">NOKIA</text>
    </svg>
  )
}

function LogoNHS() {
  return (
    <svg width="62" height="28" viewBox="0 0 62 28" xmlns="http://www.w3.org/2000/svg">
      <rect width="62" height="28" rx="2" fill="#005EB8"/>
      <text x="31" y="20" textAnchor="middle" fill="white" fontSize="15" fontWeight="800" fontFamily="Arial,sans-serif">NHS</text>
    </svg>
  )
}

function LogoO2() {
  return (
    <svg width="52" height="28" viewBox="0 0 52 28" xmlns="http://www.w3.org/2000/svg">
      <text x="0" y="24" fill="#0019A5" fontSize="24" fontWeight="700" fontFamily="Arial,sans-serif">O</text>
      <text x="28" y="27" fill="#0019A5" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">2</text>
    </svg>
  )
}

function Logo3() {
  return (
    <svg width="22" height="30" viewBox="0 0 22 30" xmlns="http://www.w3.org/2000/svg" overflow="visible">
      <text x="0" y="26" fill="#85004B" fontSize="28" fontWeight="800" fontFamily="Arial,sans-serif">3</text>
    </svg>
  )
}

function LogoLime() {
  return (
    <svg width="86" height="26" viewBox="0 0 86 26" xmlns="http://www.w3.org/2000/svg">
      <circle cx="11" cy="13" r="11" fill="#00C800"/>
      <circle cx="11" cy="13" r="7" fill="#004f00"/>
      <circle cx="11" cy="13" r="3.5" fill="#00C800"/>
      <text x="28" y="19" fill="#00C800" fontSize="18" fontWeight="700" fontFamily="Arial,sans-serif">lime</text>
    </svg>
  )
}

function LogoGSMA() {
  return (
    <svg width="82" height="22" viewBox="0 0 82 22" xmlns="http://www.w3.org/2000/svg" overflow="visible">
      <text x="0" y="19" fill="#1B3A6B" fontSize="20" fontWeight="800" fontFamily="Arial,sans-serif" letterSpacing="0.5">GSMA</text>
    </svg>
  )
}

function LogoEE() {
  return (
    <svg width="46" height="28" viewBox="0 0 46 28" xmlns="http://www.w3.org/2000/svg">
      <rect width="46" height="28" rx="3" fill="#00B000"/>
      <text x="23" y="20" textAnchor="middle" fill="white" fontSize="15" fontWeight="800" fontFamily="Arial,sans-serif">EE</text>
    </svg>
  )
}

function LogoSamsung() {
  return (
    <svg width="148" height="20" viewBox="0 0 148 20" xmlns="http://www.w3.org/2000/svg" overflow="visible">
      <text x="0" y="17" fill="#1428A0" fontSize="17" fontWeight="600" fontFamily="Arial,sans-serif" letterSpacing="2">SAMSUNG</text>
    </svg>
  )
}

// Logos for ticker (pairs for seamless loop)
const tickerLogos = [
  { id: 'bt', component: <LogoBT /> },
  { id: 'vodafone', component: <LogoVodafone /> },
  { id: 'ericsson', component: <LogoEricsson /> },
  { id: 'nokia', component: <LogoNokia /> },
  { id: 'nhs', component: <LogoNHS /> },
  { id: 'o2', component: <LogoO2 /> },
  { id: '3', component: <Logo3 /> },
  { id: 'lime', component: <LogoLime /> },
  { id: 'gsma', component: <LogoGSMA /> },
  { id: 'ee', component: <LogoEE /> },
  { id: 'samsung', component: <LogoSamsung /> },
]

// --- HERO (Harvey-inspired) --------------------------------------------------

function Hero() {
  return (
    <section className="relative h-screen min-h-[700px] flex flex-col overflow-hidden">

      {/* -- Cinematic background (decorative, aria-hidden) -- */}
      <div className="absolute inset-0" aria-hidden="true">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1800&q=80&auto=format&fit=crop"
        >
          <source src="https://cdn.pixabay.com/video/2025/04/23/273922_large.mp4" type="video/mp4" />
        </video>
        {/* Gradient: darkest bottom-left (where copy lives), lighter top-right */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/55 to-black/30" />
      </div>

      {/* -- Content, Harvey layout: bottom-left, minimal copy -- */}
      <div className="relative flex-1 flex flex-col justify-end pb-16 max-w-7xl mx-auto w-full px-8 lg:px-12">

        {/* Headline, Nokia register: urgency + optimism, not fear */}
        <h1
          className="font-serif-display text-white leading-[1.02] mb-6"
          style={{ fontSize: '40px', lineHeight: 1.1 }}
        >
          The organisations<br />
          winning the AI era<br />
          <span className="italic">aren't waiting.</span>
        </h1>

        {/* One-liner, StoryBrand: customer is the hero, AWTG is the guide */}
        <p className="text-white/70 text-[15px] leading-relaxed max-w-sm mb-10 font-normal">
          AWTG delivers AI, 5G, private networks and software solutions
          for UK enterprises and public sector, end-to-end,
          accountable, built to perform.
        </p>

        {/* CTA */}
        <div>
          <Link
            to="/contact"
            className="inline-block px-7 py-3.5 border border-white text-white text-[13px] font-normal tracking-wide hover:bg-white hover:text-[#0a1628] transition-all duration-200"
          >
            Request a Demo
          </Link>
        </div>

      </div>

      {/* -- Logo ticker bar, client logos do the talking (Harvey principle) -- */}
      <div className="relative border-t border-gray-100 bg-white overflow-hidden">
        <div className="flex items-center">
          <div className="shrink-0 px-8 py-4 border-r border-black/10">
            <span className="text-[#0a1628]/60 text-[10px] font-semibold tracking-[0.22em] uppercase whitespace-nowrap">
              Trusted by
            </span>
          </div>
          <div className="overflow-hidden flex-1">
            <div className="ticker-track" aria-hidden="true">
              {[...tickerLogos, ...tickerLogos].map((logo, i) => (
                <div
                  key={`${logo.id}-${i}`}
                  className="flex items-center justify-center px-10 py-4 shrink-0"
                >
                  {logo.component}
                </div>
              ))}
            </div>
          </div>
          <div className="shrink-0 px-6 py-4 border-l border-black/10">
            <Link
              to="/about/partnerships"
              className="text-[#0a1628]/60 hover:text-[#0a1628] text-[11px] font-medium tracking-widest uppercase whitespace-nowrap transition-colors"
            >
              Our Partners ?
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

// --- WHAT WE DO -------------------------------------------------------------

function WhatWeDo() {
  const rows = [
    { num: '01', label: 'AI Products & Software', line: 'Kai, Aruva and bespoke AI � built for production, not proof of concept.', href: '/solutions/generative-ai' },
    { num: '02', label: 'Private Networks', line: 'Managed 4G/5G designed, deployed and monitored end-to-end. Live in weeks.', href: '/solutions/mobile-private-networks' },
    { num: '03', label: 'Engineering & Consultancy', line: '5G RF design, network testing and transformation strategy across 20+ countries.', href: '/services/engineering' },
  ]
  return (
    <section className="py-20 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        <p className="type-label text-[#228DC1] mb-12">What We Do</p>
        <div className="divide-y divide-gray-100">
          {rows.map((r) => (
            <Link key={r.num} to={r.href} className="group flex items-center justify-between gap-8 py-8 hover:pl-2 transition-all duration-300">
              <div className="flex items-start gap-8 min-w-0">
                <span className="type-label text-[#0a1628]/20 shrink-0 mt-1">{r.num}</span>
                <div>
                  <h3 className="font-heading text-[#0a1628] mb-1.5" style={{ fontSize: '20px', lineHeight: 1.1 }}>{r.label}</h3>
                  <p className="text-[#0a1628]/60 text-sm font-normal leading-relaxed">{r.line}</p>
                </div>
              </div>
              <FontAwesomeIcon icon={faArrowRight} className="w-5 h-5 text-[#228DC1] shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

// --- OUR SOLUTIONS -----------------------------------------------------------

const solutionPanels = [
  {
    title: 'Enabling the AI supercycle in wireless networks',
    desc: 'AWTG provides MNO-grade testing, RF optimisation, and AI-powered network intelligence to help operators and vendors deploy, validate, and scale 4G/5G networks with confidence.',
    link: 'Discover telecoms solutions',
    href: '/solutions/telecoms-ai',
    img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80&auto=format&fit=crop',
    flip: false,
  },
  {
    title: 'Scale faster with private wireless and AI',
    desc: "Deliver enterprise-grade connectivity and intelligence without the infrastructure burden. AWTG's PNaaS and Generative AI platforms give your business a decisive operational edge.",
    link: 'Explore enterprise platforms',
    href: '/solutions/mobile-private-networks',
    img: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80&auto=format&fit=crop',
    flip: true,
  },
  {
    title: 'Intelligent infrastructure for the communities of tomorrow',
    desc: 'From NHS connectivity to iRegen urban platforms and smart education, AWTG delivers AI-driven public services that improve outcomes for citizens and communities.',
    link: 'Discover smart cities solutions',
    href: '/solutions/smart-cities',
    img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80&auto=format&fit=crop',
    flip: false,
  },
]

// --- AI PROOF POINTS ---------------------------------------------------------

function AIProofPoints() {
  return (
    <section className="py-20 bg-[#f8fafc] border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        <div className="grid lg:grid-cols-[1fr_auto] gap-16 items-center">
          <div>
            <p className="type-label text-[#228DC1] mb-6">Live in Production</p>
            <h2 className="font-serif-display text-[#0a1628] leading-tight mb-4" style={{ fontSize: '32px', lineHeight: 1.1 }}>
              British Council.<br />
              <span className="italic text-[#228DC1]">AI handling learner support at scale.</span>
            </h2>
            <p className="text-[#0a1628]/65 text-[16px] font-normal leading-relaxed max-w-xl mb-8">
              We deployed Kai directly into British Council English Online. Customer satisfaction is up. Escalations are down. It's live, not a demo.
            </p>
            <Link to="/contact" className="inline-flex items-center gap-2 text-sm font-medium text-[#228DC1] hover:gap-3 transition-all">
              Discuss a similar project <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-px bg-gray-200 border border-gray-200 shrink-0">
            {[
              { stat: 'Since 2016', label: 'AI in production' },
              { stat: 'Live', label: 'Not a pilot' },
              { stat: '3', label: 'AI products shipped' },
              { stat: 'Enterprise', label: 'Grade governance' },
            ].map((item) => (
              <div key={item.label} className="bg-white px-8 py-7 text-center">
                <p className="font-serif-display text-[#0a1628] mb-1" style={{ fontSize: 'clamp(18px, 2vw, 26px)' }}>{item.stat}</p>
                <p className="type-label text-[#0a1628]/60">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function OurSolutions() {
  return (
    <section className="bg-[#f7f8fa]">
      <div className="max-w-7xl mx-auto px-8 lg:px-12 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-end mb-16">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#228DC1] mb-4">Our Solutions</p>
            <h2 className="font-serif-display text-[#0a1628] leading-tight" style={{ fontSize: '32px', lineHeight: 1.1 }}>
              Advancing connectivity for the{' '}
              <span className="italic text-[#228DC1]">technology supercycle.</span>
            </h2>
          </div>
          <p className="text-[#0a1628]/60 text-[16px] leading-relaxed font-normal">
            Whether you're a mobile operator, enterprise CIO, or public sector leader, AWTG delivers the connectivity, intelligence, and software your organisation needs to lead.
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-8 lg:px-12 pb-28 space-y-4">
        {solutionPanels.map((panel) => (
          <div key={panel.title} className={`grid lg:grid-cols-2 gap-0 overflow-hidden bg-white border border-gray-100`}>
            {panel.flip ? (
              <>
                <div className="p-12 lg:p-16 flex flex-col justify-center">
                  <h3 className="text-2xl font-medium text-[#0a1628] leading-snug mb-4">{panel.title}</h3>
                  <p className="text-[#0a1628]/60 text-[16px] leading-relaxed mb-6 font-normal">{panel.desc}</p>
                  <Link to={panel.href} className="inline-flex items-center gap-2 text-sm font-medium text-[#228DC1] hover:gap-3 transition-all">
                    {panel.link} <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
                  </Link>
                </div>
                <div className="h-64 lg:h-auto min-h-[300px] bg-gray-100">
                  <img src={panel.img} alt={panel.title} className="w-full h-full object-cover" loading="lazy" />
                </div>
              </>
            ) : (
              <>
                <div className="h-64 lg:h-auto min-h-[300px] bg-gray-100">
                  <img src={panel.img} alt={panel.title} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="p-12 lg:p-16 flex flex-col justify-center">
                  <h3 className="text-2xl font-medium text-[#0a1628] leading-snug mb-4">{panel.title}</h3>
                  <p className="text-[#0a1628]/60 text-[16px] leading-relaxed mb-6 font-normal">{panel.desc}</p>
                  <Link to={panel.href} className="inline-flex items-center gap-2 text-sm font-medium text-[#228DC1] hover:gap-3 transition-all">
                    {panel.link} <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
                  </Link>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

// --- AWTG VISION -------------------------------------------------------------

export function Vision() {
  return (
    <section className="py-28 bg-white border-t border-gray-100">
      <div className="max-w-5xl mx-auto px-8 lg:px-12 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#228DC1] mb-10">AWTG Vision</p>
        <h2 className="font-serif-display text-[#0a1628] leading-[1.1]" style={{ fontSize: '32px', lineHeight: 1.1 }}>
          The next wave of connectivity will{' '}
          <span className="italic text-[#228DC1]">transform businesses</span>
          {', '}unlock new network value, and{' '}
          <span className="italic text-[#228DC1]">empower communities</span>{' '}
          worldwide.
        </h2>
        <div className="mt-10 w-10 h-0.5 bg-[#228DC1] mx-auto" />
      </div>
    </section>
  )
}

// --- YOUR INDUSTRY -----------------------------------------------------------

const industryCards = [
  {
    title: 'Communication Service Providers',
    sub: 'Explore telecoms',
    href: '/industries/telecoms',
    img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80&auto=format&fit=crop',
  },
  {
    title: 'Enterprises & Connected Industries',
    sub: 'Explore enterprise',
    href: '/industries/enterprise',
    img: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&q=80&auto=format&fit=crop',
  },
  {
    title: 'Public Sector & Government',
    sub: 'Explore public sector',
    href: '/industries/public-sector',
    img: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80&auto=format&fit=crop',
  },
]

function Industries() {
  return (
    <section className="bg-white pt-16">
      <div className="max-w-7xl mx-auto px-8 lg:px-12 mb-14">
        <div className="grid lg:grid-cols-2 gap-12 items-end">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#228DC1] mb-4">Your Industry</p>
            <h2 className="font-serif-display text-[#0a1628] leading-tight" style={{ fontSize: '32px', lineHeight: 1.1 }}>
              Powering transformation<br />across every sector.
            </h2>
          </div>
          <p className="text-[#0a1628]/60 text-[16px] leading-relaxed font-normal">
            From mobile operators to government bodies, AWTG delivers technology built specifically for your world. Select your sector to explore.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3">
        {industryCards.map((card) => (
          <Link key={card.title} to={card.href} className="relative group overflow-hidden h-[400px]">
            <img src={card.img} alt={card.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050a12]/85 via-[#050a12]/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-10">
              <h3 className="text-white font-medium text-[20px] mb-2 leading-snug">{card.title}</h3>
              <span className="inline-flex items-center gap-1.5 text-sm text-[#0a1628]/60 group-hover:text-white transition-colors font-medium">
                {card.sub} <FontAwesomeIcon icon={faArrowRight} className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

// --- AI-POWERED TECHNOLOGY SOLUTIONS -----------------------------------------

const tabs = [
  {
    label: 'Telecoms AI',
    title: 'AI-Powered Telecoms Solutions',
    desc: 'AWTG combines advanced connectivity with AI and software to create intelligent telecoms solutions. Our Telecoms AI platform gives operators real-time network intelligence, predictive analytics, and autonomous optimisation capabilities.',
    features: [
      'Real-time network performance monitoring and anomaly detection',
      'Predictive failure detection and proactive remediation',
      'AI-driven KPI optimisation across 4G/5G estates',
      'Partnership with Lime Microsystems for AI/ML radio technology',
    ],
    href: '/solutions/telecoms-ai',
    img: 'https://images.unsplash.com/photo-1516110833967-0b5716ca1387?w=700&q=80&auto=format&fit=crop',
    imgBg: '#1e1b4b',
  },
  {
    label: 'PNaaS',
    title: 'Private Network as a Service',
    desc: "AWTG's fully managed PNaaS delivers enterprise-grade 4G/5G connectivity, designed, deployed and monitored end-to-end. From manufacturing floors to logistics hubs, we deliver connectivity that works.",
    features: [
      'Rapid deployment, live in weeks, not months',
      'Fully managed with 24/7 NOC monitoring',
      '99.99% uptime SLA guaranteed',
      'Scales seamlessly as your operations grow',
    ],
    href: '/solutions/mobile-private-networks',
    img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=700&q=80&auto=format&fit=crop',
    imgBg: '#0c2340',
  },
  {
    label: 'Generative AI',
    title: 'Generative AI for Enterprise',
    desc: 'Deploy production-ready generative AI within your organisation. From intelligent document processing to conversational systems and automated workflows, AWTG builds solutions that integrate securely with your existing infrastructure.',
    features: [
      'Custom LLM integration and fine-tuning',
      'Secure, on-premises or cloud deployment',
      'Enterprise knowledge base and RAG pipelines',
      'Workflow automation and intelligent agents',
    ],
    href: '/solutions/generative-ai',
    img: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=700&q=80&auto=format&fit=crop',
    imgBg: '#1a0030',
  },
  {
    label: 'Smart Cities',
    title: 'Smart Cities & IoT Platforms',
    desc: "AWTG's iRegen platform connects urban infrastructure, from smart lighting and traffic management to community Wi-Fi and environmental monitoring, to create cities that work better for everyone.",
    features: [
      'IoT sensor integration and real-time analytics',
      'Smart street furniture and urban mobility',
      'NHS and public sector connectivity solutions',
      'Community digital inclusion programmes',
    ],
    href: '/solutions/smart-cities',
    img: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=700&q=80&auto=format&fit=crop',
    imgBg: '#001a10',
  },
]

export function TechSolutions() {
  const [activeTab, setActiveTab] = useState(0)
  const tab = tabs[activeTab]
  return (
    <section className="py-32 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full border border-gray-200 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#0a1628]/60 mb-5">
            Technology Solutions
          </span>
          <h2 className="font-serif-display text-[#0a1628]" style={{ fontSize: '32px', lineHeight: 1.1 }}>
            AI-Powered Technology{' '}
            <span className="italic text-[#228DC1]">Solutions</span>
          </h2>
        </div>
        <div className="flex flex-wrap justify-center gap-2 mb-14">
          {tabs.map((t, i) => (
            <button
              key={t.label}
              onClick={() => setActiveTab(i)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium border transition-all ${
                activeTab === i
                  ? 'bg-[#228DC1] text-white border-[#228DC1]'
                  : 'bg-white text-[#0a1628]/60 border-gray-200 hover:border-[#228DC1] hover:text-[#228DC1]'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="grid lg:grid-cols-2 gap-0 overflow-hidden border border-gray-100">
          <div className="h-72 lg:h-auto min-h-[380px] relative" style={{ background: tab.imgBg }}>
            <img src={tab.img} alt={tab.title} className="w-full h-full object-cover opacity-50 mix-blend-luminosity" loading="lazy" />
          </div>
          <div className="bg-white p-12 lg:p-16 flex flex-col justify-center">
            <h3 className="font-serif-display text-[#0a1628] mb-4" style={{ fontSize: '24px', lineHeight: 1.1 }}>{tab.title}</h3>
            <p className="text-[#0a1628]/60 text-[16px] leading-relaxed mb-7 font-normal">{tab.desc}</p>
            <ul className="space-y-3 mb-8">
              {tab.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-[#0a1628]/75">
                  <FontAwesomeIcon icon={faCircleCheck} className="w-4 h-4 text-[#228DC1] mt-0.5 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <Link to={tab.href} className="inline-flex items-center gap-2 px-6 py-3 bg-[#228DC1] hover:bg-[#1a6e99] text-white text-sm font-medium transition-colors w-fit">
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

// --- WHY AWTG ----------------------------------------------------------------

function WhyAWTG() {
  return (
    <section className="py-20 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-end mb-16">
          <div>
            <p className="type-label text-[#228DC1] mb-4">Why AWTG</p>
            <h2 className="font-serif-display text-[#0a1628] leading-tight" style={{ fontSize: '32px', lineHeight: 1.1 }}>
              19 years. 1,000+ sites.<br />
              <span className="italic text-[#228DC1]">8 sectors. One team.</span>
            </h2>
          </div>
          <p className="text-[#0a1628]/60 text-[16px] font-normal leading-relaxed">
            Crown Commercial Service approved. ISO 9001, 27001, 14001, 45001 and 42001 certified. Cyber Essentials Plus. SC and DV cleared engineers.
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-gray-100 border border-gray-100">
          {[
            { value: '19+', label: 'Years', sub: 'Engineering since 2006' },
            { value: '1,000+', label: 'Sites', sub: 'Deployed globally' },
            { value: '100+', label: 'Experts', sub: 'Engineers & specialists' },
            { value: '8', label: 'Sectors', sub: 'Public & private' },
          ].map((s) => (
            <div key={s.label} className="bg-white p-8">
              <p className="font-serif-display text-[#0a1628] mb-1" style={{ fontSize: 'clamp(32px, 3.5vw, 48px)' }}>{s.value}</p>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#228DC1] mb-1">{s.label}</p>
              <p className="text-sm text-[#0a1628]/65 font-normal">{s.sub}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-right">
          <Link to="/about/certifications" className="text-sm font-medium text-[#0a1628]/60 hover:text-[#228DC1] transition-colors">
            View all certifications ?
          </Link>
        </div>
      </div>
    </section>
  )
}

// --- PNAAS --------------------------------------------------------------------

const pnaasFeatures = [
  { icon: faBolt, title: 'Live in weeks', desc: 'From scoping to live network, faster than any alternative' },
  { icon: faShield, title: '99.99% uptime SLA', desc: 'Enterprise-grade reliability, AWTG NOC monitoring 24/7' },
  { icon: faChartBar, title: 'Fully managed', desc: 'Continuous optimisation, proactive support included' },
]

export function PNaaS() {
  return (
    <section className="py-32 bg-[#f8fafc] relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      <div className="absolute right-0 top-0 w-2/3 h-full"
        style={{ background: 'radial-gradient(ellipse at right center, rgba(37,99,235,0.08) 0%, transparent 70%)' }} />
      <div className="relative max-w-7xl mx-auto px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full border border-gray-200 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#0a1628]/60 mb-8">
              PNaaS, Private Network as a Service
            </span>
            <h2 className="font-serif-display text-[#0a1628] leading-tight mb-6" style={{ fontSize: '32px', lineHeight: 1.1 }}>
              Transforming the future of connectivity{' '}
              <span className="italic text-[#228DC1]">and beyond.</span>
            </h2>
            <p className="text-[#0a1628]/60 text-[16px] leading-relaxed mb-10 font-normal">
              AWTG's Private Network as a Service delivers enterprise-grade 4G/5G connectivity, fully managed, infinitely scalable, built around your operations.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/solutions/mobile-private-networks"
                className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 hover:border-[#228DC1] hover:bg-[#228DC1]/5 text-[#0a1628]/70 text-sm font-medium transition-all">
                Explore PNaaS
              </Link>
              <Link to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 text-[#0a1628]/60 hover:text-white text-sm font-medium transition-colors">
                Talk to an Engineer ?
              </Link>
            </div>
          </div>
          <div className="space-y-3">
            {pnaasFeatures.map(({ icon, title, desc }) => (
              <div key={title} className="flex items-start gap-5 bg-white/[0.04] hover:bg-white/[0.07] p-6 border border-gray-100 transition-colors">
                <div className="w-10 h-10 bg-[#228DC1]/15 flex items-center justify-center shrink-0">
                  <FontAwesomeIcon icon={icon} className="w-5 h-5 text-[#228DC1]" />
                </div>
                <div>
                  <p className="text-[#0a1628] font-semibold mb-1">{title}</p>
                  <p className="text-[#0a1628]/60 text-sm font-normal leading-snug">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}


// --- CLIENT VOICES ------------------------------------------------------------

const testimonials = [
  {
    initials: 'MR',
    name: 'Head of Digital Transformation',
    org: 'Leading UK Public Sector Organisation',
    quote: "AWTG's technology team brought a level of innovation and commercial pragmatism that we hadn't found elsewhere. Their AI solutions delivered tangible ROI well ahead of schedule.",
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80&auto=format&fit=crop',
  },
  {
    initials: 'SC',
    name: 'CTO',
    org: 'UK Telecoms Operator',
    quote: 'The private 5G network AWTG deployed for us transformed our operations completely. From deployment speed to ongoing support, they exceeded every expectation.',
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&q=80&auto=format&fit=crop',
  },
  {
    initials: 'JB',
    name: 'Director of Innovation',
    org: 'NHS Foundation Trust',
    quote: 'Bringing AWTG in to design our connectivity infrastructure was one of the best decisions we made. Their understanding of public sector requirements is unmatched.',
    img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&q=80&auto=format&fit=crop',
  },
]

function ClientVoices() {
  const [current, setCurrent] = useState(0)
  const t = testimonials[current]
  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative overflow-hidden h-[420px] bg-gray-800">
            <img src={t.img} alt={t.name} className="w-full h-full object-cover object-top" loading="lazy" />
            {/* Subtle gradient just at the very bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050a12]/70 via-transparent to-transparent" />
            {/* Caption strip � pinned to bottom edge, full width */}
            <div className="absolute bottom-0 left-0 right-0 flex items-center gap-3 bg-[#0a1628]/60 backdrop-blur-sm px-5 py-3.5">
              <div className="w-8 h-8 rounded-full bg-[#228DC1] flex items-center justify-center text-white text-xs font-bold shrink-0">{t.initials}</div>
              <div>
                <p className="text-white text-sm font-semibold leading-tight">{t.name}</p>
                <p className="text-white/60 text-xs font-normal">{t.org}</p>
              </div>
            </div>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#228DC1] mb-8">Client Voices</p>
            <div className="text-[#228DC1]/60 font-serif-display text-7xl leading-none mb-4">"</div>
            <blockquote className="font-serif-display text-[#0a1628] leading-snug mb-8" style={{ fontSize: 'clamp(20px, 2.2vw, 28px)' }}>
              {t.quote}
            </blockquote>
            <p className="text-[#0a1628] font-semibold text-sm">{t.name}</p>
            <p className="text-[#0a1628]/60 text-sm font-normal">{t.org}</p>
            <div className="flex items-center gap-4 mt-8">
              <button onClick={() => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)}
                className="w-10 h-10 rounded-full border border-gray-200 hover:border-gray-300 flex items-center justify-center text-[#0a1628]/60 hover:text-white transition-all">
                <FontAwesomeIcon icon={faChevronLeft} className="w-4 h-4" />
              </button>
              <button onClick={() => setCurrent((c) => (c + 1) % testimonials.length)}
                className="w-10 h-10 rounded-full border border-gray-200 hover:border-gray-300 flex items-center justify-center text-[#0a1628]/60 hover:text-white transition-all">
                <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4" />
              </button>
              <div className="flex gap-1.5">
                {testimonials.map((_, i) => (
                  <button key={i} onClick={() => setCurrent(i)}
                    className={`rounded-full transition-all duration-200 ${i === current ? 'w-6 h-1.5 bg-[#228DC1]' : 'w-1.5 h-1.5 bg-[#228DC1]/12'}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// --- PARTNERS -----------------------------------------------------------------

const partnerLogos = [
  { id: 'bt', component: <LogoBT /> },
  { id: 'vodafone', component: <LogoVodafone /> },
  { id: 'ericsson', component: <LogoEricsson /> },
  { id: 'nokia', component: <LogoNokia /> },
  { id: 'nhs', component: <LogoNHS /> },
  { id: 'o2', component: <LogoO2 /> },
  { id: '3', component: <Logo3 /> },
  { id: 'lime', component: <LogoLime /> },
  { id: 'gsma', component: <LogoGSMA /> },
  { id: 'ee', component: <LogoEE /> },
  { id: 'samsung', component: <LogoSamsung /> },
]

export function Partners() {
  return (
    <section className="py-20 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-[#0a1628]/65 mb-12">
          Trusted by Industry Leaders & Public Sector Bodies
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-12">
          {partnerLogos.map((p) => (
            <div key={p.id}>
              {p.component}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// --- INSIGHTS -----------------------------------------------------------------

const articles = [
  {
    tag: 'Industry Insight', tagColor: 'text-[#228DC1]',
    date: 'Apr 2025', readTime: '6 min read',
    title: 'The Future of Tourism Connectivity: How Smart Cities Are Redefining the Visitor Experience',
    img: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&q=80&auto=format&fit=crop',
    href: '/insights/blog',
  },
  {
    tag: 'Technical Brief', tagColor: 'text-[#7c3aed]',
    date: 'Mar 2025', readTime: '7 min read',
    title: 'Private Networks in Defence: Why Mission-Critical Communications Demand Dedicated Infrastructure',
    img: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80&auto=format&fit=crop',
    href: '/insights/blog',
  },
  {
    tag: 'Case Study', tagColor: 'text-[#0891b2]',
    date: 'Feb 2025', readTime: '5 min read',
    title: "Closing the Digital Divide: AWTG's Approach to Rural Connectivity and Community Transformation",
    img: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&q=80&auto=format&fit=crop',
    href: '/insights/case-studies',
  },
  {
    tag: 'Research', tagColor: 'text-[#059669]',
    date: 'Jan 2025', readTime: '9 min read',
    title: 'Enterprise AI Adoption: Overcoming Challenges and Accelerating Path to ROI',
    img: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&q=80&auto=format&fit=crop',
    href: '/insights/white-papers',
  },
]

function Insights() {
  return (
    <section className="py-28 bg-[#f7f8fa]">
      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#228DC1] mb-3">Insights & Research</p>
            <h2 className="font-serif-display text-[#0a1628]" style={{ fontSize: '32px', lineHeight: 1.1 }}>Explore the latest<br />from AWTG.</h2>
          </div>
          <Link to="/insights" className="text-sm font-medium text-[#228DC1] hover:text-[#1a6e99] transition-colors">
            All insights ?
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {articles.map((a) => (
            <Link key={a.title} to={a.href} className="bg-white overflow-hidden border border-gray-100">
              <div className="h-44 overflow-hidden bg-gray-100">
                <img src={a.img} alt={a.title} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3 text-xs">
                  <span className={`font-semibold ${a.tagColor}`}>{a.tag}</span>
                  <span className="text-[#0a1628]/20">�</span>
                  <span className="text-[#0a1628]/60 font-normal">{a.date}</span>
                </div>
                <p className="text-sm font-semibold text-[#0a1628] leading-snug mb-4 line-clamp-3">{a.title}</p>
                <span className="text-xs font-medium text-[#228DC1] inline-flex items-center gap-1.5">
                  Read more <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

// --- CONTACT CTA --------------------------------------------------------------

function ContactCTA() {
  return (
    <section className="py-28 bg-[#0a1628]">
      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-serif-display text-white leading-tight mb-4" style={{ fontSize: '32px', lineHeight: 1.1 }}>
              Ready to build<br />
              <span className="italic text-[#228DC1]">something that matters?</span>
            </h2>
            <p className="text-white/55 text-[16px] font-normal leading-relaxed mb-10">
              No pitch. No jargon. Just honest advice from engineers who've done it before.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#228DC1] text-white text-sm font-medium hover:bg-[#1a6e99] transition-colors">
                Talk to an Expert <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
              </Link>
              <Link to="/solutions" className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/20 text-white/70 text-sm font-medium hover:border-white/40 hover:text-white transition-all">
                Explore Solutions
              </Link>
            </div>
          </div>
          <div className="space-y-6">
            <div className="border-t border-white/10 pt-6">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30 mb-2">Email</p>
              <a href="mailto:info@awtg.co.uk" className="text-white/70 hover:text-white transition-colors font-medium">info@awtg.co.uk</a>
            </div>
            <div className="border-t border-white/10 pt-6">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30 mb-2">Phone</p>
              <a href="tel:+442035155151" className="text-white/70 hover:text-white transition-colors font-medium">+44 (0) 20 3515 5151</a>
              <p className="text-xs text-white/30 mt-1 font-normal">Mon�Fri, 9am�6pm GMT</p>
            </div>
            <div className="border-t border-white/10 pt-6">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30 mb-2">Offices</p>
              <p className="text-white/70 font-medium">London � Lisbon � Stockholm � Singapore</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// --- PAGE ---------------------------------------------------------------------

export default function Home() {
  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#228DC1] focus:text-white focus:text-sm">Skip to main content</a>
      <main id="main-content">
        <Hero />
        <WhatWeDo />
        <AIProofPoints />
        <Industries />
        <WhyAWTG />
        <ClientVoices />
        <Insights />
        <ContactCTA />
      </main>
    </>
  )
}
