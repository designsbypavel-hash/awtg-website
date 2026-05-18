import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, Zap, Shield, BarChart2, Settings2, Check, X, Code2 } from 'lucide-react'
import CTASection from '@/components/CTASection'

// ── Demo messages ─────────────────────────────────────────────────────────────
const demoMessages = [
  { role: 'customer', text: 'Hi, I need to change the email address on my account but the portal isn\'t working.', delay: 500 },
  { role: 'ai', text: 'I can help with that right now. Let me pull up your account details. Can you confirm the email address currently on file?', delay: 1800 },
  { role: 'customer', text: 'It\'s james.miller@company.co.uk', delay: 3200 },
  { role: 'ai', text: 'Found your account. I\'ve updated your email address and sent a confirmation to your new address. Is there anything else I can help you with today?', meta: 'CRM updated · Ticket closed · CSAT triggered', delay: 4800 },
  { role: 'signal', text: 'Resolved without escalation · Handle time: 38s', delay: 6200 },
]

function KaiDemo() {
  const [visible, setVisible] = useState<number[]>([])
  const [typing, setTyping] = useState(false)
  const timeoutsRef = useRef<number[]>([])

  const runDemo = () => {
    setVisible([])
    setTyping(false)
    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []
    demoMessages.forEach((msg, i) => {
      if (msg.role === 'ai' || msg.role === 'signal') {
        const t1 = window.setTimeout(() => setTyping(true), msg.delay - 700)
        timeoutsRef.current.push(t1)
      }
      const t = window.setTimeout(() => {
        setTyping(false)
        setVisible(prev => [...prev, i])
      }, msg.delay)
      timeoutsRef.current.push(t)
    })
  }

  useEffect(() => {
    const t = window.setTimeout(runDemo, 600)
    return () => { clearTimeout(t); timeoutsRef.current.forEach(clearTimeout) }
  }, [])

  const signalVisible = visible.includes(4)

  return (
    <div className="bg-white border border-gray-200 overflow-hidden shadow-[0_8px_48px_rgba(10,22,40,0.1)]">
      {/* Chrome bar */}
      <div className="flex items-center gap-1.5 px-4 py-3 bg-[#f3f4f6] border-b border-gray-200">
        <span className="w-2.5 h-2.5 rounded-full bg-[#fc5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <div className="flex-1 flex justify-center">
          <div className="bg-white border border-gray-200 px-3 py-1 text-[11px] text-gray-400 font-normal" style={{ minWidth: '220px', textAlign: 'center' }}>
            app.kai.awtg.co.uk/agent
          </div>
        </div>
        <button onClick={runDemo} className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#228DC1]/50 hover:text-[#228DC1] transition-colors">
          Replay
        </button>
      </div>

      {/* 3-panel layout */}
      <div className="grid grid-cols-[180px_1fr_170px] divide-x divide-gray-100" style={{ minHeight: '400px' }}>

        {/* Left: queue */}
        <div className="bg-[#f8fafc] p-4">
          <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-gray-400 mb-3">Live Queue</p>
          <div className="space-y-1.5">
            {[
              { name: 'James M.', topic: 'Account update', active: true },
              { name: 'Sarah K.', topic: 'Billing query', active: false },
              { name: 'Tom R.', topic: 'Technical issue', active: false },
              { name: 'Priya L.', topic: 'Onboarding', active: false },
            ].map((item) => (
              <div key={item.name} className={`px-2.5 py-2 text-[11px] ${item.active ? 'bg-[#228DC1] text-white' : 'text-gray-500 bg-white border border-gray-100'}`}>
                <p className="font-semibold">{item.name}</p>
                <p className={`text-[10px] ${item.active ? 'text-white/70' : 'text-gray-400'}`}>{item.topic}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-gray-200">
            <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-gray-400 mb-2">Today</p>
            <div className="space-y-1">
              <div className="flex justify-between text-[10px]">
                <span className="text-gray-400">Resolved by AI</span>
                <span className="text-[#059669] font-bold">{signalVisible ? '74%' : '73%'}</span>
              </div>
              <div className="flex justify-between text-[10px]">
                <span className="text-gray-400">Avg handle time</span>
                <span className="text-[#0a1628] font-semibold">45s</span>
              </div>
            </div>
          </div>
        </div>

        {/* Centre: conversation */}
        <div className="flex flex-col bg-white">
          <div className="px-4 py-3 border-b border-gray-100 bg-[#f8fafc] flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold text-[#0a1628]">James Miller</p>
              <p className="text-[10px] text-gray-400">English Online · Account query</p>
            </div>
            <span className="text-[10px] font-semibold text-[#059669] bg-[#f0fdf4] border border-[#059669]/20 px-2 py-0.5">AI handling</span>
          </div>

          <div className="flex-1 p-4 space-y-4 overflow-hidden bg-[#fafafa]">
            {demoMessages.slice(0, 4).map((msg, i) => {
              if (!visible.includes(i)) return null
              if (msg.role === 'customer') {
                return (
                  <div key={i} className="flex justify-end" style={{ animation: 'fadeIn 250ms ease-out' }}>
                    <div className="max-w-[78%] bg-[#228DC1] px-3.5 py-2.5">
                      <p className="text-[12px] text-white font-normal leading-relaxed">{msg.text}</p>
                    </div>
                  </div>
                )
              }
              return (
                <div key={i} className="flex gap-2.5 items-start" style={{ animation: 'fadeIn 250ms ease-out' }}>
                  <div className="w-6 h-6 bg-[#228DC1] flex items-center justify-center shrink-0">
                    <span className="text-white text-[9px] font-black">K</span>
                  </div>
                  <div className="flex-1">
                    <div className="bg-white border border-gray-100 px-3.5 py-2.5 shadow-[0_1px_4px_rgba(10,22,40,0.06)]">
                      <p className="text-[12px] text-[#0a1628] font-normal leading-relaxed">{msg.text}</p>
                    </div>
                    {msg.meta && (
                      <div className="mt-1.5 flex gap-1.5 flex-wrap">
                        {msg.meta.split(' · ').map((m) => (
                          <span key={m} className="text-[10px] font-medium text-[#228DC1] bg-[#e5f4fa] border border-[#228DC1]/15 px-2 py-0.5">{m}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}

            {typing && (
              <div className="flex gap-2.5 items-start" style={{ animation: 'fadeIn 150ms ease-out' }}>
                <div className="w-6 h-6 bg-[#228DC1] flex items-center justify-center shrink-0">
                  <span className="text-white text-[9px] font-black">K</span>
                </div>
                <div className="bg-white border border-gray-100 px-4 py-3 flex gap-1 items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-300" style={{ animation: 'pulse 0.9s ease-in-out infinite' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-300" style={{ animation: 'pulse 0.9s ease-in-out 0.18s infinite' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-300" style={{ animation: 'pulse 0.9s ease-in-out 0.36s infinite' }} />
                </div>
              </div>
            )}

            {signalVisible && (
              <div className="px-3 py-2 bg-[#e5f4fa] border border-[#228DC1]/20 flex items-center gap-2" style={{ animation: 'fadeIn 400ms ease-out' }}>
                <CheckCircle2 className="w-3.5 h-3.5 text-[#228DC1] shrink-0" />
                <p className="text-[10px] text-[#228DC1] font-semibold">{demoMessages[4].text}</p>
              </div>
            )}
          </div>

          <div className="px-4 py-3 border-t border-gray-100 flex gap-2 items-center">
            <div className="flex-1 bg-[#f8fafc] border border-gray-100 px-3 py-2 text-[11px] text-gray-300">
              Message customer...
            </div>
            <div className="w-7 h-7 bg-[#228DC1] flex items-center justify-center shrink-0">
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </div>
          </div>
        </div>

        {/* Right: metrics */}
        <div className="bg-[#f8fafc] p-4 flex flex-col gap-4">
          <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-gray-400">Resolution</p>
          <div>
            <p className="font-black text-[#0a1628] leading-none mb-1" style={{ fontSize: '28px', letterSpacing: '-0.02em' }}>
              {signalVisible ? '74' : '73'}<span className="text-[18px]">%</span>
            </p>
            <p className="text-[10px] text-gray-400 font-medium">AI resolution rate</p>
            <div className="mt-2 h-1 bg-gray-200 overflow-hidden">
              <div className="h-full bg-[#059669]" style={{ width: signalVisible ? '74%' : '73%', transition: 'width 0.8s ease-out' }} />
            </div>
          </div>
          <div className="pt-3 border-t border-gray-200 space-y-3">
            {[
              { label: 'CSAT uplift', val: '+17%', color: '#228DC1' },
              { label: 'Containment↑', val: '+22.5%', color: '#7c3aed' },
              { label: 'Escalations↓', val: '−13%', color: '#059669' },
            ].map((item) => (
              <div key={item.label} className="flex justify-between items-center">
                <span className="text-[10px] text-gray-400 font-medium">{item.label}</span>
                <span className="text-[11px] font-bold" style={{ color: item.color }}>{item.val}</span>
              </div>
            ))}
          </div>
          <div className="mt-auto pt-3 border-t border-gray-200">
            <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-gray-400 mb-1.5">Live integrations</p>
            <div className="flex flex-wrap gap-1">
              {['HubSpot', 'WhatsApp', 'Jira', 'Email'].map((tag) => (
                <span key={tag} className="text-[9px] font-semibold bg-white border border-gray-200 text-[#0a1628]/60 px-2 py-0.5">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Integrations (animated) ───────────────────────────────────────────────────
const INTEGRATIONS = [
  { label: 'HubSpot',    category: 'CRM',        logo: '/logos/hubspot.svg',    color: '#FF7A59' },
  { label: 'Salesforce', category: 'CRM',        logo: '/logos/salesforce.svg', color: '#00A1E0' },
  { label: 'Zendesk',    category: 'Support',    logo: '/logos/zendesk.svg',    color: '#03363D' },
  { label: 'Intercom',   category: 'Support',    logo: '/logos/intercom.svg',   color: '#1F8DED' },
  { label: 'WhatsApp',   category: 'Messaging',  logo: '/logos/whatsapp.svg',   color: '#25D366' },
  { label: 'Slack',      category: 'Messaging',  logo: '/logos/slack.svg',      color: '#4A154B' },
  { label: 'Gmail',      category: 'Email',      logo: '/logos/gmail.svg',      color: '#EA4335' },
  { label: 'Outlook',    category: 'Email',      logo: '/logos/outlook.svg',    color: '#0078D4' },
  { label: 'Teams',      category: 'Messaging',  logo: '/logos/teams.svg',      color: '#6264A7' },
  { label: 'Jira',       category: 'Ticketing',  logo: '/logos/jira.svg',       color: '#0052CC' },
  { label: 'Zoom',       category: 'Video',      logo: '/logos/zoom.svg',       color: '#2D8CFF' },
  { label: 'Custom API', category: 'Enterprise', logo: null,                    color: '#228DC1' },
]

// 3x4 grid: 11 integrations + Kai in the centre slot
const GRID_ITEMS = [
  INTEGRATIONS[0],  // HubSpot
  INTEGRATIONS[1],  // Salesforce
  INTEGRATIONS[2],  // Zendesk
  INTEGRATIONS[3],  // Intercom
  { label: 'Kai', category: 'AI Agent', logo: '/logo-icon.svg' as string | null, color: '#228DC1', isKai: true },
  INTEGRATIONS[4],  // WhatsApp
  INTEGRATIONS[5],  // Slack
  INTEGRATIONS[6],  // Gmail
  INTEGRATIONS[7],  // Outlook
  INTEGRATIONS[8],  // Teams
  INTEGRATIONS[9],  // Jira
  INTEGRATIONS[10], // Zoom
]

function IntegrationsSection() {
  const sectionRef               = useRef<HTMLDivElement>(null)
  const [scrollProg, setScrollProg] = useState(0)
  const [tilt, setTilt]          = useState({ x: 0, y: 0 })
  const [hovCard, setHovCard]    = useState<string | null>(null)

  // Scroll-driven progress: 0 = section below viewport, 1 = section comfortably in view
  useEffect(() => {
    const update = () => {
      const el = sectionRef.current
      if (!el) return
      const { top } = el.getBoundingClientRect()
      const wH = window.innerHeight
      // starts when section top enters at 90% of viewport, completes at 15%
      const prog = Math.max(0, Math.min(1, (wH * 0.9 - top) / (wH * 0.75)))
      setScrollProg(prog)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  const onGridMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    setTilt({
      x: ((e.clientY - r.top  - r.height / 2) / (r.height / 2)) * -4,
      y: ((e.clientX - r.left - r.width  / 2) / (r.width  / 2)) *  4,
    })
  }

  // Scroll-driven transform values
  const scrollTiltX  = (1 - scrollProg) * 22         // 22° → 0° as section scrolls into view
  const scrollShiftY = (1 - scrollProg) * 55         // drops 55px → 0

  return (
    <section ref={sectionRef} className="py-20 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        <div className="grid lg:grid-cols-[5fr_7fr] gap-16 items-center">

          {/* Left: copy */}
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[#228DC1] mb-4" style={{ opacity: 0.75 }}>Integrations</p>
            <h2 className="font-heading text-[#0a1628] mb-5" style={{ fontSize: 'clamp(26px, 2.8vw, 40px)' }}>
              Works with your existing stack.
            </h2>
            <p className="text-[#0a1628]/60 text-base font-normal leading-relaxed mb-8">
              No rip-and-replace. Kai connects to your live systems on day one.
              Not on the list? Kai integrates with any platform via REST API.
            </p>
            <Link to="/contact" className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#228DC1] hover:gap-3 transition-all mb-10">
              Discuss your stack <ArrowRight className="w-4 h-4" />
            </Link>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#0a1628]/40 mb-3">Channels supported</p>
              <div className="flex flex-wrap gap-2">
                {['Web chat', 'WhatsApp', 'Email', 'Mobile', 'API'].map((ch) => (
                  <span key={ch} className="text-[11px] font-medium text-[#0a1628]/55 border border-gray-200 px-3 py-1.5">{ch}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: scroll-driven 3-D grid */}
          <div className="relative overflow-hidden" style={{ maxHeight: '580px' }}>
            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-white via-white/80 to-transparent z-10 pointer-events-none" />

            {/* Perspective wrapper */}
            <div style={{ perspective: '1100px', perspectiveOrigin: '50% 40%' }}>
              <div
                className="grid grid-cols-3 gap-3 select-none"
                style={{
                  transformStyle: 'preserve-3d',
                  // Scroll tilt + mouse tilt combine additively
                  transform: `rotateX(${scrollTiltX + tilt.x}deg) rotateY(${tilt.y}deg) translateY(${scrollShiftY}px)`,
                  transition: 'transform 0.12s linear',
                  willChange: 'transform',
                }}
                onMouseMove={onGridMove}
                onMouseLeave={() => setTilt({ x: 0, y: 0 })}
              >
                {GRID_ITEMS.map((item, i) => {
                  const row   = Math.floor(i / 3)
                  // Each row fades in as scroll progresses: row 0 first, row 3 last
                  const rowThreshold = row * 0.2
                  const rowOpacity   = Math.max(0, Math.min(1, (scrollProg - rowThreshold) / 0.22))

                  const isKai = item.label === 'Kai'
                  const isHov = hovCard === item.label
                  return (
                    <div
                      key={item.label}
                      className="aspect-square flex flex-col items-center justify-center gap-3 rounded-2xl cursor-default"
                      style={{
                        background:     isKai ? '#0a1628'                   : '#ffffff',
                        border:         isKai ? 'none'                      : '1px solid rgba(0,0,0,0.07)',
                        boxShadow:      isHov
                          ? (isKai ? '0 28px 64px rgba(10,22,40,0.5)' : '0 20px 56px rgba(0,0,0,0.13)')
                          : (isKai ? '0 8px 28px rgba(10,22,40,0.22)' : '0 1px 5px rgba(0,0,0,0.05)'),
                        transform:      isHov ? 'translateZ(30px) scale(1.04)' : 'translateZ(0) scale(1)',
                        transformStyle: 'preserve-3d',
                        opacity:        rowOpacity,
                        // No transition on opacity (scroll-driven), spring only on hover transform
                        transition:     'transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease',
                      }}
                      onMouseEnter={() => setHovCard(item.label)}
                      onMouseLeave={() => setHovCard(null)}
                    >
                      {isKai ? (
                        <>
                          <img src="/logo-icon.svg" alt="Kai"
                            className="w-12 h-12 object-contain brightness-0 invert"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
                          <p className="text-white/70 font-semibold text-[11px] uppercase tracking-[0.2em]">Kai</p>
                        </>
                      ) : item.logo ? (
                        <>
                          <img src={item.logo} alt={item.label}
                            className="w-14 h-14 object-contain"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
                          <p className="text-[#0a1628]/55 font-medium text-[12px] tracking-[-0.01em]">{item.label}</p>
                        </>
                      ) : (
                        <>
                          <Code2 className="w-11 h-11" style={{ color: item.color }} strokeWidth={1.5} />
                          <p className="text-[#0a1628]/55 font-medium text-[12px]">{item.label}</p>
                        </>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function KaiPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-white pt-32 pb-0">
        {/* Subtle background grid */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'linear-gradient(rgba(34,141,193,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(34,141,193,0.04) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }} />

        <div className="relative max-w-7xl mx-auto px-8 lg:px-12">
          <div className="grid lg:grid-cols-[5fr_7fr] gap-12 lg:gap-16 items-end">

            {/* Left: copy */}
            <div className="pb-24">
              <p className="font-black text-[#228DC1] mb-4" style={{ fontSize: '13px', letterSpacing: '0.28em', textTransform: 'uppercase', opacity: 0.6 }}>
                Kai · Enterprise AI Agent
              </p>
              <h1 className="font-serif-display text-[#0a1628] leading-[1.02] mb-6" style={{ fontSize: 'clamp(40px, 4.8vw, 68px)' }}>
                The enterprise AI agent<br />
                that <span style={{ color: '#228DC1' }}>resolves,</span><br />not just responds.
              </h1>
              <p className="text-[#0a1628]/60 text-lg font-normal leading-relaxed mb-10">
                Kai handles customer service and operational workflows at scale. Connected to your systems, governed by your rules, measured by outcomes, not activity.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/contact" className="px-7 py-3.5 bg-[#228DC1] text-white text-[13px] font-semibold hover:bg-[#1a6e99] transition-colors">
                  Request a Demo
                </Link>
                <Link to="/contact" className="px-7 py-3.5 border border-gray-200 text-[#0a1628]/70 text-[13px] font-medium hover:border-[#228DC1]/50 hover:text-[#228DC1] transition-all">
                  Talk to an expert
                </Link>
              </div>

              <div className="mt-12 pt-8 border-t border-gray-100 flex flex-wrap items-center gap-4">
                <p className="text-[#0a1628]/60 text-[10px] font-semibold uppercase tracking-[0.2em]">Live in production with</p>
                <div className="border border-gray-100 bg-[#0a1628]/4 px-4 py-2.5 flex items-center gap-2.5">
                  <img
                    src="/logos/britishcouncil.svg"
                    alt="British Council"
                    className="h-5 w-5 object-contain rounded-sm"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                  />
                  <span className="text-[#0a1628]/60 text-[12px] font-semibold">British Council English Online</span>
                </div>
                <div className="border border-gray-100 bg-[#0a1628]/4 px-4 py-2.5">
                  <span className="text-[#0a1628]/60 text-[12px] font-semibold">250,000 users / month</span>
                </div>
              </div>
            </div>

            {/* Right: mockup — floats up, clipped at bottom edge */}
            <div className="relative hidden lg:block">
              {/* Glow behind mockup */}
              <div className="absolute -inset-8 rounded-3xl pointer-events-none" style={{
                background: 'radial-gradient(ellipse 80% 60% at 60% 50%, rgba(34,141,193,0.10) 0%, transparent 70%)',
              }} />
              <div
                className="relative overflow-hidden shadow-[0_20px_80px_rgba(10,22,40,0.12),0_4px_20px_rgba(34,141,193,0.08)] border border-gray-100/80"
                style={{ borderRadius: '12px 12px 0 0', transform: 'translateY(0)' }}
              >
                <img
                  src="/kai-mockup.svg"
                  alt="Kai platform interface"
                  className="w-full block"
                  style={{ display: 'block' }}
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Client logo strip ── */}
      <section className="bg-[#fafafa] border-t border-gray-100 border-b border-gray-100 py-10">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#0a1628]/30 text-center mb-8">
            Trusted by leading organisations
          </p>
          <div className="flex flex-wrap items-center justify-center gap-12 lg:gap-20">
            {[
              { src: '/logos/clients/ocean-infinity.svg',    alt: 'Ocean Infinity',               w: 'w-36' },
              { src: '/logos/clients/fard-solicitors.svg',   alt: 'Fard Solicitors',              w: 'w-36' },
              { src: '/logos/clients/kaiser-permanente.svg', alt: 'Kaiser Permanente',            w: 'w-40' },
              { src: '/logos/clients/cambridgeshire.svg',    alt: 'Cambridgeshire County Council', w: 'w-44' },
            ].map((logo) => (
              <img
                key={logo.alt}
                src={logo.src}
                alt={logo.alt}
                className={`${logo.w} h-10 object-contain opacity-75 hover:opacity-100 transition-opacity duration-300`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Real metrics ── */}
      <section className="bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-gray-100 border border-gray-100">
            {[
              { stat: '250k+', label: 'Users / month', note: 'British Council English Online' },
              { stat: '+22.5%', label: 'Containment uplift', note: 'Measured in production' },
              { stat: '+17%', label: 'CSAT uplift', note: 'Learner satisfaction' },
              { stat: '45s', label: 'Avg handle time', note: 'AI-resolved queries' },
            ].map((item) => (
              <div key={item.label} className="bg-white px-8 py-8">
                <p className="font-black text-[#228DC1] leading-none mb-2" style={{ fontSize: 'clamp(24px, 2.8vw, 38px)', letterSpacing: '-0.02em' }}>
                  {item.stat}
                </p>
                <p className="text-[#0a1628] text-[13px] font-semibold mb-0.5">{item.label}</p>
                <p className="text-[#0a1628]/60 text-[10px] font-normal">{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Performance Graph ── */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="grid lg:grid-cols-[1fr_1.6fr] gap-16 items-center">

            {/* Left: copy + stat list */}
            <div>
              <p className="type-label text-[#228DC1] mb-4">Measured Outcomes</p>
              <h2 className="font-heading text-[#0a1628] mb-5" style={{ fontSize: 'clamp(26px, 3vw, 42px)' }}>
                Performance you can<br />measure from week one.
              </h2>
              <p className="text-[#0a1628]/60 text-base font-normal leading-relaxed mb-10">
                Every Kai deployment is tracked against baseline. Containment, CSAT and handle time, live from day one, improving week on week.
              </p>
              <div className="space-y-0 border-t border-gray-100">
                {[
                  { stat: '+22.5%', label: 'Containment rate uplift', desc: 'More queries resolved without human handoff' },
                  { stat: '+17%',   label: 'CSAT improvement',        desc: 'Learner satisfaction, British Council English Online' },
                  { stat: '45s',    label: 'Avg handle time',          desc: 'AI-resolved queries, measured in production' },
                ].map(item => (
                  <div key={item.label} className="flex items-start gap-5 py-5 border-b border-gray-100">
                    <p className="font-black text-[#228DC1] shrink-0 w-[72px] leading-none mt-0.5" style={{ fontSize: 'clamp(20px, 1.8vw, 26px)', letterSpacing: '-0.02em' }}>
                      {item.stat}
                    </p>
                    <div>
                      <p className="text-[#0a1628] font-semibold text-[14px] mb-0.5">{item.label}</p>
                      <p className="text-[#0a1628]/60 text-[12px] font-normal leading-snug">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: SVG area chart */}
            <div className="border border-gray-100 shadow-[0_4px_40px_rgba(10,22,40,0.06)] p-8">
              {/* Chart header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="text-[#0a1628] font-semibold text-[14px] mb-1">Containment Rate · Weeks 1 to 12</p>
                  <p className="text-[#0a1628]/60 text-[11px] font-normal">British Council English Online · Live deployment</p>
                </div>
                <div className="flex items-center gap-5 pt-0.5">
                  <span className="flex items-center gap-2">
                    <svg width="20" height="10"><line x1="0" y1="5" x2="20" y2="5" stroke="#0a1628" strokeWidth="1.5" strokeOpacity="0.3" strokeDasharray="4 3" /></svg>
                    <span className="text-[11px] text-[#0a1628]/60">Pre-Kai</span>
                  </span>
                  <span className="flex items-center gap-2">
                    <svg width="20" height="10"><line x1="0" y1="5" x2="20" y2="5" stroke="#228DC1" strokeWidth="2" /></svg>
                    <span className="text-[11px] text-[#0a1628]/65">After Kai</span>
                  </span>
                </div>
              </div>

              {/* Chart */}
              <svg viewBox="0 0 560 260" className="w-full" style={{ overflow: 'visible' }}>
                <defs>
                  <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#228DC1" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="#228DC1" stopOpacity="0.01" />
                  </linearGradient>
                </defs>

                {/* Horizontal grid lines at 55%, 65%, 75% */}
                {[
                  { y: 186.67, label: '55%' },
                  { y: 120,    label: '65%' },
                  { y: 53.33,  label: '75%' },
                ].map(({ y, label }) => (
                  <g key={label}>
                    <line x1="40" y1={y} x2="540" y2={y} stroke="#0a1628" strokeWidth="0.5" strokeOpacity="0.07" />
                    <text x="34" y={y + 4} textAnchor="end" fontSize="10" fill="#0a1628" fillOpacity="0.28" fontFamily="system-ui, sans-serif">{label}</text>
                  </g>
                ))}

                {/* X-axis labels */}
                {[
                  { x: 40,     label: 'Wk −4' },
                  { x: 165,    label: 'Go-live' },
                  { x: 352.5,  label: 'Wk 6' },
                  { x: 540,    label: 'Wk 12' },
                ].map(({ x, label }) => (
                  <text key={label} x={x} y="242" textAnchor="middle" fontSize="10" fill="#0a1628" fillOpacity="0.28" fontFamily="system-ui, sans-serif">{label}</text>
                ))}

                {/* X-axis base line */}
                <line x1="40" y1="220" x2="540" y2="220" stroke="#0a1628" strokeWidth="0.5" strokeOpacity="0.1" />

                {/* Kai go-live dashed vertical */}
                <line x1="165" y1="18" x2="165" y2="220" stroke="#228DC1" strokeWidth="1" strokeDasharray="4 3" strokeOpacity="0.45" />

                {/* "Kai live" pill */}
                <rect x="139" y="8" width="52" height="18" rx="3" fill="#228DC1" fillOpacity="0.12" />
                <text x="165" y="21" textAnchor="middle" fontSize="10" fill="#228DC1" fontWeight="700" fontFamily="system-ui, sans-serif">Kai live</text>

                {/* Pre-Kai dashed baseline */}
                <path
                  d="M40,186.67 L71.25,193.33 L102.5,180 L133.75,186.67 L165,186.67"
                  fill="none"
                  stroke="#0a1628"
                  strokeWidth="1.5"
                  strokeOpacity="0.22"
                  strokeDasharray="5 4"
                />
                {/* Pre-Kai start dot */}
                <circle cx="40" cy="186.67" r="3" fill="#0a1628" fillOpacity="0.2" />

                {/* Area fill under post-Kai line */}
                <path
                  d="M165,186.67 L196.25,140 L227.5,106.67 L258.75,86.67 L290,70 L321.25,60 L352.5,53.33 L383.75,46.67 L415,40 L446.25,38 L477.5,36.67 L508.75,36.67 L540,36.67 L540,220 L165,220 Z"
                  fill="url(#areaGrad)"
                />

                {/* Post-Kai solid line */}
                <path
                  d="M165,186.67 L196.25,140 L227.5,106.67 L258.75,86.67 L290,70 L321.25,60 L352.5,53.33 L383.75,46.67 L415,40 L446.25,38 L477.5,36.67 L508.75,36.67 L540,36.67"
                  fill="none"
                  stroke="#228DC1"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />

                {/* Endpoint dot + value */}
                <circle cx="540" cy="36.67" r="5" fill="#228DC1" />
                <circle cx="540" cy="36.67" r="9" fill="#228DC1" fillOpacity="0.15" />
                <text x="534" y="24" textAnchor="middle" fontSize="11" fill="#228DC1" fontWeight="700" fontFamily="system-ui, sans-serif">77.5%</text>

                {/* +22.5% annotation badge */}
                <rect x="208" y="52" width="78" height="22" rx="3" fill="#228DC1" fillOpacity="0.1" />
                <text x="247" y="67" textAnchor="middle" fontSize="11" fill="#228DC1" fontWeight="700" fontFamily="system-ui, sans-serif">+22.5% ↑</text>

                {/* CSAT mini-bar row */}
                <text x="40" y="255" fontSize="10" fill="#0a1628" fillOpacity="0.25" fontFamily="system-ui, sans-serif">CSAT</text>
              </svg>

              {/* Bottom summary row */}
              <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-3 gap-4">
                {[
                  { val: '55%', label: 'Baseline containment', colour: '#0a162840' },
                  { val: '77.5%', label: 'Week 12 containment', colour: '#228DC1' },
                  { val: '+17%', label: 'CSAT uplift (same period)', colour: '#228DC1' },
                ].map(item => (
                  <div key={item.label} className="text-center">
                    <p className="font-bold text-[15px] mb-0.5" style={{ color: item.colour, letterSpacing: '-0.01em' }}>{item.val}</p>
                    <p className="text-[10px] text-[#0a1628]/60 font-normal leading-tight">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Animated Demo ── */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="max-w-2xl mb-14">
            <p className="type-label text-[#228DC1] mb-4">See Kai in Action</p>
            <h2 className="font-heading text-[#0a1628] mb-4" style={{ fontSize: 'clamp(26px, 3vw, 42px)' }}>
              From first message to resolved ticket.<br />No scripted flows. No dead ends.
            </h2>
            <p className="text-[#0a1628]/60 text-[16px] font-normal leading-relaxed">
              Kai reads intent, retrieves data from your live systems, takes action and closes the interaction. Autonomously.
            </p>
          </div>
          <KaiDemo />
          <div className="mt-10 grid sm:grid-cols-3 gap-px bg-gray-100 border border-gray-100">
            {[
              { label: 'System-connected', desc: 'Kai reads and writes directly to your CRM and ticketing platform. It acts, not just chats.' },
              { label: 'Policy-governed', desc: 'Every decision follows rules your team configured. Nothing outside those bounds. Ever.' },
              { label: 'Outcome-measured', desc: 'Containment rate, CSAT and escalation tracked live. You see exactly what Kai delivers.' },
            ].map((item) => (
              <div key={item.label} className="bg-white px-8 py-6">
                <p className="text-[#0a1628] font-semibold text-[14px] mb-2">{item.label}</p>
                <p className="text-[#0a1628]/60 text-sm font-normal leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How Kai Works ── */}
      <section className="py-24 bg-[#f8fafc] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="mb-16">
            <p className="type-label text-[#228DC1] mb-4">How It Works</p>
            <h2 className="font-heading text-[#0a1628] mb-3" style={{ fontSize: 'clamp(26px, 3vw, 42px)' }}>
              Live in weeks, not months.
            </h2>
            <p className="text-[#0a1628]/60 text-base font-normal leading-relaxed max-w-xl">
              No migration. No retraining your team. Kai connects to your existing stack and goes live from day one.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-px bg-gray-200 border border-gray-200">
            {[
              {
                num: '01', Icon: Settings2,
                label: 'Connect your systems',
                desc: 'Kai integrates with your CRM, helpdesk and ticketing tool. Live integrations include HubSpot, WhatsApp, Jira and email. Custom API for everything else.',
              },
              {
                num: '02', Icon: Shield,
                label: 'Configure your rules',
                desc: 'Define what Kai resolves autonomously, what it escalates, what tone it uses and what data it can access. Role-based, auditable, yours to update.',
              },
              {
                num: '03', Icon: BarChart2,
                label: 'Measure real outcomes',
                desc: 'Real-time dashboards surface containment rate, CSAT uplift and escalation reduction from week one. You own the data.',
              },
            ].map((step) => (
              <div key={step.num} className="bg-white p-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className="font-black text-[10px] text-[#228DC1]" style={{ letterSpacing: '0.05em' }}>{step.num}</span>
                  <div className="h-px flex-1 bg-gray-100" />
                </div>
                <div className="w-10 h-10 flex items-center justify-center mb-5" style={{ backgroundColor: '#228DC112' }}>
                  <step.Icon className="w-5 h-5 text-[#228DC1]" strokeWidth={1.5} />
                </div>
                <h3 className="text-[#0a1628] font-semibold text-[15px] leading-snug mb-3">{step.label}</h3>
                <p className="text-[#0a1628]/65 text-sm font-normal leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Capabilities ── */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <p className="type-label text-[#228DC1] mb-12">What Kai Does</p>
          <div className="grid lg:grid-cols-3 gap-px bg-gray-100 border border-gray-100">
            {[
              {
                Icon: Zap,
                label: 'Resolves without humans.',
                desc: 'Account updates, order queries, policy lookups. Kai closes them end-to-end. Average handle time: 45 seconds.',
              },
              {
                Icon: Settings2,
                label: 'Hands off with full context.',
                desc: 'When a human is needed, Kai transfers with full history, sentiment and a suggested next action. Escalations reduced by 13%.',
              },
              {
                Icon: Shield,
                label: 'Governed by your rules.',
                desc: 'Role-based access, MFA, audit trails, configurable AI behaviour and GDPR-aligned data residency. Standard, not add-ons.',
              },
            ].map((cap) => (
              <div key={cap.label} className="bg-white p-10 hover:bg-[#f7f9ff] transition-colors">
                <div className="w-10 h-10 flex items-center justify-center mb-6" style={{ backgroundColor: '#228DC112' }}>
                  <cap.Icon className="w-5 h-5 text-[#228DC1]" strokeWidth={1.5} />
                </div>
                <h3 className="font-heading text-[#0a1628] mb-3" style={{ fontSize: 'clamp(17px, 1.8vw, 21px)' }}>{cap.label}</h3>
                <p className="text-[#0a1628]/65 text-sm font-normal leading-relaxed">{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Kai vs alternatives ── */}
      <section className="py-24 bg-[#f8fafc] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="max-w-2xl mb-14">
            <p className="type-label text-[#228DC1] mb-4">How Kai is Different</p>
            <h2 className="font-heading text-[#0a1628] mb-4" style={{ fontSize: 'clamp(26px, 3vw, 42px)' }}>
              AI that fits your business.<br />Not the other way around.
            </h2>
            <p className="text-[#0a1628]/65 text-base font-normal leading-relaxed">
              Fin and Intercom are excellent within their ecosystem. Agentforce is powerful when you're Salesforce-native.
              Kai is for everyone else, built for organisations where governance, compliance and integration complexity matter.
            </p>
          </div>

          {/* Comparison table */}
          <div className="border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-4 bg-[#0a1628]">
              <div className="px-6 py-4 border-r border-white/10">
                <p className="text-white/40 text-[11px] font-semibold uppercase tracking-[0.18em]">Capability</p>
              </div>
              {[
                { name: 'Fin / Intercom', logo: '/logos/fin.svg', isKai: false },
                { name: 'Agentforce', logo: '/logos/agentforce.svg', isKai: false },
                { name: 'Kai', logo: '/logo-icon.svg', isKai: true },
              ].map((col, i) => (
                <div key={col.name} className={`px-6 py-4 flex items-center gap-3 ${i < 2 ? 'border-r border-white/10' : ''}`}>
                  <img
                    src={col.logo}
                    alt={col.name}
                    className="shrink-0 h-7 w-7 object-contain rounded-sm"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                  />
                  <p className={`text-[13px] font-bold ${col.isKai ? 'text-[#228DC1]' : 'text-white/60'}`}>{col.name}</p>
                </div>
              ))}
            </div>
            {/* Rows */}
            {[
              {
                label: 'Best fit',
                fin: 'Teams already using Intercom',
                sf: 'Salesforce-native orgs',
                kai: 'Mixed systems, bespoke workflows, regulated sectors',
              },
              {
                label: 'Ecosystem',
                fin: 'Intercom-centred',
                sf: 'Salesforce native',
                kai: 'Vendor-flexible, integration-led',
              },
              {
                label: 'Custom governance',
                fin: 'Platform controls',
                sf: 'Salesforce guardrails',
                kai: 'Configurable consent, escalation, audit, assurance',
              },
              {
                label: 'Delivery model',
                fin: 'SaaS self-serve',
                sf: 'Salesforce implementation',
                kai: 'Product + hands-on delivery, integration & optimisation',
              },
              {
                label: 'Regulated sectors',
                fin: false,
                sf: false,
                kai: true,
              },
              {
                label: 'On-prem / hybrid deploy',
                fin: false,
                sf: false,
                kai: true,
              },
              {
                label: 'ISO 42001 AI certification',
                fin: false,
                sf: false,
                kai: true,
              },
            ].map((row, rowIdx) => (
              <div key={row.label} className={`grid grid-cols-4 border-t border-gray-100 ${rowIdx % 2 === 0 ? 'bg-white' : 'bg-[#fafafa]'}`}>
                <div className="px-6 py-4 border-r border-gray-100">
                  <p className="text-[#0a1628] text-[13px] font-semibold">{row.label}</p>
                </div>
                {[row.fin, row.sf, row.kai].map((val, i) => (
                  <div key={i} className={`px-6 py-4 ${i < 2 ? 'border-r border-gray-100' : ''} ${i === 2 ? 'bg-[#e5f4fa]/30' : ''}`}>
                    {typeof val === 'boolean' ? (
                      val
                        ? <Check className="w-4 h-4 text-[#228DC1]" />
                        : <X className="w-4 h-4 text-[#0a1628]/20" />
                    ) : (
                      <p className={`text-[12px] font-normal leading-snug ${i === 2 ? 'text-[#0a1628] font-medium' : 'text-[#0a1628]/60'}`}>{val}</p>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 border border-[#228DC1]/20 bg-[#e5f4fa]/40">
            <p className="text-[#0a1628] text-[14px] font-medium leading-relaxed">
              <span className="text-[#228DC1] font-semibold">The Kai difference:</span>{' '}
              Kai can be configured around your escalation logic, consent flows, knowledge base, reporting needs, integrations, compliance requirements and operating model.
              You're not buying software. You're getting implementation, prompt engineering, integration support, testing, governance and ongoing optimisation from AWTG's delivery team.
            </p>
          </div>
        </div>
      </section>

      {/* ── British Council case study ── */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-20 items-center">
            <div>
              <p className="type-label text-[#228DC1] mb-6">Live in Production</p>
              <div className="flex items-center gap-3 mb-5">
                <img
                  src="/logos/britishcouncil.svg"
                  alt="British Council"
                  className="h-8 w-8 object-contain rounded"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                />
                <p className="text-[#0a1628]/60 text-[11px] font-semibold uppercase tracking-[0.2em]">British Council English Online</p>
              </div>
              <h2 className="font-heading text-[#0a1628] mb-5" style={{ fontSize: 'clamp(22px, 2.5vw, 36px)' }}>
                Supporting 250,000 learners a month.<br />Live, not a pilot.
              </h2>
              <p className="text-[#0a1628]/60 text-[16px] font-normal leading-relaxed mb-8">
                Kai was deployed into British Council English Online with live integrations across HubSpot, WhatsApp, Jira and email.
                The result: faster resolution, higher satisfaction and fewer escalations, measured from week one.
              </p>
              <Link to="/insights/case-studies" className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#228DC1] hover:gap-3 transition-all">
                Read the case study <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-px bg-gray-200 border border-gray-200">
              {[
                { stat: '250k+', label: 'Users / month', desc: 'Supported in production' },
                { stat: '+22.5%', label: 'Containment uplift', desc: 'More resolved without humans' },
                { stat: '+17%', label: 'CSAT uplift', desc: 'Learner satisfaction' },
                { stat: '−13%', label: 'Escalation reduction', desc: 'Fewer human handoffs needed' },
              ].map((item) => (
                <div key={item.label} className="bg-white px-6 py-8 text-center">
                  <p className="font-black text-[#228DC1] leading-none mb-2" style={{ fontSize: 'clamp(20px, 2.2vw, 30px)', letterSpacing: '-0.02em' }}>
                    {item.stat}
                  </p>
                  <p className="text-[#0a1628] text-[11px] font-semibold mb-1">{item.label}</p>
                  <p className="text-[#0a1628]/60 text-[10px] font-normal">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Integrations ── */}
      <IntegrationsSection />

      {/* ── Security & compliance ── */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="type-label text-[#228DC1] mb-4">Security & Compliance</p>
              <h2 className="font-heading text-[#0a1628] mb-4" style={{ fontSize: 'clamp(24px, 2.8vw, 38px)' }}>
                Designed for regulated environments.
              </h2>
              <p className="text-[#0a1628]/65 text-base font-normal leading-relaxed">
                Built for public sector, education, healthcare and large enterprise — where AI needs to be safe, measurable and auditable within existing governance frameworks.
              </p>
            </div>
            <div className="space-y-0 border border-gray-100">
              {[
                { badge: 'Encryption', detail: 'TLS 1.2+ / TLS 1.3 in transit · AES-256 at rest on GCP' },
                { badge: 'Access control', detail: 'Role-based access · MFA · Least privilege · Audit trails' },
                { badge: 'AI governance', detail: 'ISO 42001 AI Management System certified · AWTG' },
                { badge: 'Penetration testing', detail: 'CREST-aligned testing · SSL Labs verified TLS 1.3' },
                { badge: 'Data residency', detail: 'GDPR-aligned · DPIA support · UK data residency options' },
                { badge: 'Deployment', detail: 'Cloud · Hybrid · On-premises. Your choice.' },
              ].map((item, i) => (
                <div key={item.badge} className={`flex items-start gap-4 px-6 py-4 ${i % 2 === 0 ? 'bg-white' : 'bg-[#fafafa]'} border-b border-gray-100 last:border-0`}>
                  <span className="shrink-0 text-[10px] font-bold uppercase tracking-[0.14em] text-[#228DC1] bg-[#e5f4fa] px-2 py-1 mt-0.5">{item.badge}</span>
                  <p className="text-[#0a1628]/65 text-[13px] font-normal leading-snug">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Pilot CTA ── */}
      <section className="py-16 bg-[#0a1628]">
        <div className="max-w-7xl mx-auto px-8 lg:px-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <div>
            <p className="text-white font-semibold text-lg mb-1">Start with a focused pilot.</p>
            <p className="text-white/50 text-sm font-normal">
              One channel. One use case. Measure containment rate and CSAT in four weeks. Scale from there.
            </p>
          </div>
          <Link
            to="/contact"
            className="shrink-0 inline-flex items-center gap-2 px-7 py-3.5 bg-[#228DC1] text-white text-[13px] font-semibold hover:bg-[#1a6e99] transition-all"
          >
            Request a Demo <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <CTASection />
    </>
  )
}
