interface FullBleedBannerSectionProps {
  title: string
  subtitle?: string
}

export default function FullBleedBannerSection({ title, subtitle }: FullBleedBannerSectionProps) {
  return (
    <section className="relative py-32 bg-[#f8fafc] overflow-hidden">
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(rgba(34,141,193,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(34,141,193,0.5) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />
      <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-4xl lg:text-6xl font-bold text-white leading-tight">{title}</h2>
        {subtitle && <p className="mt-6 text-[#0a1628]/60 text-xl">{subtitle}</p>}
      </div>
    </section>
  )
}
