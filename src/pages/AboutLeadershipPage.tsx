import { Link } from 'react-router-dom'

// ─── DATA ────────────────────────────────────────────────────────────────────

const executiveLeaders = [
  {
    name: 'Abbey Alidoosti',
    role: 'Co-founder & Chief Executive Officer',
    bio: "Visionary entrepreneur and engineer driving AWTG's global mission to deliver next-generation connectivity and AI solutions.",
    color: '#228DC1',
    initials: 'AA',
    photo: '/team/person-0.png',
  },
  {
    name: 'Prof. Mike Short CBE',
    role: 'Chairman',
    bio: 'Former VP of Telefónica and leading authority in mobile communications. Professor at the University of Surrey.',
    color: '#16a34a',
    initials: 'MS',
    photo: '/team/person-1.png',
  },
  {
    name: 'Ian Vernon',
    role: 'Chief Operating Officer',
    bio: "Senior operations leader overseeing AWTG's global service delivery, project execution, and operational excellence.",
    color: '#7c3aed',
    initials: 'IV',
    photo: '/team/person-2.png',
  },
  {
    name: 'Prof. Hamid Aghvani',
    role: 'Advisory Board Member',
    bio: 'Distinguished professor in wireless communications. Strategic advisor on technical direction and academic partnerships.',
    color: '#0891b2',
    initials: 'HA',
    photo: '/team/person-3.png',
  },
  {
    name: 'Slavash Alamouti',
    role: 'Executive Advisor',
    bio: 'Inventor of the Alamouti space-time code, one of the most cited innovations in modern wireless systems.',
    color: '#ea580c',
    initials: 'SA',
    photo: '/team/person-4.png',
  },
]

const directors = [
  {
    name: 'Matt Moayedi',
    role: 'Director of Engineering',
    bio: "Leads AWTG's engineering division, overseeing RF design, systems integration, and technical delivery.",
    color: '#4f46e5',
    initials: 'MM',
    photo: '/team/person-5.png',
  },
  {
    name: 'David Mintah',
    role: 'Director, MPN & Service Innovation',
    bio: "Drives private network consultancy and service innovation across AWTG's enterprise and public sector portfolio.",
    color: '#059669',
    initials: 'DM',
    photo: '/team/person-6.png',
  },
  {
    name: 'Zeerak Akbar',
    role: 'Director for Operations',
    bio: 'Oversees programme delivery, operational processes, and client engagement across all AWTG regions.',
    color: '#1a6e99',
    initials: 'ZA',
    photo: '/team/person-7.png',
  },
]

const seniorManagement = [
  { name: 'Dr. Sanaz Soltani', role: 'Operations & Security Technical Lead', color: '#db2777', initials: 'SS', photo: '/team/person-8.png' },
  { name: 'Omar Gaye', role: 'Principal Network Architect', color: '#0e7490', initials: 'OG', photo: '/team/person-9.png' },
  { name: 'Peter Najm', role: 'Product Manager, AI', color: '#dc2626', initials: 'PN', photo: '/team/person-10.png' },
  { name: 'Charisma Guéral', role: 'Marketing Manager', color: '#9333ea', initials: 'CG', photo: '/team/person-11.png' },
  { name: 'Sering Harding', role: 'Radio Network Planning & Optimisation Manager', color: '#d97706', initials: 'SH', photo: '/team/person-12.png' },
  { name: 'Bahar Bilan', role: 'Wi-Fi Networks Technical Lead', color: '#e11d48', initials: 'BB', photo: '/team/person-13.png' },
  { name: 'Igors Lapinskis', role: 'Software Solutions Architect', color: '#228DC1', initials: 'IL', photo: '/team/person-14.png' },
  { name: 'Paul Cadman', role: 'Deployment Manager', color: '#15803d', initials: 'PC', photo: '/team/person-15.png' },
]

// ─── AVATAR ──────────────────────────────────────────────────────────────────

function Avatar({ initials, name, color, photo, size = 'md' }: { initials: string; name?: string; color: string; photo?: string; size?: 'sm' | 'md' | 'lg' }) {
  const sz = size === 'lg' ? 'w-full aspect-square' : size === 'sm' ? 'w-12 h-12 text-sm' : 'w-16 h-16 text-base'
  if (photo) {
    return (
      <img
        src={photo}
        alt={name ?? initials}
        className={`${sz} object-cover object-top shrink-0`}
        style={{ borderBottom: `3px solid ${color}` }}
      />
    )
  }
  return (
    <div
      className={`${sz} flex items-center justify-center text-white font-bold shrink-0`}
      style={{ backgroundColor: color }}
    >
      {initials}
    </div>
  )
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function AboutLeadershipPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative pt-32 pb-24 bg-white overflow-hidden">
        {/* Abstract wave pattern */}
        <div className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(ellipse 80% 60% at 70% 50%, rgba(37,99,235,0.35) 0%, transparent 70%),
                              radial-gradient(ellipse 50% 80% at 90% 20%, rgba(99,102,241,0.2) 0%, transparent 60%)`,
          }}
        />
        <div className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '36px 36px' }}
        />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-[#0a1628]/60 mb-8 font-normal">
            <Link to="/" className="hover:text-[#0a1628]/60 transition-colors">Home</Link>
            <span>/</span>
            <Link to="/about" className="hover:text-[#0a1628]/60 transition-colors">About</Link>
            <span>/</span>
            <span className="text-[#0a1628]/60">Leadership</span>
          </nav>
          {/* Badge */}
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#228DC1] text-white text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
            Our People
          </span>
          <h1
            className="font-serif-display text-[#0a1628] leading-tight mb-6"
            style={{ fontSize: 'clamp(40px, 5.5vw, 72px)' }}
          >
            The team behind<br />
            <span className="text-[#228DC1]">AWTG's ambition.</span>
          </h1>
          <p className="text-[#0a1628]/60 text-base leading-relaxed max-w-lg font-normal">
            A multidisciplinary team of engineers, technologists, and commercial leaders committed to delivering world-class outcomes for our clients.
          </p>
        </div>
      </section>

      {/* ── Executive Leadership ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#0a1628]/65 mb-10">
            Executive Leadership
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-px bg-gray-100 border border-gray-100">
            {executiveLeaders.map((person) => (
              <div key={person.name} className="bg-white hover:bg-[#f7f8fa] transition-colors group">
                <div className="overflow-hidden">
                  <Avatar initials={person.initials} name={person.name} color={person.color} photo={person.photo} size="lg" />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-[#0a1628] text-sm mb-1 leading-snug">{person.name}</h3>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.1em] mb-3" style={{ color: person.color }}>{person.role}</p>
                  <p className="text-xs text-[#0a1628]/60 leading-relaxed font-normal">{person.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Directors ── */}
      <section className="py-16 bg-[#f7f8fa]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#0a1628]/65 mb-10">
            Directors
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-100 border border-gray-100">
            {directors.map((person) => (
              <div key={person.name} className="bg-white hover:bg-[#f7f8fa] transition-colors">
                <div className="overflow-hidden">
                  <Avatar initials={person.initials} name={person.name} color={person.color} photo={person.photo} size="lg" />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-[#0a1628] text-sm mb-1 leading-snug">{person.name}</h3>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.1em] mb-3" style={{ color: person.color }}>{person.role}</p>
                  <p className="text-xs text-[#0a1628]/60 leading-relaxed font-normal">{person.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Senior Management ── */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#0a1628]/65 mb-10">
            Senior Management
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px bg-gray-100 border border-gray-100">
            {seniorManagement.map((person) => (
              <div key={person.name} className="bg-white hover:bg-[#f7f8fa] transition-colors">
                <div className="overflow-hidden">
                  <Avatar initials={person.initials} name={person.name} color={person.color} photo={person.photo} size="lg" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-[#0a1628] text-sm leading-snug">{person.name}</h3>
                  <p className="text-[11px] text-[#0a1628]/65 font-normal leading-snug mt-1">{person.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-28 bg-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#228DC1] mb-6">Get in Touch</p>
          <h2
            className="font-serif-display text-[#0a1628] leading-tight mb-6"
            style={{ fontSize: 'clamp(32px, 4.5vw, 58px)' }}
          >
            Ready to explore what{' '}
            <span className="text-[#228DC1]">AWTG can do for you?</span>
          </h2>
          <p className="text-[#0a1628]/65 text-base leading-relaxed mb-10 font-normal max-w-xl mx-auto">
            Whether you need private 5G, AI integration, smart city infrastructure, or telecoms testing, our engineers are ready to scope your project from day one.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#228DC1] hover:bg-[#1a6e99] text-white text-sm font-medium transition-colors"
            >
              Contact Us
            </Link>
            <Link
              to="/solutions"
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-[#228DC1]/40 hover:border-[#228DC1] text-[#228DC1] text-sm font-medium transition-colors"
            >
              View Solutions
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
