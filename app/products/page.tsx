'use client'

import { useEffect, useState } from "react"
import Navbar from "@/components/Navbar"
import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import WhatsAppContactModal from "@/components/WhatsAppContactModal"

export default function ProductsPage() {
    const router = useRouter()
    const [showContact, setShowContact] = useState(false)
    const { data: session } = useSession()
    const [products, setProducts] = useState<any[]>([])
    const isAuthenticated = !!session

    const handleLogout = async () => {
        await signOut({ callbackUrl:'/' })
    }

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch('/api/products')
                if (!res.ok) throw new Error('Error al cargar productos')
                const data = await res.json()
            setProducts(data)
            } catch (err) {
                console.error(err)
            }
        }
        fetchProducts()
    }, [])

    // Obtener el número de WhatsApp desde el .env
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "525547652029"

    return (
        <>
        <Navbar
          isAuthenticated={isAuthenticated}
          onLoginClick={() => {}}
          onRegisterClick={() => {}}
          onLogout={handleLogout}
        />
        <main className="pt-24 px-6 min-h-screen bg-gray-50 text-gray-800">
            <section className="max-w-6xl mx-auto text-center mb-12">
                <h1 className="text-4xl font-bold text-green-700 mb-4">Nuestros productos</h1>
                <p>
                    Conoce los materiales reciclables y productos ecológicos que ofrecemos.
                </p>

                {/* Botones de navegación */}
                <div className="flex justify-center gap-4 mt-8">
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Retroceder
                    </button>

                    <Link
                      href="/"
                      className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                    >
                      Ir al inicio
                    </Link>
                </div>
            </section>

            {/* Lista de productos */}
            <section className="max-w-6xl mx-auto grid gap-8 md:grid-cols-3">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div
                          key={product.id}
                          className="bg-white rounded-xl shadow hover:shadow-lg transition p-6 text-center"
                        >
                            <img
                              src={product.image || '/images/product-placeholder.png'}
                              alt={product.name}
                              className="w-full h-48 object-cover rounded-lg mb-4"
                            />
                            <h2 className="text-xl font-semibold text-green-700 mb-2">{product.name}</h2>
                            <p className="text-gray-600 mb-4">{product.description}</p>
                            <p>
                                {product.price ? `$${product.price} MXN` : 'Consultar precio'}
                            </p>
                            <Button onClick={() => setShowContact(true)}
                              className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                            >
                              Contactar por WhatsApp
                            </Button>
                            <WhatsAppContactModal open={showContact} onClose={() => setShowContact(false)} />
                        </div>
                    ))
                ) : (
                    <p className="col-span-3 text-gray-500 text-center">
                        No hay productos disponibles por el momento
                    </p>
                )}
            </section>
        </main>
        </>
    )
}
