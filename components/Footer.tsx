import{ Instagram, Facebook, Mail } from "lucide-react"

export default function Footer() {
    return (
        <footer className="bg-green-600 text-white py-8 mt-20">
            <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-6">
                <p className="text-lg font-semibold">
                    Síguenos y contáctanos
                </p>
                <div className="flex items-center gap-8">
                    <a
                      href="https://instagram.com/ciklopet"
                      target="_blank"
                      className="hover:scale-110 transition"
                      aria-label="Instagram"
                    >
                      <Instagram className="w-7 h-7" />
                    </a>
                    <a 
                      href="https://facebook.com/ciklopet"
                      target="_blank"
                      className="hover:scale-110 transition"
                      aria-label="Facebook"
                    >
                        <Facebook className="w-7 h-7" />
                    </a>
                    <a 
                      href="mailto:reciclados880@gmail.com"
                      className="hover:scale-110 transition"
                      aria-label="Email"
                    >
                        <Mail className="w-7 h-7" />
                    </a>
                </div>
                {/* Copyright */}
                <p className="text-sm opacity-80">
                  © {new Date().getFullYear()} Ciklopet. Todos los derechos reservados.
                </p>
            </div>
        </footer>
    )
}
