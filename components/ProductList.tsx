"use client"

import { useState, useMemo } from "react"
import { useCart } from "@/context/CartContext"

export default function ProductList({ productos }: any) {
const { cart, addToCart } = useCart()

  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [search, setSearch] = useState("")
  const [sortOrder, setSortOrder] = useState("default")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)

  const productsPerPage = 6

  // Categorías dinámicas
  const categories = useMemo(() => {
    return ["Todos", ...new Set(productos.map((p: any) => p.categoria))]
  }, [productos])

  // Filtrado
  const filteredProducts = useMemo(() => {
    let filtered = [...productos]

    if (selectedCategory !== "Todos") {
      filtered = filtered.filter(
        (p: any) => p.categoria === selectedCategory
      )
    }

    if (search) {
      filtered = filtered.filter((p: any) =>
        p.nombre.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (sortOrder === "asc") {
      filtered.sort((a, b) => a.precio - b.precio)
    }

    if (sortOrder === "desc") {
      filtered.sort((a, b) => b.precio - a.precio)
    }

    return filtered
  }, [productos, selectedCategory, search, sortOrder])

  // Paginación
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)
  const startIndex = (currentPage - 1) * productsPerPage
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage
  )



  const getQuantity = (id: number) => {
    const item = cart.find((p) => p.id === id)
    return item ? item.quantity : 0
  }

  return (
    <div style={{ padding: 60, background: "#f4f6f9" }}>

      {/* CONTROLES SUPERIORES */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 20,
        marginBottom: 40
      }}>
        {/* Buscador */}
        <input
          placeholder="Buscar producto..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setCurrentPage(1)
          }}
          style={{
            padding: 10,
            borderRadius: 8,
            border: "1px solid #ddd",
            width: 250
          }}
        />

        {/* Ordenar */}
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          style={{
            padding: 10,
            borderRadius: 8,
            border: "1px solid #ddd"
          }}
        >
          <option value="default">Ordenar</option>
          <option value="asc">Precio ↑</option>
          <option value="desc">Precio ↓</option>
        </select>
      </div>

      {/* CATEGORÍAS */}
      <div style={{ display: "flex", gap: 10, marginBottom: 30, flexWrap: "wrap" }}>
        {categories.map((cat: string) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat)
              setCurrentPage(1)
            }}
            style={{
              padding: "8px 16px",
              borderRadius: 20,
              border: "none",
              cursor: "pointer",
              background:
                selectedCategory === cat ? "#2563eb" : "#e5e7eb",
              color: selectedCategory === cat ? "#fff" : "#111",
              fontWeight: 600
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* GRID PRODUCTOS */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: 30
      }}>
        {paginatedProducts.map((producto: any) => {
          const quantity = getQuantity(producto.id)
          const productData = {
          id: producto.id,
          name: producto.nombre,
          price: producto.precio,
          image: producto.imagen_url,
          quantity: 1
          }

          return (
            <div key={producto.id} style={{
              background: "#fff",
              borderRadius: 16,
              overflow: "hidden",
              boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
              transition: "0.3s"
            }}>
              <img
                src={producto.imagen_url}
                alt={producto.nombre}
                loading="lazy"
                style={{
                  width: "100%",
                  height: 220,
                  objectFit: "cover"
                }}
              />

              <div style={{ padding: 20 }}>
                <h3 style={{ color: "#1e3a8a" }}>
                  {producto.nombre}
                </h3>

                <p style={{
                  fontWeight: "bold",
                  color: "#2563eb",
                  fontSize: 18
                }}>
                  ${producto.precio.toLocaleString()}
                </p>

                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 15
                }}>
                  <button
                    onClick={() => setSelectedProduct(producto)}
                    style={styles.detailBtn}
                  >
                    Ver Detalle
                  </button>

                  {quantity === 0 ? (
                    <button
                      onClick={() =>
                        addToCart({
                          id: producto.id,
                          name: producto.nombre,
                          price: producto.precio,
                          image: producto.imagen_url
                        })
                      }
                      style={styles.addBtn}
                    >
                      Agregar
                    </button>
                  ) : (
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <button
                        onClick={() => addToCart(productData, -1)}
                        style={styles.counterBtn}
                      >-</button>

                      <span style={{ fontWeight: 600 }}>{quantity}</span>

                      <button
                        onClick={() => addToCart(productData, 1)}
                        style={styles.counterBtn}
                      >+</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* PAGINACIÓN */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: 20,
        marginTop: 40
      }}>
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
        >
          Prev
        </button>

        <span>Página {currentPage} de {totalPages}</span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
        >
          Next
        </button>
      </div>

      {/* MODAL */}
      {selectedProduct && (
        <div style={styles.modalOverlay}
          onClick={() => setSelectedProduct(null)}
        >
          <div style={styles.modal}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedProduct.imagen_url}
              style={styles.modalImage}
            />

            <h2 style={{ color: "#1e3a8a" }}>
              {selectedProduct.nombre}
            </h2>

            <p style={{ color: "#555", margin: "20px 0" }}>
              {selectedProduct.descripcion || "Descripción no disponible"}
            </p>

            <h3 style={{ color: "#2563eb" }}>
              ${selectedProduct.precio.toLocaleString()}
            </h3>

            <button
              onClick={() => setSelectedProduct(null)}
              style={styles.closeBtn}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

const styles: any = {
  addBtn: {
    padding: "8px 16px",
    background: "linear-gradient(90deg,#facc15,#f97316)",
    border: "none",
    borderRadius: 8,
    fontWeight: "bold",
    cursor: "pointer"
  },
  counterBtn: {
    width: 32,
    height: 32,
    borderRadius: 6,
    border: "none",
    background: "#2563eb",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer"
  },
  detailBtn: {
    padding: "8px 16px",
    background: "linear-gradient(90deg,#2563eb,#1e40af)",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    fontWeight: "bold",
    cursor: "pointer"
  },
  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.4)",
    backdropFilter: "blur(8px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000
  },
  modal: {
    background: "#fff",
    padding: 40,
    borderRadius: 20,
    width: "90%",
    maxWidth: 600,
    boxShadow: "0 20px 60px rgba(0,0,0,0.3)"
  },
  modalImage: {
    width: "100%",
    height: 300,
    objectFit: "cover",
    borderRadius: 12,
    marginBottom: 20
  },
  closeBtn: {
    marginTop: 20,
    padding: "10px 20px",
    background: "#111827",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    cursor: "pointer"
  }
}
