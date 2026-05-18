import ServiceDetailPage from '@/components/ServiceDetailPage'

export default function ServicesConsultancyPage() {
  return (
    <ServiceDetailPage
      title="Consultancy"
      navSummary="Strategic technology advisory and planning"
      hero="Clear, vendor-neutral advice for organisations making high-stakes decisions about AI, connectivity and digital infrastructure."
      image="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1100&q=85&auto=format&fit=crop"
      imageAlt="Technology advisory session"
      metrics={[
        { value: '200+', label: 'Projects advised' },
        { value: '98%', label: 'Client satisfaction' },
        { value: '20+', label: 'Years experience' },
      ]}
      overviewTitle="A sharper plan before the spend."
      overview="AWTG helps boards, technology leaders and public sector teams define roadmaps, evaluate suppliers and make confident investment decisions before delivery risk becomes expensive."
      capabilities={[
        { title: 'Technology roadmaps', desc: 'Multi-year plans that connect AI, network and software investment to business outcomes.' },
        { title: 'Vendor selection', desc: 'Structured procurement support and independent technical evaluation.' },
        { title: 'Architecture review', desc: 'Assessment of current networks, systems and operating models before modernisation.' },
        { title: 'Business case support', desc: 'Commercial modelling, risk review and practical sequencing for major programmes.' },
      ]}
      steps={[
        { title: 'Understand the decision', desc: 'Clarify the outcome, constraints, stakeholders and investment choices.' },
        { title: 'Evaluate the options', desc: 'Assess technical, commercial and delivery implications without vendor bias.' },
        { title: 'Define the plan', desc: 'Produce a clear roadmap with priorities, costs, risks and next actions.' },
      ]}
      proofTitle="Guidance from people who also deliver."
      proof="Our consultancy is grounded in field experience. The advice comes from teams who understand what it takes to deploy, integrate and operate the technology afterwards."
      related={[
        { label: 'Digital Transformation', href: '/services/digital-transformation' },
        { label: 'AI/ML Solutions', href: '/services/ai-ml' },
        { label: 'Contact AWTG', href: '/contact' },
      ]}
    />
  )
}
