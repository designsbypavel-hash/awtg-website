const steps = [
  {
    number: '01',
    title: 'Discover',
    description: 'We begin with a thorough assessment of your network requirements, business objectives, and technical landscape.',
  },
  {
    number: '02',
    title: 'Design',
    description: 'Our engineers craft a bespoke architecture tailored to your needs, from spectrum planning to core network design.',
  },
  {
    number: '03',
    title: 'Deploy',
    description: 'We manage end-to-end deployment including hardware installation, software configuration, and system integration.',
  },
  {
    number: '04',
    title: 'Optimise',
    description: 'Post-deployment, we continuously monitor and optimise your network to ensure peak performance and reliability.',
  },
]

export default function ProcessSection() {
  return (
    <section className="py-24 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-[#228DC1] font-semibold text-sm uppercase tracking-widest mb-3">Our Process</p>
          <h2 className="font-heading text-[#0a1628] mb-4" style={{ fontSize: 'clamp(32px, 4vw, 52px)' }}>How We Work</h2>
          <p className="text-[#0a1628]/60 text-lg max-w-2xl mx-auto">
            A proven methodology that delivers results, from initial consultation to long-term managed service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-[#228DC1]/8 z-0" />
              )}
              <div className="relative z-10">
                <div className="text-5xl font-bold text-[#228DC1]/20 mb-4">{step.number}</div>
                <div className="w-10 h-1 bg-[#228DC1] mb-4 rounded" />
                <h3 className="text-xl font-medium text-[#0a1628] mb-3">{step.title}</h3>
                <p className="text-[#0a1628]/60 leading-relaxed text-sm">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
