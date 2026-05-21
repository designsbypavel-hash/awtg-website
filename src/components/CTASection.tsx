import { Link } from 'react-router-dom'

interface CTASectionProps {
  title?: string
  subtitle?: string
  primaryLabel?: string
  primaryHref?: string
  secondaryLabel?: string
  secondaryHref?: string
}

export default function CTASection({
  title = "Ready to Transform Your Network?",
  subtitle = "Talk to our experts about how AWTG can design and deliver a solution tailored to your needs.",
  primaryLabel = "Get in Touch",
  primaryHref = "/contact",
  secondaryLabel = "View Our Solutions",
  secondaryHref = "/solutions",
}: CTASectionProps) {
  return (
    <section className="py-24 bg-[#f8fafc]">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="font-heading text-[#0a1628] mb-6">{title}</h2>
        <p className="text-[#0a1628]/65 text-[18px] mb-10 max-w-2xl mx-auto font-normal leading-[1.7]">{subtitle}</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to={primaryHref}
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#228DC1] text-white font-semibold hover:bg-[#1a6e99] transition-colors"
          >
            {primaryLabel}
          </Link>
          <Link
            to={secondaryHref}
            className="inline-flex items-center gap-2 px-8 py-4 border border-gray-200 text-[#0a1628]/70 font-semibold hover:border-[#228DC1]/40 hover:bg-[#228DC1]/8 hover:text-[#228DC1] transition-colors"
          >
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </section>
  )
}
