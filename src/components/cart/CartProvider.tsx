'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { Product, CartItem } from '@/types'

const DISCOUNT_CODES: Record<string, number> = {
  SAVE10: 10,
  SAVE20: 20,
  ESTEAM15: 15,
}

interface CartContextType {
  items: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
  getItemCount: () => number
  discountCode: string | null
  discountPercent: number
  applyDiscount: (code: string) => { success: boolean; message: string }
  removeDiscount: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const CART_STORAGE_KEY = 'esteam-cart'

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [discountCode, setDiscountCode] = useState<string | null>(null)
  const [discountPercent, setDiscountPercent] = useState(0)

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY)
    if (storedCart) {
      try {
        setItems(JSON.parse(storedCart))
      } catch {
        console.error('Failed to parse cart from localStorage')
      }
    }
    setIsLoaded(true)
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
    }
  }, [items, isLoaded])

  const addToCart = (product: Product) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.product.id === product.id
      )
      if (existingItem) {
        return currentItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...currentItems, { product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId: string) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.product.id !== productId)
    )
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    setItems([])
    setDiscountCode(null)
    setDiscountPercent(0)
  }

  const applyDiscount = (code: string): { success: boolean; message: string } => {
    const upper = code.trim().toUpperCase()
    if (upper in DISCOUNT_CODES) {
      setDiscountCode(upper)
      setDiscountPercent(DISCOUNT_CODES[upper])
      return { success: true, message: `${DISCOUNT_CODES[upper]}% discount applied!` }
    }
    return { success: false, message: 'Invalid discount code.' }
  }

  const removeDiscount = () => {
    setDiscountCode(null)
    setDiscountPercent(0)
  }

  const getTotal = () => {
    return items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    )
  }

  const getItemCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0)
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotal,
        getItemCount,
        discountCode,
        discountPercent,
        applyDiscount,
        removeDiscount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
