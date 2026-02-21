import { NextResponse } from "next/server"
import cloudinary from "@/lib/cloudinary"
import { authOptions } from "../auth/[...nextauth]/route"
import { getServerSession } from "next-auth"

export async function POST(req: Request) {
    try {

        const session = await getServerSession(authOptions)

        if (!session || session.user.role !== "admin") {
            return NextResponse.json(
                { error: "No autorizado" },
                { status: 403 }
            )
        }

        const data = await req.formData()
        const file = data.get("file") as File

        if (!file) {
            return NextResponse.json({ error: "No se ha subido ningún archivo" }, { status: 400 })
        }

        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        const result = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                { folder: "ciklopet" },
                (error, result) => {
                    if (error) reject(error)
                    else resolve(result)
                }
            ).end(buffer)
        })

        return NextResponse.json(result)
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: "Ocurrió un error al subir el archivo" }, { status: 500 })
    }
}
