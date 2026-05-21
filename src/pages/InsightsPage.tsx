import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const categories = [
  { label: 'Blog', href: '/insights/blog', desc: 'Expert perspectives on telecoms trends and technology.' },
  { label: 'Case Studies', href: '/insights/case-studies', desc: 'Real-world examples of how AWTG has transformed connectivity.' },
  { label: 'White Papers', href: '/insights/white-papers', desc: 'In-depth research and technical analysis from our experts.' },
]

export default function InsightsPage() {
  return (
    <>
      <section className="pt-32 pb-20 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-[#228DC1] font-semibold text-sm uppercase tracking-widest mb-3">Insights</p>
          <h1 className="text-5xl lg:text-6xl font-normal text-[#0a1628] mb-6 leading-tight">
            News &amp; Thought Leadership
          </h1>
          <p className="text-[#0a1628]/60 text-xl max-w-2xl">
            Stay ahead of the curve with insights, research and real-world stories from the AWTG team.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-8">
            {categories.map((cat) => (
              <Link
                key={cat.href}
                to={cat.href}
                className="group p-8 border border-gray-100 rounded-2xl hover:border-[#228DC1]/40 hover:shadow-lg transition-all"
              >
                <h2 className="text-2xl font-bold text-[#0a1628] mb-3 group-hover:text-[#228DC1] transition-colors">{cat.label}</h2>
                <p className="text-[#0a1628]/75 mb-6">{cat.desc}</p>
                <span className="inline-flex items-center gap-2 text-[#228DC1] font-semibold text-sm group-hover:gap-3 transition-all">
                  Browse {cat.label} <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
