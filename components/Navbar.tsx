"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import { buttonVariants } from "@/components/ui/button"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import Link from "next/link"

interface NavbarProps {
    onLoginClick: () => void
    onRegisterClick: () => void
    isAuthenticated: boolean
    setIsAuthenticated: (value: boolean) => void
}

export function NavbarButtons() {
    const { data: session, status } = useSession()

    if (status === "loading") {
        return <span className="text-gray-400">Cargando...</span>
    }

    if (status === "authenticated") {
        return (
            <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className={buttonVariants({ variant: "outline" })}
            >
                Cerrar sesión
            </button>
        )
    }

    return (
        <div className="flex gap-2">
            <button
                onClick={() => signIn(undefined, { callbackUrl: "/" })}
                className={buttonVariants({ variant: "default" })}
            >
                Iniciar sesión
            </button>
            <Link
                href="/register"
                className={buttonVariants({ variant: "outline" })}
            >
                Registrarse
            </Link>
        </div>
    )
}

export default function Navbar({
    onLoginClick,
    onRegisterClick,
    isAuthenticated,
    setIsAuthenticated,
}: NavbarProps) {
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const handleLogout = () => {
        localStorage.removeItem("token")
        setIsAuthenticated(false)
    }

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
            scrolled ? "bg-white shadow" : "bg-transparent"
        }`}>
            <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2">
                    <img 
                        src="/images/logo-prueba.png" 
                        alt="Ciklopet Logo" 
                        className="w-10 h-10"
                    />
                    <span className="text-xl font-bold text-green-700">Ciklopet</span>
                </Link>

                {/* Links */}
                <div className="hidden md:flex space-x-6 text-gray-800 text-sm md:text-base">
                    <a href="#about" className="hover:text-green-600 transition">
                        ¿Quiénes somos?
                    </a>
                    <a href="#services" className="hover:text-green-600 transition">
                        Servicios
                    </a>
                    <a href="#commitment" className="hover:text-green-600 transition">
                        Compromiso
                    </a>

                    {!isAuthenticated ? (
                        <>
                            <Button
                                variant="outline"
                                className="rounded-full"
                                onClick={onLoginClick}
                            >
                                Iniciar sesión
                            </Button>
                            <Button
                                variant="outline"
                                className="rounded-full"
                                onClick={onRegisterClick}
                            >
                                Registrarse
                            </Button>
                        </>
                    ) : (
                        <Button
                            variant="destructive"
                            className="rounded-full"
                            onClick={handleLogout}
                        >
                            Cerrar sesión
                        </Button>
                    )}
                </div>
            </div>
        </nav>
    )
}
