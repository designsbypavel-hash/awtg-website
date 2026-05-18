import ServiceDetailPage from '@/components/ServiceDetailPage'

export default function ServicesSoftwarePage() {
  return (
    <ServiceDetailPage
      title="Software Development"
      navSummary="Custom platforms and application development"
      hero="Software built around operational reality: dashboards, platforms, integrations and tools that help teams move faster with clearer data."
      image="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1100&q=85&auto=format&fit=crop"
      imageAlt="Software engineering workspace"
      metrics={[
        { value: '50+', label: 'Platforms built' },
        { value: '99.9%', label: 'Availability target' },
        { value: 'API', label: 'Integration-first' },
      ]}
      overviewTitle="Build the platform your work actually needs."
      overview="AWTG creates custom software for telecoms, AI, IoT and public sector operations where off-the-shelf tools cannot handle the workflow, data model or compliance needs."
      capabilities={[
        { title: 'Operational platforms', desc: 'Dashboards, portals and workflow tools for teams managing complex infrastructure.' },
        { title: 'API integrations', desc: 'Connect legacy systems, cloud services, network platforms and data sources.' },
        { title: 'AI-ready products', desc: 'Interfaces and services that make AI outputs usable, explainable and governed.' },
        { title: 'Cloud and DevOps', desc: 'Secure deployment pipelines, infrastructure automation and supportable architecture.' },
      ]}
      steps={[
        { title: 'Define the workflow', desc: 'Map users, data, decisions and integration needs before screens are designed.' },
        { title: 'Build iteratively', desc: 'Deliver working increments with frequent feedback from real users.' },
        { title: 'Operate confidently', desc: 'Launch with monitoring, support, documentation and room to scale.' },
      ]}
      proofTitle="Software that belongs inside the operation."
      proof="The best platforms feel like part of the work. AWTG combines product thinking, systems integration and engineering discipline so software becomes useful quickly."
      related={[
        { label: 'Generative AI', href: '/solutions/generative-ai' },
        { label: 'IoT Platforms', href: '/services/iot' },
        { label: 'Contact AWTG', href: '/contact' },
      ]}
    />
  )
}
