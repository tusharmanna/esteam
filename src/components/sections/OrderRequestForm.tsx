'use client'

import { useState } from 'react'
import type {
  OrderRequestFormData,
  CustomerType,
  OrderRequestItem,
  TshirtColor,
  PreferredContact,
} from '@/types'

const ITEMS: { value: OrderRequestItem; label: string }[] = [
  { value: 'T-shirts', label: 'T-shirts' },
  { value: 'Coffee Mugs', label: 'Coffee Mugs' },
  { value: 'Key Chains', label: 'Key Chains' },
  { value: 'Coasters', label: 'Coasters' },
  { value: 'Plates', label: 'Plates' },
]

const TSHIRT_COLORS: { value: TshirtColor; label: string }[] = [
  { value: 'White', label: 'White' },
  { value: 'Black', label: 'Black' },
  { value: 'Red', label: 'Red' },
  { value: 'Blue', label: 'Blue' },
  { value: 'Green', label: 'Green' },
  { value: 'Yellow', label: 'Yellow' },
]

const PREFERRED_CONTACT: { value: PreferredContact; label: string }[] = [
  { value: 'Phone', label: 'Phone' },
  { value: 'Email', label: 'Email' },
]

const initialForm: OrderRequestFormData = {
  customerType: 'new',
  items: [],
  tshirtColors: [],
  productOptions: '',
  customerName: '',
  customerPhone: '',
  customerEmail: '',
  preferredContact: [],
  questionsComments: '',
}

export default function OrderRequestForm() {
  const [form, setForm] = useState<OrderRequestFormData>(initialForm)
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const showTshirtColors = form.items.includes('T-shirts')

  const update = <K extends keyof OrderRequestFormData>(
    key: K,
    value: OrderRequestFormData[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    setMessage(null)
  }

  const toggleItem = (item: OrderRequestItem) => {
    setForm((prev) => ({
      ...prev,
      items: prev.items.includes(item)
        ? prev.items.filter((i) => i !== item)
        : [...prev.items, item],
    }))
    setMessage(null)
  }

  const toggleTshirtColor = (color: TshirtColor) => {
    setForm((prev) => ({
      ...prev,
      tshirtColors: prev.tshirtColors.includes(color)
        ? prev.tshirtColors.filter((c) => c !== color)
        : [...prev.tshirtColors, color],
    }))
    setMessage(null)
  }

  const togglePreferredContact = (contact: PreferredContact) => {
    setForm((prev) => ({
      ...prev,
      preferredContact: prev.preferredContact.includes(contact)
        ? prev.preferredContact.filter((c) => c !== contact)
        : [...prev.preferredContact, contact],
    }))
    setMessage(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)

    if (form.items.length === 0) {
      setMessage({ type: 'error', text: 'Please select at least one item.' })
      return
    }
    if (!form.customerName.trim()) {
      setMessage({ type: 'error', text: 'Your name is required.' })
      return
    }
    if (!form.customerPhone.trim()) {
      setMessage({ type: 'error', text: 'Phone number is required.' })
      return
    }
    if (form.preferredContact.length === 0) {
      setMessage({ type: 'error', text: 'Please select at least one preferred contact method.' })
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch('/api/order-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()

      if (!res.ok) {
        setMessage({
          type: 'error',
          text: data.error || 'Failed to submit. Please try again.',
        })
        return
      }
      setMessage({ type: 'success', text: data.message || 'Order request submitted successfully.' })
      setForm(initialForm)
    } catch {
      setMessage({ type: 'error', text: 'Failed to submit. Please try again.' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="order-request-form">
      <p className="pera text-color-tertiary mb-3">
        <span className="text-danger">*</span> Indicates required question
      </p>

      {/* Customer type */}
      <div className="mb-4">
        <label className="form-label text-color-primary fw-semibold">
          Are you a new or existing customer?
        </label>
        <div className="d-flex gap-3 mt-2">
          <label className="d-flex align-items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="customerType"
              checked={form.customerType === 'new'}
              onChange={() => update('customerType', 'new')}
              className="form-check-input"
            />
            <span className="text-color-tertiary">I am a new customer</span>
          </label>
          <label className="d-flex align-items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="customerType"
              checked={form.customerType === 'existing'}
              onChange={() => update('customerType', 'existing')}
              className="form-check-input"
            />
            <span className="text-color-tertiary">I am an existing customer</span>
          </label>
        </div>
      </div>

      {/* Items */}
      <div className="mb-4">
        <label className="form-label text-color-primary fw-semibold">
          What is the item you would like to order? <span className="text-danger">*</span>
        </label>
        <p className="pera text-color-tertiary small mb-2">Please select the products you&apos;d like to order</p>
        <div className="d-flex flex-wrap gap-3">
          {ITEMS.map(({ value, label }) => (
            <label key={value} className="d-flex align-items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.items.includes(value)}
                onChange={() => toggleItem(value)}
                className="form-check-input"
              />
              <span className="text-color-tertiary">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* T-shirt colors (conditional) */}
      {showTshirtColors && (
        <div className="mb-4">
          <label className="form-label text-color-primary fw-semibold">
            What color(s) would you like to order for T-shirts?
          </label>
          <div className="d-flex flex-wrap gap-3">
            {TSHIRT_COLORS.map(({ value, label }) => (
              <label key={value} className="d-flex align-items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.tshirtColors.includes(value)}
                  onChange={() => toggleTshirtColor(value)}
                  className="form-check-input"
                />
                <span className="text-color-tertiary">{label}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Product options */}
      <div className="mb-4">
        <label className="form-label text-color-primary fw-semibold">Product options</label>
        <p className="pera text-color-tertiary small mb-2">
          Please mention T-shirt size and number per color
        </p>
        <textarea
          className="form-control"
          rows={3}
          placeholder="Your answer"
          value={form.productOptions}
          onChange={(e) => update('productOptions', e.target.value)}
        />
      </div>

      {/* Name */}
      <div className="mb-4">
        <label className="form-label text-color-primary fw-semibold">
          Your name <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="Your answer"
          value={form.customerName}
          onChange={(e) => update('customerName', e.target.value)}
          required
        />
      </div>

      {/* Phone */}
      <div className="mb-4">
        <label className="form-label text-color-primary fw-semibold">
          Phone number <span className="text-danger">*</span>
        </label>
        <input
          type="tel"
          className="form-control"
          placeholder="Your answer"
          value={form.customerPhone}
          onChange={(e) => update('customerPhone', e.target.value)}
          required
        />
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="form-label text-color-primary fw-semibold">E-mail</label>
        <input
          type="email"
          className="form-control"
          placeholder="Your answer"
          value={form.customerEmail}
          onChange={(e) => update('customerEmail', e.target.value)}
        />
      </div>

      {/* Preferred contact */}
      <div className="mb-4">
        <label className="form-label text-color-primary fw-semibold">
          Preferred contact method <span className="text-danger">*</span>
        </label>
        <div className="d-flex gap-3">
          {PREFERRED_CONTACT.map(({ value, label }) => (
            <label key={value} className="d-flex align-items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.preferredContact.includes(value)}
                onChange={() => togglePreferredContact(value)}
                className="form-check-input"
              />
              <span className="text-color-tertiary">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Questions and comments */}
      <div className="mb-4">
        <label className="form-label text-color-primary fw-semibold">Questions and comments</label>
        <textarea
          className="form-control"
          rows={3}
          placeholder="Your answer"
          value={form.questionsComments}
          onChange={(e) => update('questionsComments', e.target.value)}
        />
      </div>

      {message && (
        <div
          className={`mb-3 alert ${message.type === 'success' ? 'alert-success' : 'alert-danger'}`}
          role="alert"
        >
          {message.text}
        </div>
      )}

      <button
        type="submit"
        className="btn btn-primary px-4 py-2"
        disabled={submitting}
        style={{ backgroundColor: 'var(--primary-btn)', border: 'none' }}
      >
        {submitting ? 'Submitting...' : 'Submit'}
      </button>

      <style jsx>{`
        .cursor-pointer {
          cursor: pointer;
        }
        .order-request-form .form-control {
          border: 1px solid var(--secondary-border);
          border-radius: 4px;
          padding: 0.5rem 0.75rem;
        }
        .order-request-form .form-control:focus {
          border-color: var(--primary-color);
          box-shadow: 0 0 0 0.2rem rgba(173, 140, 92, 0.25);
        }
        .order-request-form .form-check-input:checked {
          background-color: var(--primary-btn);
          border-color: var(--primary-btn);
        }
      `}</style>
    </form>
  )
}
