import SolutionDetailPage from '@/components/SolutionDetailPage'

export default function SmartHealthPage() {
  return (
    <SolutionDetailPage
      title="Smart Health"
      navSummary="Digital health connectivity and AI platforms"
      hero="Secure connectivity, AI workflows and digital health platforms for care environments where reliability and trust matter."
      image="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1100&q=85&auto=format&fit=crop"
      imageAlt="Digital health technology in a clinical setting"
      metrics={[
        { value: 'NHS', label: 'Health-sector ready' },
        { value: '99.99%', label: 'Reliability target' },
        { value: 'DSPT', label: 'Compliance aware' },
      ]}
      overviewTitle="Connect care teams to better decisions."
      overview="AWTG supports healthcare organisations with wireless infrastructure, AI-enabled workflows and secure data platforms designed around clinical realities."
      capabilities={[
        { title: 'Clinical connectivity', desc: 'Reliable private wireless and campus networks for wards, devices and care environments.' },
        { title: 'Remote monitoring', desc: 'IoT and data integration for patient observations, alerts and operational visibility.' },
        { title: 'AI-assisted workflows', desc: 'Decision support, triage assistance and workflow automation with governance built in.' },
        { title: 'Secure health platforms', desc: 'Architecture aligned to data protection, audit, access control and NHS expectations.' },
      ]}
      steps={[
        { title: 'Understand the pathway', desc: 'Map clinical, operational and data needs before choosing technology.' },
        { title: 'Deploy safely', desc: 'Integrate connectivity and platforms with security, resilience and adoption in mind.' },
        { title: 'Improve outcomes', desc: 'Measure impact on staff time, response speed, patient visibility and service quality.' },
      ]}
      proofTitle="Health technology has to earn confidence."
      proof="AWTG designs around uptime, privacy and the people who use the system every day, because in healthcare adoption is part of the architecture."
      related={[
        { label: 'Public Sector', href: '/industries/public-sector' },
        { label: 'Generative AI', href: '/solutions/generative-ai' },
        { label: 'Contact AWTG', href: '/contact' },
      ]}
    />
  )
}
