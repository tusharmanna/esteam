import type { Metadata, Viewport } from 'next'
import { Nunito_Sans } from 'next/font/google'
import '@/styles/globals.scss'
import '@/styles/main-style.css'
import { CartProvider } from '@/components/cart/CartProvider'
import Header from '@/components/layout/Header'

const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  variable: '--font-nunito',
  display: 'swap',
})

export const viewport: Viewport = {
  themeColor: '#ffffff',
}

export const metadata: Metadata = {
  title: 'ESteam - Photoframes, Wreaths, Decorative & Gift Items',
  description: 'Welcome to ESteam, your one-stop shop for personalized gifts! We specialize in crafting high-quality, customized products including t-shirts, coffee mugs, key chains, and coasters.',
  keywords: 'custom gifts, personalized gifts, custom t-shirts, coffee mugs, key chains, coasters, ESteam, handicrafts',
  icons: {
    icon: [
      { url: '/images/icon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/icon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/images/icon/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" dir="ltr">
      <body className={nunitoSans.variable}>
        <CartProvider>
          <Header />
          {children}
        </CartProvider>
      </body>
    </html>
  )
}
