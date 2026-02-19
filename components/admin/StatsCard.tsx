export default function StatsCard({
  title,
  value,
}: {
  title: string
  value: string
}) {
  return (
    <div
      style={{
        background: "#fff",
        padding: 25,
        borderRadius: 16,
        boxShadow: "0 8px 20px rgba(0,0,0,0.05)"
      }}
    >
      <p style={{ color: "#6b7280", marginBottom: 10 }}>{title}</p>
      <h2 style={{ margin: 0 }}>{value}</h2>
    </div>
  )
}
