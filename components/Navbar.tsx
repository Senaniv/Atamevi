'use client'

import { ShoppingBasket, Leaf, Menu, X } from 'lucide-react'
import { useState } from 'react'

interface NavbarProps {
  cartCount: number
}

export default function Navbar({ cartCount }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { label: 'Məhsullar', href: '#products' },
    { label: 'Hazır Səbətlər', href: '#baskets' },
    { label: 'Blog', href: '#blog' },
    { label: 'FAQ', href: '#faq' },
  ]

  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-md border-b"
      style={{
        backgroundColor: 'rgba(251,249,244,0.92)',
        borderColor: 'rgba(45,90,39,0.12)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform"
              style={{ backgroundColor: '#2d5a27' }}
            >
              <Leaf size={18} color="white" strokeWidth={2.5} />
            </div>
            <span
              className="font-bold text-xl tracking-tight"
              style={{ fontFamily: "'Playfair Display', serif", color: '#2d5a27' }}
            >
              Atam Evi
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-sm font-medium transition-colors hover:opacity-70"
                style={{ color: '#2d5a27' }}
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Desktop WhatsApp Contact */}
            <a
              href="https://wa.me/994706774407"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all hover:bg-green-pale border"
              style={{ color: '#2d5a27', borderColor: 'rgba(45,90,39,0.2)' }}
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.456L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.967C16.58 1.973 14.108.95 11.482.95c-5.442 0-9.866 4.372-9.87 9.802 0 1.714.464 3.393 1.346 4.869L1.936 21.05l5.711-1.896zm10.74-4.834c-.267-.134-1.58-.779-1.825-.867-.245-.089-.423-.134-.601.134-.178.267-.69.867-.846 1.046-.156.178-.312.2-.579.067-.267-.134-1.127-.416-2.147-1.326-.793-.707-1.328-1.58-1.484-1.847-.156-.267-.017-.411.117-.544.121-.12.267-.312.4-.467.134-.156.178-.267.267-.446.089-.178.045-.334-.022-.468-.067-.134-.601-1.446-.823-1.98-.217-.523-.456-.452-.624-.46l-.53-.009c-.183 0-.482.069-.734.343-.252.275-.963.94-.963 2.292 0 1.353.984 2.659 1.12 2.838.138.178 1.936 2.956 4.69 4.148.655.283 1.166.452 1.564.579.66.21 1.26.18 1.733.11.528-.078 1.58-.646 1.802-1.27.223-.624.223-1.157.156-1.27-.067-.11-.245-.2-.512-.334z" />
              </svg>
              <span>070 677 44 07</span>
            </a>

            <a
              href="#basket"
              className="relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95 shadow-sm"
              style={{ backgroundColor: '#8b5a2b' }}
            >
              <ShoppingBasket size={16} />
              <span className="hidden sm:inline">Səbət</span>
              {cartCount > 0 && (
                <span
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center text-white"
                  style={{ backgroundColor: '#2d5a27' }}
                >
                  {cartCount > 99 ? '99+' : Math.floor(cartCount)}
                </span>
              )}
            </a>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 rounded-lg"
              style={{ color: '#2d5a27' }}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Menü"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {menuOpen && (
          <div className="md:hidden pb-4 pt-2 border-t" style={{ borderColor: 'rgba(45,90,39,0.10)' }}>
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="block py-2.5 text-sm font-medium"
                style={{ color: '#2d5a27' }}
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}
