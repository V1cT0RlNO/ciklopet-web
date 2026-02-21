import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"

// GET: Obtener todos los productos
export async function GET() {
    try {
        const products = await prisma.product.findMany({
            orderBy: { createAt: "desc" }
        })

        return NextResponse.json(products)
    } catch (error) {
        console.error("GET /api/products error:", error)
        return NextResponse.json({ error: "Error al obtener productos" }, { status: 500 })
    }
}

// POST: Crear un producto nuevo
export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions)

        if (!session || session.user.role !== "ADMIN") {
            return NextResponse.json(
                { error: "No autorizado" },
                { status: 401 }
            )
        }

        const body = await req.json()

        const { name, description, image, price, available } = body

        if (!name || !price) {
            return NextResponse.json(
                { error: "Nombre y precio son requeridos" },
                { status: 400 }
            )
        }

        const product = await prisma.product.create({
            data: {
                name,
                description,
                image,
                price: Number(price),
                available: Boolean(available),
            },
        })

        return NextResponse.json(product, { status: 201 })
    } catch (error) {
        console.error("POST /api/products error:", error)
        return NextResponse.json({ error: "Error al crear el producto" }, { status: 500 })
    }
}
