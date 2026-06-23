'use client'

import { Search, X } from 'lucide-react'

interface SearchBarProps {
  value: string
  onChange: (v: string) => void
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="mt-10 mb-8" id="products">
      <div className="flex items-center justify-between mb-4">
        <h2
          className="text-2xl md:text-3xl font-bold"
          style={{ fontFamily: "'Playfair Display', serif", color: '#2d5a27' }}
        >
          Bütün Məhsullar
        </h2>
        <span className="text-sm font-medium" style={{ color: '#8b5a2b' }}>
          Tovuzdan gəlir 🌿
        </span>
      </div>

      <div className="relative">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
          style={{ color: '#2d5a27' }}
        />
        <input
          type="text"
          placeholder="Məhsul axtarın... (bal, süd, ət...)"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-12 pr-12 py-4 rounded-2xl text-sm font-medium outline-none transition-all border-2"
          style={{
            backgroundColor: 'white',
            borderColor: value ? '#2d5a27' : 'rgba(45,90,39,0.15)',
            color: '#2c2c2c',
            boxShadow: value
              ? '0 4px 20px rgba(45,90,39,0.12)'
              : '0 2px 12px rgba(45,90,39,0.06)',
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#2d5a27'
            e.target.style.boxShadow = '0 4px 20px rgba(45,90,39,0.12)'
          }}
          onBlur={(e) => {
            if (!value) {
              e.target.style.borderColor = 'rgba(45,90,39,0.15)'
              e.target.style.boxShadow = '0 2px 12px rgba(45,90,39,0.06)'
            }
          }}
        />
        {value && (
          <button
            onClick={() => onChange('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-0.5 transition-opacity hover:opacity-70"
            style={{ color: '#8b5a2b' }}
            aria-label="Axtarışı sil"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {value && (
        <p className="mt-2.5 text-sm" style={{ color: '#8b5a2b' }}>
          &ldquo;<strong>{value}</strong>&rdquo; üzrə nəticələr göstərilir
        </p>
      )}
    </div>
  )
}
