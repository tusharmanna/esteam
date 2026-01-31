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

// Order request form (ESteam order request / lead form)
export type CustomerType = 'new' | 'existing'
export type OrderRequestItem =
  | 'T-shirts'
  | 'Coffee Mugs'
  | 'Key Chains'
  | 'Coasters'
  | 'Plates'
export type TshirtColor =
  | 'White'
  | 'Black'
  | 'Red'
  | 'Blue'
  | 'Green'
  | 'Yellow'
export type PreferredContact = 'Phone' | 'Email'

export interface OrderRequestFormData {
  customerType: CustomerType
  items: OrderRequestItem[]
  tshirtColors: TshirtColor[]
  productOptions: string
  customerName: string
  customerPhone: string
  customerEmail: string
  preferredContact: PreferredContact[]
  questionsComments: string
}
