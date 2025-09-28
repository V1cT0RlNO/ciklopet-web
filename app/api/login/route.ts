import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json()

        if (!email || !password) {
            return NextResponse.json({ error: "Todos los campos son obligatorios" }, { status: 400 })
        }

        const user = await prisma.user.findUnique({ where: { email } })

        if (!user || !user.password) {
            return NextResponse.json({ error: "Usuario no encontrado" }, { status: 401 })
        }

        const isValidPassword = await bcrypt.compare(password, user.password)
        if (!isValidPassword) {
            return NextResponse.json({ error: "Contraseña incorrecta" }, { status: 401 })
        }

        const token = jwt.sign(
            {userId: user.id, email: user.email ?? ""}, // fallback si email = null
            process.env.JWT_SECRET!,
            { expiresIn: "1h" }
        )

        return NextResponse.json({ token })
    } catch (error) {
        console.error("Login error:", error)
        return NextResponse.json({ error: "Algo ha salido mal" }, { status: 500 })
    }
}
