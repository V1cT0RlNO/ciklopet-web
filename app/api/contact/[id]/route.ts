import { prisma } from "@/lib/prisma"
import { ContactRequestStatus } from "@prisma/client"
import { NextResponse } from "next/server"
import { authOptions } from "../../auth/[...nextauth]/route"
import { getServerSession } from "next-auth"

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getServerSession(authOptions)

        if (!session || session.user.role !== "admin") {
            return NextResponse.json(
                { error: "No autorizado" },
                { status: 403 }
            )
        }

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
    const session = await getServerSession(authOptions)

        if (!session || session.user.role !== "admin") {
            return NextResponse.json(
                { error: "No autorizado" },
                { status: 403 }
            )
        }

    const { id } = await params

    await prisma.contactRequest.delete({
        where: { id },
    })

    return NextResponse.json({ successs: true })
}
