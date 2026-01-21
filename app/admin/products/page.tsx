'use client'

import { useEffect, useState } from "react"

export default function AdminProductsPage() {
    const [products, setProducts] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState( false)

    // Estados del formulario
    const [id, setId] = useState<number | null>(null)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState<number | undefined>()
    const [image, setImage] = useState("")
    const [available, setAvailable] = useState("")

    // Cargar productos existentes
    useEffect(() => {
        async function fetchProducts() {
            const res = await fetch("/api/products")
            const data = await res.json()
            setProducts(data)
            setLoading(false)
        }
        fetchProducts()
    }, [])

    // Enviar (crear o actualizar)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        const method = id ? "PUT" : "POST"
        const url = id ? `/api/products/${id}` : "/api/products"

        const res = await fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, description, price, image, available })
        })

        if (res.ok) {
          const data = await res.json()
          if (id) {
            // Actualizar producto existente
            setProducts(products.map((p) => (p.id === id ? data : p)))
          } else {
            // Agregar nuevo producto
            setProducts([...products, data])
          }
          resetForm()
        }

        setIsSubmitting(false)
    }

    // Función para subir imágen
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file) return

      const formData = new FormData()
      formData.append("file", file)

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      const data = await res.json()
      setImage(data.url)
    }

    // Editar producto
    const handleEdit = (product: any) => {
      setId(product.id)
      setName(product.name)
      setDescription(product.description)
      setPrice(product.price)
      setImage(product.image)
      setAvailable(product.available)
    }

    // Eliminar producto
    const handleDelete = async (id: string) => {
      if (!confirm("¿Seguro que deseas eliminar este producto?")) return

      const res = await fetch(`/api/products/${id}`, { method: "DELETE" })
      if (res.ok) {
        setProducts(products.filter((p) => p.id !== id))
      }
    }

    // Limpiar formulario
    const resetForm = () => {
      setId(null)
      setName("")
      setDescription("")
      setPrice(undefined)
      setImage("")
      setAvailable("")
    }

    if (loading) return <p className="p-8 text-center">Cargando productos...</p>

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6 text-green-700">Gestión de Materiales</h1>

            {/* Formulario */}
            <form
              onSubmit={handleSubmit}
              className="bg-white p-6 rounded-xl shadow-md mb-10 max-w-lg mx-auto border border-gray-200"
            >
                <h2 className="text-xl font-semibold mb-4">
                  {id ? "Editar material" : "Agregar nuevo material"}
                </h2>

                <div className="flex flex-col gap-3">
                    <input
                      type="text"
                      placeholder="Nombre del material"
                      className="border rounded p-2"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />

                    <textarea
                      placeholder="Descripción"
                      className="border rounded p-2"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />

                    <input
                      type="number"
                      placeholder="Precio (opcional)"
                      className="border rounded p-2"
                      value={price || ""}
                      onChange={(e) => setPrice(Number(e.target.value))}
                      required
                    />

                    <input
                      type="file"
                      accept="image/"
                      placeholder="URL de la imagen (opcional)"
                      className="border rounded p-2"
                      onChange={(e) => handleImageUpload(e)}
                      required
                    />
                    {image && (
                      <img
                        src={image}
                        alt="Preview"
                        className="w-full h-40 object-cover rounded mt-2"
                      />
                    )}

                    <input
                      type="text"
                      placeholder="Disponibilidad (opcional)"
                      className="border rounded p-2"
                      value={available || ""}
                      onChange={(e) => setAvailable(e.target.value)}
                      required
                    />

                    <div>
                      <button
                      type="submit"
                      className={`flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition ${
                        isSubmitting && "opacity-70 cursor-not-allowed"
                      }`}
                      disabled={isSubmitting}
                    >
                      {isSubmitting 
                        ? "Guardando..." 
                        : id
                        ? "Actualizar material"
                        :"Agregar material"}
                    </button>

                    {id && (
                      <button
                        type="button"
                        onClick={resetForm}
                        className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
                      >
                        Cancelar
                      </button>
                    )}
                    </div>
                </div>
            </form>

            {/* Lista de productos */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {products.map((p) => (
                <div
                  key={p.id}
                  className="p-4 border rounded-xl shadow hover:shadow-lg transition bg-white"
                >
                  {p.image && (
                    <img
                      src={p.image}
                      alt={p.image}
                      className="w-full h-40 object-cover rounded mb-2"
                    />
                  )}
                  <h2 className="text-xl font-semibold">{p.name}</h2>
                  <p className="text-gray-600">{p.description}</p>
                  <p className="text-gray-600">{p.available}</p>
                  {p.price && (
                    <p className="text-green-700 font-bold mt-2">${p.price.toFixed(2)}</p>
                  )}

                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => handleEdit(p)}
                      className="flex-1 bg-blue-500 text-white py-1 rounded hover:bg-blue-600 transition"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="flex-1 bg-red-500 text-white py-1 rounded hover:bg-red-600 transition"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
        </div>
    )
}
