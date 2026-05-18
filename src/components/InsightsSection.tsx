import { Link } from 'react-router-dom'
import { ArrowRight, Clock } from 'lucide-react'

const posts = [
  {
    category: 'Case Study',
    title: 'How AWTG Deployed a Private 5G Network for a Major UK Port',
    excerpt: 'Learn how we delivered a mission-critical private 5G network enabling autonomous vehicles and real-time cargo tracking.',
    date: 'March 2025',
    readTime: '5 min read',
    slug: 'private-5g-uk-port',
    img: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&q=80&auto=format&fit=crop',
  },
  {
    category: 'Blog',
    title: 'The Rise of AI-Driven Network Operations: What to Expect in 2025',
    excerpt: 'From self-healing networks to predictive maintenance, AI is fundamentally changing how telecoms organisations operate.',
    date: 'February 2025',
    readTime: '7 min read',
    slug: 'ai-network-operations-2025',
    img: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?w=600&q=80&auto=format&fit=crop',
  },
  {
    category: 'White Paper',
    title: 'Smart Cities and the Role of Private Networks in Urban Connectivity',
    excerpt: 'An in-depth analysis of how private LTE/5G networks are enabling the next generation of smart city infrastructure.',
    date: 'January 2025',
    readTime: '12 min read',
    slug: 'smart-cities-private-networks',
    img: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80&auto=format&fit=crop',
  },
]

const categoryColors: Record<string, string> = {
  'Case Study': 'bg-[#228DC1]/10 text-[#228DC1]',
  'Blog': 'bg-[#228DC1]/10 text-[#228DC1]',
  'White Paper': 'bg-purple-100 text-purple-700',
}

export default function InsightsSection() {
  return (
    <section className="py-24 bg-[#f5f7fa]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
          <div>
            <p className="text-[#228DC1] font-semibold text-sm uppercase tracking-widest mb-3">Latest Insights</p>
            <h2 className="text-4xl font-bold text-[#0a1628]">News &amp; Thought Leadership</h2>
          </div>
          <Link
            to="/insights"
            className="inline-flex items-center gap-2 text-[#228DC1] font-semibold hover:gap-3 transition-all text-sm"
          >
            View all insights <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link
              key={post.slug}
              to={`/insights/blog/${post.slug}`}
              className="group bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-shadow border border-gray-100"
            >
              <div className="relative h-48 overflow-hidden bg-gray-100">
                <img src={post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
              </div>
              <div className="p-6">
                <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-3 ${categoryColors[post.category]}`}>
                  {post.category}
                </span>
                <h3 className="font-bold text-[#0a1628] leading-snug mb-3 group-hover:text-[#228DC1] transition-colors">
                  {post.title}
                </h3>
                <p className="text-[#0a1628]/75 text-sm leading-relaxed mb-4">{post.excerpt}</p>
                <div className="flex items-center gap-3 text-xs text-[#0a1628]/60">
                  <span>{post.date}</span>
                  <span>·</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {post.readTime}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
