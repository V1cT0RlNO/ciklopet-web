import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "../api/auth/[...nextauth]/route"
import UserTable from "./UserTable"

export default async function AdminPage() {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
        redirect("/")
    }

    return (
        <main className="max-w5xl mx-auto mt-20 p-6">
            <h1 className="text-3xl font-bold mb-6">Panel de Administración</h1>
            <UserTable />
        </main>
    )
}
