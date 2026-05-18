const items = [
  '5G Private Networks', 'Telecoms AI', 'Generative AI', 'Smart Cities',
  'Network Slicing', 'Edge Computing', 'Open RAN', 'Network Automation',
  'Digital Twins', 'IoT Connectivity', 'Spectrum Management', 'Network Security',
]

export default function TickerSection() {
  return (
    <section className="bg-[#228DC1] py-4 overflow-hidden">
      <div className="flex gap-12 animate-[ticker_30s_linear_infinite] whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="text-[#0a1628] font-semibold text-sm uppercase tracking-wider flex-shrink-0 flex items-center gap-3">
            <span className="w-1.5 h-1.5 bg-[#f8fafc]/40 rounded-full" />
            {item}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  )
}
