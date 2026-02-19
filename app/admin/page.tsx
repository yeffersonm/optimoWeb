import StatsCard from "@/components/admin/StatsCard"

export default function AdminDashboard() {
  return (
    <div>
      <h1 style={{ marginBottom: 25 }}>Resumen General</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 20,
          marginBottom: 40
        }}
      >
        <StatsCard title="Ventas del Mes" value="$12.500.000" />
        <StatsCard title="Pedidos" value="128" />
        <StatsCard title="Clientes Nuevos" value="45" />
      </div>

      <div
        style={{
          background: "#fff",
          padding: 25,
          borderRadius: 16,
          boxShadow: "0 8px 20px rgba(0,0,0,0.05)"
        }}
      >
        <h2>Actividad Reciente</h2>
        <p style={{ color: "#6b7280" }}>
          Aquí luego conectamos los pedidos reales desde la base de datos.
        </p>
      </div>
    </div>
  )
}
