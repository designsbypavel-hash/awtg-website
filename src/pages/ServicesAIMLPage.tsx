import ServiceDetailPage from '@/components/ServiceDetailPage'

export default function ServicesAIMLPage() {
  return (
    <ServiceDetailPage
      title="AI/ML Solutions"
      navSummary="Machine learning and intelligent automation"
      hero="Machine learning systems and intelligent automation that improve decisions, reduce manual work and make complex operations easier to run."
      image="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1100&q=85&auto=format&fit=crop"
      imageAlt="Machine learning and AI visualisation"
      metrics={[
        { value: '40%', label: 'Cost reduction target' },
        { value: '3x', label: 'Faster resolution' },
        { value: 'ML', label: 'Production pipelines' },
      ]}
      overviewTitle="Models are only useful when they change the work."
      overview="AWTG builds AI and ML systems around the operational decision: what should be predicted, automated, flagged or explained, and how teams should trust the result."
      capabilities={[
        { title: 'Predictive models', desc: 'Forecast failure, demand, risk, performance and service needs from operational data.' },
        { title: 'Anomaly detection', desc: 'Spot unusual behaviour in networks, devices, transactions and process signals.' },
        { title: 'Workflow automation', desc: 'Automate repeatable decisions with human approval where judgement still matters.' },
        { title: 'Model operations', desc: 'Monitor accuracy, drift, explainability and lifecycle performance after launch.' },
      ]}
      steps={[
        { title: 'Frame the decision', desc: 'Define what the model must improve and how success will be measured.' },
        { title: 'Build the pipeline', desc: 'Prepare data, train models, test outputs and integrate into real workflows.' },
        { title: 'Operate and tune', desc: 'Monitor performance, manage drift and improve over time.' },
      ]}
      proofTitle="AI delivery needs governance and engineering."
      proof="AWTG brings together data science, software, infrastructure and domain expertise so intelligent systems can move safely into production."
      related={[
        { label: 'Generative AI', href: '/solutions/generative-ai' },
        { label: 'Telecoms AI', href: '/solutions/telecoms-ai' },
        { label: 'Consultancy', href: '/services/consultancy' },
      ]}
    />
  )
}
