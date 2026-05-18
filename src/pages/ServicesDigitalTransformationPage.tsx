import ServiceDetailPage from '@/components/ServiceDetailPage'

export default function ServicesDigitalTransformationPage() {
  return (
    <ServiceDetailPage
      title="Digital Transformation"
      navSummary="End-to-end modernisation programmes"
      hero="Modernisation that connects strategy, systems, people and measurable outcomes, without losing momentum between planning and delivery."
      image="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1100&q=85&auto=format&fit=crop"
      imageAlt="Digital transformation planning session"
      metrics={[
        { value: 'End-to-end', label: 'Programme ownership' },
        { value: 'AI', label: 'Modernisation-ready' },
        { value: 'ROI', label: 'Outcome measured' },
      ]}
      overviewTitle="Change the operating model, not just the tooling."
      overview="AWTG helps organisations modernise technology estates, data flows and service delivery models with practical sequencing and accountable implementation."
      capabilities={[
        { title: 'Current-state audit', desc: 'Assess systems, workflows, data quality and organisational readiness.' },
        { title: 'Target architecture', desc: 'Define the future-state operating and technology model.' },
        { title: 'Programme delivery', desc: 'Coordinate implementation across vendors, teams, platforms and governance.' },
        { title: 'Adoption support', desc: 'Help users move into the new way of working with confidence.' },
      ]}
      steps={[
        { title: 'Assess', desc: 'Understand the estate, constraints, costs and readiness for change.' },
        { title: 'Design', desc: 'Create a practical roadmap that sequences risk, value and dependencies.' },
        { title: 'Deliver', desc: 'Implement, integrate and support adoption with measurable outcomes.' },
      ]}
      proofTitle="Transformation should feel controlled."
      proof="The difference between digital ambition and digital fatigue is delivery discipline. AWTG keeps modernisation focused on outcomes people can see and use."
      related={[
        { label: 'Consultancy', href: '/services/consultancy' },
        { label: 'Software Development', href: '/services/software' },
        { label: 'AI/ML Solutions', href: '/services/ai-ml' },
      ]}
    />
  )
}
