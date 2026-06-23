'use client'

import { Info, Truck, ShieldCheck, MapPin, Phone, HelpCircle } from 'lucide-react'

export default function AboutSection() {
  return (
    <section className="mb-16 scroll-mt-20" id="haqqimizda">
      <div className="flex flex-col gap-8">
        
        {/* Top Card: About Us & Why Us (Full Width) */}
        <div 
          className="p-8 sm:p-10 rounded-3xl border flex flex-col justify-between"
          style={{
            backgroundColor: 'white',
            borderColor: 'rgba(45,90,39,0.10)',
            boxShadow: '0 4px 20px rgba(45,90,39,0.03)'
          }}
        >
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div 
                className="w-10 h-10 rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: '#e8f5e2' }}
              >
                <Info size={20} style={{ color: '#2d5a27' }} />
              </div>
              <div>
                <h2 
                  className="text-2xl md:text-3xl font-bold" 
                  style={{ fontFamily: "'Playfair Display', serif", color: '#2d5a27' }}
                >
                  Haqqımızda
                </h2>
                <p className="text-xs font-semibold uppercase tracking-wider mt-0.5" style={{ color: '#8b5a2b' }}>
                  Kənddən evinizə təbii körpü
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-sm leading-relaxed text-slate-700 font-medium">
              <div className="lg:col-span-7 space-y-4">
                <p>
                  Hər şey Tovuzun bərəkətli torpaqlarında, ulu babalarımızdan bizə miras qalan torpaq sevgisi və kənd zəhməti ilə başladı. 
                  <strong className="text-green-deep"> &ldquo;Atam Evi&rdquo;</strong> sadəcə bir satış platforması deyil; o, uşaqlığımızın unudulmaz təbii dadlarını, nənələrimizin sevgiylə çaldığı nehrə yağını, babalarımızın Tovuz dağlarından süzdüyü şəfalı məcun balı birbaşa sizin süfrənizə gətirən səmimi bir ailə təşəbbüsüdür.
                </p>
                <p>
                  Biz inanırıq ki, hər kəsin süfrəsində təmiz, qatqısız və vicdanla hazırlanmış məhsullar olmalıdır. Buna görə də hər gün sevgi və qayğı ilə işimizi görürük.
                </p>
              </div>
              
              <div className="lg:col-span-5 p-6 rounded-2xl bg-[#fdfaf5] border border-amber-800/10 space-y-2.5">
                <h4 className="font-extrabold text-sm flex items-center gap-2" style={{ color: '#8b5a2b' }}>
                  <HelpCircle size={16} /> Niyə Biz?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  Çünki biz heç bir kimyəvi qatqı, rəngləndirici və ya konservant istifadə etmirik. Südümüz hər səhər Tovuz fermalarında təzə sağılır, qatığımız nehrədə çalınır, ətimiz tamamilə təbii otlaqlarda bəslənmiş danalardan günlük hazırlanır. Biz kənddəki zəhmətkeş ailələrin əməyini dəstəkləyir, şəhərdə isə sağlam qidalanmaq istəyən hər bir evə təmiz qida zəmanəti veririk. Bizim üçün ən önəmli dəyər sizin ailənizin sağlamlığı və məmnuniyyətidir.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-100 flex flex-wrap gap-4 text-xs font-bold text-[#8b5a2b]">
            <span className="px-3 py-1.5 rounded-lg bg-green-pale/40 text-green-deep">🥬 100% Təbii</span>
            <span className="px-3 py-1.5 rounded-lg bg-green-pale/40 text-green-deep">🥛 Tovuz Məhsulları</span>
            <span className="px-3 py-1.5 rounded-lg bg-green-pale/40 text-green-deep">🛡️ Təmiz Qida Zəmanəti</span>
          </div>
        </div>

        {/* Bottom Card: Delivery Info Box (Full Width) */}
        <div 
          className="p-8 sm:p-10 rounded-3xl border flex flex-col justify-between relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #1e381b 0%, #2d5a27 100%)',
            borderColor: '#1e381b',
            boxShadow: '0 4px 25px rgba(45,90,39,0.15)'
          }}
        >
          {/* Subtle watermark background pattern */}
          <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center">
            <span className="text-9xl">🌾</span>
          </div>

          <div className="relative z-10 space-y-6">
            <div>
              <span className="px-3 py-1 rounded-full bg-white/10 text-white/90 text-[10px] font-bold tracking-widest uppercase">
                ÇATDIRILMA XİDMƏTİ
              </span>
              <h3 
                className="text-2xl font-bold text-white mt-3" 
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Hörmətli müştərilər!
              </h3>
              <p className="text-xs text-white/70 mt-1 font-semibold">
                Kənddən evinizə sürətli və təhlükəsiz çatdırılma şərtlərimiz:
              </p>
            </div>

            {/* Delivery Methods Grid (2 columns on medium screens and larger) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Method 1: Bus Station */}
              <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex items-center justify-between gap-4 hover:bg-white/10 transition-all duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white shrink-0">
                    <span className="text-xl">🚌</span>
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-white">Avtovağzala Çatdırılma</h5>
                    <p className="text-[10px] text-white/50 mt-0.5">Sifarişi avtovağzalda təhvil almaq</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-lg bg-green-500 text-white text-[11px] font-black uppercase tracking-wider shrink-0">
                  ÖDƏNİŞSİZ ✓
                </span>
              </div>

              {/* Method 2: Home Address */}
              <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex items-center justify-between gap-4 hover:bg-white/10 transition-all duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white shrink-0">
                    <Truck size={18} />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-white">Ünvana Çatdırılma</h5>
                    <p className="text-[10px] text-white/50 mt-0.5">Bakı daxili birbaşa ünvana çatdırılma</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-lg bg-amber-600 text-white text-[11px] font-black uppercase tracking-wider shrink-0">
                  ƏLAVƏ ÖDƏNİŞLƏ
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Banner Branding Info */}
          <div className="relative z-10 mt-8 pt-5 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex gap-4 text-xs font-bold text-white/90 uppercase tracking-widest">
              <span>Təbii</span>
              <span>•</span>
              <span>Saf</span>
              <span>•</span>
              <span>Sağlam</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto text-xs">
              <a 
                href="tel:0706774407" 
                className="flex items-center justify-center gap-2 p-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-colors w-full sm:w-auto"
              >
                <Phone size={14} className="text-green-400" />
                <span className="font-bold">070 677 44 07</span>
              </a>
              <a 
                href="https://www.instagram.com/atam.evi/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-colors w-full sm:w-auto"
              >
                <svg className="w-3.5 h-3.5 text-pink-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                <span className="font-bold">@atam.evi</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
