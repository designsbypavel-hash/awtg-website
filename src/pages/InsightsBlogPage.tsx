import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Clock, ArrowRight } from 'lucide-react'

const posts = [
  {
    title: 'How AWTG Deployed a Private 5G Network for a Major UK Port',
    excerpt: 'From ageing Wi-Fi to a full 5G NR deployment supporting autonomous cranes, real-time cargo tracking, and a live digital twin.',
    date: 'March 2025',
    readTime: '5 min',
    slug: 'private-5g-uk-port',
    tag: 'Case Study',
    featured: true,
  },
  {
    title: 'The Rise of AI-Driven Network Operations: What to Expect in 2025',
    excerpt: 'From self-healing networks to predictive maintenance, AI is fundamentally changing how telecoms organisations operate.',
    date: 'February 2025',
    readTime: '7 min',
    slug: 'ai-network-operations-2025',
    tag: 'AI',
    featured: false,
  },
  {
    title: 'Understanding Open RAN: Opportunities and Challenges for Enterprises',
    excerpt: 'Open RAN is reshaping the vendor landscape. We explore what it means for enterprise private network deployments.',
    date: 'January 2025',
    readTime: '9 min',
    slug: 'open-ran-enterprises',
    tag: '5G',
    featured: false,
  },
  {
    title: 'Why Private 5G is the Backbone of Industry 4.0',
    excerpt: 'Smart factories require deterministic, ultra-reliable connectivity. Here\'s how private 5G delivers where public networks fall short.',
    date: 'December 2024',
    readTime: '6 min',
    slug: 'private-5g-industry-4',
    tag: 'Private Networks',
    featured: false,
  },
  {
    title: 'Spectrum Sharing in the 3.8–4.2 GHz Band: A Practical Guide',
    excerpt: 'Navigating shared spectrum allocation for private network deployments in the UK and Europe.',
    date: 'November 2024',
    readTime: '8 min',
    slug: 'spectrum-sharing-guide',
    tag: 'Spectrum',
    featured: false,
  },
  {
    title: 'Generative AI in Telecoms: Beyond the Hype',
    excerpt: 'We cut through the noise and examine where LLMs and generative AI are genuinely delivering value in telecoms today.',
    date: 'October 2024',
    readTime: '10 min',
    slug: 'genai-telecoms-hype',
    tag: 'AI',
    featured: false,
  },
  {
    title: 'Network Slicing Explained: Use Cases and Deployment Models',
    excerpt: 'A deep dive into 5G network slicing: how it works, when to use it, and how to implement it in enterprise environments.',
    date: 'September 2024',
    readTime: '11 min',
    slug: 'network-slicing-explained',
    tag: '5G',
    featured: false,
  },
]

const tags = ['All', 'AI', '5G', 'Case Study', 'Private Networks', 'Spectrum']

const tagColour: Record<string, string> = {
  'AI': 'bg-[#228DC1]/10 text-[#228DC1]',
  '5G': 'bg-[#0a1628]/8 text-[#0a1628]',
  'Case Study': 'bg-emerald-50 text-emerald-700',
  'Private Networks': 'bg-violet-50 text-violet-700',
  'Spectrum': 'bg-amber-50 text-amber-700',
}

export default function InsightsBlogPage() {
  const [activeTag, setActiveTag] = useState('All')

  const filtered = activeTag === 'All' ? posts : posts.filter(p => p.tag === activeTag)
  const featured = filtered.find(p => p.featured) ?? filtered[0]
  const rest = filtered.filter(p => p.slug !== featured?.slug)

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#228DC1] mb-4">Insights</p>
          <h1
            className="font-serif-display text-[#0a1628] leading-tight mb-6"
            style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}
          >
            Blog
          </h1>
          <p className="text-[#0a1628]/65 text-lg font-normal max-w-xl leading-relaxed">
            Expert perspectives on telecoms, AI, private networks, and the infrastructure decisions that define the next decade.
          </p>
        </div>
      </section>

      {/* Filter bar */}
      <div className="bg-white border-b border-gray-100 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-hide">
            {tags.map(tag => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`shrink-0 px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.1em] transition-all ${
                  activeTag === tag
                    ? 'bg-[#228DC1] text-white'
                    : 'text-[#0a1628]/65 hover:text-[#228DC1] hover:bg-gray-50'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured post */}
      {featured && (
        <section className="py-16 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-8 lg:px-12">
            <Link
              to={`/insights/blog/${featured.slug}`}
              className="group grid lg:grid-cols-5 gap-0 border border-gray-100 hover:border-[#228DC1] transition-all"
            >
              <div className="lg:col-span-3 p-10 lg:p-14 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#0a1628]/65">Featured</span>
                    <span className="w-8 h-px bg-gray-200" />
                    <span className={`text-[10px] font-semibold uppercase tracking-[0.15em] px-2.5 py-1 ${tagColour[featured.tag] ?? 'bg-[#0a1628]/8 text-[#0a1628]'}`}>
                      {featured.tag}
                    </span>
                  </div>
                  <h2
                    className="font-serif-display text-[#0a1628] leading-tight mb-5 group-hover:text-[#228DC1] transition-colors"
                    style={{ fontSize: 'clamp(22px, 2.5vw, 32px)' }}
                  >
                    {featured.title}
                  </h2>
                  <p className="text-[#0a1628]/75 text-[15px] font-normal leading-relaxed max-w-lg">
                    {featured.excerpt}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-10 pt-8 border-t border-gray-100">
                  <div className="flex items-center gap-4 text-[#0a1628]/60 text-xs">
                    <span>{featured.date}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> {featured.readTime} read</span>
                  </div>
                  <span className="text-[#228DC1] text-xs font-semibold uppercase tracking-[0.1em] flex items-center gap-1.5 group-hover:gap-3 transition-all">
                    Read article <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
              <div className="lg:col-span-2 bg-[#f8fafc] min-h-[280px] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10"
                  style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, #228DC1 0%, transparent 60%)' }}
                />
                <p className="font-serif-display text-[#0a1628]/60 text-center px-8 italic" style={{ fontSize: 'clamp(16px, 2vw, 22px)' }}>
                  "{featured.excerpt.split('.')[0]}."
                </p>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Article grid */}
      <section className="py-20 bg-[#f7f8fa]">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          {rest.length > 0 && (
            <ul role="list" className="space-y-0">
              {rest.map((post, i) => (
                <li key={post.slug} role="listitem">
                <Link
                  to={`/insights/blog/${post.slug}`}
                  className={`group grid lg:grid-cols-4 gap-8 py-8 items-center border-t border-gray-200 hover:bg-white transition-all px-4 -mx-4 ${i === rest.length - 1 ? 'border-b' : ''}`}
                >
                  <div className="lg:col-span-3 flex items-start gap-8">
                    <div className="shrink-0 pt-1">
                      <p className="text-[11px] font-semibold text-[#0a1628]/20 font-mono">
                        {String(i + 2).padStart(2, '0')}
                      </p>
                    </div>
                    <div>
                      <span className={`text-[10px] font-semibold uppercase tracking-[0.15em] px-2.5 py-1 mb-3 inline-block ${tagColour[post.tag] ?? 'bg-[#0a1628]/8 text-[#0a1628]'}`}>
                        {post.tag}
                      </span>
                      <h2 className="text-[#0a1628] font-semibold leading-snug mb-2 group-hover:text-[#228DC1] transition-colors" style={{ fontSize: 'clamp(15px, 1.5vw, 18px)' }}>
                        {post.title}
                      </h2>
                      <p className="text-[#0a1628]/65 text-sm font-normal leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>
                  <div className="flex lg:flex-col lg:items-end gap-4 lg:gap-2">
                    <span className="text-[#0a1628]/65 text-xs">{post.date}</span>
                    <span className="text-[#0a1628]/65 text-xs flex items-center gap-1.5">
                      <Clock className="w-3 h-3" /> {post.readTime} read
                    </span>
                    <span className="text-[#228DC1] text-xs font-semibold uppercase tracking-[0.1em] flex items-center gap-1 group-hover:gap-2 transition-all ml-auto">
                      Read <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
                </li>
              ))}
            </ul>
          )}

          {filtered.length === 0 && (
            <div className="py-24 text-center">
              <p className="text-[#0a1628]/60 font-normal">No articles in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-8 lg:px-12 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#228DC1] mb-3">Work with AWTG</p>
            <h2 className="font-serif-display text-[#0a1628]" style={{ fontSize: 'clamp(24px, 3vw, 38px)' }}>
              Ready to talk about<br />your network?
            </h2>
          </div>
          <Link
            to="/contact"
            className="shrink-0 px-8 py-4 bg-[#228DC1] text-white text-sm font-medium hover:bg-[#1a6e99] transition-all"
          >
            Request a conversation
          </Link>
        </div>
      </section>
    </>
  )
}
