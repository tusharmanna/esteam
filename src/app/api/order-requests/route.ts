import { NextRequest, NextResponse } from 'next/server'
import type { OrderRequestFormData } from '@/types'

function validateOrderRequest(body: unknown): body is OrderRequestFormData {
  if (!body || typeof body !== 'object') return false
  const b = body as Record<string, unknown>
  return (
    (b.customerType === 'new' || b.customerType === 'existing') &&
    Array.isArray(b.items) &&
    b.items.length > 0 &&
    typeof b.customerName === 'string' &&
    b.customerName.trim().length > 0 &&
    typeof b.customerPhone === 'string' &&
    b.customerPhone.trim().length > 0 &&
    Array.isArray(b.preferredContact) &&
    b.preferredContact.length > 0
  )
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    if (!validateOrderRequest(body)) {
      return NextResponse.json(
        { error: 'Invalid form data. Name, phone, items, and preferred contact are required.' },
        { status: 400 }
      )
    }

    const scriptUrl = process.env.APPS_SCRIPT_ORDER_REQUESTS_URL
    if (!scriptUrl) {
      console.warn('APPS_SCRIPT_ORDER_REQUESTS_URL is not configured — skipping submission')
      return NextResponse.json(
        { success: true, message: 'Order request submitted successfully. We will contact you soon.' },
        { status: 201 }
      )
    }

    const res = await fetch(scriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      redirect: 'follow',
    })
    console.log('[Order Requests Script] status:', res.status)

    return NextResponse.json(
      { success: true, message: 'Order request submitted successfully. We will contact you soon.' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating order request:', error)
    return NextResponse.json({ error: 'Failed to submit order request' }, { status: 500 })
  }
}
