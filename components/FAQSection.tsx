'use client'

import { useState, useEffect } from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'
import { getStoredFAQs, FAQItem } from '@/lib/data'

export default function FAQSection() {
  const [faqs, setFaqs] = useState<FAQItem[]>([])
  const [openId, setOpenId] = useState<string | null>(null)

  useEffect(() => {
    setFaqs(getStoredFAQs())
    const handleFaqsChange = () => setFaqs(getStoredFAQs())
    window.addEventListener('atam_faqs_change', handleFaqsChange)
    return () => window.removeEventListener('atam_faqs_change', handleFaqsChange)
  }, [])

  const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id))

  return (
    <section className="mb-16" id="faq">
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-10 h-10 rounded-2xl flex items-center justify-center"
          style={{ backgroundColor: '#e8f5e2' }}
        >
          <HelpCircle size={20} style={{ color: '#2d5a27' }} />
        </div>
        <div>
          <h2
            className="text-2xl md:text-3xl font-bold"
            style={{ fontFamily: "'Playfair Display', serif", color: '#2d5a27' }}
          >
            Tez-tez Verilən Suallar
          </h2>
          <p className="text-sm" style={{ color: '#8b5a2b' }}>
            Çatdırılma, qiymət, keyfiyyət — hər şey burada
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {faqs.map((item) => {
          const isOpen = openId === item.id
          return (
            <div
              key={item.id}
              className="rounded-2xl border overflow-hidden transition-all"
              style={{
                backgroundColor: 'white',
                borderColor: isOpen ? 'rgba(45,90,39,0.30)' : 'rgba(45,90,39,0.10)',
                boxShadow: isOpen
                  ? '0 4px 20px rgba(45,90,39,0.10)'
                  : '0 1px 8px rgba(45,90,39,0.05)',
              }}
            >
              <button
                onClick={() => toggle(item.id)}
                className="w-full flex items-center justify-between px-6 py-4 text-left transition-colors"
                style={{
                  backgroundColor: isOpen ? '#f2faf0' : 'transparent',
                }}
                aria-expanded={isOpen}
              >
                <span
                  className="font-semibold text-sm md:text-base pr-4"
                  style={{ color: '#1a2e17' }}
                >
                  {item.question}
                </span>
                <ChevronDown
                  size={18}
                  className="flex-shrink-0 transition-transform duration-300"
                  style={{
                    color: '#2d5a27',
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                />
              </button>

              <div
                className="overflow-hidden transition-all duration-300"
                style={{
                  maxHeight: isOpen ? '300px' : '0px',
                  opacity: isOpen ? 1 : 0,
                }}
              >
                <p
                  className="px-6 pb-5 text-sm leading-relaxed"
                  style={{ color: '#4b5563' }}
                >
                  {item.answer}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
