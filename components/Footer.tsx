'use client'

import { Leaf, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer
      className="mt-4"
      style={{
        background: 'linear-gradient(135deg, #1a2e17 0%, #2d5a27 100%)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(255,255,255,0.12)' }}>
                <Leaf size={18} color="white" strokeWidth={2.5} />
              </div>
              <span
                className="font-bold text-xl text-white"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Atam Evi
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.62)' }}>
              Kənd toyuğu yumurtasından tutmuş dağ balına — hər məhsul Tovuz dağlarından birbaşa sizin süfrənizə çatır.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Keçidlər</h4>
            <ul className="space-y-2.5">
              {['Məhsullar', 'Hazır Səbətlər', 'Blog', 'Haqqımızda', 'Əlaqə'].map((l) => (
                <li key={l}>
                  <a
                    href="#"
                    className="text-sm transition-opacity hover:opacity-100"
                    style={{ color: 'rgba(255,255,255,0.60)' }}
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Əlaqə</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:0706774407"
                  className="flex items-center gap-2.5 text-sm hover:text-white transition-colors"
                  style={{ color: 'rgba(255,255,255,0.65)' }}
                >
                  <Phone size={14} />
                  070 677 44 07 (Əlaqə)
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/994706774407"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm hover:text-white transition-colors"
                  style={{ color: 'rgba(255,255,255,0.65)' }}
                >
                  {/* WhatsApp Icon SVG */}
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.456L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.967C16.58 1.973 14.108.95 11.482.95c-5.442 0-9.866 4.372-9.87 9.802 0 1.714.464 3.393 1.346 4.869L1.936 21.05l5.711-1.896zm10.74-4.834c-.267-.134-1.58-.779-1.825-.867-.245-.089-.423-.134-.601.134-.178.267-.69.867-.846 1.046-.156.178-.312.2-.579.067-.267-.134-1.127-.416-2.147-1.326-.793-.707-1.328-1.58-1.484-1.847-.156-.267-.017-.411.117-.544.121-.12.267-.312.4-.467.134-.156.178-.267.267-.446.089-.178.045-.334-.022-.468-.067-.134-.601-1.446-.823-1.98-.217-.523-.456-.452-.624-.46l-.53-.009c-.183 0-.482.069-.734.343-.252.275-.963.94-.963 2.292 0 1.353.984 2.659 1.12 2.838.138.178 1.936 2.956 4.69 4.148.655.283 1.166.452 1.564.579.66.21 1.26.18 1.733.11.528-.078 1.58-.646 1.802-1.27.223-.624.223-1.157.156-1.27-.067-.11-.245-.2-.512-.334z" />
                  </svg>
                  070 677 44 07 (WhatsApp)
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/atam.evi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm hover:text-white transition-colors"
                  style={{ color: 'rgba(255,255,255,0.65)' }}
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                  @atam.evi
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>
                <MapPin size={14} />
                Tovuz rayonu, Azərbaycan
              </li>
            </ul>
          </div>
        </div>

        <div
          className="mt-10 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderColor: 'rgba(255,255,255,0.10)' }}
        >
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.40)' }}>
            © 2026 Atam Evi. Bütün hüquqlar qorunur.
          </p>
          <div className="flex gap-4">
            {['Məxfilik Siyasəti', 'İstifadə Şərtləri'].map((t) => (
              <a key={t} href="#" className="text-xs hover:opacity-100 transition-opacity" style={{ color: 'rgba(255,255,255,0.40)' }}>
                {t}
              </a>
            ))}
          </div>
        </div>

        {/* Pixel Digital Services Special Attribution Bar */}
        <div className="mt-6 pt-4 border-t text-center text-xs font-medium tracking-wide" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <p className="inline-flex flex-wrap items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-black/30 border border-white/5 text-white/50 shadow-inner">
            <span>Sayt</span>
            <a
              href="https://www.instagram.com/pixel_digital_services/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#E3232A] hover:text-[#ff383e] font-extrabold underline transition-all duration-300 hover:scale-105 inline-flex items-center gap-1 uppercase tracking-wider"
            >
              Pixel Digital Services
            </a>
            <span>tərəfindən hazırlanmışdır.</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
