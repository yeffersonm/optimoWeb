"use client"

import ProductRow from "./ProductRow"

interface Product {
  id: number
  nombre: string
  precio: number
  stock: number
  activo: boolean
}

export default function ProductTable({
  search,
  products
}: {
  search: string
  products: Product[]
}) {
  const filtered = products.filter((p) =>
    p.nombre.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 16,
        boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
        overflow: "hidden"
      }}
    >
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead style={{ background: "#f9fafb" }}>
          <tr>
            <th style={thStyle}>Producto</th>
            <th style={thStyle}>Precio</th>
            <th style={thStyle}>Stock</th>
            <th style={thStyle}>Estado</th>
            <th style={thStyle}>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((product) => (
            <ProductRow key={product.id} product={product} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

const thStyle = {
  textAlign: "left" as const,
  padding: 15,
  fontSize: 14,
  color: "#6b7280"
}
