'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, MessageSquare, Star, Quote } from 'lucide-react'

interface Review {
  id: string
  name: string
  text: string
  avatar: string
  location: string
  rating: number
  tag?: string
}

const REVIEWS: Review[] = [
  {
    id: 'rev1',
    name: 'Nigar Xanım',
    location: 'Bakı (OKB Müştərimiz)',
    text: 'Mən ilk səhifədə təmizliyə baxıb müştəri oldum. Mən OKB (təmizlik həssaslığı) olan bir insanam, mənim üçün ən önəmlisi təmizlikdir. İnşallah səhifəniz daha da böyüyər, bol müştəriləriniz olar. Bundan sonra sizin daimi müştəriniz olacam.',
    avatar: '👩',
    rating: 5,
    tag: 'Təmizlik Zəmanəti'
  },
  {
    id: 'rev2',
    name: 'Nigar Şiriyeva',
    location: 'Bakı',
    text: 'Sizin gətirdiyiniz çolpa əla idi, çox dadlı idi. Sağ olsunlar. Adətən mən toyuqları doğrayanda belini atıram, sadəcə bud və sinə hissəsi qalır. Amma siz gətirən toyuq əla idi, çox ətli idi, bişirdim, ləzzətlə yedik.',
    avatar: '👩‍🍳',
    rating: 5,
    tag: 'Ət Məhsulları'
  },
  {
    id: 'rev3',
    name: 'Cənnət M.',
    location: 'Bakı',
    text: 'Əlləriniz var olsun! Qatıq da yolda heç dağılmayıb, çox qəşəng və səliqəli gəlib çatdı. Qablaşdırma və dad həqiqətən mükəmməldir. Təşəkkür edirəm!',
    avatar: '🥰',
    rating: 5,
    tag: 'Səliqəli Çatdırılma'
  },
  {
    id: 'rev4',
    name: 'İlya Məmmədova',
    location: 'Bakı',
    text: 'Hər şey möhtəşəm idi! Məhsulların ləzzəti çox xoşumuza gəldi. Hətta yaxınlarıma göstərmək üçün şəkillərini də çəkdim. Çox sağ olun.',
    avatar: '✨',
    rating: 5,
    tag: 'Müştəri Məmnuniyyəti'
  },
  {
    id: 'rev5',
    name: 'Sevda H.',
    location: 'Bakı',
    text: 'Sabahınız xeyir. Göndərdiyiniz təpə keşnişinin ətrini dərhal hiss etdim. Dünəndən bəri ətri əlimdən getmir! Bu qoxu mənə əsl kənd yazını xatırlatdı. Çox təzə və ətirlidir.',
    avatar: '🌿',
    rating: 5,
    tag: 'Təbii Ətir'
  }
]

export default function ReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Auto slide every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % REVIEWS.length)
    }, 8000)
    return () => clearInterval(timer)
  }, [])

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? REVIEWS.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % REVIEWS.length)
  }

  const activeReview = REVIEWS[currentIndex]

  return (
    <section className="mb-16" id="reviews">
      {/* Title */}
      <div className="flex items-center gap-3 mb-8">
        <div
          className="w-10 h-10 rounded-2xl flex items-center justify-center bg-green-light"
        >
          <MessageSquare size={20} style={{ color: '#2d5a27' }} />
        </div>
        <div>
          <h2
            className="text-2xl md:text-3xl font-bold font-playfair"
            style={{ color: '#2d5a27' }}
          >
            Müştərilərimizin Səsi
          </h2>
          <p className="text-sm text-gray-500">
            Instagram rəyləri və real whatsapp geri dönüşləri
          </p>
        </div>
      </div>

      {/* Review Box Wrapper */}
      <div className="relative max-w-3xl mx-auto">
        {/* Slider Card */}
        <div
          className="bg-white rounded-3xl p-8 md:p-10 border transition-all duration-300 hover:shadow-lg relative overflow-hidden"
          style={{
            borderColor: 'rgba(45,90,39,0.12)',
            boxShadow: '0 4px 24px rgba(45,90,39,0.06)',
          }}
        >
          {/* Quote Icon Background */}
          <div className="absolute right-6 top-6 text-green-pale opacity-40 pointer-events-none select-none">
            <Quote size={80} />
          </div>

          <div className="flex flex-col items-center text-center space-y-4 relative z-10">
            {/* Tag */}
            {activeReview.tag && (
              <span
                className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider bg-brown-light text-brown"
              >
                {activeReview.tag}
              </span>
            )}

            {/* Stars */}
            <div className="flex gap-1">
              {[...Array(activeReview.rating)].map((_, i) => (
                <Star key={i} size={15} fill="#8b5a2b" color="#8b5a2b" />
              ))}
            </div>

            {/* Review text */}
            <p
              className="text-sm md:text-base md:leading-relaxed text-gray-700 italic font-medium max-w-xl transition-all"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              &ldquo;{activeReview.text}&rdquo;
            </p>

            {/* Customer Details */}
            <div className="pt-4 flex flex-col items-center">
              <span className="w-12 h-12 rounded-full bg-green-pale flex items-center justify-center text-2xl border border-green-deep/10 shadow-sm mb-2">
                {activeReview.avatar}
              </span>
              <h4 className="font-bold text-sm text-green-deep font-playfair">{activeReview.name}</h4>
              <p className="text-xs text-gray-400 mt-0.5">{activeReview.location}</p>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 -mx-4 md:-mx-12 flex justify-between pointer-events-none">
          <button
            onClick={handlePrev}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full border flex items-center justify-center bg-white text-green-deep hover:bg-green-pale shadow-sm hover:scale-105 active:scale-95 transition-all pointer-events-auto"
            style={{ borderColor: 'rgba(45,90,39,0.15)' }}
            aria-label="Əvvəlki rəy"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={handleNext}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full border flex items-center justify-center bg-white text-green-deep hover:bg-green-pale shadow-sm hover:scale-105 active:scale-95 transition-all pointer-events-auto"
            style={{ borderColor: 'rgba(45,90,39,0.15)' }}
            aria-label="Növbəti rəy"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {REVIEWS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === i ? 'w-6 bg-green-deep' : 'w-2 bg-green-deep/20'
              }`}
              aria-label={`Slayd ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
