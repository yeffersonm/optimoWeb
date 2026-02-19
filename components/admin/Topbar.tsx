"use client"

export default function Topbar() {
  return (
    <div
      style={{
        height: 70,
        background: "#fff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 30px",
        borderBottom: "1px solid #e5e7eb"
      }}
    >
      <h3 style={{ margin: 0 }}>Dashboard</h3>

      <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
        <span style={{ fontSize: 14 }}>Admin</span>
        <div
          style={{
            width: 35,
            height: 35,
            borderRadius: "50%",
            background: "#2563eb"
          }}
        />
      </div>
    </div>
  )
}
