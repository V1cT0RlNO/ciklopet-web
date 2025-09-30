'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function RegisterForm({ onSuccess }: { onSuccess?: () => void }) {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    async function handleRegister(e: React.FormEvent) {
      e.preventDefault();

      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (res.ok) {
        setMessage("Usuario registrado con éxito");
        if (onSuccess) onSuccess();
      } else {
        const data = await res.json();
        setMessage(`Error: ${data.error}`)
      }
    };

    return (
      <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Tu nombre"
            className="w-full border px-3 py-2 rounded-lg"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            />
            <input
            type="email"
            placeholder="Email"
            className="w-full border px-3 py-2 rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
            <input
            type="password"
            placeholder="Contraseña"
            className="w-full border px-3 py-2 rounded-lg"
            value={password}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
              Registrarse
            </button>
            {message && <p className="text-center text-sm mt-2">{message}</p>}
      </form>
    );
}
