const industries = [
  { name: 'Defence & Government', icon: '🛡️' },
  { name: 'Healthcare', icon: '🏥' },
  { name: 'Manufacturing', icon: '🏭' },
  { name: 'Transport & Logistics', icon: '🚂' },
  { name: 'Energy & Utilities', icon: '⚡' },
  { name: 'Ports & Airports', icon: '✈️' },
  { name: 'Education', icon: '🎓' },
  { name: 'Mining', icon: '⛏️' },
]

export default function IndustriesSection() {
  return (
    <section className="py-24 bg-[#f5f7fa]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-[#228DC1] font-semibold text-sm uppercase tracking-widest mb-3">Industries</p>
          <h2 className="font-heading text-[#0a1628] mb-4">Sectors We Serve</h2>
          <p className="text-[#0a1628]/65 text-[18px] max-w-2xl mx-auto">
            We bring deep domain expertise across critical industries that demand reliable, secure connectivity.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {industries.map((industry) => (
            <div
              key={industry.name}
              className="bg-white rounded-xl p-6 text-center hover:shadow-md hover:-translate-y-0.5 transition-all cursor-default border border-gray-100"
            >
              <div className="text-3xl mb-3">{industry.icon}</div>
              <p className="text-[#0a1628] font-semibold text-sm">{industry.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
