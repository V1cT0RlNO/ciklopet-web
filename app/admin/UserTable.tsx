'use client'

import { useEffect, useState } from "react"

export default function UserTable() {
    const [users, setUsers] = useState([])

    useEffect(() => {
        fetch("/api/admin/users")
          .then(res => res.json())
          .then(data => setUsers(data))
    }, [])

    const handleDelete = async (id: string) => {
        await fetch(`/api/admin/users/${id}`, { method: "DELETE" })
        setUsers(users.filter((u: any) => u.id !== id))
    }

    return (
        <div className="border rounded-lg overflow-hidden shadow">
            <table className="w-full text-left">
                <thead className="bg-green-600 text-white">
                    <tr>
                        <th className="p-3">Nombre</th>
                        <th className="p-3">Correo</th>
                        <th className="p-3">Rol</th>
                        <th className="p-3">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user: any) => (
                        <tr key={user.id} className="border-b">
                            <td className="p-3">{user.name}</td>
                            <td className="p-3">{user.email}</td>
                            <td className="p-3">{user.role}</td>
                            <td className="p-3">
                                <button
                                  onClick={() => handleDelete(user.id)}
                                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
