import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Clock, Calendar, ArrowRight } from 'lucide-react'

type Post = {
  title: string
  date: string
  readTime: string
  tag: string
  author: string
  role: string
  excerpt: string
  content: Section[]
}

type Section = {
  type: 'heading' | 'paragraph' | 'pullquote' | 'bullets' | 'stat-row'
  text?: string
  items?: string[]
  stats?: { value: string; label: string }[]
}

const posts: Record<string, Post> = {
  'ai-network-operations-2025': {
    title: 'The Rise of AI-Driven Network Operations: What to Expect in 2025',
    date: 'February 2025',
    readTime: '7 min',
    tag: 'AI',
    author: 'AWTG Research Team',
    role: 'Network Intelligence',
    excerpt: 'From self-healing networks to predictive maintenance, AI is fundamentally changing how telecoms organisations operate.',
    content: [
      { type: 'paragraph', text: 'Artificial intelligence is no longer a future concept in telecoms. It is being deployed today across network planning, operations, and customer experience. In 2025, we expect AI adoption to accelerate significantly, driven by the convergence of large language models, real-time telemetry data, and increasingly sophisticated ML platforms.' },
      { type: 'stat-row', stats: [{ value: '40%', label: 'reduction in NOC escalations with AI-driven triage' }, { value: '2.3×', label: 'faster fault resolution vs reactive operations' }, { value: '£18M', label: 'average annual saving for a Tier 1 MNO' }] },
      { type: 'heading', text: 'Predictive Maintenance at Scale' },
      { type: 'paragraph', text: 'The most immediate impact of AI in telecoms is in fault prediction and prevention. Traditional NOC operations rely on reactive processes. Engineers respond to alarms after a fault has occurred. AI-driven systems flip this model entirely, analysing thousands of real-time telemetry signals to identify anomalies before they escalate into outages.' },
      { type: 'paragraph', text: 'AWTG has deployed predictive maintenance platforms across multiple MNO environments where the system monitors over 200 KPIs per cell site simultaneously. The result is a 40% reduction in major fault events, with early intervention catching degradation patterns that human operators consistently miss in the noise of routine monitoring.' },
      { type: 'pullquote', text: 'The shift from reactive to predictive is not incremental. It is a structural change in how networks are operated. The organisations that make this transition in 2025 will have a compounding advantage that only widens over time.' },
      { type: 'heading', text: 'Self-Optimising Networks' },
      { type: 'paragraph', text: 'Beyond fault management, AI is enabling truly self-optimising networks. By continuously analysing traffic patterns, interference levels, and device behaviour, AI engines can autonomously adjust radio parameters, re-route traffic, and balance load across cells, without human intervention.' },
      { type: 'paragraph', text: 'The practical implications are significant. A network that self-optimises can respond to a stadium event, a sudden shift in commuter patterns, or a new interference source within minutes rather than hours. For operators competing on quality of experience, this responsiveness is a direct commercial differentiator.' },
      { type: 'bullets', items: ['Autonomous tilt and power adjustments based on real-time interference mapping', 'Dynamic spectrum rebalancing across frequency bands', 'Traffic steering between macro and small cell layers without service interruption', 'Proactive neighbour relation updates to eliminate coverage gaps'] },
      { type: 'heading', text: 'The Role of Generative AI' },
      { type: 'paragraph', text: 'The emergence of large language models has introduced a new dimension to network operations. Engineers can now interact with network systems in natural language, querying logs, generating incident reports, and receiving step-by-step remediation guidance from AI assistants trained on thousands of network scenarios.' },
      { type: 'paragraph', text: 'AWTG\'s Telecoms AI platform integrates LLM-based assistants directly into the NOC workflow. The impact is measurable: mean time to resolution drops by over 60% for common fault categories because engineers are presented with a ranked list of likely causes and proven remediation steps rather than having to diagnose from raw alarm data.' },
      { type: 'paragraph', text: 'As we move through 2025, organisations that invest in AI-native operations today will gain a significant competitive advantage in network efficiency, customer experience, and cost management. The window for early mover advantage is open, but not indefinitely.' },
    ],
  },

  'private-5g-uk-port': {
    title: 'How AWTG Deployed a Private 5G Network for a Major UK Port',
    date: 'March 2025',
    readTime: '5 min',
    tag: 'Case Study',
    author: 'AWTG Engineering Team',
    role: 'Private Networks',
    excerpt: 'From ageing Wi-Fi to a full 5G NR deployment supporting autonomous cranes, real-time cargo tracking, and a live digital twin.',
    content: [
      { type: 'paragraph', text: 'One of the UK\'s largest container ports faced a critical challenge: ageing wireless infrastructure was limiting the deployment of autonomous vehicle technology and hampering real-time cargo visibility across their 400-hectare site.' },
      { type: 'stat-row', stats: [{ value: '30%', label: 'improvement in operational efficiency post-deployment' }, { value: '22%', label: 'reduction in crane idle time' }, { value: '12', label: 'outdoor 5G NR base stations deployed' }] },
      { type: 'heading', text: 'The Challenge' },
      { type: 'paragraph', text: 'The port needed a network capable of supporting hundreds of simultaneously connected devices, including autonomous straddle carriers, handheld scanners, CCTV cameras, and digital twin sensors, with sub-10ms latency and 99.99% availability. The existing Wi-Fi 5 infrastructure could not meet these requirements across the outdoor environment, with coverage gaps, interference, and handover failures causing persistent operational disruption.' },
      { type: 'paragraph', text: 'A public 5G solution was evaluated and rejected on two grounds: the inability to guarantee QoS for safety-critical autonomous vehicle communications, and data sovereignty requirements for the port\'s operational data.' },
      { type: 'heading', text: 'The Solution' },
      { type: 'paragraph', text: 'AWTG designed and deployed a dedicated 5G NR network using shared spectrum in the 3.8–4.2 GHz band. The network covered the entire port area with 12 outdoor base stations, integrated with a private core network hosted in the port\'s on-premises data centre.' },
      { type: 'bullets', items: ['5G NR in the 3.8–4.2 GHz shared spectrum band across 400 hectares', 'Private 5G core deployed on-premises with full data sovereignty', 'Network slicing separating autonomous vehicle traffic from general IoT', 'Integration with the port\'s SCADA systems and digital twin platform', 'Redundant core architecture with sub-30-second failover'] },
      { type: 'pullquote', text: 'The ability to isolate autonomous vehicle communications on a dedicated network slice, with guaranteed latency and bandwidth, was the technical foundation that made the autonomous crane programme viable.' },
      { type: 'heading', text: 'The Results' },
      { type: 'paragraph', text: 'Following deployment, the port reported a 30% improvement in operational efficiency, driven primarily by the successful deployment of autonomous cranes and real-time cargo tracking. The digital twin capability, powered by the low-latency 5G network, has become central to the port\'s operational planning and has reduced crane idle time by 22%.' },
      { type: 'paragraph', text: 'The project was completed in 14 weeks from contract signature to full operational handover, delivered on time and within budget. The port is now expanding the deployment to cover their second terminal, which is expected to go live later in 2025.' },
    ],
  },

  'open-ran-enterprises': {
    title: 'Understanding Open RAN: Opportunities and Challenges for Enterprises',
    date: 'January 2025',
    readTime: '9 min',
    tag: '5G',
    author: 'AWTG Research Team',
    role: 'Network Architecture',
    excerpt: 'Open RAN is reshaping the vendor landscape. We explore what it means for enterprise private network deployments.',
    content: [
      { type: 'paragraph', text: 'Open RAN has moved from research programme to commercial reality. In 2024, global Open RAN deployments crossed the 50,000 site threshold, and all major MNOs now have live Open RAN in some portion of their network. For enterprises considering private 5G deployments, Open RAN represents both a significant opportunity and a set of challenges that need to be understood before making infrastructure commitments.' },
      { type: 'stat-row', stats: [{ value: '50K+', label: 'commercial Open RAN sites globally in 2024' }, { value: '34%', label: 'of new RAN deployments Open RAN in 2024' }, { value: '2026', label: 'when Open RAN reaches cost parity with traditional RAN' }] },
      { type: 'heading', text: 'What Open RAN Actually Means' },
      { type: 'paragraph', text: 'Traditional RAN architecture bundles the radio unit, distributed unit, and centralised unit into a single vendor solution. Open RAN disaggregates these components and defines open interfaces between them, meaning a site can combine a radio unit from Vendor A with a DU from Vendor B and a CU from Vendor C, all interoperating over standardised O-RAN Alliance interfaces.' },
      { type: 'paragraph', text: 'The practical implication for enterprises is significant: you are no longer locked into a single vendor ecosystem for your private network. You can mix components based on price, performance, or supply chain considerations. You can also update one component without touching the others.' },
      { type: 'pullquote', text: 'Open RAN is not a cost story first. It is a flexibility story. The organisations that understand this distinction make better deployment decisions.' },
      { type: 'heading', text: 'The Real Opportunities for Enterprise Deployments' },
      { type: 'bullets', items: ['Vendor independence: avoid single-vendor lock-in across radio, processing, and core infrastructure', 'Software-defined optimisation: update network behaviour via software rather than hardware refresh', 'Emerging ecosystem: new specialist vendors offering purpose-built solutions for specific verticals', 'AI/ML integration: O-RAN architecture natively supports rApp and xApp deployment for intelligent automation', 'Cost trajectory: as the ecosystem matures, component pricing will improve significantly'] },
      { type: 'heading', text: 'Where the Challenges Lie' },
      { type: 'paragraph', text: 'The multi-vendor integration complexity of Open RAN is real. Interoperability between components that theoretically conform to O-RAN specifications is not always seamless in practice. Integration testing, end-to-end performance validation, and fault isolation across vendor boundaries require expertise that most enterprise IT teams do not have in-house.' },
      { type: 'paragraph', text: 'AWTG\'s Open RAN deployments are supported by our dedicated systems integration practice, which handles the multi-vendor integration, OTIC-validated component selection, and ongoing performance management. The enterprises that get the most from Open RAN are those that treat it as a managed outcome rather than a self-service infrastructure project.' },
      { type: 'bullets', items: ['Integration testing across vendor boundaries adds 4–6 weeks to deployment timelines vs traditional RAN', 'Performance at cell-edge can lag traditional RAN in early deployments if not tuned correctly', 'Support model complexity: multiple vendors means multiple support contracts to coordinate', 'Software update cadences vary by component vendor and require coordinated change management'] },
      { type: 'heading', text: 'Our Recommendation' },
      { type: 'paragraph', text: 'For enterprises deploying private 5G in 2025, Open RAN is a serious consideration, particularly for deployments where long-term flexibility, AI-driven optimisation, and vendor independence are priorities. The integration overhead is real but manageable with the right partner. The window to build Open RAN expertise ahead of the mainstream adoption curve is open now.' },
    ],
  },

  'private-5g-industry-4': {
    title: 'Why Private 5G is the Backbone of Industry 4.0',
    date: 'December 2024',
    readTime: '6 min',
    tag: 'Private Networks',
    author: 'AWTG Engineering Team',
    role: 'Industrial Connectivity',
    excerpt: 'Smart factories require deterministic, ultra-reliable connectivity. Here\'s how private 5G delivers where public networks fall short.',
    content: [
      { type: 'paragraph', text: 'Industry 4.0 is not a technology trend. It is a fundamental shift in how manufacturing, logistics, and industrial operations are structured. At its core, Industry 4.0 requires a connectivity layer that can support simultaneous machine-to-machine communication, autonomous guided vehicles, computer vision systems, and real-time digital twin synchronisation. Public networks, even 5G, cannot reliably deliver the guarantees these applications require. Private 5G can.' },
      { type: 'stat-row', stats: [{ value: '<5ms', label: 'latency for AGV collision avoidance over private 5G' }, { value: '99.9999%', label: 'availability target for safety-critical industrial 5G' }, { value: '£2.4M', label: 'average annual efficiency gain in AWTG industrial deployments' }] },
      { type: 'heading', text: 'What Makes Industrial Connectivity Different' },
      { type: 'paragraph', text: 'Consumer and enterprise connectivity is engineered for best-effort performance. When your video call degrades for two seconds, the experience is poor but the consequence is minor. When an autonomous guided vehicle loses its collision-avoidance signal for two seconds at operating speed, the consequence can be catastrophic. Industrial connectivity must be deterministic, not just fast on average, but reliably fast every single time.' },
      { type: 'paragraph', text: 'This requirement rules out public 5G for the most demanding applications. Public networks are shared infrastructure, and contention during peak periods creates latency spikes that are incompatible with real-time control systems. Private 5G, deployed on dedicated spectrum with a private core, eliminates contention entirely.' },
      { type: 'heading', text: 'The Architecture That Works' },
      { type: 'bullets', items: ['Dedicated spectrum allocation in the 3.8–4.2 GHz shared band or licensed mmWave', 'Private 5G core hosted on-premises or in a local edge data centre', 'Network slicing to separate safety-critical traffic from general IoT and enterprise data', 'Time-sensitive networking integration for deterministic latency on the most demanding applications', 'Multi-access edge computing (MEC) for low-latency processing at the factory floor'] },
      { type: 'pullquote', text: 'The factories deploying private 5G today are not doing it because it is technically interesting. They are doing it because the economics of autonomous operations, once reliable connectivity is in place, are transformative.' },
      { type: 'heading', text: 'Where AWTG Deploys This' },
      { type: 'paragraph', text: 'AWTG has designed and deployed private 5G networks across manufacturing facilities, logistics warehouses, and port environments in the UK and Europe. Our industrial deployment methodology is built around a series of phased trials. We validate performance under production conditions before full-scale rollout, which significantly reduces deployment risk for our clients.' },
      { type: 'paragraph', text: 'The use cases that consistently deliver the fastest return on investment are autonomous guided vehicles (where the reduction in human labour and increase in throughput pays back the network investment within 18 months), computer vision quality inspection (where AI-driven inspection at network speed reduces defect escape rates by 60–80%), and digital twin synchronisation for predictive maintenance.' },
    ],
  },

  'spectrum-sharing-guide': {
    title: 'Spectrum Sharing in the 3.8–4.2 GHz Band: A Practical Guide',
    date: 'November 2024',
    readTime: '8 min',
    tag: 'Spectrum',
    author: 'AWTG Spectrum Team',
    role: 'Regulatory & Spectrum',
    excerpt: 'Navigating shared spectrum allocation for private network deployments in the UK and Europe.',
    content: [
      { type: 'paragraph', text: 'The 3.8–4.2 GHz band has become the primary spectrum choice for enterprise private 5G deployments in the UK. Since Ofcom opened the band for shared access in 2019, over 200 UK organisations have been granted local access licences. Understanding how spectrum sharing works in this band, and how to plan a deployment that maximises performance and minimises interference risk, is essential for any organisation evaluating private 5G.' },
      { type: 'stat-row', stats: [{ value: '200+', label: 'UK organisations with 3.8–4.2 GHz local access licences' }, { value: '6 weeks', label: 'typical Ofcom licence approval timeline' }, { value: '100 MHz', label: 'typical channel allocation per deployment site' }] },
      { type: 'heading', text: 'How Shared Spectrum Access Works in the UK' },
      { type: 'paragraph', text: 'Ofcom\'s Shared Access Licence framework allows organisations to deploy private wireless networks in the 3.8–4.2 GHz band on a local area basis. The framework operates on a coordination model: applicants submit a deployment proposal including antenna location, height, power levels, and coverage footprint. Ofcom checks for potential interference with existing licensees in the area and, if none is identified, issues a licence typically within six weeks.' },
      { type: 'paragraph', text: 'Licences are site-specific and non-exclusive. Multiple licensees can operate in the same band in the same geographic area as long as their deployments are coordinated. The practical implication is that your licence protects you from interference from future applicants, but does not give you exclusivity over the spectrum in your area.' },
      { type: 'heading', text: 'Interference Risk: What to Plan For' },
      { type: 'bullets', items: ['Co-channel interference from existing licensees operating in the same area', 'Adjacent channel interference if deployments are in close geographic proximity', 'Spurious emissions from non-5G equipment operating in adjacent bands', 'Inter-system interference in dense urban deployments where multiple private networks are in proximity', 'Seasonal propagation effects that can extend coverage beyond the designed footprint'] },
      { type: 'pullquote', text: 'A spectrum coordination exercise is not a bureaucratic step. It is a performance planning exercise. The deployments that do it properly avoid interference problems that can undermine the entire network investment.' },
      { type: 'heading', text: 'Planning a Deployment: The Key Variables' },
      { type: 'paragraph', text: 'The most important variables in a 3.8–4.2 GHz deployment are antenna height, transmit power, and channel selection. Lower antenna heights reduce the coverage footprint and minimise interference risk, but may require more base stations to achieve full site coverage. Transmit power should be set to the minimum level that achieves the required coverage, not the maximum available.' },
      { type: 'paragraph', text: 'Channel selection within the 400 MHz available band should be based on a spectrum survey of the deployment site. AWTG conducts site-specific spectrum surveys before every private network deployment, identifying existing signals in the band, characterising the interference environment, and selecting channels that maximise performance margin.' },
      { type: 'heading', text: 'The European Context' },
      { type: 'paragraph', text: 'Spectrum frameworks for private 5G vary significantly across Europe. Germany\'s local licensing approach has been the most progressive, with over 600 local licences issued by the Bundesnetzagentur since 2019. France, the Netherlands, and the Nordic countries have each adopted variants of the shared access model. If you are planning a multi-site deployment across European locations, understanding the national regulatory framework in each country is essential. AWTG\'s spectrum team can support the licensing process across all major European markets.' },
    ],
  },

  'genai-telecoms-hype': {
    title: 'Generative AI in Telecoms: Beyond the Hype',
    date: 'October 2024',
    readTime: '10 min',
    tag: 'AI',
    author: 'AWTG AI Practice',
    role: 'Artificial Intelligence',
    excerpt: 'We cut through the noise and examine where LLMs and generative AI are genuinely delivering value in telecoms today.',
    content: [
      { type: 'paragraph', text: 'Every major telecoms vendor and operator now has a generative AI announcement. The volume of press releases, conference presentations, and pilot programmes has created an environment where it is genuinely difficult to distinguish substantive progress from rebranded automation. This article is an attempt to do exactly that: to look at where generative AI is delivering measurable commercial value in telecoms today, and where it is still an experiment in search of a use case.' },
      { type: 'stat-row', stats: [{ value: '62%', label: 'of MNOs have a GenAI pilot in production as of Q3 2024' }, { value: '18%', label: 'have GenAI delivering measurable commercial returns' }, { value: '3×', label: 'faster RCA with GenAI-assisted NOC operations' }] },
      { type: 'heading', text: 'Where GenAI is Genuinely Working' },
      { type: 'paragraph', text: 'The strongest use cases for generative AI in telecoms share a common characteristic: they augment a skilled human doing a knowledge-intensive task, rather than attempting to replace a structured process. The clearest examples are in network operations.' },
      { type: 'bullets', items: ['NOC assistant tools that provide natural language summaries of alarm storms, ranked by likely root cause, with suggested remediation steps', 'Automated incident report generation: turning raw log data and engineer actions into structured post-incident documentation in minutes rather than hours', 'Configuration validation: checking proposed network changes against a trained model of historical performance to flag likely negative impacts before deployment', 'Customer operations: classifying and routing complex technical fault reports with significantly higher accuracy than rule-based systems', 'Technical documentation generation: keeping network documentation current as configurations change, which is historically one of the most neglected and expensive operational problems'] },
      { type: 'pullquote', text: 'The honest answer is that generative AI in telecoms is most valuable where it reduces cognitive load on expert engineers, not where it tries to replace expert judgment.' },
      { type: 'heading', text: 'Where GenAI is Still Mostly Hype' },
      { type: 'paragraph', text: 'Autonomous network management, the idea that a generative AI system can manage a live production network end-to-end without human oversight, remains firmly in the research category. Current LLMs hallucinate, and a hallucination in a NOC context is not an inaccurate chatbot response. It is a potential network outage.' },
      { type: 'paragraph', text: 'Customer-facing GenAI for complex technical queries is similarly mixed. The pilots that have struggled are those where the AI is expected to handle nuanced technical troubleshooting with customers who are frustrated and need precise answers. The ones that work use GenAI for triage and information gathering, with human handoff for complex resolution.' },
      { type: 'heading', text: 'What This Means for Your Organisation' },
      { type: 'paragraph', text: 'The organisations getting genuine value from generative AI in telecoms right now have two things in common: they started with a specific, well-defined problem rather than a general GenAI strategy, and they invested in the data infrastructure needed to give the model the context it needs to be useful.' },
      { type: 'paragraph', text: 'AWTG\'s approach to GenAI implementation starts with a structured assessment of where the highest-value augmentation opportunities are within your specific operations, followed by a pilot designed to generate measurable evidence before any production commitment. The goal is to move from pilot to production in 90 days for validated use cases, and to avoid building infrastructure for use cases that do not yet have a clear value proposition.' },
    ],
  },

  'network-slicing-explained': {
    title: 'Network Slicing Explained: Use Cases and Deployment Models',
    date: 'September 2024',
    readTime: '11 min',
    tag: '5G',
    author: 'AWTG Architecture Team',
    role: '5G Architecture',
    excerpt: 'A deep dive into 5G network slicing: how it works, when to use it, and how to implement it in enterprise environments.',
    content: [
      { type: 'paragraph', text: 'Network slicing is one of the most commercially significant capabilities introduced by 5G architecture, and one of the most frequently misunderstood. At its core, network slicing allows a single physical 5G network to present multiple logically independent virtual networks, each with its own performance characteristics, security boundaries, and management domain. For enterprise deployments, this transforms what is possible on a shared infrastructure.' },
      { type: 'stat-row', stats: [{ value: '3', label: 'standardised slice types defined by 3GPP (eMBB, URLLC, mMTC)' }, { value: '<1ms', label: 'achievable latency on a dedicated URLLC slice' }, { value: '10×', label: 'increase in supported device density with mMTC slicing' }] },
      { type: 'heading', text: 'The Technical Foundation' },
      { type: 'paragraph', text: '3GPP defines three baseline slice types: eMBB (enhanced mobile broadband, optimised for high throughput), URLLC (ultra-reliable low-latency communications, optimised for deterministic latency and reliability), and mMTC (massive machine-type communications, optimised for density of low-power devices). In practice, enterprise deployments combine and extend these baseline types to match their specific application requirements.' },
      { type: 'paragraph', text: 'A network slice spans all components of the 5G architecture: the radio access network, transport network, and core network. Each slice has its own instantiation of core network functions, its own QoS policies, its own security domain, and its own operations and management interface. The physical infrastructure is shared, but from the perspective of applications and users, each slice behaves as an independent network.' },
      { type: 'heading', text: 'When Slicing Delivers Real Value' },
      { type: 'bullets', items: ['Industrial automation: isolating AGV control traffic on a URLLC slice with dedicated radio resources guarantees the deterministic latency that safety systems require', 'Campus deployments: separating corporate user traffic, IoT sensor data, and guest access on independent slices with appropriate QoS and security policies', 'Healthcare: creating a dedicated slice for patient monitoring devices with guaranteed throughput and encrypted data path, isolated from general hospital network traffic', 'Port and logistics: separating autonomous vehicle communications from cargo tracking IoT and general enterprise data, each with appropriate performance guarantees', 'Public safety: emergency services slice with pre-emption priority that can commandeer radio resources in a critical incident, regardless of network load'] },
      { type: 'pullquote', text: 'The value of network slicing is not in the technology itself. It is in the ability to make contractual performance commitments to specific applications. That is what changes the economics of enterprise wireless.' },
      { type: 'heading', text: 'Implementation: What Actually Needs to Happen' },
      { type: 'paragraph', text: 'Implementing network slicing in an enterprise private network requires a 5G core that supports network slice management. Not all private core solutions do. The core needs to implement 3GPP\'s Network Slice Selection Function (NSSF) and support the slice-specific QoS parameters across the user plane.' },
      { type: 'paragraph', text: 'On the RAN side, the base station must support slice-aware scheduling, meaning the ability to allocate radio resources preferentially to higher-priority slices when contention occurs. This is supported by all modern 5G NR base stations but may require specific software configuration and licensing.' },
      { type: 'paragraph', text: 'AWTG\'s private network architecture is designed for slicing from the ground up. Every deployment we deliver includes slice configuration aligned to the client\'s application requirements, with QoS parameters validated under production load conditions before handover. The result is a network that can make and keep performance commitments that a non-sliced architecture simply cannot.' },
    ],
  },
}

const allPosts = [
  { slug: 'ai-network-operations-2025', tag: 'AI', title: 'The Rise of AI-Driven Network Operations: What to Expect in 2025', date: 'February 2025' },
  { slug: 'private-5g-uk-port', tag: 'Case Study', title: 'How AWTG Deployed a Private 5G Network for a Major UK Port', date: 'March 2025' },
  { slug: 'open-ran-enterprises', tag: '5G', title: 'Understanding Open RAN: Opportunities and Challenges for Enterprises', date: 'January 2025' },
  { slug: 'private-5g-industry-4', tag: 'Private Networks', title: 'Why Private 5G is the Backbone of Industry 4.0', date: 'December 2024' },
  { slug: 'spectrum-sharing-guide', tag: 'Spectrum', title: 'Spectrum Sharing in the 3.8–4.2 GHz Band: A Practical Guide', date: 'November 2024' },
  { slug: 'genai-telecoms-hype', tag: 'AI', title: 'Generative AI in Telecoms: Beyond the Hype', date: 'October 2024' },
  { slug: 'network-slicing-explained', tag: '5G', title: 'Network Slicing Explained: Use Cases and Deployment Models', date: 'September 2024' },
]

const tagColour: Record<string, string> = {
  'AI': 'bg-[#228DC1]/10 text-[#228DC1]',
  '5G': 'bg-[#0a1628]/8 text-[#0a1628]',
  'Case Study': 'bg-emerald-50 text-emerald-700',
  'Private Networks': 'bg-violet-50 text-violet-700',
  'Spectrum': 'bg-amber-50 text-amber-700',
}

export default function InsightsBlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? posts[slug] : null
  const related = allPosts.filter(p => p.slug !== slug).slice(0, 3)

  if (!post) {
    return (
      <div className="pt-32 pb-24 max-w-3xl mx-auto px-6 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#228DC1] mb-4">404</p>
        <h1 className="text-4xl font-bold text-[#0a1628] mb-4">Article Not Found</h1>
        <p className="text-[#0a1628]/60 mb-8 font-normal">This article doesn't exist or may have been moved.</p>
        <Link to="/insights/blog" className="inline-flex items-center gap-2 text-sm font-medium text-[#228DC1] border border-[#228DC1] px-5 py-2.5 hover:bg-[#228DC1] hover:text-white transition-all">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>
      </div>
    )
  }

  return (
    <>
      {/* ── Hero ── */}
      <section className="pt-28 pb-16 bg-[#f8fafc]">
        <div className="max-w-3xl mx-auto px-8 lg:px-12">
          <div className="flex items-center gap-4 mb-8">
            <Link
              to="/insights/blog"
              className="inline-flex items-center gap-2 text-[#0a1628]/60 hover:text-white text-xs font-medium uppercase tracking-[0.12em] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Blog
            </Link>
            <span className="text-[#0a1628]/60">·</span>
            <span className={`text-[11px] font-semibold uppercase tracking-[0.15em] px-2.5 py-1 ${tagColour[post.tag] ?? 'bg-[#228DC1]/8 text-[#0a1628]/60'}`}>
              {post.tag}
            </span>
          </div>

          <h1
            className="font-serif-display text-[#0a1628] leading-tight mb-6"
            style={{ fontSize: 'clamp(28px, 4vw, 52px)' }}
          >
            {post.title}
          </h1>

          <p className="text-[#0a1628]/60 text-lg font-normal leading-relaxed mb-10 max-w-2xl">
            {post.excerpt}
          </p>

          <div className="flex items-center gap-6 pt-8 border-t border-gray-100">
            <div>
              <p className="text-[#0a1628] text-sm font-medium">{post.author}</p>
              <p className="text-[#0a1628]/60 text-xs mt-0.5">{post.role}</p>
            </div>
            <div className="w-px h-8 bg-[#228DC1]/8" />
            <div className="flex items-center gap-4 text-[#0a1628]/60 text-xs">
              <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" /> {post.date}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> {post.readTime} read</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Article body ── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-8 lg:px-12">
          {post.content.map((block, i) => {
            if (block.type === 'heading') {
              return (
                <h2
                  key={i}
                  className="font-serif-display text-[#0a1628] mt-14 mb-5"
                  style={{ fontSize: 'clamp(20px, 2.5vw, 28px)' }}
                >
                  {block.text}
                </h2>
              )
            }
            if (block.type === 'paragraph') {
              return (
                <p key={i} className="text-[#0a1628]/70 leading-[1.85] text-[16px] font-normal mb-7">
                  {block.text}
                </p>
              )
            }
            if (block.type === 'pullquote') {
              return (
                <blockquote key={i} className="my-12 pl-8 border-l-2 border-[#228DC1]">
                  <p className="font-serif-display text-[#0a1628] leading-snug italic" style={{ fontSize: 'clamp(18px, 2vw, 24px)' }}>
                    "{block.text}"
                  </p>
                </blockquote>
              )
            }
            if (block.type === 'bullets' && block.items) {
              return (
                <ul key={i} className="my-8 space-y-3">
                  {block.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-[#0a1628]/70 text-[15px] font-normal leading-relaxed">
                      <span className="mt-2 w-1 h-1 bg-[#228DC1] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              )
            }
            if (block.type === 'stat-row' && block.stats) {
              return (
                <div key={i} className="my-12 grid grid-cols-3 border border-gray-100">
                  {block.stats.map((s, j) => (
                    <div key={j} className={`px-6 py-6 ${j < block.stats!.length - 1 ? 'border-r border-gray-100' : ''}`}>
                      <p className="font-serif-display text-[#0a1628]" style={{ fontSize: 'clamp(24px, 3vw, 36px)' }}>{s.value}</p>
                      <p className="text-[#0a1628]/65 text-xs font-normal leading-relaxed mt-1">{s.label}</p>
                    </div>
                  ))}
                </div>
              )
            }
            return null
          })}
        </div>
      </section>

      {/* ── CTA strip ── */}
      <section className="py-20 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-8 lg:px-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#228DC1] mb-4">Talk to AWTG</p>
            <h2 className="font-serif-display text-[#0a1628] leading-tight" style={{ fontSize: 'clamp(28px, 3.5vw, 44px)' }}>
              Want to go further<br />than the article?
            </h2>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <Link
              to="/contact"
              className="px-7 py-3.5 bg-white text-[#0a1628] text-sm font-medium hover:bg-[#f0f5ff] transition-all"
            >
              Speak to our experts
            </Link>
            <Link
              to="/insights/blog"
              className="px-7 py-3.5 bg-[#228DC1] text-white text-sm font-medium hover:bg-[#1a6e99] transition-all inline-flex items-center gap-2"
            >
              More articles <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Related articles ── */}
      <section className="py-20 bg-[#f7f8fa] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#0a1628]/60 mb-10">More from AWTG</p>
          <div className="grid md:grid-cols-3 gap-6">
            {related.map(r => (
              <Link
                key={r.slug}
                to={`/insights/blog/${r.slug}`}
                className="group bg-white border border-gray-100 p-6 hover:border-[#228DC1] transition-all"
              >
                <span className={`text-[10px] font-semibold uppercase tracking-[0.15em] px-2.5 py-1 mb-4 inline-block ${tagColour[r.tag] ?? 'bg-[#0a1628]/8 text-[#0a1628]'}`}>
                  {r.tag}
                </span>
                <h3 className="text-[#0a1628] text-sm font-semibold leading-snug mb-3 group-hover:text-[#228DC1] transition-colors">
                  {r.title}
                </h3>
                <p className="text-[#0a1628]/60 text-xs">{r.date}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
