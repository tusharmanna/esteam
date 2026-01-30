'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Product } from '@/types'
import { useCart } from '@/components/cart/CartProvider'
import { useState } from 'react'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()
  const [isAdded, setIsAdded] = useState(false)

  const handleAddToCart = () => {
    addToCart(product)
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 1500)
  }

  return (
    <motion.div
      className="product-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <div className="product-image-wrapper">
        <Image
          src={product.image}
          alt={product.name}
          width={300}
          height={300}
          className="product-image"
        />
        <div className="product-overlay">
          <button
            className={`add-to-cart-btn ${isAdded ? 'added' : ''}`}
            onClick={handleAddToCart}
            disabled={isAdded}
          >
            {isAdded ? (
              <>
                <i className="ri-check-line"></i> Added!
              </>
            ) : (
              <>
                <i className="ri-shopping-cart-2-line"></i> Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-price">${product.price.toFixed(2)}</div>
      </div>

      <style jsx>{`
        .product-card {
          background: #fff;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .product-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
        }
        .product-image-wrapper {
          position: relative;
          aspect-ratio: 1;
          overflow: hidden;
          background: #f8f8f8;
        }
        .product-image-wrapper :global(.product-image) {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s;
        }
        .product-card:hover .product-image-wrapper :global(.product-image) {
          transform: scale(1.05);
        }
        .product-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 1rem;
          background: linear-gradient(transparent, rgba(0, 0, 0, 0.6));
          opacity: 0;
          transition: opacity 0.3s;
        }
        .product-card:hover .product-overlay {
          opacity: 1;
        }
        .add-to-cart-btn {
          width: 100%;
          padding: 0.75rem 1rem;
          background: var(--primary-color);
          color: #fff;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: background 0.3s;
        }
        .add-to-cart-btn:hover:not(:disabled) {
          background: #8d7249;
        }
        .add-to-cart-btn.added {
          background: var(--primary-green);
        }
        .product-info {
          padding: 1rem;
        }
        .product-category {
          font-size: 0.75rem;
          color: var(--primary-color);
          text-transform: uppercase;
          font-weight: 600;
          letter-spacing: 0.5px;
        }
        .product-name {
          font-size: 1rem;
          font-weight: 700;
          color: var(--primary-title);
          margin: 0.5rem 0;
          line-height: 1.3;
        }
        .product-description {
          font-size: 0.85rem;
          color: var(--tertiary-title);
          margin-bottom: 0.75rem;
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .product-price {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--primary-color);
        }
      `}</style>
    </motion.div>
  )
}
