"use client"

import { createContext, useContext, useEffect, useState } from "react"

interface Product {
  id: number
  name: string
  price: number
  quantity: number
  image?: string
}

interface CartContextType {
  cart: Product[]
  addToCart: (product: Product, delta?: number) => void
  removeFromCart: (id: number) => void
  clearCart: () => void
  totalItems: number
}

const CartContext = createContext<CartContextType | null>(null)

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<Product[]>([])

  useEffect(() => {
    const storedCart = localStorage.getItem("cart")
    if (storedCart) setCart(JSON.parse(storedCart))
  }, [])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  // Función addToCart mejorada: suma o resta cantidad
  const addToCart = (product: Product, delta = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id)

      if (existing) {
        const newQuantity = existing.quantity + delta
        if (newQuantity <= 0) {
          return prev.filter(item => item.id !== product.id)
        }
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: newQuantity } : item
        )
      }

      if (delta <= 0) return prev
      return [...prev, { ...product, quantity: delta }]
    })
  }

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id))
  }

  const clearCart = () => {
    setCart([])
  }

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, totalItems }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error("useCart must be used inside CartProvider")
  return context
}
