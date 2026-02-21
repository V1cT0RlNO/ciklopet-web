import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/route"

/**
 * GET /api/products/:id
 */
export async function GET(_req: Request, context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params

    const product = await prisma.product.findUnique({
        where: { id },
    })

    if (!product) {
        return new NextResponse("Not found", { status: 404 })
    }

    return NextResponse.json(product)
}

/**
 * PUT /api/products/:id
 */
export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {

    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
        return NextResponse.json(
            { error: "No autorizado" },
            { status: 401 }
        )
    }

    const { id } = await context.params
    const body = await req.json()

    const { name, description, price, image, available } = body

    const product = await prisma.product.update({
        where: { id },
        data: {
            name,
            description,
            price,
            image,
            available,
        },
    })

    return NextResponse.json(product)
}

/**
 * DELETE /api/products/:id
 */
export async function DELETE(_req: Request, context: { params:  Promise<{ id: string }> }) {
    try {
        const { id } = await context.params

        if (!id || typeof id !== "string") {
            return NextResponse.json({ error: "ID inválido" }, { status: 400 })
        }

        const session = await getServerSession(authOptions)
        
        if (!session || session.user.role !== "ADMIN") {
            return NextResponse.json(
                { error: "No autorizado" },
                { status: 401 }
            )
        }

        await prisma.product.delete({
            where: { id },
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("DELETE product error:", error)
        return NextResponse.json({ error: "Error eliminando el producto" }, { status: 500 })
    }
}
