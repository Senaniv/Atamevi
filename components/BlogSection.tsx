'use client'

import { useRef } from 'react'
import { Clock, Tag, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { BLOG_POSTS } from '@/lib/data'

export default function BlogSection() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth * 0.75 : scrollLeft + clientWidth * 0.75
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' })
    }
  }

  return (
    <section className="mb-16 relative" id="blog">
      {/* Title */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2
            className="text-2xl md:text-3xl font-bold font-playfair"
            style={{ color: '#2d5a27' }}
          >
            Təbii Məhsulların Faydaları
          </h2>
          <p className="text-sm text-gray-500 mt-0.5">
            Kənd yeməyinin elmi — oxuyun, fərqi bilin
          </p>
        </div>

        {/* Carousel controls */}
        <div className="flex gap-2">
          <button
            onClick={() => scroll('left')}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center text-green-deep hover:bg-green-pale transition-all hover:scale-105 active:scale-95 cursor-pointer bg-white"
            style={{ borderColor: 'rgba(45,90,39,0.15)' }}
            aria-label="Sola sürüşdür"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center text-green-deep hover:bg-green-pale transition-all hover:scale-105 active:scale-95 cursor-pointer bg-white"
            style={{ borderColor: 'rgba(45,90,39,0.15)' }}
            aria-label="Sağa sürüşdür"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Slider View */}
      <div
        ref={scrollRef}
        className="flex gap-4 sm:gap-6 overflow-x-auto pb-6 pt-2 scrollbar-none snap-x snap-mandatory"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {BLOG_POSTS.map((post) => (
          <article
            key={post.id}
            className="flex-shrink-0 w-[calc(50%-8px)] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-start rounded-2xl sm:rounded-3xl overflow-hidden border cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg"
            style={{
              backgroundColor: 'white',
              borderColor: 'rgba(45,90,39,0.10)',
              boxShadow: '0 2px 16px rgba(45,90,39,0.07)',
            }}
          >
            {/* Top color strip with emoji */}
            <div
              className="h-24 sm:h-40 flex items-center justify-center text-4xl sm:text-6xl relative"
              style={{ backgroundColor: post.bg }}
            >
              {post.emoji}
              <div
                className="absolute bottom-0 left-0 right-0 h-8 sm:h-12"
                style={{
                  background: `linear-gradient(to top, white, transparent)`,
                }}
              />
            </div>

            <div className="p-3 sm:p-5">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-3 mb-2 sm:mb-3">
                <span
                  className="inline-flex items-center gap-1 text-[9px] sm:text-xs font-semibold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full"
                  style={{ backgroundColor: post.bg, color: post.accent }}
                >
                  <Tag size={10} />
                  {post.category}
                </span>
                <span className="inline-flex items-center gap-1 text-[9px] sm:text-xs" style={{ color: '#9ca3af' }}>
                  <Clock size={10} />
                  {post.readTime}
                </span>
              </div>

              <h3
                className="font-bold text-xs sm:text-lg leading-snug mb-1 sm:mb-2 font-playfair truncate sm:whitespace-normal"
                style={{ color: '#1a2e17' }}
              >
                {post.title}
              </h3>

              <p className="text-[10px] sm:text-xs leading-relaxed mb-3 sm:mb-4 text-gray-500 line-clamp-2 sm:line-clamp-none">
                {post.excerpt}
              </p>

              <button
                className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-semibold transition-opacity hover:opacity-70"
                style={{ color: post.accent }}
              >
                Oxu <ArrowRight size={10} />
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
