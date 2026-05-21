import { useState, useRef, useEffect, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faCircleCheck, faBolt, faShield, faChartBar, faGear, faCheck, faXmark, faComments, faArrowTrendUp, faWandSparkles, faSliders, faBookOpen, faPlug } from '@fortawesome/free-solid-svg-icons'
import CTASection from '@/components/CTASection'

// -- Scroll utilities ----------------------------------------------------------
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

// -- Kai Dashboard mockup ------------------------------------------------------
function KaiDashboard() {
  const [activeTab,  setActiveTab]  = useState('details')
  const [activeAsst, setActiveAsst] = useState(0)
  const [visible,    setVisible]    = useState<number[]>([])
  const [typing,     setTyping]     = useState(false)
  const tmrRef = useRef<number[]>([])

  type PlayMsg = { role: 'user' | 'ai' | 'signal'; text: string; meta?: string }
  const playMsgs: PlayMsg[] = [
    { role: 'user',   text: 'Hi, my order hasn\'t arrived � it\'s been 5 days.' },
    { role: 'ai',     text: 'I can see order #48291. It shipped Monday and is with the courier � delivery is due today before 6 pm.', meta: 'Order lookup � CRM synced' },
    { role: 'user',   text: 'Perfect, thank you!' },
    { role: 'signal', text: 'Resolved � 22s handle time � CSAT triggered' },
  ]
  const delays = [900, 2300, 3900, 5100]

  const runChat = () => {
    setVisible([])
    setTyping(false)
    tmrRef.current.forEach(clearTimeout)
    tmrRef.current = []
    playMsgs.forEach((msg, i) => {
      if (msg.role === 'ai') {
        const t1 = window.setTimeout(() => setTyping(true), delays[i] - 700)
        tmrRef.current.push(t1)
      }
      const t = window.setTimeout(() => {
        setTyping(false)
        setVisible(prev => [...prev, i])
      }, delays[i])
      tmrRef.current.push(t)
    })
  }

  useEffect(() => {
    const t = window.setTimeout(runChat, 700)
    return () => { clearTimeout(t); tmrRef.current.forEach(clearTimeout) }
  }, [])

  const resolved   = visible.includes(3)
  const tabs       = ['Details', 'Instructions', 'Training', 'Prompts', 'Chat interface', 'Integrations']
  const assistants = [
    { name: 'Contact Centre AI', sessions: '12,481', live: true  },
    { name: 'British Council',   sessions: '8,924',  live: true  },
  ]

  return (
    <div className="bg-white border border-gray-200 overflow-hidden shadow-[0_24px_60px_rgba(10,22,40,0.10)]">

      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 px-4 py-2.5 bg-[#f0f2f5] border-b border-gray-200">
        <span className="w-2.5 h-2.5 rounded-full bg-[#fc5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <div className="flex-1 flex justify-center">
          <div className="bg-white border border-gray-200 px-4 py-1 text-[11px] text-gray-400 font-normal text-center" style={{ minWidth: '240px' }}>
            app.kai.awtg.co.uk/dashboard
          </div>
        </div>
        <button onClick={runChat} className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#228DC1]/50 hover:text-[#228DC1] transition-colors">
          Replay
        </button>
      </div>

      {/* App top bar */}
      <div className="flex items-center justify-between px-5 py-2.5 bg-[#0a1628] border-b border-white/[0.07]">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 bg-[#228DC1] flex items-center justify-center shrink-0">
            <img src="/kai-logo.svg" alt="Kai" className="w-3.5 h-3.5 object-contain brightness-0 invert"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
          </div>
          <div className="leading-none">
            <span className="text-white font-bold text-[13px] tracking-[-0.01em]">Kai</span>
            <span className="text-white/30 text-[9px] ml-2">powered by AWTG</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="text-[10px] font-semibold text-white/80 border border-white/20 px-3 py-1 hover:bg-white/10 transition-colors">
            Switch to Kai Agent
          </button>
          <div className="w-6 h-6 bg-white/10 flex items-center justify-center">
            <FontAwesomeIcon icon={faGear} className="w-3 h-3 text-white/45" />
          </div>
        </div>
      </div>

      {/* 3-column layout */}
      <div className="grid grid-cols-[195px_1fr_235px] divide-x divide-gray-100" style={{ minHeight: '460px' }}>

        {/* -- Sidebar -- */}
        <div className="bg-[#f8fafc] flex flex-col">
          <div className="flex-1 px-3 pt-5 pb-3 overflow-hidden">
            <p className="font-bold text-[#0a1628] text-[14px] mb-4 px-1">Dashboard</p>

            {/* Admin Panel nav group */}
            <div className="mb-3">
              <div className="flex items-center justify-between px-2 py-1 mb-0.5">
                <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#0a1628]/35">Admin Panel</span>
                <span className="text-[#0a1628]/25 text-[10px]">?</span>
              </div>
              {['Dashboard', 'Access management', 'User management'].map(item => (
                <button key={item} className="w-full text-left px-3 py-1.5 text-[11px] text-[#0a1628]/50 hover:text-[#0a1628]/80 hover:bg-white/70 transition-colors">
                  {item}
                </button>
              ))}
            </div>

            <div className="space-y-0.5 mb-4">
              {['Chats history', 'Collected leads'].map(item => (
                <button key={item} className="w-full text-left px-3 py-1.5 text-[11px] text-[#0a1628]/50 hover:text-[#0a1628]/80 hover:bg-white/70 transition-colors">
                  {item}
                </button>
              ))}
            </div>

            {/* Assistants */}
            <div className="border-t border-gray-200 pt-3">
              <div className="flex items-center justify-between px-1 mb-2">
                <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#0a1628]/35">Assistants</p>
                <span className="text-[9px] text-[#0a1628]/30 font-medium">2 / 40</span>
              </div>
              {assistants.map((asst, i) => (
                <button
                  key={asst.name}
                  onClick={() => setActiveAsst(i)}
                  className={`w-full flex items-center gap-2 px-2 py-2 mb-1 text-left transition-all ${
                    activeAsst === i
                      ? 'bg-white border border-gray-200 shadow-[0_1px_4px_rgba(10,22,40,0.06)]'
                      : 'hover:bg-white/60'
                  }`}
                >
                  <div className="w-5 h-5 bg-[#228DC1] flex items-center justify-center shrink-0">
                    <span className="text-white text-[8px] font-black">K</span>
                  </div>
                  <span className={`text-[11px] truncate flex-1 ${activeAsst === i ? 'text-[#0a1628] font-semibold' : 'text-[#0a1628]/50'}`}>
                    {asst.name}
                  </span>
                  {asst.live && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#059669] shrink-0" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Usage stats pinned to bottom */}
          <div className="px-3 py-4 border-t border-gray-200 shrink-0">
            <div className="flex items-center justify-between mb-2.5">
              <p className="text-[9px] font-bold text-[#0a1628]/35 uppercase tracking-[0.14em]">Enterprise plan</p>
              <span className="text-[9px] text-[#228DC1] font-semibold">Active</span>
            </div>
            {[
              { label: 'Sessions', pct: 25 },
              { label: 'Tokens',   pct: 11 },
              { label: 'Messages', pct: 4  },
            ].map(u => (
              <div key={u.label} className="mb-2">
                <div className="flex justify-between text-[9px] text-[#0a1628]/40 mb-0.5">
                  <span>{u.label}</span><span>{u.pct}%</span>
                </div>
                <div className="h-0.5 bg-gray-200 overflow-hidden">
                  <div className="h-full bg-[#228DC1] transition-all" style={{ width: `${u.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* -- Main content -- */}
        <div className="flex flex-col bg-white">

          {/* Tab bar */}
          <div className="flex items-end border-b border-gray-100 overflow-x-auto shrink-0">
            {tabs.map(tab => {
              const key = tab.toLowerCase().replace(/\s+/g, '-')
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(key)}
                  className={`px-4 py-3 text-[11px] whitespace-nowrap transition-colors border-b-2 -mb-px ${
                    activeTab === key
                      ? 'border-[#228DC1] text-[#228DC1] font-semibold'
                      : 'border-transparent text-[#0a1628]/40 hover:text-[#0a1628]/65 font-medium'
                  }`}
                >
                  {tab}
                </button>
              )
            })}
          </div>

          {/* Tab content */}
          <div className="flex-1 overflow-auto">

            {activeTab === 'details' && (
              <div className="p-6 space-y-5">
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#0a1628]/35 mb-1.5">Name</p>
                    <div className="flex items-center gap-2">
                      <p className="text-[#0a1628] font-semibold text-[13px]">{assistants[activeAsst].name}</p>
                      <span className="text-[#228DC1]/40 text-[11px] cursor-pointer hover:text-[#228DC1] transition-colors">?</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#0a1628]/35 mb-1.5">Status</p>
                    <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#059669]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
                      Live
                    </span>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#0a1628]/35 mb-1.5">AI model</p>
                    <div className="inline-flex items-center gap-2 bg-[#f8fafc] border border-gray-200 px-3 py-1.5 cursor-pointer hover:border-gray-300 transition-colors">
                      <span className="text-[#0a1628] text-[12px] font-medium">Claude Sonnet</span>
                      <span className="text-gray-400 text-[9px]">?</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#0a1628]/35 mb-1.5">Sessions (30d)</p>
                    <p className="text-[#0a1628] font-semibold text-[13px]">{assistants[activeAsst].sessions}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#0a1628]/35 mb-1.5">Created</p>
                    <p className="text-[#0a1628]/65 text-[12px]">12 Mar 2025</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#0a1628]/35 mb-1.5">Last trained</p>
                    <p className="text-[#0a1628]/65 text-[12px]">Today, 08:14</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#0a1628]/35 mb-2.5">Active channels</p>
                  <div className="flex gap-2 flex-wrap">
                    {['Web chat', 'WhatsApp', 'Email', 'Microsoft Teams'].map(ch => (
                      <span key={ch} className="text-[10px] font-medium text-[#228DC1] bg-[#e5f4fa] border border-[#228DC1]/20 px-2.5 py-1">{ch}</span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#0a1628]/35 mb-2.5">Performance (30d)</p>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: 'Resolution',      val: '74%',   color: '#059669' },
                      { label: 'Avg handle time', val: '45s',   color: '#228DC1' },
                      { label: 'CSAT score',      val: '4.7/5', color: '#7c3aed' },
                    ].map(s => (
                      <div key={s.label} className="bg-[#f8fafc] border border-gray-100 px-3 py-3">
                        <p className="font-black text-[18px] leading-none mb-1" style={{ color: s.color, letterSpacing: '-0.02em' }}>{s.val}</p>
                        <p className="text-[9px] text-[#0a1628]/40">{s.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'instructions' && (
              <div className="p-6 space-y-5">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#0a1628]/35 mb-2">System instruction</p>
                  <div className="bg-[#f8fafc] border border-gray-100 p-4 font-mono text-[11px] text-[#0a1628]/60 leading-relaxed">
                    You are Kai, an AI agent for AWTG's Contact Centre. Assist customers with account queries, order tracking, billing and technical support. Always verify identity before accessing account data. Escalate safeguarding concerns or formal complaints to a human agent immediately. Maintain a professional, empathetic tone at all times.
                  </div>
                </div>
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#0a1628]/35 mb-2">Escalation rules</p>
                  <div className="border border-gray-100 divide-y divide-gray-100">
                    {[
                      { trigger: 'Safeguarding concern',   action: 'Immediate escalation' },
                      { trigger: 'Formal complaint',        action: 'Senior agent queue' },
                      { trigger: 'Billing dispute > �500',  action: 'Finance team + full transcript' },
                      { trigger: 'Unresolved in 3 turns',   action: 'Human handoff with summary' },
                    ].map(r => (
                      <div key={r.trigger} className="flex items-center justify-between px-4 py-2.5">
                        <span className="text-[11px] text-[#0a1628]/60 font-medium">{r.trigger}</span>
                        <span className="text-[10px] text-[#228DC1] font-semibold shrink-0 ml-4">{r.action}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'training' && (
              <div className="p-6">
                <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#0a1628]/35 mb-3">Knowledge base</p>
                <div className="border border-gray-100 divide-y divide-gray-100">
                  {[
                    { name: 'Contact Centre Policy v3.pdf', size: '2.4 MB', date: 'Today, 08:14', type: 'PDF' },
                    { name: 'Product FAQ � Q1 2025.docx',  size: '890 KB', date: '14 May 2025',  type: 'DOC' },
                    { name: 'Billing and Refunds Guide.pdf', size: '1.1 MB', date: '2 Apr 2025', type: 'PDF' },
                  ].map(f => (
                    <div key={f.name} className="flex items-center gap-3 px-4 py-3">
                      <div className="w-7 h-7 bg-[#e5f4fa] flex items-center justify-center shrink-0">
                        <span className="text-[#228DC1] text-[8px] font-black">{f.type}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-semibold text-[#0a1628] truncate">{f.name}</p>
                        <p className="text-[9px] text-[#0a1628]/40">{f.size} � {f.date}</p>
                      </div>
                      <FontAwesomeIcon icon={faCircleCheck} className="w-3.5 h-3.5 text-[#059669] shrink-0" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'integrations' && (
              <div className="p-6">
                <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#0a1628]/35 mb-3">Connected services</p>
                <div className="space-y-1.5">
                  {[
                    { name: 'HubSpot CRM',        status: 'Connected', badge: 'CRM'       },
                    { name: 'Zendesk',             status: 'Connected', badge: 'Support'   },
                    { name: 'WhatsApp Business',   status: 'Connected', badge: 'Messaging' },
                    { name: 'Microsoft Teams',     status: 'Connected', badge: 'Messaging' },
                    { name: 'Jira',                status: 'Available', badge: 'Ticketing' },
                    { name: 'Salesforce',          status: 'Available', badge: 'CRM'       },
                  ].map(svc => (
                    <div key={svc.name} className="flex items-center gap-3 px-4 py-3 bg-[#f8fafc] border border-gray-100 hover:border-gray-200 transition-colors">
                      <span className="text-[9px] font-bold text-[#0a1628]/35 bg-white border border-gray-200 px-2 py-0.5 w-[68px] text-center shrink-0">{svc.badge}</span>
                      <span className="flex-1 text-[12px] font-medium text-[#0a1628]">{svc.name}</span>
                      <span className={`text-[10px] font-semibold shrink-0 ${svc.status === 'Connected' ? 'text-[#059669]' : 'text-[#0a1628]/30'}`}>
                        {svc.status === 'Connected' ? '? ' : '? '}{svc.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!['details','instructions','training','integrations'].includes(activeTab) && (
              <div className="flex items-center justify-center h-full p-12 text-center">
                <div>
                  <p className="text-[#0a1628]/20 text-[13px] font-medium mb-1">
                    {tabs.find(t => t.toLowerCase().replace(/\s+/g,'-') === activeTab)}
                  </p>
                  <p className="text-[#0a1628]/15 text-[11px]">Configure this section for your assistant</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* -- Playground -- */}
        <div className="bg-[#f8fafc] flex flex-col">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-100 bg-white shrink-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#0a1628]/35">Playground</p>
            <button onClick={runChat} className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#228DC1]/45 hover:text-[#228DC1] transition-colors">Replay</button>
          </div>

          {/* Chat widget */}
          <div className="flex flex-col flex-1 m-3 mb-2 bg-white border border-gray-100 overflow-hidden shadow-[0_4px_20px_rgba(10,22,40,0.07)]">
            <div className="bg-[#228DC1] px-3.5 py-2.5 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-white/20 flex items-center justify-center shrink-0">
                  <span className="text-white text-[8px] font-black">K</span>
                </div>
                <div className="leading-none">
                  <p className="text-white font-semibold text-[11px]">{assistants[activeAsst].name}</p>
                  <p className="text-white/50 text-[9px]">powered by AWTG</p>
                </div>
              </div>
              <span className="w-2 h-2 rounded-full bg-[#34d399]" style={{ boxShadow: '0 0 6px rgba(52,211,153,0.7)', animation: 'pulse 2s ease-in-out infinite' }} />
            </div>

            <div className="flex-1 p-3 space-y-2.5 overflow-hidden" style={{ background: '#fafafa', minHeight: '200px' }}>
              {/* Greeting bubble � always visible */}
              <div className="flex gap-2 items-start">
                <div className="w-5 h-5 bg-[#228DC1] flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-white text-[8px] font-black">K</span>
                </div>
                <div className="bg-white border border-gray-100 px-3 py-2 shadow-[0_1px_3px_rgba(10,22,40,0.04)]">
                  <p className="text-[#0a1628] text-[10px] leading-relaxed">Hi there! How can I help you today?</p>
                </div>
              </div>

              {playMsgs.slice(0, 3).map((msg, i) => {
                if (!visible.includes(i)) return null
                if (msg.role === 'signal') return null
                if (msg.role === 'user') return (
                  <div key={i} className="flex justify-end" style={{ animation: 'fadeIn 200ms ease-out' }}>
                    <div className="max-w-[82%] bg-[#228DC1] px-3 py-2">
                      <p className="text-white text-[10px] leading-relaxed">{msg.text}</p>
                    </div>
                  </div>
                )
                return (
                  <div key={i} className="flex gap-2 items-start" style={{ animation: 'fadeIn 200ms ease-out' }}>
                    <div className="w-5 h-5 bg-[#228DC1] flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-white text-[8px] font-black">K</span>
                    </div>
                    <div>
                      <div className="bg-white border border-gray-100 px-3 py-2 shadow-[0_1px_3px_rgba(10,22,40,0.04)]">
                        <p className="text-[#0a1628] text-[10px] leading-relaxed">{msg.text}</p>
                      </div>
                      {msg.meta && (
                        <div className="mt-1 flex gap-1 flex-wrap">
                          {msg.meta.split(' � ').map(m => (
                            <span key={m} className="text-[8px] text-[#228DC1] bg-[#e5f4fa] border border-[#228DC1]/15 px-1.5 py-0.5">{m}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}

              {typing && (
                <div className="flex gap-2 items-start" style={{ animation: 'fadeIn 150ms ease-out' }}>
                  <div className="w-5 h-5 bg-[#228DC1] flex items-center justify-center shrink-0">
                    <span className="text-white text-[8px] font-black">K</span>
                  </div>
                  <div className="bg-white border border-gray-100 px-3 py-2.5 flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300" style={{ animation: 'pulse 0.9s ease-in-out infinite' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300" style={{ animation: 'pulse 0.9s ease-in-out 0.18s infinite' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300" style={{ animation: 'pulse 0.9s ease-in-out 0.36s infinite' }} />
                  </div>
                </div>
              )}

              {resolved && (
                <div className="flex items-center gap-1.5 px-3 py-2 bg-[#f0fdf4] border border-[#059669]/20" style={{ animation: 'fadeIn 300ms ease-out' }}>
                  <FontAwesomeIcon icon={faCircleCheck} className="w-3 h-3 text-[#059669] shrink-0" />
                  <p className="text-[9px] text-[#059669] font-semibold">{playMsgs[3].text}</p>
                </div>
              )}
            </div>

            <div className="px-3 py-2 border-t border-gray-100 flex gap-1.5 shrink-0">
              <div className="flex-1 bg-[#f8fafc] border border-gray-100 px-2.5 py-1.5 text-[10px] text-gray-300">
                Type a message...
              </div>
              <div className="w-6 h-6 bg-[#228DC1] flex items-center justify-center shrink-0 self-center">
                <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3 text-white" />
              </div>
            </div>
          </div>

          {/* Resolution stat card */}
          <div className="px-3 pb-3 shrink-0">
            <div className="bg-white border border-gray-100 px-4 py-3 shadow-[0_1px_6px_rgba(10,22,40,0.04)]">
              <div className="flex items-center justify-between mb-1.5">
                <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#0a1628]/35">AI resolution</p>
                <p className="font-black text-[#059669] text-[15px] leading-none" style={{ letterSpacing: '-0.02em' }}>
                  {resolved ? '74%' : '73%'}
                </p>
              </div>
              <div className="h-1 bg-gray-100 overflow-hidden mb-2">
                <div className="h-full bg-gradient-to-r from-[#228DC1] to-[#059669]"
                  style={{ width: resolved ? '74%' : '73%', transition: 'width 0.9s ease-out' }} />
              </div>
              <div className="grid grid-cols-3 gap-1">
                {[
                  { label: 'CSAT',       val: '+17%',   color: '#228DC1' },
                  { label: 'Contain.',   val: '+22%',   color: '#7c3aed' },
                  { label: 'Escalat.',   val: '-13%',   color: '#059669' },
                ].map(s => (
                  <div key={s.label} className="text-center">
                    <p className="text-[10px] font-bold" style={{ color: s.color }}>{s.val}</p>
                    <p className="text-[8px] text-[#0a1628]/30">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

// -- Integrations � Kai as glowing hub ----------------------------------------
function IntegrationsSection() {
  const [ref, inView] = useInView(0.08)

  // 5 � 3 grid = 15 slots; Kai sits at index 7 (row 1, col 2 � dead centre)
  type Item = { label: string; category: string; logo: string | null; isKai?: true; isMcp?: true }
  const items: Item[] = [
    { label: 'HubSpot',     category: 'CRM',        logo: '/logos/hubspot.svg' },
    { label: 'Salesforce',  category: 'CRM',        logo: '/logos/salesforce.svg' },
    { label: 'Zendesk',     category: 'Support',    logo: '/logos/zendesk.svg' },
    { label: 'Agentforce',  category: 'AI CRM',     logo: '/logos/agentforce.svg' },
    { label: 'Freshdesk',   category: 'Support',    logo: '/logos/freshdesk.svg' },
    { label: 'Fin',         category: 'AI Support', logo: '/logos/fin.svg' },
    { label: 'WhatsApp',    category: 'Messaging',  logo: '/logos/whatsapp.svg' },
    { label: 'Kai',         category: 'AI Agent',   logo: '/kai-logo.svg',        isKai: true },
    { label: 'Slack',       category: 'Messaging',  logo: '/logos/slack.svg' },
    { label: 'Teams',       category: 'Messaging',  logo: '/logos/teams.svg' },
    { label: 'Zoom',        category: 'Video',      logo: '/logos/zoom.svg' },
    { label: 'Gmail',       category: 'Email',      logo: '/logos/gmail.svg' },
    { label: 'Outlook',     category: 'Email',      logo: '/logos/outlook.svg' },
    { label: 'Jira',        category: 'Ticketing',  logo: '/logos/jira.svg' },
    { label: 'MCP',         category: 'Protocol',   logo: null,                   isMcp: true },
  ]

  // Manhattan distance from center card (row 1, col 2 in a 5-col grid)
  const dist = (i: number) => Math.abs(Math.floor(i / 5) - 1) + Math.abs((i % 5) - 2)

  return (
    <section className="py-24 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        <div className="grid lg:grid-cols-[2fr_3fr] gap-16 items-center">

          {/* Left: copy */}
          <div>
            <p className="text-[#228DC1] mb-4" style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', opacity: 0.75 }}>Integrations</p>
            <h2 className="font-heading text-[#0a1628] mb-5">
              Works with your stack.<br />MCP-ready on day one.
            </h2>
            <p className="text-[#0a1628]/65 text-[18px] leading-[1.7] mb-8">
              Kai sits at the centre of your ecosystem, connected to every CRM, support platform, messaging channel and protocol without ripping anything out.
            </p>
            <div className="flex flex-col gap-3">
              {[
                { label: 'Custom systems',  value: 'API + webhooks' },
                { label: 'Tool access',     value: 'MCP supported'  },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-[#228DC1] rounded-full shrink-0" />
                  <span className="text-[#0a1628]/60 text-[13px]">{item.label} <span className="font-semibold text-[#0a1628]">{item.value}</span></span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: 5 � 3 hub grid */}
          <div ref={ref} className="grid grid-cols-5 gap-2">
            {items.map((item, i) => {
              const d = dist(i)
              const isCorner   = d === 3
              const isAdjacent = d === 1

              return (
                <div
                  key={item.label}
                  className={`relative flex flex-col items-center justify-center gap-2 p-3 min-h-[100px] transition-all duration-300 select-none ${
                    item.isKai
                      ? 'z-10'
                      : isAdjacent
                        ? 'bg-[#f9fcff] border border-[#228DC1]/18 hover:border-[#228DC1]/40 hover:shadow-sm cursor-default'
                        : isCorner
                          ? 'bg-white border border-gray-100 opacity-50 cursor-default'
                          : 'bg-white border border-gray-100 hover:border-gray-200 hover:shadow-sm cursor-default'
                  }`}
                  style={{
                    ...reveal(inView, d * 75),
                    ...(item.isKai ? {
                      background: '#ffffff',
                      border: '1.5px solid rgba(144,62,142,0.30)',
                      animation: inView ? 'kaiGlow 3s ease-in-out infinite' : 'none',
                    } : {}),
                  }}
                >
                  {item.isKai && (
                    <>
                      {/* Radial inner glow */}
                      <div className="absolute inset-0 pointer-events-none"
                        style={{ background: 'radial-gradient(ellipse at 50% 40%, rgba(144,62,142,0.08) 0%, transparent 70%)' }} />
                      {/* Pulse ring 1 */}
                      <div className="absolute inset-0 pointer-events-none rounded-sm"
                        style={{ border: '1.5px solid rgba(144,62,142,0.35)', animation: 'kaiPulseRing 2.4s ease-out infinite' }} />
                      {/* Pulse ring 2 — offset */}
                      <div className="absolute inset-0 pointer-events-none rounded-sm"
                        style={{ border: '1.5px solid rgba(144,62,142,0.20)', animation: 'kaiPulseRing 2.4s ease-out 1.2s infinite' }} />
                    </>
                  )}

                  {item.isKai ? (
                    <>
                      <img
                        src="/kai-logo-horiz.svg"
                        alt="Kai"
                        className="relative w-24 object-contain"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                      />
                      <span className="relative text-[8px] font-semibold text-[#903E8E] bg-[#903E8E]/10 border border-[#903E8E]/30 px-1.5 py-0.5 rounded-sm">
                        AI Agent · MCP
                      </span>
                    </>
                  ) : item.isMcp ? (
                    <>
                      <div className="w-8 h-8 flex items-center justify-center bg-[#e5f4fa] border border-[#228DC1]/25">
                        <span className="text-[#228DC1] text-[9px] font-black tracking-tight">MCP</span>
                      </div>
                      <div className="text-center">
                        <p className="text-[#0a1628]/65 text-[10px] font-semibold">MCP</p>
                        <p className="text-[#0a1628]/35 text-[9px] leading-tight mt-0.5">Protocol</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <img src={item.logo ?? undefined} alt={item.label}
                        className="w-7 h-7 object-contain"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
                      <div className="text-center">
                        <p className="text-[#0a1628]/70 text-[10px] font-semibold leading-tight">{item.label}</p>
                        <p className="text-[#0a1628]/35 text-[9px] leading-tight mt-0.5">{item.category}</p>
                      </div>
                    </>
                  )}
                </div>
              )
            })}
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
            <h2 className="font-heading text-[#0a1628] mb-5" style={{ ...reveal(leftInView, 100) }}>
              Designed for regulated<br />environments.
            </h2>
            <p className="text-[#0a1628]/65 text-[18px] font-normal leading-[1.7] mb-8 max-w-xl" style={reveal(leftInView, 180)}>
              Safe, measurable and auditable AI for teams with real governance requirements.
            </p>

            <div className="bg-[#0a1628] text-white p-8 shadow-[0_16px_50px_rgba(10,22,40,0.12)]" style={reveal(leftInView, 280)}>
              <div className="w-11 h-11 flex items-center justify-center bg-white/10 mb-6">
                <FontAwesomeIcon icon={faShield} className="w-5 h-5 text-[#6cc4ea]" />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/45 mb-2">Governance proof</p>
              <p className="font-heading text-[20px] leading-tight mb-3">ISO 42001 AI Management System certified</p>
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
                      <FontAwesomeIcon icon={faCircleCheck} className="w-4 h-4" />
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

// -- Main page -----------------------------------------------------------------
export default function KaiPage() {
  const [stepsRef, stepsInView] = useInView()
  const [capsRef, capsInView] = useInView()
  const [chartRef, chartInView] = useInView(0.3)

  return (
    <>
      <ScrollProgress />
      {/* -- Hero -- */}
      <section className="relative overflow-hidden bg-white pt-32 pb-24">
        <div className="relative max-w-4xl mx-auto px-8 lg:px-12">
          <div className="flex items-center gap-3 mb-6">
            <img src="/kai-logo.svg" alt="Kai" className="h-7 w-auto object-contain" />
            <p className="font-black text-[#228DC1]" style={{ fontSize: '13px', letterSpacing: '0.28em', textTransform: 'uppercase', opacity: 0.6 }}>
              Kai · Enterprise AI Agent
            </p>
          </div>
          <h1 className="font-serif-display text-[#0a1628] leading-[1.02] mb-6">
            Enterprise AI<br />
            that <span style={{ color: '#228DC1' }}>resolves,</span><br />
            not just responds.
          </h1>
          <p className="text-[#0a1628]/65 text-[18px] font-normal leading-[1.7] mb-10 max-w-xl">
            Kai connects to your systems, follows your rules and helps teams resolve work faster.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#228DC1] text-white text-[13px] font-semibold hover:bg-[#1a6e99] transition-colors">
              Request a Demo
            </Link>
            <Link to="/contact" className="px-7 py-3.5 border border-gray-200 text-[#0a1628]/70 text-[13px] font-medium hover:border-[#228DC1]/50 hover:text-[#228DC1] transition-all">
              Talk to an expert
            </Link>
          </div>
        </div>
      </section>

      {/* -- Single combined logo strip -- */}
      {(() => {
        const items = [
          { src: '/logos/clients/kaiser-permanente.svg', alt: 'Kaiser Permanente' },
          { src: '/logos/clients/cambridgeshire.svg',    alt: 'Cambridgeshire County Council' },
          { src: '/logos/britishcouncil.svg',            alt: 'British Council' },
          { src: '/logos/clients/borderlands.svg',       alt: 'Borderlands 5G Innovation Region' },
          { src: '/logos/clients/west-berkshire.svg',    alt: 'West Berkshire Council' },
          { src: '/logos/clients/retail-hub.svg',        alt: 'Retail Hub' },
          { src: '/logos/clients/tvra.svg',              alt: 'TVRA Rural Action' },
        ]
        const all = [...items, ...items]
        return (
          <div className="bg-white border-y border-gray-100 py-10 overflow-hidden">
            <p className="text-center text-[10px] font-semibold uppercase tracking-[0.26em] text-[#0a1628]/30 mb-9">
              Trusted by leading organisations
            </p>
            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-36 z-10 pointer-events-none"
                style={{ background: 'linear-gradient(to right, white, transparent)' }} />
              <div className="absolute right-0 top-0 bottom-0 w-36 z-10 pointer-events-none"
                style={{ background: 'linear-gradient(to left, white, transparent)' }} />
              <div className="flex animate-[marquee_50s_linear_infinite] whitespace-nowrap w-max items-center gap-0">
                {all.map((item, i) => (
                  <div key={i} className="inline-flex items-center justify-center px-14 select-none">
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="h-9 w-auto object-contain opacity-60 hover:opacity-90 transition-opacity duration-300 grayscale hover:grayscale-0"
                      style={{ maxWidth: '160px' }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      })()}

      {/* -- Live in production -- */}
      <section className="bg-[#f8fafc] border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-8 lg:px-12 py-20">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-14 lg:gap-20 items-center mb-14">
            <div className="max-w-xl">
              <p className="type-label text-[#228DC1] mb-5">Live in Production</p>
              <h2 className="font-heading text-[#0a1628] mb-5">
                Our AI agent is live<br />at enterprise scale.
              </h2>
              <p className="text-[#0a1628]/65 text-[18px] font-normal leading-[1.7] mb-8">
                Live integrations across HubSpot, WhatsApp, Jira and email. Built for real support at production scale.
              </p>
              <Link to="/insights/case-studies" className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#228DC1] hover:gap-3 transition-all">
                Read the case study <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
              </Link>
            </div>

            <div className="relative">
              <div className="absolute -inset-5 bg-white/60 border border-white hidden lg:block" />
              <div className="relative bg-white border border-gray-200 shadow-[0_16px_50px_rgba(10,22,40,0.07)]">
                <div className="p-8 bg-[#0a1628] text-white">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/45 mb-8">Production reach</p>
                  <p className="font-black leading-none mb-3" style={{ fontSize: 'clamp(46px, 5vw, 72px)', letterSpacing: '-0.04em' }}>
                    250k+
                  </p>
                  <p className="text-white/75 text-[14px] font-medium leading-relaxed">
                    learners supported each month across enterprise deployments.
                  </p>
                </div>
                <div className="border-t border-gray-100 bg-[#fafafa] px-8 py-5">
                  <p className="text-[#0a1628]/60 text-[13px] font-normal leading-relaxed">
                    Built for real operational pressure, not a showcase demo.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Metrics row � same section */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <StatCard prefix="+" num={22.5} suffix="%" label="Containment uplift" note="Measured in production" delay={0} />
            <StatCard prefix="+" num={17} suffix="%" label="CSAT uplift" note="Learner satisfaction" delay={100} />
            <StatCard num={45} suffix="s" label="Avg handle time" note="AI-resolved queries" delay={200} />
            <StatCard num={150} suffix="+" label="Countries reached" note="Global enterprise reach" delay={300} />
          </div>
        </div>
      </section>

      {/* -- Integrations -- */}
      <IntegrationsSection />

      {/* -- How Kai Works -- */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a1628 0%, #0d2240 40%, #0a3352 70%, #0a1628 100%)' }}>
        {/* Ambient glow blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-20%] left-[10%] w-[600px] h-[600px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(34,141,193,0.18) 0%, transparent 70%)' }} />
          <div className="absolute bottom-[-10%] right-[5%] w-[500px] h-[500px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(34,141,193,0.12) 0%, transparent 70%)' }} />
        </div>

        {/* Dot grid texture */}
        <div className="absolute inset-0 pointer-events-none opacity-20" style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }} />

        <div className="relative max-w-7xl mx-auto px-8 lg:px-12 py-28">

          {/* Heading */}
          <div className="mb-16">
            <p className="text-[#228DC1] mb-4 font-bold uppercase tracking-[0.28em]" style={{ fontSize: '11px' }}>How It Works</p>
            <h2 className="font-heading text-white mb-4">
              How Kai drives<br />efficiency
            </h2>
            <p className="text-white/65 text-[18px] max-w-lg leading-[1.7]">
              Three steps from setup to live AI resolution. No rip and replace required.
            </p>
          </div>

          {/* Cards */}
          <div ref={stepsRef} className="grid sm:grid-cols-3 gap-4">
            {[
              {
                num: '01',
                pill: 'PARAMETERS',
                label: 'Define Parameters',
                desc: 'Set your tone, escalation rules, identity checks and policy boundaries. Kai operates exactly within the limits you configure.',
                icon: faSliders,
              },
              {
                num: '02',
                pill: 'KNOWLEDGE',
                label: 'Build Knowledge Base',
                desc: 'Upload documents, connect FAQs and link live data sources. Kai draws from your knowledge, not generic web data.',
                icon: faBookOpen,
              },
              {
                num: '03',
                pill: 'SYSTEMS',
                label: 'Connect Systems',
                desc: 'Link your CRM, helpdesk, messaging channels and APIs in minutes. Kai takes action in your live systems, not just chat.',
                icon: faPlug,
              },
            ].map((step, i) => (
              <div
                key={step.num}
                className="relative group rounded-2xl p-8 cursor-default"
                style={{
                  ...reveal(stepsInView, i * 130),
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  boxShadow: '0 4px 32px rgba(0,0,0,0.2)',
                }}
              >
                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{
                  background: 'linear-gradient(135deg, rgba(34,141,193,0.10) 0%, transparent 60%)',
                }} />

                {/* Pill */}
                <span className="inline-block text-[10px] font-bold tracking-[0.22em] text-[#228DC1] bg-[#228DC1]/15 border border-[#228DC1]/30 px-3 py-1 rounded-full mb-6">
                  {step.pill}
                </span>

                {/* Step number */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-white/20 font-black" style={{ fontSize: '48px', lineHeight: 1, letterSpacing: '-0.04em' }}>{step.num}</span>
                </div>

                <h3 className="text-white font-semibold text-[20px] leading-snug mb-3">{step.label}</h3>
                <p className="text-white/55 text-[16px] font-normal leading-relaxed">{step.desc}</p>

                {/* Icon bottom-right */}
                <div className="mt-6 flex justify-end">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(34,141,193,0.15)', border: '1px solid rgba(34,141,193,0.25)' }}>
                    <FontAwesomeIcon icon={step.icon} className="w-4 h-4 text-[#228DC1]" />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* -- Security & compliance -- */}
      <SecurityComplianceSection />

      {/* -- Performance Graph -- */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="grid lg:grid-cols-[1fr_1.6fr] gap-16 items-center">

            {/* Left: heading + qualitative outcomes */}
            <div>
              <p className="type-label text-[#228DC1] mb-4">Measured Outcomes</p>
              <h2 className="font-heading text-[#0a1628] mb-5">
                Performance<br />you can measure.
              </h2>
              <p className="text-[#0a1628]/65 text-[18px] font-normal leading-[1.7] mb-12">
                Track containment, CSAT and handle time from day one.
              </p>
              <div className="space-y-8">
                {[
                  { icon: faBolt,      label: 'Resolve at first touch',   desc: 'Kai handles routine queries from start to finish, keeping agents free for complex work.' },
                  { icon: faChartBar, label: 'Track what matters',       desc: 'Containment, CSAT and escalation rates visible from the moment Kai goes live.' },
                  { icon: faShield,   label: 'Governed before go-live',  desc: 'Rules, audit trails and escalation paths are configured, not bolted on later.' },
                ].map(({ icon, label, desc }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-9 h-9 flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: '#228DC112' }}>
                      <FontAwesomeIcon icon={icon} className="w-4 h-4 text-[#228DC1]" />
                    </div>
                    <div>
                      <p className="text-[#0a1628] font-semibold text-[14px] mb-1">{label}</p>
                      <p className="text-[#0a1628]/55 text-[13px] font-normal leading-relaxed">{desc}</p>
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
                    <text x="34" y={y + 4} textAnchor="end" fontSize="10" fill="#0a1628" fillOpacity="0.32" fontFamily="Inter, system-ui, sans-serif">{label}</text>
                  </g>
                ))}

                {/* X-axis labels */}
                {[
                  { x: 44,  label: 'Baseline' },
                  { x: 168, label: 'Launch' },
                  { x: 354, label: 'Week 6' },
                  { x: 532, label: 'Week 12' },
                ].map(({ x, label }) => (
                  <text key={label} x={x} y="258" textAnchor="middle" fontSize="10" fill="#0a1628" fillOpacity="0.36" fontFamily="Inter, system-ui, sans-serif">{label}</text>
                ))}

                {/* X-axis base line */}
                <line x1="44" y1="232" x2="532" y2="232" stroke="#0a1628" strokeWidth="0.5" strokeOpacity="0.1" />

                {/* Kai go-live dashed vertical */}
                <line x1="168" y1="34" x2="168" y2="232" stroke="#228DC1" strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.38" />

                {/* "Kai live" pill */}
                <rect x="133" y="10" width="70" height="22" rx="11" fill="#228DC1" fillOpacity="0.12" />
                <text x="168" y="25" textAnchor="middle" fontSize="10" fill="#228DC1" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">Launch</text>

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

                {/* Post-Kai solid line � draws on scroll */}
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
                <text x="519" y="33" textAnchor="middle" fontSize="12" fill="#228DC1" fontWeight="800" fontFamily="Inter, system-ui, sans-serif" style={{ opacity: chartInView ? 1 : 0, transition: 'opacity 0.4s ease 2.2s' }}>77.5%</text>

                {/* +22.5% annotation badge */}
                <rect x="242" y="82" width="92" height="26" rx="13" fill="#ffffff" stroke="#228DC1" strokeOpacity="0.18" style={{ opacity: chartInView ? 1 : 0, transition: 'opacity 0.4s ease 1.6s' }} />
                <text x="288" y="99" textAnchor="middle" fontSize="11" fill="#228DC1" fontWeight="800" fontFamily="Inter, system-ui, sans-serif" style={{ opacity: chartInView ? 1 : 0, transition: 'opacity 0.4s ease 1.6s' }}>+22.5% uplift</text>
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

      {/* -- Animated Demo -- */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="max-w-2xl mb-14">
            <p className="type-label text-[#228DC1] mb-4">See Kai in Action</p>
            <h2 className="font-heading text-[#0a1628] mb-4">
              From first message<br />to resolved ticket.
            </h2>
            <p className="text-[#0a1628]/65 text-[18px] font-normal leading-[1.7]">
              Kai reads intent, checks live systems and keeps the workflow moving.
            </p>
          </div>
          <KaiDashboard />
          <div className="mt-10 grid sm:grid-cols-3 gap-4">
            {[
              { label: 'System-connected', desc: 'CRM, ticketing and messaging in one flow.' },
              { label: 'Policy-governed', desc: 'Actions follow your configured rules.' },
              { label: 'Outcome-measured', desc: 'Containment, CSAT and escalation tracked live.' },
            ].map((item) => (
              <div key={item.label} className="bg-white border border-gray-200 px-8 py-6 shadow-[0_1px_8px_rgba(10,22,40,0.03)]">
                <p className="text-[#0a1628] font-semibold text-[14px] mb-2">{item.label}</p>
                <p className="text-[#0a1628]/65 text-[18px] font-normal leading-[1.7]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -- Capabilities -- */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <p className="type-label text-[#228DC1] mb-4">What Kai Does</p>
          <h2 className="font-heading text-[#0a1628] mb-12">
            Built to act,<br />not just answer.
          </h2>
          <div ref={capsRef} className="grid lg:grid-cols-3 gap-px bg-gray-200 border border-gray-200">
            {[
              {
                icon: faComments,
                label: 'Resolve customer issues.',
                desc: 'Kai handles queries from first message to closed ticket, without waiting for a human.',
              },
              {
                icon: faArrowTrendUp,
                label: 'Identify leads.',
                desc: 'Spot buying signals in every conversation and route high-intent contacts to your sales team instantly.',
              },
              {
                icon: faWandSparkles,
                label: 'Coming soon.',
                desc: 'More capabilities are on the way. Check back shortly.',
              },
            ].map((cap, i) => (
              <div key={cap.label} className="group bg-white p-8 hover:bg-[#f8fafc] transition-colors" style={reveal(capsInView, i * 120)}>
                <div className="w-10 h-10 flex items-center justify-center mb-5" style={{ backgroundColor: '#228DC112' }}>
                  <FontAwesomeIcon icon={cap.icon} className="w-5 h-5 text-[#228DC1]" />
                </div>
                <h3 className="text-[#0a1628] font-semibold text-[20px] leading-snug mb-2">{cap.label}</h3>
                <p className="text-[#0a1628]/65 text-[18px] font-normal leading-[1.7]">{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -- What Kai Delivers -- */}
      <section className="py-24 bg-[#f8fafc] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="max-w-2xl mb-14">
            <p className="type-label text-[#228DC1] mb-4">What Kai Delivers</p>
            <h2 className="font-heading text-[#0a1628] mb-4">
              AI that fits your business.<br />Not the other way around.
            </h2>
            <p className="text-[#0a1628]/65 text-[18px] font-normal leading-[1.7]">
              Built for mixed systems, regulated teams and workflows that need more than one vendor ecosystem.
            </p>
          </div>

          {/* Kai capabilities table */}
          <div className="border border-gray-200 overflow-hidden shadow-[0_1px_8px_rgba(10,22,40,0.03)]">
            {/* Header row */}
            <div className="grid grid-cols-[1.2fr_1fr_1fr] bg-[#0a1628]">
              <div className="px-6 py-4 border-r border-white/10">
                <p className="text-white/40 text-[11px] font-semibold uppercase tracking-[0.18em]">Capability</p>
              </div>
              <div className="px-6 py-4 border-r border-white/10 flex items-center gap-3">
                <img
                  src="/kai-logo.svg"
                  alt="Kai"
                  className="shrink-0 h-6 w-6 object-contain brightness-0 invert"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                />
                <p className="text-[13px] font-bold text-[#228DC1]">Kai</p>
              </div>
              <div className="px-6 py-4 flex items-center">
                <p className="text-[13px] font-semibold text-white/40">Typical AI Agent</p>
              </div>
            </div>

            {/* Data rows */}
            {[
              {
                label: 'Best fit',
                kai: 'Mixed systems, regulated teams',
                competitor: 'Single-platform teams',
              },
              {
                label: 'Ecosystem',
                kai: 'Vendor-flexible, integration-led',
                competitor: 'Vendor-locked, single stack',
              },
              {
                label: 'Custom governance',
                kai: 'Consent, escalation, audit',
                competitor: 'Limited or paid add-on',
              },
              {
                label: 'Delivery model',
                kai: 'Product + delivery support',
                competitor: 'SaaS only',
              },
              {
                label: 'Regulated sectors',
                kai: true,
                competitor: false,
              },
              {
                label: 'On-prem / hybrid deploy',
                kai: true,
                competitor: false,
              },
              {
                label: 'ISO 42001 AI certification',
                kai: true,
                competitor: false,
              },
            ].map((row, rowIdx) => (
              <div key={row.label} className={`grid grid-cols-[1.2fr_1fr_1fr] border-t border-gray-100 ${rowIdx % 2 === 0 ? 'bg-white' : 'bg-[#fafafa]'}`}>
                <div className="px-6 py-4 border-r border-gray-100">
                  <p className="text-[#0a1628] text-[13px] font-semibold">{row.label}</p>
                </div>
                {/* Kai cell � highlighted */}
                <div className="px-6 py-4 border-r border-gray-100 bg-[#e5f4fa]/40">
                  {typeof row.kai === 'boolean' ? (
                    <FontAwesomeIcon icon={faCheck} className="w-4 h-4 text-[#228DC1]" />
                  ) : (
                    <p className="text-[12px] font-medium text-[#0a1628]">{row.kai}</p>
                  )}
                </div>
                {/* Competitor cell */}
                <div className="px-6 py-4">
                  {typeof row.competitor === 'boolean' ? (
                    row.competitor
                      ? <FontAwesomeIcon icon={faCheck} className="w-4 h-4 text-[#228DC1]" />
                      : <FontAwesomeIcon icon={faXmark} className="w-4 h-4 text-gray-300" />
                  ) : (
                    <p className="text-[12px] font-normal text-[#0a1628]/50">{row.competitor}</p>
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


      {/* -- Pilot CTA -- */}
      <section className="py-16 bg-[#f8fafc] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-8 lg:px-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <div>
            <p className="text-[#0a1628] font-semibold text-[16px] mb-1">Start with a focused pilot.</p>
            <p className="text-[#0a1628]/65 text-[16px] font-normal">
              One channel. One workflow. Measure real outcomes, then scale.
            </p>
          </div>
          <Link
            to="/contact"
            className="shrink-0 inline-flex items-center gap-2 px-7 py-3.5 border border-[#228DC1] text-[#228DC1] text-[13px] font-semibold hover:bg-[#228DC1] hover:text-white transition-all"
          >
            Request a Demo <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <CTASection />
    </>
  )
}
