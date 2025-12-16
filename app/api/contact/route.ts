import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { name, rfc, phone, message, product } = body

        if (!name || !rfc || !phone) {
            return NextResponse.json(
                { error: "Datos obligatorios faltantes" },
                { status: 400 }
            )
        }

        const saved = await prisma.contactRequest.create({
            data: {
                name: name || null,
                rfc,
                phone,
                message: message || null,
                product: product || null
            },
        })

        return NextResponse.json({ success: true, saved })
    } catch (error) {
        return NextResponse.json(
            { error: "Error al guardar lead" },
            { status: 500 }
        )
    }
}

export async function GET() {
    const contactRequest = await prisma.contactRequest.findMany({
        orderBy: {
            createdAt: "desc"
        }
    })

    return NextResponse.json(contactRequest)
}
