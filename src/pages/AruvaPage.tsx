import React, { useState, useRef, useEffect, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faBookOpen, faShield, faArrowsRotate, faWandSparkles, faCircleCheck, faMicrophone, faPen, faImage, faChartLine } from '@fortawesome/free-solid-svg-icons'
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
    label: 'Syllabus first',
    title: 'Your course is the AI.',
    desc: 'Aruva starts from your outcomes, resources and assessment rules. Not a blank prompt.',
    color: '#228DC1',
  },
  {
    icon: faShield,
    label: 'Professor in control',
    title: 'Professors set the rules.',
    desc: 'Tone, depth, approved content and learning flow. The AI stays within the boundaries educators define.',
    color: '#059669',
  },
  {
    icon: faArrowsRotate,
    label: 'Live signals',
    title: 'Every exchange is a signal.',
    desc: 'Questions, planner activity and assessment responses update each student\'s learning profile in real time.',
    color: '#7c3aed',
  },
  {
    icon: faWandSparkles,
    label: 'Early action',
    title: 'Act during the term, not after.',
    desc: 'Gap detection happens while learning is live. Not after grades are submitted or surveys returned.',
    color: '#d97706',
  },
]


// -- Who it's for --------------------------------------------------------------
const audiences = [
  {
    label: 'Students',
    headline: 'Guided. Not an answer engine.',
    points: [
      'Tutoring aligned to your syllabus and week. Not generic web answers',
      'Progress tracked across topics, mastery and confidence',
      'Smart planner for coursework, revision and workload',
    ],
  },
  {
    label: 'Educators',
    headline: 'More insight. Less admin.',
    points: [
      'AI assisted quiz, rubric and assessment variant creation',
      'See student gaps and at risk signals while the term is live',
      'Material effectiveness data in your professor dashboard',
    ],
  },
  {
    label: 'Institutions',
    headline: 'Adopt AI. Stay in control.',
    points: [
      'Governance built in. Not bolted on afterwards',
      'Cloud, hybrid or on premises deployment with full data residency',
      'Analytics mapped to outcomes, retention and quality enhancement',
    ],
  },
]

// -- Platform pillars ----------------------------------------------------------
const pillars = [
  { num: '01', label: 'Smart Syllabus',         tag: 'Course Intelligence',   desc: 'Turns course outcomes, resources and assessments into the intelligence layer that guides every tutoring and assessment interaction.' },
  { num: '02', label: 'Professor-Guided Tutor',  tag: 'Adaptive Teaching',    desc: 'Educators define tone, depth and rules. Students receive Socratic guidance that builds genuine understanding, not shortcuts.' },
  { num: '03', label: 'Formative Assessment',    tag: 'Assessment Intelligence', desc: 'Supports quizzes, rubrics and early gap detection so educators can intervene during the term, not after grades are submitted.' },
  { num: '04', label: 'Learning Curve AI',       tag: 'Performance Profiling', desc: 'Builds individual student profiles across mastery, confidence, pace and workload, adapting support as each student progresses.' },
  { num: '05', label: 'Educator Analytics',      tag: 'Teaching Insight',     desc: 'Real-time visibility into engagement, topic difficulty and intervention opportunities across cohorts.' },
  { num: '06', label: 'Governance Layer',        tag: 'Institutional Control', desc: 'Role-based access, audit trails and data residency controls keep AI accountable and under institutional control.' },
]

// -- How It Works steps --------------------------------------------------------
const howItWorksSteps = [
  {
    num: '01',
    label: 'Connect your course',
    desc: 'Upload your syllabus, connect your LMS and set the rules. Every outcome and rubric becomes part of the intelligence layer.',
    detail: 'Works with Canvas, Moodle, Blackboard and Brightspace.',
    visual: 'syllabus',
  },
  {
    num: '02',
    label: 'AI aligns to your rules',
    desc: 'Aruva compiles your course into a policy layer. How the AI tutors, what content it draws from and what hint stages to apply.',
    detail: 'Every response is course aware. Nothing operates outside the bounds you set.',
    visual: 'align',
  },
  {
    num: '03',
    label: 'Students learn. AI guides.',
    desc: 'A Socratic tutor that asks questions and cites sources. Not one that gives away answers.',
    detail: 'Live with real students. Used in production at British Council English Online.',
    visual: 'tutor',
  },
  {
    num: '04',
    label: 'Educators see everything.',
    desc: 'Engagement, topic difficulty and at risk signals in one dashboard. While learning is still happening.',
    detail: 'Analytics roll up to department and programme level.',
    visual: 'analytics',
  },
]

function SyllabusVisual() {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-7 shadow-[0_4px_24px_rgba(10,22,40,0.07)]">
      {/* Source chips row */}
      <div className="flex items-center gap-2 flex-wrap mb-5">
        {[
          { name: 'Canvas',     color: '#E66000', logo: '/logos/canvas.svg'     },
          { name: 'Moodle',     color: '#F98012', logo: '/logos/moodle.svg'     },
          { name: 'Blackboard', color: '#2E3191', logo: '/logos/blackboard.svg' },
        ].map(lms => (
          <div key={lms.name} className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg" style={{ background: lms.color + '12', border: '1px solid ' + lms.color + '30' }}>
            <img src={lms.logo} alt={lms.name} className="w-3.5 h-3.5 object-contain shrink-0" />
            <span className="text-[14px] font-semibold" style={{ color: lms.color }}>{lms.name}</span>
          </div>
        ))}
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-gray-50 border border-gray-200">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.5"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <span className="text-[14px] font-medium text-gray-400">Upload .xlsx</span>
        </div>
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none"><path d="M1 6h14M11 2l4 4-4 4" stroke="#228DC1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[14px] font-bold" style={{ background: '#228DC115', border: '1px solid #228DC130', color: '#228DC1' }}>
          <div className="w-1.5 h-1.5 rounded-full bg-[#228DC1]" />
          Smart Syllabus
        </div>
      </div>
      {/* Parsed weeks */}
      <p className="text-[14px] font-semibold uppercase tracking-[0.18em] text-[#0a1628]/35 mb-3">Business Strategy 101: Parsed</p>
      <div className="space-y-2 mb-5">
        {[
          { week: 'Week 3', topic: "Porter's Five Forces", mode: 'Socratic only', color: '#228DC1' },
          { week: 'Week 4', topic: 'Competitive Advantage',  mode: 'Guided hints',  color: '#7c3aed' },
          { week: 'Week 5', topic: 'Market Segmentation',    mode: 'Open tutor',    color: '#059669' },
        ].map(row => (
          <div key={row.week} className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#f8fafc] border border-gray-100">
            <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: row.color }} />
            <span className="text-[#0a1628]/35 text-[14px] font-semibold w-12 shrink-0">{row.week}</span>
            <span className="text-[#0a1628]/70 text-[14px] font-medium flex-1">{row.topic}</span>
            <span className="text-[14px] px-2 py-0.5 rounded-full font-semibold" style={{ background: row.color + '12', color: row.color, border: '1px solid ' + row.color + '25' }}>{row.mode}</span>
          </div>
        ))}
      </div>
      {/* Status */}
      <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-[#e5f4fa] border border-[#228DC1]/20">
        <div className="w-2 h-2 rounded-full bg-[#228DC1] shrink-0" />
        <span className="text-[14px] text-[#228DC1] font-semibold">Policy layer compiled. AI is ready to teach</span>
      </div>
    </div>
  )
}

function AlignVisual() {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-7 shadow-[0_4px_24px_rgba(10,22,40,0.07)]">
      <p className="text-[14px] font-semibold uppercase tracking-[0.18em] text-[#0a1628]/35 mb-5">AI Policy Compilation</p>
      <div className="flex items-stretch gap-4">
        {/* Inputs */}
        <div className="flex flex-col gap-2 flex-1">
          {[
            { label: 'Outcomes',         color: '#228DC1' },
            { label: 'Rubric rules',     color: '#7c3aed' },
            { label: 'Approved content', color: '#059669' },
            { label: 'AI mode',          color: '#d97706' },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-[#f8fafc] border border-gray-100">
              <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
              <span className="text-[#0a1628]/65 text-[14px] font-medium">{item.label}</span>
            </div>
          ))}
        </div>
        {/* Arrow */}
        <div className="flex flex-col items-center justify-center gap-2 shrink-0 px-2">
          <div className="flex-1 w-px bg-gradient-to-b from-transparent to-[#228DC1]/40" />
          <div className="w-9 h-9 rounded-full flex items-center justify-center bg-[#e5f4fa] border border-[#228DC1]/30">
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M7 1v12M3 8l4 5 4-5" stroke="#228DC1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <div className="flex-1 w-px bg-gradient-to-b from-[#228DC1]/40 to-transparent" />
        </div>
        {/* Outputs */}
        <div className="flex flex-col gap-2 flex-1">
          {[
            { label: 'Policy Graph', color: '#228DC1' },
            { label: 'RAG Scope',    color: '#7c3aed' },
            { label: 'Hint Stages',  color: '#059669' },
            { label: 'Rubric Rules', color: '#d97706' },
          ].map(n => (
            <div key={n.label} className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl" style={{ background: n.color + '0e', border: '1px solid ' + n.color + '25' }}>
              <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: n.color }} />
              <span className="text-[14px] font-semibold" style={{ color: n.color }}>{n.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function TutorVisual() {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(10,22,40,0.07)]">
      {/* Header */}
      <div className="px-5 py-3 flex items-center justify-between bg-[#f8fafc] border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="bg-white rounded-lg flex items-center px-2 border border-gray-200 shadow-sm" style={{ height: 26 }}>
            <img
              src="/aruva-logo.png"
              alt="Aruva"
              style={{ height: 14, width: 'auto', objectFit: 'contain' }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
            />
          </div>
          <span className="text-[#0a1628]/60 text-[14px] font-semibold">Tutor</span>
          <span className="text-[#0a1628]/20 text-[14px]">·</span>
          <span className="text-[#0a1628]/40 text-[14px]">Week 3 · Socratic mode</span>
        </div>
        <span className="text-[14px] font-semibold px-2 py-0.5 rounded-full text-[#059669] bg-[#f0fdf4] border border-[#059669]/20">No direct answers</span>
      </div>
      {/* Messages */}
      <div className="p-5 space-y-4 bg-[#fafafa]">
        <div className="flex justify-end">
          <div className="px-4 py-2.5 rounded-2xl rounded-br-sm max-w-[80%] bg-[#228DC1]">
            <p className="text-white text-[14px] leading-relaxed">Can you solve this Porter's Five Forces analysis for me?</p>
          </div>
        </div>
        <div className="flex gap-2.5 items-start">
          <div className="rounded-md flex items-center justify-center shrink-0 bg-white border border-gray-200 shadow-sm px-2" style={{ height: 28, minWidth: 28 }}>
            <img
              src="/aruva-logo.png"
              alt="Aruva"
              style={{ height: 12, width: 'auto', objectFit: 'contain' }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
            />
          </div>
          <div className="flex-1 px-4 py-3 rounded-2xl rounded-tl-sm bg-white border border-gray-100 shadow-sm">
            <p className="text-[#0a1628]/80 text-[14px] leading-relaxed mb-2.5">Which of the five forces has the strongest impact here? Start with your instinct.</p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[14px] font-semibold text-[#228DC1] bg-[#e5f4fa] border border-[#228DC1]/20">
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.1-1.1m-.757-4.9a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Porter, 2008, Ch.2
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#f0fdf4] border border-[#059669]/20">
          <div className="w-1.5 h-1.5 rounded-full shrink-0 bg-[#059669]" />
          <p className="text-[14px] font-semibold text-[#059669]">Mastery signal captured. Learning Curve updated</p>
        </div>
      </div>
    </div>
  )
}

function AnalyticsVisual() {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-[0_4px_24px_rgba(10,22,40,0.07)]">
      <div className="flex items-start justify-between mb-5 pb-4 border-b border-gray-100">
        <div>
          <p className="text-[14px] font-semibold uppercase tracking-[0.16em] text-[#0a1628]/40 mb-1">Professor Dashboard</p>
          <p className="text-[#0a1628] font-semibold text-[14px]">Business Strategy 101, Week 3</p>
        </div>
        <div className="text-right">
          <p className="font-black text-2xl leading-none text-[#059669]">87%</p>
          <p className="text-[14px] text-[#0a1628]/40 mt-0.5">Engagement</p>
        </div>
      </div>
      <div className="space-y-3 mb-5">
        {[
          { label: 'Competitive Rivalry', pct: 88, color: '#228DC1', gap: false },
          { label: 'Buyer Power',         pct: 55, color: '#d97706', gap: true  },
          { label: 'Supplier Power',      pct: 72, color: '#228DC1', gap: false },
        ].map(item => (
          <div key={item.label}>
            <div className="flex justify-between items-center mb-1.5">
              <p className="text-[#0a1628]/55 text-[14px] font-medium">{item.label}</p>
              <div className="flex items-center gap-2">
                {item.gap && <span className="text-[14px] font-semibold px-1.5 py-0.5 rounded text-[#d97706] bg-[#fef3c7] border border-[#d97706]/20">Gap</span>}
                <span className="text-[#0a1628] text-[14px] font-semibold">{item.pct}%</span>
              </div>
            </div>
            <div className="h-1.5 rounded-full bg-gray-100">
              <div className="h-full rounded-full" style={{ width: item.pct + '%', backgroundColor: item.color }} />
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-start gap-3 px-4 py-3 rounded-xl bg-[#fef3c7] border border-[#d97706]/20">
        <div className="w-2 h-2 rounded-full mt-0.5 shrink-0 bg-[#d97706]" />
        <div>
          <p className="text-[14px] font-semibold text-[#d97706]">3 students at risk on Buyer Power</p>
          <p className="text-[14px] text-[#d97706]/70 mt-0.5">Gap detected in Week 3. Intervene now</p>
        </div>
      </div>
    </div>
  )
}




// -- Platform architecture diagram ---------------------------------------------
function PlatformDiagram() {
  const layers = [
    { label: 'Smart Syllabus',          sublabel: 'How the AI knows your course',          color: '#228DC1', items: ['Outcome mapping','Teaching rules','Rubric logic','AI boundaries'] },
    { label: 'Learning Curve AI',        sublabel: 'Each student, individually tracked',   color: '#7c3aed', items: ['Mastery tracking','Confidence signals','Workload modelling','Early risk signals'] },
    { label: 'Governance Layer',         sublabel: 'Your institution, your rules',          color: '#059669', items: ['Role based access','Full audit trail','Data residency','Policy enforcement'] },
    { label: 'Traceable Knowledge Layer',sublabel: 'Every answer, fully sourced',           color: '#d97706', items: ['Source provenance','Citation resolver','Attribution','AI auditability'] },
  ]

  const surfaces = [
    {
      label: 'Adaptive Tutor', desc: 'Teaches from your course, not the open web', color: '#228DC1',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>,
    },
    {
      label: 'Professor Dashboard', desc: 'See where your class is, right now', color: '#7c3aed',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/><rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/><rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/><rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/></svg>,
    },
    {
      label: 'Formative Assessment', desc: 'Spot the gaps while you can still close them', color: '#059669',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8"/><path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    },
    {
      label: 'Student Planner', desc: 'Organised around what matters this week', color: '#ea580c',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.8"/><path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>,
    },
    {
      label: 'Institutional Analytics', desc: 'One view across every course you run', color: '#dc2626',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M18 20V10M12 20V4M6 20v-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>,
    },
  ]

  const lmsList = [
    { name: 'Canvas',      color: '#E66000', logo: '/logos/canvas.svg'      },
    { name: 'Moodle',      color: '#F98012', logo: '/logos/moodle.svg'      },
    { name: 'Blackboard',  color: '#2E3191', logo: '/logos/blackboard.svg'  },
    { name: 'Brightspace', color: '#D31532', logo: '/logos/brightspace.svg' },
  ]

  const dataSources = ['SIS / Student Records','Library Systems','Assessment Tools','SSO / SAML','Email & Notifications','Attendance Data']

  const topBar: React.CSSProperties = {
    background: '#0a1628',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: '7px 12px', flexShrink: 0,
  }
  const topBarText: React.CSSProperties = {
    color: 'rgba(255,255,255,0.75)', fontSize: 9, fontWeight: 800,
    letterSpacing: '0.22em', textTransform: 'uppercase', whiteSpace: 'nowrap',
  }

  const ArrowR = () => (
    <svg width="22" height="12" viewBox="0 0 22 12" fill="none">
      <path d="M1 6h20M15 1l6 5-6 5" stroke="#9ca3af" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )

  return (
    <section className="py-24" style={{ background: '#f0f4f8' }}>
      <div className="max-w-6xl mx-auto px-8 lg:px-12">

        {/* Section header */}
        <div className="mb-12 text-center">
          <p className="inline-flex items-center px-3 py-1 bg-[#e5f4fa] text-[#228DC1] rounded-full text-[11px] font-bold uppercase tracking-[0.18em] mb-5">Architecture</p>
          <h2 className="font-heading text-[#0a1628] mb-3">
            Four layers. <span className="bg-[#fde68a] px-1.5 py-0.5 rounded-sm">One platform.</span>
          </h2>
          <p className="text-[#0a1628]/55 text-[17px] font-normal leading-[1.7] max-w-xl mx-auto">
            Not a bundle of tools. One connected system where every layer talks to the next.
          </p>
        </div>

        {/* ── Main diagram: LEFT → RIGHT ── */}
        <div className="flex items-stretch overflow-hidden border border-gray-200 shadow-sm" style={{ borderRadius: 16 }}>

          {/* ── ZONE 1: INTEGRATIONS ── */}
          <div className="flex flex-col shrink-0" style={{ width: 190 }}>
            <div style={topBar}><span style={topBarText}>Integrations</span></div>
            <div className="flex-1 flex flex-col gap-4 px-4 py-4 bg-white border-r border-gray-100">
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.22em] text-[#0a1628]/35 mb-2">VLE / LMS</p>
                <div className="flex flex-col gap-1.5">
                  {lmsList.map(lms => (
                    <span key={lms.name}
                      className="inline-flex items-center gap-2 px-2.5 py-1.5 border bg-white text-[12px] font-semibold text-[#0a1628]"
                      style={{ borderLeftWidth: 3, borderLeftColor: lms.color, borderTopColor: '#e5e7eb', borderRightColor: '#e5e7eb', borderBottomColor: '#e5e7eb' }}>
                      <img src={lms.logo} alt={lms.name} className="w-3 h-3 object-contain" />{lms.name}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.22em] text-[#0a1628]/35 mb-2">Data Sources</p>
                <div className="flex flex-col gap-1.5">
                  {dataSources.map(d => (
                    <span key={d} className="px-2.5 py-1 bg-[#f8fafc] border border-gray-200 text-[11px] font-medium text-[#0a1628]/70">
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── CONNECTOR: Sync & Deploy / Read & Write ── */}
          <div className="flex flex-col items-center justify-center gap-3 px-3 bg-[#f8fafc] border-r border-gray-100 shrink-0" style={{ width: 78 }}>
            <div className="flex flex-col items-center gap-1.5">
              <ArrowR />
              <span className="text-[8px] font-black uppercase tracking-[0.14em] text-[#0a1628]/40 text-center leading-tight">Sync &amp;<br/>Deploy</span>
            </div>
            <div className="w-full h-px bg-gray-200" />
            <div className="flex flex-col items-center gap-1.5">
              <span className="text-[8px] font-black uppercase tracking-[0.14em] text-[#0a1628]/40 text-center leading-tight">Read &amp;<br/>Write</span>
              <ArrowR />
            </div>
          </div>

          {/* ── ZONE 2: SERVICES ── */}
          <div className="flex flex-col flex-1">
            <div style={topBar}><span style={topBarText}>Services</span></div>
            {/* Platform label sits above all rows */}
            <div className="bg-white border-b border-gray-100 px-5 py-3 flex items-center justify-center gap-3">
              <div className="h-px flex-1 bg-gray-200" />
              <p className="font-black text-[#0a1628]/45 text-[10px] uppercase tracking-[0.22em] shrink-0">
                Aruva Intelligent Education Platform
              </p>
              <div className="h-px flex-1 bg-gray-200" />
            </div>
            <div className="flex-1 divide-y divide-gray-100">
              {layers.map(layer => (
                <div key={layer.label} className="flex items-stretch">
                  {/* Coloured identity block */}
                  <div className="shrink-0 flex flex-col justify-center px-4 py-4"
                    style={{ width: 180, background: layer.color, minHeight: 76 }}>
                    <p className="text-white font-bold text-[13px] leading-snug">{layer.label}</p>
                    <p className="text-white/75 text-[10px] font-normal leading-snug mt-1">{layer.sublabel}</p>
                  </div>
                  {/* Small arrow bridge */}
                  <div className="flex items-center justify-center shrink-0 px-2"
                    style={{ background: layer.color + '18' }}>
                    <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                      <path d="M1 5h12M8 1l5 4-5 4" stroke={layer.color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  {/* Chips — tinted background matching layer colour */}
                  <div className="flex-1 flex flex-wrap items-center gap-2 px-4 py-4"
                    style={{ background: layer.color + '0a' }}>
                    {layer.items.map(item => (
                      <span key={item}
                        className="px-2.5 py-1 bg-white text-[11px] font-semibold text-[#0a1628] shadow-[0_1px_4px_rgba(10,22,40,0.06)]"
                        style={{ border: `1px solid ${layer.color}30`, borderRadius: 6 }}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── CONNECTOR: Aruva Platform API ── */}
          <div className="flex flex-col items-center justify-center gap-3 px-3 bg-[#f8fafc] border-l border-gray-100 shrink-0" style={{ width: 78 }}>
            <ArrowR />
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white border border-gray-200 shadow-sm"
              style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', whiteSpace: 'nowrap', borderRadius: 20 }}>
              <div className="w-1.5 h-1.5 rounded-full bg-[#228DC1]" />
              <span className="text-[8px] font-black uppercase tracking-[0.14em] text-[#0a1628]">Aruva API</span>
              <div className="w-1.5 h-1.5 rounded-full bg-[#228DC1]" />
            </div>
            <ArrowR />
          </div>

          {/* ── ZONE 3: USER INTERFACE ── */}
          <div className="flex flex-col shrink-0" style={{ width: 205 }}>
            <div style={topBar}><span style={topBarText}>User Interface</span></div>
            <div className="flex-1 flex flex-col gap-2 p-3 bg-white">
              {surfaces.map(s => (
                <div key={s.label} className="flex items-start gap-2.5 p-2.5 border border-gray-100 bg-white shadow-[0_1px_6px_rgba(10,22,40,0.05)]" style={{ borderRadius: 10 }}>
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: s.color + '14', color: s.color }}>
                    {s.icon}
                  </div>
                  <div>
                    <p className="text-[12px] font-bold text-[#0a1628] leading-snug">{s.label}</p>
                    <p className="text-[10px] text-[#0a1628]/50 font-normal leading-snug mt-0.5">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}



// -- Bloom Insight Section -------------------------------------------------------
const BLOOM_SEMS = [
  { id:'S1', label:'Semester 1', grade:62, gradeLabel:'D+',
    bloom:[65,55,50,42,28,52],
    cohortAvg:[63,61,58,60,59,62],
    headline:'Higher-order thinking gaps flagged early',
    detail:'Adam recalls facts well but Evaluate and Analyse are underdeveloped. Aruva surfaces this in week 2, not at the end of term.',
    delta: null, accent:'#e11d48' },
  { id:'S2', label:'Semester 2', grade:71, gradeLabel:'C+',
    bloom:[78,72,70,66,52,74],
    cohortAvg:[67,65,63,64,62,66],
    headline:'Targeted intervention closes the evaluation gap',
    detail:'Focused practice on Evaluate (weeks 4 to 6) drove a 24-point jump in that dimension. Overall grade improved 9%. Adam\'s biggest single semester gain.',
    delta:'+9%', accent:'#d97706' },
  { id:'S3', label:'Semester 3', grade:81, gradeLabel:'B',
    bloom:[88,85,84,80,76,91],
    cohortAvg:[72,70,69,71,70,74],
    headline:'Balanced mastery across all six levels',
    detail:'All six dimensions above 76%. Adam is now in the top quartile of his cohort, a 19-point improvement from Semester 1.',
    delta:'+19%', accent:'#059669' },
]
const BLOOM_LABELS  = ['Remember','Understand','Apply','Analyse','Evaluate','Create']
const BLOOM_SIMPLE  = ['Recall facts','Explain ideas','Use knowledge','Break it down','Make judgements','Build new ideas']

// -- DOK data -------------------------------------------------------------------
const DOK_SEMS = [
  { id:'S1', label:'Semester 1', grade:62, gradeLabel:'D+',
    dok:[72, 54, 31, 38], cohortAvg:[68, 62, 55, 52],
    headline:'Strategic thinking is the ceiling',
    detail:'Adam handles recall and surface-level skills confidently, but DOK 3 and DOK 4 tasks reveal a clear ceiling. Aruva flags this gap before the mid-term.',
    delta: null, accent:'#e11d48' },
  { id:'S2', label:'Semester 2', grade:71, gradeLabel:'C+',
    dok:[82, 71, 58, 62], cohortAvg:[70, 65, 58, 55],
    headline:'Reasoning depth starts to unlock',
    detail:'Targeted tasks at DOK 3 drove a 27-point jump. DOK 4 extended thinking is now emerging, opening the door to higher-order performance.',
    delta:'+9%', accent:'#d97706' },
  { id:'S3', label:'Semester 3', grade:81, gradeLabel:'B',
    dok:[91, 86, 79, 83], cohortAvg:[74, 70, 66, 63],
    headline:'All four depths operating at mastery',
    detail:'Adam is performing above 79% across all DOK levels. Extended thinking tasks that were previously a gap are now a strength. Top quartile cohort result.',
    delta:'+19%', accent:'#059669' },
]
const DOK_LABELS  = ['DOK 1','DOK 2','DOK 3','DOK 4']
const DOK_NAMES   = ['Recall & Reproduce','Skills & Concepts','Strategic Thinking','Extended Thinking']
const DOK_SIMPLE  = ['Recall, define, identify','Classify, infer, estimate','Analyse, hypothesise, cite evidence','Design, connect, synthesise']
const DOK_COLORS  = ['#60a5fa','#34d399','#f59e0b','#a78bfa']
// WCAG AA-compliant text colours (≥4.5:1 on white) — darker shade of each DOK colour
const DOK_TEXT_COLORS = ['#1565a8','#0a7550','#a05a00','#5b21b6']
const DOK_KEYWORDS = [
  ['Recall','Define','State','Identify','List','Name','Quote','Measure'],
  ['Classify','Infer','Categorise','Compare','Estimate','Construct','Modify','Graph'],
  ['Analyse','Hypothesise','Cite Evidence','Draw Conclusions','Formulate','Differentiate','Investigate'],
  ['Design','Connect','Synthesise','Apply Concepts','Create','Critique','Prove'],
]

// -- Multimodal capabilities section ------------------------------------------
// Pre-compute graph paths (outside component — pure maths, no side effects)
const _GW = 200, _GH = 130, _CX = 100, _CY = 65
const _XS = 15, _YS = 13        // px per unit
function _sinePath() {
  let d = ''
  for (let px = 0; px <= _GW; px += 2) {
    const rx = (px - _CX) / _XS
    const py = _CY - Math.sin(rx) * 1.5 * _YS
    d += px === 0 ? `M${px},${py.toFixed(1)}` : ` L${px},${py.toFixed(1)}`
  }
  return d
}
function _linearEndpoints() {
  const pxAtBottom = _CX + (((_CY - _GH) / _YS - 3) / 3) * _XS
  const pxAtTop    = _CX + (((_CY - 0)   / _YS - 3) / 3) * _XS
  return { x1: pxAtBottom, y1: _GH, x2: pxAtTop, y2: 0 }
}
const SINE_PATH   = _sinePath()
const LINEAR_PTS  = _linearEndpoints()
const SINE_LEN    = 400

const MM_MODALITIES = [
  { faIcon: faMicrophone, label: 'Voice', color: '#228DC1', desc: 'Spoken narration for any concept' },
  { faIcon: faPen,        label: 'Text',  color: '#7c3aed', desc: 'Step-by-step written solutions'   },
  { faIcon: faImage,      label: 'Image', color: '#059669', desc: 'AI-generated illustrations'        },
  { faIcon: faChartLine,  label: 'Graph', color: '#d97706', desc: 'Function graphs and data plots'    },
]
const MM_VOICE_BARS   = [0.15,0.55,1.0,0.35,0.8,0.2,0.95,0.5,0.75,0.12,1.0,0.4,0.65,0.9,0.28,0.7,0.45,0.85,0.18,0.6,1.0,0.3,0.78,0.42,0.9,0.22,0.68,0.5]
const MM_VOICE_DELAYS = [0,0.16,0.06,0.28,0.04,0.34,0.10,0.44,0.20,0.13,0.38,0.03,0.26,0.08,0.42,0.18,0.32,0.07,0.24,0.46,0.02,0.30,0.14,0.40,0.09,0.36,0.22,0.50]
const MM_STEPS = [
  { label:'Given',   val:'x² − 5x + 6 = 0' },
  { label:'Factor',  val:'(x − 2)(x − 3) = 0' },
  { label:'Solve',   val:'x = 2  or  x = 3' },
  { label:'Check ✓', val:'4 − 10 + 6 = 0 ✓' },
]

function MMImageDemo() {
  const [show, setShow] = React.useState(false)
  const [phase, setPhase] = React.useState(0)
  const PROMPT = 'Illustrate: the water cycle'
  const [typed, setTyped] = React.useState(0)

  React.useEffect(() => {
    let i = 0
    const typeId = setInterval(() => {
      i++; setTyped(i)
      if (i >= PROMPT.length) {
        clearInterval(typeId)
        setTimeout(() => setPhase(1), 250)
        setTimeout(() => setShow(true), 650)
      }
    }, 52)
    return () => clearInterval(typeId)
  }, [])

  return (
    <div style={{ display:'flex', flexDirection:'column', flex:1 }}>
      {/* Prompt bar */}
      <div style={{ borderBottom:'1px solid #e5e7eb', padding:'9px 18px', display:'flex', alignItems:'center', gap:8, background:'#fafbfc' }}>
        <div style={{ width:7, height:7, borderRadius:'50%', background: phase>=1 ? '#059669' : '#d1d5db', transition:'background 0.4s ease', flexShrink:0 }}/>
        <span style={{ fontSize:11, color:'#374151', fontFamily:"'Roboto Mono','Courier New',monospace", fontWeight:500, flex:1 }}>
          {PROMPT.slice(0, typed)}
          {typed < PROMPT.length && <span style={{ display:'inline-block', width:2, height:11, background:'#059669', marginLeft:1, verticalAlign:'middle', animation:'mmCursor 0.8s step-end infinite' }}/>}
        </span>
        {phase >= 1 && (
          <span style={{ fontSize:9, fontWeight:700, color:'#059669', background:'rgba(5,150,105,0.10)', padding:'3px 8px', borderRadius:10, border:'1px solid rgba(5,150,105,0.22)', letterSpacing:'0.06em', textTransform:'uppercase' }}>Generated</span>
        )}
      </div>

      {/* Illustration canvas */}
      <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', padding:'12px 16px' }}>
        <svg viewBox="0 0 280 178" style={{ width:'100%', height:'auto', borderRadius:10, overflow:'hidden' }}>
          <defs>
            <linearGradient id="imgSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#bfdbfe"/>
              <stop offset="100%" stopColor="#dbeafe"/>
            </linearGradient>
            <linearGradient id="imgSea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#60a5fa"/>
              <stop offset="100%" stopColor="#3b82f6"/>
            </linearGradient>
          </defs>

          {/* Sky */}
          <rect x="0" y="0" width="280" height="178" fill="url(#imgSky)"
            style={{ opacity: show?1:0, transition: show?'opacity 0.5s ease 0s':'none' }}/>
          {/* Ocean */}
          <path d="M0 128 Q70 122 140 128 Q210 134 280 128 L280 178 L0 178 Z" fill="url(#imgSea)"
            style={{ opacity: show?1:0, transition: show?'opacity 0.5s ease 0.2s':'none' }}/>
          {/* Mountains back-left */}
          <path d="M-5 130 L55 62 L115 130 Z" fill="#a5b4fc"
            style={{ opacity: show?1:0, transition: show?'opacity 0.4s ease 0.3s':'none' }}/>
          {/* Mountains back-right */}
          <path d="M162 130 L225 55 L290 130 Z" fill="#c4b5fd"
            style={{ opacity: show?1:0, transition: show?'opacity 0.4s ease 0.35s':'none' }}/>
          {/* Ground */}
          <path d="M0 130 Q70 120 140 126 Q210 132 280 126 L280 155 L0 155 Z" fill="#86efac"
            style={{ opacity: show?1:0, transition: show?'opacity 0.4s ease 0.4s':'none' }}/>

          {/* Sun */}
          <circle cx="232" cy="34" r="18" fill="#fbbf24"
            style={{ opacity: show?1:0, transition: show?'opacity 0.4s ease 0.05s':'none' }}/>
          {[0,45,90,135,180,225,270,315].map((angle,i) => {
            const r = (angle * Math.PI) / 180
            return <line key={angle} x1={232+Math.cos(r)*21} y1={34+Math.sin(r)*21} x2={232+Math.cos(r)*28} y2={34+Math.sin(r)*28}
              stroke="#fbbf24" strokeWidth="2" strokeLinecap="round"
              style={{ opacity: show?0.9:0, transition: show?`opacity 0.3s ease ${0.1+i*0.03}s`:'none' }}/>
          })}

          {/* Cloud 1 */}
          <g style={{ opacity: show?1:0, transition: show?'opacity 0.5s ease 0.5s':'none' }}>
            <ellipse cx="72" cy="42" rx="26" ry="14" fill="white"/>
            <ellipse cx="55" cy="48" rx="17" ry="12" fill="white"/>
            <ellipse cx="89" cy="48" rx="17" ry="11" fill="white"/>
          </g>
          {/* Cloud 2 */}
          <g style={{ opacity: show?1:0, transition: show?'opacity 0.5s ease 0.6s':'none' }}>
            <ellipse cx="166" cy="28" rx="20" ry="11" fill="white" opacity="0.9"/>
            <ellipse cx="151" cy="33" rx="13" ry="9"  fill="white" opacity="0.9"/>
            <ellipse cx="181" cy="33" rx="13" ry="9"  fill="white" opacity="0.9"/>
          </g>

          {/* Rain drops from cloud 1 */}
          {[[65,66],[74,72],[82,66],[58,72],[90,72]].map(([x,y],i) => (
            <line key={i} x1={x} y1={y} x2={x-3} y2={y+11} stroke="#93c5fd" strokeWidth="1.8" strokeLinecap="round"
              style={{ opacity: show?0.85:0, transition: show?`opacity 0.3s ease ${0.85+i*0.06}s`:'none' }}/>
          ))}

          {/* Evaporation arrows */}
          {[[108,122],[140,118],[172,122]].map(([x,y],i) => (
            <path key={i} d={`M${x},${y} C${x-4},${y-9} ${x+4},${y-15} ${x},${y-23}`}
              fill="none" stroke="rgba(147,197,253,0.75)" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="3 2.5"
              style={{ opacity: show?1:0, transition: show?`opacity 0.4s ease ${1.0+i*0.08}s`:'none' }}/>
          ))}

          {/* Labels */}
          {[
            { x:232, y:12,  t:'Sun',        c:'#92400e' },
            { x:140, y:148, t:'Ocean',      c:'#1e40af' },
            { x:72,  y:96,  t:'Rainfall',   c:'#1e40af' },
            { x:140, y:108, t:'Evaporation',c:'#065f46' },
          ].map(l => (
            <text key={l.t} x={l.x} y={l.y} textAnchor="middle" fontSize="8" fontWeight="700" fill={l.c} fontFamily="Roboto,sans-serif"
              style={{ opacity: show?1:0, transition: show?'opacity 0.4s ease 1.25s':'none' }}>{l.t}</text>
          ))}
        </svg>
      </div>
    </div>
  )
}

function MMGraphDemo() {
  const FORMULA = 'sin(x) · 1.5'
  const [typed, setTyped] = React.useState(0)
  React.useEffect(() => {
    let i = 0
    const id = setInterval(() => { i++; setTyped(i); if (i >= FORMULA.length) clearInterval(id) }, 70)
    return () => clearInterval(id)
  }, [])
  const done = typed >= FORMULA.length
  const fStr = FORMULA.slice(0, typed)
  return (
    <div style={{ display:'flex', flexDirection:'column', flex:1 }}>
      <div style={{ borderBottom:'1px solid #e5e7eb', padding:'10px 18px', display:'flex', flexDirection:'column', gap:7 }}>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <div style={{ width:9, height:9, borderRadius:'50%', background:'#34a853', flexShrink:0 }}/>
          <span style={{ fontSize:12, color:'#374151', fontFamily:"'Roboto Mono','Courier New',monospace", fontWeight:500 }}>f: y = 3x + 3</span>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <div style={{ width:9, height:9, borderRadius:'50%', background:'#4285f4', flexShrink:0 }}/>
          <span style={{ fontSize:12, color:'#374151', fontFamily:"'Roboto Mono','Courier New',monospace", fontWeight:500 }}>
            g(x) = {fStr}
            {!done && <span style={{ display:'inline-block', width:2, height:12, background:'#4285f4', marginLeft:1, verticalAlign:'middle', animation:'mmCursor 0.8s step-end infinite' }}/>}
          </span>
        </div>
      </div>
      <div style={{ flex:1 }}>
        <svg width="100%" viewBox={`0 0 ${_GW} ${_GH}`} style={{ display:'block' }}>
          {Array.from({length:13},(_,i)=><line key={`v${i}`} x1={(i/12)*_GW} y1={0} x2={(i/12)*_GW} y2={_GH} stroke="#f0f0f0" strokeWidth="0.5"/>)}
          {Array.from({length:9},(_,i)=><line key={`h${i}`} x1={0} y1={(i/8)*_GH} x2={_GW} y2={(i/8)*_GH} stroke="#f0f0f0" strokeWidth="0.5"/>)}
          <line x1={_CX} y1={0} x2={_CX} y2={_GH} stroke="#d1d5db" strokeWidth="1"/>
          <line x1={0} y1={_CY} x2={_GW} y2={_CY} stroke="#d1d5db" strokeWidth="1"/>
          {[-4,-2,2,4].map(n=><text key={`xl${n}`} x={_CX+n*_XS} y={_CY+9} textAnchor="middle" fontSize="6" fill="#9ca3af" fontFamily="Roboto,sans-serif">{n}</text>)}
          {[-2,2].map(n=><text key={`yl${n}`} x={_CX-5} y={_CY-n*_YS+2} textAnchor="end" fontSize="6" fill="#9ca3af" fontFamily="Roboto,sans-serif">{n}</text>)}
          <line x1={LINEAR_PTS.x1} y1={LINEAR_PTS.y1} x2={LINEAR_PTS.x2} y2={LINEAR_PTS.y2}
            stroke="#34a853" strokeWidth="1.8" strokeLinecap="round"
            strokeDasharray={300} strokeDashoffset={done?0:300}
            style={{transition:done?'stroke-dashoffset 0.9s ease 0.05s':'none'}}/>
          <text x={LINEAR_PTS.x2+4} y={10} fontSize="9" fill="#34a853" fontWeight="700" fontFamily="Roboto,sans-serif"
            style={{opacity:done?1:0,transition:done?'opacity 0.3s ease 0.9s':'none'}}>f</text>
          <path d={SINE_PATH} fill="none" stroke="#4285f4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
            strokeDasharray={SINE_LEN} strokeDashoffset={done?0:SINE_LEN}
            style={{transition:done?'stroke-dashoffset 1.4s ease 0.3s':'none'}}/>
          <text x={_CX+1.5*_XS+3} y={_CY-1.5*_YS-4} fontSize="9" fill="#4285f4" fontWeight="700" fontFamily="Roboto,sans-serif"
            style={{opacity:done?1:0,transition:done?'opacity 0.3s ease 1.7s':'none'}}>g</text>
        </svg>
      </div>
    </div>
  )
}

function MultimodalSection() {
  const [sectionRef, inView] = useInView(0.10)
  const [active, setActive]       = React.useState(0)
  const [progress, setProgress]   = React.useState(0)
  const [cycleCount, setCycleCount] = React.useState(0)
  const activeRef = React.useRef(0)
  const startRef  = React.useRef(0)
  const rafRef    = React.useRef<number | undefined>(undefined)
  const CYCLE = 4800

  // RAF-driven auto-cycle — starts when section scrolls into view
  React.useEffect(() => {
    if (!inView) return
    startRef.current = performance.now()
    const tick = (now: number) => {
      const elapsed = now - startRef.current
      setProgress(Math.min((elapsed / CYCLE) * 100, 100))
      if (elapsed >= CYCLE) {
        const next = (activeRef.current + 1) % 4
        activeRef.current = next
        setActive(next)
        setCycleCount(c => c + 1)
        startRef.current = now
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [inView])

  // Manual tab click — jumps to that modality and resets the cycle timer
  const handleTab = (i: number) => {
    activeRef.current = i
    setActive(i)
    setCycleCount(c => c + 1)
    startRef.current = performance.now()
    setProgress(0)
  }

  const activeM = MM_MODALITIES[active]

  return (
    <section ref={sectionRef} style={{ background:'#f8fafc', padding:'96px 0', borderTop:'1px solid #e8ecf2', borderBottom:'1px solid #e8ecf2' }}>
      <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 40px' }}>

        {/* Section header */}
        <div style={{
          opacity: inView?1:0, transform: inView?'translateY(0)':'translateY(20px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
          marginBottom: 52,
        }}>
          <p className="type-label" style={{ color:'#228DC1', marginBottom:12 }}>Multimodal AI</p>
          <h2 style={{ fontFamily:'Roboto,system-ui,sans-serif', fontWeight:700, fontSize:40, letterSpacing:'-0.02em', lineHeight:1.1, color:'#0a1628' }}>
            One AI. Every way <span style={{ color:'#228DC1' }}>students learn.</span>
          </h2>
          <p style={{ fontSize:17, color:'rgba(10,22,40,0.58)', lineHeight:1.75, marginTop:14, maxWidth:520 }}>
            Aruva speaks, writes, draws and graphs. Meeting every student exactly where their understanding breaks down, in whichever format makes it click.
          </p>
        </div>

        {/* Two-column: tabs left, demo right */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1.5fr', gap:40, alignItems:'start' }}>

          {/* LEFT — clickable modality tabs with progress bar */}
          <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
            {MM_MODALITIES.map((m, i) => {
              const isActive = active === i
              return (
                <button key={m.label} onClick={() => handleTab(i)} style={{
                  display:'flex', alignItems:'center', gap:14, padding:'15px 16px 15px 20px',
                  borderRadius:12,
                  border:`1.5px solid ${isActive ? m.color+'40' : '#e2e8f0'}`,
                  background: isActive ? m.color+'0d' : '#ffffff',
                  cursor:'pointer', textAlign:'left', position:'relative', overflow:'hidden',
                  boxShadow: isActive ? `0 2px 16px ${m.color}18` : '0 1px 4px rgba(10,22,40,0.04)',
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'translateX(0)' : 'translateX(-20px)',
                  transition: `opacity 0.5s ease ${0.08*i}s, transform 0.5s ease ${0.08*i}s, background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease`,
                }}>
                  {/* Left accent bar */}
                  <div style={{
                    position:'absolute', left:0, top:0, bottom:0, width:3,
                    background: isActive ? m.color : 'transparent',
                    transition:'background 0.3s ease', borderRadius:'4px 0 0 4px',
                  }}/>
                  {/* Icon tile */}
                  <div style={{
                    width:38, height:38, borderRadius:9, flexShrink:0,
                    background: isActive ? m.color+'18' : '#f1f5f9',
                    border:`1px solid ${isActive ? m.color+'35' : '#e2e8f0'}`,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    transition:'all 0.3s ease',
                  }}>
                    <FontAwesomeIcon icon={m.faIcon} style={{ width:15, height:15, color: isActive ? m.color : 'rgba(10,22,40,0.40)', transition:'color 0.3s ease' }}/>
                  </div>
                  {/* Label + description */}
                  <div style={{ flex:1, minWidth:0 }}>
                    <p style={{ fontSize:14, fontWeight:700, color: isActive?'#0a1628':'rgba(10,22,40,0.60)', lineHeight:1.1, marginBottom:2, transition:'color 0.3s ease' }}>{m.label}</p>
                    <p style={{ fontSize:12, color: isActive?'rgba(10,22,40,0.52)':'rgba(10,22,40,0.38)', lineHeight:1.3, transition:'color 0.3s ease' }}>{m.desc}</p>
                  </div>
                  {/* Chevron on active */}
                  {isActive && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink:0 }}>
                      <path d="M4 2l4 4-4 4" stroke={m.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                  {/* Auto-progress bar at bottom of active tab */}
                  {isActive && (
                    <div style={{ position:'absolute', bottom:0, left:0, right:0, height:2, background:m.color+'18' }}>
                      <div style={{ height:'100%', background:m.color, width:`${progress}%`, transition:'width 0.08s linear', borderRadius:1 }}/>
                    </div>
                  )}
                </button>
              )
            })}
          </div>

          {/* RIGHT — single large demo card, remounts on each modality change */}
          <div style={{
            borderRadius:20, overflow:'hidden',
            border:'1px solid #e2e8f0',
            background:'#ffffff',
            boxShadow:'0 8px 40px rgba(10,22,40,0.08), 0 0 0 1px rgba(10,22,40,0.03)',
            minHeight:420,
            display:'flex', flexDirection:'column',
            opacity: inView?1:0, transform: inView?'translateY(0)':'translateY(24px)',
            transition:'opacity 0.65s ease 0.15s, transform 0.65s ease 0.15s',
          }}>
            {/* Card header — updates smoothly on tab switch */}
            <div style={{
              padding:'14px 20px', borderBottom:'1px solid #f0f4f8',
              background:'#fafbfc', display:'flex', alignItems:'center', gap:12,
            }}>
              <div style={{
                width:36, height:36, borderRadius:9, flexShrink:0,
                background: activeM.color+'16', border:`1px solid ${activeM.color}35`,
                display:'flex', alignItems:'center', justifyContent:'center',
                transition:'all 0.35s ease',
              }}>
                <FontAwesomeIcon icon={activeM.faIcon} style={{ width:15, height:15, color: activeM.color, transition:'color 0.35s ease' }}/>
              </div>
              <div>
                <p style={{ fontSize:13, fontWeight:700, color:'#0a1628', lineHeight:1 }}>{activeM.label} Generation</p>
                <p style={{ fontSize:11, color:'rgba(10,22,40,0.45)', marginTop:3 }}>
                  {active===0?'Pythagorean Theorem narrated':active===1?'Algebra solution written':active===2?'Educational illustration generated':'Graphing calculator'}
                </p>
              </div>
              <div style={{ flex:1 }}/>
            </div>

            {/* Demo content — key forces remount so animations restart on each cycle */}
            <div key={`${active}-${cycleCount}`} style={{
              flex:1, display:'flex', flexDirection:'column',
              opacity:0, animation:'mmCardIn 0.4s ease forwards',
            }}>

              {/* ── Voice ── */}
              {active === 0 && (
                <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:22, padding:'32px 28px' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:2.5, height:80, width:'100%', justifyContent:'center' }}>
                    {MM_VOICE_BARS.map((h, i) => (
                      <div key={i} style={{
                        width:4, borderRadius:4,
                        height:`${h*100}%`,
                        background: i % 4 === 0
                          ? 'linear-gradient(180deg,#93c5fd,#228DC1)'
                          : i % 4 === 1
                          ? 'linear-gradient(180deg,#60c5f5,#0369a1)'
                          : i % 4 === 2
                          ? 'linear-gradient(180deg,#7dd3fc,#228DC1)'
                          : 'linear-gradient(180deg,#38bdf8,#0284c7)',
                        transformOrigin:'center',
                        animation:`waveBar ${0.4+h*0.7}s ease-in-out ${MM_VOICE_DELAYS[i]}s infinite`,
                      }}/>
                    ))}
                  </div>
                  <div style={{ width:56, height:56, background:'radial-gradient(circle at 38% 38%,#5bc8f5,#228DC1)', boxShadow:'0 0 28px rgba(34,141,193,0.45),0 0 60px rgba(34,141,193,0.18)', animation:'voiceOrbMorph 3.2s ease-in-out infinite, orbFloat 2.6s ease-in-out infinite' }}/>
                  <p style={{ fontSize:15, color:'rgba(10,22,40,0.62)', textAlign:'center', lineHeight:1.65, maxWidth:320, fontStyle:'italic' }}>
                    "In a right triangle, the square of the hypotenuse equals the sum of the squares of the other two sides."
                  </p>
                  <div style={{ display:'flex', alignItems:'center', gap:6, padding:'7px 16px', background:'rgba(34,141,193,0.08)', borderRadius:20, border:'1px solid rgba(34,141,193,0.20)' }}>
                    <div style={{ width:6, height:6, borderRadius:'50%', background:'#228DC1', animation:'mmCursor 1s ease-in-out infinite' }}/>
                    <span style={{ fontSize:11, fontWeight:600, color:'#228DC1' }}>AI Speaking</span>
                  </div>
                </div>
              )}

              {/* ── Text ── */}
              {active === 1 && (
                <div style={{ flex:1, display:'flex', flexDirection:'column', justifyContent:'center', gap:13, padding:'32px 36px' }}>
                  <p style={{ fontSize:12, color:'rgba(10,22,40,0.42)', fontWeight:600, marginBottom:4 }}>Solving: x² − 5x + 6 = 0</p>
                  {MM_STEPS.map((s, i) => (
                    <div key={s.label} style={{
                      display:'flex', alignItems:'center', gap:10,
                      opacity:0, transform:'translateY(6px)',
                      animation:`mmCardIn 0.36s ease ${0.12+i*0.22}s forwards`,
                    }}>
                      <span style={{ fontSize:9, fontWeight:700, color:'#7c3aed', letterSpacing:'0.10em', textTransform:'uppercase', minWidth:44, flexShrink:0 }}>{s.label}</span>
                      <span style={{ fontSize:13, fontFamily:"'Roboto Mono','Courier New',monospace", color:'#1e1b4b', background:'rgba(124,58,237,0.07)', padding:'6px 12px', borderRadius:6, border:'1px solid rgba(124,58,237,0.16)', flex:1 }}>{s.val}</span>
                    </div>
                  ))}
                  <div style={{ display:'flex', alignItems:'center', gap:6, marginTop:6 }}>
                    <div style={{ width:2, height:16, background:'#7c3aed', borderRadius:1, animation:'mmCursor 1s step-end infinite' }}/>
                    <span style={{ fontSize:11, color:'rgba(10,22,40,0.38)' }}>AI solving step by step…</span>
                  </div>
                </div>
              )}

              {/* ── Image ── */}
              {active === 2 && <MMImageDemo />}

              {/* ── Graph ── */}
              {active === 3 && <MMGraphDemo />}

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

function BloomInsightSection() {
  const [sectionRef, inView] = useInView(0.12)
  const [activeTab, setActiveTab] = React.useState(0)          // 0 = Bloom, 1 = DOK
  const [active, setActive]   = React.useState(0)
  const [timerPct, setTimerPct] = React.useState(0)
  const [disp, setDisp]       = React.useState<number[]>([...BLOOM_SEMS[0].bloom])
  const rafRef   = React.useRef<number|undefined>(undefined)
  const morphRef = React.useRef<number|undefined>(undefined)
  const startRef = React.useRef(0)
  const activeRef = React.useRef(0)
  const liveBloom = React.useRef<number[]>([...BLOOM_SEMS[0].bloom])
  const CYCLE = 5000

  // Smooth radar morph via RAF lerp
  const morphTo = React.useCallback((from: number[], to: number[]) => {
    if (morphRef.current) cancelAnimationFrame(morphRef.current)
    const t0 = performance.now()
    const D  = 800
    const step = (now: number) => {
      const t = Math.min((now - t0) / D, 1)
      const e = 1 - Math.pow(1 - t, 3)           // ease-out cubic
      const cur = from.map((f, i) => f + (to[i] - f) * e)
      liveBloom.current = cur
      setDisp([...cur])
      if (t < 1) morphRef.current = requestAnimationFrame(step)
    }
    morphRef.current = requestAnimationFrame(step)
  }, [])

  // Auto-cycle timer
  const runLoop = React.useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    startRef.current = performance.now()
    const tick = (now: number) => {
      const elapsed = now - startRef.current
      setTimerPct(Math.min((elapsed / CYCLE) * 100, 100))
      if (elapsed >= CYCLE) {
        const next = (activeRef.current + 1) % 3
        morphTo([...liveBloom.current], BLOOM_SEMS[next].bloom)
        activeRef.current = next
        setActive(next)
        startRef.current = now
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
  }, [morphTo])

  React.useEffect(() => {
    if (!inView) return
    runLoop()
    return () => {
      if (rafRef.current)  cancelAnimationFrame(rafRef.current)
      if (morphRef.current) cancelAnimationFrame(morphRef.current)
    }
  }, [inView, runLoop])

  const pick = (i: number) => {
    if (i === activeRef.current) return
    morphTo([...liveBloom.current], BLOOM_SEMS[i].bloom)
    activeRef.current = i; setActive(i); setTimerPct(0); runLoop()
  }

  const sem = BLOOM_SEMS[active]

  // DOK state (independent from Bloom)
  const [dokActive, setDokActive] = React.useState(0)
  const [dokDisp, setDokDisp]     = React.useState<number[]>([...DOK_SEMS[0].dok])
  const [dokTimerPct, setDokTimerPct] = React.useState(0)
  const dokLive    = React.useRef<number[]>([...DOK_SEMS[0].dok])
  const dokRaf     = React.useRef<number|undefined>(undefined)
  const dokMorphRef= React.useRef<number|undefined>(undefined)
  const dokStart   = React.useRef(0)
  const dokActiveRef = React.useRef(0)

  const dokMorphTo = React.useCallback((from: number[], to: number[]) => {
    if (dokMorphRef.current) cancelAnimationFrame(dokMorphRef.current)
    const t0 = performance.now()
    const step = (now: number) => {
      const t = Math.min((now - t0) / 800, 1)
      const e = 1 - Math.pow(1 - t, 3)
      const cur = from.map((f, i) => f + (to[i] - f) * e)
      dokLive.current = cur; setDokDisp([...cur])
      if (t < 1) dokMorphRef.current = requestAnimationFrame(step)
    }
    dokMorphRef.current = requestAnimationFrame(step)
  }, [])

  const dokRunLoop = React.useCallback(() => {
    if (dokRaf.current) cancelAnimationFrame(dokRaf.current)
    dokStart.current = performance.now()
    const tick = (now: number) => {
      const elapsed = now - dokStart.current
      setDokTimerPct(Math.min((elapsed / 5000) * 100, 100))
      if (elapsed >= 5000) {
        const next = (dokActiveRef.current + 1) % 3
        dokMorphTo([...dokLive.current], DOK_SEMS[next].dok)
        dokActiveRef.current = next; setDokActive(next); dokStart.current = now
      }
      dokRaf.current = requestAnimationFrame(tick)
    }
    dokRaf.current = requestAnimationFrame(tick)
  }, [dokMorphTo])

  React.useEffect(() => {
    if (!inView || activeTab !== 1) return
    dokRunLoop()
    return () => {
      if (dokRaf.current) cancelAnimationFrame(dokRaf.current)
      if (dokMorphRef.current) cancelAnimationFrame(dokMorphRef.current)
    }
  }, [inView, activeTab, dokRunLoop])

  const pickDok = (i: number) => {
    if (i === dokActiveRef.current) return
    dokMorphTo([...dokLive.current], DOK_SEMS[i].dok)
    dokActiveRef.current = i; setDokActive(i); setDokTimerPct(0); dokRunLoop()
  }
  const dokSem = DOK_SEMS[dokActive]

  // Radar geometry — 300×300 viewBox with generous label clearance
  const CX = 150, CY = 150, R = 98
  const ang  = (i: number) => (i * 60 - 90) * Math.PI / 180
  const pt   = (i: number, v: number) => ({ x: CX + (v/100)*R*Math.cos(ang(i)), y: CY + (v/100)*R*Math.sin(ang(i)) })
  const lab  = (i: number) => ({ x: CX + 128*Math.cos(ang(i)), y: CY + 128*Math.sin(ang(i)) })
  const poly = (vals: number[]) => vals.map((v,i) => `${pt(i,v).x},${pt(i,v).y}`).join(' ')

  return (
    <section ref={sectionRef} className="py-28 bg-[#f8fafc] border-t border-gray-100">
      <style>{`
        @keyframes fadeUp     { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        @keyframes barGrow    { from{transform:scaleX(0);transform-origin:left} to{transform:scaleX(1)} }
        @keyframes pulseRing  { 0%,100%{opacity:0.3;transform:scale(1)} 50%{opacity:0;transform:scale(1.9)} }
        @keyframes semSlide   { from{opacity:0;transform:translateX(-8px)} to{opacity:1;transform:translateX(0)} }
        @keyframes chipPop    { from{opacity:0;transform:scale(0.82) translateY(4px)} to{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes panelEnter { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        @keyframes cardEnter  { from{opacity:0;transform:translateX(-12px)} to{opacity:1;transform:translateX(0)} }
        @keyframes countUp    { from{opacity:0;transform:scale(0.88)} to{opacity:1;transform:scale(1)} }
        .tab-panel-enter { animation: panelEnter 0.45s cubic-bezier(0.22,1,0.36,1) both; }
        .chip-enter      { animation: chipPop   0.35s cubic-bezier(0.34,1.56,0.64,1) both; }
        .count-enter     { animation: countUp   0.5s  cubic-bezier(0.22,1,0.36,1)  both; }
      `}</style>

      <div className="max-w-7xl mx-auto px-8 lg:px-12">

        {/* Header */}
        <div className="max-w-3xl mb-10" style={{ animation: 'fadeUp 0.6s ease both' }}>
          <p className="type-label text-[#228DC1] mb-4">Learning Intelligence</p>
          <h2 className="font-heading text-[#0a1628] mb-5">
            One student.<br />Three semesters. One clear picture.
          </h2>
          <p className="text-[#0a1628]/60 text-[18px] font-normal leading-[1.75]">
            Maria's grade climbed from 62% to 81% over three semesters.
            Aruva shows exactly why — and which skill gap was holding her back.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex gap-2 mb-10">
          {[
            { label: "Bloom's Taxonomy", icon: '🎯' },
            { label: 'Depth of Knowledge', icon: '🔍' },
          ].map((tab, i) => (
            <button key={i} onClick={() => setActiveTab(i)}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-[14px] font-semibold active:scale-95 ${
                activeTab === i
                  ? 'bg-[#228DC1] text-white shadow-[0_4px_14px_rgba(34,141,193,0.3)] scale-[1.02]'
                  : 'bg-white border border-gray-200 text-[#0a1628]/60 hover:border-[#228DC1]/40 hover:text-[#228DC1] hover:scale-[1.02] hover:shadow-sm'
              }`}
              style={{ transition: 'all 0.22s cubic-bezier(0.34,1.56,0.64,1)' }}>
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── Bloom panel ── */}
        {activeTab === 0 && (
        <div className="grid lg:grid-cols-[300px_1fr] gap-6 mb-16 items-stretch tab-panel-enter">

          {/* LEFT — semester journey cards */}
          <div className="flex flex-col gap-3">
            {BLOOM_SEMS.map((s, i) => (
              <button key={s.id} onClick={() => pick(i)}
                className="text-left rounded-2xl border transition-all duration-300 relative overflow-hidden"
                style={active === i
                  ? { background:'#fff', borderColor: s.accent + '35', boxShadow: `0 6px 24px ${s.accent}14`, padding: '20px 20px 18px' }
                  : { background:'rgba(255,255,255,0.5)', borderColor:'rgba(10,22,40,0.07)', padding: '18px 20px' }
                }>
                <div className="absolute left-0 top-4 bottom-4 w-[3px] rounded-r-full transition-all duration-300"
                  style={{ background: active === i ? s.accent : 'transparent' }} />
                <div className="pl-3">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-[11px] font-black uppercase tracking-[0.18em] mb-1"
                        style={{ color: active === i ? s.accent : 'rgba(10,22,40,0.3)' }}>
                        {s.id} · {s.label}
                      </p>
                      <p className="text-[16px] font-semibold text-[#0a1628] leading-snug"
                        style={{ opacity: active === i ? 1 : 0.5 }}>
                        {s.headline.split(' ').slice(0,3).join(' ')}…
                      </p>
                    </div>
                    <div className="text-right shrink-0 ml-3">
                      <p className="text-[28px] font-black leading-none tabular-nums"
                        style={{ color: active === i ? s.accent : 'rgba(10,22,40,0.35)' }}>
                        {s.grade}%
                      </p>
                      <p className="text-[13px] font-bold mt-0.5"
                        style={{ color: active === i ? s.accent : 'rgba(10,22,40,0.25)' }}>
                        {s.gradeLabel}
                      </p>
                    </div>
                  </div>
                  <div className="h-[5px] bg-gray-100 rounded-full overflow-hidden mb-2">
                    <div className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${s.grade}%`, background: active === i ? s.accent : 'rgba(10,22,40,0.12)' }} />
                  </div>
                  {s.delta
                    ? <p className="text-[13px] font-bold" style={{ color: s.accent }}>{s.delta} from S1</p>
                    : <p className="text-[13px] text-[#0a1628]/30">Baseline</p>}
                </div>
                {active === i && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: s.accent + '10' }}>
                    <div className="h-full" style={{ width: `${timerPct}%`, background: s.accent + '45', transition:'none' }} />
                  </div>
                )}
              </button>
            ))}
            <div className="mt-1 rounded-xl bg-white border border-gray-200 px-5 py-4">
              <p className="text-[13px] font-semibold text-[#0a1628]/50 leading-relaxed">
                Evaluate was the bottleneck in S1. Targeted support in S2 drove the breakthrough.
              </p>
            </div>
          </div>

          {/* RIGHT — Bloom profile card */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-[0_2px_20px_rgba(10,22,40,0.05)] p-8 flex flex-col">

            {/* Card header */}
            <div className="flex items-start justify-between mb-7">
              <div>
                <p className="text-[12px] font-black uppercase tracking-[0.18em] mb-1.5" style={{ color: sem.accent }}>{sem.label}</p>
                <p className="text-[20px] font-semibold text-[#0a1628] leading-snug">{sem.headline}</p>
              </div>
              <div className="shrink-0 ml-4 text-right">
                <p className="text-[40px] font-black leading-none tabular-nums" style={{ color: sem.accent }}>{sem.grade}%</p>
                <p className="text-[15px] font-bold" style={{ color: sem.accent + 'cc' }}>{sem.gradeLabel}</p>
              </div>
            </div>

            {/* Radar + bars */}
            <div className="flex gap-8 items-start flex-1 mb-7">

              {/* Radar */}
              <div className="w-[230px] shrink-0">
                <svg viewBox="0 0 300 300" className="w-full overflow-visible">
                  <defs>
                    <filter id="rglow" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="4.5" result="b"/>
                      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                    </filter>
                    <radialGradient id={`rfill-${active}`} cx="50%" cy="50%" r="50%">
                      <stop offset="0%"   stopColor={sem.accent} stopOpacity="0.22"/>
                      <stop offset="100%" stopColor={sem.accent} stopOpacity="0.04"/>
                    </radialGradient>
                  </defs>

                  {/* Grid rings */}
                  {[33, 66, 100].map(pct => (
                    <polygon key={pct}
                      points={BLOOM_LABELS.map((_,i) => `${pt(i,pct).x},${pt(i,pct).y}`).join(' ')}
                      fill={pct===33 ? sem.accent+'03' : 'none'}
                      stroke={pct===100 ? 'rgba(10,22,40,0.12)' : 'rgba(10,22,40,0.06)'}
                      strokeWidth={pct===100 ? 1.5 : 1}
                      strokeDasharray={pct===66 ? '4 4' : 'none'}
                    />
                  ))}
                  {/* Spokes */}
                  {BLOOM_LABELS.map((_,i) => (
                    <line key={i} x1={CX} y1={CY} x2={pt(i,100).x} y2={pt(i,100).y}
                      stroke="rgba(10,22,40,0.06)" strokeWidth="1" />
                  ))}

                  {/* Cohort average — dashed grey polygon */}
                  <polygon points={poly(sem.cohortAvg)} fill="rgba(10,22,40,0.04)"
                    stroke="rgba(10,22,40,0.25)" strokeWidth="1.5" strokeDasharray="5 3"
                    strokeLinejoin="round" />

                  {/* Student filled area */}
                  <polygon points={poly(disp)} fill={`url(#rfill-${active})`} stroke="none" />
                  <polygon points={poly(disp)} fill="none"
                    stroke={sem.accent} strokeWidth="3" strokeLinejoin="round"
                    filter="url(#rglow)" />

                  {/* Pulse rings + dots */}
                  {disp.map((v,i) => (
                    <g key={i}>
                      <circle cx={pt(i,v).x} cy={pt(i,v).y} r="13" fill={sem.accent} opacity="0"
                        style={{ animation: `pulseRing 2.4s ease ${i*0.22}s infinite` }} />
                      <circle cx={pt(i,v).x} cy={pt(i,v).y} r="5.5"
                        fill={sem.accent} stroke="white" strokeWidth="3" />
                    </g>
                  ))}

                  {/* Axis labels */}
                  {BLOOM_LABELS.map((label, i) => {
                    const p   = lab(i)
                    const val = Math.round(disp[i])
                    const isMax = val === Math.round(Math.max(...disp))
                    const isMin = val === Math.round(Math.min(...disp))
                    return (
                      <g key={label}>
                        <text x={p.x} y={p.y - 8} textAnchor="middle" dominantBaseline="middle"
                          fontSize="12.5" fontFamily="system-ui,sans-serif"
                          fontWeight={isMax ? '700' : '500'}
                          fill={isMax ? sem.accent : isMin ? '#d97706' : 'rgba(10,22,40,0.5)'}>
                          {label}
                        </text>
                        <text x={p.x} y={p.y + 8} textAnchor="middle" dominantBaseline="middle"
                          fontSize="11.5" fontFamily="system-ui,sans-serif" fontWeight="700"
                          fill={isMax ? sem.accent : isMin ? '#d97706cc' : 'rgba(10,22,40,0.3)'}>
                          {val}%
                        </text>
                      </g>
                    )
                  })}
                </svg>

                {/* Legend */}
                <div className="flex items-center justify-center gap-4 mt-2">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full shrink-0" style={{ background: sem.accent }} />
                    <span className="text-[11px] font-semibold text-[#0a1628]/60">Maria</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <svg width="16" height="3" viewBox="0 0 16 3"><line x1="0" y1="1.5" x2="16" y2="1.5" stroke="rgba(10,22,40,0.35)" strokeWidth="1.5" strokeDasharray="4 2.5"/></svg>
                    <span className="text-[11px] font-semibold text-[#0a1628]/45">Class avg</span>
                  </div>
                </div>
              </div>

              {/* Bloom bars */}
              <div className="flex-1 space-y-4">
                {BLOOM_LABELS.map((label, i) => {
                  const val   = Math.round(disp[i])
                  const isTop = Math.round(disp[i]) === Math.round(Math.max(...disp))
                  const isLow = Math.round(disp[i]) === Math.round(Math.min(...disp))
                  const cavg  = Math.round(sem.cohortAvg[i])
                  return (
                    <div key={label}>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[15px] font-semibold"
                            style={{ color: isTop ? sem.accent : isLow ? '#d97706' : 'rgba(10,22,40,0.75)' }}>
                            {label}
                          </span>
                          <span className="text-[13px] text-[#0a1628]/35 hidden sm:inline">{BLOOM_SIMPLE[i]}</span>
                          {isTop && <span className="text-[11px] font-black uppercase tracking-wide px-2 py-0.5 rounded-md"
                            style={{ background: sem.accent + '15', color: sem.accent }}>top</span>}
                          {isLow && <span className="text-[11px] font-black uppercase tracking-wide px-2 py-0.5 rounded-md bg-[#fef3c7] text-[#b45309]">gap</span>}
                        </div>
                        <span className="text-[16px] font-black tabular-nums shrink-0 ml-3"
                          style={{ color: isLow ? '#d97706' : sem.accent }}>
                          {val}%
                        </span>
                      </div>
                      <div className="relative h-[8px] bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full"
                          style={{
                            width: `${val}%`,
                            background: isLow
                              ? 'linear-gradient(90deg,#f59e0b,#fbbf24)'
                              : `linear-gradient(90deg,${sem.accent},${sem.accent}99)`,
                            boxShadow: isTop ? `0 0 10px ${sem.accent}55` : 'none',
                            transition: 'width 0.75s cubic-bezier(0.34,1.1,0.64,1)',
                          }} />
                        {/* Class avg marker */}
                        <div className="absolute top-0 bottom-0 w-[2px] rounded-full"
                          style={{ left: `${cavg}%`, background: 'rgba(10,22,40,0.30)' }} />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Insight strip */}
            <div className="rounded-xl p-5 border transition-colors duration-300"
              style={{ background: sem.accent + '07', borderColor: sem.accent + '20' }}>
              <p className="text-[17px] font-semibold text-[#0a1628] mb-1.5 leading-snug">{sem.headline}</p>
              <p className="text-[15px] text-[#0a1628]/55 leading-relaxed">{sem.detail}</p>
            </div>
          </div>
        </div>
        )} {/* end Bloom panel */}

        {/* ── DOK panel ── */}
        {activeTab === 1 && (
        <div className="grid lg:grid-cols-[300px_1fr] gap-6 mb-16 items-stretch tab-panel-enter">

          {/* LEFT — DOK semester cards */}
          <div className="flex flex-col gap-3">
            {DOK_SEMS.map((s, i) => (
              <button key={s.id} onClick={() => pickDok(i)}
                className="text-left rounded-2xl border transition-all duration-300 relative overflow-hidden"
                style={dokActive === i
                  ? { background:'#fff', borderColor: s.accent + '35', boxShadow: `0 6px 24px ${s.accent}14`, padding: '20px 20px 18px' }
                  : { background:'rgba(255,255,255,0.5)', borderColor:'rgba(10,22,40,0.07)', padding: '18px 20px' }
                }>
                <div className="absolute left-0 top-4 bottom-4 w-[3px] rounded-r-full transition-all duration-300"
                  style={{ background: dokActive === i ? s.accent : 'transparent' }} />
                <div className="pl-3">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-[11px] font-black uppercase tracking-[0.18em] mb-1"
                        style={{ color: dokActive === i ? s.accent : 'rgba(10,22,40,0.3)' }}>
                        {s.id} · {s.label}
                      </p>
                      <p className="text-[16px] font-semibold text-[#0a1628] leading-snug"
                        style={{ opacity: dokActive === i ? 1 : 0.5 }}>
                        {s.headline.split(' ').slice(0,3).join(' ')}…
                      </p>
                    </div>
                    <div className="text-right shrink-0 ml-3">
                      <p className="text-[28px] font-black leading-none tabular-nums"
                        style={{ color: dokActive === i ? s.accent : 'rgba(10,22,40,0.35)' }}>
                        {s.grade}%
                      </p>
                      <p className="text-[13px] font-bold mt-0.5"
                        style={{ color: dokActive === i ? s.accent : 'rgba(10,22,40,0.25)' }}>
                        {s.gradeLabel}
                      </p>
                    </div>
                  </div>
                  <div className="h-[5px] bg-gray-100 rounded-full overflow-hidden mb-2">
                    <div className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${s.grade}%`, background: dokActive === i ? s.accent : 'rgba(10,22,40,0.12)' }} />
                  </div>
                  {s.delta
                    ? <p className="text-[13px] font-bold" style={{ color: s.accent }}>{s.delta} from S1</p>
                    : <p className="text-[13px] text-[#0a1628]/30">Baseline</p>}
                </div>
                {dokActive === i && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: s.accent + '10' }}>
                    <div className="h-full" style={{ width: `${dokTimerPct}%`, background: s.accent + '45', transition:'none' }} />
                  </div>
                )}
              </button>
            ))}
            <div className="mt-1 rounded-xl bg-white border border-gray-200 px-5 py-4">
              <p className="text-[13px] font-semibold text-[#0a1628]/50 leading-relaxed">
                DOK 3 was the ceiling in S1. Structured reasoning tasks in S2 unlocked the breakthrough.
              </p>
            </div>
          </div>

          {/* RIGHT — DOK profile card */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-[0_2px_20px_rgba(10,22,40,0.05)] p-8 flex flex-col">
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-[12px] font-black uppercase tracking-[0.18em] mb-1.5" style={{ color: dokSem.accent }}>{dokSem.label}</p>
                <p className="text-[20px] font-semibold text-[#0a1628] leading-snug">{dokSem.headline}</p>
              </div>
              <div className="shrink-0 ml-4 text-right">
                <p className="text-[40px] font-black leading-none tabular-nums" style={{ color: dokSem.accent }}>{dokSem.grade}%</p>
                <p className="text-[15px] font-bold" style={{ color: dokSem.accent + 'cc' }}>{dokSem.gradeLabel}</p>
              </div>
            </div>

            <div className="flex-1 space-y-5 mb-7">
              {DOK_LABELS.map((label, i) => {
                const val   = Math.round(dokDisp[i])
                const isTop = val === Math.round(Math.max(...dokDisp))
                const isLow = val === Math.round(Math.min(...dokDisp))
                const cavg  = Math.round(dokSem.cohortAvg[i])
                return (
                  <div key={label}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex flex-col gap-0.5">
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-md text-[11px] font-black text-white"
                            style={{ background: DOK_COLORS[i] }}>{i+1}</span>
                          <span className="text-[15px] font-semibold" style={{ color: isLow ? '#d97706' : 'rgba(10,22,40,0.8)' }}>
                            {DOK_NAMES[i]}
                          </span>
                          {isTop && <span className="text-[11px] font-black uppercase tracking-wide px-2 py-0.5 rounded-md"
                            style={{ background: dokSem.accent + '15', color: dokSem.accent }}>top</span>}
                          {isLow && <span className="text-[11px] font-black uppercase tracking-wide px-2 py-0.5 rounded-md bg-[#fef3c7] text-[#b45309]">gap</span>}
                        </div>
                        <p className="text-[12px] font-medium pl-8" style={{ color: DOK_TEXT_COLORS[i] }}>{DOK_SIMPLE[i]}</p>
                      </div>
                      <span className="text-[16px] font-black tabular-nums shrink-0 ml-3"
                        style={{ color: isLow ? '#d97706' : DOK_COLORS[i] }}>
                        {val}%
                      </span>
                    </div>
                    <div className="relative h-[9px] bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full"
                        style={{
                          width: `${val}%`,
                          background: isLow
                            ? 'linear-gradient(90deg,#f59e0b,#fbbf24)'
                            : `linear-gradient(90deg,${DOK_COLORS[i]},${DOK_COLORS[i]}bb)`,
                          boxShadow: isTop ? `0 0 10px ${DOK_COLORS[i]}66` : 'none',
                          transition: 'width 0.75s cubic-bezier(0.34,1.1,0.64,1)',
                        }} />
                      {/* Class avg marker */}
                      <div className="absolute top-0 bottom-0 w-[2px] rounded-full"
                        style={{ left: `${cavg}%`, background: 'rgba(10,22,40,0.30)' }} />
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2 items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {DOK_KEYWORDS[i].slice(0,5).map(kw => (
                          <span key={kw} className="text-[11px] px-2 py-0.5 rounded-md font-semibold"
                            style={{ background: DOK_COLORS[i] + '18', color: DOK_TEXT_COLORS[i] }}>
                            {kw}
                          </span>
                        ))}
                      </div>
                      <p className="text-[11px] font-medium shrink-0 ml-2" style={{ color: 'rgba(10,22,40,0.35)' }}>
                        Class avg {cavg}%
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="rounded-xl p-5 border transition-colors duration-300"
              style={{ background: dokSem.accent + '07', borderColor: dokSem.accent + '20' }}>
              <p className="text-[17px] font-semibold text-[#0a1628] mb-1.5 leading-snug">{dokSem.headline}</p>
              <p className="text-[15px] text-[#0a1628]/55 leading-relaxed">{dokSem.detail}</p>
            </div>
          </div>
        </div>
        )} {/* end DOK panel */}

        {/* Stats strip */}
        <div className="grid sm:grid-cols-3 gap-px bg-gray-200 border border-gray-200 rounded-2xl overflow-hidden">
          {[
            { stat: '71%',   label: 'of students who feel unsure want clearer guidance on where to improve' },
            { stat: '68%',   label: 'of academics want earlier visibility into where learning is breaking down' },
            { stat: '62.5%', label: 'of students wanted clearer support before receiving their final grade' },
          ].map((item) => (
            <div key={item.stat} className="bg-white px-8 py-10 hover:bg-[#faf7f2] transition-colors">
              <p className="font-heading text-[#228DC1] mb-2"
                style={{ fontSize: 'clamp(32px,3vw,48px)', letterSpacing: '-0.03em' }}>
                {item.stat}
              </p>
              <p className="text-[#0a1628]/55 text-[15px] font-normal leading-relaxed">{item.label}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

// -- Principles ----------------------------------------------------------------
function PrinciplesSection() {
  const [ref, inView] = useInView(0.08)
  return (
    <section className="py-24 bg-[#f8fafc] border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        <div className="mb-14">
          <p className="type-label text-[#228DC1] mb-4">Our Principles</p>
          <h2 className="font-heading text-[#0a1628] mb-3">Four foundations every decision is built on</h2>
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

// -- Pillars -------------------------------------------------------------------
function PillarsSection() {
  const [ref, inView] = useInView(0.08)
  return (
    <section className="py-24 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        <div className="mb-14">
          <p className="type-label text-[#228DC1] mb-4">Platform</p>
          <h2 className="font-heading text-[#0a1628] mb-4">Six pillars, one learning loop</h2>
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

// -- Audience ------------------------------------------------------------------
function AudienceSection() {
  const [ref, inView] = useInView(0.08)
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        <div className="mb-14">
          <p className="type-label text-[#228DC1] mb-4">Who It's For</p>
          <h2 className="font-heading text-[#0a1628]">Built for every layer of the institution</h2>
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

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#f8fafc] pt-32 pb-20">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(circle at 65% 20%, rgba(34,141,193,0.18) 0, transparent 50%), radial-gradient(circle at 10% 80%, rgba(5,150,105,0.07) 0, transparent 40%)' }} />
        <div className="relative max-w-7xl mx-auto px-8 lg:px-12">
          <p className="font-black text-[#228DC1] mb-3" style={{ fontSize: '13px', letterSpacing: '0.28em', textTransform: 'uppercase', opacity: 0.6 }}>
            Aruva · AI for Education
          </p>
          <h1 className="font-serif-display text-[#0a1628] leading-[1.02] mb-6 max-w-4xl">
            AI native learning.<br />
            <span style={{ color: '#228DC1' }}>Professor guided.</span><br />
            Built around every student.
          </h1>
          <p className="text-[#0a1628]/65 text-[18px] font-normal leading-[1.7] max-w-2xl mb-10">
            An AI teaching and formative assessment platform for higher education. Personalised, governed and guided entirely by educator intent.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#228DC1] text-white text-[13px] font-semibold hover:bg-[#1a6e99] transition-colors">
              Request a Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="bg-[#f8fafc] border-y border-gray-100 py-3.5 overflow-hidden">
        <div className="flex gap-10 animate-[marquee_35s_linear_infinite] whitespace-nowrap w-max">
          {[
            'Russell Group Universities','Teaching and Learning Teams','Academic Quality Officers',
            'Professors and Lecturers','UK Higher Education','Digital Transformation Teams',
            'IT and Data Governance','Student Experience Teams','Russell Group Universities',
            'Teaching and Learning Teams','Academic Quality Officers','Professors and Lecturers',
          ].map((item, i) => (
            <span key={i} className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#0a1628]/65 flex items-center gap-10">
              {item}<span className="w-1 h-1 rounded-full bg-[#0a1628]/25" />
            </span>
          ))}
        </div>
      </div>

      {/* Platform Architecture */}
      <PlatformDiagram />

      {/* How It Works */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="mb-20">
            <p className="type-label text-[#228DC1] mb-4">How It Works</p>
            <h2 className="font-heading text-[#0a1628] mb-4">From syllabus to intelligent tutor in hours</h2>
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
                    <div className={isEven ? 'lg:order-2' : ''}>
                      <div className="flex items-center gap-3 mb-5">
                        <span className="font-black tabular-nums text-[#228DC1] text-sm">{step.num}</span>
                        <div className="h-px flex-1 bg-gray-100 max-w-8" />
                      </div>
                      <h3 className="font-semibold text-[#0a1628] mb-4" style={{ fontSize: '20px', lineHeight: 1.1 }}>{step.label}</h3>
                      <p className="text-[#0a1628]/65 text-[16px] font-normal leading-relaxed">{step.desc}</p>
                    </div>
                    <div className={isEven ? 'lg:order-1' : ''}><Visual /></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Multimodal */}
      <MultimodalSection />

      {/* Four principles */}
      <PrinciplesSection />

      {/* Platform pillars */}
      <PillarsSection />

      {/* Who it's for */}
      <AudienceSection />

      {/* Bloom + DOK */}
      <BloomInsightSection />

      {/* Governance */}
      <section className="py-20 bg-[#f8fafc] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="type-label text-[#228DC1] mb-4">Governance and Trust</p>
              <h2 className="font-heading text-[#0a1628] mb-5">AI that institutions can govern.</h2>
              <p className="text-[#0a1628]/65 text-base font-normal leading-relaxed">
                Built for the real requirements of higher education: data residency, audit trails, role-based access and full control over how AI behaves.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-px bg-gray-200 border border-gray-200">
              {[
                { label: 'Data Residency',     desc: 'Cloud, hybrid or on-prem.' },
                { label: 'Audit Trail',         desc: 'Every interaction traceable.' },
                { label: 'Access Control',      desc: 'Role-based, institution-wide.' },
                { label: 'Academic Integrity',  desc: 'Socratic AI, no shortcuts.' },
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

      {/* Pilot CTA */}
      <section className="py-16 bg-[#f8fafc] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-8 lg:px-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <div>
            <p className="text-[#0a1628] font-semibold text-[16px] mb-1">Start with a focused course pilot.</p>
            <p className="text-[#0a1628]/65 text-sm font-normal">
              Select 2 to 3 courses, connect your LMS and measure value before scaling across departments.
            </p>
          </div>
          <Link to="/contact"
            className="shrink-0 inline-flex items-center gap-2 px-7 py-3.5 border border-[#228DC1] text-[#228DC1] text-[13px] font-semibold hover:bg-[#228DC1] hover:text-white transition-all">
            Request a Demo <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <CTASection />
    </>
  )
}