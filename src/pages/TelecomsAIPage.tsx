import SolutionDetailPage from '@/components/SolutionDetailPage'

export default function TelecomsAIPage() {
  return (
    <SolutionDetailPage
      title="Telecoms AI"
      navSummary="AI-powered network intelligence and optimisation"
      hero="AI for operators and network owners who need fewer outages, faster decisions and measurable performance gains across complex estates."
      image="https://images.unsplash.com/photo-1516110833967-0b5716ca1387?w=1100&q=85&auto=format&fit=crop"
      imageAlt="AI network intelligence visualisation"
      metrics={[
        { value: '40%', label: 'Downtime reduction' },
        { value: '60%', label: 'Faster fault resolution' },
        { value: '24/7', label: 'Network intelligence' },
      ]}
      overviewTitle="Turn network data into action."
      overview="AWTG brings telecoms engineering and AI delivery together, helping teams predict faults, optimise capacity and automate operational response without handing control to a black-box platform."
      capabilities={[
        { title: 'Predictive fault detection', desc: 'Identify anomalies before they become outages using real-time telemetry and modelled network behaviour.' },
        { title: 'Root cause intelligence', desc: 'Reduce investigation time with automated event correlation, summaries and recommended next actions.' },
        { title: 'Traffic optimisation', desc: 'Balance capacity, energy usage and customer experience across changing network conditions.' },
        { title: 'Operational copilots', desc: 'Give NOC and engineering teams natural-language access to logs, KPIs and runbooks.' },
      ]}
      steps={[
        { title: 'Assess the estate', desc: 'Map data sources, alarms, KPIs and operational workflows to identify the highest-value AI use cases.' },
        { title: 'Build the intelligence layer', desc: 'Integrate models with your existing monitoring, assurance and ticketing systems.' },
        { title: 'Optimise continuously', desc: 'Measure model performance, tune recommendations and expand automation only where it is trusted.' },
      ]}
      proofTitle="Built for networks where failure is visible."
      proof="Telecoms AI only matters if it improves real operational performance. AWTG focuses on practical deployments that engineers can trust, audit and improve."
      related={[
        { label: 'Generative AI', href: '/solutions/generative-ai' },
        { label: 'Engineering Services', href: '/services/engineering' },
        { label: 'Case Studies', href: '/insights/case-studies' },
      ]}
    />
  )
}
