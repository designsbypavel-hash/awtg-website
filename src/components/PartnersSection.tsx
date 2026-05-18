const partners = [
  'Ericsson', 'Nokia', 'Huawei', 'Cisco', 'AWS', 'Microsoft Azure',
  'VMware', 'Red Hat', 'Intel', 'Qualcomm',
]

export default function PartnersSection() {
  return (
    <section className="py-16 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <p className="text-center text-[#0a1628]/60 text-sm font-medium uppercase tracking-widest mb-10">
          Trusted Partners &amp; Technology Alliances
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-12">
          {partners.map((partner) => (
            <div
              key={partner}
              className="text-[#0a1628]/65 font-bold text-lg hover:text-[#228DC1] transition-colors cursor-default"
            >
              {partner}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
