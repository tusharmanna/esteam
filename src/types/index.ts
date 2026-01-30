export interface Product {
  id: string
  name: string
  price: number
  image: string
  description: string
  category: string
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface CustomerInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  zipCode: string
}

export interface PaymentInfo {
  cardNumber: string
  cardName: string
  expiry: string
  cvv: string
}

export interface Order {
  id: string
  items: CartItem[]
  customer: CustomerInfo
  total: number
  date: Date
}
