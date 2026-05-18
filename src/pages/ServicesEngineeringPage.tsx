import ServiceDetailPage from '@/components/ServiceDetailPage'

export default function ServicesEngineeringPage() {
  return (
    <ServiceDetailPage
      title="Engineering"
      navSummary="RF, 5G and network engineering services"
      hero="Engineering depth for networks that need to perform in the real world, from RF design and site surveys to deployment and optimisation."
      image="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1100&q=85&auto=format&fit=crop"
      imageAlt="Network engineering field deployment"
      metrics={[
        { value: '500+', label: 'Sites deployed' },
        { value: '15+', label: 'Countries supported' },
        { value: '4G/5G', label: 'Network expertise' },
      ]}
      overviewTitle="Practical engineering, not paper architecture."
      overview="AWTG delivers the technical work behind resilient wireless networks: survey, design, build, test and optimise with traceable quality at every stage."
      capabilities={[
        { title: 'RF planning', desc: 'Propagation modelling, coverage design, link budgets and capacity planning.' },
        { title: 'Site surveys', desc: 'Physical assessment, readiness checks and deployment planning for complex environments.' },
        { title: 'Network deployment', desc: 'Installation, integration and commissioning across RAN, core and transport layers.' },
        { title: 'Performance testing', desc: 'Drive testing, benchmarking and optimisation against agreed KPIs.' },
      ]}
      steps={[
        { title: 'Survey', desc: 'Understand the site, spectrum, interference and operational environment.' },
        { title: 'Design', desc: 'Create the RF and network design with simulation, BoM and deployment plan.' },
        { title: 'Deploy and optimise', desc: 'Install, commission, test and tune until performance is proven.' },
      ]}
      proofTitle="Networks are judged in the field."
      proof="AWTG engineering teams combine telecoms discipline with delivery accountability, so designs survive contact with buildings, users, devices and deadlines."
      related={[
        { label: 'Private Network as a Service', href: '/solutions/mobile-private-networks' },
        { label: 'Telecoms AI', href: '/solutions/telecoms-ai' },
        { label: 'Case Studies', href: '/insights/case-studies' },
      ]}
    />
  )
}
