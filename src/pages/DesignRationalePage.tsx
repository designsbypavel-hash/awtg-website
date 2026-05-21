export default function DesignRationalePage() {
  const sections = [
    {
      ref: 'Harvey AI',
      color: '#0a1628',
      tagline: 'Radical restraint.',
      desc: 'No decoration, no illustration, no rounded corners. Every pixel earns its place. The design communicates: we are so confident in our work we don\'t need to dress it up.',
    },
    {
      ref: 'Nokia',
      color: '#228DC1',
      tagline: 'Bold optimism.',
      desc: 'Large, assertive headlines. Technology framed as human progress, not fear. The tone is urgent and forward-looking, never anxious. The customer is the protagonist.',
    },
    {
      ref: 'Ericsson',
      color: '#1e3a5f',
      tagline: 'Technical credibility.',
      desc: 'Dark navy signals infrastructure, depth, and seriousness. Data-led storytelling. Grid discipline. The company behind the world\'s networks doesn\'t need to shout.',
    },
  ]

  const decisions = [
    {
      title: 'Colour Palette — #0a1628, #228DC1, White',
      inspiration: 'Ericsson + Harvey',
      rationale: 'Dark navy communicates: we build infrastructure that runs the world. The blue accent (#228DC1) departs from the cyan telecoms cliché. It reads closer to trust, intelligence, and modernity. White sections are confidence, not emptiness. Harvey\'s entire philosophy is that white space is a signal of restraint, not a lack of content.',
    },
    {
      title: 'Sharp Corners Everywhere',
      inspiration: 'Harvey',
      rationale: 'Rounded corners are a consumer-app convention signalling friendliness and softness. Enterprise B2B clients (MNOs, MOD, NHS trusts) are buying infrastructure. Sharp corners communicate precision, rigour, and engineering discipline. They say: we are not a lifestyle product. We are built.',
    },
    {
      title: 'Hero Headline — "The organisations winning the AI era aren\'t waiting."',
      inspiration: 'Nokia',
      rationale: 'Nokia\'s brand is built on urgency and optimism, never fear. The headline puts the customer as protagonist. AWTG is the guide, not the hero. Present tense, declarative, short. The italic "aren\'t waiting" creates a rhythmic pivot. Nokia\'s typographic confidence applied directly.',
    },
    {
      title: 'Typography — Roboto, clamp() sizing, uppercase tracking labels',
      inspiration: 'Nokia + Harvey',
      rationale: 'Roboto is technical, neutral, and infinitely legible. The typeface has no personality. The content does. Large clamp() headlines are Nokia\'s boldness applied responsively. The small uppercase eyebrow labels ("Solutions", "Services") are Harvey\'s exact pattern: a map, not a decoration.',
    },
    {
      title: 'Navigation — Transparent → White on Scroll, Mega-dropdown',
      inspiration: 'Harvey',
      rationale: 'Transparent nav means the hero section is cinematic and uncompeted. White on scroll grounds the nav in content territory. The border-left accent on hover is a precise ruled line, not a blob. That is Harvey\'s interaction model. Description text under each nav item is borrowed from Ericsson: their audience is technical and evaluating options, not browsing.',
    },
    {
      title: 'Stats Sections — Full-width Dark Bars',
      inspiration: 'Ericsson',
      rationale: 'Ericsson leads with numbers constantly. This is not boasting. It is proof. Technical buyers need data before narrative. The dark stats bars create visual rhythm: dark, light, dark, light, keeping the page from feeling like a single flat scroll. Each bar is a moment of weight and credibility.',
    },
    {
      title: 'CTA Buttons — Border-only, No Arrows, Sharp Corners',
      inspiration: 'Harvey',
      rationale: 'No arrows: a well-designed button at the right moment is self-evident. Border-only (ghost) buttons on dark backgrounds are Harvey\'s primary CTA style, restrained and inverting cleanly on hover. Sharp corners on buttons reinforce the same signal as everywhere else: designed for enterprise procurement, not an app store.',
    },
    {
      title: 'Ticker Bar — White Background, Full Opacity',
      inspiration: 'Harvey + Ericsson',
      rationale: 'Logos should be clearly readable, not mood-lit. Dimming partner logos signals mild embarrassment. Full opacity on white says: we\'re proud of every one of these relationships. The "Trusted by" label and link are subordinate. The logos do the talking. Ericsson\'s philosophy: let the client list speak.',
    },
    {
      title: 'Section Alternation — White / #f7f8fa',
      inspiration: 'Harvey + Ericsson',
      rationale: 'Alternating between white and very light gray creates visual separation without colour drama. Harvey never uses heavily coloured mid-page sections. Ericsson uses this exact gray range across their enterprise product pages. The result: coherent, calm, the product of a company that doesn\'t need to fight for attention.',
    },
    {
      title: 'Photography — Real People, Real Infrastructure',
      inspiration: 'Nokia + Harvey',
      rationale: 'No illustrations, no icon decoration, no stock vector art. Photography of actual offices, networks, and teams says: real deployments, real engineers, real outcomes. The hero video of an office team reinforces the same idea. Not an AI render. Actual people making decisions. Nokia\'s brand: technology in service of human progress.',
    },
  ]

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#228DC1] mb-4">
            Design Rationale
          </p>
          <h1
            className="font-serif-display text-[#0a1628] leading-tight mb-6"
           
          >
            Why the Website<br />
            Looks the Way It Does
          </h1>
          <p className="text-[#0a1628]/60 text-lg max-w-2xl font-normal leading-relaxed">
            Every design decision on this website connects to a clear rationale, rooted in three reference points: Harvey AI, Nokia, and Ericsson. This document explains the thinking behind each choice.
          </p>
        </div>
      </section>

      {/* Three references */}
      <section className="py-20 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#0a1628]/60 mb-10">
            The Three Reference Points
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {sections.map((s) => (
              <div key={s.ref} className="border-l-4 pl-6" style={{ borderColor: s.color }}>
                <p className="font-serif-display text-[#0a1628] text-xl mb-1">{s.ref}</p>
                <p className="text-[13px] font-semibold text-[#0a1628]/60 uppercase tracking-widest mb-3">{s.tagline}</p>
                <p className="text-[#0a1628]/75 text-sm font-normal leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Through-line */}
      <section className="py-16 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-8 lg:px-12 text-center">
          <p className="text-[#0a1628]/60 text-[11px] font-semibold uppercase tracking-[0.22em] mb-6">The Core Principle</p>
          <blockquote
            className="font-serif-display text-[#0a1628] leading-tight mx-auto max-w-4xl italic"
           
          >
            "AWTG is a company serious enough that it doesn't need to perform seriousness."
          </blockquote>
          <p className="text-[#0a1628]/65 mt-6 text-sm font-normal max-w-2xl mx-auto leading-relaxed">
            Harvey doesn't use colour to signal prestige. The restraint is the prestige. Nokia doesn't soften its headlines. The boldness is the confidence. Ericsson doesn't illustrate its claims. The data is the proof.
          </p>
        </div>
      </section>

      {/* Decision breakdown */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#0a1628]/60 mb-12">
            Decision by Decision
          </p>
          <div className="space-y-0">
            {decisions.map((d, i) => (
              <div
                key={d.title}
                className="grid lg:grid-cols-3 gap-8 py-10 border-t border-gray-100"
              >
                <div className="lg:col-span-1">
                  <p className="text-[11px] font-semibold text-[#228DC1] uppercase tracking-widest mb-2">
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <h3 className="font-serif-display text-[#0a1628] text-lg leading-snug mb-3">
                    {d.title}
                  </h3>
                  <span className="inline-block text-[11px] font-semibold uppercase tracking-widest text-[#0a1628]/60 border border-gray-200 px-3 py-1">
                    {d.inspiration}
                  </span>
                </div>
                <div className="lg:col-span-2">
                  <p className="text-[#0a1628]/65 leading-relaxed font-normal text-[15px]">
                    {d.rationale}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer note */}
      <section className="py-16 bg-[#f7f8fa] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-8 lg:px-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <p className="font-serif-display text-[#0a1628] text-xl mb-2">AWTG Website — Design Rationale</p>
            <p className="text-[#0a1628]/60 text-sm font-normal">
              Prepared by the design team. Inspired by Harvey AI, Nokia, and Ericsson.
            </p>
          </div>
          <a
            href="/"
            className="inline-block px-6 py-3 border border-[#228DC1] text-[#228DC1] text-[13px] font-medium hover:bg-[#228DC1] hover:text-white transition-all"
          >
            View the Website →
          </a>
        </div>
      </section>
    </>
  )
}
