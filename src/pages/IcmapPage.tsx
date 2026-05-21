import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MapContainer, TileLayer, Polygon, useMap } from 'react-leaflet'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faCircleCheck, faMap, faTowerBroadcast, faChartBar, faGlobe, faLayerGroup, faBullseye } from '@fortawesome/free-solid-svg-icons'
import CTASection from '@/components/CTASection'
import 'leaflet/dist/leaflet.css'
import type { LatLngExpression } from 'leaflet'

// -- Coverage zone data --------------------------------------------------------
type CoverageType = '5g-plus' | '5g' | '4g' | '3g' | 'gap'

interface CoverageZone {
  id: string
  type: CoverageType
  label: string
  positions: LatLngExpression[]
  signal: string
  population: string
  operator: string
}

const coverageZones: CoverageZone[] = [
  // 5G+ core � Manchester city centre
  {
    id: 'z1', type: '5g-plus', label: '5G+',
    signal: '-72 dBm', population: '28,400 residents', operator: 'All operators',
    positions: [
      [53.500, -2.265], [53.503, -2.210], [53.495, -2.175],
      [53.472, -2.168], [53.455, -2.200], [53.450, -2.255],
      [53.462, -2.300], [53.488, -2.310],
    ],
  },
  // 5G inner ring � inner Manchester suburbs
  {
    id: 'z2', type: '5g', label: '5G',
    signal: '-85 dBm', population: '15,600 residents', operator: 'EE / Vodafone / O2',
    positions: [
      [53.540, -2.350], [53.548, -2.200], [53.542, -2.110],
      [53.510, -2.065], [53.465, -2.058], [53.428, -2.095],
      [53.405, -2.200], [53.412, -2.345], [53.448, -2.405],
      [53.498, -2.408],
    ],
  },
  // 4G Greater Manchester ring
  {
    id: 'z3', type: '4g', label: '4G',
    signal: '-95 dBm', population: '8,100 residents', operator: 'EE / Three / O2',
    positions: [
      [53.610, -2.470], [53.625, -2.090], [53.580, -1.930],
      [53.495, -1.880], [53.395, -1.950], [53.340, -2.110],
      [53.358, -2.440], [53.432, -2.580], [53.540, -2.580],
    ],
  },
  // 3G � Wigan area
  {
    id: 'z4', type: '3g', label: '3G',
    signal: '-105 dBm', population: '2,400 residents', operator: 'Three only',
    positions: [
      [53.578, -2.660], [53.560, -2.560], [53.520, -2.555],
      [53.505, -2.640], [53.530, -2.710],
    ],
  },
  // 3G � Oldham / east side
  {
    id: 'z5', type: '3g', label: '3G',
    signal: '-108 dBm', population: '3,100 residents', operator: 'O2 only',
    positions: [
      [53.558, -2.060], [53.575, -1.990], [53.558, -1.930],
      [53.530, -1.920], [53.520, -1.990], [53.535, -2.060],
    ],
  },
  // Gap � Pennines east
  {
    id: 'z6', type: 'gap', label: 'No Coverage',
    signal: 'No signal', population: 'Underserved area', operator: 'None',
    positions: [
      [53.520, -1.840], [53.545, -1.760], [53.510, -1.720],
      [53.475, -1.750], [53.470, -1.840], [53.495, -1.880],
    ],
  },
  // Gap � rural north Lancashire
  {
    id: 'z7', type: 'gap', label: 'No Coverage',
    signal: 'No signal', population: 'Underserved area', operator: 'None',
    positions: [
      [53.648, -2.500], [53.670, -2.380], [53.648, -2.310],
      [53.620, -2.320], [53.612, -2.450],
    ],
  },
]

const zoneStyle: Record<CoverageType, { fill: string; stroke: string; label: string; textColor: string }> = {
  'gap':     { fill: '#ef4444', stroke: '#dc2626', label: 'No Coverage', textColor: '#ef4444' },
  '3g':      { fill: '#f59e0b', stroke: '#d97706', label: '3G',          textColor: '#d97706' },
  '4g':      { fill: '#7c3aed', stroke: '#6d28d9', label: '4G',          textColor: '#7c3aed' },
  '5g':      { fill: '#3b82f6', stroke: '#228DC1', label: '5G',          textColor: '#228DC1' },
  '5g-plus': { fill: '#1a6e99', stroke: '#1e3a8a', label: '5G+',         textColor: '#1a6e99' },
}

// Fit map to UK North bounds
function MapFit() {
  const map = useMap()
  map.fitBounds([[53.300, -2.700], [53.700, -1.700]], { padding: [20, 20] })
  return null
}

// -- Coverage map component ----------------------------------------------------
function CoverageMap() {
  const [activeLayer, setActiveLayer] = useState<string>('all')
  const [selected, setSelected] = useState<CoverageZone | null>(null)

  const isVisible = (type: CoverageType) => {
    if (activeLayer === 'all') return true
    if (activeLayer === '5g') return type === '5g' || type === '5g-plus'
    if (activeLayer === '4g') return type === '4g'
    if (activeLayer === '3g') return type === '3g'
    if (activeLayer === 'gaps') return type === 'gap'
    return true
  }

  const layerButtons = [
    { key: 'all',  label: 'All Layers' },
    { key: '5g',   label: '5G' },
    { key: '4g',   label: '4G' },
    { key: '3g',   label: '3G' },
    { key: 'gaps', label: 'Gaps' },
  ]

  const summaryBars = [
    { label: '5G+', pct: 22, color: '#1a6e99' },
    { label: '5G',  pct: 18, color: '#3b82f6' },
    { label: '4G',  pct: 28, color: '#7c3aed' },
    { label: '3G',  pct: 16, color: '#f59e0b' },
    { label: 'Gap', pct: 16, color: '#ef4444' },
  ]

  return (
    <div className="bg-white border border-gray-200 overflow-hidden shadow-[0_8px_48px_rgba(10,22,40,0.1)]">
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 px-4 py-3 bg-[#f3f4f6] border-b border-gray-200">
        <span className="w-2.5 h-2.5 rounded-full bg-[#fc5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <div className="flex-1 flex justify-center">
          <div className="bg-white border border-gray-200 px-3 py-1 text-[11px] text-gray-400" style={{ minWidth: '260px', textAlign: 'center' }}>
            app.icmap.awtg.co.uk/coverage/uk-north
          </div>
        </div>
        <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#059669]/70">Live</span>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100 bg-[#f8fafc]">
        <div className="flex items-center gap-0.5">
          {layerButtons.map((btn) => (
            <button
              key={btn.key}
              onClick={() => setActiveLayer(btn.key)}
              className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] transition-colors ${
                activeLayer === btn.key ? 'bg-[#228DC1] text-white' : 'text-[#0a1628]/60 hover:text-[#228DC1]'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4 text-[10px] text-[#0a1628]/65 font-medium">
          <span>Greater Manchester</span>
          <span>Updated: live</span>
        </div>
      </div>

      {/* Map + side panel */}
      <div className="flex divide-x divide-gray-100">
        {/* Leaflet map */}
        <div className="flex-1" style={{ minHeight: '360px' }}>
          <MapContainer
            style={{ height: '360px', width: '100%' }}
            center={[53.480, -2.240]}
            zoom={11}
            scrollWheelZoom={false}
            zoomControl={true}
            attributionControl={false}
          >
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            />
            <MapFit />
            {coverageZones.map((zone) => {
              const style = zoneStyle[zone.type]
              const visible = isVisible(zone.type)
              const isSelected = selected?.id === zone.id
              return (
                <Polygon
                  key={zone.id}
                  positions={zone.positions}
                  pathOptions={{
                    fillColor: style.fill,
                    fillOpacity: visible ? (isSelected ? 0.65 : 0.40) : 0.05,
                    color: style.stroke,
                    weight: isSelected ? 2.5 : 1.5,
                    opacity: visible ? 1 : 0.15,
                  }}
                  eventHandlers={{
                    click: () => setSelected(selected?.id === zone.id ? null : zone),
                  }}
                />
              )
            })}
          </MapContainer>

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 px-4 py-3 border-t border-gray-100 bg-[#f8fafc]">
            {Object.entries(zoneStyle).map(([k, v]) => (
              <div key={k} className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm border" style={{ backgroundColor: v.fill + '66', borderColor: v.stroke }} />
                <span className="text-[10px] font-medium text-[#0a1628]/60">{v.label}</span>
              </div>
            ))}
            <span className="text-[10px] text-[#0a1628]/25 ml-auto">Click a zone for details</span>
          </div>
        </div>

        {/* Side panel */}
        <div className="w-48 shrink-0 bg-[#f8fafc] p-4">
          {selected ? (
            <div key={selected.id} style={{ animation: 'fadeIn 150ms ease-out' }}>
              <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-gray-400 mb-4">Zone Detail</p>
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] text-gray-400 font-medium mb-0.5">Coverage</p>
                  <p className="text-[15px] font-black" style={{ color: zoneStyle[selected.type].textColor }}>{selected.label}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-medium mb-0.5">Signal strength</p>
                  <p className="text-[13px] font-semibold text-[#0a1628]">{selected.signal}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-medium mb-0.5">Population</p>
                  <p className="text-[12px] font-semibold text-[#0a1628]">{selected.population}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-medium mb-0.5">Operators</p>
                  <p className="text-[11px] font-medium text-[#0a1628]/70">{selected.operator}</p>
                </div>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="mt-6 text-[10px] text-[#0a1628]/65 hover:text-[#0a1628] font-medium transition-colors"
              >
                Clear selection
              </button>
            </div>
          ) : (
            <>
              <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-gray-400 mb-4">Coverage Breakdown</p>
              <div className="space-y-3">
                {summaryBars.map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] text-gray-500 font-medium">{item.label}</span>
                      <span className="text-[10px] font-bold" style={{ color: item.color }}>{item.pct}%</span>
                    </div>
                    <div className="h-1 bg-gray-200 overflow-hidden">
                      <div className="h-full" style={{ width: `${item.pct}%`, backgroundColor: item.color }} />
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-gray-300 mt-5 italic">Click a zone for details</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

// -- Capabilities -------------------------------------------------------------
const capabilities = [
  {
    icon: faMap,
    label: 'Coverage Visualisation',
    desc: 'Renders 2G, 3G, 4G and 5G network coverage as interactive maps across any region or terrain type.',
    color: '#228DC1',
  },
  {
    icon: faTowerBroadcast,
    label: 'Real-Time Performance Monitoring',
    desc: 'Live signal quality, throughput and coverage data ingested continuously. Identify degradation and dead zones as they emerge.',
    color: '#7c3aed',
  },
  {
    icon: faBullseye,
    label: 'Gap Detection and Prioritisation',
    desc: 'AI analysis surfaces underserved areas, calculates population impact and ranks expansion opportunities by cost-efficiency.',
    color: '#059669',
  },
  {
    icon: faChartBar,
    label: 'Investment Planning Intelligence',
    desc: 'Data-driven inputs for network rollout planning. iCMAP helps operators and governments prioritise where to deploy next.',
    color: '#d97706',
  },
  {
    icon: faGlobe,
    label: 'Multi-Generational Network Support',
    desc: 'Works across all active network generations simultaneously. Model migration paths from legacy infrastructure to 5G.',
    color: '#dc2626',
  },
  {
    icon: faLayerGroup,
    label: 'Regulator and Government Reporting',
    desc: 'Outputs formatted for regulatory submissions, universal service reporting and national broadband mapping requirements.',
    color: '#0891b2',
  },
]

// -- Use cases -----------------------------------------------------------------
const useCases = [
  {
    label: 'Mobile Network Operators',
    headline: 'Optimise coverage. Justify investment.',
    desc: 'iCMAP gives MNOs a real-time, AI-augmented view of their entire network footprint. Identify where coverage underperforms, model expansion scenarios and build the evidence base for capital investment decisions.',
    points: [
      'Live coverage and quality monitoring across all sites',
      'Gap analysis with population and revenue impact scoring',
      'Scenario modelling for new site placement and technology upgrades',
      'Cross-generation performance comparison on a single map',
    ],
  },
  {
    label: 'Regulators',
    headline: 'Enforce coverage commitments with evidence.',
    desc: 'iCMAP provides regulators with independent, verifiable coverage data. Track operator commitments, benchmark against licence obligations and produce evidence for enforcement and policy review.',
    points: [
      'Independent verification of operator coverage claims',
      'Licence condition monitoring and compliance tracking',
      'National coverage benchmarking and gap reporting',
      'Audit-ready data exports for regulatory submissions',
    ],
  },
  {
    label: 'Government',
    headline: 'Close the digital divide with data.',
    desc: 'iCMAP helps government agencies identify underserved communities, allocate subsidy funding and measure the real-world impact of digital inclusion programmes.',
    points: [
      'Rural and remote coverage gap identification',
      'Subsidy allocation modelling and impact forecasting',
      'Universal service obligation progress tracking',
      'National digital inclusion reporting and evidence base',
    ],
  },
]

// -- How it works -------------------------------------------------------------
const steps = [
  {
    num: '01',
    label: 'Ingest your network data',
    desc: 'iCMAP ingests live and historical data from your network infrastructure, drive test datasets, crowdsourced measurements and third-party sources.',
    detail: 'Supports OSS/BSS feeds, drive test formats, open data and custom API inputs.',
    color: '#228DC1',
  },
  {
    num: '02',
    label: 'AI processes and maps coverage',
    desc: 'Machine learning models normalise, validate and correlate incoming data against geographic and demographic layers. Coverage is rendered as accurate, high-resolution maps updated in real time.',
    detail: 'Shape files, heat maps and bin-level granularity available simultaneously.',
    color: '#7c3aed',
  },
  {
    num: '03',
    label: 'Identify gaps and opportunities',
    desc: 'AI-driven gap detection surfaces underserved areas, calculates affected population, cross-references terrain and infrastructure data, and ranks expansion opportunities.',
    detail: 'Prioritisation engine weights by population density, terrain cost and strategic value.',
    color: '#059669',
  },
  {
    num: '04',
    label: 'Report, plan and act',
    desc: 'Generate reports for internal planning, regulator submission or public accountability. Export to your existing planning tools or use iCMAP\'s built-in investment modelling.',
    detail: 'Outputs compatible with leading network planning and GIS platforms.',
    color: '#d97706',
  },
]

// -- Main page -----------------------------------------------------------------
export default function IcmapPage() {
  return (
    <>
      {/* -- Hero -- */}
      <section className="relative overflow-hidden bg-white pt-32 pb-24">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(circle at 70% 15%, rgba(37,99,235,0.18) 0, transparent 45%), radial-gradient(circle at 5% 85%, rgba(5,150,105,0.1) 0, transparent 35%)' }}
        />
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />

        <div className="relative max-w-7xl mx-auto px-8 lg:px-12">
          <p className="font-black text-[#228DC1] mb-4" style={{ fontSize: '13px', letterSpacing: '0.28em', textTransform: 'uppercase', opacity: 0.6 }}>
            iCMAP · Intelligent Coverage Mapping
          </p>
          <h1 className="font-serif-display text-[#0a1628] leading-[1.02] mb-6 max-w-4xl">
            See every gap.<br />
            <span style={{ color: '#228DC1' }}>5G coverage intelligence</span><br />
            that drives decisions.
          </h1>
          <p className="text-[#0a1628]/65 text-[18px] font-normal leading-[1.7] max-w-2xl mb-10">
            iCMAP is an AI-powered network coverage platform that maps 2G to 5G performance in real time, identifies underserved areas and gives operators, regulators and governments the evidence to act.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/contact" className="px-7 py-3.5 bg-[#228DC1] text-white text-[13px] font-semibold hover:bg-[#1a6e99] transition-colors">
              Request a Demo
            </Link>
            <Link to="/contact" className="px-7 py-3.5 border border-gray-200 text-[#0a1628]/70 text-[13px] font-medium hover:border-[#228DC1]/50 hover:text-[#228DC1] transition-all">
              Talk to an expert
            </Link>
          </div>

          <div className="mt-14 pt-10 border-t border-gray-100 flex flex-wrap items-center gap-3">
            <p className="text-[#0a1628]/60 text-[10px] font-semibold uppercase tracking-[0.2em] mr-2">Network generations</p>
            {['2G', '3G', '4G', '5G'].map((gen) => (
              <span key={gen} className="border border-gray-100 bg-[#0a1628]/4 px-3 py-1.5 text-[#0a1628]/60 text-[11px] font-bold tracking-wider">{gen}</span>
            ))}
          </div>
        </div>
      </section>

      {/* -- Key metrics -- */}
      <section className="bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/6 border border-white/6">
            {[
              { stat: 'Real-time', label: 'Coverage data updates',    note: 'Continuous ingestion' },
              { stat: '4',        label: 'Network generations mapped', note: '2G through 5G' },
              { stat: 'AI',       label: 'Gap detection and scoring',  note: 'ML-powered prioritisation' },
              { stat: 'Global',   label: 'Geographic deployment',      note: 'Any region or terrain' },
            ].map((item) => (
              <div key={item.label} className="bg-white px-8 py-8">
                <p className="font-black text-[#0a1628] leading-none mb-2" style={{ fontSize: 'clamp(22px, 2.5vw, 36px)', letterSpacing: '-0.02em' }}>{item.stat}</p>
                <p className="text-[#0a1628]/60 text-[12px] font-medium mb-0.5">{item.label}</p>
                <p className="text-[#0a1628]/65 text-[10px] font-normal">{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -- Live Coverage Map -- */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="max-w-2xl mb-14">
            <p className="type-label text-[#228DC1] mb-4">Live Coverage Intelligence</p>
            <h2 className="font-heading text-[#0a1628] mb-5">
              Every zone. Every generation. On a real map.
            </h2>
            <p className="text-[#0a1628]/65 text-[16px] font-normal leading-[1.7]">
              iCMAP overlays your network coverage data directly onto live geographic maps. Filter by generation, click any zone for signal strength and population data, and instantly see where the gaps are.
            </p>
          </div>
          <CoverageMap />
          <div className="mt-10 grid sm:grid-cols-3 gap-px bg-gray-100 border border-gray-100">
            {[
              { label: 'Real geography',   desc: 'Coverage zones plotted on actual maps with street-level context, not abstract diagrams.' },
              { label: 'Layer filtering',  desc: 'Isolate any generation or show only gap zones to focus planning and regulatory reporting.' },
              { label: 'Zone intelligence', desc: 'Signal strength, population count and operator data on every zone, instantly on click.' },
            ].map((item) => (
              <div key={item.label} className="bg-white px-8 py-6">
                <p className="text-[#0a1628] font-semibold text-[14px] mb-2">{item.label}</p>
                <p className="text-[#0a1628]/60 text-[14px] font-normal leading-[1.7]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -- How it works -- */}
      <section className="py-28 bg-[#f8fafc] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="mb-20">
            <p className="type-label text-[#228DC1] mb-4">How It Works</p>
            <h2 className="font-heading text-[#0a1628] mb-4">
              From raw network data to actionable coverage intelligence
            </h2>
            <p className="text-[#0a1628]/65 text-[18px] font-normal leading-[1.7] max-w-2xl">
              iCMAP ingests data from multiple sources, maps it in real time and uses AI to identify where action is needed and where investment will have the greatest impact.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 border border-gray-200">
            {steps.map((step) => (
              <div key={step.num} className="bg-white p-8 hover:bg-[#f7f9ff] transition-colors">
                <div className="flex items-center gap-3 mb-6">
                  <span className="font-black text-[10px] tabular-nums" style={{ color: step.color, letterSpacing: '0.05em' }}>{step.num}</span>
                  <div className="h-px flex-1 bg-gray-100" />
                </div>
                <h3 className="text-[#0a1628] font-semibold text-[16px] leading-[1.3] mb-3">{step.label}</h3>
                <p className="text-[#0a1628]/65 text-[14px] font-normal leading-[1.7] mb-4">{step.desc}</p>
                <p className="text-[#0a1628]/65 text-[11px] font-normal italic">{step.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -- Capabilities -- */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="mb-16">
            <p className="type-label text-[#228DC1] mb-4">Capabilities</p>
            <h2 className="font-heading text-[#0a1628] mb-4">
              Built for every layer of network intelligence
            </h2>
            <p className="text-[#0a1628]/65 text-[16px] font-normal leading-[1.7] max-w-2xl">
              From live coverage visualisation to regulatory reporting, iCMAP gives operators, regulators and governments a single platform for the entire coverage intelligence lifecycle.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200 border border-gray-200">
            {capabilities.map((cap) => (
              <div key={cap.label} className="bg-white p-8 hover:bg-[#f7f9ff] transition-colors">
                <div className="w-10 h-10 flex items-center justify-center mb-5" style={{ backgroundColor: '#228DC112' }}>
                  <FontAwesomeIcon icon={cap.icon} className="w-5 h-5 text-[#228DC1]" />
                </div>
                <h3 className="text-[#0a1628] font-semibold text-[16px] leading-[1.3] mb-3">{cap.label}</h3>
                <p className="text-[#0a1628]/65 text-[14px] font-normal leading-[1.7]">{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -- Who it's for -- */}
      <section className="py-28 bg-[#f8fafc] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="mb-16">
            <p className="type-label text-[#228DC1] mb-4">Who It's For</p>
            <h2 className="font-heading text-[#0a1628]">
              Operators, regulators and governments
            </h2>
          </div>
          <div className="grid lg:grid-cols-3 gap-px bg-gray-200 border border-gray-200">
            {useCases.map((uc) => (
              <div key={uc.label} className="bg-white p-10">
                <p className="type-label text-[#228DC1] mb-4">{uc.label}</p>
                <h3 className="text-[#0a1628] font-semibold text-[18px] leading-[1.3] mb-4">{uc.headline}</h3>
                <p className="text-[#0a1628]/60 text-[14px] font-normal leading-[1.7] mb-8">{uc.desc}</p>
                <div className="space-y-3">
                  {uc.points.map((point) => (
                    <div key={point} className="flex items-start gap-3">
                      <FontAwesomeIcon icon={faCircleCheck} className="w-4 h-4 text-[#228DC1] shrink-0 mt-0.5" />
                      <p className="text-[#0a1628]/75 text-[14px] font-normal">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -- Why iCMAP -- */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <p className="type-label text-[#228DC1] mb-6">Why iCMAP</p>
              <h2 className="font-heading text-[#0a1628] mb-6">
                Coverage decisions are too important to be made without data
              </h2>
              <p className="text-[#0a1628]/60 text-[16px] font-normal leading-[1.7] mb-8">
                Traditional coverage assessment is slow, manual and often inaccurate. iCMAP replaces static maps and spreadsheet planning with a live, AI-powered intelligence layer that reflects what is actually happening on your network today.
              </p>
              <div className="space-y-3">
                {[
                  'Real-time data rather than periodic drive test snapshots',
                  'AI-detected gaps rather than manually reported complaints',
                  'Population and economic impact scoring built in',
                  'Continuous updates rather than quarterly reporting cycles',
                  'Single platform across all network generations and all regions',
                ].map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <FontAwesomeIcon icon={faCircleCheck} className="w-4 h-4 text-[#228DC1] shrink-0 mt-0.5" />
                    <p className="text-[#0a1628]/65 text-[14px] font-normal">{point}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-px bg-[#0a1628]/5 border border-gray-100">
              {[
                { label: 'Traditional Approach', items: ['Static drive test snapshots', 'Manual gap identification', 'Quarterly update cycles', 'Siloed by network generation'], dim: true },
                { label: 'iCMAP', items: ['Live continuous monitoring', 'AI-powered gap detection', 'Real-time updates', 'All generations unified'], dim: false },
              ].map((col) => (
                <div key={col.label} className="bg-white p-8">
                  <p className={`text-[10px] font-semibold uppercase tracking-[0.2em] mb-5 ${!col.dim ? 'text-[#228DC1]' : 'text-[#0a1628]/60'}`}>{col.label}</p>
                  <div className="space-y-3">
                    {col.items.map((item) => (
                      <div key={item} className="flex items-start gap-2.5">
                        <div className={`w-1 h-1 rounded-full shrink-0 mt-2 ${!col.dim ? 'bg-[#228DC1]' : 'bg-[#228DC1]/10'}`} />
                        <p className={`text-[14px] font-normal leading-[1.3] ${!col.dim ? 'text-[#0a1628]/70' : 'text-[#0a1628]/60 line-through'}`}>{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* -- CTA strip -- */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-8 lg:px-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <div>
            <p className="text-[#0a1628] font-semibold text-[16px] mb-1">See your coverage picture in full.</p>
            <p className="text-[#0a1628]/65 text-[14px] font-normal">
              Start with your existing network data. We map it, analyse it and show you where the gaps are within days.
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
