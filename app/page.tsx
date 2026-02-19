"use client"

import { useEffect, useState, useRef } from "react"
import { createClient } from "@supabase/supabase-js"
import ChatClient from "@/components/ChatClient"
import Link from "next/link"

// Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

export default function Home() {
  const [promotions, setPromotions] = useState<any[]>([])
  const [products, setProducts] = useState<any[]>([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const promoRef = useRef<HTMLDivElement>(null)

  // Datos de ejemplo
  useEffect(() => {
    setPromotions([
      { id: 1, title: "Oferta Especial", description: "20% de descuento en productos premium.", image: "https://picsum.photos/400/250?random=1" },
      { id: 2, title: "Novedad Tecnológica", description: "Nuevo software de gestión empresarial.", image: "https://picsum.photos/400/250?random=2" },
      { id: 3, title: "Promoción Limitada", description: "Suscríbete y recibe un regalo exclusivo.", image: "https://picsum.photos/400/250?random=3" }
    ])
  }, [])

  // Productos desde Supabase
  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from("productos").select("*").eq("activo", true).limit(3)
      if (!error) setProducts(data || [])
    }
    fetchProducts()
  }, [])

  // Autoplay carrusel
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 4000)
    return () => clearInterval(interval)
  }, [currentSlide, promotions])

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % promotions.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + promotions.length) % promotions.length)

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif" }}>
      <div style={{ paddingTop: 100 }}>

        {/* Hero */}
        <section style={{
          padding: '120px 20px',
          textAlign: 'center',
          background: 'linear-gradient(135deg, #1e3a8a, #2563eb)',
          color: '#fff',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <img src="/logo.png" alt="Optimo Logo" style={{ height: 80, marginBottom: 20 }} />
          <h1 style={{ fontSize: 56, fontWeight: 'bold', marginBottom: 20, textShadow: '1px 1px 6px rgba(0,0,0,0.3)' }}>
            Bienvenido a Optimo
          </h1>
          <p style={{ fontSize: 22, maxWidth: 700, margin: '0 auto 40px' }}>
            Soluciones premium para tu negocio con tecnología innovadora y atención personalizada.
          </p>
          <button style={{
            padding: '15px 30px',
            fontSize: 18,
            borderRadius: 10,
            border: 'none',
            cursor: 'pointer',
            background: 'linear-gradient(90deg, #facc15, #f97316)',
            color: '#111827',
            fontWeight: 'bold',
            boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
            transition: 'transform 0.2s'
          }}
          onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
          >
            Conócenos
          </button>
        </section>

        {/* Misión y Visión */}
        <section style={{ padding: '80px 20px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 36, marginBottom: 40 }}>Misión, Visión y Valores</h2>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 30 }}>
            <div style={{
              maxWidth: 300,
              background: '#fff',
              borderRadius: 16,
              padding: 30,
              boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
            }}>
              <h3>Misión</h3>
              <p>Ofrecer soluciones innovadoras que impulsen el crecimiento de nuestros clientes.</p>
            </div>
            <div style={{
              maxWidth: 300,
              background: '#fff',
              borderRadius: 16,
              padding: 30,
              boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
            }}>
              <h3>Visión</h3>
              <p>Ser la empresa líder en tecnología y servicios empresariales en Latinoamérica.</p>
            </div>
            <div style={{
              maxWidth: 300,
              background: '#fff',
              borderRadius: 16,
              padding: 30,
              boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
            }}>
              <h3>Valores</h3>
              <p>Innovación, Calidad y Confianza en todo lo que hacemos.</p>
            </div>
          </div>
        </section>

        {/* Promociones */}
        <section id="promos" style={{ padding: '80px 20px', textAlign: 'center', background: '#f4f6f9' }}>
          <h2 style={{ fontSize: 36, marginBottom: 40 }}>Promociones y Novedades</h2>
          <div style={{ position: 'relative', maxWidth: 700, margin: '0 auto' }}>
            {promotions.map((promo, i) => (
              <div key={promo.id} style={{
                display: i === currentSlide ? 'block' : 'none',
                background: '#fff',
                borderRadius: 16,
                overflow: 'hidden',
                boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
                transition: 'all 0.5s'
              }}>
                <img src={promo.image} alt={promo.title} style={{ width: '100%', height: 250, objectFit: 'cover' }} />
                <div style={{ padding: 20 }}>
                  <h3>{promo.title}</h3>
                  <p>{promo.description}</p>
                </div>
              </div>
            ))}

            {/* Flechas */}
            <button onClick={prevSlide} style={{
              position: 'absolute', top: '50%', left: 10, transform: 'translateY(-50%)',
              background: 'rgba(0,0,0,0.3)', border: 'none', color: '#fff', padding: 10, cursor: 'pointer', borderRadius: 50
            }}>‹</button>
            <button onClick={nextSlide} style={{
              position: 'absolute', top: '50%', right: 10, transform: 'translateY(-50%)',
              background: 'rgba(0,0,0,0.3)', border: 'none', color: '#fff', padding: 10, cursor: 'pointer', borderRadius: 50
            }}>›</button>

            {/* Dots */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 15 }}>
              {promotions.map((_, idx) => (
                <div key={idx} onClick={() => setCurrentSlide(idx)}
                  style={{
                    width: 12, height: 12, borderRadius: 6,
                    background: idx === currentSlide ? '#2563eb' : '#ccc',
                    cursor: 'pointer'
                  }}
                ></div>
              ))}
            </div>
          </div>
        </section>

        {/* Productos */}
        <section id="productos" style={{ padding: '80px 20px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 36, marginBottom: 40 }}>Algunos de nuestros Productos</h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 30, flexWrap: 'wrap' }}>
            {products.map(prod => (
              <div key={prod.id} style={{
                maxWidth: 250, background: '#fff', borderRadius: 16, padding: 20,
                boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                transition: 'transform 0.3s, box-shadow 0.3s', cursor: 'pointer'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-5px) scale(1.05)'
                e.currentTarget.style.boxShadow = '0 12px 25px rgba(0,0,0,0.25)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)'
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)'
              }}
              >
                <img src={prod.imagen_url} alt={prod.nombre} style={{ width: '100%', height: 150, objectFit: 'cover', borderRadius: 12, marginBottom: 10 }} />
                <h3>{prod.nombre}</h3>
                <p style={{ fontWeight: 'bold' }}>${prod.precio.toLocaleString()}</p>
                <Link href="/productos">
                  <button style={{ marginTop: 10, width: '100%', padding: 10, borderRadius: 8, border: 'none', background: '#2563eb', color: '#fff', cursor: 'pointer' }}>
                    Ver Más
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Chat IA flotante */}
      <ChatClient />
    </div>
  )
}
