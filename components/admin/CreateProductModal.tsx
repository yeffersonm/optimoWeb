"use client"

import { useState } from "react"

export default function CreateProductModal({
  onClose,
  onCreate
}: {
  onClose: () => void
  onCreate: (product: any) => void
}) {
  const [nombre, setNombre] = useState("")
  const [precio, setPrecio] = useState("")
  const [stock, setStock] = useState("")
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handleImage = (e: any) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = () => {
    if (!nombre || !precio) return alert("Completa los campos")

    onCreate({
      id: Date.now(),
      nombre,
      precio: Number(precio),
      stock: Number(stock),
      activo: true,
      imagen: imagePreview
    })

    onClose()
  }

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h2 style={{ marginBottom: 20 }}>Nuevo Producto</h2>

        <input
          placeholder="Nombre del producto"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          style={inputStyle}
        />

        <input
          type="number"
          placeholder="Precio"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          style={inputStyle}
        />

        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          style={inputStyle}
        />

        <input type="file" onChange={handleImage} />

        {imagePreview && (
          <img
            src={imagePreview}
            alt="preview"
            style={{
              width: "100%",
              marginTop: 15,
              borderRadius: 10
            }}
          />
        )}

        <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
          <button onClick={onClose} style={cancelBtn}>
            Cancelar
          </button>
          <button onClick={handleSubmit} style={createBtn}>
            Crear Producto
          </button>
        </div>
      </div>
    </div>
  )
}

/* ESTILOS */

const overlayStyle = {
  position: "fixed" as const,
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(0,0,0,0.5)",
  backdropFilter: "blur(4px)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000
}

const modalStyle = {
  background: "#fff",
  padding: 30,
  borderRadius: 16,
  width: 400,
  boxShadow: "0 20px 60px rgba(0,0,0,0.2)"
}

const inputStyle = {
  width: "100%",
  padding: 10,
  marginBottom: 12,
  borderRadius: 8,
  border: "1px solid #e5e7eb"
}

const cancelBtn = {
  flex: 1,
  padding: 10,
  borderRadius: 8,
  border: "1px solid #d1d5db",
  background: "#f3f4f6",
  cursor: "pointer"
}

const createBtn = {
  flex: 1,
  padding: 10,
  borderRadius: 8,
  border: "none",
  background: "linear-gradient(90deg,#2563eb,#1e40af)",
  color: "#fff",
  cursor: "pointer"
}
