'use client'

import { useState } from "react"
import { signIn } from "next-auth/react"

export default function LoginForm({ onSuccess }: { onSuccess: () => void }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const result = await signIn("credentials", {
          redirect: false,
          email,
          password,
        })

        if (result?.error) {
          setError("Credenciales enválidas")
        } else {
          if (typeof onSuccess === "function") {
            onSuccess()
          } else {
            window.location.href = "/admin"
          }
        }
        }

    return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
        className="bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
      >
        Iniciar Sesión
      </button>
      {error && <p className="text-red-600 text-sm">{error}</p>}
    </form>
  )
}
