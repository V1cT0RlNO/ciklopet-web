'use client'

import { useEffect, useState } from "react"

export default function AdminContactPage() {
    const [contact, setContact] = useState<any[]>([])

    useEffect(() => {
        const fetchcontactRequest = async () => {
            const res = await fetch("/api/contact")
            const data = await res.json()
            setContact(data)
        }

        fetchcontactRequest()
    }, [])

    return (
        <main className="p-8">
            <h1 className="text-3xl font-bold mb-6">Clientes interesados</h1>

            <div className="overflow-x-auto">
                <table className="w-full border">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="p-2">Nombre</th>
                            <th className="p-2">RFC</th>
                            <th className="p-2">Teléfono</th>
                            <th className="p-2">Producto</th>
                            <th className="p-2">Fecha</th>
                            <th className="p-2">Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contact.map((contactRequest) => (
                            <tr key={contactRequest.id} className="border-t">
                                <td className="p-2">{contactRequest.name}</td>
                                <td className="p-2">{contactRequest.rfc}</td>
                                <td className="p-2">{contactRequest.phone}</td>
                                <td className="p-2">{contactRequest.product || "N/A"}</td>
                                <td className="p-2">
                                    {new Date(contactRequest.createdAt).toLocaleDateString()}
                                </td>
                                <td className="p-2">{contactRequest.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    )
}
