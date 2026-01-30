'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/components/cart/CartProvider'

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, getTotal, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <main className="cart-page">
        <div className="container py-5">
          <motion.div
            className="empty-cart text-center py-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <i className="ri-shopping-cart-2-line empty-icon"></i>
            <h2>Your cart is empty</h2>
            <p className="text-muted mb-4">
              Looks like you haven&apos;t added anything to your cart yet.
            </p>
            <Link href="/handicrafts" className="btn-primary-custom">
              Browse Handicrafts
            </Link>
          </motion.div>
        </div>
        <style jsx>{`
          .cart-page {
            min-height: 100vh;
            background: #f9f9f9;
          }
          .empty-cart {
            max-width: 400px;
            margin: 0 auto;
          }
          .empty-icon {
            font-size: 5rem;
            color: #ddd;
            display: block;
            margin-bottom: 1rem;
          }
          .empty-cart h2 {
            color: var(--primary-title);
            margin-bottom: 0.5rem;
          }
          .btn-primary-custom {
            display: inline-block;
            padding: 0.75rem 2rem;
            background: var(--primary-color);
            color: #fff;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            transition: background 0.3s;
          }
          .btn-primary-custom:hover {
            background: #8d7249;
            color: #fff;
          }
        `}</style>
      </main>
    )
  }

  return (
    <main className="cart-page">
      <div className="container py-5">
        <motion.h1
          className="page-title mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Shopping Cart
        </motion.h1>

        <div className="row g-4">
          {/* Cart Items */}
          <div className="col-lg-8">
            <motion.div
              className="cart-items"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {items.map((item, index) => (
                <motion.div
                  key={item.product.id}
                  className="cart-item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="item-image">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      width={100}
                      height={100}
                    />
                  </div>
                  <div className="item-details">
                    <h3 className="item-name">{item.product.name}</h3>
                    <p className="item-category">{item.product.category}</p>
                    <p className="item-price">${item.product.price.toFixed(2)}</p>
                  </div>
                  <div className="item-quantity">
                    <button
                      className="qty-btn"
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    >
                      <i className="ri-subtract-line"></i>
                    </button>
                    <span className="qty-value">{item.quantity}</span>
                    <button
                      className="qty-btn"
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    >
                      <i className="ri-add-line"></i>
                    </button>
                  </div>
                  <div className="item-total">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </div>
                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.product.id)}
                    aria-label="Remove item"
                  >
                    <i className="ri-delete-bin-line"></i>
                  </button>
                </motion.div>
              ))}

              <div className="cart-actions mt-3">
                <button className="clear-cart-btn" onClick={clearCart}>
                  Clear Cart
                </button>
              </div>
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="col-lg-4">
            <motion.div
              className="order-summary"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="summary-title">Order Summary</h2>
              <div className="summary-row">
                <span>Subtotal ({items.length} items)</span>
                <span>${getTotal().toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span className="free-shipping">FREE</span>
              </div>
              <hr />
              <div className="summary-row total">
                <span>Total</span>
                <span>${getTotal().toFixed(2)}</span>
              </div>
              <Link href="/checkout" className="checkout-btn">
                Proceed to Checkout
              </Link>
              <Link href="/handicrafts" className="continue-shopping">
                <i className="ri-arrow-left-line"></i> Continue Shopping
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .cart-page {
          min-height: 100vh;
          background: #f9f9f9;
        }
        .page-title {
          font-size: 2rem;
          font-weight: 700;
          color: var(--primary-title);
        }
        .cart-items {
          background: #fff;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
        }
        .cart-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 0;
          border-bottom: 1px solid #eee;
        }
        .cart-item:last-of-type {
          border-bottom: none;
        }
        .item-image {
          flex-shrink: 0;
          width: 100px;
          height: 100px;
          border-radius: 8px;
          overflow: hidden;
          background: #f8f8f8;
        }
        .item-image :global(img) {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .item-details {
          flex: 1;
          min-width: 0;
        }
        .item-name {
          font-size: 1rem;
          font-weight: 600;
          color: var(--primary-title);
          margin-bottom: 0.25rem;
        }
        .item-category {
          font-size: 0.8rem;
          color: var(--primary-color);
          margin-bottom: 0.25rem;
        }
        .item-price {
          font-size: 0.9rem;
          color: var(--tertiary-title);
          margin: 0;
        }
        .item-quantity {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .qty-btn {
          width: 32px;
          height: 32px;
          border: 1px solid #ddd;
          background: #fff;
          border-radius: 6px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }
        .qty-btn:hover {
          border-color: var(--primary-color);
          color: var(--primary-color);
        }
        .qty-value {
          width: 40px;
          text-align: center;
          font-weight: 600;
        }
        .item-total {
          font-weight: 700;
          color: var(--primary-title);
          min-width: 80px;
          text-align: right;
        }
        .remove-btn {
          background: none;
          border: none;
          color: #999;
          cursor: pointer;
          padding: 0.5rem;
          transition: color 0.2s;
        }
        .remove-btn:hover {
          color: var(--primary-red);
        }
        .cart-actions {
          display: flex;
          justify-content: flex-end;
        }
        .clear-cart-btn {
          background: none;
          border: none;
          color: var(--primary-red);
          font-weight: 600;
          cursor: pointer;
          padding: 0.5rem 1rem;
        }
        .order-summary {
          background: #fff;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
          position: sticky;
          top: 100px;
        }
        .summary-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--primary-title);
          margin-bottom: 1.5rem;
        }
        .summary-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 1rem;
          color: var(--secondary-title);
        }
        .summary-row.total {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--primary-title);
        }
        .free-shipping {
          color: var(--primary-green);
          font-weight: 600;
        }
        .checkout-btn {
          display: block;
          width: 100%;
          padding: 1rem;
          background: var(--primary-color);
          color: #fff;
          text-align: center;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 600;
          margin-top: 1.5rem;
          transition: background 0.3s;
        }
        .checkout-btn:hover {
          background: #8d7249;
          color: #fff;
        }
        .continue-shopping {
          display: block;
          text-align: center;
          margin-top: 1rem;
          color: var(--tertiary-title);
          text-decoration: none;
          font-weight: 500;
        }
        .continue-shopping:hover {
          color: var(--primary-color);
        }
        @media (max-width: 768px) {
          .cart-item {
            flex-wrap: wrap;
          }
          .item-details {
            order: 1;
            width: calc(100% - 116px);
          }
          .item-quantity {
            order: 2;
          }
          .item-total {
            order: 3;
          }
          .remove-btn {
            order: 4;
          }
        }
      `}</style>
    </main>
  )
}
