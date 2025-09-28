import { NextResponse } from "next/server"

export async function POST() {
    try {
        // Eliminar la cookie 'token'
        const response = NextResponse.json({ message: "Cierre de sesión exitoso" })

        response.cookies.set("token", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            expires: new Date(0), // Expira inmediatamente
        })

        return response
    } catch (error) {
        console.error("Error al cerrar sesión:", error)
        return NextResponse.json({ error: "Algo ha salido mal" }, { status: 500 })
    }
}
