'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Product } from '@/types'
import { useCart } from '@/components/cart/CartProvider'

interface RentalProductRowProps {
  product: Product
}

export default function RentalProductRow({ product }: RentalProductRowProps) {
  const { addToCart } = useCart()
  const [isAdded, setIsAdded] = useState(false)

  const handleAddToCart = () => {
    addToCart(product)
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 1500)
  }

  const serviceLines = product.description.split('\n').filter(Boolean)

  return (
    <div className="rental-product-row">
      <div className="rental-product-image">
        <Image
          src={product.image}
          alt={product.name}
          width={120}
          height={120}
          className="rental-image"
        />
      </div>
      <div className="rental-product-details">
        <h3 className="rental-product-title">{product.name}</h3>
        <div className="rental-service-info">
          {serviceLines.map((line, i) => (
            <p key={i} className="rental-service-line">
              {line}
            </p>
          ))}
        </div>
        <div className="rental-price-wrap">
          <span className="rental-price-dot" aria-hidden />
          <span className="rental-price">${product.price.toFixed(2)} to rent</span>
        </div>
      </div>
      <div className="rental-product-actions">
        <button
          type="button"
          className={`rental-add-to-cart-btn ${isAdded ? 'added' : ''}`}
          onClick={handleAddToCart}
          disabled={isAdded}
        >
          <i className="ri-shopping-cart-2-line"></i>
          {isAdded ? 'ADDED' : 'ADD TO CART'}
        </button>
      </div>

      <style jsx>{`
        .rental-product-row {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          padding: 1rem 1.25rem;
          background: #f0f8ff;
          border-radius: 6px;
          margin-bottom: 0;
          border-bottom: 1px solid #e0e8ef;
        }
        .rental-product-row:last-child {
          border-bottom: none;
        }
        .rental-product-image {
          flex-shrink: 0;
          width: 120px;
          height: 120px;
          border-radius: 4px;
          overflow: hidden;
          background: #fff;
          border: 1px solid #e8e8e8;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .rental-product-image :global(.rental-image) {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .rental-product-details {
          flex: 1;
          min-width: 0;
        }
        .rental-product-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: #000;
          margin: 0 0 0.5rem 0;
          line-height: 1.3;
        }
        .rental-service-info {
          margin-bottom: 0.5rem;
        }
        .rental-service-line {
          font-size: 0.9rem;
          color: #333;
          margin: 0;
          line-height: 1.4;
        }
        .rental-price-wrap {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .rental-price-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #0ca641;
          flex-shrink: 0;
        }
        .rental-price {
          font-size: 1rem;
          font-weight: 700;
          color: #000;
        }
        .rental-product-actions {
          flex-shrink: 0;
        }
        .rental-add-to-cart-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.65rem 1.25rem;
          background: #e85d04;
          color: #fff;
          border: none;
          border-radius: 4px;
          font-weight: 700;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.02em;
          cursor: pointer;
          transition: background 0.2s, opacity 0.2s;
        }
        .rental-add-to-cart-btn:hover:not(:disabled) {
          background: #d34d04;
        }
        .rental-add-to-cart-btn.added {
          background: #0ca641;
        }
        .rental-add-to-cart-btn:disabled {
          cursor: default;
        }
        @media (max-width: 768px) {
          .rental-product-row {
            flex-wrap: wrap;
          }
          .rental-product-actions {
            width: 100%;
            margin-top: 0.5rem;
          }
          .rental-add-to-cart-btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  )
}
