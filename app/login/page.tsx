import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-md">
                <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
                <LoginForm />
            </div>
        </div>
    );
}