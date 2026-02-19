"use client"
import Link from "next/link"
import { useCart } from "@/context/CartContext"

export default function Navbar() {
  const { totalItems } = useCart()

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'space-between',
      padding: 20,
      background: "#111827",
      color: "#fff"
    }}>
      <Link href="/" style={{ color: "#fff", textDecoration: "none", fontWeight: 'bold' }}>
        🏢 Optimo
      </Link>

      <div style={{ display: 'flex', gap: 20 }}>
        <Link href="/productos" style={{ color: "#fff", textDecoration: "none" }}>
          Productos
        </Link>
        <Link href="/carrito" style={{ color: "#fff", textDecoration: "none" }}>
          🛒 Carrito ({totalItems})
        </Link>
        <Link href="/admin" style={{ color: "#fff", textDecoration: "none" }}>
          Admin
        </Link>
      </div>
    </nav>
  )
}
