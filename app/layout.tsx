import './globals.css'
import { CartProvider } from "@/context/CartContext"
import Navbar from "@/components/Navbar"

export const metadata = {
  title: 'Optimo Store',
  description: 'Ecommerce profesional',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body style={{ margin: 0, fontFamily: 'Arial, sans-serif' }}>
        <CartProvider>

          <Navbar />

          {children}

          <footer style={{
            marginTop: 80,
            padding: 40,
            background: '#111',
            color: '#fff',
            textAlign: 'center'
          }}>
            © 2026 Optimo Store
          </footer>

        </CartProvider>
      </body>
    </html>
  )
}
