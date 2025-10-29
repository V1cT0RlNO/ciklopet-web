import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET: Obtener todos los productos
export async function GET() {
    try {
        const products = await prisma.product.findMany()
        return NextResponse.json(products)
    } catch (error) {
        return NextResponse.json({ error: "Error al obtener productos" }, { status: 500 })
    }
}

// POST: Crear un producto nuevo
export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { name, description, image, price } = body

        if (!name || !description) {
            return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 })
        }

        const newProduct = await prisma.product.create({
            data: { name, description, image, price },
        })

        return NextResponse.json(newProduct)
    } catch (error) {
        return NextResponse.json({ error: "Error al crear producto" }, { status: 500 })
    }
}
