"use client"

import { useState } from "react"

export function ContactRequestStatusSelect({ id, initialStatus }: {
    id: string
    initialStatus: string
}) {
    const [status, setStatus] = useState(initialStatus)

    async function updateStatus(value: string) {
        setStatus(value)

        await fetch("/api/contact", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, status: value })
        })
    }

    return (
        <select
          value={status}
          onChange={(e) => updateStatus(e.target.value)}
          className="border rounded p-1"
        >
            <option value="NEW">Nuevo</option>
            <option value="CONTACTED">Contactado</option>
            <option value="CLOSED">Cerrado</option>
        </select>
    )
}
