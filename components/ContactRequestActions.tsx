"use client"

import { Button } from "@/components/ui/button"
import { toast  } from "sonner"
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogCancel, AlertDialogAction, AlertDialogTitle, AlertDialogDescription} from "@/components/ui/alert-dialog"

export function ContactRequestActions({ id }: { id: string }) {
    const archiveLead = async () => {
        const res = await fetch(`/api/contact/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: "ARCHIVED" })
        })

        if (!res.ok) {
            toast.error("Error al archivar lead")
            return
        }

        toast.success("Lead archivado")
        location.reload()
    }

    const deleteLead = async() => {
        const res = await fetch(`/api/contact/${id}`, {
            method: "DELETE"
        })

        if (!res.ok) {
            toast.error("Error al eliminar lead")
            return
        }

        toast.success("Lead eliminado")
        location.reload()
    }

    return (
        <div className="flex gap-2">
            <Button variant="secondary" onClick={archiveLead}>
                Archivar
            </Button>

            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="destructive">Eliminar</Button>
                </AlertDialogTrigger>

                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>¿Eliminar lead?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Esta acción no se puede deshacer.
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={deleteLead}>
                            Confirmar
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
