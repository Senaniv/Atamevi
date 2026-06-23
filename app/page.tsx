'use client'

import { useState, useMemo, useEffect } from 'react'
import HeroSection from '@/components/HeroSection'
import SearchBar from '@/components/SearchBar'
import ProductGrid from '@/components/ProductGrid'
import ReadyBaskets from '@/components/ReadyBaskets'
import BlogSection from '@/components/BlogSection'
import FAQSection from '@/components/FAQSection'
import FloatingBasket from '@/components/FloatingBasket'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import DeliveryBanner from '@/components/DeliveryBanner'
import AboutSection from '@/components/AboutSection'
import ReviewsSection from '@/components/ReviewsSection'
import {
  CartItem,
  Product,
  ReadyBasketDef,
  getStoredProducts,
  getStoredBaskets
} from '@/lib/data'

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [baskets, setBaskets] = useState<ReadyBasketDef[]>([])
  const [cart, setCart] = useState<CartItem[]>([])
  const [quantities, setQuantities] = useState<Record<string, number>>({})
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  // Load from local storage
  useEffect(() => {
    setProducts(getStoredProducts())
    setBaskets(getStoredBaskets())

    const handleProductsChange = () => setProducts(getStoredProducts())
    const handleBasketsChange = () => setBaskets(getStoredBaskets())

    window.addEventListener('atam_products_change', handleProductsChange)
    window.addEventListener('atam_baskets_change', handleBasketsChange)

    return () => {
      window.removeEventListener('atam_products_change', handleProductsChange)
      window.removeEventListener('atam_baskets_change', handleBasketsChange)
    }
  }, [])

  const filteredProducts = useMemo(() => {
    if (products.length === 0) return []
    
    let list = products

    // Filter by selected category
    if (selectedCategory !== 'all') {
      if (selectedCategory === 'Ət Məhsulları') {
        list = list.filter(p => p.category === 'Ət Məhsulları')
      } else if (selectedCategory === 'Süd') {
        list = list.filter(p => p.category === 'Süd Məhsulları' || p.category === 'Süd-Yumurta')
      } else if (selectedCategory === 'Meyvə') {
        list = list.filter(p => p.category === 'Meyvə')
      } else if (selectedCategory === 'Tərəvəz') {
        list = list.filter(p => p.category === 'Tərəvəz')
      } else if (selectedCategory === 'Çərəz') {
        list = list.filter(p => p.category === 'Quru Meyvə' || p.category === 'Bal-Mum')
      }
    }

    if (!search.trim()) return list
    const q = search.toLowerCase()
    return list.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    )
  }, [search, products, selectedCategory])

  const updateQuantity = (product: Product, qty: number) => {
    const rounded = Math.round(qty * 100) / 100
    setQuantities((prev) => ({ ...prev, [product.id]: Math.max(0, rounded) }))
    setCart((prev) => {
      if (rounded <= 0) return prev.filter((i) => i.id !== product.id)
      const existing = prev.find((i) => i.id === product.id)
      if (existing) return prev.map((i) => (i.id === product.id ? { ...i, qty: rounded } : i))
      return [...prev, { ...product, qty: rounded }]
    })
  }

  const addToCart = (product: Product) => {
    updateQuantity(product, product.step)
  }

  const addBasketToCart = (items: { product: Product; qty: number }[]) => {
    items.forEach(({ product, qty }) => {
      setQuantities((prev) => {
        const cur = prev[product.id] ?? 0
        return { ...prev, [product.id]: cur + qty }
      })
      setCart((prev) => {
        const existing = prev.find((i) => i.id === product.id)
        if (existing) return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + qty } : i))
        return [...prev, { ...product, qty }]
      })
    })
  }

  const handleClearCart = () => {
    setCart([])
    setQuantities({})
  }

  return (
    <main className="min-h-screen">
      <Navbar cartCount={cart.reduce((a, c) => a + c.qty, 0)} />
      <HeroSection productCount={products.length || 9} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <div id="delivery">
          <DeliveryBanner />
        </div>
        <SearchBar value={search} onChange={setSearch} />

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8 mt-2">
          {[
            { id: 'all', label: 'Bütün məhsullar', emoji: '🌾' },
            { id: 'Ət Məhsulları', label: 'Ət məhsulları', emoji: '🥩' },
            { id: 'Süd', label: 'Süd məhsulları', emoji: '🥛' },
            { id: 'Meyvə', label: 'Meyvələr', emoji: '🍒' },
            { id: 'Tərəvəz', label: 'Tərəvəzlər', emoji: '🥔' },
            { id: 'Çərəz', label: 'Çərəz & Bal', emoji: '🍯' },
          ].map((cat) => {
            const isActive = selectedCategory === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 active:scale-95 cursor-pointer border"
                style={{
                  backgroundColor: isActive ? '#2d5a27' : 'white',
                  color: isActive ? 'white' : '#1a2e17',
                  borderColor: isActive ? '#2d5a27' : 'rgba(45,90,39,0.12)',
                  boxShadow: isActive ? '0 4px 12px rgba(45,90,39,0.20)' : 'none',
                }}
              >
                <span>{cat.emoji}</span>
                <span>{cat.label}</span>
              </button>
            )
          })}
        </div>

        <ProductGrid
          products={filteredProducts}
          quantities={quantities}
          onAdd={addToCart}
          onUpdateQty={updateQuantity}
        />
        <ReadyBaskets
          baskets={baskets}
          products={products}
          onAdd={addBasketToCart}
        />
        <AboutSection />
        <BlogSection />
        <ReviewsSection />
        <FAQSection />
      </div>
      <Footer />
      <FloatingBasket cart={cart} onUpdateQty={updateQuantity} onClear={handleClearCart} />
    </main>
  )
}
