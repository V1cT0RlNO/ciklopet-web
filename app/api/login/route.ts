import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json()

        
        const user = await prisma.user.findUnique({ where: { email } })
        if (!user || !password) {
            return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 })
        }

        const valid = await bcrypt.compare(password, user.password)
        if (!valid) {
            return NextResponse.json({ error: "Contraseña incorrecta" }, { status: 401 })
        }

        const token = jwt.sign(
            {userId: user.id, email: user.email },
            process.env.JWT_SECRET!,
            { expiresIn: "1d" }
        )

        const res = NextResponse.json({ message: "Inicio de sesión exitoso" })
        res.cookies.set("token", token, { httpOnly: true, path: "/" })

        return res
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: "Algo ha salido mal" }, { status: 500 })
    }
}
