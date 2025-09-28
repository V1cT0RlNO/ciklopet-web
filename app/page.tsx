'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import RegisterForm from "@/components/RegisterForm"
import LoginForm from "@/components/LoginForm"
import Image from "next/image"
import Navbar from "@/components/Navbar"
import { buttonVariants } from "@/components/ui/button"

export default function Home() {
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  return (
    <>
      {/*Navbar controla los botones */}
      <Navbar 
        onLoginClick={() => setShowLogin(true)}
        onRegisterClick={() => setShowRegister(true)}
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />

      {/* SECCIONES */}
      <main className="pt-20 min-h-screen bg-white text-gray-800">
        {/* Hero */}
        <section id="hero" className="bg-green-600 text-white py-20 px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold mb-4">Ciklopet</h1>
              <p className="text-xl mb-6">Reciclamos hoy, salvamos el mañana 🌎</p>
              <img src="/images/hero-recycle-prueba.jpeg" alt="Reciclaje ecológico" className="mx-auto rounded-lg shadow-lg"/>
          </div>
        </section>

        {/* ¿Quiénes somos? */}
        <section id="about" className="py-16 px-6 max-w-4xl mx-auto">
          <h2 className="text-3xl font-semibold mb-4">¿Quiénes somos?</h2>
          <p className="text-lg leading-relaxed">
            Ciklopet es una empresa ecológica dedicada al reciclaje responsable de materiales PET. 
            Trabajamos por un futuro más limpio mediante innovación y compromiso ambiental.
          </p>
        </section>

        {/* Servicios / Productos */}
        <section id="services" className="bg-gray-100 py-16 px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-semibold mb-8 text-center">Nuestros servicios</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
              <h3 className="text-xl font-bold">Recolección de PET</h3>
              <p>Contamos con rutas de recolección en CDMX.</p>
            </div>
            <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
              <h3 className="text-xl font-bold">Procesamiento ecológico</h3>
              <p>Transformamos desechos en nuevos recursos.</p>
            </div>
            <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
              <h3 className="text-xl font-bold">Consultoría ambiental</h3>
              <p>Asesoramos empresas para mejorar su impacto.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Compromiso ecológico */}
      <section id="commitment" className="py-16 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-4">Nuestro compromiso ecológico</h2>
        <p className="text-lg leading-relaxed">
          Cada kilo de plástico reciclado es un paso hacia un planeta más sano. En Ciklopet, unimos tecnología, conciencia y acción.
        </p>
      </section>

      {/* Footer */}
      <footer className="bg-green-600 text-white py-6 text-center">
        <p>&copy; {new Date().getFullYear()} Ciklopet. Todos los derechos reservados.</p>
      </footer>
    </main>

    {/* Modal Registro */}
    {showRegister && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-xl w-full max-w-md relative">
          <button
            className="absolute top-2 right-2 text-gray-500"
            onClick={() => setShowRegister(false)}
          >

          </button>
          <RegisterForm onSuccess={() => {
            setShowRegister(false)
            setIsAuthenticated(true)
          }}
          />
        </div>
      </div>
    )}

    {/* Modal Login */}
    {showLogin && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-xl w-full max-w-md relative">
          <button
            className="absolute top-2 right-2 text-gray-500"
            onClick={() => setShowLogin(false)}
          >

          </button>
          <LoginForm onSuccess={() => {
            setShowLogin(false)
            setIsAuthenticated(true)
          }}
          />
        </div>
      </div>
    )}
    </>
  );
}
