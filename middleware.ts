import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
    function middleware(req) {
        const userRole = req.nextauth.token?.role

        if (req.nextUrl.pathname.startsWith("/admin") && userRole !== "ADMIN") {
            return NextResponse.redirect(new URL("/", req.url))
        }

        return NextResponse.next()
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token, // requiere sesión activa
        },
    }
)

export const config = {
    matcher: [
        "/admin/:path*",
    ],
}
