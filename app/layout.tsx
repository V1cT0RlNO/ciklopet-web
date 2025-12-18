"use client"

import { Toaster } from "sonner"
import { SessionProvider } from "next-auth/react"
import Footer from "@/components/Footer"
import "./globals.css"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <SessionProvider>
            {children}
            <Toaster richColors position="top-right" />
        </SessionProvider>
        <Footer />
      </body>
    </html>
  )
}
