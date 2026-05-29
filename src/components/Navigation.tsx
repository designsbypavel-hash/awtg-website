import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faBars, faXmark } from '@fortawesome/free-solid-svg-icons'


type NavItem = { label: string; desc: string; href: string }
type NavGroup = { heading: string; items: NavItem[] }
type NavEntry =
  | { label: string; key: string; cols: number; items: NavItem[]; groups?: never }
  | { label: string; key: string; cols?: never; items?: never; groups: NavGroup[] }

const navItems: NavEntry[] = [
  {
    label: 'AI for Solutions',
    key: 'ai-solutions',
    groups: [
      {
        heading: 'Products',
        items: [
          { label: 'Kai', desc: 'Enterprise AI platform for customer service and operations', href: '/products/kai' },
          { label: 'Aruva', desc: 'AI-powered teaching and formative assessment for higher education', href: '/products/aruva' },
        ],
      },
      {
        heading: 'Services',
        items: [
          { label: 'Generative AI', desc: 'Production-ready GenAI for enterprise workflows', href: '/solutions/generative-ai' },
          { label: 'AI/ML Solutions', desc: 'Machine learning and intelligent automation', href: '/services/ai-ml' },
          { label: 'Software Development', desc: 'Custom platforms and application development', href: '/services/software' },
          { label: 'Consultancy', desc: 'Strategic technology advisory and planning', href: '/services/consultancy' },
          { label: 'Digital Transformation', desc: 'End-to-end modernisation programmes', href: '/services/digital-transformation' },
        ],
      },
      {
        heading: 'Industries',
        items: [
          { label: 'Education', desc: 'Connected campus and EdTech platforms', href: '/industries/education' },
          { label: 'Health Tech', desc: 'NHS and healthcare digital infrastructure', href: '/industries/health-tech' },
          { label: 'Retail', desc: 'Omnichannel connectivity and AI solutions', href: '/industries/retail' },
          { label: 'Public Sector', desc: 'Central and local government technology', href: '/industries/public-sector' },
        ],
      },
    ],
  },
  {
    label: 'AI for Connectivity',
    key: 'ai-connectivity',
    groups: [
      {
        heading: 'Products',
        items: [
          { label: 'iCMAP', desc: 'Intelligent 5G coverage mapping and network gap analysis', href: '/products/icmap' },
          { label: 'SCAP', desc: 'Spectrum and capacity analysis platform for network planning', href: '/products/scap' },
          { label: 'Borderlands', desc: 'Edge network management and border connectivity platform', href: '/products/borderlands' },
        ],
      },
      {
        heading: 'Solutions',
        items: [
          { label: 'Telecoms AI', desc: 'AI-powered network intelligence and optimisation', href: '/solutions/telecoms-ai' },
          { label: 'Private Network as a Service', desc: 'Managed 4G/5G enterprise connectivity', href: '/solutions/mobile-private-networks' },
          { label: 'Smart Cities', desc: 'Urban IoT and digital infrastructure platforms', href: '/solutions/smart-cities' },
          { label: 'Industry 4.0', desc: 'Connected manufacturing and logistics solutions', href: '/solutions/industry-4' },
          { label: 'Smart Health', desc: 'Digital health connectivity and AI platforms', href: '/solutions/smart-health' },
          { label: 'IoT Platforms', desc: 'Connected device management and analytics', href: '/services/iot' },
          { label: 'Engineering', desc: 'RF, 5G and network engineering services', href: '/services/engineering' },
        ],
      },
      {
        heading: 'Industries',
        items: [
          { label: 'Telecommunications', desc: 'MNOs, MVNOs and infrastructure vendors', href: '/industries/telecoms' },
          { label: 'Defence', desc: 'Secure, mission-critical communications', href: '/industries/defence' },
        ],
      },
    ],
  },
  {
    label: 'About',
    key: 'about',
    groups: [
      {
        heading: 'Company',
        items: [
          { label: 'Overview', desc: 'Who we are and what drives us', href: '/about' },
          { label: 'Leadership', desc: 'The team behind AWTG', href: '/about/leadership' },
          { label: 'Certifications', desc: 'ISO, Cyber Essentials, Crown Commercial', href: '/about/certifications' },
          { label: 'Sustainability', desc: 'Our commitment to responsible technology', href: '/about/sustainability' },
        ],
      },
      {
        heading: 'Insights',
        items: [
          { label: 'Blog', desc: 'Expert perspectives on telecoms and AI', href: '/insights/blog' },
          { label: 'Case Studies', desc: 'Real outcomes from real deployments', href: '/insights/case-studies' },
          { label: 'White Papers', desc: 'In-depth research and technical briefs', href: '/insights/white-papers' },
        ],
      },
    ],
  },
]

type DropdownKey = string | null

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<DropdownKey>(null)
  const [mobileExpanded, setMobileExpanded] = useState<DropdownKey>(null)
  const closeTimer = useRef<number | null>(null)
  const location = useLocation()

  const openDropdown = (key: string) => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
    setActiveDropdown(key)
  }

  const closeDropdownSoon = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => {
      setActiveDropdown(null)
      closeTimer.current = null
    }, 120)
  }

  const closeDropdownNow = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
    setActiveDropdown(null)
  }

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    closeDropdownNow()
    setMobileExpanded(null)
  }, [location])

  // Close dropdown when clicking outside
  useEffect(() => {
    const close = () => closeDropdownNow()
    if (activeDropdown) document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [activeDropdown])

  // Only use white/transparent nav on the home page (which has a dark video hero)
  const isHome = location.pathname === '/'

  const navBg = scrolled || activeDropdown || !isHome
    ? 'bg-white border-b border-gray-100'
    : 'bg-transparent'

  const linkCls = scrolled || activeDropdown || !isHome
    ? 'text-[#0a1628]/65 hover:text-[#0a1628]'
    : 'text-white/80 hover:text-white'

  // Close dropdowns on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeDropdownNow()
        setMobileOpen(false)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${navBg}`}
        onMouseLeave={closeDropdownSoon}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link to="/" className="flex items-center shrink-0 z-10" aria-label="AWTG — Home">
              <img
                src="/logo-icon.svg"
                alt="AWTG"
                className="h-9 w-auto object-contain"
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-0" aria-label="Main navigation">
              {navItems.map(({ label, key }) => (
                <button
                  key={key}
                  aria-expanded={activeDropdown === key}
                  aria-haspopup="true"
                  aria-controls={`dropdown-${key}`}
                  onMouseEnter={() => openDropdown(key)}
                  onFocus={() => openDropdown(key)}
                  onClick={(e) => { e.stopPropagation(); activeDropdown === key ? closeDropdownNow() : openDropdown(key) }}
                  className={`relative flex items-center gap-1 px-4 py-5 text-[14px] font-medium transition-colors duration-200 ${linkCls} ${activeDropdown === key ? (scrolled || !isHome ? 'text-[#0a1628]' : 'text-white') : ''}`}
                >
                  {label}
                  <FontAwesomeIcon icon={faChevronDown} className={`w-3 h-3 opacity-50 transition-transform duration-200 ${activeDropdown === key ? 'rotate-180' : ''}`} aria-hidden="true" />
                  {/* Harvey-style active underline */}
                  {activeDropdown === key && (
                    <span className="absolute bottom-0 left-4 right-4 h-px bg-current opacity-30" aria-hidden="true" />
                  )}
                </button>
              ))}
              <Link
                to="/careers"
                className={`px-4 py-5 text-[14px] font-medium transition-colors duration-200 ${linkCls}`}
              >
                Careers
              </Link>
            </nav>

            {/* Right CTAs */}
            <div className="hidden lg:flex items-center gap-2">
              <Link
                to="/contact"
                className={`px-4 py-2 text-[14px] font-medium transition-colors duration-200 ${linkCls}`}
              >
                Contact
              </Link>
              <Link
                to="/contact"
                className={`px-5 py-2 text-[14px] font-medium border rounded-lg transition-all duration-200 ${
                  scrolled || activeDropdown || !isHome
                    ? 'border-[#228DC1] text-[#228DC1] hover:bg-[#228DC1] hover:text-white'
                    : 'border-white text-white hover:bg-white hover:text-[#0a1628]'
                }`}
              >
                Request a Demo
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              className={`lg:hidden p-2 transition-colors ${linkCls}`}
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <FontAwesomeIcon icon={faXmark} className="w-5 h-5" aria-hidden="true" /> : <FontAwesomeIcon icon={faBars} className="w-5 h-5" aria-hidden="true" />}
            </button>
          </div>
        </div>

        {/* ── Mega dropdown panel ── */}
        {navItems.map((nav) => (
          activeDropdown === nav.key && (
            <div
              key={nav.key}
              id={`dropdown-${nav.key}`}
              role="region"
              aria-label={`${nav.key} submenu`}
              className="absolute left-0 right-0 bg-white border-b border-gray-200 shadow-[0_18px_45px_rgba(10,22,40,0.08)] animate-[navDrop_180ms_ease-out]"
              onMouseEnter={() => openDropdown(nav.key)}
              onMouseLeave={closeDropdownSoon}
              style={{ top: '64px' }}
            >
              <div className="absolute -top-3 left-0 right-0 h-3" aria-hidden="true" />
              <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8">

                {/* Flat grid (Solutions / Services / Industries) */}
                {nav.items && (
                  <div className={`grid gap-x-3 gap-y-1 ${nav.cols === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
                    {nav.items.map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        className="group flex items-start gap-3 px-4 py-3.5 rounded-md border-l-2 border-transparent hover:border-[#228DC1] hover:bg-[#f0f5ff] hover:translate-x-0.5 transition-all duration-200"
                        onClick={closeDropdownNow}
                      >
                        <div>
                          <p className="text-[#0a1628] text-[14px] font-semibold group-hover:text-[#228DC1] transition-colors duration-150 mb-0.5 tracking-[-0.01em]">
                            {item.label}
                          </p>
                          <p className="text-[#0a1628]/65 text-xs font-normal leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}

                {/* Grouped layout (About — Company + Insights side by side) */}
                {nav.groups && (
                  <div className={`grid gap-10 ${nav.groups.length === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
                    {nav.groups.map((group) => (
                      <div key={group.heading}>
                        <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#0a1628]/65 mb-3 px-4">
                          {group.heading}
                        </p>
                        <div className="space-y-0.5">
                          {group.items.map((item) => (
                            <Link
                              key={item.href}
                              to={item.href}
                              className="group flex items-start gap-3 px-4 py-3 rounded-md border-l-2 border-transparent hover:border-[#228DC1] hover:bg-[#f0f5ff] hover:translate-x-0.5 transition-all duration-200"
                              onClick={closeDropdownNow}
                            >
                              <div>
                                <p className="text-[#0a1628] text-[14px] font-semibold group-hover:text-[#228DC1] transition-colors duration-150 mb-0.5 tracking-[-0.01em]">
                                  {item.label}
                                </p>
                                <p className="text-[#0a1628]/65 text-xs font-normal leading-relaxed">
                                  {item.desc}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            </div>
          )
        ))}

        {/* Mobile menu */}
        {mobileOpen && (
          <div id="mobile-menu" className="lg:hidden bg-white border-t border-gray-100 px-6 py-4" role="navigation" aria-label="Mobile navigation">
            {navItems.map((nav) => (
              <div key={nav.key} className="border-b border-gray-50 last:border-0">
                <button
                  aria-expanded={mobileExpanded === nav.key}
                  aria-controls={`mobile-submenu-${nav.key}`}
                  onClick={() => setMobileExpanded(mobileExpanded === nav.key ? null : nav.key)}
                  className="flex items-center justify-between w-full py-3.5 text-[#0a1628] text-sm font-medium"
                >
                  {nav.label}
                  <FontAwesomeIcon icon={faChevronDown} className={`w-4 h-4 opacity-40 transition-transform ${mobileExpanded === nav.key ? 'rotate-180' : ''}`} aria-hidden="true" />
                </button>
                {mobileExpanded === nav.key && (
                  <div id={`mobile-submenu-${nav.key}`} className="pb-4 space-y-4 pl-2">
                    {nav.items && nav.items.map((item) => (
                      <Link key={item.href} to={item.href} className="block py-1">
                        <p className="text-sm text-[#0a1628] font-normal">{item.label}</p>
                        <p className="text-xs text-[#0a1628]/75 font-normal mt-0.5">{item.desc}</p>
                      </Link>
                    ))}
                    {nav.groups && nav.groups.map((group) => (
                      <div key={group.heading}>
                        <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#0a1628]/65 mb-2 mt-3">{group.heading}</p>
                        {group.items.map((item) => (
                          <Link key={item.href} to={item.href} className="block py-1">
                            <p className="text-sm text-[#0a1628] font-normal">{item.label}</p>
                            <p className="text-xs text-[#0a1628]/75 font-normal mt-0.5">{item.desc}</p>
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link to="/careers" className="block py-3.5 text-[#0a1628] text-sm border-b border-gray-50">Careers</Link>
            <div className="pt-4 flex flex-col gap-2">
              <Link to="/contact" className="w-full py-2.5 text-center text-sm border border-[#228DC1] text-[#228DC1] hover:bg-[#228DC1] hover:text-white transition-colors rounded-lg">
                Request a Demo
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Backdrop overlay when dropdown is open */}
      {activeDropdown && (
        <div
          className="fixed inset-0 z-40 bg-black/5 transition-opacity duration-200"
          style={{ top: '64px' }}
          onMouseEnter={closeDropdownSoon}
        />
      )}
    </>
  )
}
