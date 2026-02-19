"use client"

import { useCart } from "@/context/CartContext"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function CarritoPage() {
  const router = useRouter()
  const { cart, addToCart, removeFromCart, totalItems } = useCart()
  const [discount, setDiscount] = useState(0)

  const changeQuantity = (productId: number, delta: number) => {
    const item = cart.find(p => p.id === productId)
    if (!item) return
    addToCart(item, delta)
  }

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const tax = subtotal * 0.19
  const shipping = cart.length > 0 ? 10000 : 0
  const total = subtotal + tax + shipping - discount

  const applyCoupon = (code: string) => {
    if (code === "PRO10") {
      setDiscount(10000)
      alert("Cupón aplicado ✔")
    } else {
      setDiscount(0)
      alert("Cupón inválido")
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* Productos */}
        <div style={styles.card}>
          <h2 style={{ marginBottom: 30 }}>Tu Carrito ({totalItems} productos)</h2>

          {cart.length === 0 ? (
            <div style={styles.empty}>🛒 Tu carrito está vacío</div>
          ) : (
            cart.map(item => (
              <div key={item.id} style={styles.product}>
                <img src={item.image || "https://via.placeholder.com/150"} style={styles.image} />

                <div style={{ flex: 1 }}>
                  <h3 style={styles.productName}>{item.name}</h3>
                  <p style={styles.productPrice}>${item.price.toLocaleString()}</p>

                  <div style={styles.counter}>
                    <button onClick={() => changeQuantity(item.id, -1)} style={styles.counterBtn}>-</button>
                    <span style={styles.quantity}>{item.quantity}</span>
                    <button onClick={() => changeQuantity(item.id, 1)} style={styles.counterBtn}>+</button>
                  </div>
                </div>

                <div style={{ textAlign: "right" }}>
                  <p style={styles.productTotal}>${(item.price * item.quantity).toLocaleString()}</p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    style={styles.remove}
                    title="Eliminar producto"
                  >
                    ❌
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Resumen */}
        <div style={styles.cardSummary}>
          <h2 style={{ marginBottom: 20 }}>Resumen de Compra</h2>

          <div style={styles.row}>
            <span>Subtotal</span>
            <span>${subtotal.toLocaleString()}</span>
          </div>
          <div style={styles.row}>
            <span>Impuestos (19%)</span>
            <span>${tax.toLocaleString()}</span>
          </div>
          <div style={styles.row}>
            <span>Envío</span>
            <span>${shipping.toLocaleString()}</span>
          </div>

          <hr style={{ margin: "20px 0" }} />

          <div style={{ ...styles.row, fontWeight: "bold", fontSize: 20, color: "#1e3a8a" }}>
            <span>Total</span>
            <span>${total.toLocaleString()}</span>
          </div>

          <input
            type="text"
            placeholder="Ingresa tu cupón"
            onBlur={(e) => applyCoupon(e.target.value)}
            style={styles.input}
          />

          <button
            onClick={() => router.push("/checkout")}
            style={styles.checkout}
          >
            Finalizar Compra
          </button>

          <p style={styles.secure}>
            🔒 Pago 100% seguro • Integrado con PayU
          </p>
        </div>
      </div>
    </div>
  )
}

const styles: any = {
  page: { background: "#f4f6f9", minHeight: "100vh", padding: "40px 20px" },
  container: {
    maxWidth: 1200,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: 40
  },
  card: {
    background: "#fff",
    borderRadius: 20,
    padding: 30,
    boxShadow: "0 15px 40px rgba(0,0,0,0.08)",
    transition: "transform 0.3s",
  },
  cardSummary: {
    background: "linear-gradient(180deg,#e0f2fe,#bae6fd)",
    borderRadius: 20,
    padding: 30,
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    position: "sticky",
    top: 120
  },
  product: {
    display: "flex",
    gap: 20,
    alignItems: "center",
    borderBottom: "1px solid #eee",
    padding: "20px 0",
    transition: "transform 0.3s",
    borderRadius: 12
  },
  image: { width: 120, borderRadius: 16, objectFit: "cover", boxShadow: "0 5px 15px rgba(0,0,0,0.1)" },
  productName: { fontSize: 18, fontWeight: 600 },
  productPrice: { fontSize: 16, color: "#1e3a8a", marginBottom: 10 },
  productTotal: { fontSize: 18, fontWeight: "bold", color: "#2563eb" },
  input: { width: "100%", padding: 10, borderRadius: 10, border: "1px solid #ccc", marginTop: 15 },
  remove: { background: "none", border: "none", color: "#ef4444", cursor: "pointer", fontSize: 20, marginTop: 10 },
  row: { display: "flex", justifyContent: "space-between", margin: "10px 0" },
  checkout: {
    width: "100%",
    padding: 15,
    borderRadius: 12,
    border: "none",
    background: "linear-gradient(90deg,#2563eb,#1e40af)",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: 20,
    fontSize: 16,
    transition: "transform 0.2s",
  },
  secure: { marginTop: 15, fontSize: 13, color: "#1e3a8a", textAlign: "center" },
  empty: { padding: 40, textAlign: "center", color: "#6b7280", fontSize: 18 },
  counter: { display: "flex", alignItems: "center", gap: 10 },
  counterBtn: {
    width: 35,
    height: 35,
    borderRadius: 8,
    border: "none",
    background: "#2563eb",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: 18,
    transition: "transform 0.2s"
  },
  quantity: { fontSize: 16, fontWeight: 600, width: 30, textAlign: "center" }
}
