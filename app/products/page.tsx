import Link from "next/link"

export const dynamic = "force-dynamic"

export default async function ProductsPage() {
    
    const baseUrl = 
      process.env.NEXT_PUBLIC_BASE_URL ||
      (typeof window === "undefined"
        ? "http://localhost:3000"
        : window.location.origin)

        const res = await fetch(`${baseUrl}/api/products`, {
          cache: "no-store",
        })

        if (!res.ok) {
            throw new Error("Error al cargar los productos")
        }

        const products = await res.json()

    // Obtener el número de WhatsApp desde el .env
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "525547652029"

    return (
        <main className="min-h-screen pt-20 bg-white text-gray-800">
            <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6 text-green-700 text-center">
                Nuestros Materiales y Productos
            </h1>

            {products.length === 0 ? (
                <p className="text-center text-gray-600">No hay productos disponibles por ahora</p>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {products.map((product:any) => (
                        <div
                          key={product.id}
                          className="bg-white border rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col"
                        >
                            {product.image && (
                                <img
                                  src={product.image}
                                  alt={product.name}
                                  className="w-full h-48 object-cover rounded mb-3"
                                />
                            )}
                            <h2 className="text-xl font-semibold mb-1">{product.name}</h2>
                            <p className="text-gray-600 mb-2">{product.description}</p>
                            {product.price && (
                                <p className="text-green-700 font-bold mb-3">${product.price.toFixed(2)}</p>
                            )}

                            {/* Botón de WhatsApp dinámico */}
                            <a
                              href={`https://wa.me/{whatsappNumber}$?text=¡Hola!%20Estoy%20interesado%20en%20el%20producto%20${encodeURIComponent(
                                product.name
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-auto bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 text-center transition"
                            >
                                Cotizar por WhatsApp
                            </a>
                        </div>
                    ))}
                </div>
            )}

            <div className="text-center mt-10">
                <Link
                  href="/"
                  className="text-green-700 font-medium hover:underline"
                >
                   ← Volver al inicio
                </Link>
            </div>
        </div>
        </section>
        </main>
    )
}
