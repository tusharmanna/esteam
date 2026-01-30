'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCart } from '@/components/cart/CartProvider'
import { CartItem, CustomerInfo, PaymentInfo } from '@/types'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotal, clearCart } = useCart()
  const [step, setStep] = useState<'info' | 'payment' | 'confirmation'>('info')
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderId, setOrderId] = useState('')

  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
  })

  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateCustomerInfo = () => {
    const newErrors: Record<string, string> = {}
    if (!customerInfo.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!customerInfo.lastName.trim()) newErrors.lastName = 'Last name is required'
    if (!customerInfo.email.trim()) newErrors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerInfo.email))
      newErrors.email = 'Invalid email format'
    if (!customerInfo.phone.trim()) newErrors.phone = 'Phone is required'
    if (!customerInfo.address.trim()) newErrors.address = 'Address is required'
    if (!customerInfo.city.trim()) newErrors.city = 'City is required'
    if (!customerInfo.zipCode.trim()) newErrors.zipCode = 'ZIP code is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validatePaymentInfo = () => {
    const newErrors: Record<string, string> = {}
    if (!paymentInfo.cardNumber.trim()) newErrors.cardNumber = 'Card number is required'
    else if (paymentInfo.cardNumber.replace(/\s/g, '').length !== 16)
      newErrors.cardNumber = 'Card number must be 16 digits'
    if (!paymentInfo.cardName.trim()) newErrors.cardName = 'Name on card is required'
    if (!paymentInfo.expiry.trim()) newErrors.expiry = 'Expiry date is required'
    else if (!/^\d{2}\/\d{2}$/.test(paymentInfo.expiry))
      newErrors.expiry = 'Use MM/YY format'
    if (!paymentInfo.cvv.trim()) newErrors.cvv = 'CVV is required'
    else if (!/^\d{3,4}$/.test(paymentInfo.cvv))
      newErrors.cvv = 'CVV must be 3-4 digits'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleCustomerInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateCustomerInfo()) {
      setStep('payment')
    }
  }

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validatePaymentInfo()) {
      setIsProcessing(true)
      try {
        // Create order via API
        const response = await fetch('/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            customer: customerInfo,
            items: items,
            total: getTotal(),
          }),
        })

        const data = await response.json()

        if (response.ok && data.orderId) {
          setOrderId(data.orderId)
          clearCart()
          setStep('confirmation')
        } else {
          alert('Failed to create order. Please try again.')
        }
      } catch (error) {
        console.error('Error creating order:', error)
        alert('Failed to create order. Please try again.')
      } finally {
        setIsProcessing(false)
      }
    }
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ''
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    return parts.length ? parts.join(' ') : value
  }

  if (items.length === 0 && step !== 'confirmation') {
    router.push('/cart')
    return null
  }

  return (
    <main className="checkout-page">
      <div className="container py-5">
        <motion.h1
          className="page-title mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Checkout
        </motion.h1>

        {/* Progress Steps */}
        {step !== 'confirmation' && (
          <div className="checkout-steps mb-5">
            <div className={`step ${step === 'info' ? 'active' : 'completed'}`}>
              <span className="step-number">1</span>
              <span className="step-label">Information</span>
            </div>
            <div className="step-line"></div>
            <div className={`step ${step === 'payment' ? 'active' : ''}`}>
              <span className="step-number">2</span>
              <span className="step-label">Payment</span>
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {/* Customer Information Step */}
          {step === 'info' && (
            <motion.div
              key="info"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="row g-4"
            >
              <div className="col-lg-8">
                <div className="form-section">
                  <h2 className="section-title">Customer Information</h2>
                  <form onSubmit={handleCustomerInfoSubmit}>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label">First Name</label>
                        <input
                          type="text"
                          className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                          value={customerInfo.firstName}
                          onChange={(e) =>
                            setCustomerInfo({ ...customerInfo, firstName: e.target.value })
                          }
                        />
                        {errors.firstName && (
                          <div className="invalid-feedback">{errors.firstName}</div>
                        )}
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Last Name</label>
                        <input
                          type="text"
                          className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                          value={customerInfo.lastName}
                          onChange={(e) =>
                            setCustomerInfo({ ...customerInfo, lastName: e.target.value })
                          }
                        />
                        {errors.lastName && (
                          <div className="invalid-feedback">{errors.lastName}</div>
                        )}
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Email</label>
                        <input
                          type="email"
                          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                          value={customerInfo.email}
                          onChange={(e) =>
                            setCustomerInfo({ ...customerInfo, email: e.target.value })
                          }
                        />
                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Phone</label>
                        <input
                          type="tel"
                          className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                          value={customerInfo.phone}
                          onChange={(e) =>
                            setCustomerInfo({ ...customerInfo, phone: e.target.value })
                          }
                        />
                        {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                      </div>
                      <div className="col-12">
                        <label className="form-label">Address</label>
                        <input
                          type="text"
                          className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                          value={customerInfo.address}
                          onChange={(e) =>
                            setCustomerInfo({ ...customerInfo, address: e.target.value })
                          }
                        />
                        {errors.address && (
                          <div className="invalid-feedback">{errors.address}</div>
                        )}
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">City</label>
                        <input
                          type="text"
                          className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                          value={customerInfo.city}
                          onChange={(e) =>
                            setCustomerInfo({ ...customerInfo, city: e.target.value })
                          }
                        />
                        {errors.city && <div className="invalid-feedback">{errors.city}</div>}
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">ZIP Code</label>
                        <input
                          type="text"
                          className={`form-control ${errors.zipCode ? 'is-invalid' : ''}`}
                          value={customerInfo.zipCode}
                          onChange={(e) =>
                            setCustomerInfo({ ...customerInfo, zipCode: e.target.value })
                          }
                        />
                        {errors.zipCode && (
                          <div className="invalid-feedback">{errors.zipCode}</div>
                        )}
                      </div>
                    </div>
                    <div className="form-actions mt-4">
                      <Link href="/cart" className="btn-back">
                        <i className="ri-arrow-left-line"></i> Back to Cart
                      </Link>
                      <button type="submit" className="btn-continue">
                        Continue to Payment
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-lg-4">
                <OrderSummary items={items} total={getTotal()} />
              </div>
            </motion.div>
          )}

          {/* Payment Step */}
          {step === 'payment' && (
            <motion.div
              key="payment"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="row g-4"
            >
              <div className="col-lg-8">
                <div className="form-section">
                  <h2 className="section-title">
                    <i className="ri-secure-payment-line"></i> Payment Details
                  </h2>
                  <p className="payment-notice">
                    <i className="ri-bank-card-line"></i>
                    This is a demo checkout. No real payment will be processed.
                  </p>
                  <form onSubmit={handlePaymentSubmit}>
                    <div className="row g-3">
                      <div className="col-12">
                        <label className="form-label">Card Number</label>
                        <input
                          type="text"
                          className={`form-control ${errors.cardNumber ? 'is-invalid' : ''}`}
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                          value={paymentInfo.cardNumber}
                          onChange={(e) =>
                            setPaymentInfo({
                              ...paymentInfo,
                              cardNumber: formatCardNumber(e.target.value),
                            })
                          }
                        />
                        {errors.cardNumber && (
                          <div className="invalid-feedback">{errors.cardNumber}</div>
                        )}
                      </div>
                      <div className="col-12">
                        <label className="form-label">Name on Card</label>
                        <input
                          type="text"
                          className={`form-control ${errors.cardName ? 'is-invalid' : ''}`}
                          value={paymentInfo.cardName}
                          onChange={(e) =>
                            setPaymentInfo({ ...paymentInfo, cardName: e.target.value })
                          }
                        />
                        {errors.cardName && (
                          <div className="invalid-feedback">{errors.cardName}</div>
                        )}
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Expiry Date</label>
                        <input
                          type="text"
                          className={`form-control ${errors.expiry ? 'is-invalid' : ''}`}
                          placeholder="MM/YY"
                          maxLength={5}
                          value={paymentInfo.expiry}
                          onChange={(e) => {
                            let value = e.target.value.replace(/\D/g, '')
                            if (value.length >= 2) {
                              value = value.substring(0, 2) + '/' + value.substring(2, 4)
                            }
                            setPaymentInfo({ ...paymentInfo, expiry: value })
                          }}
                        />
                        {errors.expiry && <div className="invalid-feedback">{errors.expiry}</div>}
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">CVV</label>
                        <input
                          type="text"
                          className={`form-control ${errors.cvv ? 'is-invalid' : ''}`}
                          placeholder="123"
                          maxLength={4}
                          value={paymentInfo.cvv}
                          onChange={(e) =>
                            setPaymentInfo({
                              ...paymentInfo,
                              cvv: e.target.value.replace(/\D/g, ''),
                            })
                          }
                        />
                        {errors.cvv && <div className="invalid-feedback">{errors.cvv}</div>}
                      </div>
                    </div>
                    <div className="form-actions mt-4">
                      <button type="button" className="btn-back" onClick={() => setStep('info')}>
                        <i className="ri-arrow-left-line"></i> Back
                      </button>
                      <button type="submit" className="btn-continue" disabled={isProcessing}>
                        {isProcessing ? (
                          <>
                            <span className="spinner"></span> Processing...
                          </>
                        ) : (
                          `Pay $${getTotal().toFixed(2)}`
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-lg-4">
                <OrderSummary items={items} total={getTotal()} />
              </div>
            </motion.div>
          )}

          {/* Confirmation Step */}
          {step === 'confirmation' && (
            <motion.div
              key="confirmation"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="confirmation-section text-center py-5"
            >
              <div className="success-icon">
                <i className="ri-check-line"></i>
              </div>
              <h2 className="confirmation-title">Order Confirmed!</h2>
              <p className="confirmation-text">
                Thank you for your order, {customerInfo.firstName}!
              </p>
              <p className="order-id">Order ID: {orderId}</p>
              <p className="confirmation-email">
                A confirmation email has been sent to {customerInfo.email}
              </p>
              <div className="d-flex flex-column gap-2 mt-4">
                <Link href={`/orders/${orderId}`} className="btn-continue">
                  View Order Details
                </Link>
                <Link href="/handicrafts" className="btn-secondary-custom">
                  Continue Shopping
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style jsx>{`
        .checkout-page {
          min-height: 100vh;
          background: #f9f9f9;
        }
        .page-title {
          font-size: 2rem;
          font-weight: 700;
          color: var(--primary-title);
        }
        .checkout-steps {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
        }
        .step {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #aaa;
        }
        .step.active {
          color: var(--primary-color);
        }
        .step.completed {
          color: var(--primary-green);
        }
        .step-number {
          width: 30px;
          height: 30px;
          border: 2px solid currentColor;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
        }
        .step.active .step-number,
        .step.completed .step-number {
          background: currentColor;
          color: #fff;
        }
        .step-line {
          width: 60px;
          height: 2px;
          background: #ddd;
        }
        .form-section {
          background: #fff;
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
        }
        .section-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--primary-title);
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .payment-notice {
          background: #fff8e1;
          border: 1px solid #ffe082;
          border-radius: 8px;
          padding: 1rem;
          margin-bottom: 1.5rem;
          color: #f57c00;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .form-label {
          font-weight: 600;
          color: var(--secondary-title);
          margin-bottom: 0.5rem;
        }
        .form-control {
          padding: 0.75rem 1rem;
          border: 1px solid #ddd;
          border-radius: 8px;
          transition: border-color 0.3s;
        }
        .form-control:focus {
          border-color: var(--primary-color);
          box-shadow: 0 0 0 3px rgba(173, 140, 92, 0.1);
        }
        .form-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .btn-back {
          background: none;
          border: none;
          color: var(--tertiary-title);
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
        }
        .btn-back:hover {
          color: var(--primary-color);
        }
        .btn-continue {
          padding: 0.875rem 2rem;
          background: var(--primary-color);
          color: #fff;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
          transition: background 0.3s;
        }
        .btn-continue:hover:not(:disabled) {
          background: #8d7249;
        }
        .btn-continue:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .btn-secondary-custom {
          padding: 0.875rem 2rem;
          background: transparent;
          color: var(--primary-color);
          border: 2px solid var(--primary-color);
          border-radius: 8px;
          font-weight: 600;
          text-align: center;
          text-decoration: none;
          transition: all 0.3s;
        }
        .btn-secondary-custom:hover {
          background: var(--primary-color);
          color: #fff;
        }
        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        .confirmation-section {
          background: #fff;
          border-radius: 12px;
          padding: 3rem;
          max-width: 500px;
          margin: 0 auto;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
        }
        .success-icon {
          width: 80px;
          height: 80px;
          background: var(--primary-green);
          color: #fff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.5rem;
          margin: 0 auto 1.5rem;
        }
        .confirmation-title {
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--primary-title);
          margin-bottom: 0.5rem;
        }
        .confirmation-text {
          color: var(--secondary-title);
          margin-bottom: 0.5rem;
        }
        .order-id {
          font-weight: 700;
          color: var(--primary-color);
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
        }
        .confirmation-email {
          color: var(--tertiary-title);
          font-size: 0.9rem;
        }
      `}</style>
    </main>
  )
}

// Order Summary Component
function OrderSummary({ items, total }: { items: CartItem[]; total: number }) {
  return (
    <div className="order-summary-card">
      <h3 className="summary-title">Order Summary</h3>
      <div className="summary-items">
        {items.map((item) => (
          <div key={item.product.id} className="summary-item">
            <div className="item-image">
              <Image src={item.product.image} alt={item.product.name} width={50} height={50} />
              <span className="item-qty">{item.quantity}</span>
            </div>
            <div className="item-info">
              <p className="item-name">{item.product.name}</p>
              <p className="item-price">${(item.product.price * item.quantity).toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
      <hr />
      <div className="summary-row">
        <span>Subtotal</span>
        <span>${total.toFixed(2)}</span>
      </div>
      <div className="summary-row">
        <span>Shipping</span>
        <span className="free">FREE</span>
      </div>
      <hr />
      <div className="summary-row total">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>

      <style jsx>{`
        .order-summary-card {
          background: #fff;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
          position: sticky;
          top: 100px;
        }
        .summary-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--primary-title);
          margin-bottom: 1rem;
        }
        .summary-items {
          max-height: 250px;
          overflow-y: auto;
        }
        .summary-item {
          display: flex;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
        }
        .item-image {
          position: relative;
          width: 50px;
          height: 50px;
          border-radius: 6px;
          overflow: hidden;
          background: #f8f8f8;
          flex-shrink: 0;
        }
        .item-image :global(img) {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .item-qty {
          position: absolute;
          top: -6px;
          right: -6px;
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
        .item-info {
          flex: 1;
          min-width: 0;
        }
        .item-name {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--secondary-title);
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .item-price {
          font-size: 0.85rem;
          color: var(--tertiary-title);
          margin: 0;
        }
        .summary-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
          color: var(--secondary-title);
        }
        .summary-row.total {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--primary-title);
        }
        .free {
          color: var(--primary-green);
          font-weight: 600;
        }
      `}</style>
    </div>
  )
}
