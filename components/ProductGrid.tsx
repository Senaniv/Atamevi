'use client'

import { Plus, Minus, ShoppingBasket } from 'lucide-react'
import { Product } from '@/lib/data'

interface ProductGridProps {
  products: Product[]
  quantities: Record<string, number>
  onAdd: (p: Product) => void
  onUpdateQty: (p: Product, qty: number) => void
}

const TAG_COLORS: Record<string, { bg: string; text: string }> = {
  'Ən Çox Satılan': { bg: '#fef3c7', text: '#d97706' },
  Organik:          { bg: '#dcfce7', text: '#16a34a' },
  Premium:          { bg: '#ede9fe', text: '#7c3aed' },
  Nadir:            { bg: '#fee2e2', text: '#dc2626' },
  Ənənəvi:          { bg: '#fef9e7', text: '#b45309' },
  Mövsümi:          { bg: '#e0f2fe', text: '#0369a1' },
  Təzə:             { bg: '#f0fdf4', text: '#2d5a27' },
}

function formatQty(qty: number, unit: string): string {
  if (unit === 'ədəd') return `${Math.round(qty)} ${unit}`
  if (unit === 'kq') return `${qty % 1 === 0 ? qty.toFixed(0) : qty.toFixed(1)} ${unit}`
  return `${qty % 1 === 0 ? qty.toFixed(0) : qty.toFixed(1)} ${unit}`
}

export default function ProductGrid({ products, quantities, onAdd, onUpdateQty }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-5xl mb-4">🌿</div>
        <p className="font-semibold text-lg" style={{ color: '#2d5a27' }}>
          Axtardığınız məhsul tapılmadı
        </p>
        <p className="text-sm mt-1" style={{ color: '#8b5a2b' }}>
          Fərqli açar söz sınayın
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 mb-16">
      {products.map((product, idx) => {
        const qty = quantities[product.id] ?? 0
        const inCart = qty > 0
        const tag = product.tag ? TAG_COLORS[product.tag] : null

        return (
          <article
            key={product.id}
            className="group rounded-2xl sm:rounded-3xl overflow-hidden border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover"
            style={{
              backgroundColor: 'white',
              borderColor: inCart ? 'rgba(45,90,39,0.35)' : 'rgba(45,90,39,0.10)',
              boxShadow: inCart
                ? '0 8px 32px rgba(45,90,39,0.16)'
                : '0 2px 16px rgba(45,90,39,0.08)',
              animationDelay: `${idx * 60}ms`,
            }}
          >
            {/* Image placeholder */}
            <div
              className="h-32 sm:h-44 flex items-center justify-center text-4xl sm:text-6xl relative overflow-hidden"
              style={{
                background:
                  'linear-gradient(135deg, #f2faf0 0%, #e8f5e2 100%)',
              }}
            >
              {product.emoji.startsWith('data:image') || product.emoji.startsWith('http') ? (
                <img
                  src={product.emoji}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                />
              ) : (
                <span className="transition-transform group-hover:scale-110 duration-300">{product.emoji}</span>
              )}
              {tag && (
                <span
                  className="absolute top-2 right-2 text-[9px] sm:text-xs font-semibold px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full shadow-sm"
                  style={{ backgroundColor: tag.bg, color: tag.text }}
                >
                  {product.tag}
                </span>
              )}
            </div>

            {/* Content */}
            <div className="p-3 sm:p-5">
              {/* Category */}
              <span
                className="text-[9px] sm:text-xs font-semibold uppercase tracking-wide"
                style={{ color: '#8b5a2b' }}
              >
                {product.category}
              </span>

              <h3
                className="font-bold text-sm sm:text-lg mt-0.5 sm:mt-1 mb-1 truncate"
                style={{ fontFamily: "'Playfair Display', serif", color: '#1a2e17' }}
              >
                {product.title}
              </h3>

              <p className="text-xs leading-relaxed mb-3 hidden sm:block" style={{ color: '#6b7280' }}>
                {product.description}
              </p>

              {/* Price */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-1 mb-3">
                <div>
                  <span
                    className="text-sm sm:text-xl font-bold font-playfair"
                    style={{ color: '#8b5a2b' }}
                  >
                    {product.price.toFixed(2)} AZN
                  </span>
                  <span className="text-[10px] sm:text-xs ml-0.5 sm:ml-1" style={{ color: '#9ca3af' }}>
                    / {product.unit}
                  </span>
                </div>
                {inCart && (
                  <span
                    className="text-[9px] sm:text-xs font-semibold px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full w-max"
                    style={{ backgroundColor: '#e8f5e2', color: '#2d5a27' }}
                  >
                    ✓ Səbətdə
                  </span>
                )}
              </div>

              {/* Counter / Add button */}
              {!inCart ? (
                <button
                  onClick={() => onAdd(product)}
                  className="w-full flex items-center justify-center gap-1.5 py-2 sm:py-3 rounded-xl sm:rounded-2xl font-semibold text-xs sm:text-sm text-white transition-all hover:opacity-90 active:scale-95"
                  style={{
                    backgroundColor: '#2d5a27',
                    boxShadow: '0 4px 14px rgba(45,90,39,0.28)',
                  }}
                >
                  <ShoppingBasket size={14} />
                  Səbətə At
                </button>
              ) : (
                <div
                  className="flex items-center rounded-xl sm:rounded-2xl overflow-hidden border"
                  style={{ borderColor: 'rgba(45,90,39,0.20)' }}
                >
                  <button
                    onClick={() => onUpdateQty(product, qty - product.step)}
                    className="flex-1 flex items-center justify-center py-2 sm:py-3 transition-colors hover:bg-red-50"
                    style={{ color: '#dc2626' }}
                    aria-label="Azalt"
                  >
                    <Minus size={14} strokeWidth={2.5} />
                  </button>

                  <div
                    className="flex-[2] text-center py-2 sm:py-3 font-bold text-xs sm:text-sm select-none"
                    style={{ color: '#2d5a27', backgroundColor: '#f2faf0' }}
                  >
                    {formatQty(qty, product.unit)}
                  </div>

                  <button
                    onClick={() => onUpdateQty(product, qty + product.step)}
                    className="flex-1 flex items-center justify-center py-2 sm:py-3 transition-colors hover:bg-green-50"
                    style={{ color: '#2d5a27' }}
                    aria-label="Artır"
                  >
                    <Plus size={14} strokeWidth={2.5} />
                  </button>
                </div>
              )}
            </div>
          </article>
        )
      })}
    </div>
  )
}
