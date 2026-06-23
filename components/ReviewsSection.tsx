'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, MessageSquare, Star } from 'lucide-react'

interface Review {
  id: string
  name: string
  role: string
  text: string
  avatar: string
  location: string
  rating: number
}

const REVIEWS: Review[] = [
  {
    id: 'rev1',
    name: 'Nigar Xanım',
    role: 'TƏMİZLİK HƏSSASLIĞI ÜZRƏ MÜŞTƏRİ',
    text: 'Mən ilk səhifədə təmizliyə baxıb müştəri oldum. Mən OKB (təmizlik həssaslığı) olan bir insanam, mənim üçün ən önəmlisi təmizlikdir. İnşallah səhifəniz daha da böyüyər, bol müştəriləriniz olar. Bundan sonra sizin daimi müştəriniz olacam.',
    avatar: '👩',
    rating: 5
  },
  {
    id: 'rev2',
    name: 'Nigar Şiriyeva',
    role: 'KƏND TOYUĞU ÜZRƏ MÜŞTƏRİ',
    text: 'Sizin gətirdiyiniz çolpa əla idi, çox dadlı idi. Sağ olsunlar. Adətən mən toyuqları doğrayanda belini atıram, sadəcə bud və sinə hissəsi qalır. Amma siz gətirən toyuq əla idi, çox ətli idi, bişirdim, ləzzətlə yedik.',
    avatar: '👩‍🍳',
    rating: 5
  },
  {
    id: 'rev3',
    name: 'Cənnət M.',
    role: 'SÜD MƏHSULLARI ÜZRƏ MÜŞTƏRİ',
    text: 'Əlləriniz var olsun! Qatıq da yolda heç dağılmayıb, çox qəşəng və səliqəli gəlib çatdı. Qablaşdırma və dad həqiqətən mükəmməldir. Təşəkkür edirəm!',
    avatar: '🥰',
    rating: 5
  },
  {
    id: 'rev4',
    name: 'İlya Məmmədova',
    role: 'MÜŞTƏRİ MƏMNUNİYYƏTİ ÜZRƏ MÜŞTƏRİ',
    text: 'Hər şey möhtəşəm idi! Məhsulların ləzzəti çox xoşumuza gəldi. Hətta yaxınlarıma göstərmək üçün şəkillərini də çəkdim. Çox sağ olun.',
    avatar: '✨',
    rating: 5
  },
  {
    id: 'rev5',
    name: 'Sevda H.',
    role: 'TƏBİİ GÖYƏRTİ ÜZRƏ MÜŞTƏRİ',
    text: 'Sabahınız xeyir. Göndərdiyiniz təpə keşnişinin ətrini dərhal hiss etdim. Dünəndən bəri ətri əlimdən getmir! Bu qoxu mənə əsl kənd yazını xatırlatdı. Çox təzə və ətirlidir.',
    avatar: '🌿',
    rating: 5
  }
]

export default function ReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? REVIEWS.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % REVIEWS.length)
  }

  // Get L and R indexes
  const prevIndex = (currentIndex === 0) ? REVIEWS.length - 1 : currentIndex - 1
  const nextIndex = (currentIndex + 1) % REVIEWS.length

  const prevReview = REVIEWS[prevIndex]
  const activeReview = REVIEWS[currentIndex]
  const nextReview = REVIEWS[nextIndex]

  return (
    <section className="mb-20 relative w-full overflow-hidden" id="reviews">
      {/* Title */}
      <div className="flex flex-col items-center text-center mb-10 px-4">
        <div
          className="w-10 h-10 rounded-2xl flex items-center justify-center bg-green-light mb-3"
        >
          <MessageSquare size={20} style={{ color: '#2d5a27' }} />
        </div>
        <h2
          className="text-2xl md:text-3xl font-bold font-playfair"
          style={{ color: '#2d5a27' }}
        >
          Müştərilərimizin Ürək Sözləri
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Tovuz dağlarından süfrənizə gələn dadlar haqqında müştərilərimizin rəyləri və geri dönüşləri.
        </p>
      </div>

      {/* Main Slider Container with Split background band */}
      <div className="relative w-full py-10 flex flex-col items-center">
        {/* Horizontal green-light background band */}
        <div
          className="absolute top-1/2 bottom-0 left-0 right-0 -translate-y-1/2 h-[18rem] w-full -z-10"
          style={{ backgroundColor: 'rgba(232, 245, 226, 0.45)' }}
        />

        {/* Slides layout */}
        <div className="w-full max-w-6xl mx-auto flex items-center justify-center gap-6 px-4 relative">
          
          {/* Left Review (Scaled down) */}
          <div
            className="hidden lg:flex flex-col items-center text-center p-6 rounded-3xl border w-72 h-[22rem] bg-white/60 opacity-30 scale-85 select-none pointer-events-none transition-all duration-500"
            style={{ borderColor: 'rgba(45,90,39,0.06)' }}
          >
            <span className="w-14 h-14 rounded-full bg-green-pale flex items-center justify-center text-xl border shadow-sm mb-3">
              {prevReview.avatar}
            </span>
            <h4 className="font-bold text-sm text-green-deep/80 font-playfair">{prevReview.name}</h4>
            <p className="text-[9px] font-bold text-brown/70 tracking-wider uppercase mt-0.5">{prevReview.role}</p>
            <p className="text-xs text-gray-400 mt-4 leading-relaxed line-clamp-5 italic">
              &ldquo;{prevReview.text}&rdquo;
            </p>
          </div>

          {/* Active Center Review (Highlighted) */}
          <div className="relative w-full max-w-lg z-10">
            {/* White card */}
            <div
              className="bg-white rounded-3xl p-8 md:p-10 border transition-all duration-500 shadow-2xl flex flex-col items-center text-center min-h-[24rem]"
              style={{
                borderColor: 'rgba(45,90,39,0.12)',
                boxShadow: '0 20px 50px rgba(45,90,39,0.12)',
              }}
            >
              {/* Avatar with thick circular border */}
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center text-4xl border-4 bg-green-pale shadow-md mb-4"
                style={{ borderColor: '#2d5a27' }}
              >
                {activeReview.avatar}
              </div>

              {/* Name */}
              <h3 className="font-bold text-lg text-green-deep font-playfair">{activeReview.name}</h3>
              {/* Role / Uppercase title */}
              <p
                className="text-[10px] font-bold tracking-wider uppercase mt-1 mb-6"
                style={{ color: '#8b5a2b' }}
              >
                {activeReview.role}
              </p>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(activeReview.rating)].map((_, i) => (
                  <Star key={i} size={14} fill="#8b5a2b" color="#8b5a2b" />
                ))}
              </div>

              {/* Text */}
              <p
                className="text-sm md:text-base leading-relaxed text-gray-700 italic font-medium"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                &ldquo;{activeReview.text}&rdquo;
              </p>
            </div>

            {/* Slider Navigation Arrows - Overlapping card boundaries exactly like the reference */}
            <button
              onClick={handlePrev}
              className="absolute left-0 -translate-x-1/2 top-1/2 -translate-y-1/2 w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center text-white bg-green-deep hover:bg-green-hover shadow-lg transition-all active:scale-95 cursor-pointer z-20"
              aria-label="Əvvəlki rəy"
            >
              <ChevronLeft size={20} strokeWidth={2.5} />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-0 translate-x-1/2 top-1/2 -translate-y-1/2 w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center text-white bg-green-deep hover:bg-green-hover shadow-lg transition-all active:scale-95 cursor-pointer z-20"
              aria-label="Növbəti rəy"
            >
              <ChevronRight size={20} strokeWidth={2.5} />
            </button>
          </div>

          {/* Right Review (Scaled down) */}
          <div
            className="hidden lg:flex flex-col items-center text-center p-6 rounded-3xl border w-72 h-[22rem] bg-white/60 opacity-30 scale-85 select-none pointer-events-none transition-all duration-500"
            style={{ borderColor: 'rgba(45,90,39,0.06)' }}
          >
            <span className="w-14 h-14 rounded-full bg-green-pale flex items-center justify-center text-xl border shadow-sm mb-3">
              {nextReview.avatar}
            </span>
            <h4 className="font-bold text-sm text-green-deep/80 font-playfair">{nextReview.name}</h4>
            <p className="text-[9px] font-bold text-brown/70 tracking-wider uppercase mt-0.5">{nextReview.role}</p>
            <p className="text-xs text-gray-400 mt-4 leading-relaxed line-clamp-5 italic">
              &ldquo;{nextReview.text}&rdquo;
            </p>
          </div>

        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center gap-2 mt-8">
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
