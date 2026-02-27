import { NextRequest, NextResponse } from 'next/server'
import { generateOrderId, isOrdersFormConfigured, submitOrderToGoogleForms } from '@/lib/googleForms'
import { CartItem, CustomerInfo } from '@/types'

interface CreateOrderRequest {
  customer: CustomerInfo
  items: CartItem[]
  total: number
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateOrderRequest = await request.json()
    const { customer, items, total } = body

    if (!customer || !items || items.length === 0) {
      return NextResponse.json({ error: 'Invalid order data' }, { status: 400 })
    }

    const orderId = generateOrderId()
    const date = new Date().toISOString()

    if (!isOrdersFormConfigured()) {
      console.warn('Google Forms orders form is not configured — skipping submission')
      return NextResponse.json({ success: true, orderId }, { status: 201 })
    }

    await submitOrderToGoogleForms({
      orderId,
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      phone: customer.phone,
      address: customer.address,
      city: customer.city,
      zip: customer.zipCode,
      items,
      total,
      date,
    })

    return NextResponse.json({ success: true, orderId }, { status: 201 })
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }
}
