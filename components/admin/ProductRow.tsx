"use client"

interface Product {
  id: number
  nombre: string
  precio: number
  stock: number
  activo: boolean
}

export default function ProductRow({ product }: { product: Product }) {
  return (
    <tr style={{ borderTop: "1px solid #f3f4f6" }}>
      <td style={tdStyle}>{product.nombre}</td>
      <td style={tdStyle}>${product.precio.toLocaleString()}</td>
      <td style={tdStyle}>
        {product.stock > 0 ? product.stock : "Sin stock"}
      </td>
      <td style={tdStyle}>
        <span
          style={{
            padding: "6px 10px",
            borderRadius: 20,
            fontSize: 12,
            background: product.activo ? "#dcfce7" : "#fee2e2",
            color: product.activo ? "#166534" : "#991b1b"
          }}
        >
          {product.activo ? "Activo" : "Inactivo"}
        </span>
      </td>

      <td style={{ ...tdStyle, display: "flex", gap: 10 }}>
        <button style={editBtn}>Editar</button>
        <button style={deleteBtn}>Eliminar</button>
      </td>
    </tr>
  )
}

const tdStyle = {
  padding: 15,
  fontSize: 14
}

const editBtn = {
  padding: "6px 12px",
  borderRadius: 8,
  border: "1px solid #2563eb",
  background: "transparent",
  color: "#2563eb",
  cursor: "pointer"
}

const deleteBtn = {
  padding: "6px 12px",
  borderRadius: 8,
  border: "1px solid #ef4444",
  background: "transparent",
  color: "#ef4444",
  cursor: "pointer"
}
