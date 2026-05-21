import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShieldHalved } from '@fortawesome/free-solid-svg-icons'
import CTASection from '@/components/CTASection'

const certs = [
  { name: 'ISO 9001:2015', desc: 'Quality Management Systems, ensuring consistent, high-quality service delivery across all our operations.' },
  { name: 'ISO 27001', desc: 'Information Security Management, protecting client data and systems to the highest international standards.' },
  { name: 'ISO 14001', desc: 'Environmental Management, our commitment to minimising environmental impact in everything we do.' },
  { name: 'Cyber Essentials Plus', desc: 'UK government-backed certification demonstrating our robust cybersecurity controls.' },
  { name: 'SC Cleared Personnel', desc: 'Many of our engineers hold UK Security Clearance, enabling work on classified government and defence programmes.' },
  { name: 'Ericsson Certified Partner', desc: 'Authorised to design, deploy and manage Ericsson network infrastructure globally.' },
  { name: 'Nokia Certified Partner', desc: 'Authorised Nokia systems integrator for private wireless and enterprise network deployments.' },
  { name: 'AWS Advanced Partner', desc: 'Advanced AWS Partner Network member, specialising in cloud-native telecoms workloads.' },
]

export default function AboutCertificationsPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <p className="type-label text-[#228DC1] mb-4">About AWTG</p>
          <h1 className="font-serif-display text-[#0a1628] mb-6">
            Certifications and Accreditations
          </h1>
          <p className="text-[#0a1628]/65 text-[18px] max-w-2xl font-normal leading-[1.7]">
            Our quality management, security and technology partner certifications demonstrate our commitment to the highest standards.
          </p>
        </div>
      </section>

      {/* Certs grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <p className="type-label text-[#228DC1] mb-4">Accreditations</p>
          <h2 className="font-heading text-[#0a1628] mb-14">
            Standards you can rely on
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-100 border border-gray-100">
            {certs.map((cert) => (
              <div key={cert.name} className="bg-white p-7 hover:bg-[#f7f8fa] transition-colors">
                <FontAwesomeIcon icon={faShieldHalved} className="w-6 h-6 text-[#228DC1] mb-5" />
                <h3 className="font-card-heading text-[#0a1628] text-[15px] mb-2">{cert.name}</h3>
                <p className="text-[#0a1628]/65 text-[14px] leading-[1.7] font-normal">{cert.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Work With a Certified Partner"
        subtitle="Our accreditations mean you can trust AWTG to deliver to the highest standards of quality, security and performance."
        primaryLabel="Get in Touch"
        primaryHref="/contact"
        secondaryLabel="Learn About AWTG"
        secondaryHref="/about"
      />
    </>
  )
}
