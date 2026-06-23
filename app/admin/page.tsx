'use client'

import { useState, useEffect } from 'react'
import {
  TrendingUp,
  ShoppingBag,
  Plus,
  Trash2,
  Edit2,
  CheckCircle,
  Clock,
  Truck,
  ArrowLeft,
  FolderOpen,
  DollarSign,
  X,
  Layers,
  Image as ImageIcon
} from 'lucide-react'
import Link from 'next/link'
import {
  Product,
  ReadyBasketDef,
  getStoredProducts,
  setStoredProducts,
  getStoredBaskets,
  setStoredBaskets,
  getStoredOrders,
  setStoredOrders,
  Order,
  Unit
} from '@/lib/data'

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<'stats' | 'products' | 'baskets' | 'orders'>('stats')
  const [products, setProducts] = useState<Product[]>([])
  const [baskets, setBaskets] = useState<ReadyBasketDef[]>([])
  const [orders, setOrders] = useState<Order[]>([])

  // Load from local storage
  useEffect(() => {
    setProducts(getStoredProducts())
    setBaskets(getStoredBaskets())
    setOrders(getStoredOrders())

    const handleProductsChange = () => setProducts(getStoredProducts())
    const handleBasketsChange = () => setBaskets(getStoredBaskets())
    const handleOrdersChange = () => setOrders(getStoredOrders())

    window.addEventListener('atam_products_change', handleProductsChange)
    window.addEventListener('atam_baskets_change', handleBasketsChange)
    window.addEventListener('atam_orders_change', handleOrdersChange)

    return () => {
      window.removeEventListener('atam_products_change', handleProductsChange)
      window.removeEventListener('atam_baskets_change', handleBasketsChange)
      window.removeEventListener('atam_orders_change', handleOrdersChange)
    }
  }, [])

  // 1. PRODUCT FORM STATES
  const [showProductModal, setShowProductModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [formTitle, setFormTitle] = useState('')
  const [formCategory, setFormCategory] = useState('Süd Məhsulları')
  const [formPrice, setFormPrice] = useState('')
  const [formUnit, setFormUnit] = useState<Unit>('ədəd')
  const [formStep, setFormStep] = useState('1')
  const [formEmoji, setFormEmoji] = useState('🥚') // can be emoji or base64 image
  const [formDesc, setFormDesc] = useState('')
  const [formTag, setFormTag] = useState('')

  // 2. BASKET FORM STATES
  const [showBasketModal, setShowBasketModal] = useState(false)
  const [editingBasket, setEditingBasket] = useState<ReadyBasketDef | null>(null)
  const [basketTitle, setBasketTitle] = useState('')
  const [basketSubtitle, setBasketSubtitle] = useState('')
  const [basketEmoji, setBasketEmoji] = useState('🧺')
  const [basketItems, setBasketItems] = useState<{ productId: string; qty: number }[]>([])
  const [basketTotalLabel, setBasketTotalLabel] = useState('≈ 30 AZN')

  // Calculate totals
  const totalSales = orders.reduce((sum, o) => sum + o.total, 0)
  const pendingOrders = orders.filter(o => o.status === 'Gözləmədə').length
  const totalProducts = products.length

  // File Upload Helper to convert image file to Base64 string
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, isBasket: boolean = false) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        if (isBasket) {
          setBasketEmoji(reader.result)
        } else {
          setFormEmoji(reader.result)
        }
      }
    }
    reader.readAsDataURL(file)
  }

  // Save Product
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formTitle || !formPrice) return

    const priceNum = parseFloat(formPrice)
    const stepNum = parseFloat(formStep)

    let updatedProducts: Product[]
    if (editingProduct) {
      updatedProducts = products.map(p => p.id === editingProduct.id ? {
        ...p,
        title: formTitle,
        category: formCategory,
        price: priceNum,
        unit: formUnit,
        step: stepNum,
        emoji: formEmoji,
        description: formDesc,
        tag: formTag || undefined
      } : p)
    } else {
      const newProduct: Product = {
        id: `prod-${Date.now()}`,
        title: formTitle,
        category: formCategory,
        price: priceNum,
        unit: formUnit,
        step: stepNum,
        emoji: formEmoji,
        description: formDesc,
        tag: formTag || undefined
      }
      updatedProducts = [newProduct, ...products]
    }

    setProducts(updatedProducts)
    setStoredProducts(updatedProducts)
    closeProductModal()
  }

  const openEditProductModal = (p: Product) => {
    setEditingProduct(p)
    setFormTitle(p.title)
    setFormCategory(p.category)
    setFormPrice(p.price.toString())
    setFormUnit(p.unit)
    setFormStep(p.step.toString())
    setFormEmoji(p.emoji)
    setFormDesc(p.description)
    setFormTag(p.tag || '')
    setShowProductModal(true)
  }

  const openAddProductModal = () => {
    setEditingProduct(null)
    setFormTitle('')
    setFormCategory('Süd Məhsulları')
    setFormPrice('')
    setFormUnit('ədəd')
    setFormStep('1')
    setFormEmoji('🥚')
    setFormDesc('')
    setFormTag('')
    setShowProductModal(true)
  }

  const closeProductModal = () => {
    setShowProductModal(false)
    setEditingProduct(null)
  }

  const handleDeleteProduct = (id: string) => {
    if (confirm('Bu məhsulu silmək istədiyinizdən əminsiniz?')) {
      const updated = products.filter(p => p.id !== id)
      setProducts(updated)
      setStoredProducts(updated)
    }
  }

  // Save Basket
  const handleSaveBasket = (e: React.FormEvent) => {
    e.preventDefault()
    if (!basketTitle) return

    let updatedBaskets: ReadyBasketDef[]
    if (editingBasket) {
      updatedBaskets = baskets.map(b => b.id === editingBasket.id ? {
        ...b,
        title: basketTitle,
        subtitle: basketSubtitle,
        emoji: basketEmoji,
        items: basketItems,
        totalLabel: basketTotalLabel
      } : b)
    } else {
      const newBasket: ReadyBasketDef = {
        id: `basket-${Date.now()}`,
        title: basketTitle,
        subtitle: basketSubtitle,
        emoji: basketEmoji,
        items: basketItems,
        totalLabel: basketTotalLabel
      }
      updatedBaskets = [...baskets, newBasket]
    }

    setBaskets(updatedBaskets)
    setStoredBaskets(updatedBaskets)
    closeBasketModal()
  }

  const openAddBasketModal = () => {
    setEditingBasket(null)
    setBasketTitle('')
    setBasketSubtitle('')
    setBasketEmoji('🧺')
    setBasketItems([])
    setBasketTotalLabel('≈ 30 AZN dəyərindədir')
    setShowBasketModal(true)
  }

  const openEditBasketModal = (b: ReadyBasketDef) => {
    setEditingBasket(b)
    setBasketTitle(b.title)
    setBasketSubtitle(b.subtitle)
    setBasketEmoji(b.emoji)
    setBasketItems(b.items)
    setBasketTotalLabel(b.totalLabel)
    setShowBasketModal(true)
  }

  const closeBasketModal = () => {
    setShowBasketModal(false)
    setEditingBasket(null)
  }

  const handleDeleteBasket = (id: string) => {
    if (confirm('Bu səbəti silmək istədiyinizdən əminsiniz?')) {
      const updated = baskets.filter(b => b.id !== id)
      setBaskets(updated)
      setStoredBaskets(updated)
    }
  }

  // Add item input row inside basket form
  const addBasketItemRow = () => {
    if (products.length === 0) return
    setBasketItems(prev => [...prev, { productId: products[0].id, qty: 1 }])
  }

  const updateBasketItemRow = (index: number, productId: string, qty: number) => {
    setBasketItems(prev => prev.map((item, i) => i === index ? { productId, qty: Math.max(0.1, qty) } : item))
  }

  const removeBasketItemRow = (index: number) => {
    setBasketItems(prev => prev.filter((_, i) => i !== index))
  }

  // Update order status
  const handleUpdateOrderStatus = (orderId: string, newStatus: string) => {
    const updated = orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o)
    setOrders(updated)
    setStoredOrders(updated)
  }

  return (
    <div className="min-h-screen bg-cream flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-green-deep/10 p-6 flex flex-col justify-between flex-shrink-0">
        <div>
          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-green-deep flex items-center justify-center">
              <span className="text-white text-xs font-bold">🌾</span>
            </div>
            <span className="font-bold text-lg font-playfair text-green-deep">Atam Evi</span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-brown-light text-brown">ADMIN</span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab('stats')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'stats'
                  ? 'bg-green-deep text-white shadow-sm'
                  : 'text-green-deep hover:bg-green-pale'
              }`}
            >
              <TrendingUp size={16} />
              Statistika
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'products'
                  ? 'bg-green-deep text-white shadow-sm'
                  : 'text-green-deep hover:bg-green-pale'
              }`}
            >
              <FolderOpen size={16} />
              Məhsulları İdarə Et
            </button>
            <button
              onClick={() => setActiveTab('baskets')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'baskets'
                  ? 'bg-green-deep text-white shadow-sm'
                  : 'text-green-deep hover:bg-green-pale'
              }`}
            >
              <Layers size={16} />
              Hazır Səbətlər
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'orders'
                  ? 'bg-green-deep text-white shadow-sm'
                  : 'text-green-deep hover:bg-green-pale'
              }`}
            >
              <ShoppingBag size={16} />
              Sifarişlər
              {pendingOrders > 0 && (
                <span className="ml-auto w-5 h-5 rounded-full bg-brown text-white text-[10px] flex items-center justify-center font-bold">
                  {pendingOrders}
                </span>
              )}
            </button>
          </nav>
        </div>

        {/* Return link */}
        <div className="mt-8 pt-4 border-t border-green-deep/10">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-semibold text-brown hover:text-brown-mid transition-colors"
          >
            <ArrowLeft size={16} />
            Mağazaya Qayıt
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 md:p-10 max-w-7xl">
        <header className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold font-playfair text-green-deep">
              {activeTab === 'stats' && 'Ümumi Panel'}
              {activeTab === 'products' && 'Məhsulların İdarə Edilməsi'}
              {activeTab === 'baskets' && 'Hazır Səbətlərin İdarə Edilməsi'}
              {activeTab === 'orders' && 'Sifariş Siyahısı'}
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Tovuz kənd təsərrüfatı mağazasının idarəetmə konsolu
            </p>
          </div>

          {activeTab === 'products' && (
            <button
              onClick={openAddProductModal}
              className="inline-flex items-center gap-2 bg-green-deep text-white font-semibold text-sm px-4 py-2.5 rounded-xl shadow-sm hover:bg-green-hover transition-colors active:scale-95"
            >
              <Plus size={16} />
              Yeni Məhsul Əlavə Et
            </button>
          )}

          {activeTab === 'baskets' && (
            <button
              onClick={openAddBasketModal}
              className="inline-flex items-center gap-2 bg-green-deep text-white font-semibold text-sm px-4 py-2.5 rounded-xl shadow-sm hover:bg-green-hover transition-colors active:scale-95"
            >
              <Plus size={16} />
              Yeni Səbət Yığ
            </button>
          )}
        </header>

        {/* 1. STATS TAB */}
        {activeTab === 'stats' && (
          <div className="space-y-8 animate-fade-up">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-3xl border border-green-deep/10 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-green-pale flex items-center justify-center text-green-deep">
                  <DollarSign size={24} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">Ümumi Satış</p>
                  <p className="text-2xl font-bold text-green-deep font-playfair mt-0.5">{totalSales.toFixed(2)} AZN</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-green-deep/10 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-brown-light flex items-center justify-center text-brown">
                  <ShoppingBag size={24} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">Gözləyən Sifariş</p>
                  <p className="text-2xl font-bold text-brown font-playfair mt-0.5">{pendingOrders} ədəd</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-green-deep/10 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-700">
                  <FolderOpen size={24} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">Aktiv Məhsul</p>
                  <p className="text-2xl font-bold text-emerald-800 font-playfair mt-0.5">{totalProducts} növ</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-green-deep/10 shadow-sm">
                <h3 className="font-bold text-green-deep font-playfair mb-4 text-base">Həftəlik Satış Qrafiki</h3>
                <div className="h-60 flex items-end gap-3 pt-6 border-b border-gray-100">
                  {[45, 80, 55, 95, 120, totalSales].map((val, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                      <div className="text-[10px] font-bold text-brown opacity-0 group-hover:opacity-100 transition-opacity">
                        {val.toFixed(1)}₼
                      </div>
                      <div
                        className="w-full rounded-t-lg bg-green-deep/80 group-hover:bg-green-deep transition-all"
                        style={{ height: `${Math.min(100, (val / 200) * 100)}%`, minHeight: '10%' }}
                      />
                      <span className="text-[10px] text-gray-400 mt-1">Gündəlik {idx + 18} iyn</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-green-deep/10 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-green-deep font-playfair mb-4 text-base">Əlaqə & Dəstək</h3>
                  <div className="space-y-4">
                    <div className="p-3.5 rounded-2xl bg-green-pale/50 border border-green-deep/5">
                      <p className="text-xs font-semibold text-green-deep">Araz Həsənov</p>
                      <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">&ldquo;Sifarişlərimi Bakıda hansı ünvandan təhvil ala bilərəm? Çatdırılma saatları necədir?&rdquo;</p>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-brown-light/20 border border-brown/5">
                      <p className="text-xs font-semibold text-brown">Validə M. (Rəy)</p>
                      <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">&ldquo;Nehrə yağı çox dadlı idi, uşaqlar çox bəyəndi. Təşəkkürlər Atam Evi ailəsi!&rdquo;</p>
                    </div>
                  </div>
                </div>
                <button className="w-full text-center py-2 text-xs font-semibold text-green-deep hover:underline mt-4">
                  Bütün rəyləri oxu
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 2. PRODUCTS TAB */}
        {activeTab === 'products' && (
          <div className="bg-white rounded-3xl border border-green-deep/10 shadow-sm overflow-hidden animate-fade-up">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-green-deep/10 bg-green-pale/35">
                    <th className="px-6 py-4 text-xs font-bold text-green-deep uppercase tracking-wider">Məhsul</th>
                    <th className="px-6 py-4 text-xs font-bold text-green-deep uppercase tracking-wider">Kateqoriya</th>
                    <th className="px-6 py-4 text-xs font-bold text-green-deep uppercase tracking-wider">Qiymət</th>
                    <th className="px-6 py-4 text-xs font-bold text-green-deep uppercase tracking-wider">Addım</th>
                    <th className="px-6 py-4 text-xs font-bold text-green-deep uppercase tracking-wider text-right">Əməliyyatlar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-green-deep/5">
                  {products.map(p => (
                    <tr key={p.id} className="hover:bg-green-pale/10 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {p.emoji.startsWith('data:image') || p.emoji.startsWith('http') ? (
                            <img src={p.emoji} alt={p.title} className="w-10 h-10 object-cover rounded-lg border" />
                          ) : (
                            <span className="text-2xl">{p.emoji}</span>
                          )}
                          <div>
                            <p className="font-semibold text-sm text-gray-800">{p.title}</p>
                            {p.tag && (
                              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-brown-light text-brown mt-0.5 inline-block">
                                {p.tag}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">{p.category}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-brown">{p.price.toFixed(2)} AZN / {p.unit}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{p.step} {p.unit}</td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button
                          onClick={() => openEditProductModal(p)}
                          className="inline-flex p-2 rounded-lg hover:bg-green-pale text-green-deep transition-colors"
                          title="Düzəliş Et"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(p.id)}
                          className="inline-flex p-2 rounded-lg hover:bg-red-50 text-red-600 transition-colors"
                          title="Sil"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 3. READY BASKETS TAB */}
        {activeTab === 'baskets' && (
          <div className="bg-white rounded-3xl border border-green-deep/10 shadow-sm overflow-hidden animate-fade-up">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-green-deep/10 bg-green-pale/35">
                    <th className="px-6 py-4 text-xs font-bold text-green-deep uppercase tracking-wider">Səbət</th>
                    <th className="px-6 py-4 text-xs font-bold text-green-deep uppercase tracking-wider">Açıqlama</th>
                    <th className="px-6 py-4 text-xs font-bold text-green-deep uppercase tracking-wider">Tərkibindəki Məhsullar</th>
                    <th className="px-6 py-4 text-xs font-bold text-green-deep uppercase tracking-wider">Qiymət Dəyəri</th>
                    <th className="px-6 py-4 text-xs font-bold text-green-deep uppercase tracking-wider text-right">Əməliyyatlar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-green-deep/5">
                  {baskets.map(b => (
                    <tr key={b.id} className="hover:bg-green-pale/10 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {b.emoji.startsWith('data:image') || b.emoji.startsWith('http') ? (
                            <img src={b.emoji} alt={b.title} className="w-10 h-10 object-cover rounded-lg border" />
                          ) : (
                            <span className="text-2xl">{b.emoji}</span>
                          )}
                          <p className="font-semibold text-sm text-gray-800">{b.title}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">{b.subtitle}</td>
                      <td className="px-6 py-4 text-xs text-gray-500">
                        <div className="max-w-xs truncate">
                          {b.items.map(i => {
                            const p = products.find(x => x.id === i.productId)
                            return p ? `${p.title} (${i.qty} ${p.unit})` : ''
                          }).filter(Boolean).join(', ')}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-brown">{b.totalLabel}</td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button
                          onClick={() => openEditBasketModal(b)}
                          className="inline-flex p-2 rounded-lg hover:bg-green-pale text-green-deep transition-colors"
                          title="Səbəti Redaktə Et"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteBasket(b.id)}
                          className="inline-flex p-2 rounded-lg hover:bg-red-50 text-red-600 transition-colors"
                          title="Sil"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 4. ORDERS TAB */}
        {activeTab === 'orders' && (
          <div className="space-y-4 animate-fade-up">
            {orders.map(order => (
              <div
                key={order.id}
                className="bg-white rounded-3xl p-6 border border-green-deep/10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-green-pale text-green-deep">
                      {order.id}
                    </span>
                    <span className="text-xs text-gray-400 font-medium">{order.date}</span>
                    {order.status === 'Gözləmədə' && (
                      <span className="flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-yellow-50 text-yellow-600">
                        <Clock size={11} /> Gözləmədə
                      </span>
                    )}
                    {order.status === 'Yoldadır' && (
                      <span className="flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-600">
                        <Truck size={11} /> Yoldadır
                      </span>
                    )}
                    {order.status === 'Çatdırıldı' && (
                      <span className="flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-green-50 text-green-600">
                        <CheckCircle size={11} /> Çatdırıldı
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="font-semibold text-sm text-gray-800">
                      Müştəri: {order.customerName} {order.customerSurname} ({order.phone})
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      <strong>Üsul:</strong> {order.deliveryMethod}
                    </p>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                      <strong>Məhsullar:</strong> {order.items}
                    </p>
                  </div>
                </div>

                <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-4">
                  <div className="text-right">
                    <p className="text-xs text-gray-400 font-medium">Toplam Məbləğ</p>
                    <p className="text-lg font-bold text-brown font-playfair mt-0.5">
                      {order.total.toFixed(2)} AZN
                    </p>
                  </div>

                  <div className="flex gap-2">
                    {order.status !== 'Yoldadır' && order.status !== 'Çatdırıldı' && (
                      <button
                        onClick={() => handleUpdateOrderStatus(order.id, 'Yoldadır')}
                        className="text-xs font-semibold px-3 py-1.5 rounded-xl border border-blue-600/30 text-blue-600 hover:bg-blue-50 transition-colors"
                      >
                        Yola Sal
                      </button>
                    )}
                    {order.status !== 'Çatdırıldı' && (
                      <button
                        onClick={() => handleUpdateOrderStatus(order.id, 'Çatdırıldı')}
                        className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-green-deep text-white hover:bg-green-hover transition-colors"
                      >
                        Tamamla
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Product Add / Edit Modal */}
      {showProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-green-deep/10">
            <div className="flex items-center justify-between px-6 py-4 bg-green-deep text-white">
              <h3 className="font-bold text-base font-playfair">
                {editingProduct ? 'Məhsulu Redaktə Et' : 'Yeni Məhsul Əlavə Et'}
              </h3>
              <button onClick={closeProductModal} className="text-white/70 hover:text-white transition-opacity">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Məhsulun Adı</label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={e => setFormTitle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none text-sm focus:border-green-deep"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Kateqoriya</label>
                  <select
                    value={formCategory}
                    onChange={e => setFormCategory(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 outline-none text-sm focus:border-green-deep bg-white"
                  >
                    <option value="Süd Məhsulları">Süd Məhsulları</option>
                    <option value="Süd-Yumurta">Süd-Yumurta</option>
                    <option value="Ət Məhsulları">Ət Məhsulları</option>
                    <option value="Bal-Mum">Bal-Mum</option>
                    <option value="Quru Meyvə">Quru Meyvə</option>
                    <option value="Tərəvəz">Tərəvəz</option>
                    <option value="Meyvə">Meyvə</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Qiymət (AZN)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formPrice}
                    onChange={e => setFormPrice(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none text-sm focus:border-green-deep"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Ölçü Vahidi</label>
                  <select
                    value={formUnit}
                    onChange={e => setFormUnit(e.target.value as Unit)}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 outline-none text-sm focus:border-green-deep bg-white"
                  >
                    <option value="ədəd">ədəd</option>
                    <option value="l">litr (l)</option>
                    <option value="kq">kiloqram (kq)</option>
                    <option value="şüşə">şüşə</option>
                    <option value="dəstə">dəstə</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Artım Addımı</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={formStep}
                    onChange={e => setFormStep(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none text-sm focus:border-green-deep"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Məhsul Rəsmi (Cihazdan yükləyin)</label>
                  <div className="flex items-center gap-3">
                    <label className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-dashed border-gray-300 hover:bg-gray-50 cursor-pointer text-xs font-medium text-gray-600 transition-colors">
                      <ImageIcon size={16} />
                      Şəkil Seçin
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                    {formEmoji && (
                      <div className="w-12 h-12 rounded-xl border flex items-center justify-center overflow-hidden bg-gray-50">
                        {formEmoji.startsWith('data:image') || formEmoji.startsWith('http') ? (
                          <img src={formEmoji} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-2xl">{formEmoji}</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Məhsul Etiketi</label>
                  <input
                    type="text"
                    value={formTag}
                    placeholder="Məs. Organik, Nadir"
                    onChange={e => setFormTag(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none text-sm focus:border-green-deep"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Təsviri / Detallar</label>
                <textarea
                  rows={2}
                  value={formDesc}
                  onChange={e => setFormDesc(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none text-sm focus:border-green-deep resize-none"
                />
              </div>

              <div className="flex gap-3 justify-end pt-4 border-t border-gray-100">
                <button type="button" onClick={closeProductModal} className="px-4 py-2 rounded-xl text-xs text-gray-500 hover:bg-gray-50">Ləğv Et</button>
                <button type="submit" className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-green-deep hover:bg-green-hover transition-colors">Yadda Saxla</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Ready Basket Add / Edit Modal */}
      {showBasketModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-green-deep/10">
            <div className="flex items-center justify-between px-6 py-4 bg-green-deep text-white">
              <h3 className="font-bold text-base font-playfair">
                {editingBasket ? 'Səbəti Redaktə Et' : 'Yeni Səbət Yığ'}
              </h3>
              <button onClick={closeBasketModal} className="text-white/70 hover:text-white transition-opacity">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveBasket} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Səbətin Adı</label>
                  <input
                    type="text"
                    required
                    value={basketTitle}
                    placeholder="Məs. Xəngəl Səbəti"
                    onChange={e => setBasketTitle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none text-sm focus:border-green-deep"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Səbət Alt Başlığı (Açıqlama)</label>
                  <input
                    type="text"
                    value={basketSubtitle}
                    placeholder="Məs. Mövsümi təbii məhsullar dəsti"
                    onChange={e => setBasketSubtitle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none text-sm focus:border-green-deep"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Səbət Şəkli (Cihazdan yükləyin)</label>
                  <div className="flex items-center gap-3">
                    <label className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-dashed border-gray-300 hover:bg-gray-50 cursor-pointer text-xs font-medium text-gray-600 transition-colors">
                      <ImageIcon size={16} />
                      Şəkil Seçin
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, true)}
                        className="hidden"
                      />
                    </label>
                    {basketEmoji && (
                      <div className="w-12 h-12 rounded-xl border flex items-center justify-center overflow-hidden bg-gray-50">
                        {basketEmoji.startsWith('data:image') || basketEmoji.startsWith('http') ? (
                          <img src={basketEmoji} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-2xl">{basketEmoji}</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Qiymət Dəyəri Etiketi</label>
                  <input
                    type="text"
                    required
                    value={basketTotalLabel}
                    placeholder="Məs. ≈ 30 AZN dəyərindədir"
                    onChange={e => setBasketTotalLabel(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none text-sm focus:border-green-deep"
                  />
                </div>
              </div>

              {/* Basket items list selection */}
              <div className="border-t pt-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold text-green-deep uppercase tracking-wider">Səbətə Daxil Məhsullar</h4>
                  <button
                    type="button"
                    onClick={addBasketItemRow}
                    className="inline-flex items-center gap-1.5 text-[11px] font-bold text-brown hover:underline"
                  >
                    <Plus size={12} /> Məhsul Əlavə Et
                  </button>
                </div>

                {basketItems.length === 0 ? (
                  <p className="text-xs text-gray-400 italic py-2">Səbətin tərkibi hələ boşdur. Yuxarıdakı düymə ilə məhsul əlavə edin.</p>
                ) : (
                  <div className="space-y-3">
                    {basketItems.map((item, idx) => {
                      const p = products.find(x => x.id === item.productId)
                      return (
                        <div key={idx} className="flex gap-2 items-center bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                          <select
                            value={item.productId}
                            onChange={e => updateBasketItemRow(idx, e.target.value, item.qty)}
                            className="flex-1 bg-white border rounded-lg px-2 py-1 text-xs outline-none focus:border-green-deep"
                          >
                            {products.map(prod => (
                              <option key={prod.id} value={prod.id}>{prod.title} ({prod.unit})</option>
                            ))}
                          </select>

                          <div className="flex items-center gap-1.5">
                            <input
                              type="number"
                              step="0.1"
                              value={item.qty}
                              onChange={e => updateBasketItemRow(idx, item.productId, parseFloat(e.target.value) || 1)}
                              className="w-16 bg-white border rounded-lg px-2 py-1 text-xs text-center outline-none focus:border-green-deep"
                            />
                            <span className="text-[11px] text-gray-400 font-semibold min-w-[24px]">
                              {p?.unit || ''}
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeBasketItemRow(idx)}
                            className="text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition-colors"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>

              <div className="flex gap-3 justify-end pt-4 border-t border-gray-100">
                <button type="button" onClick={closeBasketModal} className="px-4 py-2 rounded-xl text-xs text-gray-500 hover:bg-gray-50">Ləğv Et</button>
                <button type="submit" className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-green-deep hover:bg-green-hover transition-colors">Yadda Saxla</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
