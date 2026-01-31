'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useCart } from '@/components/cart/CartProvider'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const { getItemCount } = useCart()
  const itemCount = getItemCount()

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/handicrafts', label: 'Handicrafts' },
  ]

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  return (
    <header className="header-area">
      <div className="container">
        <div className="header-wrapper d-flex align-items-center justify-content-between py-3">
          {/* Logo */}
          <div className="logo">
            <Link href="/">
              <Image
                src="/images/logo/esteam-logo.png"
                alt="ESteam Logo"
                width={150}
                height={45}
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="main-nav d-none d-md-flex align-items-center gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link ${isActive(link.href) ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Cart Icon & Mobile Menu Toggle */}
          <div className="header-actions d-flex align-items-center gap-3">
            {/* Cart Icon */}
            <Link href="/cart" className="cart-icon position-relative">
              <i className="ri-shopping-cart-2-line ri-xl"></i>
              {itemCount > 0 && (
                <span className="cart-badge">{itemCount}</span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className="mobile-menu-toggle d-md-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <i className={`ri-${isMenuOpen ? 'close' : 'menu'}-line ri-xl`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="mobile-nav d-md-none pb-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`mobile-nav-link d-block py-2 ${isActive(link.href) ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>

      <style jsx>{`
        .header-area {
          background: #fff;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          position: sticky;
          top: 0;
          z-index: 1000;
        }
        .nav-link {
          color: var(--secondary-title);
          font-weight: 600;
          text-decoration: none;
          padding: 0.5rem 1rem;
          transition: color 0.3s;
        }
        .nav-link:hover,
        .nav-link.active {
          color: var(--primary-color);
        }
        .cart-icon {
          color: var(--secondary-title);
          text-decoration: none;
          padding: 0.5rem;
          transition: color 0.3s;
        }
        .cart-icon:hover {
          color: var(--primary-color);
        }
        .cart-badge {
          position: absolute;
          top: -5px;
          right: -5px;
          background: var(--primary-color);
          color: #fff;
          font-size: 10px;
          font-weight: 700;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .mobile-menu-toggle {
          background: none;
          border: none;
          color: var(--secondary-title);
          cursor: pointer;
          padding: 0.5rem;
        }
        .mobile-nav-link {
          color: var(--secondary-title);
          font-weight: 600;
          text-decoration: none;
          border-bottom: 1px solid #eee;
        }
        .mobile-nav-link:hover,
        .mobile-nav-link.active {
          color: var(--primary-color);
        }
      `}</style>
    </header>
  )
}
