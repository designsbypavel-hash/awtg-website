import SolutionDetailPage from '@/components/SolutionDetailPage'

export default function Industry4Page() {
  return (
    <SolutionDetailPage
      title="Industry 4.0"
      navSummary="Connected manufacturing and logistics solutions"
      hero="AI, IoT and private wireless for industrial teams turning factories, warehouses and logistics sites into connected operations."
      image="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1100&q=85&auto=format&fit=crop"
      imageAlt="Engineer working with connected industrial systems"
      metrics={[
        { value: '<5ms', label: 'Low-latency control' },
        { value: '30%', label: 'OEE improvement target' },
        { value: '5G', label: 'Industrial connectivity' },
      ]}
      overviewTitle="Connect the work, then optimise it."
      overview="AWTG brings together private networks, machine data and AI workflows so industrial teams can improve visibility, reduce downtime and automate the right decisions."
      capabilities={[
        { title: 'Smart factory networks', desc: 'Private 5G and LTE for robotics, AGVs, quality systems and connected production lines.' },
        { title: 'Predictive maintenance', desc: 'AI models that learn from machine, vibration, thermal and process data to flag issues early.' },
        { title: 'Digital twin platforms', desc: 'Live operational models that support simulation, monitoring and planning.' },
        { title: 'Logistics intelligence', desc: 'Asset tracking, condition monitoring and workflow visibility across complex supply chains.' },
      ]}
      steps={[
        { title: 'Map the process', desc: 'Identify the operational constraints, connectivity gaps and data streams that matter most.' },
        { title: 'Connect the floor', desc: 'Deploy wireless, IoT and integration layers without disrupting production.' },
        { title: 'Optimise the system', desc: 'Use analytics and AI to improve uptime, throughput and decision speed.' },
      ]}
      proofTitle="Industrial AI needs industrial-grade connectivity."
      proof="Factories cannot run on experiments. AWTG builds the network and intelligence layer together so AI has reliable data to work with."
      related={[
        { label: 'Private Network as a Service', href: '/solutions/mobile-private-networks' },
        { label: 'IoT Services', href: '/services/iot' },
        { label: 'Case Studies', href: '/insights/case-studies' },
      ]}
    />
  )
}
