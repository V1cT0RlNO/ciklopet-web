'use client'

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginForm({ onSuccess }: { onSuccess?: () => void }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (res.ok) {
            setMessage("Inicio de sesión exitoso");
            if (onSuccess) onSuccess();
        } else {
            setMessage(`Error: ${data.error}`);
            }
        
        localStorage.setItem("token", data.token);

        window.location.href = "/";
        };

    return (
    <form onSubmit={handleLogin} className="space-y-4">
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
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
      >
        Iniciar Sesión
      </button>
      {message && <p className="text-center text-sm mt-2">{message}</p>}
    </form>
  );
}
