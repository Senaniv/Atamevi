export type Unit = 'ədəd' | 'l' | 'kq' | 'şüşə' | 'dəstə'

export interface Product {
  id: string
  title: string
  category: string
  price: number
  unit: Unit
  step: number
  emoji: string
  description: string
  tag?: string
}

export interface CartItem extends Product {
  qty: number
}

export interface ReadyBasketDef {
  id: string
  title: string
  subtitle: string
  emoji: string
  items: { productId: string; qty: number }[]
  totalLabel: string
}

export const PRODUCTS: Product[] = [
  {
    id: 'egg',
    title: 'Kənd Yumurtası',
    category: 'Süd-Yumurta',
    price: 0.35,
    unit: 'ədəd',
    step: 10,
    emoji: '🥚',
    description: 'Tovuz kəndinin sərbəst gəzən toyuqlarından təzə günlük yumurta.',
    tag: 'Ən Çox Satılan',
  },
  {
    id: 'milk',
    title: 'İnək Südü',
    category: 'Süd-Yumurta',
    price: 1.20,
    unit: 'l',
    step: 1,
    emoji: '🥛',
    description: 'Hər səhər sağılan, yağlı, təbii inək südü. Filtrsiz, qatqısız.',
    tag: 'Organik',
  },
  {
    id: 'beef',
    title: 'Dana Əti (Sümüksüz)',
    category: 'Ət Məhsulları',
    price: 18.50,
    unit: 'kq',
    step: 0.5,
    emoji: '🥩',
    description: 'Kənd şəraitində böyüdülmüş danadan sümüksüz, təmiz ət.',
    tag: 'Premium',
  },
  {
    id: 'honey',
    title: 'Dağ Balı (Məcun)',
    category: 'Bal-Mum',
    price: 28.00,
    unit: 'kq',
    step: 0.5,
    emoji: '🍯',
    description: 'Tovuz dağlarının çiçəklərindən yığılan, süzgəcdən keçirilməmiş xam bal.',
    tag: 'Nadir',
  },
  {
    id: 'butter',
    title: 'Nehrə Yağı',
    category: 'Süd Məhsulları',
    price: 22.00,
    unit: 'kq',
    step: 0.5,
    emoji: '🧈',
    description: 'Geleneksel nehrə üsulu ilə hazırlanan təbii sarı yağ.',
    tag: 'Ənənəvi',
  },
  {
    id: 'cheese',
    title: 'Kənd Pendiri',
    category: 'Süd Məhsulları',
    price: 12.00,
    unit: 'kq',
    step: 0.5,
    emoji: '🧀',
    description: 'Duzlu suda yetişdirilmiş, əl ilə hazırlanan ağ peynir.',
  },
  {
    id: 'katiq',
    title: 'Ev Qatığı',
    category: 'Süd Məhsulları',
    price: 2.50,
    unit: 'l',
    step: 1,
    emoji: '🫙',
    description: 'Qaynaq südündən hazırlanmış, kremlə qaymaqlı ev qatığı.',
  },
  {
    id: 'walnut',
    title: 'Qoz (Soyulmuş)',
    category: 'Quru Meyvə',
    price: 14.00,
    unit: 'kq',
    step: 0.5,
    emoji: '🫘',
    description: 'Kənd bağından yeni çıxarılmış, əl ilə soyulmuş iri qoz içi.',
    tag: 'Mövsümi',
  },
  {
    id: 'chicken',
    title: 'Kənd Toyuğu',
    category: 'Ət Məhsulları',
    price: 9.00,
    unit: 'kq',
    step: 1,
    emoji: '🍗',
    description: 'Azad gəzən, taxılla böyüdülmüş ağır kənd toyuğu.',
    tag: 'Təzə',
  },
  {
    id: 'potato',
    title: 'Tovuz Kartofu',
    category: 'Tərəvəz',
    price: 1.20,
    unit: 'kq',
    step: 1,
    emoji: '🥔',
    description: 'Tovuzun məşhur, dadlı və bol nişastalı təbii kənd kartofu.',
    tag: 'Mövsümi',
  },
  {
    id: 'tomato',
    title: 'Kənd Pomidoru',
    category: 'Tərəvəz',
    price: 2.20,
    unit: 'kq',
    step: 1,
    emoji: '🍅',
    description: 'Açıq sahədə yetişdirilmiş, ətirli və şirin kənd pomidoru.',
    tag: 'Təzə',
  },
  {
    id: 'alca',
    title: 'Dağ Alçası (Göyəm)',
    category: 'Meyvə',
    price: 3.50,
    unit: 'kq',
    step: 0.5,
    emoji: '🍏',
    description: 'Tovuz dağ yamaclarından toplanmış təbii turşməzə göyəm və alça.',
    tag: 'Mövsümi',
  },
  {
    id: 'cherry',
    title: 'Qara Gilas',
    category: 'Meyvə',
    price: 5.00,
    unit: 'kq',
    step: 0.5,
    emoji: '🍒',
    description: 'Kənd bağından dərilmiş şirin, iri və sulu qara gilas.',
    tag: 'Yeni',
  },
]

export const READY_BASKETS: ReadyBasketDef[] = [
  {
    id: 'xengel',
    title: 'Xəngəl Səbəti',
    subtitle: 'Kənd süfrəsinin ən klassik dadı',
    emoji: '🍽️',
    items: [
      { productId: 'katiq', qty: 2 },
      { productId: 'butter', qty: 0.5 },
      { productId: 'cheese', qty: 0.5 },
      { productId: 'egg', qty: 10 },
    ],
    totalLabel: '≈ 24 AZN dəyərindədir',
  },
  {
    id: 'breakfast',
    title: 'Səhər Yeməyi Səbəti',
    subtitle: '3 günlük aile səhər yeməyi dəsti',
    emoji: '🌅',
    items: [
      { productId: 'egg', qty: 20 },
      { productId: 'milk', qty: 3 },
      { productId: 'honey', qty: 0.5 },
      { productId: 'butter', qty: 0.5 },
      { productId: 'cheese', qty: 0.5 },
      { productId: 'katiq', qty: 1 },
    ],
    totalLabel: '≈ 41 AZN dəyərindədir',
  },
  {
    id: 'eloba',
    title: 'El Oba Səbəti',
    subtitle: 'Mövsümə uyğun bütün məhsullar',
    emoji: '🧺',
    items: [
      { productId: 'egg', qty: 20 },
      { productId: 'milk', qty: 2 },
      { productId: 'cheese', qty: 0.5 },
      { productId: 'potato', qty: 2 },
      { productId: 'tomato', qty: 2 },
      { productId: 'alca', qty: 1 },
    ],
    totalLabel: '≈ 30 AZN dəyərindədir',
  },
]

export const BLOG_POSTS = [
  {
    id: 'blog1',
    title: 'Məcun Balın Möcüzələri',
    excerpt:
      'Tovuz dağlarında yığılan xam bal bağışıqlıq sistemini gücləndirir, antibakterial xüsusiyyətlərə malikdir və enerji mənbəyi kimi ümumi sağlamlığa böyük töhfə verir.',
    emoji: '🍯',
    readTime: '3 dəq',
    category: 'Sağlamlıq',
    accent: '#d97706',
    bg: '#fffbeb',
  },
  {
    id: 'blog2',
    title: 'Nehrə Yağının Faydaları',
    excerpt:
      'Sənaye yağlarından fərqli olaraq nehrə yağı omega-3 və K2 vitamini baxımından zəngindir, ürək sağlamlığını dəstəkləyir və immun sisteminizi möhkəmləndirir.',
    emoji: '🧈',
    readTime: '4 dəq',
    category: 'Qida Elmi',
    accent: '#b45309',
    bg: '#fef3c7',
  },
  {
    id: 'blog3',
    title: 'Kənd vs Fabrik Yumurtası',
    excerpt:
      'Omega-6/Omega-3 nisbəti, D vitamini miqdarı, sarısının rəngi — kənd yumurtasını fərqli edən elmi faktlar. Oxuyun, seçiminizi bilin.',
    emoji: '🥚',
    readTime: '5 dəq',
    category: 'Müqayisə',
    accent: '#2d5a27',
    bg: '#f0fdf4',
  },
]

export const FAQ_ITEMS = [
  {
    id: 'faq1',
    question: 'Tovuza çatdırılma neçə günə aparır?',
    answer:
      'Sifarişiniz qəbul edildikdən sonra Tovuz kəndindən Bakıya standart çatdırılma 1–2 iş günü ərzində həyata keçirilir. Cümə axşamı saat 18:00-dan sonra verilən sifarişlər növbəti həftənin başında çatdırılır.',
  },
  {
    id: 'faq2',
    question: 'Süd və ət məhsulları buz paketi ilə göndərilirmi?',
    answer:
      'Bəli! Bütün temperaturhəssas məhsullar (süd, ət, qatıq, pendir) termosumkada buz paketləri ilə göndərilir. Qış mövsümündə bu xidmət pulsuzdur, yay aylarında isə 2 AZN əlavə paketləmə haqqı tətbiq olunur.',
  },
  {
    id: 'faq3',
    question: 'Özüm istədiyim məhsulları seçib fərdi səbət yarada bilərəmmi?',
    answer:
      'Əlbəttə! Saytımızda istədiyiniz məhsulları gramm/litr/ədəd üzrə özünüz seçib "Səbəti Özün Yığ" funksiyasından istifadə edə bilərsiniz. Hazır səbətlər isə tez sifarişçilər üçün nəzərdə tutulub.',
  },
  {
    id: 'faq4',
    question: 'Məhsulların keyfiyyətinə zəmanət verirsinizmi?',
    answer:
      'Hər məhsul bilavasitə Tovuz kənd ailələrindən, mənşəyi məlum fermalardan temin edilir. Çatdırılma zamanı hər hansı keyfiyyət problemi yaranarsa, sifarişi 24 saat ərzində tam geri qaytarırıq.',
  },
]

// Local Storage Helper Utilities
export function getStoredProducts(): Product[] {
  if (typeof window === 'undefined') return PRODUCTS
  const data = localStorage.getItem('atam_products')
  if (data) {
    try { return JSON.parse(data) } catch (e) { return PRODUCTS }
  }
  localStorage.setItem('atam_products', JSON.stringify(PRODUCTS))
  return PRODUCTS
}

export function setStoredProducts(prods: Product[]) {
  if (typeof window === 'undefined') return
  localStorage.setItem('atam_products', JSON.stringify(prods))
  window.dispatchEvent(new Event('atam_products_change'))
}

export function getStoredBaskets(): ReadyBasketDef[] {
  if (typeof window === 'undefined') return READY_BASKETS
  const data = localStorage.getItem('atam_baskets')
  if (data) {
    try { return JSON.parse(data) } catch (e) { return READY_BASKETS }
  }
  localStorage.setItem('atam_baskets', JSON.stringify(READY_BASKETS))
  return READY_BASKETS
}

export function setStoredBaskets(baskets: ReadyBasketDef[]) {
  if (typeof window === 'undefined') return
  localStorage.setItem('atam_baskets', JSON.stringify(baskets))
  window.dispatchEvent(new Event('atam_baskets_change'))
}

export interface Order {
  id: string
  customerName: string
  customerSurname: string
  phone: string
  date: string
  items: string
  total: number
  deliveryMethod: string
  status: string
}

const DEFAULT_ORDERS: Order[] = [
  {
    id: 'ORD-5401',
    customerName: 'Nigar',
    customerSurname: 'Əliyeva',
    phone: '0502345678',
    date: '2026-06-23',
    items: 'Kənd Yumurtası (30 ədəd), Nehrə Yağı (1.5 kq), Ev Qatığı (2 l)',
    total: 51.50,
    deliveryMethod: 'Avtovağzala (Pulsuz)',
    status: 'Gözləmədə'
  },
  {
    id: 'ORD-5402',
    customerName: 'Elşən',
    customerSurname: 'Məmmədov',
    phone: '0779876543',
    date: '2026-06-22',
    items: 'Dana Əti (Sümüksüz) (3 kq), Kənd Pendiri (2 kq)',
    total: 79.50,
    deliveryMethod: 'Ünvana (3 AZN)',
    status: 'Yoldadır'
  }
]

export function getStoredOrders(): Order[] {
  if (typeof window === 'undefined') return DEFAULT_ORDERS
  const data = localStorage.getItem('atam_orders')
  if (data) {
    try { return JSON.parse(data) } catch (e) { return DEFAULT_ORDERS }
  }
  localStorage.setItem('atam_orders', JSON.stringify(DEFAULT_ORDERS))
  return DEFAULT_ORDERS
}

export function setStoredOrders(orders: Order[]) {
  if (typeof window === 'undefined') return
  localStorage.setItem('atam_orders', JSON.stringify(orders))
  window.dispatchEvent(new Event('atam_orders_change'))
}

