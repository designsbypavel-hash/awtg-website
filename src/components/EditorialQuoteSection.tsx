export default function EditorialQuoteSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <div className="text-[#228DC1] text-7xl font-serif leading-none mb-6">"</div>
        <blockquote className="text-[24px] lg:text-[28px] font-normal text-[#0a1628] leading-[1.7] italic mb-8">
          The future of enterprise connectivity is private, intelligent, and always-on. AWTG exists to make that future a reality for every organisation we serve.
        </blockquote>
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 bg-[#228DC1] rounded-full flex items-center justify-center text-white font-bold">
            AM
          </div>
          <p className="font-bold text-[#0a1628]">Alastair Mills</p>
          <p className="text-[#0a1628]/60 text-[14px]">CEO, AWTG</p>
        </div>
      </div>
    </section>
  )
}
