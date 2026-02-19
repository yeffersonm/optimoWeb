"use client"

import { useEffect, useState } from "react"

export default function CheckoutPage() {
  const [cart, setCart] = useState<any[]>([])

  useEffect(() => {
    const storedCart = localStorage.getItem("cart")
    if (storedCart) {
      setCart(JSON.parse(storedCart))
    }
  }, [])

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  )

  const tax = subtotal * 0.19
  const shipping = cart.length > 0 ? 10000 : 0
  const total = subtotal + tax + shipping

  return (
    <div style={{ background: "#f8fafc", minHeight: "100vh", padding: "60px 20px" }}>
      <div style={{
        maxWidth: 1200,
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "2fr 1fr",
        gap: 40
      }}>

        {/* FORMULARIO */}
        <div style={cardStyle}>
          <h2 style={sectionTitle}>Información de Envío</h2>

          <div style={{ display: "grid", gap: 15 }}>
            <input placeholder="Nombre completo" style={inputStyle} />
            <input placeholder="Correo electrónico" style={inputStyle} />
            <input placeholder="Teléfono" style={inputStyle} />
            <input placeholder="Dirección" style={inputStyle} />
            <input placeholder="Ciudad" style={inputStyle} />
          </div>

          <h2 style={{ ...sectionTitle, marginTop: 40 }}>
            Método de Pago
          </h2>

          <div style={paymentBox}>
            <span>💳 PayU</span>
            <span style={{ fontSize: 13, color: "#6b7280" }}>
              Tarjetas débito y crédito
            </span>
          </div>
        </div>

        {/* RESUMEN */}
        <div style={cardStyle}>
          <h2 style={sectionTitle}>Resumen del Pedido</h2>

          <div style={{ marginBottom: 20 }}>
            {cart.map((item) => (
              <div key={item.id} style={productRow}>
                <img
                  src={item.image}
                  style={{
                    width: 60,
                    height: 60,
                    objectFit: "cover",
                    borderRadius: 8
                  }}
                />

                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600 }}>{item.name}</div>
                  <div style={{ fontSize: 13, color: "#6b7280" }}>
                    Cantidad: {item.quantity}
                  </div>
                </div>

                <div style={{ fontWeight: 600 }}>
                  ${(item.price * item.quantity).toLocaleString()}
                </div>
              </div>
            ))}
          </div>

          <div style={divider} />

          <div style={rowStyle}>
            <span>Subtotal</span>
            <span>${subtotal.toLocaleString()}</span>
          </div>

          <div style={rowStyle}>
            <span>Impuestos (19%)</span>
            <span>${tax.toLocaleString()}</span>
          </div>

          <div style={rowStyle}>
            <span>Envío</span>
            <span>${shipping.toLocaleString()}</span>
          </div>

          <div style={divider} />

          <div style={{ ...rowStyle, fontWeight: "bold", fontSize: 20 }}>
            <span>Total</span>
            <span>${total.toLocaleString()}</span>
          </div>

          <button
            style={payButton}
            onClick={() => alert("Aquí conectamos PayU después 👌")}
          >
            🔒 Pagar ahora
          </button>

          <p style={{
            marginTop: 12,
            fontSize: 13,
            color: "#6b7280",
            textAlign: "center"
          }}>
            Pago 100% seguro y encriptado
          </p>
        </div>

      </div>
    </div>
  )
}

const cardStyle = {
  background: "#fff",
  padding: 30,
  borderRadius: 20,
  boxShadow: "0 20px 50px rgba(0,0,0,0.05)"
}

const sectionTitle = {
  marginBottom: 20,
  fontSize: 20,
  fontWeight: 700
}

const inputStyle = {
  width: "100%",
  padding: 14,
  borderRadius: 10,
  border: "1px solid #e5e7eb",
  fontSize: 14,
  outline: "none"
}

const paymentBox = {
  padding: 15,
  borderRadius: 12,
  border: "1px solid #e5e7eb",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
}

const productRow = {
  display: "flex",
  alignItems: "center",
  gap: 15,
  marginBottom: 15
}

const rowStyle = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: 10
}

const divider = {
  height: 1,
  background: "#e5e7eb",
  margin: "20px 0"
}

const payButton = {
  width: "100%",
  marginTop: 25,
  padding: 16,
  borderRadius: 14,
  border: "none",
  background: "linear-gradient(90deg,#2563eb,#1e3a8a)",
  color: "#fff",
  fontSize: 16,
  fontWeight: 600,
  cursor: "pointer",
  transition: "0.3s"
}
