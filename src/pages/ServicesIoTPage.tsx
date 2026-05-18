import ServiceDetailPage from '@/components/ServiceDetailPage'

export default function ServicesIoTPage() {
  return (
    <ServiceDetailPage
      title="IoT Platforms"
      navSummary="Connected device management and analytics"
      hero="IoT platforms that connect devices, data and operations so organisations can see what is happening and act faster."
      image="https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1100&q=85&auto=format&fit=crop"
      imageAlt="Connected IoT device electronics"
      metrics={[
        { value: '1M+', label: 'Device-scale ready' },
        { value: '<100ms', label: 'Data latency target' },
        { value: '24/7', label: 'Platform visibility' },
      ]}
      overviewTitle="From connected devices to useful intelligence."
      overview="AWTG builds IoT platforms that manage devices, ingest telemetry, surface alerts and connect field data to the teams who need it."
      capabilities={[
        { title: 'Device management', desc: 'Provisioning, lifecycle management, monitoring and remote updates.' },
        { title: 'Telemetry pipelines', desc: 'Reliable event ingestion, processing and storage for high-volume data streams.' },
        { title: 'Analytics dashboards', desc: 'Role-based views that turn sensor data into operational decisions.' },
        { title: 'Secure integration', desc: 'APIs and access controls that connect IoT data to enterprise systems safely.' },
      ]}
      steps={[
        { title: 'Connect', desc: 'Define device types, connectivity, data structure and operational ownership.' },
        { title: 'Ingest', desc: 'Build the platform layer for telemetry, alerts and device status.' },
        { title: 'Analyse', desc: 'Create dashboards, rules and insights that improve operations.' },
      ]}
      proofTitle="IoT only matters when teams can act on it."
      proof="AWTG focuses on the full chain: device, network, platform, analytics and operational workflow. That is how connected devices become useful systems."
      related={[
        { label: 'Smart Cities', href: '/solutions/smart-cities' },
        { label: 'Industry 4.0', href: '/solutions/industry-4' },
        { label: 'Software Development', href: '/services/software' },
      ]}
    />
  )
}
