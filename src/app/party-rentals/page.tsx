'use client'

import Link from 'next/link'

export default function PartyRentalsPage() {
  const sections = [
    { id: 'photo-gallery', title: 'Photo Gallery', href: '/party-rentals/photo-gallery', isGallery: true },
    { id: 'catering', title: 'Catering', href: '/party-rentals/catering' },
    { id: 'chairs', title: 'Chairs', href: '/party-rentals/chairs' },
    { id: 'china-and-chargers', title: 'China and Chargers', href: '/party-rentals/china-and-chargers' },
    { id: 'dance-floors', title: 'Dance Floors', href: '/party-rentals/dance-floors' },
    { id: 'disposable-party-goods', title: 'Disposable Party Goods', href: '/party-rentals/disposable-party-goods' },
    { id: 'event-decor', title: 'Event Décor', href: '/party-rentals/event-decor' },
    { id: 'flatware', title: 'Flatware', href: '/party-rentals/flatware' },
    { id: 'glassware', title: 'Glassware', href: '/party-rentals/glassware' },
    { id: 'heating-and-cooling', title: 'Heating and Cooling', href: '/party-rentals/heating-and-cooling' },
    { id: 'linen', title: 'Linen', href: '/party-rentals/linen' },
    { id: 'packages', title: 'Packages', href: '/party-rentals/packages' },
    { id: 'pipe-and-drape', title: 'Pipe and Drape', href: '/party-rentals/pipe-and-drape' },
    { id: 'staging', title: 'Staging', href: '/party-rentals/staging' },
    { id: 'tables', title: 'Tables', href: '/party-rentals/tables' },
    { id: 'tents-and-accessories', title: 'Tents and Accessories', href: '/party-rentals/tents-and-accessories' },
    { id: 'wedding-items', title: 'Wedding Items', href: '/party-rentals/wedding-items' },
  ]

  return (
    <main className="party-rentals-page">
      <div className="container py-5">
        <h1 className="page-title text-center mb-5">Party Rentals</h1>
        <p className="text-center text-secondary mb-5">
          Browse our party rental categories below. Contact us for availability and pricing.
        </p>
        <div className="row g-4">
          {sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="col-12 col-md-6 col-lg-4"
              style={{ scrollMarginTop: '100px' }}
            >
              <div className="card h-100 p-3">
                <Link href={section.href} className="text-decoration-none text-dark">
                  <h3 className="h5 text-color-primary">{section.title}</h3>
                  <p className="text-color-tertiary small mb-0">
                    {'isGallery' in section
                      ? 'Browse photos from our past events and celebrations.'
                      : 'View items and add to cart. Contact us for delivery: (770) 815-8221 or sales@felixarts.biz'}
                  </p>
                </Link>
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  )
}
