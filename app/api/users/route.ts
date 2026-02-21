import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { authOptions } from "../auth/[...nextauth]/route"
import { getServerSession } from "next-auth"

// Obtener todos los usuarios
export async function GET() {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
        return NextResponse.json(
            { error: "No autorizado" },
            { status: 403 }
        )
    }

    const users = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
        },
    })
    return NextResponse.json(users)
}

// Editar el rol o nombre del usuario
export async function PATCH(request: Request) {
    try {
        const session = await getServerSession(authOptions)

        if (!session || session.user.role !== "ADMIN") {
            return NextResponse.json(
                { error: "No autorizado" },
                { status: 403 }
            )
        }

        const { id, name, role } = await request.json()

        if (!id) {
            return NextResponse.json({ error: "ID requerido" }, { status: 400 })
        }

        const updateUser = await prisma.user.update({
            where: { id },
            data: { name, role },
        })

        return NextResponse.json(updateUser)
    } catch (error) {
        return NextResponse.json(
            { error: "Error al actualizar el usuario" },
            { status: 500 }
        )
    }
}

// Eliminar usuario
export async function DELETE(request: Request) {
    try {
        const session = await getServerSession(authOptions)

        if (!session || session.user.role !== "ADMIN") {
            return NextResponse.json(
                { error: "No autorizado" },
                { status: 403 }
            )
        }

        const { id } = await request.json()

        if (!id) {
            return NextResponse.json({ error: "ID requerido" }, { status: 400 })
        }

        await prisma.user.delete({ where: { id } })

        return NextResponse.json({ message: "Usuario eliminado correctamente" })
    } catch (error) {
        return NextResponse.json(
            { error: "Error al eliminar el usuario" },
            { status: 500 }
        )
    }
}
