import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Atam Evi — Tovuz Kənd Məhsulları',
  description:
    'Tovuz kəndinin ən təzə, təbii məhsulları birbaşa sizin süfrənizə. Yumurta, süd, bal, ət, kənd pendir və daha çoxu.',
  keywords: 'kənd məhsulları, Tovuz, təbii, organik, bal, yumurta, süd, ət',
  openGraph: {
    title: 'Atam Evi — Tovuz Kənd Məhsulları',
    description: 'Təbii kənd məhsulları birbaşa süfrənizdə.',
    locale: 'az_AZ',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="az" className={`${playfair.variable} ${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>{children}</body>
    </html>
  )
}
