import SolutionDetailPage from '@/components/SolutionDetailPage'

export default function MobilePrivateNetworksPage() {
  return (
    <SolutionDetailPage
      title="Private Network as a Service"
      navSummary="Managed 4G/5G enterprise connectivity"
      hero="Private wireless for organisations that need resilient connectivity, secure data control and managed performance without carrying the infrastructure burden alone."
      image="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1100&q=85&auto=format&fit=crop"
      imageAlt="Modern private network infrastructure"
      metrics={[
        { value: '99.99%', label: 'Managed SLA' },
        { value: '4G/5G', label: 'Private wireless' },
        { value: 'Weeks', label: 'Deployment timeline' },
      ]}
      overviewTitle="Enterprise connectivity, fully managed."
      overview="AWTG designs, deploys and operates private networks that support critical sites, campuses and connected operations with predictable performance and clear accountability."
      capabilities={[
        { title: 'Network design', desc: 'Coverage, spectrum, core, RAN and edge architecture tailored to your physical environment.' },
        { title: 'Managed service', desc: 'Monitoring, optimisation and support delivered by teams who understand telecoms at engineering depth.' },
        { title: 'Systems integration', desc: 'Connect private wireless into IT, OT, security and cloud platforms without operational friction.' },
        { title: 'Data sovereignty', desc: 'Keep sensitive traffic local and under your control with edge and on-premises options.' },
      ]}
      steps={[
        { title: 'Scope the site', desc: 'Assess coverage, device density, operational needs and integration requirements.' },
        { title: 'Deploy the network', desc: 'Install, test and commission the private wireless estate with clear acceptance criteria.' },
        { title: 'Run and optimise', desc: 'Operate the network with proactive assurance, reporting and continuous improvement.' },
      ]}
      proofTitle="Connectivity built for work that cannot pause."
      proof="Whether it is logistics, manufacturing, healthcare or public sector infrastructure, AWTG builds private wireless around the outcome first, not just the radio layer."
      related={[
        { label: 'Industry 4.0', href: '/solutions/industry-4' },
        { label: 'Smart Health', href: '/solutions/smart-health' },
        { label: 'Contact AWTG', href: '/contact' },
      ]}
    />
  )
}
