"use client"

import { useState } from "react"
import ProductTable from "../../../components/admin/ProductTable"
import CreateProductModal from "../../../components/admin/CreateProductModal"

export default function AdminProducts() {
  const [search, setSearch] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [products, setProducts] = useState<any[]>([])

  return (
    <div>
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 25
        }}
      >
        <div>
          <h1 style={{ margin: 0 }}>Productos</h1>
          <p style={{ color: "#6b7280", marginTop: 5 }}>
            Gestiona tu catálogo profesionalmente
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          style={{
            padding: "12px 20px",
            borderRadius: 10,
            border: "none",
            background: "linear-gradient(90deg,#2563eb,#1e40af)",
            color: "#fff",
            cursor: "pointer",
            fontWeight: 500
          }}
        >
          + Nuevo Producto
        </button>
      </div>

      {/* BUSCADOR */}
      <input
        placeholder="Buscar producto..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: 12,
          borderRadius: 8,
          border: "1px solid #e5e7eb",
          marginBottom: 20
        }}
      />

      {/* TABLA */}
      <ProductTable search={search} products={products} />

      {/* MODAL */}
      {showModal && (
        <CreateProductModal
          onClose={() => setShowModal(false)}
          onCreate={(newProduct) => {
            setProducts((prev) => [...prev, newProduct])
          }}
        />
      )}
    </div>
  )
}
