"use client"

import RegisterForm from "@/components/RegisterForm";

export default function RegisterPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-md">
                <h1 className="text-2xl font-bold text-center mb-6">Crear cuenta</h1>
                <RegisterForm />
            </div>
        </div>
    );
}
