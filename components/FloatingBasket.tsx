'use client'

import { useState } from 'react'
import { Trash2, ShoppingBasket, Plus, Minus, X, ChevronUp, ChevronDown, CheckCircle, MapPin, Phone } from 'lucide-react'
import { CartItem, Product, getStoredOrders, setStoredOrders, Order } from '@/lib/data'

interface FloatingBasketProps {
  cart: CartItem[]
  onUpdateQty: (p: Product, qty: number) => void
  onClear: () => void
}

function formatQty(qty: number, unit: string): string {
  if (unit === 'ədəd') return `${Math.round(qty)} ədəd`
  return `${qty % 1 === 0 ? qty.toFixed(0) : qty.toFixed(1)} ${unit}`
}

export default function FloatingBasket({ cart, onUpdateQty, onClear }: FloatingBasketProps) {
  const [open, setOpen] = useState(false)
  const [showCheckout, setShowCheckout] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  // Form states
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [phone, setPhone] = useState('')
  const [deliveryMethod, setDeliveryMethod] = useState<'delivery' | 'bus'>('delivery')

  const totalItemsPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0)
  const deliveryCost = deliveryMethod === 'delivery' ? 3 : 0
  const finalTotal = totalItemsPrice + deliveryCost
  const hasItems = cart.length > 0

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !surname || !phone) return

    // Format items
    const itemsDescription = cart.map(i => `${i.title} (${formatQty(i.qty, i.unit)})`).join(', ')

    // Build order object
    const newOrder: Order = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: name,
      customerSurname: surname,
      phone: phone,
      date: new Date().toISOString().split('T')[0],
      items: itemsDescription,
      total: finalTotal,
      deliveryMethod: deliveryMethod === 'delivery' ? 'Ünvana (3 AZN)' : 'Avtovağzala (Pulsuz)',
      status: 'Gözləmədə'
    }

    // Save order
    const currentOrders = getStoredOrders()
    setStoredOrders([newOrder, ...currentOrders])

    // Success flow
    setShowCheckout(false)
    setShowSuccess(true)
    onClear()

    // Reset form
    setName('')
    setSurname('')
    setPhone('')
    setDeliveryMethod('delivery')
  }

  return (
    <>
      {/* Overlay for panel */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/25 backdrop-blur-sm md:bg-transparent md:backdrop-blur-none"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Floating Widget & Panel */}
      <div
        id="basket"
        className="fixed bottom-5 right-4 sm:right-6 z-50 flex flex-col items-end gap-3"
      >
        {/* Expanded cart panel */}
        {open && !showCheckout && (
          <div
            className="w-80 sm:w-96 rounded-3xl shadow-2xl overflow-hidden border transition-all"
            style={{
              backgroundColor: 'white',
              borderColor: 'rgba(45,90,39,0.18)',
              boxShadow: '0 20px 60px rgba(45,90,39,0.22)',
              animation: 'fadeInUp 0.3s ease',
            }}
          >
            {/* Panel Header */}
            <div
              className="flex items-center justify-between px-5 py-4"
              style={{
                background: 'linear-gradient(135deg, #2d5a27, #3d7a34)',
              }}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">🧺</span>
                <div>
                  <h3 className="font-bold text-white text-base">Hörmə Səbət</h3>
                  <p className="text-xs text-white/70">
                    {hasItems ? `${cart.length} növ məhsul` : 'Səbətiniz boşdur'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
                aria-label="Bağla"
              >
                <X size={18} />
              </button>
            </div>

            {/* Cart Items list */}
            <div className="max-h-72 overflow-y-auto">
              {!hasItems ? (
                <div className="py-12 text-center">
                  <div className="text-4xl mb-2">🛒</div>
                  <p className="text-sm font-medium text-gray-500">Səbətiniz boşdur</p>
                  <p className="text-xs text-gray-400 mt-1">Məhsul əlavə etmək üçün yuxarı sürüşün</p>
                </div>
              ) : (
                <ul className="divide-y divide-green-deep/5">
                  {cart.map((item) => (
                    <li key={item.id} className="px-5 py-3.5 flex items-center gap-3">
                      {item.emoji.startsWith('data:image') || item.emoji.startsWith('http') ? (
                        <img
                          src={item.emoji}
                          alt={item.title}
                          className="w-10 h-10 object-cover rounded-lg flex-shrink-0"
                        />
                      ) : (
                        <span className="text-2xl flex-shrink-0">{item.emoji}</span>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-gray-800 truncate">
                          {item.title}
                        </p>
                        <p className="text-xs font-bold text-brown font-playfair">
                          {(item.price * item.qty).toFixed(2)} AZN
                        </p>
                      </div>

                      {/* Item quantity controls */}
                      <div
                        className="flex items-center rounded-xl overflow-hidden border border-green-deep/20"
                      >
                        <button
                          onClick={() => onUpdateQty(item, item.qty - item.step)}
                          className="px-2 py-1.5 hover:bg-red-50 transition-colors"
                          style={{ color: '#dc2626' }}
                        >
                          <Minus size={11} strokeWidth={2.5} />
                        </button>
                        <span
                          className="px-2 text-xs font-bold min-w-[48px] text-center text-green-deep bg-green-pale"
                        >
                          {formatQty(item.qty, item.unit)}
                        </span>
                        <button
                          onClick={() => onUpdateQty(item, item.qty + item.step)}
                          className="px-2 py-1.5 hover:bg-green-50 transition-colors"
                          style={{ color: '#2d5a27' }}
                        >
                          <Plus size={11} strokeWidth={2.5} />
                        </button>
                      </div>

                      <button
                        onClick={() => onUpdateQty(item, 0)}
                        className="flex-shrink-0 p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors"
                        aria-label="Sil"
                      >
                        <Trash2 size={13} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Panel Footer */}
            {hasItems && (
              <div
                className="px-5 py-4 border-t border-green-deep/10 bg-cream"
              >
                <div className="flex items-center justify-between mb-3.5">
                  <span className="text-sm font-medium text-gray-500">Məhsul məbləği</span>
                  <span
                    className="text-lg font-bold text-brown font-playfair"
                  >
                    {totalItemsPrice.toFixed(2)} AZN
                  </span>
                </div>
                <button
                  onClick={() => setShowCheckout(true)}
                  className="w-full py-3.5 rounded-2xl font-bold text-sm text-white transition-all hover:opacity-90 active:scale-95 shadow-md"
                  style={{
                    backgroundColor: '#2d5a27',
                    boxShadow: '0 4px 14px rgba(45,90,39,0.30)',
                  }}
                >
                  Sifariş Ver →
                </button>
              </div>
            )}
          </div>
        )}

        {/* Toggle Floating button */}
        <button
          onClick={() => {
            if (showCheckout) {
              setShowCheckout(false)
            } else {
              setOpen((v) => !v)
            }
          }}
          className="relative flex items-center gap-2.5 pl-4 pr-5 py-3.5 rounded-2xl text-white font-bold text-sm transition-all hover:scale-105 active:scale-95 shadow-lg"
          style={{
            background: 'linear-gradient(135deg, #8b5a2b, #a0632f)',
            boxShadow: '0 8px 30px rgba(139,90,43,0.40)',
          }}
        >
          <span className="text-xl">🧺</span>
          <span>{showCheckout ? 'Səbətə Qayıt' : 'Hörmə Səbət'}</span>
          {hasItems && !showCheckout && (
            <span
              className="font-bold text-xs px-2 py-0.5 rounded-full bg-white/20 font-playfair"
            >
              {totalItemsPrice.toFixed(2)} ₼
            </span>
          )}
          {open || showCheckout ? <ChevronDown size={14} /> : <ChevronUp size={14} />}

          {/* Badge count */}
          {hasItems && !showCheckout && (
            <span
              className="absolute -top-2 -right-2 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center text-white bg-green-deep animate-bounce"
            >
              {cart.length}
            </span>
          )}
        </button>
      </div>

      {/* Checkout Form Modal */}
      {showCheckout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div
            className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-green-deep/10 animate-fade-up"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-green-deep text-white">
              <h3 className="font-bold text-base font-playfair flex items-center gap-2">
                <span>🧺</span> Sifarişi Tamamla
              </h3>
              <button onClick={() => setShowCheckout(false)} className="text-white/70 hover:text-white">
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleCheckoutSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Adınız</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none text-sm focus:border-green-deep"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Soyadınız</label>
                  <input
                    type="text"
                    required
                    value={surname}
                    onChange={e => setSurname(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none text-sm focus:border-green-deep"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Əlaqə nömrəsi</label>
                <input
                  type="tel"
                  required
                  placeholder="Məs. 050 123 45 67"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none text-sm focus:border-green-deep"
                />
              </div>

              {/* Delivery Methods selection */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-2">Çatdırılma Üsulu</label>
                <div className="space-y-2">
                  <label
                    className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                      deliveryMethod === 'delivery'
                        ? 'border-green-deep bg-green-pale/40'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="delivery"
                        checked={deliveryMethod === 'delivery'}
                        onChange={() => setDeliveryMethod('delivery')}
                        className="text-green-deep focus:ring-green-deep"
                      />
                      <div>
                        <p className="text-sm font-semibold text-gray-800">Ünvana Çatdırılma</p>
                        <p className="text-[11px] text-gray-400 mt-0.5">Bakı və Tovuz daxili qapıya təslim</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-brown font-playfair">+3.00 AZN</span>
                  </label>

                  <label
                    className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                      deliveryMethod === 'bus'
                        ? 'border-green-deep bg-green-pale/40'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="delivery"
                        checked={deliveryMethod === 'bus'}
                        onChange={() => setDeliveryMethod('bus')}
                        className="text-green-deep focus:ring-green-deep"
                      />
                      <div>
                        <p className="text-sm font-semibold text-gray-800">Avtovağzala Çatdırılma</p>
                        <p className="text-[11px] text-gray-400 mt-0.5">Bakı Avtovağzalı (sürücü ilə)</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-green-deep font-playfair">PULSUZ</span>
                  </label>
                </div>
              </div>

              {/* Total Billing */}
              <div className="bg-cream p-4 rounded-2xl border border-green-deep/5 space-y-2">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Məhsullar:</span>
                  <span className="font-bold font-playfair">{totalItemsPrice.toFixed(2)} AZN</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Çatdırılma haqqı:</span>
                  <span className="font-bold font-playfair">{deliveryCost > 0 ? `${deliveryCost.toFixed(2)} AZN` : 'Pulsuz'}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-green-deep pt-2 border-t border-green-deep/10">
                  <span>Cəmi Ödəniləcək:</span>
                  <span className="text-brown font-playfair text-base">{finalTotal.toFixed(2)} AZN</span>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 justify-end pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowCheckout(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-500 hover:bg-gray-50"
                >
                  Geri Qayıt
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-green-deep hover:bg-green-hover transition-all shadow-sm active:scale-95"
                >
                  Sifarişi Təsdiqlə
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-6 text-center border border-green-deep/10 animate-fade-up">
            <div className="w-16 h-16 rounded-full bg-green-pale flex items-center justify-center text-green-deep mx-auto mb-4">
              <CheckCircle size={36} />
            </div>
            <h3 className="font-bold text-lg text-green-deep font-playfair">Sifarişiniz Qəbul Olundu!</h3>
            <p className="text-xs text-gray-500 mt-2 leading-relaxed">
              Təşəkkür edirik! Sifarişiniz uğurla qeydə alındı. Qısa zamanda sizinlə əlaqə saxlayacağıq.
            </p>
            <button
              onClick={() => setShowSuccess(false)}
              className="mt-6 w-full py-2.5 bg-green-deep text-white font-bold text-xs rounded-xl shadow-sm hover:bg-green-hover transition-colors"
            >
              Əla, Bağla
            </button>
          </div>
        </div>
      )}
    </>
  )
}
