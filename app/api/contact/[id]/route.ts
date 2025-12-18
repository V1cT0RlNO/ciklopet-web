import { prisma } from "@/lib/prisma"
import { ContactRequestStatus } from "@prisma/client"
import { NextResponse } from "next/server"

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { status } = await req.json()
    const { id } = await params

    const lead = await prisma.contactRequest.update({
        where: { id },
        data: { 
            status: status as ContactRequestStatus,
        },
    })

    return NextResponse.json(lead)
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params

    await prisma.contactRequest.delete({
        where: { id },
    })

    return NextResponse.json({ successs: true })
}
