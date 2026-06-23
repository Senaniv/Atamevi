'use client'

import { Truck, ShieldCheck, PhoneCall } from 'lucide-react'

export default function DeliveryBanner() {
  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Box 1: Delivery Time */}
      <div
        className="flex items-center gap-4 p-5 rounded-2xl border transition-all hover:shadow-sm"
        style={{
          backgroundColor: 'white',
          borderColor: 'rgba(45,90,39,0.12)',
        }}
      >
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: '#e8f5e2' }}
        >
          <Truck size={18} style={{ color: '#2d5a27' }} />
        </div>
        <div>
          <h4 className="font-bold text-sm text-gray-800">Sürətli Çatdırılma</h4>
          <p className="text-xs text-gray-500 mt-0.5">Bakı və Tovuz üzrə 1–2 iş günündə qapınızda.</p>
        </div>
      </div>

      {/* Box 2: Ice Pack Packing */}
      <div
        className="flex items-center gap-4 p-5 rounded-2xl border transition-all hover:shadow-sm"
        style={{
          backgroundColor: 'white',
          borderColor: 'rgba(45,90,39,0.12)',
        }}
      >
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: '#fdf2e9' }}
        >
          <ShieldCheck size={18} style={{ color: '#8b5a2b' }} />
        </div>
        <div>
          <h4 className="font-bold text-sm text-gray-800">Buz Paketi Zəmanəti</h4>
          <p className="text-xs text-gray-500 mt-0.5">Süd və ət məhsulları xüsusi soyuducu buz paketləri ilə qorunur.</p>
        </div>
      </div>

      {/* Box 3: WhatsApp Contact */}
      <a
        href="https://wa.me/994706774407"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-4 p-5 rounded-2xl border transition-all hover:shadow-md hover:border-green-deep/30 group"
        style={{
          backgroundColor: '#f2faf0',
          borderColor: 'rgba(45,90,39,0.18)',
        }}
      >
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105"
          style={{ backgroundColor: '#2d5a27' }}
        >
          {/* Custom WhatsApp SVG icon */}
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.456L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.967C16.58 1.973 14.108.95 11.482.95c-5.442 0-9.866 4.372-9.87 9.802 0 1.714.464 3.393 1.346 4.869L1.936 21.05l5.711-1.896zm10.74-4.834c-.267-.134-1.58-.779-1.825-.867-.245-.089-.423-.134-.601.134-.178.267-.69.867-.846 1.046-.156.178-.312.2-.579.067-.267-.134-1.127-.416-2.147-1.326-.793-.707-1.328-1.58-1.484-1.847-.156-.267-.017-.411.117-.544.121-.12.267-.312.4-.467.134-.156.178-.267.267-.446.089-.178.045-.334-.022-.468-.067-.134-.601-1.446-.823-1.98-.217-.523-.456-.452-.624-.46l-.53-.009c-.183 0-.482.069-.734.343-.252.275-.963.94-.963 2.292 0 1.353.984 2.659 1.12 2.838.138.178 1.936 2.956 4.69 4.148.655.283 1.166.452 1.564.579.66.21 1.26.18 1.733.11.528-.078 1.58-.646 1.802-1.27.223-.624.223-1.157.156-1.27-.067-.11-.245-.2-.512-.334z" />
          </svg>
        </div>
        <div>
          <h4 className="font-bold text-sm text-green-deep flex items-center gap-1.5 group-hover:underline">
            Sifariş Xətti & WhatsApp
          </h4>
          <p className="text-xs text-gray-600 mt-0.5 font-semibold">070 677 44 07</p>
        </div>
      </a>
    </div>
  )
}
