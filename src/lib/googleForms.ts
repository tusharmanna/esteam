import { CartItem } from '@/types'
import type { OrderRequestFormData } from '@/types'

export function generateOrderId(): string {
  return 'EST-' + Math.random().toString(36).substring(2, 10).toUpperCase()
}

export function isOrdersFormConfigured(): boolean {
  return !!(process.env.GOOGLE_FORMS_ORDERS_FORM_ID && process.env.GOOGLE_FORMS_ORDERS_FIELD_ORDER_ID)
}

export function isRequestsFormConfigured(): boolean {
  return !!(process.env.GOOGLE_FORMS_REQUESTS_FORM_ID && process.env.GOOGLE_FORMS_REQUESTS_FIELD_NAME)
}

interface OrderFormData {
  orderId: string
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  zip: string
  items: CartItem[]
  total: number
  date: string
}

export async function submitOrderToGoogleForms(data: OrderFormData): Promise<void> {
  const formId = process.env.GOOGLE_FORMS_ORDERS_FORM_ID
  const url = `https://docs.google.com/forms/d/e/${formId}/formResponse`

  const itemsString = data.items
    .map((item) => `${item.product.name} x${item.quantity} @ $${item.product.price.toFixed(2)}`)
    .join(', ')

  const params = new URLSearchParams()
  params.append('fvv', '1')
  params.append('pageHistory', '0')
  params.append('fbzx', Math.floor(Math.random() * 1e16).toString())
  appendField(params, process.env.GOOGLE_FORMS_ORDERS_FIELD_ORDER_ID, data.orderId)
  appendField(params, process.env.GOOGLE_FORMS_ORDERS_FIELD_FIRST_NAME, data.firstName)
  appendField(params, process.env.GOOGLE_FORMS_ORDERS_FIELD_LAST_NAME, data.lastName)
  appendField(params, process.env.GOOGLE_FORMS_ORDERS_FIELD_EMAIL, data.email)
  appendField(params, process.env.GOOGLE_FORMS_ORDERS_FIELD_PHONE, data.phone)
  appendField(params, process.env.GOOGLE_FORMS_ORDERS_FIELD_ADDRESS, data.address)
  appendField(params, process.env.GOOGLE_FORMS_ORDERS_FIELD_CITY, data.city)
  appendField(params, process.env.GOOGLE_FORMS_ORDERS_FIELD_ZIP, data.zip)
  appendField(params, process.env.GOOGLE_FORMS_ORDERS_FIELD_ITEMS, itemsString)
  appendField(params, process.env.GOOGLE_FORMS_ORDERS_FIELD_TOTAL, `$${data.total.toFixed(2)}`)
  appendField(params, process.env.GOOGLE_FORMS_ORDERS_FIELD_DATE, data.date)

  const ordersFormId = process.env.GOOGLE_FORMS_ORDERS_FORM_ID
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Referer': `https://docs.google.com/forms/d/e/${ordersFormId}/viewform`,
      'Origin': 'https://docs.google.com',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    },
    body: params.toString(),
    redirect: 'follow',
  })
  console.log('[Orders Form] status:', res.status, 'url:', res.url)
}

export async function submitOrderRequestToGoogleForms(data: OrderRequestFormData): Promise<void> {
  const formId = process.env.GOOGLE_FORMS_REQUESTS_FORM_ID
  const url = `https://docs.google.com/forms/d/e/${formId}/formResponse`

  const params = new URLSearchParams()
  params.append('fvv', '1')
  params.append('pageHistory', '0')
  params.append('fbzx', Math.floor(Math.random() * 1e16).toString())
  const customerTypeLabel = data.customerType === 'new' ? 'I am a new customer' : 'I am an existing customer'
  appendField(params, process.env.GOOGLE_FORMS_REQUESTS_FIELD_CUSTOMER_TYPE, customerTypeLabel)
  appendMultiField(params, process.env.GOOGLE_FORMS_REQUESTS_FIELD_ITEMS, data.items)
  appendMultiField(params, process.env.GOOGLE_FORMS_REQUESTS_FIELD_TSHIRT_COLORS, data.tshirtColors)
  appendField(params, process.env.GOOGLE_FORMS_REQUESTS_FIELD_PRODUCT_OPTIONS, data.productOptions ?? '')
  appendField(params, process.env.GOOGLE_FORMS_REQUESTS_FIELD_NAME, data.customerName)
  appendField(params, process.env.GOOGLE_FORMS_REQUESTS_FIELD_PHONE, data.customerPhone)
  appendField(params, process.env.GOOGLE_FORMS_REQUESTS_FIELD_EMAIL, data.customerEmail ?? '')
  appendMultiField(params, process.env.GOOGLE_FORMS_REQUESTS_FIELD_PREFERRED_CONTACT, data.preferredContact)
  appendField(params, process.env.GOOGLE_FORMS_REQUESTS_FIELD_COMMENTS, data.questionsComments ?? '')

  console.log('[Requests Form] body:', params.toString())
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Referer': `https://docs.google.com/forms/d/e/${formId}/viewform`,
      'Origin': 'https://docs.google.com',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    },
    body: params.toString(),
    redirect: 'follow',
  })
  console.log('[Requests Form] status:', res.status, 'url:', res.url)
}

function appendField(params: URLSearchParams, key: string | undefined, value: string): void {
  if (key && value) {
    params.append(key, value)
  }
}

function appendMultiField(params: URLSearchParams, key: string | undefined, values: string[]): void {
  if (key && values) {
    for (const v of values) {
      params.append(key, v)
    }
  }
}
