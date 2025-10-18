import { NextResponse } from "next/server"

export async function POST() {
    try {
        // Eliminar la cookie 'token'
        const res = NextResponse.json({ message: "Cierre de sesión exitoso" })

        res.cookies.set("token", "", {
            expires: new Date(0), path: "/" })
            return res
    } catch (error) {
        console.error("Error al cerrar sesión:", error)
        return NextResponse.json({ error: "Algo ha salido mal" }, { status: 500 })
    }
  }
