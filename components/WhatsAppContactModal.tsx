"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface Props {
    open: boolean
    onClose: () => void
}

export default function WhatsAppContactModal({ open, onClose }: Props) {
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [rfc, setRfc] = useState("")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSend = async () => {
        if (!phone || !rfc) {
            alert("Teléfono y RFC son obligatorios.")
            return
        }

        setLoading(true)

        try {
            // Guardar en la BD
            await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, phone, rfc, message }),
            })

            // Redirección a WhatsApp
            const whatsappNumber = "525547652029"
            const text = encodeURIComponent(
                `Hola, estoy interesado.

Nombre: ${name || "N/A"}
Teléfono: ${phone}
RFC: ${rfc}
Mensaje: ${message || "Sin mensaje adicional"}`
      );

      window.location.href = `https://wa.me/${whatsappNumber}?text=${text}`;
    } catch (err) {
      console.error(err);
      alert("Error enviando tu mensaje.");
    } finally {
      setLoading(false);
    }
        }

        return (
            <Dialog open={open} onOpenChange={onClose}>
              <DialogContent className="space-y-4">
                <DialogHeader>
                    <DialogTitle>Contáctanos por WhatsApp</DialogTitle>
                </DialogHeader>

                <div className="flex flex-col gap-3">
                    <div>
                        <Label>Nombre</Label>
                        <Input value={name} onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div>
                        <Label>Teléfono</Label>
                        <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>

                    <div>
                        <Label>RFC *</Label>
                        <Input value={rfc} onChange={(e) => setRfc(e.target.value)} />
                    </div>

                    <div>
                        <Label>Mensaje (opcional)</Label>
                        <Input value={message} onChange={(e) => setMessage(e.target.value)} />
                    </div>

                    <Button onClick={handleSend} disabled={loading}>
                        {loading ? "Enviando..." : "Enviar por WhatsApp"}
                    </Button>
                </div>
              </DialogContent>
            </Dialog>
        )
    }
