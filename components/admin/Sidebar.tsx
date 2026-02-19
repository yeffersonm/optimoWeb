"use client"

import Link from "next/link"

export default function Sidebar() {
  return (
    <div
      style={{
        width: 260,
        background: "#111827",
        color: "#fff",
        padding: 25,
        display: "flex",
        flexDirection: "column",
        gap: 20
      }}
    >
      <h2 style={{ marginBottom: 30 }}>⚡ Optimo Admin</h2>

      <Link href="/admin" style={linkStyle}>Dashboard</Link>
      <Link href="/admin/productos" style={linkStyle}>Productos</Link>
      <Link href="/admin/pedidos" style={linkStyle}>Pedidos</Link>
      <Link href="/admin/clientes" style={linkStyle}>Clientes</Link>
      <Link href="/admin/reportes" style={linkStyle}>Reportes</Link>
    </div>
  )
}

const linkStyle = {
  color: "#d1d5db",
  textDecoration: "none",
  padding: "10px 0"
}
