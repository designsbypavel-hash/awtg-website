import SolutionDetailPage from '@/components/SolutionDetailPage'

export default function SmartCitiesPage() {
  return (
    <SolutionDetailPage
      title="Smart Cities"
      navSummary="Urban IoT and digital infrastructure platforms"
      hero="Connected infrastructure for councils, developers and public bodies building safer, greener and more efficient places to live and work."
      image="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1100&q=85&auto=format&fit=crop"
      imageAlt="Connected smart city skyline"
      metrics={[
        { value: 'IoT', label: 'Urban sensing' },
        { value: '5G', label: 'City connectivity' },
        { value: '24/7', label: 'Service visibility' },
      ]}
      overviewTitle="Make the city observable and responsive."
      overview="AWTG connects urban infrastructure with wireless networks, IoT platforms and AI analytics so public services can move from reactive reporting to real-time intelligence."
      capabilities={[
        { title: 'Urban IoT networks', desc: 'Sensor and device connectivity for air quality, lighting, mobility and asset monitoring.' },
        { title: 'Smart mobility', desc: 'Connectivity for transport data, EV charging, traffic insights and connected public spaces.' },
        { title: 'Public safety', desc: 'Resilient networks for CCTV, responder communications and situational awareness.' },
        { title: 'Data platforms', desc: 'Dashboards and integration layers that turn city data into decisions.' },
      ]}
      steps={[
        { title: 'Prioritise outcomes', desc: 'Define the public service outcomes, data needs and operational ownership model.' },
        { title: 'Connect the estate', desc: 'Deploy the wireless, IoT and platform layer across streets, buildings and assets.' },
        { title: 'Operate intelligence', desc: 'Monitor performance, surface insights and expand use cases as value is proven.' },
      ]}
      proofTitle="Digital infrastructure that earns public trust."
      proof="Smart city work needs more than devices. AWTG combines secure connectivity, platform delivery and public sector assurance so technology improves the lived experience."
      related={[
        { label: 'Public Sector', href: '/industries/public-sector' },
        { label: 'IoT Services', href: '/services/iot' },
        { label: 'Smart Health', href: '/solutions/smart-health' },
      ]}
    />
  )
}
