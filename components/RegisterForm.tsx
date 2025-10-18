'use client'

import { useState } from "react"
import { signIn } from "next-auth/react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function RegisterForm({ onSuccess }: { onSuccess: () => void }) {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoaging] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      setError("")
      setLoaging(true)

      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name })
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.error || "Error al registrar")
        setLoaging(false)
        return
      }

      const loginRes = await signIn("credentials", {
        redirect: false,
        email,
        password,
      })

      setLoaging(false)

      if (loginRes?.error) {
        setError("Registrado, pero error al iniciar sesión")
        return
      }

      onSuccess()
    }

    return (
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Tu nombre"
            className="border p-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            />
            <input
            type="email"
            placeholder="Correo electrónico"
            className="border p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
            <input
            type="password"
            placeholder="Contraseña"
            className="border p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
            >
              {loading ? "Registrando..." : "Registrarse"}
            </button>
            {error && <p className="text-red-600 text-sm">{error}</p>}
      </form>
    );
}
