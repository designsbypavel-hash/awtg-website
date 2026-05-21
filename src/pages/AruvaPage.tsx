import { useState, useRef, useEffect, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faBookOpen, faShield, faArrowsRotate, faWandSparkles, faCircleCheck } from '@fortawesome/free-solid-svg-icons'
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

const reveal = (inView: boolean, delay = 0): CSSProperties => ({
  opacity: inView ? 1 : 0,
  transform: inView ? 'translateY(0)' : 'translateY(24px)',
  transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
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

// -- Four founding principles --------------------------------------------------
const principles = [
  {
    icon: faBookOpen,
    label: 'Education',
    title: 'Pedagogy at the Core',
    desc: 'Every response is grounded in course design, learning outcomes and educator intent.',
    color: '#228DC1',
  },
  {
    icon: faShield,
    label: 'Governance',
    title: 'Institution in Control',
    desc: 'Role-based access, audit trails and data residency give institutions full oversight of every AI interaction.',
    color: '#059669',
  },
  {
    icon: faArrowsRotate,
    label: 'Feedback Loop',
    title: 'Continuous Learning Intelligence',
    desc: 'Student interactions and assessment signals feed back into a live model of learning.',
    color: '#7c3aed',
  },
  {
    icon: faWandSparkles,
    label: 'Personalisation',
    title: 'Adaptive to Every Student',
    desc: 'Learning Curve AI builds performance profiles across mastery, confidence, pace and workload.',
    color: '#d97706',
  },
]

// -- Platform pillars ----------------------------------------------------------
const pillars = [
  {
    num: '01',
    label: 'Smart Syllabus',
    tag: 'Course Intelligence',
    desc: 'Turns course outcomes, resources and assessments into the intelligence layer that guides every tutoring and assessment interaction.',
    capabilities: ['Learning outcome and objective mapping', 'Policy, rubric and assessment encoding', 'Resource and approved content alignment', 'AI behaviour rules per week and topic'],
  },
  {
    num: '02',
    label: 'Professor-Guided Tutor',
    tag: 'Adaptive Teaching',
    desc: 'Educators define tone, depth and rules. Students receive Socratic guidance that builds genuine understanding, not shortcuts.',
    capabilities: ['Educator-defined AI behaviour and limits', 'Socratic questioning and hint stages', 'Source-backed responses with citations', 'Course-aware, not generic question answering'],
  },
  {
    num: '03',
    label: 'Formative Assessment',
    tag: 'Assessment Intelligence',
    desc: 'Supports quizzes, rubrics and early gap detection so educators can intervene during the term, not after grades are submitted.',
    capabilities: ['AI-assisted quiz and rubric generation', 'Assessment variant creation', 'Early gap and misconception detection', 'Rubric-aware feedback and grading support'],
  },
  {
    num: '04',
    label: 'Learning Curve AI',
    tag: 'Performance Profiling',
    desc: 'Builds individual student profiles across mastery, confidence, pace and workload, adapting support as each student progresses.',
    capabilities: ['Mastery and confidence tracking per topic', 'Workload, pace and sentiment signals', 'At-risk student identification and alerts', 'Adaptive study planning and scheduling'],
  },
  {
    num: '05',
    label: 'Educator Analytics',
    tag: 'Teaching Insight',
    desc: 'Real-time visibility into engagement, topic difficulty and intervention opportunities across cohorts.',
    capabilities: ['Course-level learning dashboards', 'Topic difficulty and material effectiveness insight', 'Student engagement and participation signals', 'Cross-cohort and department analytics'],
  },
  {
    num: '06',
    label: 'Governance Layer',
    tag: 'Institutional Control',
    desc: 'Role-based access, audit trails and data residency controls keep AI accountable and under institutional control.',
    capabilities: ['Role-based access and policy enforcement', 'Full audit trail with source attribution', 'Data residency: cloud, hybrid or on-prem', 'SSO, LMS and institutional system integration'],
  },
]

// -- Who it's for --------------------------------------------------------------
const audiences = [
  {
    label: 'Students',
    headline: 'A personal academic guide, not an answer engine.',
    points: [
      'Syllabus-aligned tutoring that builds genuine understanding',
      'Source-backed responses with traceable citations',
      'Progress tracking across topics and confidence',
    ],
  },
  {
    label: 'Educators',
    headline: 'Insight and control without added workload.',
    points: [
      'AI that follows your course design and pedagogical rules',
      'AI-assisted quiz, rubric and assessment creation',
      'Real-time visibility into student struggles and gaps',
    ],
  },
  {
    label: 'Institutions',
    headline: 'Responsible AI adoption with measurable evidence.',
    points: [
      'End-to-end AI governance across academic workflows',
      'Data residency and institution-controlled deployment',
      'Modular pilot path: start small, scale with evidence',
    ],
  },
]

// -- Animated demo messages ----------------------------------------------------
const demoMessages = [
  { role: 'student', text: 'Can you solve this Porter\'s Five Forces analysis for me?', delay: 500 },
  { role: 'ai', text: 'Which of the five forces do you think has the strongest impact on the airline industry? Start with your instinct.', cite: 'Porter, 2008, Ch.2', delay: 1700 },
  { role: 'student', text: 'Probably competitive rivalry between airlines?', delay: 3300 },
  { role: 'ai', text: 'Good instinct. Now, what specifically intensifies that rivalry? Think about cost structure and what it costs a passenger to switch carriers.', cite: 'Week 3, Rubric C', delay: 4700 },
  { role: 'signal', text: 'Mastery signal captured � Learning Curve updated', delay: 6100 },
]

function AnimatedDemo() {
  const [visible, setVisible] = useState<number[]>([])
  const [typing, setTyping] = useState(false)
  const timeoutsRef = useRef<number[]>([])

  const runDemo = () => {
    setVisible([])
    setTyping(false)
    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []
    demoMessages.forEach((msg, i) => {
      // Show typing indicator before AI messages
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

  // Mastery bar values � animate when signal appears
  const masteryItems = [
    { label: 'Competitive Forces', pct: 72 },
    { label: 'Strategic Analysis', pct: 58 },
    { label: 'Porter Framework', pct: 81 },
  ]
  const signalVisible = visible.includes(4)

  return (
    // Outer browser chrome
    <div className="bg-white border border-gray-200 overflow-hidden shadow-[0_8px_48px_rgba(10,22,40,0.1)]">
      {/* Chrome bar */}
      <div className="flex items-center gap-1.5 px-4 py-3 bg-[#f3f4f6] border-b border-gray-200">
        <span className="w-2.5 h-2.5 rounded-full bg-[#fc5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <div className="flex-1 flex justify-center">
          <div className="bg-white border border-gray-200 px-3 py-1 text-[11px] text-gray-400 font-normal" style={{ minWidth: '220px', textAlign: 'center' }}>
            app.aruva.co.uk/tutor
          </div>
        </div>
        <button onClick={runDemo} className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#228DC1]/50 hover:text-[#228DC1] transition-colors">
          Replay
        </button>
      </div>

      {/* App layout � 3 panels */}
      <div className="grid grid-cols-[180px_1fr_160px] divide-x divide-gray-100" style={{ minHeight: '420px' }}>

        {/* Left sidebar � course nav */}
        <div className="bg-[#f8fafc] p-4">
          <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-gray-400 mb-3">My Courses</p>
          <div className="space-y-1 mb-6">
            {['Business Strategy 101', 'Marketing Fundamentals', 'Financial Accounting'].map((c, i) => (
              <div key={c} className={`px-2.5 py-2 text-[11px] font-medium cursor-default ${i === 0 ? 'bg-[#228DC1] text-white' : 'text-gray-500 hover:bg-gray-100'}`}>
                {c}
              </div>
            ))}
          </div>
          <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-gray-400 mb-3">Weeks</p>
          <div className="space-y-1">
            {['Week 1', 'Week 2', 'Week 3 (Active)', 'Week 4', 'Week 5'].map((w, i) => (
              <div key={w} className={`px-2.5 py-1.5 text-[11px] cursor-default ${i === 2 ? 'text-[#228DC1] font-semibold bg-[#e5f4fa]' : 'text-gray-400'}`}>
                {w}
              </div>
            ))}
          </div>
        </div>

        {/* Centre � tutor chat */}
        <div className="flex flex-col bg-white">
          {/* Course context */}
          <div className="px-4 py-3 border-b border-gray-100 bg-[#f8fafc] flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold text-[#0a1628]">Porter's Five Forces</p>
              <p className="text-[10px] text-gray-400">Week 3 � Socratic mode � No direct answers</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 space-y-4 overflow-hidden">
            {demoMessages.slice(0, 4).map((msg, i) => {
              if (!visible.includes(i)) return null
              if (msg.role === 'student') {
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
                    <span className="text-white text-[9px] font-black">A</span>
                  </div>
                  <div className="flex-1 bg-[#f8fafc] border border-gray-100 px-3.5 py-2.5">
                    <p className="text-[12px] text-[#0a1628] font-normal leading-relaxed mb-2">{msg.text}</p>
                    {msg.cite && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-medium text-[#228DC1] bg-[#e5f4fa] border border-[#228DC1]/15 px-2 py-0.5">
                        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.1-1.1m-.757-4.9a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        {msg.cite}
                      </span>
                    )}
                  </div>
                </div>
              )
            })}

            {/* Typing indicator */}
            {typing && (
              <div className="flex gap-2.5 items-start" style={{ animation: 'fadeIn 150ms ease-out' }}>
                <div className="w-6 h-6 bg-[#228DC1] flex items-center justify-center shrink-0">
                  <span className="text-white text-[9px] font-black">A</span>
                </div>
                <div className="bg-[#f8fafc] border border-gray-100 px-4 py-3 flex gap-1 items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-300" style={{ animation: 'pulse 0.9s ease-in-out infinite' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-300" style={{ animation: 'pulse 0.9s ease-in-out 0.18s infinite' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-300" style={{ animation: 'pulse 0.9s ease-in-out 0.36s infinite' }} />
                </div>
              </div>
            )}
          </div>

          {/* Input bar */}
          <div className="px-4 py-3 border-t border-gray-100 flex gap-2 items-center">
            <div className="flex-1 bg-[#f8fafc] border border-gray-100 px-3 py-2 text-[11px] text-gray-300">
              Ask a question about Week 3...
            </div>
            <div className="w-7 h-7 bg-[#228DC1] flex items-center justify-center shrink-0">
              <FontAwesomeIcon icon={faArrowRight} className="w-3.5 h-3.5 text-white" />
            </div>
          </div>
        </div>

        {/* Right panel � learning signals */}
        <div className="bg-[#f8fafc] p-4 flex flex-col gap-4">
          <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-gray-400">Learning Curve</p>

          {masteryItems.map((item) => (
            <div key={item.label}>
              <div className="flex justify-between items-center mb-1">
                <p className="text-[10px] text-gray-500 font-medium">{item.label}</p>
                <p className="text-[10px] font-semibold text-[#0a1628]">{signalVisible ? item.pct : item.pct - 8}%</p>
              </div>
              <div className="h-1 bg-gray-200 overflow-hidden">
                <div
                  className="h-full bg-[#228DC1]"
                  style={{
                    width: `${signalVisible ? item.pct : item.pct - 8}%`,
                    transition: 'width 0.8s ease-out',
                  }}
                />
              </div>
            </div>
          ))}

          <div className="mt-2 pt-3 border-t border-gray-200">
            <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-gray-400 mb-2">This Session</p>
            <div className="space-y-1.5">
              <div className="flex justify-between text-[10px]">
                <span className="text-gray-400">Questions</span>
                <span className="text-[#0a1628] font-semibold">{visible.filter(i => demoMessages[i]?.role === 'student').length}</span>
              </div>
              <div className="flex justify-between text-[10px]">
                <span className="text-gray-400">Mode</span>
                <span className="text-[#059669] font-semibold">Socratic</span>
              </div>
            </div>
          </div>

          {/* Signal badge */}
          {signalVisible && (
            <div className="mt-auto px-2.5 py-2 bg-[#059669]/8 border border-[#059669]/20" style={{ animation: 'fadeIn 400ms ease-out' }}>
              <p className="text-[10px] text-[#059669] font-semibold leading-snug">Signal captured</p>
              <p className="text-[9px] text-[#059669]/60 mt-0.5">Mastery rising on competitive forces</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// -- How It Works steps --------------------------------------------------------
const howItWorksSteps = [
  {
    num: '01',
    label: 'Connect your course',
    desc: 'Upload your syllabus, connect your LMS and set the rules. Every outcome, rubric and assessment becomes part of the intelligence layer.',
    detail: 'Works with Canvas, Moodle, Blackboard and Brightspace. No rip-and-replace required.',
    visual: 'syllabus',
  },
  {
    num: '02',
    label: 'AI aligns to your intent',
    desc: 'Aruva compiles your course structure into a policy graph: how the AI tutors, what content it uses and what hint stages to apply.',
    detail: 'Every AI response is course-aware. Nothing operates outside the bounds you set.',
    visual: 'align',
  },
  {
    num: '03',
    label: 'Students learn, guided not shortcut',
    desc: 'Students interact with a tutor that leads through Socratic questioning and source-backed answers. Every question is a learning signal.',
    detail: 'Live with real students. Used in production at British Council English Online.',
    visual: 'tutor',
  },
  {
    num: '04',
    label: 'Educators see everything, act early',
    desc: 'Real-time dashboards show engagement, topic difficulty and at-risk signals. Faculty intervene while learning is happening.',
    detail: 'Institutional analytics roll up to department and programme level.',
    visual: 'analytics',
  },
]

function SyllabusVisual() {
  return (
    <div className="bg-white border border-gray-200 overflow-hidden shadow-[0_2px_20px_rgba(10,22,40,0.06)]">
      {/* File header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[#f8fafc] border-b border-gray-100">
        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#0a1628]/60">business_strategy_101.xlsx � Week 3</span>
      </div>
      <div className="divide-y divide-gray-50">
        {[
          { key: 'Week', val: 'Week 3: Porter\'s Five Forces' },
          { key: 'Objective', val: 'Analyse competitive dynamics' },
          { key: 'Reading', val: 'Porter, M. (2008) Ch. 1 to 3' },
          { key: 'Assessment', val: 'Case study, Rubric C' },
          { key: 'AI Mode', val: 'Socratic hints only � No direct answers', highlight: true },
        ].map((row) => (
          <div key={row.key} className={`flex gap-4 px-4 py-3 text-[12px] ${row.highlight ? 'bg-[#e5f4fa] border-l-2 border-[#228DC1]' : ''}`}>
            <span className="text-[#0a1628]/60 font-medium shrink-0 w-20">{row.key}</span>
            <span className={row.highlight ? 'text-[#228DC1] font-semibold' : 'text-[#0a1628]/70 font-normal'}>{row.val}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function AlignVisual() {
  return (
    <div className="bg-white border border-gray-200 p-6 shadow-[0_2px_20px_rgba(10,22,40,0.06)]">
      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#0a1628]/60 mb-5">AI Policy Compilation</p>
      <div className="flex items-center gap-4">
        {/* Input */}
        <div className="border-2 border-[#228DC1]/30 bg-[#e5f4fa] px-4 py-3 text-[12px] text-[#228DC1] font-semibold whitespace-nowrap">
          Syllabus Cell
        </div>
        {/* Arrow */}
        <div className="flex-1 flex items-center gap-0">
          <div className="flex-1 h-px bg-gray-300" />
          <svg width="10" height="10" viewBox="0 0 10 10" className="text-gray-300 shrink-0">
            <path d="M0 5h8M5 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        {/* Output nodes */}
        <div className="flex flex-col gap-2">
          {[
            { label: 'Policy Graph', color: '#228DC1' },
            { label: 'RAG Scope', color: '#7c3aed' },
            { label: 'Hint Stages', color: '#059669' },
            { label: 'Rubric Rules', color: '#d97706' },
          ].map((n) => (
            <div key={n.label} className="flex items-center gap-2 border border-gray-100 bg-[#f8fafc] px-3 py-1.5">
              <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: n.color }} />
              <span className="text-[11px] text-[#0a1628]/65 font-medium">{n.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function TutorVisual() {
  return (
    <div className="bg-white border border-gray-200 overflow-hidden shadow-[0_2px_20px_rgba(10,22,40,0.06)]">
      {/* App header */}
      <div className="px-4 py-3 bg-[#f8fafc] border-b border-gray-100 flex items-center gap-2">
        <div className="w-5 h-5 bg-[#228DC1] flex items-center justify-center shrink-0">
          <span className="text-white text-[8px] font-black">A</span>
        </div>
        <span className="text-[11px] font-semibold text-[#0a1628]/60">Aruva Tutor</span>
        <span className="text-[#0a1628]/20 text-[11px]">�</span>
        <span className="text-[11px] text-[#0a1628]/60">Business Strategy 101 � Week 3</span>
        <div className="ml-auto">
          <span className="text-[10px] text-[#059669] font-medium">Socratic mode</span>
        </div>
      </div>
      <div className="p-4 space-y-3 bg-[#fafafa]">
        {/* Student message */}
        <div className="flex justify-end">
          <div className="bg-[#228DC1] px-3.5 py-2.5 max-w-[76%]">
            <p className="text-[12px] text-white leading-relaxed">Can you solve this Porter's Five Forces analysis for me?</p>
          </div>
        </div>
        {/* AI response */}
        <div className="flex gap-2.5 items-start">
          <div className="w-6 h-6 bg-[#228DC1] flex items-center justify-center shrink-0">
            <span className="text-white text-[9px] font-black">A</span>
          </div>
          <div className="bg-white border border-gray-100 px-3.5 py-2.5 flex-1 shadow-[0_1px_4px_rgba(10,22,40,0.06)]">
            <p className="text-[12px] text-[#0a1628] leading-relaxed mb-2">Which of the five forces do you think has the strongest impact here? Start with your instinct.</p>
            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-[#228DC1] bg-[#e5f4fa] border border-[#228DC1]/15 px-2 py-0.5">
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.1-1.1m-.757-4.9a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Porter, 2008, Ch.2
            </span>
          </div>
        </div>
        {/* Signal */}
        <div className="px-3 py-2 bg-[#f0fdf4] border border-[#059669]/20 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#059669] shrink-0" />
          <p className="text-[10px] text-[#059669] font-medium">Mastery signal captured � Learning Curve updated</p>
        </div>
      </div>
    </div>
  )
}

function AnalyticsVisual() {
  const bars = [72, 88, 55, 93, 64, 79]
  return (
    <div className="bg-white border border-gray-200 p-5 shadow-[0_2px_20px_rgba(10,22,40,0.06)]">
      {/* Header */}
      <div className="flex items-start justify-between mb-5 pb-4 border-b border-gray-100">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#0a1628]/60 mb-1">Professor Dashboard</p>
          <p className="text-[#0a1628] font-semibold text-sm">Business Strategy 101 � Week 3</p>
        </div>
        <div className="text-right">
          <p className="text-[#059669] font-black text-2xl leading-none">87%</p>
          <p className="text-[10px] text-[#0a1628]/60 mt-0.5">Engagement</p>
        </div>
      </div>
      {/* Mastery bars */}
      <div className="space-y-3 mb-5">
        {[
          { label: 'Competitive Rivalry', pct: 88 },
          { label: 'Buyer Power', pct: 55, gap: true },
          { label: 'Supplier Power', pct: 72 },
        ].map((item) => (
          <div key={item.label}>
            <div className="flex justify-between items-center mb-1.5">
              <p className="text-[11px] text-[#0a1628]/65 font-medium">{item.label}</p>
              <div className="flex items-center gap-2">
                {item.gap && <span className="text-[10px] font-semibold text-[#d97706] bg-[#fef3c7] px-1.5 py-0.5">Gap</span>}
                <span className="text-[11px] font-semibold text-[#0a1628]">{item.pct}%</span>
              </div>
            </div>
            <div className="h-1.5 bg-gray-100 overflow-hidden">
              <div className="h-full" style={{ width: `${item.pct}%`, backgroundColor: item.gap ? '#d97706' : '#228DC1' }} />
            </div>
          </div>
        ))}
      </div>
      {/* Bar chart */}
      <div className="flex items-end gap-1 h-10 mb-1">
        {bars.map((h, i) => (
          <div key={i} className="flex-1 bg-[#228DC1]/12" style={{ height: `${h}%` }}>
            <div className="w-full bg-[#228DC1]/50" style={{ height: '40%', marginTop: 'auto' }} />
          </div>
        ))}
      </div>
      <p className="text-[10px] text-[#0a1628]/25 text-center">Daily interaction volume</p>
    </div>
  )
}

// -- Platform architecture diagram ---------------------------------------------
function PlatformDiagram() {
  const uiCards = [
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" strokeLinecap="round" strokeLinejoin="round"/></svg>
      ),
      label: 'Student Tutor',
      desc: 'Socratic AI guided by syllabus',
      color: '#228DC1',
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      ),
      label: 'Professor Dashboard',
      desc: 'Real-time class insights',
      color: '#7c3aed',
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/></svg>
      ),
      label: 'Formative Assessment',
      desc: 'Quizzes, rubrics and gaps',
      color: '#059669',
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      ),
      label: 'Student Planner',
      desc: 'Smart study scheduling',
      color: '#d97706',
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" strokeLinecap="round" strokeLinejoin="round"/></svg>
      ),
      label: 'Institutional Analytics',
      desc: 'Cross-cohort intelligence',
      color: '#dc2626',
    },
  ]

  const coreBlocks = [
    {
      label: 'Smart Syllabus',
      sublabel: 'Intelligence layer',
      color: '#228DC1',
      bg: '#e5f4fa',
      items: ['Outcome mapping', 'Policy encoding', 'Rubric logic', 'AI behaviour rules'],
    },
    {
      label: 'Learning Curve AI',
      sublabel: 'Personalisation',
      color: '#7c3aed',
      bg: '#f5f3ff',
      items: ['Mastery tracking', 'Confidence signals', 'Workload modelling', 'At-risk detection'],
    },
    {
      label: 'Governance Layer',
      sublabel: 'Security & Control',
      color: '#059669',
      bg: '#f0fdf4',
      items: ['Role-based access', 'Full audit trail', 'Data residency', 'Policy enforcement'],
    },
  ]

  const SectionLabel = ({ children }: { children: string }) => (
    <div className="w-12 shrink-0 bg-[#0a1628] flex items-center justify-center">
      <span
        className="text-white/85 text-[9px] font-bold uppercase tracking-[0.22em] whitespace-nowrap"
        style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
      >
        {children}
      </span>
    </div>
  )

  return (
    <section className="py-24 bg-[#fdf9f4] border-t border-[#ede5da]">
      <div className="max-w-7xl mx-auto px-8 lg:px-12">

        {/* Header */}
        <div className="mb-14">
          <p className="type-label text-[#228DC1] mb-4">Platform Architecture</p>
          <h2 className="font-heading text-[#0a1628] mb-4" style={{ fontSize: '32px', lineHeight: 1.1 }}>
            How Aruva is built
          </h2>
          <p className="text-[#0a1628]/65 text-[16px] font-normal leading-relaxed max-w-2xl">
            Three connected layers: the interfaces educators and students use, the core intelligence platform, and the integrations that connect Aruva to your existing systems.
          </p>
        </div>

        <div className="space-y-0">

          {/* -- Row 1: User Interface -- */}
          <div className="flex items-stretch rounded-2xl overflow-hidden border border-[#e2d9cf] shadow-[0_4px_20px_rgba(10,22,40,0.06)]">
            <SectionLabel>User Interface</SectionLabel>
            <div className="flex-1 bg-white p-5">
              <div className="grid grid-cols-5 gap-3">
                {uiCards.map((card) => (
                  <div
                    key={card.label}
                    className="group relative bg-[#fdf9f4] border border-[#ede5da] rounded-xl p-4 hover:bg-white hover:border-transparent hover:-translate-y-1 transition-all duration-200 cursor-default"
                    style={{ boxShadow: 'none' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 24px ${card.color}22, 0 2px 8px rgba(10,22,40,0.06)` }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = 'none' }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-all duration-200"
                      style={{ backgroundColor: `${card.color}20` }}
                    >
                      <span style={{ color: card.color }}>{card.icon}</span>
                    </div>
                    <p className="text-[#0a1628] text-[13px] font-semibold leading-snug mb-1">{card.label}</p>
                    <p className="text-[#0a1628]/55 text-[11px] font-normal leading-relaxed">{card.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* -- Connector 1: horizontal bracket + API label -- */}
          <div className="ml-12 px-10 flex flex-col items-center">
            <div className="w-px h-4 bg-[#c8bdb0]" />
            <div className="w-full flex items-center">
              <div className="flex-1 h-px bg-[#d8cfc6]" />
              <div className="flex items-center gap-2.5 border border-[#d8cfc6] bg-white rounded-full px-5 py-1.5 shadow-[0_1px_4px_rgba(10,22,40,0.06)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#228DC1]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#0a1628]/55">Aruva Platform API</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#228DC1]" />
              </div>
              <div className="flex-1 h-px bg-[#d8cfc6]" />
            </div>
            <div className="w-px h-4 bg-[#c8bdb0]" />
          </div>

          {/* -- Row 2: Services -- */}
          <div className="flex items-stretch rounded-2xl overflow-hidden border border-[#e2d9cf] shadow-[0_4px_20px_rgba(10,22,40,0.06)]">
            <SectionLabel>Services</SectionLabel>
            <div className="flex-1 bg-white p-6 lg:p-7">
              <div className="grid lg:grid-cols-[172px_1fr] gap-8 items-center">

                {/* Brand wordmark */}
                <div className="lg:border-r border-[#ede5da] lg:pr-8">
                  <p className="font-black text-[#0a1628] leading-[1.1]" style={{ fontSize: 'clamp(18px,2vw,26px)', letterSpacing: '-0.03em' }}>
                    Aruva<br />Intelligent<br />Education<br />Platform
                  </p>
                </div>

                {/* Three coloured service blocks */}
                <div className="space-y-2.5">
                  {coreBlocks.map((block) => (
                    <div key={block.label} className="flex items-stretch rounded-xl overflow-hidden border border-[#ede5da] shadow-[0_1px_6px_rgba(10,22,40,0.04)] hover:shadow-[0_4px_16px_rgba(10,22,40,0.08)] transition-shadow">
                      <div className="w-44 shrink-0 flex flex-col justify-center px-5 py-4" style={{ backgroundColor: block.color }}>
                        <p className="text-white font-bold text-[13px] leading-snug">{block.label}</p>
                        <p className="text-white/60 text-[10px] font-medium mt-0.5">{block.sublabel}</p>
                      </div>
                      <div className="flex-1 bg-[#fdfcfb] flex items-center divide-x divide-[#ede5da]">
                        {block.items.map((item) => (
                          <div key={item} className="flex-1 px-4 py-3.5 text-[11px] text-[#0a1628]/70 font-medium text-center leading-snug hover:bg-white hover:text-[#0a1628] transition-colors cursor-default">
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* -- Connector 2: two labelled branches -- */}
          <div className="ml-12 flex">
            {['Sync & Deploy', 'Read & Write'].map((label) => (
              <div key={label} className="flex-1 flex flex-col items-center">
                <div className="w-px h-4 bg-[#c8bdb0]" />
                <div className="border border-[#d8cfc6] bg-white rounded-full px-5 py-1.5 shadow-[0_1px_4px_rgba(10,22,40,0.05)]">
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#0a1628]/50">
                    {label}
                  </span>
                </div>
                <div className="w-px h-4 bg-[#c8bdb0]" />
              </div>
            ))}
          </div>

          {/* -- Row 3: Integration -- */}
          <div className="flex items-stretch rounded-2xl overflow-hidden border border-[#e2d9cf] shadow-[0_4px_20px_rgba(10,22,40,0.06)]">
            <SectionLabel>Integration</SectionLabel>
            <div className="flex-1 bg-white p-6 lg:p-7">
              <div className="grid sm:grid-cols-2 gap-5">

                {/* VLE / LMS */}
                <div className="bg-[#fdf9f4] border border-[#ede5da] rounded-xl p-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0a1628]/40 mb-4">VLE / LMS</p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {[
                      { name: 'Canvas',           color: '#E66000' },
                      { name: 'Moodle',           color: '#F98012' },
                      { name: 'Blackboard',       color: '#2E3191' },
                      { name: 'Brightspace',      color: '#0067B1' },
                      { name: 'Moodle Workplace', color: '#F98012' },
                    ].map((lms) => (
                      <span
                        key={lms.name}
                        className="bg-white border border-[#e2d9cf] rounded-lg px-3 py-1.5 text-[12px] font-semibold text-[#0a1628] shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all duration-150 cursor-default"
                        style={{ borderLeftWidth: '3px', borderLeftColor: lms.color }}
                      >
                        {lms.name}
                      </span>
                    ))}
                  </div>
                  <div className="border-t border-[#ede5da] pt-3 flex flex-wrap gap-x-4 gap-y-1.5">
                    {['Student Portal', 'SSO / SAML / OIDC', 'Library Systems'].map((s) => (
                      <span key={s} className="text-[10px] text-[#0a1628]/50 font-semibold uppercase tracking-[0.12em]">{s}</span>
                    ))}
                  </div>
                </div>

                {/* Institutional Data Sources */}
                <div className="bg-[#fdf9f4] border border-[#ede5da] rounded-xl p-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0a1628]/40 mb-4">Institutional Data Sources</p>
                  <div className="divide-y divide-[#ede5da]">
                    {[
                      { label: 'Publisher Content',         desc: 'Licensed textbooks, journals and course materials', color: '#228DC1' },
                      { label: 'Student Information System', desc: 'Enrolment, programme and cohort data',              color: '#7c3aed' },
                      { label: 'Assessment Records',        desc: 'Grades, rubrics and historical performance',         color: '#059669' },
                    ].map((item) => (
                      <div key={item.label} className="flex gap-3 items-start py-3 group">
                        <div className="w-2 h-2 rounded-full shrink-0 mt-1.5 transition-transform group-hover:scale-125" style={{ backgroundColor: item.color }} />
                        <div>
                          <p className="text-[13px] font-semibold text-[#0a1628] leading-snug">{item.label}</p>
                          <p className="text-[11px] text-[#0a1628]/55 font-normal mt-0.5">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

// -- Four principles ----------------------------------------------------------
function PrinciplesSection() {
  const [ref, inView] = useInView(0.08)
  return (
    <section className="py-24 bg-[#f8fafc] border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        <div className="mb-14">
          <p className="type-label text-[#228DC1] mb-4">Our Principles</p>
          <h2 className="font-heading text-[#0a1628] mb-3" style={{ fontSize: '32px', lineHeight: 1.1 }}>
            Four foundations every decision is built on
          </h2>
          <p className="text-[#0a1628]/60 text-base font-normal leading-relaxed max-w-xl">
            The principles that define how universities actually need AI to work.
          </p>
        </div>
        <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 border border-gray-200">
          {principles.map((p, i) => (
            <div key={p.label} className="group bg-white p-8 hover:bg-[#f8fafc] transition-colors" style={reveal(inView, i * 80)}>
              <div className="w-10 h-10 flex items-center justify-center mb-6" style={{ backgroundColor: '#228DC112' }}>
                <FontAwesomeIcon icon={p.icon} className="w-5 h-5 text-[#228DC1]" />
              </div>
              <p className="type-label text-[#228DC1] mb-2">{p.label}</p>
              <h3 className="text-[#0a1628] font-semibold text-[15px] leading-snug mb-3">{p.title}</h3>
              <p className="text-[#0a1628]/60 text-sm font-normal leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// -- Pillars card grid ---------------------------------------------------------
function PillarsSection() {
  const [ref, inView] = useInView(0.08)

  return (
    <section className="py-24 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        <div className="mb-14" style={reveal(true, 0)}>
          <p className="type-label text-[#228DC1] mb-4">Platform</p>
          <h2 className="font-heading text-[#0a1628] mb-4" style={{ fontSize: '32px', lineHeight: 1.1 }}>
            Six pillars, one learning loop
          </h2>
          <p className="text-[#0a1628]/60 text-base font-normal leading-relaxed max-w-xl">
            Every capability connects. Smart Syllabus feeds the tutor. The tutor feeds assessment. Assessment feeds analytics.
          </p>
        </div>

        <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200 border border-gray-200">
          {pillars.map((p, i) => (
            <div key={p.num} className="group bg-white p-8 hover:bg-[#f8fafc] transition-colors" style={reveal(inView, i * 80)}>
              <div className="flex items-center gap-3 mb-6">
                <span className="font-black text-[10px] text-[#228DC1]" style={{ letterSpacing: '0.05em' }}>{p.num}</span>
                <div className="h-px flex-1 bg-gray-100" />
                <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#0a1628]/35">{p.tag}</span>
              </div>
              <h3 className="text-[#0a1628] font-semibold text-[15px] leading-snug mb-2">{p.label}</h3>
              <p className="text-[#0a1628]/60 text-sm font-normal leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// -- Who it's for --------------------------------------------------------------
function AudienceSection() {
  const [ref, inView] = useInView(0.08)

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        <div className="mb-14">
          <p className="type-label text-[#228DC1] mb-4">Who It's For</p>
          <h2 className="font-heading text-[#0a1628]" style={{ fontSize: '32px', lineHeight: 1.1 }}>
            Built for every layer of the institution
          </h2>
        </div>

        <div ref={ref} className="grid sm:grid-cols-3 gap-px bg-gray-200 border border-gray-200">
          {audiences.map((a, i) => (
            <div key={a.label} className="bg-white p-8 hover:bg-[#f8fafc] transition-colors" style={reveal(inView, i * 100)}>
              <p className="type-label text-[#228DC1] mb-4">{a.label}</p>
              <h3 className="text-[#0a1628] font-semibold text-[16px] leading-snug mb-6">{a.headline}</h3>
              <div className="space-y-3">
                {a.points.map((point) => (
                  <div key={point} className="flex items-start gap-2.5">
                    <FontAwesomeIcon icon={faCircleCheck} className="w-4 h-4 text-[#228DC1] shrink-0 mt-0.5" />
                    <p className="text-[#0a1628]/70 text-[13px] font-normal leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>
              <Link to="/contact" className="inline-flex items-center gap-1.5 mt-6 text-[12px] font-semibold text-[#228DC1] hover:gap-2.5 transition-all">
                Learn more <FontAwesomeIcon icon={faArrowRight} className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// -- Main page -----------------------------------------------------------------
export default function AruvaPage() {
  return (
    <>
      <ScrollProgress />
      {/* -- Hero -- */}
      <section className="relative overflow-hidden bg-[#f8fafc] pt-32 pb-20">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(circle at 65% 20%, rgba(37,99,235,0.14) 0, transparent 50%), radial-gradient(circle at 10% 80%, rgba(5,150,105,0.07) 0, transparent 40%)' }}
        />
        <div className="relative max-w-7xl mx-auto px-8 lg:px-12">
          {/* Top label */}
          <p className="font-black text-[#228DC1] mb-3" style={{ fontSize: '13px', letterSpacing: '0.28em', textTransform: 'uppercase', opacity: 0.6 }}>
            Aruva � AI for Education
          </p>

          {/* Headline */}
          <h1 className="font-serif-display text-[#0a1628] leading-[1.02] mb-6 max-w-4xl" style={{ fontSize: '40px', lineHeight: 1.1 }}>
            AI native learning.<br />
            <span style={{ color: '#228DC1' }}>Professor guided.</span><br />
            Built around every student.
          </h1>

          <p className="text-[#0a1628]/60 text-[16px] font-normal leading-relaxed max-w-2xl mb-10">
            An AI teaching and formative assessment platform for higher education. Personalised, governed and guided entirely by educator intent.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#228DC1] text-white text-[13px] font-semibold hover:bg-[#1a6e99] transition-colors"
            >
              Request a Demo
            </Link>
          </div>
        </div>
      </section>

      {/* -- Marquee -- */}
      <div className="bg-[#f8fafc] border-y border-gray-100 py-3.5 overflow-hidden">
        <div className="flex gap-10 animate-[marquee_35s_linear_infinite] whitespace-nowrap w-max">
          {[
            'Russell Group Universities', 'Teaching and Learning Teams', 'Academic Quality Officers',
            'Professors and Lecturers', 'UK Higher Education', 'Digital Transformation Teams',
            'IT and Data Governance', 'Student Experience Teams', 'Russell Group Universities',
            'Teaching and Learning Teams', 'Academic Quality Officers', 'Professors and Lecturers',
          ].map((item, i) => (
            <span key={i} className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#0a1628]/65 flex items-center gap-10">
              {item}
              <span className="w-1 h-1 rounded-full bg-[#0a1628]/25" />
            </span>
          ))}
        </div>
      </div>

      {/* -- Animated Demo -- */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          {/* Header � left aligned */}
          <div className="max-w-2xl mb-14">
            <p className="type-label text-[#228DC1] mb-4">See It in Action</p>
            <h2 className="font-heading text-[#0a1628] mb-5" style={{ fontSize: '32px', lineHeight: 1.1 }}>
              Guided learning, not shortcuts
            </h2>
            <p className="text-[#0a1628]/65 text-[17px] font-normal leading-relaxed">
              The professor configured Socratic mode in the Smart Syllabus. The AI follows that intent exactly � every exchange builds genuine understanding and creates a measurable learning signal.
            </p>
          </div>

          {/* Full-width product mockup */}
          <AnimatedDemo />

          {/* 3 callouts below */}
          <div className="mt-10 grid sm:grid-cols-3 gap-px bg-gray-100 border border-gray-100">
            {[
              { label: 'Course-aligned', desc: 'Every response follows the rules and mode the professor set in the Smart Syllabus.' },
              { label: 'Source-traceable', desc: 'AI outputs are tied to approved academic material with inline citations.' },
              { label: 'Signal-generating', desc: 'Each exchange updates the student\'s Learning Curve profile in real time.' },
            ].map((item) => (
              <div key={item.label} className="bg-white px-8 py-6">
                <p className="text-[#0a1628] font-semibold text-[14px] mb-2">{item.label}</p>
                <p className="text-[#0a1628]/60 text-sm font-normal leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -- Platform Architecture -- */}
      <PlatformDiagram />

      {/* -- How It Works -- */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="mb-20">
            <p className="type-label text-[#228DC1] mb-4">How It Works</p>
            <h2 className="font-heading text-[#0a1628] mb-4" style={{ fontSize: '32px', lineHeight: 1.1 }}>
              From syllabus to intelligent tutor in hours
            </h2>
            <p className="text-[#0a1628]/65 text-[16px] font-normal leading-relaxed max-w-2xl">
              Aruva transforms your existing course structure into a governed AI teaching layer. No rip-and-replace, no new workflows.
            </p>
          </div>

          <div className="space-y-0">
            {howItWorksSteps.map((step, i) => {
              const isEven = i % 2 === 1
              const Visual = step.visual === 'syllabus' ? SyllabusVisual
                : step.visual === 'align' ? AlignVisual
                : step.visual === 'tutor' ? TutorVisual
                : AnalyticsVisual

              return (
                <div key={step.num}>
                  <div className={`grid lg:grid-cols-2 gap-16 items-center py-16 ${i < howItWorksSteps.length - 1 ? 'border-b border-gray-100' : ''}`}>
                    {/* Text side */}
                    <div className={isEven ? 'lg:order-2' : ''}>
                      <div className="flex items-center gap-3 mb-5">
                        <span className="font-black tabular-nums text-[#228DC1] text-sm" style={{ letterSpacing: '-0.01em' }}>{step.num}</span>
                        <div className="h-px flex-1 bg-gray-100 max-w-8" />
                      </div>
                      <h3 className="font-semibold text-[#0a1628] mb-4" style={{ fontSize: '20px', lineHeight: 1.1 }}>
                        {step.label}
                      </h3>
                      <p className="text-[#0a1628]/65 text-[16px] font-normal leading-relaxed">
                        {step.desc}
                      </p>
                    </div>

                    {/* Visual side */}
                    <div className={isEven ? 'lg:order-1' : ''}>
                      <Visual />
                    </div>
                  </div>

                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* -- Four principles -- */}
      <PrinciplesSection />

      {/* -- Platform pillars -- */}
      <PillarsSection />

      {/* -- Who it's for -- */}
      <AudienceSection />

      {/* -- Governance -- */}
      <section className="py-20 bg-[#f8fafc] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="type-label text-[#228DC1] mb-4">Governance and Trust</p>
              <h2 className="font-heading text-[#0a1628] mb-5" style={{ fontSize: '32px', lineHeight: 1.1 }}>
                AI that institutions can govern.
              </h2>
              <p className="text-[#0a1628]/65 text-base font-normal leading-relaxed">
                Built for the real requirements of higher education: data residency, audit trails, role-based access and full control over how AI behaves.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-px bg-gray-200 border border-gray-200">
              {[
                { label: 'Data Residency', desc: 'Cloud, hybrid or on-prem.' },
                { label: 'Audit Trail', desc: 'Every interaction traceable.' },
                { label: 'Access Control', desc: 'Role-based, institution-wide.' },
                { label: 'Academic Integrity', desc: 'Socratic AI, no shortcuts.' },
              ].map((item) => (
                <div key={item.label} className="bg-white p-6">
                  <p className="text-[#0a1628] font-semibold text-[14px] mb-1.5">{item.label}</p>
                  <p className="text-[#0a1628]/55 text-[13px] font-normal leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* -- Pilot CTA strip -- */}
      <section className="py-16 bg-[#f8fafc] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-8 lg:px-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <div>
            <p className="text-[#0a1628] font-semibold text-[16px] mb-1">Start with a focused course pilot.</p>
            <p className="text-[#0a1628]/65 text-sm font-normal">
              Select 2 to 3 courses, connect your LMS and measure value before scaling across departments.
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
