
import { prisma } from "@/lib/prisma"
import { ContactRequestStatusSelect } from "@/components/ContactRequestStatusSelect"
import { ContactRequestActions } from "@/components/ContactRequestActions"

export default async function AdminContactPage() {
    const contactsRequest = await prisma.contactRequest.findMany({
        orderBy: { createdAt: "desc" }
    })

    return (
        <main className="p-8">
            <h1 className="text-3xl font-bold mb-6">Clientes interesados</h1>

            <div className="overflow-x-auto">
                <table className="w-full border">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="p-2">Nombre</th>
                            <th className="p-2">RFC</th>
                            <th className="p-2">Teléfono</th>
                            <th className="p-2">Producto</th>
                            <th className="p-2">Fecha</th>
                            <th className="p-2">Estado</th>
                            <th className="p-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contactsRequest.map((contactRequest) => (
                            <tr key={contactRequest.id} className="border-t">
                                <td className="p-2">{contactRequest.name}</td>
                                <td className="p-2">{contactRequest.rfc}</td>
                                <td className="p-2">{contactRequest.phone}</td>
                                <td className="p-2">{contactRequest.product || "N/A"}</td>
                                <td className="p-2">
                                    {new Date(contactRequest.createdAt).toLocaleDateString()}
                                </td>
                                <td className="p-2">
                                    <ContactRequestStatusSelect
                                      id={contactRequest.id}
                                      initialStatus={contactRequest.status}
                                    />
                                    {contactRequest.status}</td>
                                    <td className="p-2">
                                        <ContactRequestActions id={contactRequest.id} />
                                    </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    )
}
