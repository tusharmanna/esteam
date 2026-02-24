'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

const galleryImages = [
  { id: 1, src: '/images/gallery/about-1.png', alt: 'Event Setup', category: 'Events' },
  { id: 2, src: '/images/gallery/about-2.png', alt: 'Party Decoration', category: 'Decorations' },
  { id: 3, src: '/images/gallery/about-3.png', alt: 'Table Setting', category: 'Table Settings' },
  { id: 4, src: '/images/gallery/about-4.png', alt: 'Venue Setup', category: 'Venues' },
  { id: 5, src: '/images/gallery/deals-1.png', alt: 'Special Event', category: 'Events' },
  { id: 6, src: '/images/gallery/arrival-img-1.png', alt: 'Wedding Setup', category: 'Weddings' },
  { id: 7, src: '/images/gallery/arrival-img-2.png', alt: 'Reception Decor', category: 'Decorations' },
  { id: 8, src: '/images/gallery/arrival-img-3.png', alt: 'Party Rentals', category: 'Events' },
  { id: 9, src: '/images/gallery/wish-thumb-1.png', alt: 'Outdoor Event', category: 'Outdoor' },
  { id: 10, src: '/images/gallery/wish-thumb-2.png', alt: 'Indoor Celebration', category: 'Events' },
  { id: 11, src: '/images/gallery/wish-thumb-3.png', alt: 'Corporate Event', category: 'Corporate' },
  { id: 12, src: '/images/gallery/wish-thumb-4.png', alt: 'Birthday Party', category: 'Parties' },
]

export default function PhotoGalleryPage() {
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null)

  return (
    <main className="photo-gallery-page">
      <div className="container py-5">
        <nav className="mb-4" aria-label="Breadcrumb">
          <Link href="/party-rentals" className="text-secondary text-decoration-none small">
            ← Party Rentals
          </Link>
        </nav>
        <h1 className="page-title mb-2">Photo Gallery</h1>
        <p className="text-secondary mb-5">
          Browse photos from our past events. See how our rentals can transform your celebration!
        </p>

        <div className="gallery-grid">
          {galleryImages.map((image) => (
            <div
              key={image.id}
              className="gallery-item"
              onClick={() => setSelectedImage(image)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={400}
                height={300}
                className="gallery-image"
              />
              <div className="gallery-overlay">
                <span className="gallery-category">{image.category}</span>
                <span className="gallery-view">Click to view</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div className="lightbox" onClick={() => setSelectedImage(null)}>
          <button
            className="lightbox-close"
            onClick={() => setSelectedImage(null)}
            aria-label="Close"
          >
            ×
          </button>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              width={900}
              height={600}
              className="lightbox-image"
            />
            <p className="lightbox-caption">{selectedImage.alt}</p>
          </div>
        </div>
      )}

      <style jsx>{`
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
        }
        .gallery-item {
          position: relative;
          border-radius: 8px;
          overflow: hidden;
          cursor: pointer;
          aspect-ratio: 4/3;
          background: #f5f5f5;
        }
        .gallery-item :global(.gallery-image) {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }
        .gallery-item:hover :global(.gallery-image) {
          transform: scale(1.05);
        }
        .gallery-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.4);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .gallery-item:hover .gallery-overlay {
          opacity: 1;
        }
        .gallery-category {
          color: #fff;
          font-size: 0.85rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          background: rgba(232, 93, 4, 0.9);
          padding: 0.25rem 0.75rem;
          border-radius: 4px;
          margin-bottom: 0.5rem;
        }
        .gallery-view {
          color: #fff;
          font-size: 0.9rem;
        }
        .lightbox {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 2rem;
        }
        .lightbox-close {
          position: absolute;
          top: 1rem;
          right: 1.5rem;
          background: none;
          border: none;
          color: #fff;
          font-size: 3rem;
          cursor: pointer;
          line-height: 1;
          padding: 0;
        }
        .lightbox-close:hover {
          color: #e85d04;
        }
        .lightbox-content {
          max-width: 90vw;
          max-height: 90vh;
          text-align: center;
        }
        .lightbox-content :global(.lightbox-image) {
          max-width: 100%;
          max-height: 80vh;
          object-fit: contain;
          border-radius: 8px;
        }
        .lightbox-caption {
          color: #fff;
          margin-top: 1rem;
          font-size: 1.1rem;
        }
        @media (max-width: 576px) {
          .gallery-grid {
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 1rem;
          }
        }
      `}</style>
    </main>
  )
}
