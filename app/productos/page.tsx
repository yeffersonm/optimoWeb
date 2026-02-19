import { supabase } from "@/lib/supabase"
import ProductList from "@/components/ProductList"

export default async function ProductosPage() {
  const { data: productos } = await supabase
    .from("productos")
    .select("*")
    .eq("activo", true)

  return (
    <div>

      <section style={{ padding: '80px 20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: 48, marginBottom: 20 }}>Nuestros Productos</h1>
        <p style={{ fontSize: 20, maxWidth: 700, margin: '0 auto 40px' }}>
          Explora nuestra selección de productos premium.
        </p>

        <ProductList productos={productos || []} />
      </section>

    </div>
  )
}
