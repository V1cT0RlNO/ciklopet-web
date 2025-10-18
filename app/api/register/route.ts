import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export async function POST(req: Request) {
    try {
        const {name, email, password } = await req.json()

        // Validar campos requeridos
        if (!name || !email || !password) {
            return NextResponse.json({ error: "Todos los campos son obligatorios" }, { status: 400 })
        }

        // Verificar si ya existe usuario
        const existingUser = await prisma.user.findUnique({
            where: { email }
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

        // Generar token
        const token = jwt.sign(
            { userId: newUser.id, email: newUser.email },
            process.env.JWT_SECRET!,
            { expiresIn: "1d" }
        )

        const res = NextResponse.json({ message: "Usuario registrado con éxito" })
        res.cookies.set("token", token, { httpOnly: true, path: "/" })

        return res
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: "Error interno" }, { status: 500 })
    }
}
