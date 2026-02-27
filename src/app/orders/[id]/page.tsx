'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { CartItem, CustomerInfo } from '@/types'

interface StoredOrder {
  id: string
  customer: CustomerInfo
  items: CartItem[]
  total: number
  date: string
}

export default function OrderPage() {
  const params = useParams()
  const orderId = params.id as string
  const [order, setOrder] = useState<StoredOrder | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const raw = sessionStorage.getItem('esteam-last-order')
    if (raw) {
      try {
        const stored: StoredOrder = JSON.parse(raw)
        if (stored.id === orderId) {
          setOrder(stored)
        }
      } catch {
        // malformed data — fall through to not-found
      }
    }
    setLoading(false)
  }, [orderId])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (loading) {
    return (
      <main className="order-page">
        <div className="container py-5">
          <div className="loading-state text-center py-5">
            <div className="spinner-large"></div>
            <p className="mt-3">Loading order details...</p>
          </div>
        </div>
        <style jsx>{`
          .order-page { min-height: 100vh; background: #f9f9f9; }
          .spinner-large {
            width: 40px; height: 40px;
            border: 3px solid #eee; border-top-color: var(--primary-color);
            border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto;
          }
          @keyframes spin { to { transform: rotate(360deg); } }
        `}</style>
      </main>
    )
  }

  if (!order) {
    return (
      <main className="order-page">
        <div className="container py-5">
          <div className="error-state text-center py-5">
            <i className="ri-error-warning-line error-icon"></i>
            <h2>Order Not Found</h2>
            <p className="text-muted">
              Order details are only available immediately after checkout. Please return to the home
              page.
            </p>
            <Link href="/" className="btn-primary-custom mt-3">
              Go Home
            </Link>
          </div>
        </div>
        <style jsx>{`
          .order-page { min-height: 100vh; background: #f9f9f9; }
          .error-icon { font-size: 4rem; color: #ddd; }
          .btn-primary-custom {
            display: inline-block; padding: 0.75rem 2rem;
            background: var(--primary-color); color: #fff;
            text-decoration: none; border-radius: 8px; font-weight: 600;
          }
        `}</style>
      </main>
    )
  }

  return (
    <main className="order-page">
      <div className="container py-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Order Header */}
          <div className="order-header mb-4">
            <div className="d-flex justify-content-between align-items-start flex-wrap gap-3">
              <div>
                <h1 className="page-title">Order Details</h1>
                <p className="order-id-display">Order ID: {order.id}</p>
              </div>
              <div className="status-badge status-confirmed">Confirmed</div>
            </div>
            <p className="order-date">Placed on {formatDate(order.date)}</p>
          </div>

          <div className="row g-4">
            {/* Order Items */}
            <div className="col-lg-8">
              <div className="order-card">
                <h2 className="card-title">Items Ordered</h2>
                <div className="items-list">
                  {order.items.map((item) => (
                    <div key={item.product.id} className="order-item">
                      <div className="item-info">
                        <h4 className="item-name">{item.product.name}</h4>
                        <p className="item-price">${Number(item.product.price).toFixed(2)} each</p>
                      </div>
                      <div className="item-quantity">x{item.quantity}</div>
                      <div className="item-total">
                        ${(Number(item.product.price) * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="order-total">
                  <span>Total</span>
                  <span>${Number(order.total).toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Customer Info */}
            <div className="col-lg-4">
              <div className="order-card">
                <h2 className="card-title">Shipping Information</h2>
                <div className="customer-info">
                  <p className="customer-name">
                    {order.customer.firstName} {order.customer.lastName}
                  </p>
                  <p>{order.customer.address}</p>
                  <p>
                    {order.customer.city}, {order.customer.zipCode}
                  </p>
                  <hr />
                  <p>
                    <strong>Email:</strong> {order.customer.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {order.customer.phone}
                  </p>
                </div>
              </div>

              <div className="order-actions mt-4">
                <Link href="/handicrafts" className="btn-primary-custom d-block text-center">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .order-page { min-height: 100vh; background: #f9f9f9; }
        .page-title { font-size: 2rem; font-weight: 700; color: var(--primary-title); margin-bottom: 0.25rem; }
        .order-id-display { font-size: 1rem; color: var(--primary-color); font-weight: 600; }
        .order-date { color: var(--tertiary-title); font-size: 0.9rem; }
        .status-badge {
          padding: 0.5rem 1rem; border-radius: 20px;
          font-weight: 600; font-size: 0.85rem; text-transform: capitalize;
        }
        .status-confirmed { background: #e8f5e9; color: #2e7d32; }
        .order-card {
          background: #fff; border-radius: 12px;
          padding: 1.5rem; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
        }
        .card-title {
          font-size: 1.1rem; font-weight: 700; color: var(--primary-title);
          margin-bottom: 1rem; padding-bottom: 0.75rem; border-bottom: 1px solid #eee;
        }
        .order-item {
          display: flex; align-items: center;
          padding: 1rem 0; border-bottom: 1px solid #f0f0f0;
        }
        .order-item:last-child { border-bottom: none; }
        .item-info { flex: 1; }
        .item-name { font-size: 0.95rem; font-weight: 600; color: var(--primary-title); margin-bottom: 0.25rem; }
        .item-price { font-size: 0.85rem; color: var(--tertiary-title); margin: 0; }
        .item-quantity { padding: 0 1.5rem; color: var(--secondary-title); font-weight: 500; }
        .item-total { font-weight: 700; color: var(--primary-title); min-width: 80px; text-align: right; }
        .order-total {
          display: flex; justify-content: space-between;
          padding-top: 1rem; margin-top: 0.5rem;
          border-top: 2px solid #eee; font-size: 1.2rem;
          font-weight: 700; color: var(--primary-title);
        }
        .customer-info p { margin: 0.5rem 0; color: var(--secondary-title); }
        .customer-name { font-weight: 600; color: var(--primary-title) !important; font-size: 1.1rem; }
        .btn-primary-custom {
          padding: 0.875rem 2rem; background: var(--primary-color);
          color: #fff; text-decoration: none;
          border-radius: 8px; font-weight: 600; transition: background 0.3s;
        }
        .btn-primary-custom:hover { background: #8d7249; color: #fff; }
      `}</style>
    </main>
  )
}
