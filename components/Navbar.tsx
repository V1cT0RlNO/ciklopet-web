'use client'

import { signIn, signOut, useSession } from "next-auth/react"
import { Menu, X } from "lucide-react"
import { useEffect, useState } from "react"
import Link from "next/link"

export default function Navbar() {
    const { data: session } = useSession()
    const [scrolled, setScrolled] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
            scrolled ? "bg-white shadow" : "bg-transparent"
        }`}>
            <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
                {/* Logo */}
                <a href="#" className="flex items-center space-x-2">
                    <img 
                        src="/images/logo-prueba.png" 
                        alt="Ciklopet Logo" 
                        className="w-10 h-10"
                    />
                    <span className="text-xl font-bold text-green-700">Ciklopet</span>
                </a>

                {/* Links desktop*/}
                <div className="hidden md:flex space-x-6 text-gray-800 text-sm md:text-base item-center">
                    <a href="#about" className="hover:text-green-600 transition">
                        ¿Quiénes somos?
                    </a>
                    <a href="#services" className="hover:text-green-600 transition">
                        Servicios
                    </a>
                    <a href="#commitment" className="hover:text-green-600 transition">
                        Compromiso
                    </a>

                    {status === "loading" ? null : session ? (
                        <button
                          onClick={() => signOut({ callbackUrl: "/" })}
                          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                        >
                            Cerrar sesión
                        </button>
                    ) : (
                        <>
                          <button
                            onClick={() => signIn(undefined, { callbackUrl: "/" })}
                            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
                          >
                            Iniciar sesión
                          </button>
                          <Link
                            href="/register"
                            className="px-3 py-1 border border-green-600 text-green-600 rounded hover:bg-green-50 transition"
                          >
                            Registrarse
                          </Link>
                        </>
                    )}
                </div>

                <button 
                  onClick={() => setIsOpen(!isOpen)} 
                  className="md:hidden text-gray-800"
                  >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {isOpen && (
                <div className="md:hidden px-6 pb-4 bg-white shadow text-sm space-y-2 text-gray-800">
                    <a href="#about" className="block hover:text-green-600">¿Quiénes somos?</a>
                    <a href="#services" className="block hover:text-green-600">Servicios</a>
                    <a href="#commitment" className="block hover:text-green-600">Compromiso</a>

                    {session ? (
                    <button
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="w-full text-center px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                    >
                      Cerrar sesión
                    </button>
                ) : (
                    <>
                      <button
                        onClick={() => signIn(undefined, { callbackUrl: "/" })}
                        className="w-full text-center px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
                      >
                        Iniciar sesión
                      </button>
                      <Link
                        href="/register"
                        className="w-full text-center px-3 py-1 border border-green-600 text-green-600 rounded hover:bg-green-50 transition"
                      >
                        Registrarse
                      </Link>
                    </>
                )}
                </div>
            )}
        </nav>
    )
}
