import { useRef, useState, useEffect } from 'react'
import { ShoppingBasket, PackagePlus, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react'
import { Product, ReadyBasketDef } from '@/lib/data'

interface ReadyBasketsProps {
  baskets: ReadyBasketDef[]
  products: Product[]
  onAdd: (items: { product: Product; qty: number }[]) => void
}

export default function ReadyBaskets({ baskets, products, onAdd }: ReadyBasketsProps) {
  const [added, setAdded] = useState<Record<string, boolean>>({})
  const [isPlaying, setIsPlaying] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)

  const handleAdd = (basketId: string, items: { productId: string; qty: number }[]) => {
    const resolved = items
      .map(({ productId, qty }) => {
        const product = products.find((p) => p.id === productId)
        return product ? { product, qty } : null
      })
      .filter(Boolean) as { product: Product; qty: number }[]

    onAdd(resolved)
    setAdded((prev) => ({ ...prev, [basketId]: true }))
    setTimeout(() => setAdded((prev) => ({ ...prev, [basketId]: false })), 2500)
  }

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth * 0.75 : scrollLeft + clientWidth * 0.75
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' })
    }
  }

  // Auto-play sliding loop
  useEffect(() => {
    if (!isPlaying || baskets.length <= 1) return

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
        const maxScroll = scrollWidth - clientWidth
        if (scrollLeft >= maxScroll - 5) {
          // Loop back to start
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' })
        } else {
          // Scroll next
          scrollRef.current.scrollTo({ left: scrollLeft + clientWidth * 0.8, behavior: 'smooth' })
        }
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [isPlaying, baskets])

  return (
    <section
      className="mb-16 relative"
      id="baskets"
      onClick={() => setIsPlaying(false)}
      onTouchStart={() => setIsPlaying(false)}
    >
      {/* Title */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: '#e8f5e2' }}
          >
            <PackagePlus size={20} style={{ color: '#2d5a27' }} />
          </div>
          <div>
            <h2
              className="text-2xl md:text-3xl font-bold font-playfair"
              style={{ color: '#2d5a27' }}
            >
              Hazır Ailə Səbətləri
            </h2>
            <p className="text-sm text-gray-500">
              Bir kliklə tamamlanmış dəstlər — sonradan dəyişdirə bilərsiniz
            </p>
          </div>
        </div>

        {/* Carousel controls (Visible on all devices, also mobile) */}
        {baskets.length > 1 && (
          <div className="flex gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation()
                setIsPlaying(false)
                scroll('left')
              }}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center text-green-deep hover:bg-green-pale transition-all hover:scale-105 active:scale-95 cursor-pointer bg-white"
              style={{ borderColor: 'rgba(45,90,39,0.15)' }}
              aria-label="Sola sürüşdür"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setIsPlaying(false)
                scroll('right')
              }}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center text-green-deep hover:bg-green-pale transition-all hover:scale-105 active:scale-95 cursor-pointer bg-white"
              style={{ borderColor: 'rgba(45,90,39,0.15)' }}
              aria-label="Sağa sürüşdür"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
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
        {baskets.map((basket) => {
          const isAdded = added[basket.id]
          const ingredients = basket.items
            .map(({ productId, qty }) => {
              const p = products.find((x) => x.id === productId)
              return p ? `${p.title} (${qty} ${p.unit})` : null
            })
            .filter(Boolean)

          return (
            <div
              key={basket.id}
              className="flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-start rounded-3xl p-6 border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:border-green-deep/20"
              style={{
                backgroundColor: 'white',
                borderColor: 'rgba(139,90,43,0.15)',
                boxShadow: '0 4px 20px rgba(139,90,43,0.06)',
              }}
            >
              <div className="flex items-start gap-4">
                {basket.emoji.startsWith('data:image') || basket.emoji.startsWith('http') ? (
                  <img
                    src={basket.emoji}
                    alt={basket.title}
                    className="w-12 h-12 object-cover rounded-xl"
                  />
                ) : (
                  <span className="text-4xl">{basket.emoji}</span>
                )}
                <div className="flex-1 min-w-0">
                  <h3
                    className="font-bold text-lg font-playfair truncate"
                    style={{ color: '#1a2e17' }}
                  >
                    {basket.title}
                  </h3>
                  <p className="text-xs truncate mt-0.5" style={{ color: '#8b5a2b' }}>
                    {basket.subtitle}
                  </p>
                </div>
              </div>

              {/* Ingredients list */}
              <div
                className="mt-4 rounded-2xl p-4 space-y-1.5 h-36 overflow-y-auto"
                style={{ backgroundColor: '#fbf9f4' }}
              >
                {ingredients.length > 0 ? (
                  ingredients.map((ing, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs" style={{ color: '#4b5563' }}>
                      <span style={{ color: '#2d5a27' }}>✓</span>
                      {ing}
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-gray-400 italic">Səbət boşdur</p>
                )}
              </div>

              <div className="flex items-center justify-between mt-5">
                <span
                  className="text-xs font-semibold"
                  style={{ color: '#8b5a2b' }}
                >
                  {basket.totalLabel}
                </span>

                <button
                  onClick={() => handleAdd(basket.id, basket.items)}
                  disabled={isAdded}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-xs text-white transition-all hover:scale-105 active:scale-95 shadow-sm"
                  style={{
                    backgroundColor: isAdded ? '#2d5a27' : '#8b5a2b',
                    opacity: isAdded ? 0.9 : 1,
                    boxShadow: '0 4px 10px rgba(139,90,43,0.18)',
                  }}
                >
                  {isAdded ? (
                    <>
                      <CheckCircle size={13} />
                      Əlavə Edildi!
                    </>
                  ) : (
                    <>
                      <ShoppingBasket size={13} />
                      Səbəti Al
                    </>
                  )}
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
