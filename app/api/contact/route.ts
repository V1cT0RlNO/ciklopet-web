import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
    try {
        const { name, phone, rfc, message } = await req.json()

        if (!phone || !rfc ) {
            return NextResponse.json(
                {  error: "Faltan datos obligatorios" },
                { status: 400 }
            )
        }

        const saved = await prisma.contactRequest.create({
            data: {
                name: name || null,
                phone,
                rfc,
                message: message || null,
            },
        })

        return NextResponse.json({ success: true, saved })
    } catch (err) {
        console.error("Error guardando contacto:", err)
        return NextResponse.json(
            { error: "Error interno" },
            {  status: 500 }
        )
    }
}
