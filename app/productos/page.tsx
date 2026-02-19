"use client"

export const dynamic = "force-dynamic"

import { useEffect, useState } from "react"
import { getSupabaseClient } from "@/lib/supabase"
import ProductList from "@/components/ProductList"

export default function ProductosPage() {
  const [productos, setProductos] = useState<any[]>([])

  useEffect(() => {
    const supabase = getSupabaseClient()

    const fetchProductos = async () => {
      const { data, error } = await supabase
        .from("productos")
        .select("*")
        .eq("activo", true)

      if (!error) {
        setProductos(data || [])
      }
    }

    fetchProductos()
  }, [])

  return (
    <div>
      <section style={{ padding: "80px 20px", textAlign: "center" }}>
        <h1 style={{ fontSize: 48, marginBottom: 20 }}>
          Nuestros Productos
        </h1>

        <ProductList productos={productos} />
      </section>
    </div>
  )
}
