import { NextRequest, NextResponse } from 'next/server'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
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
    if (!isSupabaseConfigured() || !supabase) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 503 }
      )
    }

    const body = await request.json()
    if (!validateOrderRequest(body)) {
      return NextResponse.json(
        { error: 'Invalid form data. Name, phone, items, and preferred contact are required.' },
        { status: 400 }
      )
    }

    const {
      customerType,
      items,
      tshirtColors,
      productOptions,
      customerName,
      customerPhone,
      customerEmail,
      preferredContact,
      questionsComments,
    } = body as OrderRequestFormData

    const { error } = await supabase.from('order_requests').insert({
      customer_type: customerType,
      items,
      tshirt_colors: tshirtColors.length > 0 ? tshirtColors : null,
      product_options: productOptions?.trim() || null,
      customer_name: customerName.trim(),
      customer_phone: customerPhone.trim(),
      customer_email: customerEmail?.trim() || null,
      preferred_contact_method: preferredContact,
      questions_comments: questionsComments?.trim() || null,
      status: 'pending',
    })

    if (error) {
      console.error('Error inserting order request:', error)
      return NextResponse.json(
        { error: 'Failed to save order request' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { success: true, message: 'Order request submitted successfully. We will contact you soon.' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating order request:', error)
    return NextResponse.json(
      { error: 'Failed to submit order request' },
      { status: 500 }
    )
  }
}
