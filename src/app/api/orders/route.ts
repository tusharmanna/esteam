import { NextRequest, NextResponse } from 'next/server'
import { supabase, generateOrderId, isSupabaseConfigured } from '@/lib/supabase'
import { CartItem, CustomerInfo } from '@/types'

interface CreateOrderRequest {
  customer: CustomerInfo
  items: CartItem[]
  total: number
}

export async function POST(request: NextRequest) {
  try {
    if (!isSupabaseConfigured() || !supabase) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 503 }
      )
    }

    const body: CreateOrderRequest = await request.json()
    const { customer, items, total } = body

    // Validate request
    if (!customer || !items || items.length === 0) {
      return NextResponse.json(
        { error: 'Invalid order data' },
        { status: 400 }
      )
    }

    const orderId = generateOrderId()

    // Insert order
    const { error: orderError } = await supabase
      .from('orders')
      .insert({
        id: orderId,
        customer_first_name: customer.firstName,
        customer_last_name: customer.lastName,
        customer_email: customer.email,
        customer_phone: customer.phone,
        customer_address: customer.address,
        customer_city: customer.city,
        customer_zip: customer.zipCode,
        total: total,
        status: 'confirmed',
      })

    if (orderError) {
      console.error('Error inserting order:', orderError)
      return NextResponse.json(
        { error: 'Failed to create order' },
        { status: 500 }
      )
    }

    // Insert order items
    const orderItems = items.map((item) => ({
      order_id: orderId,
      product_id: item.product.id,
      product_name: item.product.name,
      product_price: item.product.price,
      quantity: item.quantity,
    }))

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems)

    if (itemsError) {
      console.error('Error inserting order items:', itemsError)
      // Rollback order if items fail
      await supabase.from('orders').delete().eq('id', orderId)
      return NextResponse.json(
        { error: 'Failed to create order items' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        orderId,
        message: 'Order created successfully',
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    if (!isSupabaseConfigured() || !supabase) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 503 }
      )
    }

    const { data: orders, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50)

    if (error) {
      throw error
    }

    return NextResponse.json({ orders })
  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    )
  }
}
