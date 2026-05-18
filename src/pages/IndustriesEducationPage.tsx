import CTASection from '@/components/CTASection'
import { Link } from 'react-router-dom'

const solutions = [
  { title: 'Campus-Wide Wi-Fi and 5G', desc: 'High-density wireless design and deployment across university estates, including lecture theatres, libraries, student accommodation and outdoor spaces.' },
  { title: 'Smart Classroom Connectivity', desc: 'Reliable, low-latency connectivity infrastructure supporting interactive displays, AV systems, collaborative platforms and digital learning tools.' },
  { title: 'Student IoT Platforms', desc: 'IoT-enabled campus services including smart building management, environmental monitoring, occupancy sensing and energy optimisation.' },
  { title: 'Research Network Infrastructure', desc: 'High-throughput network design for data-intensive research, HPC connectivity and multi-site collaboration across academic and research institutions.' },
  { title: 'Secure Access Management', desc: 'Zero-trust network access, identity federation and role-based policy enforcement protecting staff, student and guest connectivity across campus.' },
  { title: 'e-Learning Platform Integration', desc: 'Connectivity and infrastructure optimisation supporting VLE platforms, video streaming, remote lecture delivery and hybrid learning environments.' },
]

export default function IndustriesEducationPage() {
  return (
    <>
      <section className="pt-32 pb-20 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#228DC1] mb-4">Industries</p>
          <h1
            className="font-serif-display text-[#0a1628] leading-tight mb-6"
            style={{ fontSize: 'clamp(40px,5vw,72px)' }}
          >
            Education
          </h1>
          <p className="text-[#0a1628]/60 text-lg max-w-2xl font-normal leading-relaxed">
            Connected campus solutions and EdTech infrastructure for universities, colleges and research institutions, enabling seamless learning, collaboration and innovation at scale.
          </p>
        </div>
      </section>

      <section className="bg-[#f8fafc] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-8 lg:px-12 py-12 grid grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-[#0a1628] text-3xl font-semibold mb-1">30+</p>
            <p className="text-[#0a1628]/65 text-sm font-normal uppercase tracking-widest">Universities and Colleges</p>
          </div>
          <div>
            <p className="text-[#0a1628] text-3xl font-semibold mb-1">500k+</p>
            <p className="text-[#0a1628]/65 text-sm font-normal uppercase tracking-widest">Students Connected</p>
          </div>
          <div>
            <p className="text-[#0a1628] text-3xl font-semibold mb-1">Eduroam</p>
            <p className="text-[#0a1628]/65 text-sm font-normal uppercase tracking-widest">Integrated</p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <h2
            className="font-serif-display text-[#0a1628] mb-4"
            style={{ fontSize: 'clamp(28px,3vw,42px)' }}
          >
            Solutions for Education
          </h2>
          <p className="text-[#0a1628]/75 mb-12 max-w-2xl font-normal">
            AWTG designs and delivers campus connectivity that supports modern pedagogy, research ambition and the operational demands of large, multi-site educational institutions.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutions.map(s => (
              <div key={s.title} className="p-6 border border-gray-100 hover:border-[#228DC1]/30 transition-colors">
                <h3 className="font-semibold text-[#0a1628] mb-2">{s.title}</h3>
                <p className="text-[#0a1628]/75 text-sm font-normal leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="border-l-2 border-[#228DC1] pl-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#228DC1] mb-3">Integration</p>
            <p className="text-[#0a1628] text-xl font-normal leading-relaxed max-w-3xl">
              All campus wireless deployments include full Eduroam federation, enabling staff and students to roam seamlessly across participating institutions, with consistent security policy enforcement throughout.
            </p>
            <Link
              to="/insights/case-studies"
              className="inline-flex items-center gap-2 mt-6 text-[#228DC1] text-sm font-semibold uppercase tracking-widest hover:opacity-70 transition-opacity"
            >
              View Case Studies
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
