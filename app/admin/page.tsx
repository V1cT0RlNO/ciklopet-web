"use client"

import { getServerSession } from "next-auth"
import { signOut, useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { redirect } from "next/navigation"
import { authOptions } from "../api/auth/[...nextauth]/route"
import UserTable from "./UserTable"

type User = {
    id: string
    name: string
    email: string
    role: string
}

export default function AdminPage() {
    const { data: session, status } = useSession()
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)
    const [editingUser, setEditingUser] = useState<User | null>(null)
    const [newName, setNewName] = useState("")
    const [newRole, setNewRole] = useState("USER")

    const fetchUsers = async () => {
        const res = await fetch("/api/users")
        const data = await res.json()
        setUsers(data)
        setLoading(false)
    }

    useEffect(() => {
        if (session?.user?.role === "ADMIN") fetchUsers()
    }, [session])

    const handleDelete = async (id: string) => {
        if (!confirm("¿Seguro que quieres eliminar este usuario?")) return
        await fetch("/api/users", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
        })
        fetchUsers()
    }

    const handleEdit = async (id: string) => {
        await fetch("/api/users", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, name: newName, role: newRole }),
        })
        setEditingUser(null)
        fetchUsers()
    }

    if (status === "loading") return <p className="p-4"> Cargando sesión...</p>

    if (!session) return <p className="p-4">No tienes acceso a esta página.</p>

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow p-6">
                <div className="flex justify-between items-center border-b pb-4 mb-4">
                    <h1 className="text-2xl font-bold">Panel de Administración</h1>
                    <div>
                        <span>
                            Bienvenido, {session.user?.name || "Usuario"}
                        </span>
                        <button
                          onClick={() => signOut({ callbackUrl: "/" })}
                          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                        >
                            Cerrar sesión
                        </button>
                    </div>
                </div>

                {session.user.role !== "ADMIN" ? (
                    <p className="text-center text-red-600">
                        No tienes permisos para ver esta sección.
                    </p>
                ) : loading ? (
                    <p>Cargando usuarios...</p>
                ) : (
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-left">
                                <th className="p-2 border">Nombre</th>
                                <th className="p-2 border">Correo</th>
                                <th className="p-2 border">Rol</th>
                                <th className="p-2 border text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50">
                                    <td className="p-2 border">{user.name}</td>
                                    <td className="p-2 border">{user.email}</td>
                                    <td className="p-2 border">{user.role}</td>
                                    <td className="p-2 border text-center space-x-2">
                                        <button
                                          onClick={() => {
                                            setEditingUser(user)
                                            setNewName(user.name)
                                            setNewRole(user.role)
                                          }}
                                          className="px-2 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                                        >
                                            Editar
                                        </button>
                                        <button
                                          onClick={() => handleDelete(user.id)}
                                          className="px-2 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition"
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {editingUser && (
                    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
                        <div className="bg-white p-6 rounded-xl shadow-lg w-96 space-y-4">
                            <h2 className="text-xl font-bold">Editar usuario</h2>
                            <input 
                              type="text"
                              value={newName}
                              onChange={(e) => setNewName(e.target.value)}
                              placeholder="Nuevo nombre"
                              className="w-full border p-2 rounded"
                            />
                            <select
                              value={newRole}
                              onChange={(e) => setNewRole(e.target.value)}
                              className="w-full border p-2 rounded"
                            >
                                <option value="USER">Usuario</option>
                                <option value="ADMIN">Administrador</option>
                            </select>
                            <div className="flex justify-end gap-2">
                                <button
                                  onClick={() => setEditingUser(null)}
                                  className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                                >
                                    Cancelar
                                </button>
                                <button
                                  onClick={() => handleEdit(editingUser.id)}
                                  className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                                >
                                    Guardar
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
