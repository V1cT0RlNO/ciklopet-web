import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcrypt"

export async function POST(req: Request) {
    try {
        const {name, email, password } = await req.json()

        // Validar campos requeridos
        if (!name || !email || !password) {
            return NextResponse.json({ error: "Todos los campos son obligatorios" }, { status: 400 })
        }

        // Verificar si ya existe usuario
        const existingUser = await prisma.user.findUnique({
            where: { email },
        })

        if (existingUser) {
            return NextResponse.json({ error: "El usuario ya existe" }, { status: 400 })
        }

        // Hashear contraseña
        const hashedPassword = await bcrypt.hash(password, 10)

        // Crear usuario
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        })

        return NextResponse.json({ message: "Usuario registrado con éxito", user: { id: newUser.id, email: newUser.email } })
    } catch (error) {
        console.error("Error registrado:", error)
        return NextResponse.json({ error: "Error en el registro" }, { status: 500 })
    }
}
