'use client'

import { Clock, Tag, ArrowRight } from 'lucide-react'
import { BLOG_POSTS } from '@/lib/data'

export default function BlogSection() {
  return (
    <section className="mb-16" id="blog">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2
            className="text-2xl md:text-3xl font-bold"
            style={{ fontFamily: "'Playfair Display', serif", color: '#2d5a27' }}
          >
            Təbii Məhsulların Faydaları
          </h2>
          <p className="text-sm mt-0.5" style={{ color: '#8b5a2b' }}>
            Kənd yeməyinin elmi — oxuyun, fərqi bilin
          </p>
        </div>
        <button
          className="hidden sm:flex items-center gap-1.5 text-sm font-semibold transition-opacity hover:opacity-70"
          style={{ color: '#2d5a27' }}
        >
          Hamısı <ArrowRight size={14} />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {BLOG_POSTS.map((post, idx) => (
          <article
            key={post.id}
            className="group rounded-3xl overflow-hidden border cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            style={{
              backgroundColor: 'white',
              borderColor: 'rgba(45,90,39,0.10)',
              boxShadow: '0 2px 16px rgba(45,90,39,0.07)',
            }}
          >
            {/* Top color strip with emoji */}
            <div
              className="h-40 flex items-center justify-center text-6xl relative"
              style={{ backgroundColor: post.bg }}
            >
              {post.emoji}
              <div
                className="absolute bottom-0 left-0 right-0 h-12"
                style={{
                  background: `linear-gradient(to top, white, transparent)`,
                }}
              />
            </div>

            <div className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full"
                  style={{ backgroundColor: post.bg, color: post.accent }}
                >
                  <Tag size={10} />
                  {post.category}
                </span>
                <span className="inline-flex items-center gap-1 text-xs" style={{ color: '#9ca3af' }}>
                  <Clock size={10} />
                  {post.readTime}
                </span>
              </div>

              <h3
                className="font-bold text-lg leading-snug mb-2"
                style={{ fontFamily: "'Playfair Display', serif", color: '#1a2e17' }}
              >
                {post.title}
              </h3>

              <p className="text-xs leading-relaxed mb-4" style={{ color: '#6b7280' }}>
                {post.excerpt}
              </p>

              <button
                className="inline-flex items-center gap-1.5 text-xs font-semibold transition-opacity hover:opacity-70"
                style={{ color: post.accent }}
              >
                Daha çox oxu <ArrowRight size={12} />
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
