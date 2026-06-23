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
    if (!search.trim()) return products
    const q = search.toLowerCase()
    return products.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    )
  }, [search, products])

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
    <main className="min-h-screen" style={{ backgroundColor: '#fbf9f4' }}>
      <Navbar cartCount={cart.reduce((a, c) => a + c.qty, 0)} />
      <HeroSection productCount={products.length || 9} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <DeliveryBanner />
        <SearchBar value={search} onChange={setSearch} />
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
        <FAQSection />
      </div>
      <Footer />
      <FloatingBasket cart={cart} onUpdateQty={updateQuantity} onClear={handleClearCart} />
    </main>
  )
}
