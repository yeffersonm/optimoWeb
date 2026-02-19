"use client"

import { useState } from "react"

export default function ChatClient() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Botón flotante */}
      <div
        onClick={() => setOpen(true)}
        style={{
          position: 'fixed',
          right: 20,
          bottom: 20,
          background: 'linear-gradient(90deg,#2563eb,#1e40af)',
          color: '#fff',
          padding: '15px 20px',
          borderRadius: 50,
          fontWeight: 'bold',
          boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
          cursor: 'pointer',
          zIndex: 2000
        }}
      >
        Chat IA 💬
      </div>

      {/* Ventana de chat básica */}
      {open && (
        <div style={{
          position: 'fixed',
          right: 20,
          bottom: 80,
          width: 320,
          height: 400,
          background: '#fff',
          borderRadius: 10,
          boxShadow: '0 5px 20px rgba(0,0,0,0.3)',
          zIndex: 2000,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          <div style={{
            background: '#2563eb',
            color: '#fff',
            padding: 10,
            fontWeight: 'bold',
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            Chat IA
            <span style={{ cursor: 'pointer' }} onClick={() => setOpen(false)}>✖</span>
          </div>
          <div style={{
            flex: 1,
            padding: 10,
            overflowY: 'auto'
          }}>
            {/* Aquí se irán los mensajes del chat */}
            <p style={{ color: '#555' }}>¡Hola! Soy tu asistente IA.</p>
          </div>
          <input
            placeholder="Escribe un mensaje..."
            style={{
              borderTop: '1px solid #ccc',
              padding: 10,
              outline: 'none',
              border: 'none'
            }}
          />
        </div>
      )}
    </>
  )
}
