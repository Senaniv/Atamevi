'use client'

import { ShoppingBasket, Sparkles } from 'lucide-react'

interface HeroSectionProps {
  productCount: number
}

export default function HeroSection({ productCount }: HeroSectionProps) {
  return (
    <section
      className="relative overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: "linear-gradient(135deg, rgba(30, 61, 26, 0.70) 0%, rgba(45, 90, 39, 0.55) 60%, rgba(61, 122, 52, 0.40) 100%), url('/hero-bg.jpg')",
      }}
    >
      {/* Decorative blobs */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ backgroundColor: '#6abf5e', transform: 'translate(30%, -30%)' }}
      />
      <div
        className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ backgroundColor: '#a8e063', transform: 'translate(-30%, 30%)' }}
      />

      {/* Floating emojis */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {['🌿', '🍃', '🌾', '🌱'].map((e, i) => (
          <span
            key={i}
            className="absolute text-2xl opacity-20"
            style={{
              top: `${15 + i * 20}%`,
              left: `${5 + i * 22}%`,
              animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.4}s`,
            }}
          >
            {e}
          </span>
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6 border"
          style={{
            backgroundColor: 'rgba(255,255,255,0.12)',
            borderColor: 'rgba(255,255,255,0.25)',
            color: '#d4f1c4',
          }}
        >
          <Sparkles size={13} />
          Tovuz Dağlarından Birbaşa Süfrənizə
        </div>

        <h1
          className="text-4xl md:text-6xl font-bold text-white leading-tight mb-4"
          style={{
            fontFamily: "'Playfair Display', serif",
            textShadow: '0 4px 16px rgba(14, 31, 12, 0.85)'
          }}
        >
          Atam öyündən
          <br />
          <span className="italic" style={{ color: '#a8e063' }}>
            süfrənizə
          </span>
        </h1>

        <p className="text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed" style={{ color: 'rgba(255,255,255,0.92)', textShadow: '0 2px 10px rgba(0,0,0,0.75)' }}>
          Kənd toyuğu yumurtasından tutmuş dağ balına — hər məhsul{' '}
          <strong className="font-semibold" style={{ color: '#c8f5b0' }}>
            Tovuz ailələrindən
          </strong>{' '}
          bilavasitə sizin süfrənizə çatır.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#products"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-base transition-all hover:scale-105 active:scale-95 shadow-lg animate-pulse-green"
            style={{
              backgroundColor: '#fbf9f4',
              color: '#2d5a27',
              boxShadow: '0 8px 30px rgba(0,0,0,0.25)',
            }}
          >
            <ShoppingBasket size={20} />
            Səbəti Özün Yığ
          </a>
          <a
            href="#baskets"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl font-semibold text-base border-2 transition-all hover:bg-white/10"
            style={{ color: 'white', borderColor: 'rgba(255,255,255,0.45)' }}
          >
            Hazır Səbətlər →
          </a>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-6 max-w-md mx-auto">
          {[
            { val: `${productCount}+`, label: 'Məhsul növü' },
            { val: '100%', label: 'Təbii' },
            { val: '1-2 gün', label: 'Çatdırılma' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl font-bold text-white font-playfair" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                {s.val}
              </div>
              <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.7)', textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Curved bottom */}
      <div className="relative h-16 overflow-hidden">
        <svg
          viewBox="0 0 1440 64"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="absolute bottom-0 w-full h-full"
        >
          <path d="M0,64 C480,0 960,0 1440,64 L1440,64 L0,64 Z" fill="#fbf9f4" />
        </svg>
      </div>
    </section>
  )
}
