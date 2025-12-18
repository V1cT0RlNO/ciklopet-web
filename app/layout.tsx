"use client"

import { Toaster } from "sonner"
import { SessionProvider } from "next-auth/react"
import "./globals.css"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <SessionProvider>
            {children}
            <Toaster richColors position="top-right" />
        </SessionProvider>
      </body>
    </html>
  )
}
