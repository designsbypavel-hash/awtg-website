import { useState, useRef, useEffect, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, Zap, Shield, BarChart2, Settings2, Check, Code2 } from 'lucide-react'
import CTASection from '@/components/CTASection'

// ── Scroll utilities ──────────────────────────────────────────────────────────
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, inView] as const
}

function useCountUp(end: number, inView: boolean, duration = 1400) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!inView) return
    const t0 = Date.now()
    const tick = () => {
      const p = Math.min((Date.now() - t0) / duration, 1)
      setVal((1 - Math.pow(1 - p, 3)) * end)
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, end, duration])
  return val
}

const reveal = (inView: boolean, delay = 0): CSSProperties => ({
  opacity: inView ? 1 : 0,
  transform: inView ? 'translateY(0)' : 'translateY(28px)',
  transition: `opacity 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
})

function ScrollProgress() {
  const [pct, setPct] = useState(0)
  useEffect(() => {
    const fn = () => {
      const d = document.documentElement
      setPct(d.scrollTop / (d.scrollHeight - d.clientHeight))
    }
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] pointer-events-none">
      <div style={{ width: `${pct * 100}%`, background: 'linear-gradient(90deg, #228DC1, #0e6a9a)', transition: 'width 80ms linear' }} className="h-full" />
    </div>
  )
}

function StatCard({ prefix = '', num, suffix = '', label, note, delay = 0 }: {
  prefix?: string; num: number; suffix?: string; label: string; note: string; delay?: number
}) {
  const [ref, inView] = useInView()
  const val = useCountUp(num, inView)
  const display = Number.isInteger(num) ? Math.round(val).toString() : val.toFixed(1)
  return (
    <div ref={ref} className="relative bg-white border border-gray-200 px-8 py-8 shadow-[0_1px_8px_rgba(10,22,40,0.03)] overflow-hidden" style={reveal(inView, delay)}>
      <div className="absolute top-0 left-0 w-[3px] h-full bg-gradient-to-b from-[#228DC1] to-[#0e6a9a]" />
      <p className="font-black leading-none mb-2" style={{ fontSize: 'clamp(24px, 2.8vw, 38px)', letterSpacing: '-0.02em', background: 'linear-gradient(135deg, #228DC1 0%, #0e6a9a 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
        {prefix}{display}{suffix}
      </p>
      <p className="text-[#0a1628] text-[13px] font-semibold mb-0.5">{label}</p>
      <p className="text-[#0a1628]/60 text-[10px] font-normal">{note}</p>
    </div>
  )
}

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
    <div className="bg-white border border-gray-200 overflow-hidden shadow-[0_16px_50px_rgba(10,22,40,0.07)]">
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
  { label: 'Freshdesk',  category: 'Support',    logo: '/logos/freshdesk.svg',  color: '#25C16F' },
  { label: 'Fin',        category: 'AI Support', logo: '/logos/fin.svg',        color: '#111827' },
  { label: 'Agentforce', category: 'AI Agent',   logo: '/logos/agentforce.svg', color: '#00A1E0' },
  { label: 'WhatsApp',   category: 'Messaging',  logo: '/logos/whatsapp.svg',   color: '#25D366' },
  { label: 'Slack',      category: 'Messaging',  logo: '/logos/slack.svg',      color: '#4A154B' },
  { label: 'Teams',      category: 'Messaging',  logo: '/logos/teams.svg',      color: '#6264A7' },
  { label: 'Zoom',       category: 'Video',      logo: '/logos/zoom.svg',       color: '#2D8CFF' },
  { label: 'Gmail',      category: 'Email',      logo: '/logos/gmail.svg',      color: '#EA4335' },
  { label: 'Outlook',    category: 'Email',      logo: '/logos/outlook.svg',    color: '#0078D4' },
  { label: 'Jira',       category: 'Ticketing',  logo: '/logos/jira.svg',       color: '#0052CC' },
  { label: 'MCP',        category: 'Protocol',   logo: null,                    color: '#228DC1' },
]

// 4x4 grid: actual integration logos + Kai + MCP
const GRID_ITEMS = [
  INTEGRATIONS[0],  // HubSpot
  INTEGRATIONS[1],  // Salesforce
  INTEGRATIONS[2],  // Zendesk
  INTEGRATIONS[3],  // Intercom
  INTEGRATIONS[4],  // Freshdesk
  { label: 'Kai', category: 'AI Agent', logo: '/logo-icon.svg' as string | null, color: '#228DC1', isKai: true },
  INTEGRATIONS[5],  // Fin
  INTEGRATIONS[6],  // Agentforce
  INTEGRATIONS[7],  // WhatsApp
  INTEGRATIONS[8],  // Slack
  INTEGRATIONS[9],  // Teams
  INTEGRATIONS[10], // Zoom
  INTEGRATIONS[11], // Gmail
  INTEGRATIONS[12], // Outlook
  INTEGRATIONS[13], // Jira
  INTEGRATIONS[14], // MCP
]

function IntegrationsSection() {
  const [tilt, setTilt]          = useState({ x: 0, y: 0 })
  const [hovCard, setHovCard]    = useState<string | null>(null)

  const onGridMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    setTilt({
      x: ((e.clientY - r.top  - r.height / 2) / (r.height / 2)) * -4,
      y: ((e.clientX - r.left - r.width  / 2) / (r.width  / 2)) *  4,
    })
  }

  return (
    <section className="py-24 bg-[#f8fafc] border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        <div className="grid lg:grid-cols-[4.6fr_7.4fr] gap-14 lg:gap-16 items-center">

          {/* Left: copy */}
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[#228DC1] mb-4" style={{ opacity: 0.75 }}>Integrations</p>
            <h2 className="font-heading text-[#0a1628] mb-5" style={{ fontSize: 'clamp(30px, 3.2vw, 46px)', lineHeight: 1.08 }}>
              Works with your existing stack.
            </h2>
            <p className="text-[#0a1628]/60 text-base font-normal leading-relaxed mb-8">
              No rip-and-replace. Kai connects to your live systems on day one.
              Extend it with APIs, webhooks or MCP.
            </p>
            <Link to="/contact" className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#228DC1] hover:gap-3 transition-all mb-10">
              Discuss your stack <ArrowRight className="w-4 h-4" />
            </Link>
            <div className="space-y-5">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#0a1628]/40 mb-3">Connection paths</p>
                <div className="flex flex-wrap gap-2">
                  {['Native apps', 'REST API', 'Webhooks', 'MCP', 'Email', 'Messaging'].map((ch) => (
                    <span key={ch} className="text-[11px] font-medium text-[#0a1628]/60 bg-white border border-gray-200 px-3 py-1.5 shadow-[0_1px_2px_rgba(10,22,40,0.03)]">{ch}</span>
                  ))}
                </div>
              </div>
              <div className="border-l-2 border-[#228DC1] pl-4">
                <p className="text-[#0a1628] text-[13px] font-semibold mb-1">MCP-ready connections</p>
                <p className="text-[#0a1628]/58 text-[13px] font-normal leading-relaxed">
                  Governed access to tools, files and enterprise systems.
                </p>
              </div>
            </div>
          </div>

          {/* Right: integration logo wall */}
          <div className="relative">
            <div className="absolute -inset-6 bg-white/65 border border-white hidden lg:block" />
            <div className="relative bg-white border border-gray-200 p-4 sm:p-5 shadow-[0_16px_50px_rgba(10,22,40,0.07)]">
              <div className="flex items-center justify-between gap-5 px-2 pb-5">
                <div>
                  <p className="text-[#0a1628] text-[14px] font-semibold">Integration ecosystem</p>
                  <p className="text-[#0a1628]/50 text-[11px] font-normal">Apps, channels, meetings and protocols</p>
                </div>
                <span className="hidden sm:inline-flex text-[10px] font-bold uppercase tracking-[0.18em] text-[#228DC1] bg-[#e5f4fa] px-3 py-1.5">
                  MCP supported
                </span>
              </div>

              <div
                className="grid grid-cols-2 sm:grid-cols-4 gap-3 select-none"
                onMouseMove={onGridMove}
                onMouseLeave={() => {
                  setTilt({ x: 0, y: 0 })
                  setHovCard(null)
                }}
                style={{
                  transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.18s linear',
                }}
              >
                {GRID_ITEMS.map((item) => {
                  const isKai = item.label === 'Kai'
                  const isMcp = item.label === 'MCP'
                  const isHov = hovCard === item.label
                  return (
                    <div
                      key={item.label}
                      className="min-h-[118px] flex flex-col items-center justify-center gap-3 cursor-default"
                      style={{
                        background: isKai
                          ? '#0a1628'
                          : isMcp
                            ? 'linear-gradient(135deg, #e5f4fa 0%, #ffffff 100%)'
                            : '#ffffff',
                        border: isKai ? 'none' : '1px solid rgba(10,22,40,0.08)',
                        boxShadow: isHov
                          ? (isKai ? '0 24px 54px rgba(10,22,40,0.34)' : '0 18px 42px rgba(10,22,40,0.12)')
                          : '0 1px 8px rgba(10,22,40,0.04)',
                        transform: isHov ? 'translateZ(22px) translateY(-3px)' : 'translateZ(0)',
                        transformStyle: 'preserve-3d',
                        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                      }}
                      onMouseEnter={() => setHovCard(item.label)}
                      onMouseLeave={() => setHovCard(null)}
                    >
                      {isKai ? (
                        <>
                          <img
                            src="/logo-icon.svg"
                            alt="Kai"
                            className="w-11 h-11 object-contain brightness-0 invert"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                          />
                          <div className="text-center">
                            <p className="text-white/80 font-semibold text-[11px] uppercase tracking-[0.2em]">Kai</p>
                            <p className="text-white/38 text-[10px] font-medium mt-1">AI Agent</p>
                          </div>
                        </>
                      ) : isMcp ? (
                        <>
                          <Code2 className="w-10 h-10 text-[#228DC1]" strokeWidth={1.6} />
                          <div className="text-center">
                            <p className="text-[#0a1628] font-semibold text-[12px]">MCP</p>
                            <p className="text-[#0a1628]/45 text-[10px] font-medium mt-1">Tool protocol</p>
                          </div>
                        </>
                      ) : (
                        <>
                          <img
                            src={item.logo ?? undefined}
                            alt={item.label}
                            className="w-12 h-12 object-contain"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                          />
                          <div className="text-center">
                            <p className="text-[#0a1628]/70 font-semibold text-[12px] tracking-[-0.01em]">{item.label}</p>
                            <p className="text-[#0a1628]/35 text-[10px] font-medium mt-1">{item.category}</p>
                          </div>
                        </>
                      )}
                    </div>
                  )
                })}
              </div>

              <div className="mt-4 grid sm:grid-cols-3 gap-3">
                {[
                  { label: 'Native integrations', value: '14+ platforms' },
                  { label: 'Custom systems', value: 'API + webhooks' },
                  { label: 'Tool access', value: 'MCP supported' },
                ].map((item) => (
                  <div key={item.label} className="bg-[#f8fafc] border border-gray-200 px-5 py-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#0a1628]/35 mb-1">{item.label}</p>
                    <p className="text-[#0a1628] text-[13px] font-semibold">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

function SecurityComplianceSection() {
  const [leftRef, leftInView] = useInView()
  const [gridRef, gridInView] = useInView()
  return (
    <section className="py-24 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-14 lg:gap-16 items-start">
          <div ref={leftRef} className="lg:sticky lg:top-28">
            <p className="type-label text-[#228DC1] mb-4" style={reveal(leftInView)}>Security & Compliance</p>
            <h2 className="font-heading text-[#0a1628] mb-5" style={{ fontSize: 'clamp(28px, 3.2vw, 46px)', lineHeight: 1.08, ...reveal(leftInView, 100) }}>
              Designed for regulated environments.
            </h2>
            <p className="text-[#0a1628]/65 text-base font-normal leading-relaxed mb-8 max-w-xl" style={reveal(leftInView, 180)}>
              Safe, measurable and auditable AI for teams with real governance requirements.
            </p>

            <div className="bg-[#0a1628] text-white p-8 shadow-[0_16px_50px_rgba(10,22,40,0.12)]" style={reveal(leftInView, 280)}>
              <div className="w-11 h-11 flex items-center justify-center bg-white/10 mb-6">
                <Shield className="w-5 h-5 text-[#6cc4ea]" strokeWidth={1.6} />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/45 mb-2">Governance proof</p>
              <p className="font-heading text-[24px] leading-tight mb-3">ISO 42001 AI Management System certified</p>
              <p className="text-white/58 text-sm font-normal leading-relaxed">
                Governance, access control and auditability are built in from day one.
              </p>
            </div>
          </div>

          <div>
            <div ref={gridRef} className="grid sm:grid-cols-2 gap-4">
              {[
                { badge: 'Encryption', title: 'Protected data paths', detail: 'TLS in transit. AES-256 at rest.' },
                { badge: 'Access', title: 'Least-privilege control', detail: 'Roles, MFA, permissions and audit trails.' },
                { badge: 'Testing', title: 'Verified posture', detail: 'CREST-aligned testing and TLS 1.3 checks.' },
                { badge: 'Residency', title: 'Data control', detail: 'GDPR-aligned with UK residency options.' },
                { badge: 'Deployment', title: 'Flexible deployment', detail: 'Cloud, hybrid or on-premises.' },
                { badge: 'AI governance', title: 'Auditable AI', detail: 'Rules for access, consent and escalation.' },
              ].map((item, i) => (
                <div key={item.badge} className="group bg-white border border-gray-200 p-6 shadow-[0_1px_8px_rgba(10,22,40,0.03)] hover:shadow-[0_16px_40px_rgba(10,22,40,0.07)] hover:-translate-y-0.5 transition-all" style={reveal(gridInView, i * 80)}>
                  <div className="flex items-center gap-3 mb-5">
                    <span className="w-8 h-8 flex items-center justify-center bg-[#e5f4fa] text-[#228DC1]">
                      <CheckCircle2 className="w-4 h-4" strokeWidth={1.7} />
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#228DC1]">{item.badge}</span>
                  </div>
                  <h3 className="text-[#0a1628] text-[15px] font-semibold mb-2">{item.title}</h3>
                  <p className="text-[#0a1628]/60 text-[13px] font-normal leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 grid sm:grid-cols-3 gap-3">
              {[
                { label: 'Audit ready', value: 'Logs + trails' },
                { label: 'Data control', value: 'GDPR aligned' },
                { label: 'Deployment', value: 'Your choice' },
              ].map((item) => (
                <div key={item.label} className="bg-[#f8fafc] border border-gray-200 px-5 py-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#0a1628]/35 mb-1">{item.label}</p>
                  <p className="text-[#0a1628] text-[13px] font-semibold">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function KaiPage() {
  const [stepsRef, stepsInView] = useInView()
  const [capsRef, capsInView] = useInView()
  const [chartRef, chartInView] = useInView(0.3)

  return (
    <>
      <ScrollProgress />
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-[#f8fafc] pt-32 pb-20">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(circle at 65% 20%, rgba(34,141,193,0.12) 0, transparent 50%), radial-gradient(circle at 10% 80%, rgba(14,106,154,0.06) 0, transparent 40%)' }}
        />
        <div className="relative max-w-7xl mx-auto px-8 lg:px-12">
          <p className="font-black text-[#228DC1] mb-3" style={{ fontSize: '13px', letterSpacing: '0.28em', textTransform: 'uppercase', opacity: 0.6 }}>
            Kai · Enterprise AI Agent
          </p>
          <h1 className="font-serif-display text-[#0a1628] leading-[1.02] mb-6 max-w-4xl" style={{ fontSize: 'clamp(44px, 5.8vw, 80px)' }}>
            The enterprise AI agent<br />
            that <span style={{ color: '#228DC1' }}>resolves,</span><br />
            not just responds.
          </h1>
          <p className="text-[#0a1628]/60 text-lg font-normal leading-relaxed max-w-2xl mb-10">
            Kai connects to your systems, follows your rules and helps teams resolve work faster.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#228DC1] text-white text-[13px] font-semibold hover:bg-[#1a6e99] transition-colors">
              Request a Demo
            </Link>
          </div>
        </div>
      </section>

      {/* ── Marquee ── */}
      <div className="bg-white border-y border-gray-100 py-4 overflow-hidden">
        <div className="flex animate-[marquee_35s_linear_infinite] whitespace-nowrap w-max">
          {[
            'Enterprise Teams', 'Contact Centre AI', 'Customer Operations', 'Regulated Industries',
            'ISO 42001 Certified', 'Financial Services', 'Higher Education', 'Public Sector',
            'Healthcare', 'Mixed-Stack Teams', 'Governance-Led AI', 'Telco & Utilities',
            'Enterprise Teams', 'Contact Centre AI', 'Customer Operations', 'Regulated Industries',
          ].map((item, i) => (
            <span key={i} className="inline-flex items-center text-[10px] font-semibold uppercase tracking-[0.2em] text-[#0a1628]/55 px-8">
              {item}
              <span className="ml-8 w-1 h-1 rounded-full bg-[#228DC1]/40 inline-block" />
            </span>
          ))}
        </div>
      </div>

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

      {/* ── British Council case study ── */}
      <section className="bg-[#f8fafc] border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-8 lg:px-12 py-20">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-14 lg:gap-20 items-center">
            <div className="max-w-xl">
              <p className="type-label text-[#228DC1] mb-5">Live in Production</p>
              <h2 className="font-heading text-[#0a1628] mb-5" style={{ fontSize: 'clamp(30px, 3.4vw, 50px)', lineHeight: 1.06 }}>
                British Council English Online is live at scale.
              </h2>
              <p className="text-[#0a1628]/64 text-[16px] font-normal leading-relaxed mb-8">
                Live integrations across HubSpot, WhatsApp, Jira and email. Built for real learner support at production scale.
              </p>
              <Link to="/insights/case-studies" className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#228DC1] hover:gap-3 transition-all">
                Read the case study <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="relative">
              <div className="absolute -inset-5 bg-white/60 border border-white hidden lg:block" />
              <div className="relative bg-white border border-gray-200 shadow-[0_16px_50px_rgba(10,22,40,0.07)]">
                <div className="grid sm:grid-cols-[1fr_1.25fr]">
                  <div className="p-8 bg-[#0a1628] text-white">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/45 mb-8">Production reach</p>
                    <p className="font-black leading-none mb-3" style={{ fontSize: 'clamp(46px, 5vw, 72px)', letterSpacing: '-0.04em' }}>
                      250k+
                    </p>
                    <p className="text-white/75 text-[14px] font-medium leading-relaxed">
                      learners supported each month through British Council English Online.
                    </p>
                  </div>
                  <div className="p-8">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#0a1628]/35 mb-6">Deployment snapshot</p>
                    <div className="space-y-5">
                      {[
                        { label: 'Channels', value: 'HubSpot, WhatsApp, Jira, email' },
                        { label: 'Human control', value: 'Escalation paths built in' },
                        { label: 'Measured', value: 'Containment, CSAT, escalations' },
                      ].map((item) => (
                        <div key={item.label} className="border-t border-gray-100 pt-5 first:border-t-0 first:pt-0">
                          <p className="text-[#228DC1] text-[11px] font-bold uppercase tracking-[0.16em] mb-1">{item.label}</p>
                          <p className="text-[#0a1628] text-[14px] font-semibold leading-relaxed">{item.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-100 bg-[#fafafa] px-8 py-5">
                  <p className="text-[#0a1628]/60 text-[13px] font-normal leading-relaxed">
                    Built for real operational pressure, not a showcase demo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Security & compliance ── */}
      <SecurityComplianceSection />

      {/* ── Real metrics ── */}
      <section className="bg-white border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <StatCard num={250} suffix="k+" label="Users / month" note="British Council English Online" delay={0} />
            <StatCard prefix="+" num={22.5} suffix="%" label="Containment uplift" note="Measured in production" delay={100} />
            <StatCard prefix="+" num={17} suffix="%" label="CSAT uplift" note="Learner satisfaction" delay={200} />
            <StatCard num={45} suffix="s" label="Avg handle time" note="AI-resolved queries" delay={300} />
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
              <h2 className="font-heading text-[#0a1628] mb-5" style={{ fontSize: 'clamp(30px, 3.2vw, 46px)', lineHeight: 1.08 }}>
                Performance you can measure.
              </h2>
              <p className="text-[#0a1628]/60 text-base font-normal leading-relaxed mb-10">
                Track containment, CSAT and handle time from day one.
              </p>
              <div className="space-y-0 border-t border-gray-100">
                {[
                  { stat: '+22.5%', label: 'Containment uplift', desc: 'More queries handled at first touch' },
                  { stat: '+17%',   label: 'CSAT improvement',   desc: 'Higher learner satisfaction' },
                  { stat: '45s',    label: 'Avg handle time',     desc: 'Measured in production' },
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
            <div className="bg-white border border-gray-200 shadow-[0_16px_50px_rgba(10,22,40,0.07)] p-6 sm:p-8">
              {/* Chart header */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5 mb-7">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#228DC1] mb-2">Live performance trend</p>
                  <p className="text-[#0a1628] font-semibold text-[18px] leading-tight">Containment rate after launch</p>
                </div>
                <div className="flex items-center gap-5 pt-0.5">
                  <span className="flex items-center gap-2">
                    <svg width="22" height="10"><line x1="0" y1="5" x2="22" y2="5" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 4" /></svg>
                    <span className="text-[11px] text-[#0a1628]/55">Baseline</span>
                  </span>
                  <span className="flex items-center gap-2">
                    <svg width="22" height="10"><line x1="0" y1="5" x2="22" y2="5" stroke="#228DC1" strokeWidth="2.5" /></svg>
                    <span className="text-[11px] text-[#0a1628]/65">Kai live</span>
                  </span>
                </div>
              </div>

              {/* Chart */}
              <div ref={chartRef} className="bg-[#f8fbfd] border border-gray-100 px-4 sm:px-6 pt-6 pb-4">
              <svg viewBox="0 0 560 280" className="w-full" style={{ overflow: 'visible' }}>
                <defs>
                  <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#228DC1" stopOpacity="0.24" />
                    <stop offset="100%" stopColor="#228DC1" stopOpacity="0.01" />
                  </linearGradient>
                  <filter id="chartGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="10" stdDeviation="10" floodColor="#228DC1" floodOpacity="0.18" />
                  </filter>
                </defs>

                {/* Horizontal grid lines at 55%, 65%, 75% */}
                {[
                  { y: 198, label: '55%' },
                  { y: 132, label: '65%' },
                  { y: 66,  label: '75%' },
                ].map(({ y, label }) => (
                  <g key={label}>
                    <line x1="44" y1={y} x2="532" y2={y} stroke="#0a1628" strokeWidth="0.5" strokeOpacity="0.07" />
                    <text x="34" y={y + 4} textAnchor="end" fontSize="10" fill="#0a1628" fillOpacity="0.32" fontFamily="system-ui, sans-serif">{label}</text>
                  </g>
                ))}

                {/* X-axis labels */}
                {[
                  { x: 44,  label: 'Baseline' },
                  { x: 168, label: 'Launch' },
                  { x: 354, label: 'Week 6' },
                  { x: 532, label: 'Week 12' },
                ].map(({ x, label }) => (
                  <text key={label} x={x} y="258" textAnchor="middle" fontSize="10" fill="#0a1628" fillOpacity="0.36" fontFamily="system-ui, sans-serif">{label}</text>
                ))}

                {/* X-axis base line */}
                <line x1="44" y1="232" x2="532" y2="232" stroke="#0a1628" strokeWidth="0.5" strokeOpacity="0.1" />

                {/* Kai go-live dashed vertical */}
                <line x1="168" y1="34" x2="168" y2="232" stroke="#228DC1" strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.38" />

                {/* "Kai live" pill */}
                <rect x="133" y="10" width="70" height="22" rx="11" fill="#228DC1" fillOpacity="0.12" />
                <text x="168" y="25" textAnchor="middle" fontSize="10" fill="#228DC1" fontWeight="700" fontFamily="system-ui, sans-serif">Launch</text>

                {/* Pre-Kai dashed baseline */}
                <path
                  d="M44,198 L75,204 L106,191 L137,198 L168,198"
                  fill="none"
                  stroke="#94a3b8"
                  strokeWidth="1.5"
                  strokeDasharray="5 4"
                />
                {/* Pre-Kai start dot */}
                <circle cx="44" cy="198" r="3" fill="#94a3b8" />

                {/* Area fill under post-Kai line */}
                <path
                  d="M168,198 L199,152 L230,118 L261,98 L292,82 L323,72 L354,66 L385,58 L416,52 L447,49 L478,48 L509,48 L532,48 L532,232 L168,232 Z"
                  fill="url(#areaGrad)"
                  style={{ opacity: chartInView ? 1 : 0, transition: 'opacity 1.2s ease 0.9s' }}
                />

                {/* Post-Kai solid line — draws on scroll */}
                <path
                  d="M168,198 L199,152 L230,118 L261,98 L292,82 L323,72 L354,66 L385,58 L416,52 L447,49 L478,48 L509,48 L532,48"
                  fill="none"
                  stroke="#228DC1"
                  strokeWidth="3"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  pathLength="1"
                  style={{ strokeDasharray: 1, strokeDashoffset: chartInView ? 0 : 1, transition: 'stroke-dashoffset 1.8s cubic-bezier(0.16,1,0.3,1) 0.2s' } as CSSProperties}
                  filter="url(#chartGlow)"
                />

                {/* Endpoint dot + value */}
                <circle cx="532" cy="48" r="12" fill="#228DC1" fillOpacity="0.14" style={{ opacity: chartInView ? 1 : 0, transition: 'opacity 0.4s ease 2s' }} />
                <circle cx="532" cy="48" r="5.5" fill="#228DC1" style={{ opacity: chartInView ? 1 : 0, transition: 'opacity 0.4s ease 2s' }} />
                <text x="519" y="33" textAnchor="middle" fontSize="12" fill="#228DC1" fontWeight="800" fontFamily="system-ui, sans-serif" style={{ opacity: chartInView ? 1 : 0, transition: 'opacity 0.4s ease 2.2s' }}>77.5%</text>

                {/* +22.5% annotation badge */}
                <rect x="242" y="82" width="92" height="26" rx="13" fill="#ffffff" stroke="#228DC1" strokeOpacity="0.18" style={{ opacity: chartInView ? 1 : 0, transition: 'opacity 0.4s ease 1.6s' }} />
                <text x="288" y="99" textAnchor="middle" fontSize="11" fill="#228DC1" fontWeight="800" fontFamily="system-ui, sans-serif" style={{ opacity: chartInView ? 1 : 0, transition: 'opacity 0.4s ease 1.6s' }}>+22.5% uplift</text>
              </svg>
              </div>

              {/* Bottom summary row */}
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { val: '55%', label: 'Baseline containment', colour: '#64748b' },
                  { val: '77.5%', label: 'Week 12 containment', colour: '#228DC1' },
                  { val: '+17%', label: 'CSAT uplift', colour: '#228DC1' },
                ].map(item => (
                  <div key={item.label} className="bg-white border border-gray-200 px-5 py-4">
                    <p className="font-black text-[20px] mb-1" style={{ color: item.colour, letterSpacing: '-0.02em' }}>{item.val}</p>
                    <p className="text-[11px] text-[#0a1628]/58 font-medium leading-tight">{item.label}</p>
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
            <h2 className="font-heading text-[#0a1628] mb-4" style={{ fontSize: 'clamp(30px, 3.2vw, 46px)', lineHeight: 1.08 }}>
              From first message to resolved ticket.<br />No scripted flows. No dead ends.
            </h2>
            <p className="text-[#0a1628]/60 text-[16px] font-normal leading-relaxed">
              Kai reads intent, checks live systems and keeps the workflow moving.
            </p>
          </div>
          <KaiDemo />
          <div className="mt-10 grid sm:grid-cols-3 gap-4">
            {[
              { label: 'System-connected', desc: 'CRM, ticketing and messaging in one flow.' },
              { label: 'Policy-governed', desc: 'Actions follow your configured rules.' },
              { label: 'Outcome-measured', desc: 'Containment, CSAT and escalation tracked live.' },
            ].map((item) => (
              <div key={item.label} className="bg-white border border-gray-200 px-8 py-6 shadow-[0_1px_8px_rgba(10,22,40,0.03)]">
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
            <h2 className="font-heading text-[#0a1628] mb-3" style={{ fontSize: 'clamp(30px, 3.2vw, 46px)', lineHeight: 1.08 }}>
              Live in 5 minutes.
            </h2>
            <p className="text-[#0a1628]/60 text-base font-normal leading-relaxed max-w-xl">
              Connect your stack and start handling real workflows in minutes.
            </p>
          </div>
          <div ref={stepsRef} className="grid sm:grid-cols-3 gap-px bg-gray-200 border border-gray-200">
            {[
              {
                num: '01', Icon: Settings2,
                label: 'Connect your systems',
                desc: 'CRM, helpdesk, messaging, email, API and MCP.',
              },
              {
                num: '02', Icon: Shield,
                label: 'Configure your rules',
                desc: 'Set access, tone, escalation and approval rules.',
              },
              {
                num: '03', Icon: BarChart2,
                label: 'Measure real outcomes',
                desc: 'Track containment, CSAT and escalations live.',
              },
            ].map((step, i) => (
              <div key={step.num} className="group bg-white p-8 hover:bg-[#f8fafc] transition-colors" style={reveal(stepsInView, i * 120)}>
                <div className="flex items-center gap-3 mb-6">
                  <span className="font-black text-[10px] text-[#228DC1]" style={{ letterSpacing: '0.05em' }}>{step.num}</span>
                  <div className="h-px flex-1 bg-gray-100" />
                </div>
                <div className="w-10 h-10 flex items-center justify-center mb-5" style={{ backgroundColor: '#228DC112' }}>
                  <step.Icon className="w-5 h-5 text-[#228DC1]" strokeWidth={1.5} />
                </div>
                <h3 className="text-[#0a1628] font-semibold text-[15px] leading-snug mb-2">{step.label}</h3>
                <p className="text-[#0a1628]/60 text-sm font-normal leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Capabilities ── */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <p className="type-label text-[#228DC1] mb-12">What Kai Does</p>
          <div ref={capsRef} className="grid lg:grid-cols-3 gap-px bg-gray-200 border border-gray-200">
            {[
              {
                Icon: Zap,
                label: 'Resolves routine queries faster.',
                desc: 'Routine work moves quickly. Exceptions stay with your team.',
              },
              {
                Icon: Settings2,
                label: 'Hands off with full context.',
                desc: 'Full history, sentiment and suggested next action.',
              },
              {
                Icon: Shield,
                label: 'Governed by your rules.',
                desc: 'Roles, MFA, audit trails and configurable AI behaviour.',
              },
            ].map((cap, i) => (
              <div key={cap.label} className="group bg-white p-8 hover:bg-[#f8fafc] transition-colors" style={reveal(capsInView, i * 120)}>
                <div className="w-10 h-10 flex items-center justify-center mb-5" style={{ backgroundColor: '#228DC112' }}>
                  <cap.Icon className="w-5 h-5 text-[#228DC1]" strokeWidth={1.5} />
                </div>
                <h3 className="text-[#0a1628] font-semibold text-[15px] leading-snug mb-2">{cap.label}</h3>
                <p className="text-[#0a1628]/60 text-sm font-normal leading-relaxed">{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What Kai Delivers ── */}
      <section className="py-24 bg-[#f8fafc] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="max-w-2xl mb-14">
            <p className="type-label text-[#228DC1] mb-4">What Kai Delivers</p>
            <h2 className="font-heading text-[#0a1628] mb-4" style={{ fontSize: 'clamp(30px, 3.2vw, 46px)', lineHeight: 1.08 }}>
              AI that fits your business.<br />Not the other way around.
            </h2>
            <p className="text-[#0a1628]/65 text-base font-normal leading-relaxed">
              Built for mixed systems, regulated teams and workflows that need more than one vendor ecosystem.
            </p>
          </div>

          {/* Kai capabilities table */}
          <div className="border border-gray-200 overflow-hidden shadow-[0_1px_8px_rgba(10,22,40,0.03)]">
            <div className="grid grid-cols-[1fr_1fr] bg-[#0a1628]">
              <div className="px-6 py-4 border-r border-white/10">
                <p className="text-white/40 text-[11px] font-semibold uppercase tracking-[0.18em]">Capability</p>
              </div>
              <div className="px-6 py-4 flex items-center gap-3">
                <img
                  src="/logo-icon.svg"
                  alt="Kai"
                  className="shrink-0 h-7 w-7 object-contain brightness-0 invert rounded-sm"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                />
                <p className="text-[13px] font-bold text-[#228DC1]">Kai</p>
              </div>
            </div>
            {[
              { label: 'Best fit',                  kai: 'Mixed systems, regulated teams' },
              { label: 'Ecosystem',                 kai: 'Vendor-flexible, integration-led' },
              { label: 'Custom governance',         kai: 'Consent, escalation, audit' },
              { label: 'Delivery model',            kai: 'Product + delivery support' },
              { label: 'Regulated sectors',         kai: true },
              { label: 'On-prem / hybrid deploy',   kai: true },
              { label: 'ISO 42001 AI certification', kai: true },
            ].map((row, rowIdx) => (
              <div key={row.label} className={`grid grid-cols-[1fr_1fr] border-t border-gray-100 ${rowIdx % 2 === 0 ? 'bg-white' : 'bg-[#fafafa]'}`}>
                <div className="px-6 py-4 border-r border-gray-100">
                  <p className="text-[#0a1628] text-[13px] font-semibold">{row.label}</p>
                </div>
                <div className="px-6 py-4 bg-[#e5f4fa]/30">
                  {typeof row.kai === 'boolean' ? (
                    <Check className="w-4 h-4 text-[#228DC1]" />
                  ) : (
                    <p className="text-[12px] font-medium text-[#0a1628]">{row.kai}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 border border-[#228DC1]/20 bg-[#e5f4fa]/40 shadow-[0_1px_8px_rgba(10,22,40,0.03)]">
            <p className="text-[#0a1628] text-[14px] font-medium leading-relaxed">
              <span className="text-[#228DC1] font-semibold">The Kai difference:</span>{' '}
              Configure Kai around your escalation logic, consent flows, integrations and governance model.
            </p>
          </div>
        </div>
      </section>

      {/* ── Integrations ── */}
      <IntegrationsSection />

      {/* ── Pilot CTA ── */}
      <section className="py-16 bg-[#f8fafc] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-8 lg:px-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <div>
            <p className="text-[#0a1628] font-semibold text-lg mb-1">Start with a focused pilot.</p>
            <p className="text-[#0a1628]/65 text-sm font-normal">
              One channel. One workflow. Measure real outcomes, then scale.
            </p>
          </div>
          <Link
            to="/contact"
            className="shrink-0 inline-flex items-center gap-2 px-7 py-3.5 border border-[#228DC1] text-[#228DC1] text-[13px] font-semibold hover:bg-[#228DC1] hover:text-white transition-all"
          >
            Request a Demo <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <CTASection />
    </>
  )
}
